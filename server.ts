import express from 'express';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import routes from './app/routes';
import db from './config/db';

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url,  { useNewUrlParser: true }, (err, client): void => {
    if (err) {
        return console.log(err);
    }

    const database = client.db('sandbox');

    routes(app, database);
    app.listen(port, (): void => {
        console.log('We are live on ' + port);
    });
});
