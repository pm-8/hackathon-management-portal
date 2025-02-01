const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
      fullName: {
        type: String,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required : true,
        unique: false,
      },
    },
    { timestamps: true }
  );
  
  const User = mongoose.model("User", userSchema);
  module.exports = User;