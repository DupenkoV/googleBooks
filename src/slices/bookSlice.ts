import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BooksDto } from '../types';
import { addBooks } from './utilits';

interface StateProps {
  totalItems: number;
  booksList: BooksDto[];
  bookInfo: BooksDto | null;
  loading: boolean;
  bookName: string;
}

const initialState: StateProps = {
  totalItems: 0,
  booksList: [],
  bookInfo: null,
  loading: false,
  bookName: '',
};

interface FetchBooksArg {
  bookName: string;
  booksNumber: number;
  isSearch: boolean;
}

export const fetchBooks = createAsyncThunk(
  '@@books/fetchBooks',
  async ({ bookName, booksNumber, isSearch }: FetchBooksArg) => {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${bookName}&maxResults=30&startIndex=${
        isSearch ? 0 : booksNumber
      }`
    )
      .then(res => res.json())
      .then(data => {
        return data;
      });
    console.log(response);
    return { response, isSearch };
  }
);

export const fetchBook = createAsyncThunk(
  '@@books/fetchBook',
  async (bookId: string) => {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${bookId}`
    )
      .then(res => res.json())
      .then(data => {
        return data.volumeInfo;
      });

    return {
      id: bookId,
      bookCover: response.imageLinks
        ? response.imageLinks.thumbnail
        : 'https://www.ulfven.no/files/sculptor30/library/images/default-product-image.png',
      title: response.title,
      description: response.description,
      authors: response.authors ? response.authors : [''],
      categories: response.categories ? response.categories : [''],
    };
  }
);

const bookSlice = createSlice({
  name: '@@books',
  initialState,
  reducers: {
    addBookInfo: (state, action) => {
      state.bookInfo = state.booksList.find(item => item.id === action.payload);
    },
    addBookName: (state, action) => {
      state.bookName = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchBooks.pending, state => {});
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      /* API возвращает всегда разный результат по количеству найденных книг при пагинации. 
      Поэтому на страницу выводится первый результат по количеству найденных книг, при пагинации результат не обновляется*/
      if (action.payload.isSearch) {
        state.booksList = [...addBooks(action.payload.response.items)];
        state.totalItems = action.payload.response.totalItems;
      } else {
        state.booksList.push(...addBooks(action.payload.response.items));
      }
    });
    builder.addCase(fetchBooks.rejected, () => {});
    builder.addCase(fetchBook.pending, () => {});
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      state.bookInfo = action.payload;
    });
    builder.addCase(fetchBook.rejected, () => {});
  },
});

export const bookReducer = bookSlice.reducer;
export const { addBookInfo, addBookName } = bookSlice.actions;
