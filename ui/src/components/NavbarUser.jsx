import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined, ExitToApp } from "@material-ui/icons";
import React, { useState, useRef } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/userRedux";

const Container = styled.div`height: 60px; ${mobile({ height: "50px" })}`;
const Wrapper = styled.div`padding: 10px 20px; display: flex; align-items: center; justify-content: space-between; ${mobile({ padding: "10px 0px" })}`;
const Left = styled.div`flex: 1; display: flex; align-items: center;`;
const Language = styled.span`font-size: 14px; cursor: pointer; ${mobile({ display: "none" })}`;
const SearchContainer = styled.div`border: 0.5px solid lightgray; display: flex; align-items: center; margin-left: 25px; padding: 5px;`;
const Input = styled.input`border: none; ${mobile({ width: "50px" })}`;
const Center = styled.div`flex: 1; text-align: center;`;
const Logo = styled.h1`font-weight: bold; ${mobile({ fontSize: "24px" })}`;
const Right = styled.div`flex: 1; display: flex; align-items: center; justify-content: flex-end; ${mobile({ flex: 2, justifyContent: "center" })}`;
const MenuItem = styled.div`font-size: 14px; cursor: pointer; margin-left: 25px; ${mobile({ fontSize: "12px", marginLeft: "10px" })}`;
const Dropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background-color: white;
  border: 1px solid lightgray;
  padding: 10px;
  z-index: 10;
  min-width: 100px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const NavbarUser = () => {
  const cart = useSelector((state) => state.cart);
  const totalItems = cart.products.reduce((sum, item) => sum + item.quantity, 0);

  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const timeoutRef = useRef(null);

  const showDropdown = () => {
    clearTimeout(timeoutRef.current);
    setDropdownVisible(true);
  };

  const hideDropdown = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownVisible(false);
    }, 200);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>MyKart</Link>
          </Logo>
        </Center>
        <Right>
          <div
            style={{ position: "relative", display: "inline-block" }}
            onMouseEnter={showDropdown}
            onMouseLeave={hideDropdown}
          >
            <MenuItem>{user?.username}</MenuItem>
            {dropdownVisible && (
              <Dropdown>
                <div
                  onClick={handleLogout}
                  style={{ cursor: "pointer", display: "flex", alignItems: "center", padding: "5px 10px" }}
                >
                  <ExitToApp fontSize="small" style={{ marginRight: "5px" }} />
                  Logout
                </div>
              </Dropdown>
            )}
          </div>
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={totalItems} color="primary"><ShoppingCartOutlined /></Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default NavbarUser;
