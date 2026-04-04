import { configureStore } from "@reduxjs/toolkit";
import infoMappingsReducer from "./store-slices/infoMappingsSlice";
import screenSizeReducer from "./store-slices/screenSizeSlice";

const store = configureStore({
  reducer: {
    infoMappings: infoMappingsReducer,
    screenSize: screenSizeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export default store;