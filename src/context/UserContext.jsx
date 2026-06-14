import { createContext, useState, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const COOKIE_NAME = "marvromwdv";
const FAVORITES_KEY = `${COOKIE_NAME}_favorites`;

const loadFavoritesFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
};

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get(COOKIE_NAME) || null);
  const [email, setEmail] = useState(
    localStorage.getItem(`${COOKIE_NAME}_email`) || null
  );
  const [favorites, setFavorites] = useState(loadFavoritesFromStorage);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const syncFavorites = (favs) => {
    setFavorites(favs);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  };

  const login = (newToken, newEmail, newFavorites) => {
    Cookies.set(COOKIE_NAME, newToken, { expires: 1 });
    localStorage.setItem(`${COOKIE_NAME}_email`, newEmail);
    setToken(newToken);
    setEmail(newEmail);
    if (newFavorites) syncFavorites(newFavorites);
  };

  const logout = () => {
    Cookies.remove(COOKIE_NAME);
    localStorage.removeItem(`${COOKIE_NAME}_email`);
    localStorage.removeItem(FAVORITES_KEY);
    setToken(null);
    setEmail(null);
    setFavorites([]);
  };

  const addFavorite = async (favData) => {
    if (!token) return;
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/favorites`,
      favData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    syncFavorites(data.favorites);
  };

  const removeFavorite = async (marvelId) => {
    if (!token) return;
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API_URL}/favorites/${marvelId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    syncFavorites(data.favorites);
  };

  return (
    <UserContext.Provider
      value={{
        token,
        email,
        favorites,
        addFavorite,
        removeFavorite,
        login,
        logout,
        isModalOpen,
        openModal: () => setIsModalOpen(true),
        closeModal: () => setIsModalOpen(false),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
