import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../interfaces/interfaces";

const initialState: UserInfo = {
    name: "",
    email: "",
    id: "",
};

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.id = action.payload.id;
        },
    },
});

export const { setUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;