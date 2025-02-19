import { createCssVariablesTheme } from './theme-css-variables';

export const myTheme = createCssVariablesTheme({
  name: 'my-theme',
  variableDefaults: {
    foreground: '#B1B1B1',
    background: '#09090b',
  },
});
