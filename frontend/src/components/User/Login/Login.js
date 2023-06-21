import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';
import { Form, Button, Spinner } from 'react-bootstrap';

import { login, selectAuthError, selectIsLoggedIn, selectIsLoading } from '../../../reducers/userSlice';

function Login() {
    const dispatch = useDispatch();
    const authError = useSelector(selectAuthError);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const isLoading = useSelector(selectIsLoading);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    if (!isLoading && isLoggedIn) return <Navigate to="/" />;

    const submitLogin = e => {
        e.preventDefault();
        setPassword('');
        dispatch(login(username, password));
    };

    return (
        <div className="container pt-5">
            <div className='row  justify-content-center'>
                <div className='col-5'>
                    {isLoading ? (
                        <Spinner animation="grow" />
                    ) : (
                        <Form className="loginForm" onSubmit={submitLogin}>
                            <h3 className='text-center mb-4'>Вход</h3>
                            <Form.Group className='form-outline mb-4'>
                                <Form.Control
                                    type="text"
                                    placeholder="Логин"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className='form-outline mb-4'>
                                <Form.Control
                                    type="password"
                                    placeholder="Пароль"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <div className='text-center'>
                                <NavLink to='/registration' className="nav-link mb-3">
                                    Зарегистрироваться
                                </NavLink>
                                <Button className='btn-primary col-12' type="submit" disabled={!username || !password} >
                                    Войти
                                </Button>
                            </div>

                            <div className="loginMsg">{authError && <p className="formError">{authError}</p>}</div>
                        </Form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;
