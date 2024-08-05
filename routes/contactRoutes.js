const express = require('express');

const router = express.Router();
const {getContacts,createContact,getContact,updateContact,deleteContact} = require("../controllers/contactController");
const validateToken = require('../middleware/validateTokenHandler');


router.use(validateToken);

//get routing for contacts and pot routing
router.route('/').get(getContacts).post(createContact);


//get,put and delete routing for contact
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);


module.exports = router