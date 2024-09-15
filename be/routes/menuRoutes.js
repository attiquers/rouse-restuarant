const express = require("express");
const Menu = require("../models/Menu");
const router = express.Router();

// GET all menu categories
router.get("/menu", async (req, res) => {
  try {
    const menu = await Menu.find();
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/menu/:id", async (req, res) => {
  try {
    const id = req.params.id
    const category = await Menu.findById(id);
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new menu category
router.post("/menu", async (req, res) => {
  const menuCategory = new Menu({
    category: req.body.category,
    icon: req.body.icon,
    items: req.body.items,
  });

  try {
    const newCategory = await menuCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
