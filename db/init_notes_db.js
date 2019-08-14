db = db.getSiblingDB('notes');
db.createUser({
    user: 'notes-user', 
    pwd: 'sa', 
    roles: [
        {
            role: 'readWrite', 
            db: 'notes'
        }
    ]
});
