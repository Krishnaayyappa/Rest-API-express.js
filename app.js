const bodyParser = require('body-parser');
// const {MongoClient} = require("mongodb")
const express = require('express');
const eventRoutes = require('./routes/events');
const authRoutes = require('./routes/auth');
const path = require('path')

const app = express();

const publicpath = path.join(__dirname, "./public");

app.use(express.static(publicpath));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

// const url = "mongodb+srv://Admin-krishna:7CD1KwX8T9RV068B@cluster0.yaob0.mongodb.net/?retryWrites=true&w=majority"
// const client = new MongoClient(url)




// app.get("/check", async(req,res,next) => {
//   await client.connect();
//   const db = client.db("Events")
//   const collection = db.collection("Events")
//   console.log("checkpoint2");
//   const data = await collection.find({}).toArray();
//   res.send(data);
// })

app.get("/", (req, res) => {
  res.render("index.html")
})

app.use(authRoutes);

app.use('/events', eventRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong.';
  res.status(status).json({ message: message });
});

app.listen(8080);
