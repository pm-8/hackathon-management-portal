const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
      },
      fullName: {
        type: String,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required : true,
        unique: false,
      },
      Role: {
        type: String
      },
      gender: {
        type: String
      },
    },
    { timestamps: true }
  );
  
  const User = mongoose.model("User", userSchema);
  module.exports = User;