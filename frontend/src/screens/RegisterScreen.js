import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen() {
    const navigate = useNavigate();
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const userRegister = useSelector(state => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert("Password and confirm password are not match.");
        } else {
            dispatch(register(name, email, password));
        }
    };
    useEffect(() => {
        if(userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);
    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Create Account</h1>
                </div>
                {loading && (
                    <LoadingBox></LoadingBox>
                )}
                {error && (
                    <MessageBox variant="danger">{error}</MessageBox>
                )}
                <div>
                    <label htmlFor='name'>Name :</label>
                    <input name='name' id='name' type='text' placeholder='Enter name' required onChange={e => setName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor='email'>Email Address :</label>
                    <input name='email' id='email' type='email' placeholder='Enter email' required onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor='password'>Password :</label>
                    <input name='password' id='password' type='password' placeholder='Enter password' required onChange={e => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor='confirmPassword'>Confirm Password :</label>
                    <input name='confirmPassword' id='confirmPassword' type='password' placeholder='Enter confirm password' required onChange={e => setConfirmPassword(e.target.value)}></input>
                </div>
                <div>
                    <label></label>
                    <button className='primary' type='submit'>Register</button>
                </div>
                <div>
                    <label></label>
                    <div>
                        Already have an account? {' '}
                        <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
