const express = require("express");
const router = express.Router();
const mongojs = require("mongojs");

const dense_db = mongojs('mongodb+srv://Oldentomato:jowoosung123@examplecluster.g7o5t.mongodb.net/Model_Database?retryWrites=true&w=majority',['Dense_collection']);


router.get("/",(req,res)=>{
    res.status(200).json({success: true})
})

router.get("/getdatas",(req,res)=>{
    dense_db.Dense_collection.find((err, result)=>{
        if(err){
            res.send(err);
        }else{
            res.json(result);
        }
    })
})

module.exports = router;