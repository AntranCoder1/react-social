import axios from 'axios';
import React, { useRef } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();

    const history = useHistory();

    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Password don't match!");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try {
                await axios.post('/auth/register', user);
                history.push('/login');
            } catch (error) {
                console.log(error); 
            }
        }
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Allgrow labo</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on Allgrow labo.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input 
                            placeholder="Username" 
                            ref={username} 
                            className="loginInput" 
                            required
                            type="text"
                        />
                        <input 
                            placeholder="Email" 
                            ref={email} 
                            className="loginInput" 
                            required
                            type="email"
                        />
                        <input 
                            placeholder="Password" 
                            ref={password} 
                            className="loginInput"
                            required
                            type="password"
                            minLength="6"
                         />
                        <input 
                            placeholder="Password Again" 
                            ref={passwordAgain} 
                            className="loginInput"
                            required
                            type="password"
                         />
                        <button className="loginButton" type="submit">Sign Up</button>
                        <button className="loginRegisterButton">
                            <Link to='/login'>
                                Log into Account
                            </Link>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
