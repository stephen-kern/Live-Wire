// ===IMPORTS===
import React from "react";
import { Link } from "react-router-dom";
// import Auth from "../../utils/auth";

const Header = () => {
    // const logout = (event) => {
    //     event.preventDefault();
    //     Auth.logout();
    // }

    return (
        <header>
            <div>
                <Link to="/">
                    <h1> Live Wire </h1>
                </Link>
            </div>
        </header>
    )

}

export default Header;