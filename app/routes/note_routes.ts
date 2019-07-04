import { ObjectID, Db } from 'mongodb';
import { Application } from 'express';

export default function (app: Application, db: Db): void {
    app.get('/notes/:id', (req, res): void => {
        const details = { '_id': new ObjectID(req.params.id) };
        db.collection('notes').findOne(details, (err, item): void => {
            if (err) {
                res.status(500);
                res.send({ 'error': 'An error has occurred' });                
            } else {
                if (item === null) {
                    res.sendStatus(404);
                } else {
                    res.send(item);
                }
            }
        });
    });

    app.post('/notes', (req, res): void => {
        const note = { text: req.body.body, title: req.body.title };
        db.collection('notes').insertOne(note, (err, result): void => {
            if (err) {
                res.status(500);
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.delete('/notes/:id', (req, res): void => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').deleteOne(details, (err, result): void => {
            if (err) {
                res.status(500);
                res.send({ 'error': 'An error has occurred' });
            } else {
                if (result.deletedCount === 0) {
                    res.sendStatus(404);
                }
                else {
                    res.send('Note ' + id + ' deleted!');
                }
            }
        });
    });

    app.put('/notes/:id', (req, res): void => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { text: req.body.body, title: req.body.title };
        db.collection('notes').updateOne(details, note, (err, result): void => {
            if (err) {
                res.status(500);
                res.send({ 'error': 'An error has occurred', err });
            } else {
                if (result.matchedCount === 0) {
                    res.sendStatus(404);
                } else {
                    res.send(note);
                }
            }
        });
    });
};
