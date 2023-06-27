import { createSlice } from '@reduxjs/toolkit';

import { instance } from '../globals';

export const taskSlice = createSlice({
	name: 'tasks',
	initialState: {
		tasks: [],
		loading: true,
		error: null
	},
	reducers: {
		loadTasks: (state, action) => {
			state.tasks = action.payload;
			state.loading = false;
			state.error = null;
		},
		loadNewTasks: (state, action) => {
			state.tasks = [action.payload, ...state.tasks];
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
			state.tasks = null;
		},
		clearTasks: state => {
			state.tasks = [];
			state.loading = false;
			state.error = null;
		}
	}
});

// ACTIONS
export const {
	loadTasks,
	loadNewTasks,
	clearTasks,
	setLoading,
	setError
} = taskSlice.actions;

// SELECTORS
export const selectTasks = state => state.tasks.tasks;
export const selectTasksLoading = state => state.tasks.loading;
export const selectTasksError = state => state.tasks.error;
export const selectIsLoggedIn = state => !!(!state.tasks.loading && state.tasks.tasks);

// THUNKS
export const getEnties = (task_name) => dispatch => {
	dispatch(setLoading(true));
	instance
		.get(`/tasks/${task_name}/`)
		.then(res => {
			dispatch(loadTasks(res.data))
		})
		.catch(err => {
			if (err.response) {
				dispatch(setError(err.response.data.detail));
			} else {
				dispatch(setError(`Error fetching tasks ${task_name}`));
			}
		});
};

export const newEntry = (new_entry, task_name) => dispatch => {
	dispatch(setLoading(true));
	instance
		.post(`/tasks/${task_name}/`, new_entry)
		.then(res => {
			dispatch(loadNewTasks(res.data))
		})
		.catch(err => {
			if (err.response) {
				dispatch(setError(err.response.data.detail));
			} else {
				dispatch(setError(`Error fetching tasks ${task_name}`));
			}
		});
};
export default taskSlice.reducer;
