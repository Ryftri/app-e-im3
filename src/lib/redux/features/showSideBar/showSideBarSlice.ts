import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface isShowSideBar {
    isShow: boolean;
}

const initialState: isShowSideBar = {
    isShow: false
}

const showSideBarSlice = createSlice({
    name: 'showSideBar',
    initialState,
    reducers: {
        toggleIsShow: (state) => {
            state.isShow = !state.isShow;
        },
        setIsShow: (state, action: PayloadAction<boolean>) => {
            state.isShow = action.payload;
        },
    }
})

export const { toggleIsShow, setIsShow } = showSideBarSlice.actions;
export default showSideBarSlice.reducer;
