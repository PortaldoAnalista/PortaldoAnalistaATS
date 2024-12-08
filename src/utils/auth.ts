import { User } from '../types';

export const login = (email: string, password: string): User | null => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  return users.find((u: User) => u.email === email && u.password === password) || null;
};

export const initializeMasterUser = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.length === 0) {
    const masterUser = {
      username: 'Mestre',
      email: 'portaldoanalistaats@gmail.com',
      password: 'ats0124ats',
      team: 'Master',
      role: 'master'
    };
    localStorage.setItem('users', JSON.stringify([masterUser]));
  }
};