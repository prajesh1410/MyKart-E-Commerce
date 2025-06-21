import { Add, Remove, Delete } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import NavbarUser from "../components/NavbarUser";
import NavbarGuest from "../components/NavbarGuest";
import { useSelector, useDispatch } from "react-redux";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userRequest } from "../requestMethods";
import {
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
  clearCart, // ✅ Import clearCart
} from "../redux/cartRedux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;
const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const rawCartTotal = cart?.total ?? 0;
  const shippingCost = rawCartTotal < 50 && rawCartTotal > 0 ? 2 : 0;
  const discount = rawCartTotal < 50 && rawCartTotal > 0 ? 0 : 0;
  const totalAmount = rawCartTotal + shippingCost;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: totalAmount * 100,
        });

        dispatch(clearCart()); // ✅ Clear cart after successful payment
        navigate("/success", { state: { data: res.data } });
      } catch (err) {
        console.log(err);
      }
    };
    if (stripeToken && totalAmount >= 1) {
      makeRequest();
    }
  }, [stripeToken, totalAmount, navigate, dispatch]);

  const handleIncrease = (product) => {
    dispatch(increaseQuantity(product));
  };

  const handleDecrease = (product) => {
    dispatch(decreaseQuantity(product));
  };

  const handleRemove = (product) => {
    dispatch(removeProduct(product));
  };

  return (
    <Container>
      {user ? <NavbarUser /> : <NavbarGuest />}
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/" style={{ textDecoration: "none" }}>
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag({cart.products.length})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <StripeCheckout
            name="Mykart"
            image="https://i.ibb.co/2t1x5f3/logo.png"
            billingAddress
            shippingAddress
            description={`Your total is $${totalAmount.toFixed(2)}`}
            amount={totalAmount * 100}
            token={onToken}
            stripeKey="pk_test_51RWh034IO8PgZWXROXygasJLsebnK4aNptAqoOz9zsjJJb65lFCDuAu2h5vM3tPT1y5C5IRRO7rd7wR5cJjWGBFv00ImjEFZQE"
          >
            <TopButton>CHECKOUT NOW</TopButton>
          </StripeCheckout>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Remove
                      onClick={() => handleDecrease(product)}
                      style={{ cursor: "pointer" }}
                    />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Add
                      onClick={() => handleIncrease(product)}
                      style={{ cursor: "pointer" }}
                    />
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {(product.price * product.quantity).toFixed(2)}
                  </ProductPrice>
                  <Delete
                    onClick={() => handleRemove(product)}
                    style={{
                      color: "black",
                      fontSize: "28px",
                      marginTop: "10px",
                      cursor: "pointer",
                    }}
                  />
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {rawCartTotal.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ {shippingCost.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -{discount.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {totalAmount.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Mykart"
              image="https://i.ibb.co/2t1x5f3/logo.png"
              billingAddress
              shippingAddress
              description={`Your total is $${totalAmount.toFixed(2)}`}
              amount={totalAmount * 100}
              token={onToken}
              stripeKey="pk_test_51RWh034IO8PgZWXROXygasJLsebnK4aNptAqoOz9zsjJJb65lFCDuAu2h5vM3tPT1y5C5IRRO7rd7wR5cJjWGBFv00ImjEFZQE"
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
