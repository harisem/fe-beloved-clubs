import { Facebook, Instagram, MailOutline, Phone, Room, Twitter } from "@mui/icons-material"
import { mobile } from "../responsive"
import styled from "styled-components"

const Container = styled.div`
    display: flex;
    ${mobile({ flexDirection: "column" })}
`

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`

const Logo = styled.h1`
    /*  */
`

const Description = styled.p`
    margin: 20px 0px;
`

const SocialContainer = styled.div`
    display: flex;
`

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${ props => props.color };
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`

const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ display: "none" })}
`

const Title = styled.h3`
    margin-bottom: 30px;
`

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`

const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ backgroundColor: "#FFF8F8" })}
`

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`

const Payment = styled.img`
    width: 70%;
`

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>Beloved</Logo>
                <Description>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi quae eius maiores asperiores explicabo aliquam optio iste sit, minus necessitatibus eligendi minima qui numquam beatae ipsam nesciunt ut esse possimus!
                </Description>
                <SocialContainer>
                    <SocialIcon color="3B5999">
                        <Facebook/>
                    </SocialIcon>
                    <SocialIcon color="E4405F">
                        <Instagram/>
                    </SocialIcon>
                    <SocialIcon color="55ACEE">
                        <Twitter/>
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Catalogs</ListItem>
                    <ListItem>Products</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Frequently Asked</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Center>
            <Center>
                <Title>Payment</Title>
                <Payment src="payment.png" />
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem><Room style={{ marginRight: "10px" }} /> Jl. Besi V No.1, Kotabumi, Kec. Purwakarta, Kota Cilegon, Banten 42434</ContactItem>
                <ContactItem><Phone style={{ marginRight: "10px" }} /> +62 812 9054 9571</ContactItem>
                <ContactItem><MailOutline style={{ marginRight: "10px" }} /> contact@beloved.com</ContactItem>
                {/* <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" /> */}
            </Right>
        </Container>
    )
}

export default Footer
