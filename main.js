var express = require("express")
var app = express()
app.use("/static", express.static("public"))
app.set("view engine", "twig")
app.set("views", "./public/views")

//parse application/x-www-form-urlencode
const { check, validationResult } = require("express-validator")
const bodyParser = require("body-parser")
const { urlencoded } = require("body-parser")
var jsonParser  = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//parse application/json

app.listen(3000, () => {
    console.log("Server running at port 3000");
})

app.get("/", (req, res) => {
    res.render("index", { title: "Login Form", Message: "Enter username and password", })
})

app.post("/login", urlencodedParser,(req, res) => {
    res.render("login", { title: "User Details", username: req.body.username, password: req.body.password })
})


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})
app.get("/users/:id/books/:booksId", (req, res) => {
    res.send("User data accessed: " + req.params.id + " " + req.params.booksId)
})

app.get("/users/:id?", (req, res) => {

    if (req.params.id == undefined)
        res.send("User data accessed ")
    else
        res.send("User data accessed: " + req.params.id)
})

//If we use "?" it means its a optional for user it can provide further detail or not
//And we can replace "-" to "." there is no change in response
app.get("/flights/:From?-:To?", (req, res) => {

    res.send("Search flight from: " + req.params.From + " to " + req.params.To)
})

//We can send id as per security level
//between * any value enter it will be the id
app.get("/ab*cd", (req, res) => {

    console.log(req.params)
    res.send("Id level is secure ")
})


//Middleware 

var validation = (req, res, next) => {
    if (req.params.username == "pawan")
        console.log("Authrized user");
    else
        console.log("UnAuthrized user");
    next()

}
//app.use(validation)

app.get("/middle/:username", validation, (req, res) => {
    res.send(req.params.username)
    //res.send("Hello validation")
})


app.get("/middleTwo/", (req, res) => {
    res.send("Hello validation Two")
})