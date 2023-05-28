import styled from "styled-components";

export const StyledNavbar = styled.nav`
  /* background: cyan; */
  background: #ef4444;
  /* color: #fff; */
  padding: 1rem 0;
  ul {
    display: flex;
    gap: 2rem;
  }

  a {
    /* color: #333; */
    color: #fff;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;
