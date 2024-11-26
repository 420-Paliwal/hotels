const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menu');

router.post('', async (req,res) =>{
    try{
       const data = req.body;
       console.log("data : ",data)
       
       const newMenu = new MenuItem(data)
       console.log("data 2 : ",newMenu)
  
       const response = await newMenu.save()
       console.log("response : ",response)
       res.status(200).json(response)
      //  res.status(200).json(response)
    }catch(err){
      console.log(err)
      res.status(200).json("Internal Error : ",err)
    }
  })
  
  
router.get('', async (req,res) =>{
    try{
       const response = await MenuItem.find();
       console.log("Data Fetched");
      res.status(200).json(response)
    }catch(err){
      console.log(err)
      res.status(500).json("Internal Server Error : ",err)
    }
  })

router.get("/:taste", async (req,res) =>{
    try{
      const menuTaste = req.params.taste;
      if (menuTaste == "sweet" || "spicy" || "sour"){
        const response = await MenuItem.find({taste: menuTaste})
        console.log("Menu Item Data Fetched")
        console.log(response);
        res.status(200).json(response)
      }
      else{
        console.log("Error")
        res.status(404).json("Internal Server Error")
      }
    }catch(err){
        console.log("response data not fetched")
        res.status(500).json("Internal Server Error")
    }
})

// this function is for update the menu 
router.put('/:id' , async (req, res)=>{
  try{
    const menuId = req.params.id;
    const menuData = req.body;

    if(!menuId){
      console.log("Menu ID is required")
      res.status(404).json({message: "Menu Item Not Found"})
    }

    const response = await MenuItem.findByIdAndUpdate(menuId, menuData, {
      new: true,
      runValidators: true
    })

    console.log("Menu Item Updated Successfully")
    res.status(200).json(response)

  }catch(err){
    console.log("Error",err)
    res.status(500).json("Internal Server Error",err)
  }
})

router.delete('/:id', async (req, res)=>{
  try{
     const menuId = req.params.id;
     console.log(menuId); 
     const response = await MenuItem.findByIdAndDelete(menuId)

     if(!response){
      return res.status(404).json({message: "Item not found"})
     }

     console.log("Menu Item Deleted Successfully")
     res.status(200).json(response)
  }
  catch(err){
     console.log(err)
     res.status(500).json("Error : ",err)
  }
})
module.exports = router