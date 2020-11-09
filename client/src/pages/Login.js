import React from "react";
import { Link, useLocation } from "react-router-dom";


function LogIn() {
    const location = useLocation();
    return (
        <div className="container">

            <h1>Log In</h1>
            <form className="login">
                <div className="row">
                    <div className="input-field">
                        <input id="email-input" type="text" className="validate" placeholder="Email Address" />
                    </div>
                    <div className="input-field">
                        <input id="password-input" type="text" className="validate" placeholder="Password" />
                    </div>
                </div>
                <div class="row">
                    <div class="col s2">
                        <button type="submit" class="btn">Sign Up</button>
                    </div>
                    <p>Or Sign Up <Link to="/signup" className={location.pathname === "/signup"}>here</Link></p>
                </div>
            </form>
        </div>

    )
}

export default LogIn;