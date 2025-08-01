// src/customTheme.js

export function getDesignTokens(mode) {
  return {
    palette: {
      primary: {
        main: mode === 'light' ? '#1976d2' : '#90caf9',
      },
      background: {
        default: mode === 'light' ? '#ffffff' : '#121212',
        paper: mode === 'light' ? '#f5f5f5' : '#1e1e1e',
      },
    },
  };
}

export const inputsCustomizations = {
  MuiTextField: {
    styleOverrides: {
      root: {
        marginBottom: '1rem',
      },
    },
  },
};
