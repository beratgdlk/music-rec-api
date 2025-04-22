import express from "express";
import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/user.controller";
import {
  authenticate,
  authorizeAdmin,
  authorizeUser,
} from "../middlewares/auth.middleware";

const router = express.Router();

// Get all users - admin only
router.get("/", authenticate, authorizeAdmin, getUsers);

// Get user by ID - authenticated
router.get("/:id", authenticate, getUserById);

// Update user - own profile or admin
router.put("/:id", authenticate, authorizeUser, updateUser);

// Delete user - own profile or admin
router.delete("/:id", authenticate, authorizeUser, deleteUser);

export default router;
