import React from 'react';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchBooks } from '../../slices/bookSlice';

export const PaginationButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchBook = useAppSelector(state => state.books.bookName);
  const booksNumber = useAppSelector(state => state.books.booksList.length);

  return (
    <Button
      type="primary"
      loading={false}
      onClick={() =>
        dispatch(fetchBooks({ searchBook, booksNumber, isSearch: false }))
      }>
      Загрузить больше
    </Button>
  );
};
