const express = require("express")
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors')
app.use(cors())
app.use(express.json())


// 
const { query } = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = "mongodb+srv://nextgenfx:qv5jeiU3lj2YBsD0@myfirstdb.w4kvmll.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const projects = client.db('nextgenfx').collection('projects')
        const tutorials = client.db('nextgenfx').collection('tutorials')
        const news = client.db('nextgenfx').collection('news')
        app.get('/projects', async(req,res)=>{
            const query = {}
            const data = await projects.find(query).sort({_id: -1}).toArray()
            res.send(data) 
        })
        app.get('/tutorials', async(req,res)=>{
            const query = {}
            const data = await tutorials.find(query).sort({_id: -1}).toArray()
            res.send(data) 
        })
        app.get("/news", async(req,res)=> {
            const query = {}
            const result = await news.find(query).sort({_id: -1}).toArray()
            res.send(result)
        })
        app.post('/project', async(req,res)=>{
            const data = req.body
            const result = await projects.insertOne(data)
            res.send(result)
        })
        app.post('/news', async(req,res)=>{
            const data = req.body
            const result = await news.insertOne(data)
            res.send(result)
        })
        app.post('/tutorial', async(req,res)=>{
            const data = req.body
            const result = await tutorials.insertOne(data)
            res.send(result)
        })
    } catch {
        console.log("database not connected");

    }
}

run().catch(console.log)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})