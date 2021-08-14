import './register.css';
import {useRef} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory();

    const handleClick = async (e) => {
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value) {
            password.current.setCustomValidity("Password not match");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
                await axios.post('/auth/register' , user);
                history.push("/login");
    
            } catch(err) {
                console.log(err);
            }
        }   
    }

    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Lamasocial</h3>
                    <span className="loginDesc">Connect with freinds and the world around you on my social network.</span>
                </div>
                <div className="loginRight">
                    <form className='loginBox' onSubmit={handleClick}>
                        <input className='loginInput' type="text" placeholder='Username' ref={username} required />
                        <input className='loginInput' type="email" placeholder='Email' ref={email} required/>
                        <input className='loginInput' type="password" placeholder='Password' ref={password} required minLength={6}/>
                        <input className='loginInput' type="password" placeholder='Password Again' ref={passwordAgain} required />
                        <button className='loginButton' type='submit'>Sign Up</button>
                        <button className='loginRegisterButton'>Log Into Account</button>
                    </form>

                </div>
            </div>
        </div>
    )
}