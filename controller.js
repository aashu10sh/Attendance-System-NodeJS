const express = require('express');
const bodyParser = require('body-parser');
const {Users, sql, Log} = require("./model");
const session = require(`express-session`);

let ses = 
{
    secret: "tomatopotato",
    cookie: {},
}
const app = express();

sql.sync()

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(session(ses));

app.get("/logout",(req,res)=>
{
    req.session.destroy();
    res.redirect("/");
})
app.get("/attedance",async(req,res) =>
{
    
    if (!req.session.secretsauce){res.redirect("/"); return }
    let users = await Log.findAll();

    res.render(__dirname+"/views/attedance.ejs",
    {
        logs: users.reverse(),
    });
})

app.get("/",(req, res)=>
{
    if (req.session.secretsauce){res.redirect("/attedance"); return }
    res.render(__dirname+"/views/index.ejs",
    {
        mes:false,
    });
}
)
app.post("/signup",async(req,res) =>
{
    let fullname = req.body["fname"];
    let username = req.body["uname"];
    let password = req.body["spass"];
    let user = await Users.create({
        fullname:fullname,
        username:username,
        password:password
        
    })
    res.redirect("/");


});

app.post("/attedance",async(req,res)=> 
{
    await Log.create
    ({
        fullname:req.session.secretsauce.fullname,


    })
    res.redirect("/attedance")


})

app.post("/",async(req,res) =>
{

    let username = req.body["uname"];
    let password = req.body["upass"];
    let user = await Users.findOne ({ where: { username:username }});
    if (user == null || password != user.password){var message = "Username or Password Incorrect"
    res.render(__dirname+"/views/index.ejs",
    {
        mes:message,

    });
    }else
    {
        req.session.secretsauce = user;
        res.redirect("/attedance");
    }


});


app.get("/signup",(req,res) => 
{
    if (req.session.secretsauce){res.redirect("/attedance"); return }
    res.render(__dirname+"/views/signup.ejs");
    console.log("So you have come to sign up eh?");

})
app.listen(8080,()=> 
{
    console.log("haha port 8080 go brrrr");
})

