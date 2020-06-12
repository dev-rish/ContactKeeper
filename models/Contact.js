const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  phone: {
    type: Number
  },

  type: {
    type: String,
    default: "personal"
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;
