var express = require("express")
var app = express()
app.use("/static", express.static("public"))
app.set("view engine", "twig")
app.set("views", "./public/views")

//parse application/x-www-form-urlencode
const { check, validationResult } = require("express-validator")
const bodyParser = require("body-parser")
const { urlencoded } = require("body-parser")
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//parse application/json

app.listen(3000, () => {
    console.log("Server running at port 3000");
})

app.get("/", (req, res) => {
    res.render("index", { title: "Login Form", Message: "Enter username and password", })
})

app.post("/login", urlencodedParser, (req, res) => {
    res.render("login", { title: "User Details", username: req.body.username, password: req.body.password })
})

app.post("/", urlencodedParser, [
    check("username", "username should be emailID").isEmail(),
    check("password", "password must be in 5 character").isLength({ min: 5 })
], (req, res) => {
    const errors = validationResult(req)
    console.log(errors.mapped());
    if (!errors.isEmpty()) {
        res.render("index", { error: errors.mapped() })
    } else {
        res.render("login", { title: "User Details", username: req.body.username, password: req.body.password })
    }
})
