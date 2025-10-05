import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '../redux/chatSlice';

const useDarkMode = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.chat.darkMode);

  useEffect(() => {
    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      dispatch(setDarkMode(savedTheme === 'dark'));
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      dispatch(setDarkMode(prefersDark));
    }
  }, [dispatch]);

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    dispatch(setDarkMode(!isDarkMode));
  };

  return { isDarkMode, toggleDarkMode };
};

export default useDarkMode;