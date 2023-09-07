import { Outlet } from 'react-router-dom';
import { InputBookName } from '../InputBookName';
import { SelectCategory } from '../SelectCategory';
import { Form } from 'antd';

export const Layout = () => {
  return (
    <>
      <header
        style={{
          height: '100px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          backgroundColor: 'grey',
          padding: '150px',
        }}>
        <Form>
          <InputBookName />
          <SelectCategory />
        </Form>
      </header>
      <Outlet />
    </>
  );
};
