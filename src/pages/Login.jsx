import { login } from "../redux/apiCalls"
import { mobile } from "../responsive"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { Link } from "react-router-dom"

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    /* background: linear-gradient(
        rgba(255, 255, 255, .5), 
        rgba(255, 255, 255, .5)
        ), 
        url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
    background-size: cover; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Brand = styled.h1`
    padding-bottom: 1rem;
`

const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    /* background-color: white; */
    border: 2px solid #5a1a1a;
    border-radius: 2rem 0;
    ${mobile({ width: "75%" })}
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0px;
    padding: 10px;
`

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 10px 20px;
    background-color: #919191;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
`

const Links = styled(Link)`
    margin: 5px 0px;
    font-size: 14px;
    text-decoration: underline;
    color: black;
    cursor: pointer;
`

const Error = styled.span`
    color: red;
`

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const { isFetching, error } = useSelector((state) => state.user)

    const handleClick = (e) => {
        e.preventDefault()
        login(dispatch, { email, password })
    }

    return (
        <Container>
            <Brand>Beloved Clubs</Brand>
            <Wrapper>
                <Title>Sign In</Title>
                <Form>
                    <Input
                        placeholder="email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        placeholder="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button onClick={handleClick} disabled={isFetching}>
                        LOGIN
                    </Button>
                    {error && <Error>Something went wrong...</Error>}
                    <Links to="#">Forgot your password?</Links>
                    <Links to="/register">Create new Account</Links>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login
