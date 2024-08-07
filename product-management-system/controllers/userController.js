const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//@desc register a user
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body;
    
    if (!username || !password || !email) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered!");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password: ", hashedPassword);

    const profilePicture = req.file ? req.file.path : null;

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        profilePicture
    });
    console.log(`User created: ${user}`);


    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});

// //@desc login user
// //@route POST /api/users/login
// //@access public

    const loginUser = asyncHandler(async (req, res) => {

    console.log('Request Body:', req.body); // Log request body
    const { email, password } = req.body;
    console.log('Email:', email); // Log extracted email
    console.log('Password:', password); // Log extracted password

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const user = await User.findOne({ email });
 
    // Comparing password with hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                    profilePicture: user.profilePicture,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30m" }
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Email or password is not valid");
    }
});
// const loginUser = asyncHandler(async (req, res) => {
//     console.log('Request Body:', req.body);
//     const { email, password } = req.body;

//     if (!email || !password) {
//         console.log("Error: All fields are mandatory");
//         res.status(400).json({ message: "All fields are mandatory!" });
//         return;
//     }

//     const user = await User.findOne({ email });
//     console.log('User found:', user);

//     // res.status(200).json( {message:"la badhai xa"});
    

//     if (user && (await bcrypt.compare(password, user.password))) {
//         const accessToken = jwt.sign(
//             {
//                 user: {
//                     username: user.username,
//                     email: user.email,
//                     id: user.id,
//                     profilePicture: user.profilePicture,
//                 },
//             },
//             process.env.ACCESS_TOKEN_SECRET,
//             { expiresIn: "30m" }
//         );
//         console.log('Generated Access Token:', accessToken);
//         res.status(200).json({ accessToken });
//     } else {
//         console.log("Error: Email or password is not valid");
//         res.status(401).json({ message: "Email or password is not valid" });
//     }
// });





//@desc Current user information
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});



module.exports = { registerUser, loginUser, currentUser};
