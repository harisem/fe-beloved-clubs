import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { getProfile, getCities, getProvinces, updateProfile } from '../redux/apiCalls'
import { mobile } from '../responsive'

const Container = styled.div``

const Wrapper = styled.div`
    padding: 50px 50px 50px 50px;
    ${mobile({ padding: "10px" })}
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
    font-weight: 500;
    ${mobile({ display: "none" })}
`

const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`

const Bottom = styled.div``

const ProfileContainer = styled.div`
    display: flex;
    border: .5px solid lightgray;
    border-radius: 10px;
`

const ImageProfile = styled.img`
    flex: 1;
    padding: 20px;
    max-width: 30%;
    border-radius: 50%;
`

const InfoProfile = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
    padding: 2rem;
`

const Form = styled.form`
    /* display: flex; */
    /* padding: 2rem; */
`

const FormInputWrapper = styled.div`
    flex: 1;
    display: flex;
    padding-bottom: 15px;
    flex-direction: ${ (props) => props.type === "row" ? "row" : "column" };
`

const FormInput = styled.div`
    /* padding: 0 .8rem; */
    margin-right: .8rem;
    flex: 1;
    display: flex;
    flex-direction: column;
`

const Label = styled.label`
    font-weight: 500;
    padding-bottom: 5px;
`

const Input = styled.input`
    border: 2px solid;
`

const Select = styled.select`
    /*  */
`

const Option = styled.option`
    /*  */
`

const TextArea = styled.textarea`
    /*  */
`

const Button = styled.button`
    width: 40%;
    padding: 10px;
    margin: 20px;
    align-self: end;
    background-color: black;
    color: white;
    font-weight: 600;
    cursor: pointer;
`

const Profile = () => {
    const dispatch = useDispatch()
    const { currentUser, token } = useSelector(state => state.user)
    const { data } = useSelector(state => state.profiles)
    const { provinces, cities } = useSelector(state => state.ongkir)
    const [province, setProvince] = useState(null)
    const [city, setCity] = useState(null)

    useEffect(() => {
        getProfile(dispatch, token)
        getProvinces(dispatch)
    }, [dispatch, token])


    const [form, setForm] = useState({
        first_name: data?.first_name || '',
        last_name: data?.last_name || '',
        phone_number: data?.phone_number || '',
        full_address: data?.full_address || '',
        province_id: data?.provinces?.id || 0,
        city_id: data?.cities?.id || 0
    })

    useEffect(() => {
        setProvince(data?.provinces)
        setCity(data?.cities)
        return () => {
            setProvince(null)
            setCity(null)
        }
    }, [data?.cities, data?.provinces])

    const handleChange = (e) => {
        const elName = e.target.name
        const elValue = e.target.value
        setForm({...form, [elName]: elValue})
    }

    const handleProvinceChange = (e) => {
        const province_id = e.target.value
        setForm({...form, province_id: +province_id})
        // setProvince(province_id)
        getCities(dispatch, province_id)
    }

    useEffect(() => {
        if (province) getCities(dispatch, province.province_id)
    }, [province, dispatch])

    const handleCityChange = (e) => {
        const city_id = e.target.value
        setForm({...form, city_id: +city_id})
        setCity(city_id)
    }

    const handleSubmit = () => {
        updateProfile(dispatch, form, token)
    }

    return (
        <Container>
            <Navbar />
            <Wrapper>
                <Top>
                    <Link to="/products">
                        <TopButton>Continue Shopping</TopButton>
                    </Link>
                    <TopTexts>
                        <TopText>Hi, {data?.first_name} {data?.last_name}</TopText>
                    </TopTexts>
                    <Link to="/cart">
                        <TopButton type="filled">Shopping Bag</TopButton>
                    </Link>
                </Top>
                <Bottom>
                    <ProfileContainer>
                        <ImageProfile src="cesar-rincon-XHVpWcr5grQ-unsplash.jpg" />
                        <InfoProfile>
                            <Form>
                                <FormInputWrapper type="row">
                                    <FormInput>
                                        <Label>First Name</Label>
                                        <Input
                                            name="first_name"
                                            type="text"
                                            placeholder="First Name"
                                            defaultValue={data?.first_name}
                                            onChange={handleChange}
                                        />
                                    </FormInput>
                                    <FormInput>
                                        <Label>Last Name</Label>
                                        <Input
                                            name="last_name"
                                            type="text"
                                            placeholder="Last Name"
                                            defaultValue={data?.last_name}
                                            onChange={handleChange}
                                        />
                                    </FormInput>
                                </FormInputWrapper>
                                <FormInputWrapper type="row">
                                    <FormInput>
                                        <Label>Email</Label>
                                        <Input
                                            name="email"
                                            type="email"
                                            placeholder="Email Number"
                                            defaultValue={currentUser.email}
                                            onChange={handleChange}
                                        />
                                    </FormInput>
                                    <FormInput>
                                        <Label>Phone Number / Whatsapp</Label>
                                        <Input
                                            name="phone_number"
                                            type="text"
                                            placeholder="Phone Number"
                                            defaultValue={data?.phone_number}
                                            onChange={handleChange}
                                        />
                                    </FormInput>
                                </FormInputWrapper>
                                <FormInputWrapper type="row">
                                    <FormInput>
                                        <Label>Province</Label>
                                        <Select name="province" value={province?.province_id} defaultValue="" onChange={handleProvinceChange}>
                                            <Option value="" disabled>Select Province</Option>
                                            {provinces.map((p,i) => (
                                                <Option value={p.province_id} key={i}>{p.name}</Option>
                                            ))}
                                        </Select>
                                    </FormInput>
                                    <FormInput>
                                        <Label>Kabupaten / Kota</Label>
                                        <Select name="city" value={city?.city_id} defaultValue="" onChange={handleCityChange}>
                                            <Option value="" disabled>Select Kabupaten / Kota</Option>
                                            {cities?.map((c, i) => (
                                                <Option value={c.city_id} key={i}>{c.name}</Option>
                                            ))}
                                        </Select>
                                    </FormInput>
                                </FormInputWrapper>
                                <FormInputWrapper type="column">
                                    <FormInput>
                                        <Label>Full Address</Label>
                                        <TextArea
                                            rows="3"
                                            name="full_address"
                                            type="text"
                                            placeholder="Input your full address"
                                            defaultValue={data?.full_address}
                                            onChange={handleChange}
                                        />
                                    </FormInput>
                                </FormInputWrapper>
                            </Form>
                            <Button onClick={handleSubmit}>Save</Button>
                        </InfoProfile>
                    </ProfileContainer>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Profile
