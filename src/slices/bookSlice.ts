import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FetchBooksArg, StateProps } from '../types';
import { addBooks } from './utilits';
import { creatingUrl } from './utilits';

const initialState: StateProps = {
  totalItems: 0,
  booksList: [],
  bookInfo: null,
  loading: false,
  bookName: '',
};

//Запрос списка книг по условиям поиска. Реализации корявая, нарушается принцип DRY. буду переделывать, сейчас не успеваю дописать утилиту.

export const fetchBooks = createAsyncThunk(
  '@@books/fetchBooks',
  async ({ searchBook, booksNumber, isSearch }: FetchBooksArg) => {
    const response = await fetch(creatingUrl(searchBook, isSearch, booksNumber))
      .then(res => res.json())
      .then(data => {
        return data;
      });
    return { response, isSearch };
  }
);

// Запрос детализации книги из API.
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

//С обработкой ошибок тоже не успел. Необходимо добавлять в rejected информацию о действиях в случае отсутствия ответа от сервера. Также как и дял состояния pending. Завел в store loading, а дописать не успел.

const bookSlice = createSlice({
  name: '@@books',
  initialState,
  reducers: {
    addBookInfo: (state, action) => {
      state.bookInfo = state.booksList.find(item => item.id === action.payload); //Добавление информации о книги из store, если она там есть. Чтобы не делать лишние запросы из API.
    },
    addBookName: (state, action) => {
      state.bookName = action.payload; // Добавление объекта с информацией из запроса (сортировка, категории, нейминг запроса). Необходимая информация для пагинации, а, также, возможного будущего расширения приложения.
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
