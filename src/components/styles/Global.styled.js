import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

ul {
    list-style: none;
}

li {
    list-style: none;
}

a {
    text-decoration: none;
}

img {
    max-width: 100%;
}
`;
