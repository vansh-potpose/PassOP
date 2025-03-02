
const express = require('express')
const app = express()
const dotenv=require('dotenv')
dotenv.config()
const port = 3000
const { MongoClient } = require('mongodb');
const bodyparser=require("body-parser")
var cors=require("cors")


const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
app.use(bodyparser.json())
app.use(cors())

const dbName="PassOP"

client.connect();

app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})
app.post('/', async (req, res) => {
  const password=req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password)
  res.send({success:true,result:findResult})
})
app.delete('/', async (req, res) => {
  const password=req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password)
  res.send({success:true,result:findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`)
})