import { Card, Image } from 'antd';
import React from 'react';
import { BooksDto } from '../../types';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { addBookInfo } from '../../slices/bookSlice';

/**
 * Компонент отвечает за формирование карточки книги
 */

export const BookCard: React.FC = (item: BooksDto) => {
  const { authors, title, bookCover, id, categories } = item;
  const dispatch = useAppDispatch();
  return (
    <Link
      to={`/details/${id}`}
      onClick={() => {
        dispatch(addBookInfo(id));
      }}>
      <Card
        title={title}
        bordered={true}
        style={{ width: 350, height: 460 }}
        hoverable>
        <Image src={bookCover} height={200} max-width={300} alt="book" />
        <p>{categories[0]}</p>
        <p>{title}</p>
        <p>
          {authors.map((item, idx) => {
            if (authors.length === idx + 1) {
              return item;
            }
            return `${item}, `;
          })}
        </p>
      </Card>
    </Link>
  );
};
