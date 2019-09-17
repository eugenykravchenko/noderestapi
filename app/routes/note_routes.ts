import { ObjectID, Db } from 'mongodb';
import { Application, RequestHandler, Request, Response, NextFunction } from 'express';

function errorHandlingMiddleware(innerHandler: RequestHandler): RequestHandler {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            return await innerHandler(req, res, next);
        }
        catch(err) {
            console.error(err);
            res.status(500);
            res.send({ 'error': 'An error has occurred' });
        }
    };
}

export default function (app: Application, db: Db): void {
    app.get('/notes', errorHandlingMiddleware(async (req, res): Promise<void> => {
        const items = await db.collection('notes').find().toArray();
        res.send(items);
    }));

    app.get('/notes/:id', errorHandlingMiddleware(async (req, res): Promise<void> => {
        const details = { '_id': new ObjectID(req.params.id) };

        const item = await db.collection('notes').findOne(details);
        if (item === null) {
            res.sendStatus(404);
        } else {
            res.send(item);
        }
    }));

    app.post('/notes', errorHandlingMiddleware(async (req, res): Promise<void> => {
        const note = { text: req.body.body, title: req.body.title };
        const result = await db.collection('notes').insertOne(note);
        res.send(result.ops[0]);
    }));

    app.delete('/notes/:id', errorHandlingMiddleware(async (req, res): Promise<void> => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const {deletedCount} = await db.collection('notes').deleteOne(details);
        if (deletedCount === 0) {
            res.sendStatus(404);
        }
        else {
            res.send('Note ' + id + ' deleted!');
        }
    }));

    app.put('/notes/:id', errorHandlingMiddleware(async (req, res): Promise<void> => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { text: req.body.body, title: req.body.title };
        const {matchedCount} = await db.collection('notes').updateOne(details, { $set: note });
        if (matchedCount === 0) {
            res.sendStatus(404);
        } else {
            res.send(note);
        }
    }));
};
