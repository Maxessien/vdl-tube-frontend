import { configureStore } from "@reduxjs/toolkit";
import infoMappingsReducer from "./store-slices/infoMappingsSlice"

const store = configureStore({
  reducer: {
    infoMappings: infoMappingsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>

export default store;