const { v4: generateId } = require('uuid');
const { NotFoundError } = require('../util/errors');
const { readData, writeData } = require('./util');
const {MongoClient, ObjectId} = require("mongodb")


const url = "mongodb+srv://Admin-krishna:meLLS71nIx56axTI@cluster0.yaob0.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url)

// async function connect(){
//   await client.connect();
// }

// connect().then(console.log("connected")).catch(console.error)


async function getAll() {
  // const storedData = await readData();
  // if (!storedData.events) {
  //   throw new NotFoundError('Could not find any events.');
  // }
  // return storedData.events;
  client.connect();
  const db = client.db("Events")
  const collection = db.collection("Events")
  const data = await collection.find({}).toArray();
  return data;
}

async function get(id) {
  // const storedData = await readData();
  // if (!storedData.events || storedData.events.length === 0) {
  //   throw new NotFoundError('Could not find any events.');
  // }

  // const event = storedData.events.find((ev) => ev.id === id);
  // if (!event) {
  //   throw new NotFoundError('Could not find event for id ' + id);
  // }
  client.connect();
  const db = client.db("Events")
  const collection = db.collection("Events")
  const data = await collection.find({_id: new ObjectId(id)}).toArray();
  return data;
}

async function add(data) {
  client.connect();
  const db = client.db("Events")
  const collection = db.collection("Events")
  const data1 = await collection.insertOne(data);
  return data1;
}

async function replace(id, data) {
  client.connect();
  const db = client.db("Events")
  const collection = db.collection("Events")
  const data1 = await collection.updateOne({_id:new ObjectId(id)}, {$set: data});
  return data1;
}

async function remove(id) {
  client.connect();
  const db = client.db("Events")
  const collection = db.collection("Events")
  const data1 = await collection.deleteOne({_id:new ObjectId(id)});
  return data1;
}

exports.getAll = getAll;
exports.get = get;
exports.add = add;
exports.replace = replace;
exports.remove = remove;
