import { createSlice } from "@reduxjs/toolkit";

export const ClientSlice = createSlice({
	name: "Client",
	initialState: {
		currentClientId: "",
		newClientCreate: false,
	},
	reducers: {
		setCurrentClientId: (state, action) => {
			state.currentClientId = action.payload;
		},
		setNewClientCreate: (state) => {
			state.newClientCreate = !state.newClientCreate;
		},
	},
});

export const { setCurrentClientId, setNewClientCreate } = ClientSlice.actions;

export default ClientSlice.reducer;
