
import { User } from '../types';

const DB_KEY = 'agrisage_users';
const SESSION_KEY = 'agrisage_current_user';


export const dbService = {
  // Save a new user
  register: async (user: Omit<User, 'id'>): Promise<{ success: boolean; message: string; user?: User }> => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      
      const data = await response.json();
      if (data.success) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(data.user));
        return { success: true, message: 'Registration successful!', user: data.user };
      }
      return { success: false, message: data.message || 'Registration failed.' };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Server error during registration.' };
    }
  },

  // Login check
  login: async (email: string, password: string): Promise<{ success: boolean; message: string; user?: User }> => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      if (data.success) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(data.user));
        return { success: true, message: 'Login successful!', user: data.user };
      }
      return { success: false, message: data.message || 'Invalid email or password.' };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Server error during login.' };
    }
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
