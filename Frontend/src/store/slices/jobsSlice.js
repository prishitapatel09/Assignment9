import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
  loading: false,
  error: null,
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    createJobStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createJobSuccess: (state, action) => {
      state.loading = false;
      state.jobs.push(action.payload);
    },
    createJobFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchJobsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchJobsSuccess: (state, action) => {
      state.loading = false;
      state.jobs = action.payload;
    },
    fetchJobsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createJobStart,
  createJobSuccess,
  createJobFailure,
  fetchJobsStart,
  fetchJobsSuccess,
  fetchJobsFailure,
} = jobsSlice.actions;
export default jobsSlice.reducer; 