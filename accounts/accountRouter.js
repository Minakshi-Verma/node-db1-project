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

  //------------POST request-----------

   router.post("/", (req,res)=>{
    //    const {id} = req.params
    const {name, budget} = req.body

    db("accounts")
    .insert({name, budget})
        .then(account=>{
          res.status(201).json({ results: account });   
        })
        .catch(err=>{
          res.status(500).json({message:"New account can not be added"})
        })
   })

  //------------PUT request-------------

  router.put("/:id",(req,res)=>{
    const {id} = req.params
    const {name, budget} = req.body
    db("accounts")
    .where({id})
    .update({name, budget})
        .then(count=>{     //(you can just write updated in both .then & if statement if you like)
            if(count>0){         
                res.status(200).json({message:"object updated successfully"})
            }else{
                res.status(500).json({error})
            }           
        })       
        .catch(err=>{
        console.log(err)
        }) 
  })

  //-----------DELETE----------

  router.delete('/:id', (req, res)=>{
      const {id} = req.params
      db("accounts")
      .where({id})
      .del()
      .then(count=>{
          if (count>0){
              res.status(200).json({message:"deleted successfully"})
          }else{
              res.status(404).json({message:"account not found"})
          }
      })     

  })

  



module.exports = router;






// practicing async/await  try/catch block is not essential

// router.get("/", async(req,res)=>{
//     try{
//     const allAccounts = await db.select("*")
//     res.status(200).json(allAccounts)    
//     }catch(err){
//     console.log(err)
//     res.status(500).json({message:"Error getting the accounts"})
//     }    
   
// })