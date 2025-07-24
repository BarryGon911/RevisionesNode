import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./models/user.js";

const generateToken = (userId, displayName, role) => {
    return jwt.sign({ userId, displayName, role },
        process.env.JWT_SECRET,
        { expiresIn: "1h", }
    );
}

const checkUserExists = async (email) => {
    return (user = await User.findOne({ email }));
}

const generatePassword = async(password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}
async function register(req, res) {
    try {
        const { email, displayName, role, avatar, phone } = req.body;
        
        const userExist = await checkUserExists(email);
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }
        const  hashPassword = await generatePassword(body.password);
        
        const newUser = {
            displayName,
            email,
            hashPassword,
            role,
            avatar,
            phone
        };
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Internal Server error" });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const userExist = await checkUserExists(email);
        if (!userExist) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const isPasswordValid = await bcrypt.compare(password, userExist.hashPassword);
        if(!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = generateToken(userExist._id, userExist.displayName, userExist.role);
        res.status(200).json(token);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server error" });
    }
}

export { register, login };
