import express from 'express';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import routes from './app/routes';
import db from './config/db';

(async function(): Promise<void> {
    try {
        const app = express();
        const port = 8000;

        app.use(bodyParser.urlencoded({ extended: true }));

        const client = await MongoClient.connect(db.url,  { useNewUrlParser: true });
        const database = client.db('notes');

        routes(app, database);
        app.listen(port, (): void => {
            console.log('We are live on ' + port);
        });
    }
    catch(err) {
        console.log(err);
    }
})();
