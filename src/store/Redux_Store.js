import { configureStore,createSlice } from '@reduxjs/toolkit';

const DummySlice = createSlice({
    name: "dummy",
    initialState: {},
    reducers: {}
});

const Redux_Store = configureStore({
    reducer: {
        dummy: DummySlice.reducer,
    },
});

export default Redux_Store;
