import React from 'react';
import { Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchBooks, addBookName } from '../../slices/bookSlice';

const { Search } = Input;

export const InputBookName: React.FC = () => {
  const dispatch = useAppDispatch();
  const totalItems = useAppSelector(state => state.books.booksList.length);

  return (
    <>
      <Search
        placeholder="input search book"
        enterButton="Submit"
        size="large"
        onSearch={(value: string) => {
          if (value.length > 0) {
            dispatch(addBookName(value));
            dispatch(
              fetchBooks({
                bookName: value,
                booksNumber: totalItems,
                isSearch: true,
              })
            );
          }
        }}
      />
    </>
  );
};
