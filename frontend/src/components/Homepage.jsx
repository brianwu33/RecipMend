import React, {useContext} from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "./UserContext";
import Recipe from "./Recipe";
import Bmi from "./Bmi";
import Main from "./Main";
import Footer from "./Footer";

function Homepage() {
    // const isAuth = useContext(UserContext).isAuth;
    // if (!isAuth) {
    //     return <Redirect to="/register" />
    // }
    
    
    return (
        <div>
            <Main />
            <Bmi />
            <Recipe />
            <Footer />
        </div>
    )
}

export default Homepage;