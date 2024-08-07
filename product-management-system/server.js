const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const path = require('path');


connectDb();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());



app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/users", require("./routes/userRoutes"));


app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on the port ${port}`);
});
