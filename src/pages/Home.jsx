import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import Announcement from '../components/Announcement'
// import Catalogs from '../components/Catalogs'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
// import Newsletter from '../components/Newsletter'
import Products from '../components/Products'
import Slider from '../components/Slider'
import { products } from '../redux/apiCalls'

const Home = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.products.products)

    useEffect(() => {
        products(dispatch)
    }, [dispatch])

    return (
        <div>
            {/* <Announcement/> */}
            <Navbar />
            <Slider/>
            {/* <Catalogs/> */}
            <Products data={data}/>
            {/* <Newsletter/> */}
            <Footer/>
        </div>
    )
}

export default Home
