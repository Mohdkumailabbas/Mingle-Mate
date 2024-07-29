event.target.name is "username".
event.target.value is "John".
The formValues state is updated to { username: "John", email: "", password: "" }.
//route
usercontroller me registername a function banaya
module.exports.register=(req,res,next)=>{
    console.log(req.body)
}
phir userroute me route banaya
const { register } = require("../Controllers/userController");

const router = require("express").Router();

router.post("/register",register)
module.exports = router
phir index pr userroute use kr diya
app.use("/api/auth",userRoute)
