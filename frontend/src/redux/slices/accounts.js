import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/index.js';

const initialState = {
  entities: [],
  isAccsLoading: false,
};

export const getAccs = createAsyncThunk('accounts/getAccs', () =>
  api()
    .get('/operation/get_accounts')
    .then(({ data }) => data),
);

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    clearAccounts: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAccs.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.isAccsLoading = false;
      })
      .addCase(getAccs.pending, (state) => {
        state.isAccsLoading = true;
      });
  },
});

export const { clearAccounts } = accountsSlice.actions;

export default accountsSlice.reducer;
