export interface IDomain {
    data: {
        rote_id: string | null, 
        route_nome: string | null, 
        route_num: string | null
    };

    save(): Promise<Object>;
    search(): Promise<Array<Object>>;
    update(arg0: Object): Promise<Object>;
    delete(): Promise<Object>;
}
