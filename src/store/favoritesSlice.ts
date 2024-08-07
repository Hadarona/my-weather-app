import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Favorite {
  locationKey: string;
  cityName: string;
}

export interface IFavoritesProps {
  favorites: Favorite[];
}

const initialState: IFavoritesProps = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Favorite>) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        favorite => favorite.locationKey !== action.payload
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;