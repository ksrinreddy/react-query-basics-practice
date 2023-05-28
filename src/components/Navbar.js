import React from "react";
import { Link } from "react-router-dom";
import { Container } from "./styles/Container.styled";
import { StyledNavbar } from "./styles/Navbar.styled";

const Navbar = () => {
  return (
    <StyledNavbar>
      <Container>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/super-heroes">Traditional Super Heroes</Link>
          </li>
          <li>
            <Link to="/rq-super-heroes">RQ Super Heores</Link>
          </li>
        </ul>
      </Container>
    </StyledNavbar>
  );
};

export default Navbar;
