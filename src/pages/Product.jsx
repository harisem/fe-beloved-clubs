import { Add, Remove } from "@mui/icons-material"
import { mobile } from "../responsive"
import styled from "styled-components"
// import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
// import Newsletter from "../components/Newsletter"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { addToCart, getProduct } from "../redux/apiCalls"
import { useLocation } from "react-router"
// import { Link } from "react-router-dom"
import { removeProduct } from "../redux/products"

const Container = styled.div`
    /*  */
`

const Wrapper = styled.div`
    padding: 70px 50px 50px 50px;
    display: flex;
    ${mobile({ padding: "10px", flexDirection: "column" })}
`

const ImgContainer = styled.div`
    flex: 1;
`

const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
    ${mobile({ height: "40vh" })}
`

const InfoContainer = styled.div`
    flex: 1;
    padding: 70px 50px 50px 50px;
    ${mobile({ padding: "10px" })}
`

const Title = styled.h1`
    font-weight: 200;
`

const Description = styled.p`
    margin: 20px 0px;
`

const Stock = styled.span`
    display: block;
    margin-bottom: 10px;
    font-weight: 300;
`

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`

const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`

const Filter = styled.div`
    display: flex;
    align-items: center;
`

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid;
    background-color: ${ props => props.color };
    margin: 0px 5px;
    cursor: pointer;
`

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`

const FilterSizeOption = styled.option`
    /*  */
`

const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`

const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;

    &:hover {
        background-color: #F8F4F4;
    }
`

const Discount = styled.s`
    margin-left: 1rem;
    text-decoration-color: red;
`

const Product = (props) => {
    const location = useLocation()
    const slug = location.pathname.split("/")[2]

    const dispatch = useDispatch()
    const { token } = useSelector(state => state.user)
    const { product, warehouses } = useSelector((state) => state.products)

    const [availableColor, setAvailableColor] = useState([])
    const [availableSize, setAvailableSize] = useState([])
    const [selectedColor, setSelectedColor] = useState("")
    const [selectedSize, setSelectedSize] = useState("S")
    const [filteredWarehouses, setFilteredWarehouses] = useState([])
    const [selectedWarehouse, setSelectedWarehouse] = useState({})
    const [quantity, setQuantity] = useState(1)

    const handleQuantity = (type) => {
        if (type === 'dec') {
            quantity > 1 && setQuantity(quantity - 1)
        } else {
            quantity !== selectedWarehouse.ready &&
            setQuantity(quantity + 1)
        }
    }

    const handleAddToCart = () => {
        addToCart(dispatch, {
            warehouse_id: selectedWarehouse.id,
            quantity: quantity,
            price: selectedWarehouse.price - (selectedWarehouse.price * (selectedWarehouse.discount / 100)),
            weight: selectedWarehouse.weight,
        }, token)
    }

    useEffect(() => {
        getProduct(dispatch, slug)

        return () => {
            dispatch(removeProduct())
        }
    }, [slug, dispatch])

    useEffect(() => {
        const colors = warehouses.map((w) => w.color)
        const sizes = warehouses.map((w) => w.size)
        setAvailableColor(Array.from(new Set(colors)))
        setAvailableSize(Array.from(new Set(sizes)))

        return () => {
            setAvailableColor([])
            setAvailableSize([])
        }
    }, [warehouses])

    useEffect(() => {
        const filteringProduct = () => {
            setFilteredWarehouses(warehouses.filter((w) => w.size === selectedSize))
        }
        if (selectedSize) filteringProduct()

        return () => {
            setFilteredWarehouses([])
        }
    }, [selectedSize, warehouses])
    
    useEffect(() => {
        const setColor = (color) => {
            setSelectedWarehouse(filteredWarehouses.find((item) => item.color === color))
        }
        if (selectedColor) setColor(selectedColor)

        return () => {
            setSelectedWarehouse({})
        }
    }, [filteredWarehouses, selectedColor])

    return (
        <Container>
            {/* <Announcement/> */}
            <Navbar/>
            <Wrapper>
                <ImgContainer>
                    <Image src={Object.keys(selectedWarehouse).length > 0 ? `http://127.0.0.1:8004/storage/warehouses/${selectedWarehouse.frontImg}` : product.image} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{selectedWarehouse.name ? selectedWarehouse.name : product.name}</Title>
                    <Description dangerouslySetInnerHTML={{ __html: product.content }}></Description>
                    <Stock>Available Stock: {selectedWarehouse.ready ? selectedWarehouse.ready : product.stock}</Stock>
                    
                    <Price>Rp. { Object.keys(selectedWarehouse).length > 0 ?
                        selectedWarehouse.price - (selectedWarehouse.price * (selectedWarehouse.discount / 100)) :
                        ''
                    }</Price>
                    {selectedWarehouse && selectedWarehouse.discount ?
                        <Discount>Rp. {selectedWarehouse.price}</Discount> : ''
                    }
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {availableColor.map((item) => (
                                <FilterColor color={item} key={item} onClick={() => setSelectedColor(item)} />
                            ))}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={(e) => setSelectedSize(e.target.value)}>
                                {availableSize.map((item) => (
                                    <FilterSizeOption key={item}>{item}</FilterSizeOption>
                                ))}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove style={{ cursor: "pointer" }} onClick={() => handleQuantity("dec")} />
                            <Amount>{quantity}</Amount> / {selectedWarehouse.ready ? selectedWarehouse.ready : product.stock}
                            <Add style={{ cursor: "pointer" }} onClick={() => handleQuantity("inc")} />
                        </AmountContainer>
                        <Button disabled={Object.keys(selectedWarehouse).length === 0 || !props.user} onClick={handleAddToCart}>ADD TO CART</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            {/* <Newsletter/> */}
            <Footer/>
        </Container>
    )
}

export default Product
