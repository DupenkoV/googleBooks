import { Descriptions, Image, Button, Divider, Spin } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchBook } from '../../slices/bookSlice';

// /**
//  * Компонент отображает детальную информацию о книге.
//  * Детальную информацию он получает из store, предварительно сделав dispatch ID книги, который он получил из URL.
//  */

export const Details = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const bookDetails = useAppSelector(state => state.books.bookInfo);
  console.log('details');
  if (!bookDetails) {
    dispatch(fetchBook(id));
  }
  if (!bookDetails) {
    return <Spin tip="Загрузка..."></Spin>;
  }

  return (
    <>
      <Image src={bookDetails.bookCover} width={200} height={300} />
      <Descriptions title={bookDetails.title}>
        <Descriptions.Item label="Автор">
          {bookDetails.authors.map((item: string, idx) => {
            if (bookDetails.authors.length === idx + 1) {
              return item;
            }
            return `${item}, `;
          })}
        </Descriptions.Item>
        <Descriptions.Item label="Описание">
          {bookDetails.description}
        </Descriptions.Item>
        <Descriptions.Item label="Категории">
          {bookDetails.categories.map((item: string, idx) => {
            if (bookDetails.categories.length === idx + 1) {
              return item;
            }
            return `${item}, `;
          })}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Link to="/">
        <Button type="primary">Назад</Button>
      </Link>
    </>
  );
};
