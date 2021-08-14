import { useContext, useRef } from 'react';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import './login.css';
import { CircularProgress } from '@material-ui/core'

export default function Login() {
    const email = useRef();
    const password = useRef();

    const { user, isFetching, error, dispatch } = useContext(AuthContext);
    const handleClick = (e) => {
        e.preventDefault();
        loginCall({ email: email.current.value, password: password.current.value }, dispatch);
    }

    console.log(user);
    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Lamasocial</h3>
                    <span className="loginDesc">Connect with freinds and the world around you on my social network.</span>
                </div>
                <div className="loginRight" onSubmit={handleClick}>
                    <form className='loginBox'>
                        <input className='loginInput' type="email" placeholder='Email' ref={email} required />
                        <input className='loginInput' type="password" placeholder='Password' ref={password} required minLength={6} />
                        <button className='loginButton' type='submit' disabled={isFetching}>{isFetching ? <CircularProgress color={'inherit'} /> : 'Log In'}</button>
                        <span className='loginForgot'>Forgot Password?</span>
                        <button className='loginRegisterButton'>{isFetching ? <CircularProgress color={'inherit'} /> : 'Create a New Account'}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}