import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppDispatch } from '../store';

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: { id: string | null; name: string };
}

interface BookmarksState {
  bookmarks: Article[];
}

const initialState: BookmarksState = {
  bookmarks: [],
};

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    setBookmarks: (state, action: PayloadAction<Article[]>) => {
      state.bookmarks = action.payload;
    },
    addBookmark: (state, action: PayloadAction<Article>) => {
      state.bookmarks.push(action.payload);
    },
    removeBookmark: (state, action: PayloadAction<string>) => {
      state.bookmarks = state.bookmarks.filter(article => article.url !== action.payload);
    },
  },
});

export const { setBookmarks, addBookmark, removeBookmark } = bookmarksSlice.actions;

export const loadBookmarks = () => async (dispatch: AppDispatch) => {
  const savedBookmarks = await AsyncStorage.getItem('bookmarks');
  if (savedBookmarks) {
    dispatch(setBookmarks(JSON.parse(savedBookmarks)));
  }
};

export const saveBookmarks = () => async (dispatch: AppDispatch, getState: () => { bookmarks: BookmarksState }) => {
  const { bookmarks } = getState();
  await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks.bookmarks));
};

export const toggleBookmark = (article: Article) => (dispatch: AppDispatch, getState: () => { bookmarks: BookmarksState }) => {
  const { bookmarks } = getState();
  const isBookmarked = bookmarks.bookmarks.some(item => item.url === article.url);
  
  if (isBookmarked) {
    dispatch(removeBookmark(article.url));
  } else {
    dispatch(addBookmark(article));
  }
  
  dispatch(saveBookmarks());
};


export default bookmarksSlice.reducer;
