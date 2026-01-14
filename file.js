var express= require("express"); //to convert html from one format to another
var mysql=require("mysql2"); 
var app=express();
app.use(express.urlencoded({extended:true})); //urlencoded will eliminate restrictions
app.use(express.json()); //fromat specification from browser to browser
var con = mysql.createConnection(
       {
         host: "localhost",
         user: "root",
         password: "root",
         database: "mydb59"
       }
       );
app.get("/",(req,res)=> //to take info from user   and "/" indicate position of your page in the application
{
res.sendFile(__dirname+"/index.html"); //index.html
});
app.get("/login.html", (req, res) => {
    res.sendFile(__dirname+"/login.html");
});
app.post("/login.html",(req,res)=>
{
var email=req.body.email;
var pwd=req.body.pwd;
var con=mysql.createConnection({
host:"localhost",
user:"root",
password:"root",
database:"mydb59"
});
con.query("select * from project where email=? and pwd=?",[email,pwd],function(error,result,fields) 
//email=? and pwd=? are db table (here project) fields
{
    if(result.length>0)
        res.sendFile(__dirname+"/dashboard.html");
    else
    res.sendFile(__dirname+"/login.html");
 if (error) throw error;
 console.log("yes");
 });
 });
// app.get("/login.html",(req,res)=>
// {
// res.sendFile(__dirname+"/login.html");
// });
 app.post("/registration",(req,res)=>
     {
     var email=req.body.email;
     var pwd=req.body.pwd;
     var con=mysql.createConnection({
     host:"localhost",
     user:"root",
     password:"root",
     database:"mydb59"
     });
     con.query("select * from project where email=?",[email],function(error,result,fields) 
     {
     if (error) throw error;
     console.log("yes");
     });
     });
app.get("/registration.html",(req,res)=>
{
    res.sendFile(__dirname+"/registration.html");
})
app.listen(8081);
