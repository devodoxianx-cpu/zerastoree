import type { User, AuthResponse } from '../types/auth';

const STORAGE_USERS_KEY = 'zerastore_registered_users';
const STORAGE_SESSION_KEY = 'zerastore_current_session';

interface StoredUser extends User {
  passwordHash: string;
}

// Initial demo users
const DEFAULT_USERS: StoredUser[] = [
  {
    id: 'user-demo-1',
    username: 'gamer_zera',
    email: 'gamer@zerastore.id',
    passwordHash: 'password123',
    role: 'Member',
    createdAt: new Date().toISOString(),
  },
];

const getStoredUsers = (): StoredUser[] => {
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_USERS;
  }
};

const saveStoredUsers = (users: StoredUser[]) => {
  try {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to save users:', err);
  }
};

export const getCurrentUser = (): User | null => {
  try {
    const raw = localStorage.getItem(STORAGE_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const registerUser = (
  username: string,
  email: string,
  password: string
): AuthResponse => {
  const cleanUsername = username.trim();
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanUsername || cleanUsername.length < 3) {
    return { success: false, message: 'Username minimal 3 karakter.' };
  }
  if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
    return { success: false, message: 'Format alamat email tidak valid.' };
  }
  if (!password || password.length < 6) {
    return { success: false, message: 'Password minimal 6 karakter.' };
  }

  const users = getStoredUsers();

  // Check username collision
  if (users.some((u) => u.username.toLowerCase() === cleanUsername.toLowerCase())) {
    return { success: false, message: 'Username sudah digunakan, silakan pilih yang lain.' };
  }

  // Check email collision
  if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
    return { success: false, message: 'Email sudah terdaftar. Silakan langsung masuk (login).' };
  }

  const newUser: StoredUser = {
    id: `user-${Date.now()}`,
    username: cleanUsername,
    email: cleanEmail,
    passwordHash: password,
    role: 'Member',
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveStoredUsers(users);

  // Auto-login session
  const sessionUser: User = {
    id: newUser.id,
    username: newUser.username,
    email: newUser.email,
    role: newUser.role,
    createdAt: newUser.createdAt,
  };
  localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(sessionUser));

  return {
    success: true,
    message: `Pendaftaran berhasil! Selamat datang, @${sessionUser.username}.`,
    user: sessionUser,
  };
};

export const loginUser = (
  identifier: string,
  password: string
): AuthResponse => {
  const cleanId = identifier.trim().toLowerCase();

  if (!cleanId || !password) {
    return { success: false, message: 'Silakan isi username/email dan password.' };
  }

  const users = getStoredUsers();
  const foundUser = users.find(
    (u) =>
      u.username.toLowerCase() === cleanId ||
      u.email.toLowerCase() === cleanId
  );

  if (!foundUser) {
    return { success: false, message: 'Akun tidak ditemukan. Silakan periksa kembali atau daftar akun baru.' };
  }

  if (foundUser.passwordHash !== password) {
    return { success: false, message: 'Password yang Anda masukkan salah.' };
  }

  const sessionUser: User = {
    id: foundUser.id,
    username: foundUser.username,
    email: foundUser.email,
    role: foundUser.role,
    createdAt: foundUser.createdAt,
  };
  localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(sessionUser));

  return {
    success: true,
    message: `Login berhasil! Selamat datang kembali, @${sessionUser.username}.`,
    user: sessionUser,
  };
};

export const logoutUser = () => {
  try {
    localStorage.removeItem(STORAGE_SESSION_KEY);
  } catch (err) {
    console.error('Failed to logout:', err);
  }
};

