import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectIsLoggedIn, selectIsLoading } from '../../reducers/userSlice';

function NotFound() {
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const isLoading = useSelector(selectIsLoading);

	if (!isLoading && !isLoggedIn) return <Navigate to="/login" />;
	if (!isLoading && isLoggedIn) return <Navigate to="/" />;

	return (
		<>
		</>
	);
}

export default NotFound;
