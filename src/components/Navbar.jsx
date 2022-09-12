import Badge from '@mui/material/Badge'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { mobile } from "../responsive"
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCarts } from '../redux/apiCalls'
import storage from 'redux-persist/lib/storage'
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material'
import { Logout, Receipt } from '@mui/icons-material'

const Container = styled.div`
    background-color: white;
    width: 100%;
    height: 60px;
    z-index: 200;
    position: fixed;
    ${mobile({ height: "50px" })}
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ padding: "10px 0px" })}
`

const Sidebar = styled.ul`
    list-style: none;
    /* display: flex; */
    display: none;
    flex-flow: row nowrap;

    li {
        padding: 18px 10px;
    }

    @media only screen and (max-width: 380px) {
        display: flex;
        flex-flow: column nowrap;
        background-color: #0D2538;
        position: fixed;
        transform: ${({ open }) => open ? 'translateX(-90%)' : 'translateX(-175%)'};
        top: 0;
        right: 0;
        height: 100vh;
        width: 50vh;
        padding-top: 3.5rem;
        /* padding-left: 1rem; */
        /* padding: 5rem 0 0 5rem; */
        transition: transform 0.3s ease-in-out;
        z-index: 50;

        li {
            color: #fff;
        }
    }
`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const MenuItemLeft = styled(Link)`
    color: black;
    font-size: 14px;
    cursor: pointer;
    margin-right: 25px;
    text-decoration: none;
    ${mobile({ display: "none", fontSize: "12px", marginRight: "10px" })}
`

const Center = styled.div`
    flex: 1;
    text-align: center;
`

const Logo = styled(Link)`
    color: black;
    font-size: 2em;
    font-weight: bold;
    text-decoration: none;
    ${mobile({ fontSize: "18px" })}
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    /* ${mobile({ flex: 2, justifyContent: "center" })} */
`

const MenuItemRight = styled(Link)`
    color: black;
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    text-decoration: none;
    ${mobile({ display: "none", fontSize: "12px", marginLeft: "10px" })}
`

const Auth = styled(Link)`
    color: black;
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: "12px", marginLeft: "0", marginRight: "1rem" })}
`

const Burger = styled.div`
    width: 2rem;
    height: 2rem;
    /* position: fixed; */
    /* top: 15px; */
    /* left: 20px; */
    padding: 0 0.3rem;
    z-index: 55;
    flex: 1;
    display: none;

    @media only screen and (max-width: 380px) {
        display: flex;
        justify-content: space-around;
        flex-flow: column nowrap;
    }

    div {
        width: 2rem;
        height: 0.25rem;
        background-color: ${({ open }) => open ? '#ccc' : '#333'};
        border-radius: 10px;
        transform-origin: 1px;
        transition: all 0.3s linear;
        &:nth-child(1) {
        transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
        }
        &:nth-child(2) {
        transform: ${({ open }) => open ? 'translateX(-100%)' : 'translateX(0)'};
        opacity: ${({ open }) => open ? 0 : 1};
        }
        &:nth-child(3) {
        transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
        }
    }
`

const Navbar = () => {
    const dispatch = useDispatch()
    const { currentUser, profile, token } = useSelector((state) => state.user)
    const { totalCart } = useSelector((state) => state.carts)
    const [open, setOpen] = useState(false)
    const [cart, setCart] = useState(0)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const [anchorEl, setAnchorEl] = useState(null)
    const dropdown = Boolean(anchorEl)

    const handleOpen = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const logout = () => {
        storage.removeItem('persist:root')
        window.location.reload()
    }
    
    useEffect(() => {
        if (currentUser) setIsLoggedIn(true)
        return () => {
            setIsLoggedIn(false)
        }
    }, [currentUser, dispatch])

    useEffect(() => {
        if (isLoggedIn) getCarts(dispatch, token)
    }, [isLoggedIn, dispatch, token])

    useEffect(() => {
        setCart(totalCart)
    }, [totalCart])

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Burger open={open} onClick={() => setOpen(!open)}>
                        <div />
                        <div />
                        <div />
                    </Burger>
                    <Sidebar open={open}>
                        <li>Home</li>
                        <li>Catalogs</li>
                        <li>Products</li>
                        <li>About</li>
                        <hr />
                        <li>Register</li>
                        <li>Login</li>
                    </Sidebar>
                    <MenuItemLeft to="/catalogs">Catalogs</MenuItemLeft>
                    <MenuItemLeft to="/products">Products</MenuItemLeft>
                    <MenuItemLeft to="/about">About</MenuItemLeft>
                </Left>
                <Center>
                    <Logo to="/">Beloved Clubs</Logo>
                </Center>
                {currentUser ?
                    <Right>
                        <Auth to="/cart">
                            <Badge badgeContent={cart} color="primary">
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </Auth>
                        <Tooltip title={profile.data.first_name}>
                            <IconButton size="small" sx={{ ml: 2 }} onClick={handleOpen}>
                                <Avatar sx={{ width: 30, height: 30 }} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorEl}
                            open={dropdown}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                    },
                                    '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}>
                                <MenuItem>
                                    <Avatar sx={{ width: 15, height: 15 }} /> Profile
                                </MenuItem>
                            </Link>
                            <Link to="/transactions-history" style={{ textDecoration: 'none', color: 'black' }}>
                                <MenuItem>
                                    <ListItemIcon>
                                        <Receipt fontSize="small" />
                                    </ListItemIcon>
                                    Transactions
                                </MenuItem>
                            </Link>
                            <Divider />
                            <MenuItem onClick={logout}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                        {/* <MenuItemRight to="/" onClick={logout}>{currentUser.name}</MenuItemRight> */}
                    </Right>
                    :
                    <Right>
                        <MenuItemRight to="/register">Register</MenuItemRight>
                        <MenuItemRight to="/login">Sign In</MenuItemRight>
                        <Auth to="/cart">
                            <Badge badgeContent={cart} color="primary">
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </Auth>
                    </Right>
                }
            </Wrapper>
        </Container>
    )
}

export default Navbar
