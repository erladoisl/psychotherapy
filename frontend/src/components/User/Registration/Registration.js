import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { Form, Button, Spinner } from 'react-bootstrap';

import { register, selectIsLoggedIn, selectIsLoading } from '../../../reducers/userSlice';

const Registration = (() => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const isLoading = useSelector(selectIsLoading);
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    if (!isLoading && isLoggedIn) return <Navigate to="/" />;

    const handleSubmit = ((e) => {
        e.preventDefault();
        let formData = {
            'username': username,
            'password1': password1,
            'password2': password2,
        };

        dispatch(register(formData))
    });

    return (
        <div className="container pt-5">
            <div className='row  justify-content-center'>
                <div className='col-5'>
                    {isLoading ? (
                        <Spinner animation="grow" />
                    ) : (
                        <>
                            <Form className="loginForm" onSubmit={handleSubmit}>
                                <h3 className="text-center mb-4">Регистрация</h3>

                                <Form.Group className=' mb-2'>
                                    <Form.Control
                                        type="text"
                                        placeholder="Логин"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className=' mb-2'>
                                    <Form.Control
                                        type="password"
                                        placeholder="Пароль"
                                        value={password1}
                                        onChange={e => setPassword1(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className=' mb-2'>
                                    <Form.Control
                                        type="password"
                                        placeholder="Повторите пароль"
                                        value={password2}
                                        onChange={e => setPassword2(e.target.value)}
                                    />
                                </Form.Group>

                                <div className='text-center'>
                                    <NavLink to='/login' className="nav-link mb-3">
                                        Войти по логину и паролю
                                    </NavLink>

                                    <Button type="submit" disabled={!username || !password1 || !password2} className='col-12 btn-primary'>
                                        Зарегистрироваться
                                    </Button>
                                </div>

                                <NavLink to='/' className="nav-link text-white">
                                    Войти
                                </NavLink>
                            </Form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
});


export default Registration;