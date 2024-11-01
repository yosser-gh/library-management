import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 2em;
  background-color: #333;
  color: #fff;
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 1.5em;
  list-style: none;
`;

const SearchInput = styled.input`
  padding: 0.5em;
  border-radius: 5px;
  border: none;
`;

const LoanButton = styled.button`
  background-color: #ffcc00;
  padding: 0.5em 1em;
  border: none;
  border-radius: 5px;
  font-weight: bold;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <h1>Library</h1>
      <NavLinks>
        <li><a href="/books">Books</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/events">Events</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/account">Account</a></li>
      </NavLinks>
      <SearchInput type="text" placeholder="Search..." />
      <LoanButton>Loan a Book!</LoanButton>
    </HeaderContainer>
  );
};

export default Header;
