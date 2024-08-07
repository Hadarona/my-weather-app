import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUnitProps { 
  unit: 'C' | 'F';
}

//Making Celsius the default unit
const initialState: IUnitProps = {
  unit: 'C', 
};

export const unitSlice = createSlice({
  name: 'unit',
  initialState,
  reducers: {
    setUnit: (state, action: PayloadAction<'C' | 'F'>) => {
      state.unit = action.payload;
    },
  },
});

export const { setUnit } = unitSlice.actions;
export default unitSlice.reducer;