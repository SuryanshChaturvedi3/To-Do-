const express = require('express');
const todoModel = require('../models/todouser'); // make sure file ka naam ye hi hai
const router = express.Router();

/*--------------Create Todo------------------*/
router.post("/add", async (req, res) => {
  const { title,  description } = req.body;
    const userId = req.user.id; // ✅ middleware se
  console.log(title,userId,description);
  await todoModel.create({ title, description, userId });
  res.redirect(`/home?user=${userId}`); // ✅ correct redirect
});



/*--------------Show Todos------------------*/
router.get("/home", async (req, res) => {
  const userId = req.query.userId; 
  const todos = await todoModel.find({ userId }); 
  res.render("home", { todos, userId }); // ✅ actual userId bhejna h
});






/* ✅ Delete todo */
router.post('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body; 
  await todoModel.findByIdAndDelete(id);
  res.redirect(`/home?userId=${userId}`); // ✅ same user ke todos dikhte rahenge
});

module.exports = router;
