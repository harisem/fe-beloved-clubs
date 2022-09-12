import { categories } from "../data"
import { mobile } from "../responsive"
import styled from "styled-components"
import Catalog from "./Catalog"

const Container = styled.div`
    height: 80vh;
    padding: 2.5rem 0;
    ${mobile({ height: "100vh", padding: "3.5rem 0" })}
`

const Title = styled.h1`
    display: flex;
    align-items: center;
    justify-content: center;
`

const Wrapper = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    ${mobile({ padding: "10px 0px 0px 0px", flexDirection: "column" })}
`

const Catalogs = () => {
    return (
        <Container>
            <Title>Our Loved Catalogs</Title>
            <Wrapper>
                {categories.map(item => (
                    <Catalog item={ item } key={ item.id } />
                ))}
            </Wrapper>
        </Container>
    )
}

export default Catalogs
