const User=require("../Models/userModel.js")
const bcrypt=require("bcrypt")
module.exports.register = async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            return res.json({ message: "Username is already in use" });
        }
        
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res.json({ message: "Email is already in use" });
        }
        
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword
        });
        
        delete user.password;
        return res.json({ status: true, user });
    } catch (error) {
        next(error); 
    }
};
module.exports.login = async (req, res, next) => {
    try {
        const { username, password, } = req.body;
        
        const user = await User.findOne({ username });
        if (!user) {
            return res.json({ message: "Username/Password is Inaccurate",status:false });
        }
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            return res.json({ message: "Username/Password is Inaccurate",status:false });
         }
         delete user.password;
        return res.json({ status: true, user });
    } catch (error) {
        next(error); 
    }
};
