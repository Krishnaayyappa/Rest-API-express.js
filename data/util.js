const fs = require('node:fs/promises');
const {MongoClient, ObjectId} = require("mongodb")


const url = "mongodb+srv://Admin-krishna:meLLS71nIx56axTI@cluster0.yaob0.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url)

async function readData(email) {
  // const data = await fs.readFile('events.json', 'utf8');
  await client.connect();
  const db = client.db("Events");
  const collection = db.collection("Users");
  const data = await collection.find({email:email}).toArray();
  console.log("test")
  return data
}

async function writeData(data1) {
  await client.connect();
  const db = client.db("Events");
  const collection = db.collection("Users");
  const data = await collection.insertOne(data1);
  return data
}

exports.readData = readData;
exports.writeData = writeData;