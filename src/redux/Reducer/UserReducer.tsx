import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
	name: "user",
	initialState: {
		id: "",
		email: "",
		role: "",
		detailsid: "",
		isClient: false,
		clientId: "",
	},
	reducers: {
		setUserData: (state, action) => {
			state.id = action.payload.id;
			state.email = action.payload.email;
			state.role = action.payload.role;
			state.detailsid = action.payload.detailsid;
			// state.isClient = action.payload.isClient;
			// state.clientId = action.payload.clientId;
		},
		setClient: (state, action) => {
			state.isClient = action.payload.isClient;
			state.clientId = action.payload.clientId;
		},
	},
});

export const { setUserData, setClient } = UserSlice.actions;

export default UserSlice.reducer;
