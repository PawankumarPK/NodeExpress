const express = require("express")
const app = express()

app.listen(3000,()=>{
    console.log("Practise Server running on port 1000");

})
app.get("/",(req,res) =>{
    //res.render("index",{title:"Practise Project",heading:"First Project",para:"Hello here is my practise Project"})
    res.sendFile("Data is here")
})