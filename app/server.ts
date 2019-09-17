import express from 'express';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import routes from './routes';
import cors from "cors";
import dbConfig from '../config/db';
import webServerConfig from '../config/webServer';

(async function(): Promise<void> {
    try {
        const app = express();

        app.use(cors({ 
            origin: (requestOrigin, callback) => {
                callback(null, !!requestOrigin && webServerConfig.allowedOrigins.indexOf(requestOrigin) !== -1);
            }
        }));
        app.use(bodyParser.urlencoded({ extended: true }));

        const client = await MongoClient.connect(dbConfig.url,  { useNewUrlParser: true });
        const database = client.db('notes');

        routes(app, database);
        app.listen(webServerConfig.port, (): void => {
            console.log('We are live on ' + webServerConfig.port);
        });
    }
    catch(err) {
        console.log(err);
    }
})();
