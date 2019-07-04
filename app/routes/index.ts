import { Db } from 'mongodb';
import { Application } from 'express';
import noteRoutes from './note_routes';

export default function (app: Application, db: Db): void {
    noteRoutes(app, db);
};
