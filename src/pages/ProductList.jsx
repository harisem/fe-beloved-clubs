import { mobile } from "../responsive"
import styled from "styled-components"
// import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
// import Newsletter from "../components/Newsletter"
import Products from "../components/Products"
import { useSelector } from "react-redux"
import { useState } from "react"

const Container = styled.div`
    /*  */
`

const Wrapper = styled.div`
    padding-top: 45px;
    ${mobile({ paddingTop: "30px" })}
`

// const Title = styled.h1`
//     margin: 20px;
// `

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const Filter = styled.div`
    margin: 20px;
    ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({ marginRight: "0px" })}
`

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({ margin: "10px 0px" })}
`

const Option = styled.option`
    /*  */
`

const ProductList = () => {
    const data = useSelector((state) => state.products.products)
    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState("newest")

    const handleFilters = (e) => {
        const value = e.target.value
        setFilters({
            ...filters,
            [e.target.name]: value,
        })
    }

    return (
        <Container>
            <Navbar/>
            {/* <Announcement/> */}
            <Wrapper>
                {/* <Title>Dresses</Title> */}
                <FilterContainer>
                    <Filter>
                        <FilterText>Filter Products:</FilterText>
                        <Select name="color" defaultValue="" onChange={handleFilters}>
                            <Option value="" disabled>Color</Option>
                            <Option value="black">Black</Option>
                            <Option value="white">White</Option>
                            <Option value="red">Red</Option>
                            <Option value="blue">Blue</Option>
                            <Option value="pink">Pink</Option>
                        </Select>
                        <Select name="size" defaultValue="" onChange={handleFilters}>
                            <Option value="" disabled>Size</Option>
                            <Option value="S">S</Option>
                            <Option value="M">M</Option>
                            <Option value="L">L</Option>
                            <Option value="XL">XL</Option>
                        </Select>
                    </Filter>
                    <Filter>
                        <FilterText>Sort Products:</FilterText>
                        <Select defaultValue="newest" onChange={(e) => setSort(e.target.value)}>
                            <Option value="newest">Newest</Option>
                            <Option value="highest">Highest Price</Option>
                            <Option value="lowest">Lowest Price</Option>
                        </Select>
                    </Filter>
                </FilterContainer>
            </Wrapper>
            <Products data={data} filters={filters} sort={sort} />
            {/* <Newsletter/> */}
            <Footer/>
        </Container>
    )
}

export default ProductList
