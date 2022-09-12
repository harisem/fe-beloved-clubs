import { useSelector } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
} from "react-router-dom"
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import History from "./pages/History";
import Home from "./pages/Home"
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import Product from "./pages/Product"
import ProductList from "./pages/ProductList";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

const App = () => {
    const user = useSelector((state) => state.user.currentUser)
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/profile">
                    {user ? <Profile /> : <Redirect to="/login" />}
                </Route>
                <Route path="/products">
                    <ProductList />
                </Route>
                <Route path="/product/:slug">
                    <Product user={user} />
                </Route>
                <Route path="/cart">
                    {user ? <Cart /> : <Redirect to="/login" />}
                </Route>
                <Route path="/checkout">
                    {user ? <Checkout /> : <Redirect to="/login" />}
                </Route>
                <Route path="/order/:snap_token">
                    {user ? <Payment /> : <Redirect to="/login" />}
                </Route>
                <Route path="/transactions-history">
                    {user ? <History /> : <Redirect to="/login" />}
                </Route>
                <Route path="/login">
                    {user ? <Redirect to="/" /> : <Login />}
                </Route>
                <Route path="/register">
                    {user ? <Redirect to="/" /> : <Register />}
                </Route>
            </Switch>
        </Router>
    );
};

export default App;