
import { User } from '../types';

const API_URL = 'http://localhost:5000/api';
const SESSION_KEY = 'agrisage_current_user';

export const dbService = {
  // Save a new user
  register: async (user: Omit<User, 'id'>): Promise<{ success: boolean; message: string; user?: User }> => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(data));
        return { success: true, message: 'Registration successful!', user: data };
      } else {
        return { success: false, message: data.message || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Could not connect to database' };
    }
  },

  // Login check
  login: async (email: string, password: string): Promise<{ success: boolean; message: string; user?: User }> => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(data));
        return { success: true, message: 'Login successful!', user: data };
      } else {
        return { success: false, message: data.message || 'Invalid email or password' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Could not connect to database' };
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
