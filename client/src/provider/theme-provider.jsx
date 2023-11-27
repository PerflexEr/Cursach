import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0766AD', // Green
      dark: '#29ADB2', // Dark Green
    },
    secondary: {
      main: '#3498db', // Blue
    },
    info: {
      main: '#1abc9c', // Turquoise
    },
    success: {
      main: '#2ecc71', // Green
      dark: '#27ae60', // Dark Green
    },
    warning: {
      main: '#f39c12', // Orange
    },
    error: {
      main: '#e74c3c', // Red
    },
  },
});

export const AppThemeProvider = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
