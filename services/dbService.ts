
import { User } from '../types';

const DB_KEY = 'agrisage_users';
const SESSION_KEY = 'agrisage_current_user';

export const dbService = {
  // Get all users from simulated DB
  getUsers: (): User[] => {
    const data = localStorage.getItem(DB_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Save a new user
  register: (user: Omit<User, 'id'>): { success: boolean; message: string; user?: User } => {
    const users = dbService.getUsers();
    if (users.find(u => u.email === user.email)) {
      return { success: false, message: 'User already exists with this email.' };
    }
    
    const newUser: User = {
      ...user,
      id: Math.random().toString(36).substr(2, 9),
    };
    
    users.push(newUser);
    localStorage.setItem(DB_KEY, JSON.stringify(users));
    
    // Auto login
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    return { success: true, message: 'Registration successful!', user: newUser };
  },

  // Login check
  login: (email: string, password: string): { success: boolean; message: string; user?: User } => {
    const users = dbService.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      return { success: true, message: 'Login successful!', user };
    }
    
    return { success: false, message: 'Invalid email or password.' };
  },

  // Get current session
  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  },

  // Logout
  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  }
};
