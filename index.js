import express from "express";
import axios from "axios";
const port = 3000;
const app = express();
const dogNames = ['Buddy','Max','Charlie','Lucy','Bailey','Cooper','Sadie','Tucker','Molly','Lola','Coco','Rocky','Daisy','Bella','Leo','Rosie','Ruby','Chloe','Oliver','Luna'];
app.use(express.static("public"));
app.get("/", async (req,res)=>{
    try{
        const response = await axios.get("https://dog.ceo/api/breeds/image/random");
        const message= "Hello my name is "+dogNames[Math.floor(Math.random()*dogNames.length)];
        res.render("index.ejs",{link : response.data.message , name: message});
    }
    catch(error){
        res.render("index.ejs",{link:"https://www.lifewire.com/thmb/YKCp3LuI-r3vTaaQufVOETpI-CM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/google-404-error-0f9029ad5ea14b2db1cddb65d8188f69.png"});
    }   
});
app.get("/breeds", async (req,res)=>{
    try{
        const response = await axios.get("https://dog.ceo/api/breeds/list/all");
        const breeds = Object.keys(response.data.message);
        res.render("breeds.ejs",{breeds: breeds});
    }
    catch(error){
        res.render("index.ejs",{link:"https://www.lifewire.com/thmb/YKCp3LuI-r3vTaaQufVOETpI-CM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/google-404-error-0f9029ad5ea14b2db1cddb65d8188f69.png"});
    }
});
app.get("/selection", async (req,res)=>{
    try{
        const response = await axios.get(`https://dog.ceo/api/breed/${req.query.name}/images/random`);
        const message = "Hello I am a "+req.query.name;
        res.render("index.ejs",{link : response.data.message , name:message });  
    }
    catch(error){
        res.render("index.ejs",{link:"https://www.lifewire.com/thmb/YKCp3LuI-r3vTaaQufVOETpI-CM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/google-404-error-0f9029ad5ea14b2db1cddb65d8188f69.png"});
    }
});
app.listen(port, ()=>{
   console.log(`Server running on port : ${port}`); 
});