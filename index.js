const todoModel = require('./models/todouser'); // make sure file ka naam ye hi hai
const cookieParser = require('cookie-parser');
const {verifyTokenForCookie}=require("./middleware/auth")
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const todoroutes = require("./routes/todoroutes")
const router = require('./routes/user');
const app = express();
const PORT = 3000;


/*--------------MongoDB Connection------------------*/
mongoose
          .connect('mongodb://127.0.0.1:27017/userdb')
          .then(() => {
              console.log('MongoDB connected');
          })


/*--------------Middleware------------------*/       
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(verifyTokenForCookie("token"));





app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


/*--------------Routes------------------*/
app.get('/', (req, res) => {
    res.render("home");
});


app.get("/home", async (req, res) => {
    try {
        const userId = req.user ? req.user.id : req.query.user; // ✅ middleware se user id
        const todos = await todoModel.find({ userId });
        res.render("home", { user: req.user, todos }); // ✅ EJS me user info
    } catch (err) {
        console.error("Error fetching todos:", err);
        res.status(500).send("Server Error");
    }
});




/*--------------User Routes------------------*/
app.use('/', router); // ise user routes ko use karna hai
app.use('/',todoroutes)

// ✅ Homepage route for after login



/*--------------Create User------------------*/
app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
})