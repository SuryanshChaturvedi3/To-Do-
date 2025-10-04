const Routes = require('express')
const userModel = require('../models/user');
const {createTokenForUser} = require ("../services/authentication");

const router = Routes.Router();

/*--------------Create User------------------*/
    
router.get("/signUp", (req, res) => {
    res.render("signUp");
});


/*--------------Sign Up User------------------*/
router.post("/signUp", async(req,res)=>{
    const {email,password,fullname} = req.body;//user ka data fetch kr rhe hai
    console.log(req.body);
  await userModel.create(
    {
        email,
        password,
        fullname,
    });
    
    res.redirect("/signIn");
});



/*--------------Sign In User------------------*/
router.get("/signIn", (req, res) => {
    res.render("signIn");
});



router.post("/signIn", async (req, res) => {
  const { email, password } = req.body;

  try {
    // ✅ Model ke static method ka call
    const token = await userModel.createTokenForUser(email, password);

    if (!token) {
      return res.status(401).render("signIn", { error: "Invalid email or password" });
    }

    // ✅ Cookie set karo
    res.cookie("token", token, { httpOnly: true });

    // ✅ Redirect
    res.redirect("/home");
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).render("signIn", { error: "Server error" });
  }
});












/*--------------Get All Users------------------*/
router.get('/users', async (req, res) => {
        const users = await userModel.find();
        res.status(200).json(users);
});

/*--------------Update User------------------*/
router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { fullname, email, password } = req.body;
    const updateUser =await userModel.findByIdAndUpdate(id, { fullname, email, password }, { new: true });
    res.status(200).json({ message: 'User updated successfully', user: updateUser });
});

/*--------------Delete User------------------*/
router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    await userModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
});




module.exports = router;