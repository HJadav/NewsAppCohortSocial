import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './store/newsSlice';
import bookmarkReducer from './store/bookmarkSlice';

const store = configureStore({
  reducer: {
    news: newsReducer,
    bookmarks: bookmarkReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
