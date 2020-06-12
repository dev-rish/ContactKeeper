const express = require("express");
const { check, validationResult } = require("express-validator");

const authMiddleWare = require("../middleware/auth");
const Contact = require("../models/Contact");

const router = express.Router();

// @route  GET api/contacts
// @desc   Get all contacts of a user
// @access Private
router.get("/", authMiddleWare, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route  POST api/contacts
// @desc   Add a new contact
// @access Private
router.post(
  "/",
  // array of middlewares
  [authMiddleWare, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route  PUT api/contacts
// @desc   Update contact
// @access Private
router.put("/:id", authMiddleWare, async (req, res) => {
  const { name, email, phone, type } = req.body;

  const contactFileds = {};
  if (name) contactFileds.name = name;
  if (email) contactFileds.email = email;
  if (phone) contactFileds.phone = phone;
  if (type) contactFileds.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ message: "Contact not found" });

    if (contact.user != req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: contactFileds
      },
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route  DELETE api/contacts
// @desc   Delete contact
// @access Private
router.delete("/:id", authMiddleWare, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ message: "Contact not found" });

    if (contact.user != req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    contact = await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
