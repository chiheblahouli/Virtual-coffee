const mongoose = require("mongoose");
const CoffeeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  tables: [
    {
      name: {
        type: String,
      },
      limitNumber: {
        type: Number,
      },
      users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    },
  ],
  status: { type: String },
});
module.exports = Coffee = mongoose.model("coffee", CoffeeSchema);
