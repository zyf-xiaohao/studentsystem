const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb://localhost:27017';
const dbName = 'sz23zyf';
//连接数据库
function clientMongo(documents, callback) {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection(documents);
        callback(collection, client);
    });
}

const doMongodb = {
    ObjectId,
    find: (documents, data, callback) => {
        clientMongo(documents, function (collection, client) {
            collection.find(data).toArray((err, docs) => {
                client.close();
                callback(err, docs);
            });
        })
    },
    findOne: (documents, data, callback) => {
        clientMongo(documents, function (collection, client) {
            collection.findOne(data, (err, doc) => {
                client.close();
                callback(err, doc);
            });
        })
    },
    insert: (documents, data, callback) => {
        clientMongo(documents, (collection, client) => {
            collection.insertOne(data, (err, result) => {
                client.close();
                callback(err, result);
            })
        })
    },
    updateOne: (documents, data, setdata, callback) => {
        clientMongo(documents, (collection, client) => {
            collection.updateOne(data, {
                $set: setdata
            }, (err, result) => {
                client.close();
                callback(err, result);
            })
        })
    },
    deleteOne: (documents, data, callback) => {
        clientMongo(documents, (collection, client) => {
            collection.deleteOne(data, (err, result) => {
                client.close();
                callback(err, result);
            })
        })
    }
};

module.exports = doMongodb;