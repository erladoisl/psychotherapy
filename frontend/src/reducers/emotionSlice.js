import { createSlice } from '@reduxjs/toolkit';

import { instance } from '../globals';

export const emotionSlice = createSlice({
	name: 'emotions',
	initialState: {
		thanks: [],
		loading: true,
		error: null
	},
	reducers: {
		loadEmotions: (state, action) => {
			state.emotions = action.payload;
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
			state.emotions = null;
		},
		clearEmotions: state => {
			state.emotions = [];
			state.loading = false;
			state.error = null;
		}
	}
});

// ACTIONS
export const {
	loadEmotions,
	clearEmotions,
	setLoading,
	setError
} = emotionSlice.actions;

// SELECTORS
export const selectEmotions = state => state.emotions.emotions;
export const selectEmotionsLoading = state => state.emotions.loading;
export const selectEmotionsError = state => state.emotions.error;
export const selectIsLoggedIn = state => !!(!state.emotions.loading && state.thanks.emotions);

// THUNKS
export const getEmotions = ( positive ) => dispatch => {
	dispatch(setLoading(true));
	const url = positive ? '/emotions/positive/' : '/emotions/';
	
	instance
		.get(url)
		.then(res => {
			dispatch(loadEmotions(res.data))
		})
		.catch(err => {
			if (err.response) {
				dispatch(setError(err.response.data.detail));
			} else {
				dispatch(setError('Error fetching emotions'));
			}
		});
};

export default emotionSlice.reducer;
