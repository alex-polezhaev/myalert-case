import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../api';

const initialState = {
  entities: [],
  loading: null,
};

export const getCombinations = createAsyncThunk(
  'combinations/getCombinations',
  () =>
    api()
      .get('/operation/get_accs_input_output')
      .then(({ data }) => data),
);

export const combinationsSlice = createSlice({
  name: 'combinations',
  initialState,
  reducers: {
    clearCombinations: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getCombinations.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCombinations.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.loading = false;
    });
  },
});

export const { clearCombinations } = combinationsSlice.actions;

export default combinationsSlice.reducer;
