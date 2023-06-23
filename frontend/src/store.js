import {configureStore} from '@reduxjs/toolkit';

import userSlice from './reducers/userSlice';
import thanksSlice from './reducers/thanksSlice';
import emotionSlice from './reducers/emotionSlice';

export default configureStore({
	reducer: {
		user: userSlice,
		thanks: thanksSlice,
		emotions: emotionSlice,
	}
});
