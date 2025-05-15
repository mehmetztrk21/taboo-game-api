import * as fastapi from "fastapi-next";
import { Knex } from "knex";


declare global {

    export interface NextContext<T = any> extends fastapi.NextContext<T> {
        params: T;
        body: T;
        all: T;
        req: any
        db: Knex;
        session?: {
        }
    };
} 