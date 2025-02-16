const { register,login,setAvatar, getAllUsers } = require("../Controllers/userController");

const router = require("express").Router();

router.post("/register",register)
router.post("/login",login)
router.get("/allusers/:id", getAllUsers);
router.post("/setAvatar/:id",setAvatar)
module.exports = router