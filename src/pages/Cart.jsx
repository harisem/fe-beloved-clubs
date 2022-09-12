import { Add, Remove } from "@material-ui/icons"
import { mobile } from "../responsive"
import styled from "styled-components"
// import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { addToCart, removeCart } from "../redux/apiCalls"
import { Link } from "react-router-dom"

const Container = styled.div`
    /*  */
`

const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: "10px" })}
`

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${ (props) => props.type === "filled" && "none" };
    background-color: ${ (props) => props.type === "filled" ? "black" : "transparent" };
    color: ${ (props) => props.type === "filled" && "white" };
`

const TopTexts = styled.div`
    ${mobile({ display: "none" })}
`

const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`

const Info = styled.div`
    flex: 3;
`

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`

const Image = styled.img`
    width: 200px;
`

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const ProductName = styled.span`
    /*  */
`

const ProductId = styled.span`
    /*  */
`

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid;
    background-color: ${ (props) => props.color };
`

const ProductSize = styled.span`
    /*  */
`

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`

const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({ margin: "5px 15px" })}
`

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({ marginBottom: "20px" })}
`

const Hr = styled.hr`
    background-color: #EEE;
    border: none;
    height: 1px;
`

const Summary = styled.div`
    flex: 1;
    border: .5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    /* height: 50vh; */
`

const SummaryTitle = styled.h1`
    font-weight: 200;
`

const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${ (props) => props.type === "total" && "500" };
    font-size: ${ (props) => props.type === "total" && "24px" };
`

const SummaryItemText = styled.span`
    /*  */
`

const SummaryItemPrice = styled.span`
    /*  */
`

const SummaryButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    cursor: pointer;
`

// const Link = styled.a`

// `

const Cart = () => {
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.user)
    const { carts, totalCart } = useSelector(state => state.carts)
    const [products, setProducts] = useState([])
    const [subTotal, setSubTotal] = useState(0)
    // const ref = useRef([])

    useEffect(() => {
        setProducts(carts)
        return () => {
            setProducts([])
        }
    }, [carts])

    useEffect(() => {
        setSubTotal(products.map((d) => d.price).reduce((prev, curr) => prev + curr, 0))
        return () => {
            setSubTotal(0)
        }
    }, [products])

    const handleQuantity = (type, i) => {
        // console.log(products[i])
        if (type === 'dec') {
            if (products[i].quantity === 1) {
                removeCart(dispatch, {
                    cart_id: products[i].id
                }, token)
            } else {
                addToCart(dispatch, {
                warehouse_id: products[i].warehouse_id,
                quantity: products[i].quantity - 1,
                price: products[i].price / products[i].quantity,
                weight: products[i].weight / products[i].quantity,
            }, token)
            }
        } else {
            addToCart(dispatch, {
                warehouse_id: products[i].warehouse_id,
                quantity: products[i].quantity + 1,
                price: products[i].price / products[i].quantity,
                weight: products[i].weight / products[i].quantity,
            }, token)
        }
    }

    return (
        <Container>
            {/* <Announcement/> */}
            <Navbar/>
            <Wrapper>
                <Title>Your Cart</Title>
                <Top>
                    <TopButton>Continue Shopping</TopButton>
                    <TopTexts>
                        <TopText>Shopping Bag({totalCart})</TopText>
                    </TopTexts>
                    <Link to="/checkout">
                        <TopButton type="filled">Checkout Now</TopButton>
                    </Link>
                </Top>
                <Bottom>
                    <Info>
                        {products.map((p, i) => (
                            <Product key={i}>
                                <ProductDetail>
                                    <Image src={`http://127.0.0.1:8004/storage/warehouses/${p.warehouses.frontImg}`} />
                                    <Details>
                                        <ProductName>
                                            <b>Product: </b>{p.warehouses.name}
                                        </ProductName>
                                        <ProductId>
                                            <b>ID: </b>131564876
                                        </ProductId>
                                        <ProductColor color={p.warehouses.color} />
                                        <ProductSize>
                                            <b>Size: </b>{p.warehouses.size}
                                        </ProductSize>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ProductAmountContainer>
                                        <Remove style={{ cursor: "pointer" }} onClick={() => handleQuantity('dec', i)} />
                                        <ProductAmount>{p.quantity}</ProductAmount>
                                        <Add style={{ cursor: "pointer" }} onClick={() => handleQuantity('inc', i)} />
                                    </ProductAmountContainer>
                                    <ProductPrice>Rp. {p.price}</ProductPrice>
                                </PriceDetail>
                            </Product>
                        ))}
                        <Hr/>
                    </Info>
                    <Summary>
                        <SummaryTitle>Order Summary</SummaryTitle>
                        
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>Rp. {subTotal}</SummaryItemPrice>
                        </SummaryItem>
                        <Link to="/checkout">
                            <SummaryButton>Checkout Now</SummaryButton>
                        </Link>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer/>
        </Container>
    )
}

export default Cart
