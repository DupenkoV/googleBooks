import { useAppSelector } from '../../hooks/reduxHooks';
import { BookCard, PaginationButton } from '../index';
import { BooksDto } from '../../types';

/**
 * Компонент отвечает за каталог карточек с книгами и get запрос книг с "бэка".
 */

export const BooksList = () => {
  const books = useAppSelector(state => state.books.booksList);
  const totalItems = useAppSelector(state => state.books.totalItems);
  console.log(books);
  const find =
    books.length > 0 ? (
      <div>Всего найдено {totalItems} книг</div>
    ) : (
      `Сделайте запрос выше`
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
