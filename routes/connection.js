import {MongoClient} from 'mongodb'

let client = null;
let collections = {};

exports.init = function() {
  console.log("init")
  return MongoClient.connect('mongodb://mongo:27017')
  .then((database) => {
    client = database.db("whisper")
  })
};

exports.collection = function(collectionName) {
  if (!collections[collectionName]) {
    collections[collectionName] = client.collection(collectionName);
  }
  return collections[collectionName];
};
