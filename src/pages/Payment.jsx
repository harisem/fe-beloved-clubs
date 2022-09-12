import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { getOrders } from '../redux/apiCalls'

const Container = styled.div``

const Wrapper = styled.div`
    padding: 60px 20px 20px 20px;
    display: flex;
    justify-content: center;
`

const Summary = styled.div`
    /* flex: 1; */
    width: 50vw;
    border: .5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
`

const SummaryTitle = styled.h1`
    font-weight: 500;
    text-align: center;
`

const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
`

const SummaryItemTitle = styled.h4``

const SummaryItemValue = styled.span``

const SummaryButton = styled.button`
    /* width: 100%; */
    padding: 5px;
    background-color: black;
    color: white;
    font-weight: 600;
    cursor: pointer;
`

const Payment = () => {
    const location = useLocation()
    const snap = location.pathname.split("/")[2]

    const dispatch = useDispatch()

    const { orders } = useSelector(state => state.orders)
    const { token } = useSelector(state => state.user)
    const [invoice, setInvoice] = useState(null)

    const handleClick = () => {
        window.snap.pay(invoice.snap_token)
    }

    useEffect(() => {
        getOrders(dispatch, snap, token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setInvoice(orders[0]?.invoices)
        return () => {
            setInvoice(null)
        }
    }, [orders])

    useEffect(() => {
        const script = document.createElement('script')
        const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js"
        const midtransClientKey = 'SB-Mid-client-RWlIVsienEBIX6aV'

        script.src = midtransUrl
        script.setAttribute('data-client-key', midtransClientKey)
        script.async = true

        document.body.appendChild(script)
        return () => {
            document.body.removeChild(script)
        }
    }, [])

    return (
        <Container>
            <Navbar />
            <Wrapper>
                <Summary>
                    <SummaryTitle>Order Detail</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemTitle>Invoice</SummaryItemTitle>
                        <SummaryItemValue>{invoice?.invoice}</SummaryItemValue>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemTitle>Full Name</SummaryItemTitle>
                        <SummaryItemValue>{invoice?.name}</SummaryItemValue>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemTitle>Phone Number</SummaryItemTitle>
                        <SummaryItemValue>0{invoice?.phone}</SummaryItemValue>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemTitle>Courier / Service / Cost</SummaryItemTitle>
                        <SummaryItemValue>{invoice?.courier} / {invoice?.service} / Rp. {invoice?.cost_courier}</SummaryItemValue>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemTitle>Shipping Address</SummaryItemTitle>
                        <SummaryItemValue>{invoice?.address}</SummaryItemValue>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemTitle>Total Purchase</SummaryItemTitle>
                        <SummaryItemValue>Rp. {invoice?.grand_total}</SummaryItemValue>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemTitle>Status</SummaryItemTitle>
                        {invoice?.status === 'pending' ?
                            <SummaryButton onClick={handleClick}>Pay Now</SummaryButton> :
                            <SummaryItemValue>{invoice?.status}</SummaryItemValue>
                        }
                    </SummaryItem>
                </Summary>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Payment
