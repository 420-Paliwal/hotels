const express = require('express');
const router = express.Router();
const person = require('../models/person')

router.post('',  async (req,res) =>{
    try{
      const data = req.body;
      console.log("data 1 : ",data);
      const newPerson = new person(data)
      console.log("data 2 : ",newPerson);
  
      const response = await newPerson.save()
      console.log("response : ",response);
      res.status(200).json(response)
      console.log("Data Saved")
    }
    catch(err){
      console.log(err)
      res.status(500).json("Internal Server Error : ",err)
    }
  })
  
  router.get('', async (req,res) =>{
    try{
       const response = await person.find();
       console.log("Data Fetched");
      res.status(200).json(response)
    }catch(err){
      console.log(err)
      res.status(500).json("Internal Server Error : ",err)
    }
  })
  
  router.get('/:workType', async (req,res) =>{
    try{
      const workType = req.params.workType;
      if (workType == "chef" || "manager" || "waiter"){
        const response = await person.find({work: workType});
        console.log("response fetched")
        console.log(response)
        res.status(200).json(response)
      }
      else{
        res.status(404).json("Invalid Work Type")
      }
    }
    catch(err){
      console.log("response not fetched")
      res.status(200).json("Internal Server Error : ",err)
    }
  })


  router.put('/:id',  async (req, res)=>{
    try{
       const personId = req.params.id
       const data = req.body
       console.log(personId)
       console.log(data)

       const response = await person.findByIdAndUpdate(personId, data, {
        new : true,
        runValidators : true
       })

       if(!response){
        return res.status(404).json({error: 'Person Not Found'})
       }

       console.log('data updated')
       res.status(200).json(response)
    }
    catch(err){
     console.log("Error : ",err)
     res.status(500).json("Internal Server Error : ",err)
    }
  })


  router.delete('/:id',  async (req, res)=>{
    try{
       const personId = req.params.id
       console.log(personId)
       const response = await person.findByIdAndDelete(personId)

       if(!response){
        return res.status(404).json({error: 'Person Not Found'})
       }

       console.log('data deleted')
       res.status(200).json({message: "Person deleted Successfully"})
    }
    catch(err){
     console.log("Error : ",err)
     res.status(500).json("Internal Server Error : ",err)
    }
  })
  
module.exports = router 