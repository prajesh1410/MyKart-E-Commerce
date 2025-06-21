import styled from "styled-components";
import { CheckCircleOutline } from "@material-ui/icons";
import { useLocation, Link } from "react-router-dom";

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #e0ffe0, #f5fff5);
`;

const Wrapper = styled.div`
  text-align: center;
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const Icon = styled(CheckCircleOutline)`
  font-size: 80px !important;
  color: green;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #333;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #555;
  margin-bottom: 30px;
`;

const Button = styled(Link)`
  padding: 12px 24px;
  background-color: green;
  color: white;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  transition: 0.3s;

  &:hover {
    background-color: darkgreen;
  }
`;

const Success = () => {
  const location = useLocation();
  console.log(location);

  return (
    <Container>
      <Wrapper>
        <Icon />
        <Title>Payment Successful!</Title>
        <Subtitle>Your order has been placed. Thank you for shopping with us.</Subtitle>
        <Button to="/">Go to Homepage</Button>
      </Wrapper>
    </Container>
  );
};

export default Success;
