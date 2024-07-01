import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme : 'light',
};

const themeSlice = createSlice({
    name : 'theme',
    initialState,
    reducers : {                         // here we add the logics for the functionalities we want
        toggleTheme : (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },               
    }
});

export const {toggleTheme} = themeSlice.actions;

export default themeSlice.reducer;