export default {
    url: process.env.NOTES_CONNECTION_STRING || 'mongodb://notes-user:sa@localhost:27017/notes?retryWrites=true&w=majority'
};
