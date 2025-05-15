export interface WordTable {
    Id?: number;
    CategoryId?: number;
    Value: string;
    TabooWords: string;
    LangCode: string;
    CreateDate?: Date;
    IsDeleted?: boolean;
}
export interface CategoryTable {
    Id?: number;
    Value: string;
    LangCode: string;
    CreateDate?: Date;
    IsDeleted?: boolean;
}
