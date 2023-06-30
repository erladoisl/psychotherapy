import { createSlice } from '@reduxjs/toolkit';

import { instance } from '../globals';

export const thanksSlice = createSlice({
	name: 'thanks',
	initialState: {
		thanks: [],
		loading: true,
		error: null
	},
	reducers: {
		loadThanks: (state, action) => {
			state.thanks = action.payload;
			state.loading = false;
			state.error = null;
		},
		loadNewThanks: (state, action) => {
			state.thanks = [action.payload, ...state.thanks];
			state.loading = false;
			state.error = null;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
			state.error = null;
		},
		setError: (state, action) => {
			state.error = action.payload;
			state.loading = false;
			state.thanks = null;
		},
		clearThanks: state => {
			state.thanks = [];
			state.loading = false;
			state.error = null;
		}
	}
});

// ACTIONS
export const {
	loadThanks,
	loadNewThanks,
	clearThanks,
	setLoading,
	setError
} = thanksSlice.actions;

// SELECTORS
export const selectThanks = state => state.thanks.thanks;
export const selectThanksLoading = state => state.thanks.loading;
export const selectThanksError = state => state.thanks.error;
export const selectIsLoggedIn = state => !!(!state.thanks.loading && state.thanks.thanks);

// THUNKS
export const getThanks = () => dispatch => {
	dispatch(setLoading(true));
	instance
		.get('/thanks/')
		.then(res => {
			dispatch(loadThanks(res.data))
		})
		.catch(err => {
			if (err.response) {
				dispatch(setError(err.response.data.detail));
			} else {
				dispatch(setError('Error fetching thanks'));
			}
		});
};

export const newThanks = (description, thanks_emotions) => dispatch => {
	dispatch(setLoading(true));
	instance
		.post('/thanks/', { description, thanks_emotions })
		.then(res => {
			dispatch(loadNewThanks(res.data))
		})
		.catch(err => {
			if (err.response) {
				dispatch(setError(err.response.data.detail));
			} else {
				dispatch(setError('Error fetching thanks'));
			}
		});
};
export default thanksSlice.reducer;
