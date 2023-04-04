import { MoreVert } from "@mui/icons-material";
import { Chip, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { getTransactions } from "../redux/apiCalls";
import { mobile } from "../responsive";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 4.5rem 1rem 1rem 1rem;
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
  flex-direction: column;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 1;
  margin: 10px;
  /* padding: 10px; */
  /* display: flex; */
  border: 2px solid #737373;
  border-radius: 10px;
`;

const InfoHeader = styled.div`
  border-bottom: 1px solid #737373;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoHeaderTextWrapper = styled.div``;

const InfoHeaderText = styled.p``;

const InfoHeaderChip = styled.div`
  /*  */
`;

const InfoBody = styled.div`
  padding: 10px;
  margin: 15px 25px 15px 0;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div``;

const ProductName = styled.h1``;

const ProductTotal = styled.p``;

const PriceDetail = styled.div``;

const PriceDetailText = styled.p`
  /* margin: 5px; */
  font-size: 24px;
  font-weight: ${(props) => props.type === "bold" && "700"};
`;

const InfoFooter = styled.div`
  display: flex;
  justify-content: end;
  padding: 10px;
`;

const InfoFooterButton = styled.button`
  padding: 10px;
  margin-right: 25px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const History = () => {
  const { token } = useSelector((state) => state.user);
  const { totalCart } = useSelector((state) => state.carts);
  const dispatch = useDispatch();

  useEffect(() => {
    getTransactions(dispatch, token);
  }, [dispatch, token]);

  const { invoices } = useSelector((state) => state.invoices);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container>
      <Navbar />
      <Wrapper>
        {invoices.length > 0 ? (
          <Title>Your Transactions</Title>
        ) : (
          <Title>Make your first payment here!</Title>
        )}
        <Top>
          <TopButton>Continue Shopping</TopButton>
          <TopTexts>
            <TopText>Shopping Bag({totalCart})</TopText>
          </TopTexts>
          <Link to="/products">
            <TopButton type="filled">Explore Products</TopButton>
          </Link>
        </Top>
        <Bottom>
          {invoices.map((item, i) => (
            <Info key={i}>
              <InfoHeader>
                <InfoHeaderTextWrapper>
                  <InfoHeaderText>Shopping</InfoHeaderText>
                  <InfoHeaderText>
                    <Moment format="YYYY/MM/DD">{item.created_at}</Moment>
                  </InfoHeaderText>
                </InfoHeaderTextWrapper>
                <InfoHeaderChip>
                  {item.status === "success" ? (
                    <Chip label="Success" color="success" />
                  ) : item.status === "pending" ? (
                    <Chip label="Unpaid" color="info" variant="outlined" />
                  ) : item.status === "failed" ? (
                    <Chip label="Failed" color="error" />
                  ) : item.status === "expired" ? (
                    <Chip label="Expired" color="warning" />
                  ) : (
                    <Chip label="Status" />
                  )}
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls="long-menu"
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleOpen}
                  >
                    <MoreVert />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    MenuListProps={{ "aria-labelledby": "long-button" }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        maxHeight: 48 * 4.5,
                        width: "20ch",
                      },
                    }}
                  >
                    <MenuItem>View Invoices</MenuItem>
                    <MenuItem>Report</MenuItem>
                  </Menu>
                </InfoHeaderChip>
              </InfoHeader>
              <InfoBody>
                <Product>
                  <ProductDetail>
                    <Image
                      src={`http://127.0.0.1:8004/storage/warehouses/${item.orders[0].image}`}
                    />
                    <Details>
                      <ProductName>
                        {item.orders[0].warehouses.name}
                      </ProductName>
                      <ProductTotal>
                        {item.orders.length} Products ({item.orders.length - 1}+
                        remaining products)
                      </ProductTotal>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <PriceDetailText>Total:</PriceDetailText>
                    <PriceDetailText type="bold">
                      <NumericFormat
                        value={item.grand_total}
                        displayType="text"
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="Rp. "
                        thousandsGroupStyle="thousand"
                      />
                    </PriceDetailText>
                  </PriceDetail>
                </Product>
              </InfoBody>
              <InfoFooter>
                <InfoFooterButton>Repeat Order</InfoFooterButton>
              </InfoFooter>
            </Info>
          ))}
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default History;
