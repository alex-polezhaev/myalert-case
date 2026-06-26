import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api';

const initialState = {
  entity: null,
  isUserLoading: false,
  isUserCreatedRecently: false,
  isAccsModalShown: false,
  isConnectorsModalShown: false,
  isAutopaymentEnabled: false,
};

export const getUser = createAsyncThunk('user/getUser', () =>
  api()
    .get('/operation/get_current_user')
    .then(({ data }) => data),
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: () => initialState,
    setAccsModalsState: (state, action) => {
      state.isAccsModalShown = action.payload;
    },
    setConnectorsModalsState: (state, action) => {
      state.isConnectorsModalShown = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        const user = action.payload;
        const {
          createdAt,
          trial_used: isTrialUsed,
          rebill_id: rebillID,
          card,
        } = user;

        const modalsTimeInMS = 1000 * 60 * 10; // 10 mins
        const nowInMS = Date.now();
        const createdAtInMS = Date.parse(createdAt);

        const isAutopaymentEnabled = !!isTrialUsed && !!rebillID && !!card;

        state.entity = action.payload;
        state.isUserLoading = false;
        state.isUserCreatedRecently = createdAtInMS + modalsTimeInMS >= nowInMS;
        state.isAutopaymentEnabled = isAutopaymentEnabled;
      })
      .addCase(getUser.pending, (state) => {
        state.isUserLoading = true;
      });
  },
});

export const { clearUser, setAccsModalsState, setConnectorsModalsState } =
  userSlice.actions;

export default userSlice.reducer;
