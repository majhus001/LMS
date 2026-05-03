// repositories/userRepository.js
const User = require("../models/User");

// Create User
exports.createUser = async (data) => {
  return await User.create(data);
};

// Find by Email
exports.findByEmail = async (email) => {
  return await User.findOne({ email });
};

// Find by ID
exports.findById = async (id) => {
  return await User.findById(id);
};

// Get All Users
exports.getAllUsers = async () => {
  return await User.find();
};

// Update User
exports.updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

// Delete User
exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};