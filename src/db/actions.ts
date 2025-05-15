import { Knex } from "knex"
import { WordTable, CategoryTable } from "./tables"
export async function createWordTable(db: Knex, record: WordTable): Promise<WordTable> {
    var isError = false;

    if(!record.CreateDate) record.CreateDate = new Date();

    await db("Word").insert(record).returning("Id").then(result=>{
        if(Array.isArray(result) && result.length > 0) {
            record.Id = result[0].Id;
        }
        else {
            if(result) {
                record.Id = result[0].Id;
            }
            else {
                isError = true;
            }
        }
    }).catch((err)=>{
        isError = true;
        console.error(err);
    });
    return isError ? null : record;
}
export async function updateWordTable(db: Knex, record: WordTable): Promise<boolean> {
    var isError = false;

    await db("Word").where({ Id : record.Id }).update({...record, Id : undefined} as any).catch((err)=>{
        isError = true;
        console.error(err);
    });
    return !isError;
}
export async function deleteWordTable(db: Knex, record: WordTable): Promise<boolean> {
    var isError = false;
    record.IsDeleted = true;

    await db("Word").where({ Id : record.Id }).update({...record, Id : undefined} as any).catch((err)=>{
        isError = true;
        console.error(err);
    });
    return !isError;
}
export async function findOneWordTableById(db: Knex, Id: number): Promise<WordTable | undefined> {
    var result = await db("Word").where({ Id : Id }).select().first().catch(console.error);
    return result;
}
export async function findOneWordTable(db: Knex, criteria: (query : Knex<WordTable>) => any): Promise<WordTable | undefined> {
    var result = await criteria(db("Word") as any).select().first().catch(console.error);
    return result;
}
export async function findMoreWordTable(db: Knex, criteria: (query : Knex<WordTable>) => any): Promise<WordTable[] | undefined> {
    var result = await criteria(db("Word") as any).select().catch(console.error);
    return result;
}
export async function existsWordTableById(db: Knex, Id: number): Promise<boolean> {
    var result = await db("Word").where({ Id : Id }).select().first().catch(console.error);
    return Boolean(result);
}
export async function existsWordTable(db: Knex, criteria: (query : Knex<WordTable>) => any): Promise<boolean> {
    var result = await criteria(db("Word") as any).select().first().catch(console.error);
    return Boolean(result);
}
export async function countWordTable(db: Knex, criteria: (query : Knex<WordTable>) => any): Promise<number> {
    var result = await criteria(db("Word") as any).count().first().then((r: any) => ({ count: Object.values(r)[0] })).catch(console.error) || { count: 0 };
    return result.count;
}

export async function createCategoryTable(db: Knex, record: CategoryTable): Promise<CategoryTable> {
    var isError = false;

    if(!record.CreateDate) record.CreateDate = new Date();

    await db("Category").insert(record).returning("Id").then(result=>{
        if(Array.isArray(result) && result.length > 0) {
            record.Id = result[0].Id;
        }
        else {
            if(result) {
                record.Id = result[0].Id;
            }
            else {
                isError = true;
            }
        }
    }).catch((err)=>{
        isError = true;
        console.error(err);
    });
    return isError ? null : record;
}
export async function updateCategoryTable(db: Knex, record: CategoryTable): Promise<boolean> {
    var isError = false;

    await db("Category").where({ Id : record.Id }).update({...record, Id : undefined} as any).catch((err)=>{
        isError = true;
        console.error(err);
    });
    return !isError;
}
export async function deleteCategoryTable(db: Knex, record: CategoryTable): Promise<boolean> {
    var isError = false;
    record.IsDeleted = true;

    await db("Category").where({ Id : record.Id }).update({...record, Id : undefined} as any).catch((err)=>{
        isError = true;
        console.error(err);
    });
    return !isError;
}
export async function findOneCategoryTableById(db: Knex, Id: number): Promise<CategoryTable | undefined> {
    var result = await db("Category").where({ Id : Id }).select().first().catch(console.error);
    return result;
}
export async function findOneCategoryTable(db: Knex, criteria: (query : Knex<CategoryTable>) => any): Promise<CategoryTable | undefined> {
    var result = await criteria(db("Category") as any).select().first().catch(console.error);
    return result;
}
export async function findMoreCategoryTable(db: Knex, criteria: (query : Knex<CategoryTable>) => any): Promise<CategoryTable[] | undefined> {
    var result = await criteria(db("Category") as any).select().catch(console.error);
    return result;
}
export async function existsCategoryTableById(db: Knex, Id: number): Promise<boolean> {
    var result = await db("Category").where({ Id : Id }).select().first().catch(console.error);
    return Boolean(result);
}
export async function existsCategoryTable(db: Knex, criteria: (query : Knex<CategoryTable>) => any): Promise<boolean> {
    var result = await criteria(db("Category") as any).select().first().catch(console.error);
    return Boolean(result);
}
export async function countCategoryTable(db: Knex, criteria: (query : Knex<CategoryTable>) => any): Promise<number> {
    var result = await criteria(db("Category") as any).count().first().then((r: any) => ({ count: Object.values(r)[0] })).catch(console.error) || { count: 0 };
    return result.count;
}

