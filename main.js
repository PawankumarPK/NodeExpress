var express = require("express")
var app = express()
app.use("/static", express.static("public"))
app.set("view engine", "twig")
app.set("views", "./public/views")

//parse application/x-www-form-urlencode
//parse application/json
const { check, validationResult } = require("express-validator")
const bodyParser = require("body-parser")
const { urlencoded } = require("body-parser")
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//For match data when you have lots of textfield
const { matchedData, sanitizeBody } = require("express-validator")

app.listen(3000, () => {
    console.log("Server running at port 3000");
})

app.get("/", (req, res) => {
    res.render("index", { title: "Login Form", Message: "Enter username and password", })
})

// app.post("/login", urlencodedParser, (req, res) => {
//     res.render("login", { title: "User Details", username: req.body.username, password: req.body.password })
// })

app.post("/login", urlencodedParser, [
    check("username", "username should be emailID").trim().isEmail(),
    check("password", "password must be in 5 character").trim().isLength({ min: 5 }),
    check("cpassword").custom((value,{req})=>{
        if (value != req.body.password) {
            throw new Error("Confirm Password does not match password")
        }
        return true
    })
], (req, res) => {
    const errors = validationResult(req)
    console.log(errors.mapped());
    if (!errors.isEmpty()) {
        const user = matchedData(req)
        res.render("index", {title:"User Details", error: errors.mapped(),user:user})
    } else {
        const user = matchedData(req)
        console.log(user);
        res.render("login", { title: "User Details", user: user })
    }
})
