import express from "express";
import "dotenv/config";

import connectionDB from "./src/configs/connectionDB.js";
import { rootRouter } from "./src/routes/index.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/v1/api', rootRouter);

app.use('/*', (req, res)=>{
    res.status(200).send("<h1> Ohhhh ho there is no way ahead dear <h1>");
});

app.get("/check", (req, res) => {
    res.status(200).send("<h1> All Good <h1>");
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
});

connectionDB();

app.listen(port, (err)=>{
    if(!err){
        console.log(`shhhhhhhhhhhhhh it is listening over ${port} using [Express]`);
    }
    else{
        console.error(err);
    }
});