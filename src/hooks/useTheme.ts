import { useMemo } from 'react';
import { useThemeStore } from '@/store/themeStore';
import { lightTheme } from '@/theme/lightTheme';
import { darkTheme } from '@/theme/darkTheme';

export const useTheme = () => {
  const { theme, toggleTheme, setTheme } = useThemeStore();

  const muiTheme = useMemo(() => {
    return theme === 'light' ? lightTheme : darkTheme;
  }, [theme]);

  return {
    theme,
    muiTheme,
    toggleTheme,
    setTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  };
};
