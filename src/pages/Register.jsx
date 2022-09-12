import { mobile } from "../responsive"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { register } from "../redux/apiCalls"
import { Link, useHistory } from "react-router-dom"

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    /* background: linear-gradient(
        rgba(255, 255, 255, .5), 
        rgba(255, 255, 255, .5)
        ), 
        url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
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
    width: 40%;
    padding: 20px;
    /* background-color: #d1d1d1; */
    border: 2px solid #5a1a1a;
    border-radius: 2rem 0;
    ${mobile({
        width: "75%"
    })}
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    ${mobile({
        flexDirection: "column"
    })}
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`

const Button = styled.button`
    width: 30%;
    border: none;
    padding: 10px;
    margin: 10px 0;
    background-color: #919191;
    color: white;
    cursor: pointer;
`

const Links = styled(Link)`
    margin: 5px 0px;
    font-size: 14px;
    text-decoration: underline;
    color: black;
    cursor: pointer;
`

const Register = () => {
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: '',
        password_confirmation: ''
    })

    const handleChange = (e) => {
        const elName = e.target.name
        const elValue = e.target.value
        setForm({...form, [elName]: elValue})
    }

    let history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await register(dispatch, form)
            if (res?.status === 201) history.push("/login")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Container>
            <Brand>Beloved Clubs</Brand>
            <Wrapper>
                <Title>Join The Club</Title>
                <Form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        onChange={handleChange}
                    />
                    <Input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        onChange={handleChange}
                    />
                    <Input
                        type="text"
                        name="email"
                        placeholder="Email Address"
                        onChange={handleChange}
                    />
                    <Input
                        type="text"
                        name="phone_number"
                        placeholder="Phone Number"
                        onChange={handleChange}
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                    <Input
                        type="password"
                        name="password_confirmation"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                    />
                    <Button type="submit">REGISTER</Button>
                </Form>
                <Links to="/login">Already have an Account? Loggin in!</Links>
            </Wrapper>
        </Container>
    )
}

export default Register
