const express = require("express");
 
//import data
const db = require("../data/dbConfig")// connection to the database

const router = express.Router();

//----------GET ALL----
 router.get("/", (req,res)=>{
    
     db.select("*")
     .from("accounts")  //we use 'from' keyword 
     .then(accounts=>{         
        res.status(200).json({accounts})         
     })
     .catch (err=>{
         res.status(500).json({message:"Error getting the accounts"})
     })    
 })

 //----------GET By Id-----

  router.get("/:id",(req,res)=>{
    const {id} = req.params
    db("accounts")

    .where({id})
    .first()
    .then(account=>{
        if(account){
            res.status(200).json({account})
        }else{
            res.status(404).json({message:"Error retrieving the account"})
        }
    })
    .catch(err=>{
        res.status(500).json({message:"Error processing the request"})
    })
  })


module.exports = router;






// practicing async/await

// router.get("/", async(req,res)=>{
//     try{
//     const allAccounts = await db.select("*")
//     res.status(200).json(allAccounts)    
//     }catch{
//     res.status(500).json({message:"Error getting the accounts"})
//     }    
   
// })