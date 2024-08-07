const express = require('express');
const router = express.Router();
const { registerUser, loginUser, currentUser} = require('../controllers/userController');
const { profilePictureUpload } = require('../config/multerConfig');
const validateToken = require('../middleware/validateTokenHandler');




// Route to register a new user.
// Requires authentication and allows single image.
router.post('/register', profilePictureUpload.single('profilePicture'), registerUser);

// Route to login user.
// Requires authentication.
// router.post('/login', loginUser);

router.post('/login', loginUser);

// Route to view the current user.
// Requires authentication.
router.get('/current', validateToken, currentUser);




module.exports = router;
