const express= require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
// const cookieParser = require("cookie-parser");

// app.use(cookieParser("secretcode"));

// //signed cookies 
// app.get("/getsignedcookie" , (req , res)=>{
//     res.cookie("made-In", "India" , {signed :true});
//     res.send("signed cookie sent");
    
// });

// // verify cookie to check that the cookie is not being tempered 
// app.get("/verify " ,(req , res) =>{
//     console.log(req.cookies);
//     res.send("verify");
// });

// //cookies
// app.get("/getcookie" , (req , res)=>{
//     res.cookie("greet" , "hello");
//      res.cookie("madeIn" , "India");
//     res.send("sent you some cookies");
// });

// //geting cookies
// app.use("/greet" , (req , res)=>{
//     let {name = "anonymous"} = req.cookies;
//     res.send(`hii, ${name}`);;
// });
//   // parsing cookies
// app.get("/", (req, res) =>{
//     console.dir(req.cookies);
//     res.send("hiii i am root ");
// });

//  //post and users 
// app.use("/users" , users);
// app.use("/posts" , posts);


//express session 
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine" ,"ejs" );
app.set("views" , path.join(__dirname , "views"));

//using connectflash 
app.use(flash());
 
//using ssession 
app.use(
    session({
         secret : "mysupersecretstring" , 
         resave :false,
         saveUninitialized :true ,
        })
    );

    //register route
app.get("/register", (req , res)=>{
    let {name = "anonoymous"} = req.query;
    req.session.name = name;
     if (name == "anonoymous"){
        req.flash("error" , "user not register");
     }
     else{
        req.flash("success" , "user register is successful");
     }
   
    res.redirect("/hello");
    // res.send( name );
});

app.get("/hello", (req , res)=>{
    // res.send(`hello ${req.session.name}`);
    res.locals.successmsg = req.flash("success");
    res.locals.errormsg = req.flash("error");
    res.render("page.ejs" , {name :req.session.name  });
});
 
    // app.get("/req count" , (req , res)=>{
    //     if(req.session.count){
    //         req.seession.count++;
    //     }
    //     else{
    //         req.session.count = 1;
    //     }

    //     res.send(`You sent a request ${req.session.count} times`);
    // });



// app.get("/test" , (req, res)=>{
//    res.send("test successful"); 
// });

app.listen(3000, ()=>{
    console.log("listening to the port ");
}); 