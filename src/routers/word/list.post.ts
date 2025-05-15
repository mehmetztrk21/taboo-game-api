import { ApiResponse, NextContext } from 'fastapi-next';
import { Knex } from 'knex';
import { findMoreWordTable } from '../../db/actions';
interface Request {
    categoryId: number[];
    limit: number;
}
interface Context extends NextContext<Request> {
    db: Knex;
    req: any;
}
export default async function (ctx: Context) {
    var response = new ApiResponse();
    var query = {
        IsDeleted: false
    } as any

    var words = await findMoreWordTable(ctx.db, i => {
        let query = i.where({ IsDeleted: false });

        // Filter by category if categoryId array is not empty
        if (ctx.req.body.categoryId && Array.isArray(ctx.req.body.categoryId) && ctx.req.body.categoryId.length > 0) {
            query = query.whereIn('CategoryId', ctx.req.body.categoryId);
        }

        // Order randomly and limit results - using NEWID() for SQL Server
        return query.orderByRaw('NEWID()').limit(ctx.req.body.limit || 10);
    });

    const mappedWords = words.map(w => {
        let tabooWords = [];
        try {
            tabooWords = JSON.parse(w.TabooWords);
            if (!Array.isArray(tabooWords)) tabooWords = [];
        } catch {
            tabooWords = [];
        }
        return {
            word: w.Value,
            categoryId: w.CategoryId,
            tabooWords: tabooWords
        };
    });

    return response.setSuccess(mappedWords);
}