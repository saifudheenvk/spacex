import styled from "styled-components";
import logo from "../../assets/Logo.svg";

const Container = styled.div`
  text-align: center;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  padding: 20px 0px 20px 0px;
  position: fixed;
  z-index: 100;
  background: #fff;
  width: 100%;
`;

const Logo = styled.img``;

const Header = () => {
  return (
    <Container>
      <Logo src={logo} />
    </Container>
  );
};

export default Header;
