const express=require("express");
const path=require('path');
const multer=require('multer');

const app=express();
const port=2016;

// const upload=multer({dest:"uploads/"})
//multer functions to handle our image file uploaded form frntend
//by doing this line no 8 we cant handle our file properly we cant open it 
//for this probelm we use DISK STORAGE!! 

//DISK STORAGE!!
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,'./uploads');
    },
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload=multer({storage});


app.set("view engine","ejs");
app.set("views",path.resolve("./views"))

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}))
//routes
app.get("/",(req,res)=>{
    return res.render('form');
})
app.post('/upload',upload.single("profileImage"),(req,res)=>{
    console.log(req.body);
    console.log(req.file);

    return res.redirect("/");
})





app.listen(port,()=>{
    console.log(`server started at port ${port}`);
})