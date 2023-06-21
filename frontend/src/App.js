import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { selectUser, checkStatus, selectIsLoggedIn, selectIsLoading } from './reducers/userSlice';

import Home from "./components/Home/Home";
import Login from "./components/User/Login/Login";
import Registration from "./components/User/Registration/Registration";
import NotFound from "./components/NotFound/NotFound";
import Header from "./components/Header/Header";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useCallback(useDispatch(), []);
  useEffect(() => dispatch(checkStatus()), [dispatch]);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectIsLoading);

  if (user) {
    return (
      <>
        <BrowserRouter>
          {!isLoading && isLoggedIn && (
            <Header />
          )}

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </>
    )
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/registration" element={<Registration />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;