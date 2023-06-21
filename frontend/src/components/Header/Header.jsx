import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";

import { logout, selectUser, selectIsLoading } from '../../reducers/userSlice';

const Header = () => {
  const dispatch = useCallback(useDispatch(), []);
  const user = useSelector(selectUser);
  const userLoading = useSelector(selectIsLoading);
  const nav_items = [{ name: 'Основаная', link: '/' }]
  const app_name = 'Название приложения'

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          <NavLink to='/' className="navbar-brand">
            {app_name}
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">

              {nav_items.map((item, index) => {
                return (
                  <li key={index} className="nav-item">
                    <NavLink to={item.link} className="nav-link">
                      {item.name}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
            <div className="ms-auto link-light">
              <span className="d-sm-inline-block my-2 my-md-0 ms-md-3 text-white">
                {!userLoading && (
                  <NavLink to="/content" className="nav-link text-white">
                    {user?.username} {user?.email}
                  </NavLink>
                )}
              </span>
              <button
                className="btn btn-dark d-lg-inline-block my-2 my-md-0 ms-md-3 text-white"
                onClick={() => dispatch(logout())}
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
