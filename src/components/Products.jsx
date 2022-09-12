import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import Product from "./Product"

const Container = styled.div`
    padding: .7rem 0;
`

const Title = styled.h1`
    display: flex;
    align-items: center;
    justify-content: center;
`

const Wrapper = styled.div`
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Products = (props) => {
    const { products } = useSelector(state => state.products)
    const [productsState, setProductsState] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        if (props.data.length > 0) {
            setProductsState(props.data)
        } else {
            setProductsState(products)
        }
    }, [products, props.data])

    useEffect(() => {
        props.filters &&
        setFilteredProducts(
            productsState.filter((item) =>
                item.warehouses.some((warehouse) =>
                    Object.entries(props.filters).every(([key, value]) =>
                        // eslint-disable-next-line eqeqeq
                        warehouse[key] == value
                    )
                )
            )
        )
    }, [productsState, props.filters])

    useEffect(() => {
        if (props.sort === "newest") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.created_at - b.created_at)
            )
        } else if (props.sort === "lowest") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.warehouses[0].price - b.warehouses[0].price)
            )
        } else {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => b.warehouses[0].price - a.warehouses[0].price)
            )
        }
    }, [props.sort])

    return (
        <Container>
            <Title>Beloved Products</Title>
            <Wrapper>
                {filteredProducts.length > 0 ? 
                    filteredProducts.map(item => (
                        <Product item={item} key={ item.id } />
                    )) :
                    productsState.map(item => (
                        <Product item={ item } key={ item.id } />
                    ))
                }
            </Wrapper>
        </Container>
    )
}

export default Products
