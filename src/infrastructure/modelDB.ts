import { DataTypes, Model, Sequelize } from 'sequelize';
import { IDatabaseConnection } from '../interfaces/databaseInterface';
import { IModelDB } from '../interfaces/interfaceModel';

export class ModelDB implements IModelDB {
    private connection: IDatabaseConnection;
    private instance: Sequelize

    constructor(connection: IDatabaseConnection) {
        this.connection = connection
        this.instance = this.connection.getInstance();
    }

    private defineModel() {
        return this.instance.define('bus_route', {
            rote_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            route_nome: {
                type: DataTypes.STRING,
                allowNull: false
            },
            route_num: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        }, {
            tableName: 'bus_route',
            timestamps: false
        });
    }

    async syncModel() {
        try {
            const model = this.defineModel();
            this.connection.Connect();
            await this.instance.sync();
            console.log('Modelo sincronizado com o banco de dados');
            return model;
        } catch (err) {
            console.error('Erro ao sincronizar o modelo:', err);
            throw err;
        }
    }

    disconnectModel() {
        console.log('Modelo desconectado');
        this.connection.Disconnect();
    }
}