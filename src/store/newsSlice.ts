import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Article {
  url: string;
  title: string;
  description: string;
  urlToImage: string;
  source: { id: string | null };
}

interface NewsState {
  articles: Article[];
  loading: boolean;
  error: string | null;
  page: number;
}

const API_KEY = 'd199b8b1f060413a90e20530eff6a6d4';
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNews = createAsyncThunk<Article[], { category: string; page: number }>(
  'news/fetchNews',
  async ({ category, page }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/top-headlines`, {
        params: {
          category,
          apiKey: API_KEY,
          page,
          pageSize: 10,
        },
      });
      return response.data.articles;
    } catch (error:any) {
      if (error?.response) {
        return rejectWithValue(error?.response?.data?.message);
      }else{
        return rejectWithValue('Failed to fetch news. Please try again later.');
      }
      
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: [],
    loading: false,
    error: null,
    page: 1,
  } as NewsState,
  reducers: {
    resetNews: (state) => {
      state.articles = [];
      state.page = 1;
      state.error = null;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, { payload }) => {
        state.articles = [...state.articles, ...payload];
        state.loading = false;
      })
      .addCase(fetchNews.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
  },
});

export const { resetNews, incrementPage } = newsSlice.actions;
export default newsSlice.reducer;