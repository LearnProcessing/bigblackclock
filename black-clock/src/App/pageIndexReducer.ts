import { createSlice } from "@reduxjs/toolkit";
import { PageIndex, PagesType } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState: PageIndex = { page: 'CLOCK'} 

const pageIndexSlice = createSlice({
  name: 'pageIndex',
  initialState: initialState,
  reducers: {
    selectPage: (state, action: PayloadAction<PagesType>) => {
      state.page = action.payload
    }
  }
})

export const { selectPage } = pageIndexSlice.actions;
export const selectedPageIndex = (state: RootState) => state.pageIndex.page
export default pageIndexSlice.reducer;