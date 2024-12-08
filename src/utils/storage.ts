import { User, Support, Ticket } from '../types';

export const getUsers = (): User[] => {
  return JSON.parse(localStorage.getItem('users') || '[]');
};

export const addUser = (user: User): void => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
};

export const updateUser = (email: string, updatedUser: User): void => {
  const users = getUsers();
  const index = users.findIndex(u => u.email === email);
  if (index !== -1) {
    users[index] = updatedUser;
    localStorage.setItem('users', JSON.stringify(users));
  }
};

export const deleteUser = (email: string): void => {
  const users = getUsers();
  const filteredUsers = users.filter(u => u.email !== email);
  localStorage.setItem('users', JSON.stringify(filteredUsers));
};

export const getSupports = (): Support[] => {
  return JSON.parse(localStorage.getItem('supports') || '[]');
};

export const addSupport = (support: Support): void => {
  const supports = getSupports();
  supports.push(support);
  localStorage.setItem('supports', JSON.stringify(supports));
};

export const updateSupport = (username: string, updatedSupport: Support): void => {
  const supports = getSupports();
  const index = supports.findIndex(s => s.username === username);
  if (index !== -1) {
    supports[index] = updatedSupport;
    localStorage.setItem('supports', JSON.stringify(supports));
  }
};

export const deleteSupport = (username: string): void => {
  const supports = getSupports();
  const filteredSupports = supports.filter(s => s.username !== username);
  localStorage.setItem('supports', JSON.stringify(supports));
};

export const getReasons = (): string[] => {
  return JSON.parse(localStorage.getItem('reasons') || '[]');
};

export const addReason = (reason: string): void => {
  const reasons = getReasons();
  reasons.push(reason);
  localStorage.setItem('reasons', JSON.stringify(reasons));
};

export const updateReason = (oldReason: string, newReason: string): void => {
  const reasons = getReasons();
  const index = reasons.indexOf(oldReason);
  if (index !== -1) {
    reasons[index] = newReason;
    localStorage.setItem('reasons', JSON.stringify(reasons));
  }
};

export const deleteReason = (reason: string): void => {
  const reasons = getReasons();
  const filteredReasons = reasons.filter(r => r !== reason);
  localStorage.setItem('reasons', JSON.stringify(filteredReasons));
};

export const getTickets = (): Ticket[] => {
  return JSON.parse(localStorage.getItem('tickets') || '[]');
};

export const addTicket = (ticket: Ticket): void => {
  const tickets = getTickets();
  tickets.push(ticket);
  localStorage.setItem('tickets', JSON.stringify(tickets));
};

export const updateTicket = (id: string, updatedTicket: Ticket): void => {
  const tickets = getTickets();
  const index = tickets.findIndex(t => t.id === id);
  if (index !== -1) {
    tickets[index] = updatedTicket;
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }
};

export const deleteTicket = (id: string): void => {
  const tickets = getTickets();
  const filteredTickets = tickets.filter(t => t.id !== id);
  localStorage.setItem('tickets', JSON.stringify(filteredTickets));
};