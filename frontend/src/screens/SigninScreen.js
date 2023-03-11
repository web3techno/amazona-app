import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SigninScreen() {
    const navigate = useNavigate();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signIn(email, password));
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
                    <h1>Sign In</h1>
                </div>
                {loading && (
                    <LoadingBox></LoadingBox>
                )}
                {error && (
                    <MessageBox variant="danger">{error}</MessageBox>
                )}
                <div>
                    <label htmlFor='email'>Email Address :</label>
                    <input name='email' id='email' type='email' placeholder='Enter email' required onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor='password'>Password Address :</label>
                    <input name='password' id='password' type='password' placeholder='Enter password' required onChange={e => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label></label>
                    <button className='primary' type='submit'>Sign In</button>
                </div>
                <div>
                    <label></label>
                    <div>
                        New customer? {' '}
                        <Link to="/register">Creae your account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
