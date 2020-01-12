import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
const GlobalStyles = createGlobalStyle`
  ${reset}
  body {
    padding: 20px;
    margin: 0;
    font-family: 'Open Sans', sans-serif;
    transition: all ease 300ms;
  }
`;

export default GlobalStyles;
