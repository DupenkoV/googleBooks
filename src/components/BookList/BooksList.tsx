import { useAppSelector } from '../../hooks/reduxHooks';
import { BookCard, PaginationButton } from '../index';
import { BooksDto } from '../../types';

/**
 * Компонент отвечает за рэндэр каталог карточек с книгами.
 */

export const BooksList = () => {
  const books = useAppSelector(state => state.books.booksList);
  const totalItems = useAppSelector(state => state.books.totalItems);

  const find =
    books.length > 0 ? (
      <div style={{ margin: '20px' }}>Всего найдено {totalItems} книг</div>
    ) : (
      <div style={{ margin: '20px' }}>Сделайте запрос выше</div>
    );

  const button =
    books.length > 0 && books.length < totalItems ? <PaginationButton /> : null;

  return (
    <>
      {find}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '45px',
        }}>
        {books.map((item: BooksDto) => (
          <BookCard key={item.id} {...item} />
        ))}
      </div>
      {button}
    </>
  );
};
