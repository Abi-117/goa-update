const express = require("express");
const router = express.Router();
const Contact = require("../models/contact.model");

// Create message
router.post("/", async (req, res) => {
  try {
    const newMessage = await Contact.create(req.body);
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all messages
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
