import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTheme } from './useTheme';

// Mock the theme store
const mockThemeStore = {
  theme: 'light',
  toggleTheme: vi.fn(),
  setTheme: vi.fn(),
};

vi.mock('@/store/themeStore', () => ({
  useThemeStore: () => mockThemeStore,
}));

vi.mock('@/theme/lightTheme', () => ({
  lightTheme: { 
    palette: { mode: 'light' },
    typography: {
      fontWeightBold: 700,
      fontWeightMedium: 500,
      fontWeightRegular: 400,
    }
  },
}));

vi.mock('@/theme/darkTheme', () => ({
  darkTheme: { 
    palette: { mode: 'dark' },
    typography: {
      fontWeightBold: 700,
      fontWeightMedium: 500,
      fontWeightRegular: 400,
    }
  },
}));

describe('useTheme Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockThemeStore.theme = 'light';
  });

  it('returns correct theme values for light theme', () => {
    const { result } = renderHook(() => useTheme());
    
    expect(result.current.theme).toBe('light');
    expect(result.current.muiTheme.palette.mode).toBe('light');
    expect(result.current.isDark).toBe(false);
    expect(result.current.isLight).toBe(true);
    expect(result.current.toggleTheme).toBe(mockThemeStore.toggleTheme);
    expect(result.current.setTheme).toBe(mockThemeStore.setTheme);
  });

  it('returns correct theme values for dark theme', () => {
    mockThemeStore.theme = 'dark';
    
    const { result } = renderHook(() => useTheme());
    
    expect(result.current.theme).toBe('dark');
    expect(result.current.muiTheme.palette.mode).toBe('dark');
    expect(result.current.isDark).toBe(true);
    expect(result.current.isLight).toBe(false);
  });

  it('updates muiTheme when theme changes', () => {
    const { result, rerender } = renderHook(() => useTheme());
    
    expect(result.current.muiTheme.palette.mode).toBe('light');
    
    // Change theme to dark
    mockThemeStore.theme = 'dark';
    rerender();
    
    expect(result.current.muiTheme.palette.mode).toBe('dark');
  });

  it('provides toggleTheme function', () => {
    const { result } = renderHook(() => useTheme());
    
    act(() => {
      result.current.toggleTheme();
    });
    
    expect(mockThemeStore.toggleTheme).toHaveBeenCalledTimes(1);
  });

  it('provides setTheme function', () => {
    const { result } = renderHook(() => useTheme());
    
    act(() => {
      result.current.setTheme('dark');
    });
    
    expect(mockThemeStore.setTheme).toHaveBeenCalledWith('dark');
  });

  it('memoizes muiTheme correctly', () => {
    const { result, rerender } = renderHook(() => useTheme());
    
    const firstMuiTheme = result.current.muiTheme;
    
    // Rerender with same theme
    rerender();
    
    const secondMuiTheme = result.current.muiTheme;
    expect(firstMuiTheme).toBe(secondMuiTheme);
    
    // Change theme
    mockThemeStore.theme = 'dark';
    rerender();
    
    const thirdMuiTheme = result.current.muiTheme;
    expect(thirdMuiTheme).not.toBe(firstMuiTheme);
    expect(thirdMuiTheme.palette.mode).toBe('dark');
  });

  it('handles theme transitions correctly', () => {
    const { result, rerender } = renderHook(() => useTheme());
    
    // Start with light theme
    expect(result.current.isLight).toBe(true);
    expect(result.current.isDark).toBe(false);
    
    // Switch to dark theme
    mockThemeStore.theme = 'dark';
    rerender();
    
    expect(result.current.isLight).toBe(false);
    expect(result.current.isDark).toBe(true);
    
    // Switch back to light theme
    mockThemeStore.theme = 'light';
    rerender();
    
    expect(result.current.isLight).toBe(true);
    expect(result.current.isDark).toBe(false);
  });
});
