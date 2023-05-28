import styled from "styled-components";

export const StyledNavbar = styled.nav`
  background: cyan;
  padding: 1rem 0;
  ul {
    display: flex;
    gap: 2rem;
  }

  a {
    color: #333;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;
