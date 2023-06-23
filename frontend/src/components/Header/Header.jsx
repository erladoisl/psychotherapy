import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";

import { logout, selectUser, selectIsLoading } from '../../reducers/userSlice';

const Header = () => {
  const dispatch = useCallback(useDispatch(), []);
  const user = useSelector(selectUser);
  const userLoading = useSelector(selectIsLoading);
  const nav_items = [{ name: 'Благодарность', link: '/thanks' },]
  const app_name = 'Бережно к себе'

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-success">
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
              <span className="d-sm-inline-block my-2 my-md-0 ms-md-3 text-white">
                {!userLoading && (
                  <NavLink onClick={() => dispatch(logout())} to="/content" className="nav-link text-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_1_4872)">
                        <path d="M15.6356 0.599609H0.599968V23.4002H15.6356V0.599609Z" stroke="white" strokeWidth="1.2" strokeMiterlimit="6.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M23.3914 12.0004H6.28087" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.28086 12.0004L11.3203 16.9312" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.28086 12.0004L11.3203 7.06958" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_1_4872">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </NavLink>
                )}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
