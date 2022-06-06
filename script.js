//  Started at 1:40 6-5-2022

const http = require("http");
var colors = require('colors');
const displayContent = require("./routes");

const server = http.createServer(displayContent);

server.listen(3001);

console.log('hello'.green); // outputs green text
console.log('i like cake and pies'.underline.red) // outputs red underlined text
console.log('inverse the color'.inverse); // inverses the color
console.log('OMG Rainbows!'.rainbow); // rainbow
console.log('Run the trap'.trap);


const displayContent = (req, res) => {
    const url = req.url;
    const method = req.method;

    if(url == "/profile") {
      res.setHeader("Content-type", "text/html");
      res.write("<p>This is the profile page.<p>");
      return res.end();
    } 
    else if (url == "/") {
      res.setHeader("Content-type", "text/html");
      res.write("<p>cheeseburgers<p>");
      return res.end();
    }
    else if (url == "/settings" && method == "POST") {
        res.setHeader("Content-type", "text/html");
        res.write('<h1>Form was submitted<h1>');
        return res.end();
    }
    else if (url == "/settings") {
        res.setHeader("Content-type", "text/html");
        res.write('<h1>Settings<h1><form action="/settings" method="POST"><input type="text"<button type="submit">Press Me</button></form>');
        return res.end();
    }

      res.setHeader("Content-type", "text/html");
      res.write("<p>Page not found<p>");
      res.end();
}

module.exports = displayContent;


const express = require('express');
const app = express();
const port = 3003;
const middleware = require('./middleware')
const path = require('path')
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin:Ifarted1!@twitterclonecluster.cl70w.mongodb.net/TwitterCloneDB?retryWrites=true&w=majority")
.then(() => {
    console.log("database connection successful");
}) 
.catch((err) => {
    console.log("database connection error " + err);
})

const server = app.listen(port, () => console.log("Server listening on port " + port));

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');

app.use("/login", loginRoute);
app.use("/register", registerRoute);

app.get("/", middleware.requireLogin, (req, res, next) => {

    var payload = {
        pageTitle: "Home"
    }

    res.status(200).render("home", payload);
})


extends layouts/login-layout.pug

block content
    .loginContainer
        h1 Register
        form#registerForm(method="post", onsubmit="event.preventDefault(); validateForm();")

            p.errorMessage #{errorMessage}

            input(type="text", name="firstName", placeholder="First name", value=firstName required="")
            input(type="text", name="lastName", placeholder="Last name", value=lastName required="")
            input(type="text", name="username", placeholder="Username", value=username required="")
            input(type="email", name="email", placeholder="Email", value=email required="")
            input#password(type="password", name="password", placeholder="Password", required="")
            input#passwordConf(type="password", name="passwordConf", placeholder="Confirm password", required="")
            input(type="submit", value="Login")

        a(href="/login") Already have an account? Login here.
    
    script.
        var passwordField = document.getElementById("password")
        var passwordConfirmField = document.getElementById("passwordConf")
        var form = document.getElementById("registerForm")

        function validateForm() {
            if(passwordField.value != passwordConfirmField.value) {
                alert("Passwords do not match. Please try again.")
            }
            else {
                form.submit();
            }
        }

doctype html
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        title #{pageTitle}
        link(rel='stylesheet', href='https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css', integrity='sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh', crossorigin='anonymous')
    body 
        block content 

        script(src='https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js', integrity='sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo', crossorigin='anonymous')
        script(src='https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js', integrity='sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6', crossorigin='anonymous')
        script(src='https://code.jquery.com/jquery-3.6.0.min.js', integrity='sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=', crossorigin='anonymous')


const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {

    res.status(200).render("register");
})

router.post("/", (req, res, next) => {

    var firstName = req.body.firstName.trim();
    var lastName = req.body.lastName.trim();
    var username = req.body.username.trim();
    var email = req.body.email.trim();
    var password = req.body.password;

    var payload = req.body;

    if(firstName && lastName && username && email && password) {

  }
    else {
        payload.errorMessage = "Make sure each field has a valid value.";
        res.status(200).render("register", payload);
    }
})

module.exports = router;

exports.requireLogin = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    else {
        return res.redirect('/login');
    }
}


extends layouts/login-layout.pug 

block content
    .loginContainer 
        h1 Login 
        form( method="post") 
            input(type="text", name="logUsername", placeHolder="Username or email", required="")
            input(type="password", name="logPassword", placeHolder="Password", required="")
            input(type="submit", value="Login")
        a(href="/register") Need an account? Register here.
        
        
doctype html
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(http-equiv="X-UA-Compatible", content="IE=edge")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        title #{pageTitle}
    body 
        block content 

doctype html
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        title Login 

        link(rel='stylesheet', href='https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css', integrity='sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh', crossorigin='anonymous')
        link(rel="stylesheet", href="/css/login.css")
    body 
        .wrapper 
            block content 
        
        script(src='https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js', integrity='sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo', crossorigin='anonymous')
        script(src='https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js', integrity='sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6', crossorigin='anonymous')
        script(src='https://code.jquery.com/jquery-3.6.0.min.js', integrity='sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=', crossorigin='anonymous')



body {
    background-color: #0099ff;
}

.wrapper {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.loginContainer {
    padding: 20px;
    width: 80%;
    max-width: 500px;
    border: 1px solid #dedede;
    background-color: #fff;
    text-align: center;
    box-shadow: 0 1px 4px rgba(0,0,0,0.3);
    -webkit-box-shadow: 0 1px 4px rgba(0,0,0,0.3);
    -moz-box-shadow: 0 1px 4px rgba(0,0,0,0.3);
}

form {
    display: flex;
    flex-direction: column;
}

input[type="text"],
input[type="email"],
input[type="password"] {
    margin-bottom: 20px;
    padding: 5px 10px;
    border-radius: 2px;
    border: 1px solid #dedede;
    background-color: #f2f2f2;
}

input[type="submit"] {
    background-color: #0099ff;
    color: #fff;
    border: none;
    border-radius: 2px;
    margin-bottom: 10px;
}


// Ended at 7:18 6-5-20222
