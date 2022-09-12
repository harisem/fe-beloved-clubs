// import { Add, Remove } from '@material-ui/icons'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { checkout, getCities, getOngkir, getProvinces } from '../redux/apiCalls'
import { mobile } from '../responsive'

const Container = styled.div`
    /*  */
`

const Wrapper = styled.div`
    padding: 50px 20px 20px 20px;
    ${mobile({ padding: "10px" })}
`

// const Title = styled.h1`
//     font-weight: 300;
//     text-align: center;
// `

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
    flex: 1;
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
    padding-bottom: 20px;
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

const Form = styled.form`
    /* display: ${ (props) => props.type === "false" && "none" }; */
    padding-top: 1rem;
`

const FormInputWrapper = styled.div`
    flex: 1;
    /* display: flex; */
    display: ${ (props) => props.plan === "false" ? "none" : "flex" };
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

const Checkout = () => {
    const dispatch = useDispatch()
    const { profile, token } = useSelector(state => state.user)
    const { carts } = useSelector(state => state.carts)
    const [total, setTotal] = useState(0)
    const [subTotal, setSubTotal] = useState(0)
    const [estShipping, setEstShipping] = useState(0)

    const [form, setForm] = useState({
        courier: '',
        service: '',
        cost_courier: 0,
        weight: 0,
        name: profile.data.first_name + ' ' + profile.data.last_name,
        phone: profile.data.phone_number ? profile.data.phone_number : 0,
        province: 0,
        city: 0,
        address: '',
        grand_total: 0
    })

    const [formCOD, setFormCOD] = useState({
        courier: 'COD',
        service: 'COD',
        cost_courier: 0,
        weight: 0,
        name: profile.data.first_name + ' ' + profile.data.last_name,
        phone: profile.data.phone_number ? profile.data.phone_number : 0,
        province: 0,
        city: 0,
        address: 'COD',
        grand_total: 0
    })

    const handleChange = (e) => {
        const elName = e.target.name
        if (elName === 'phone') {
            const elValue = e.target.value
            setForm({...form, [elName]: +elValue})
            setFormCOD({...formCOD, [elName]: +elValue})
        } else {
            const elValue = e.target.value
            setForm({...form, [elName]: elValue})
            setFormCOD({...form, [elName]: elValue})
        }
    }

    useEffect(() => {
        setSubTotal(carts.map((c) => c.price).reduce((prev, curr) => prev + curr, 0))
        return () => {
            setSubTotal(0)
        }
    }, [carts])

    useEffect(() => {
        getProvinces(dispatch)
    }, [dispatch])

    const { provinces, cities, ongkir } = useSelector(state => state.ongkir)
    const [province, setProvince] = useState(0)
    const [city, setCity] = useState(0)

    const handleProvinceChange = (e) => {
        const province_id = e.target.value
        setProvince(province_id)
        setForm({...form, [e.target.name]: +e.target.value})
    }

    useEffect(() => {
        if (province) getCities(dispatch, province)
    }, [province, dispatch])

    const handleCityChange = (e) => {
        const city_id = e.target.value
        setCity(city_id)
        setForm({...form, [e.target.name]: +e.target.value})
    }

    const handleCourierChange = (e) => {
        const totalWeight = carts.map((c) => c.weight).reduce((prev, curr) => prev + curr, 0)
        const courier = e.target.value
        getOngkir(dispatch, {
            city_destination: city,
            weight: totalWeight,
            courier: courier
        })
        setForm({...form, [e.target.name]: e.target.value, weight: totalWeight})
    }

    const [courierService, setCourierService] = useState([])

    useEffect(() => {
        if (ongkir) setCourierService(ongkir.costs)
        return () => {
            setCourierService([])
        }
    }, [ongkir])

    const handleCourierService = (e) => {
        const cost = e.target.value.split('|')[0]
        const service = e.target.value.split('|')[1]
        setEstShipping(+cost)
        setForm({...form, service: service, cost_courier: +cost})
        // console.log(e.target.value)
    }

    useEffect(() => {
        setTotal(subTotal)
        if (subTotal > 0 && estShipping > 0) {
            setTotal(subTotal + estShipping)
            // setForm({...form, grand_total: subTotal + estShipping})
            setForm((prev) => {
                return {...prev, grand_total: subTotal + estShipping}
            })
        }
        return () => {
            setTotal(0)
        }
    }, [estShipping, subTotal])

    const [plan, setPlan] = useState("courier")

    const handleRadioChange = (e) => {
        setPlan(e.target.value)
        setEstShipping(0)
        if (e.target.value === "cod") {
            const totalWeight = carts.map((c) => c.weight).reduce((prev, curr) => prev + curr, 0)
            setFormCOD({
                ...formCOD,
                weight: totalWeight,
                grand_total: subTotal
            })
        }
    }

    let history = useHistory()

    const handleSubmit = async () => {
        if (plan === 'cod') {
            try {
                const res = await checkout(dispatch, formCOD, token)
                // getOrders(dispatch, res.snap_token, token)
                history.push(`/order/${res.snap_token}`)
            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                const res = await checkout(dispatch, form, token)
                // getOrders(dispatch, res.snap_token, token)
                history.push(`/order/${res.snap_token}`)
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <Container>
            <Navbar />
            <Wrapper>
                <Top>
                    <TopButton>Continue Shopping</TopButton>
                    <TopTexts>
                        <TopText>Checkout Page</TopText>
                    </TopTexts>
                    <TopButton type="filled">Checkout Now</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {carts.map((c, i) => (
                            <Product key={i}>
                                <ProductDetail>
                                    <Image src={`http://127.0.0.1:8004/storage/warehouses/${c.warehouses.frontImg}`} />
                                    <Details>
                                        <ProductName>
                                            <b>Product: </b>{c.warehouses.name}
                                        </ProductName>
                                        <ProductId>
                                            <b>ID: </b>131564876
                                        </ProductId>
                                        <ProductColor color={c.warehouses.color} />
                                        <ProductSize>
                                            <b>Size: </b>{c.warehouses.size}
                                        </ProductSize>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ProductAmountContainer>
                                        <ProductAmount>Quantity: {c.quantity}</ProductAmount>
                                    </ProductAmountContainer>
                                    <ProductPrice>Rp. {c.price}</ProductPrice>
                                </PriceDetail>
                            </Product>
                        ))}
                        <Hr/>
                    </Info>
                    <Summary>
                        <SummaryTitle>Shipping Detail</SummaryTitle>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Shipping Plan</FormLabel>
                            <RadioGroup row defaultValue="courier" aria-label="shipping plan" name="row-radio-buttons-group" onChange={handleRadioChange}>
                                <FormControlLabel value="courier" control={<Radio />} label="Delivery Service" />
                                <FormControlLabel value="cod" control={<Radio />} label="COD (Only on Cilegon Area)" />
                            </RadioGroup>
                        </FormControl>

                        <Form>
                            <FormInputWrapper type="row">
                                <FormInput>
                                    <Label>Full Name</Label>
                                    <Input
                                        name="name"
                                        type="text"
                                        placeholder="Full Name"
                                        value={profile.data.first_name + ' ' + profile.data.last_name}
                                        onChange={handleChange}
                                    />
                                </FormInput>
                                <FormInput>
                                    <Label>Phone Number / Whatsapp</Label>
                                    <Input
                                        name="phone"
                                        type="number"
                                        placeholder="Phone Number"
                                        onChange={handleChange}
                                    />
                                </FormInput>
                            </FormInputWrapper>
                            <FormInputWrapper type="row" plan={(plan === "courier").toString()}>
                                <FormInput>
                                    <Label>Province</Label>
                                    <Select name="province" defaultValue="" onChange={handleProvinceChange}>
                                        <Option value="" disabled>Select Province</Option>
                                        {provinces.map((p,i) => (
                                            <Option value={p.province_id} key={i}>{p.name}</Option>
                                        ))}
                                    </Select>
                                </FormInput>
                                <FormInput>
                                    <Label>Kabupaten / Kota</Label>
                                    <Select name="city" defaultValue="" onChange={handleCityChange}>
                                        <Option value="" disabled>Select Kabupaten / Kota</Option>
                                        {cities?.map((c, i) => (
                                            <Option value={c.city_id} key={i}>{c.name}</Option>
                                        ))}
                                    </Select>
                                </FormInput>
                            </FormInputWrapper>
                            <FormInputWrapper type="row" plan={(plan === "courier").toString()}>
                                <FormInput>
                                    <Label>Courier</Label>
                                    <Select name="courier" defaultValue="" onChange={handleCourierChange}>
                                        <Option value="" disabled>Select Courier</Option>
                                        <Option value="jne">JNE</Option>
                                        <Option value="tiki">TIKI</Option>
                                        <Option value="pos">POS</Option>
                                    </Select>
                                </FormInput>
                                <FormInput>
                                    <Label>Courier Service</Label>
                                    <Select name="courier_service" defaultValue="" onChange={handleCourierService}>
                                        <Option value="" disabled>Select Courier Service</Option>
                                        {courierService?.map((c, i) => (
                                            <Option value={c.cost[0].value + '|' + c.service} key={i}>{c.service}( {c.cost[0].etd} day(s) ) - Rp. {c.cost[0].value}</Option>
                                        ))}
                                    </Select>
                                </FormInput>
                            </FormInputWrapper>
                            <FormInputWrapper type="column" plan={(plan === "courier").toString()}>
                                <FormInput>
                                    <Label>Full Address</Label>
                                    <TextArea
                                        rows="3"
                                        name="address"
                                        type="text"
                                        placeholder="Input your full address"
                                        onChange={handleChange}
                                    />
                                </FormInput>
                            </FormInputWrapper>
                        </Form>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>Rp. {subTotal}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>Rp. {estShipping}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>Rp. {total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryButton onClick={handleSubmit}>Checkout Now</SummaryButton>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Checkout
