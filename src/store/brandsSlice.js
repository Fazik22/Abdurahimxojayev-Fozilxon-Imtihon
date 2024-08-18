import { createSlice } from "@reduxjs/toolkit";

const brandsSlice = createSlice({
    name: "brands",
    initialState: {
        brands: [],
        loading: false,
    },
    reducers: {
        saveBrands: (state, action) => {
            state.brands = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
})

export const {saveBrands, setLoading} = brandsSlice.actions;
export default brandsSlice.reducer;