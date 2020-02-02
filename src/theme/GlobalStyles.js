import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Baloo|Lato:300,400&display=swap');
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    padding: 0;
    margin: 0;
    font-family: 'Lato', sans-serif;
    transition: all ease 300ms;
  }
  button, p, a{
     font-family: 'Lato', sans-serif;
     font-weight: 400;
  }
  h1, h2, h3, h4, h5, h6{
    font-family: 'Baloo', cursive;
  }
`;

export default GlobalStyles;
