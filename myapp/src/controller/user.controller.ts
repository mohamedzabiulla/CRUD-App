import { Request, Response } from 'express';
import User from '../model/user.model';
import { hashPassword } from '../utils/hash.util';

// Create User
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    const hashed = await hashPassword(password);

    const user = await User.create({
      username: name,
      email,
      phone,
      password: hashed,
    });

    res.status(201).json(user);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(400).json({ error: 'User creation failed' });
  }
};

// Get All Users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

// Get User by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    user ? res.json(user) : res.status(404).json({ error: 'User not found' });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};

// Update User
export const updateUser = async (req: Request, res: Response) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    updated
      ? res.json(updated)
      : res.status(404).json({ error: 'User not found' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating user' });
  }
};

// Delete User
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    deleted
      ? res.json({ message: 'User deleted' })
      : res.status(404).json({ error: 'User not found' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};
