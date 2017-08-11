'use strict';

const URI = process.env.OPENSHIFT_MONGODB_DB_URL + 'iot';
const MongoClient = require('mongodb').MongoClient;

module.exports.save = (collection, data, cb) => {
    MongoClient.connect(URI, (err, db) => {
        if (err) {
            console.log('connect to MongoLab error', err);
        }
        insertDocuments(collection, db, data, () => {
            db.close();
            cb();
        });

    });
};

let insertDocuments = (collectionName, db, data, callback) => {
    // Get the documents collection
    let collection = db.collection(collectionName);
    // Insert some documents
    collection.insertMany([
        data
    ], (err, result) => {
        if (err) {
            console.error('Insert document error', err);
        }
        callback(result);
    });
};


module.exports.find = (collectionName, limit, sort, isHourly, cb) => {
    MongoClient.connect(URI, (err, db) => {
        if (err) {
            console.log('connect to MongoLab error', err);
        }

        var collection = db.collection(collectionName);
        // Find some documents
        var query;

        if (isHourly) {
            if (collectionName === 'temperature') {
                query = collection.aggregate(
                    [{
                        $group: {
                            _id: {
                                year: { $year: '$created_at' },
                                month: { $month: '$created_at' },
                                day: { $dayOfMonth: '$created_at' },
                                hour: { $hour: '$created_at' }
                            },
                            heat_index: { $avg: '$heat_index' },
                            'humidity': { $avg: '$humidity' },
                            'temperature': { $avg: '$temperature' },
                            'heat_index': { $avg: '$heat_index' },
                            'created_at': { $max: '$created_at' }

                        }
                    },
                    { $sort: sort },
                    { $limit: limit }
                    ]
                );
            } else {
                query = collection.aggregate(
                    [{
                        $group: {
                            _id: {
                                year: { $year: '$created_at' },
                                month: { $month: '$created_at' },
                                day: { $dayOfMonth: '$created_at' },
                                hour: { $hour: '$created_at' }
                            },
                            'temperature': { $avg: '$temperature' },
                            'mh': { $avg: '$mh' },
                            'created_at': { $max: '$created_at' }
                        }
                    },
                    { $sort: sort },
                    { $limit: limit }
                    ]
                );
            }

        } else {
            query = collection.find({}).sort(sort).limit(limit);
        }


        query.toArray((err,
            docs) => {
            db.close();
            cb(docs);
        });



    });
};
