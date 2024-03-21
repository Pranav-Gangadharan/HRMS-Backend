const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: String,
  clientId: String,
  mobile: String,
  email: String,
  status: String,
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
