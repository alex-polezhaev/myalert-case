import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api';

const initialState = {
  entities: [],
  isConnectorsLoading: false,
  currentConnector: null,
  ConnectorEditState: null,
};

export const getConnectors = createAsyncThunk('connectors/getConnectors', () =>
  api()
    .get('/operation/get_connections')
    .then(({ data }) => data),
);

export const connectorsSlice = createSlice({
  name: 'connectors',
  initialState,
  reducers: {
    clearConnectors: () => initialState,
    setCurrentConnector: (state, action) => {
      state.currentConnector = action.payload;
    },
    setConnectorEditState: (state, action) => {
      state.ConnectorEditState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConnectors.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.isConnectorsLoading = false;
      })
      .addCase(getConnectors.pending, (state) => {
        state.isConnectorsLoading = true;
      });
  },
});

export const { clearConnectors, setCurrentConnector, setConnectorEditState } =
  connectorsSlice.actions;

export default connectorsSlice.reducer;
