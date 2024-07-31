import mongoose from "mongoose";

// Define the schema for custom properties in a Todo
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title for the todo."]
  },
  description: {
    type: String
  },
  category: {
    type: String,
    enum: ['To Do', 'Under Review', 'In Progress', 'Finished'],
    required: [true, "Please provide a category."]
  },
  priority: {
    type: String,
    enum: ['Urgent', 'Medium', 'Low','']
  },
  deadline: {
    type: Date
  },
  customProperties: {
    type: Map,
    of: mongoose.Schema.Types.Mixed // Allows for flexible custom properties
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });



const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name."],
  },
  email: {
    type: String,
    unique: [true, "Please provide an email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
  todos: [todoSchema] // Add the todos subcollection

});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
