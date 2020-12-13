import { createGlobalStyle } from 'styled-components';

const GlobalHtmlBody = createGlobalStyle`
  html {
    height: 100vh;
    font-size: 62.5%;
  }
`;

function GlobalStyles() {
  return(
    <GlobalHtmlBody />
  )
};

export default GlobalStyles;
