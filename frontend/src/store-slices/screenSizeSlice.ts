import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ScreenSizeState {
	width: number;
	height: number;
}

const initialState: ScreenSizeState = {
	width: 0,
	height: 0,
};

const screenSizeSlice = createSlice({
	name: "screenSize",
	initialState,
	reducers: {
		setScreenSize: (state, action: PayloadAction<ScreenSizeState>) => {
			state.width = action.payload.width;
			state.height = action.payload.height;
		},
	},
});

export const { setScreenSize } = screenSizeSlice.actions;

export default screenSizeSlice.reducer;
