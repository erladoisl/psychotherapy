import {configureStore} from '@reduxjs/toolkit';

import userSlice from './reducers/userSlice';
import thanksSlice from './reducers/thanksSlice';

export default configureStore({
	reducer: {
		user: userSlice,
		thanks: thanksSlice,
	}
});
