import { Form, Input, Select, Space, Button } from 'antd';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { addBookName, fetchBooks } from '../../slices/bookSlice';
import { categorySelectOptions, sortingSelectOptions } from './constants';

export const SearchBooks: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  return (
    <Form
      form={form}
      name="search"
      onFinish={value => {
        dispatch(addBookName(value.bookName));
        dispatch(
          fetchBooks({ searchBook: value, booksNumber: 0, isSearch: true })
        );
      }}>
      <Form.Item
        name="bookName"
        rules={[
          {
            required: true,
            message: 'Введите значение поиска',
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item name="sorting" label="Сортировка" initialValue={'relevance'}>
        <Select style={{ width: 240 }} options={sortingSelectOptions} />
      </Form.Item>
      <Form.Item
        name="category"
        label="Категории"
        initialValue={['all']}
        rules={[
          {
            required: true,
            message: 'Введите значение поиска',
          },
        ]}>
        <Select
          mode="multiple"
          style={{ width: '50%' }}
          placeholder="Выберите категорию"
          optionLabelProp="label"
          options={categorySelectOptions}></Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Поиск
        </Button>
      </Form.Item>
    </Form>
  );
};
