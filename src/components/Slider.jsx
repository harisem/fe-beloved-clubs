import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons"
import { useEffect, useState } from "react"
import { mobile } from "../responsive"
// import { sliderItems } from "../data"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { sliders } from "../redux/apiCalls"

const Container = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    position: relative;
    overflow: hidden;
    padding-top: 60px;
    ${mobile({ display: "none" })}
`

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #FFF7F7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${ props => props.direction === "left" && "10px" };
    right: ${ props => props.direction === "right" && "10px" };
    margin: auto;
    cursor: pointer;
    opacity: .5;
    z-index: 2;
`

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transition: all 1.5s ease;
    transform: translateX(${ props => props.slideIndex * -100}vw);
`

const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: #${ props => props.bg ? props.bg : "f7e7e7" };
`

const ImgContainer = styled.div`
    height: 100%;
    flex: 1;
`

const Image = styled.img`
    height: 80%;
`

const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
`

const Title = styled.h1`
    font-size: 60px;
    text-transform: uppercase;
`

const Description = styled.p`
    margin: 50px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
`

const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
`

const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0)
    const dispatch = useDispatch()
    const data = useSelector((state) => state.sliders.data)

    const handleClick = (direction) => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
        }
    }

    useEffect(() => {
        sliders(dispatch)
    }, [dispatch])

    return (
        <Container>
            <Arrow direction="left" onClick={ () => handleClick("left") }>
                <ArrowLeftOutlined/>
            </Arrow>
            
            <Wrapper slideIndex={slideIndex}>
                {data.map(item => (
                    <Slide bg={ item.bg } key={ item.id }>
                        <ImgContainer>
                            <Image src={ item.image }/>
                        </ImgContainer>
                        <InfoContainer>
                            <Title>{ item.title }</Title>
                            <Description dangerouslySetInnerHTML={{ __html: item.description }}></Description>
                            <Button>Shop Now</Button>
                        </InfoContainer>
                    </Slide>
                ))}
            </Wrapper>

            <Arrow direction="right" onClick={ () => handleClick("right") }>
                <ArrowRightOutlined/>
            </Arrow>
        </Container>
    )
}

export default Slider
