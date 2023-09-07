import { Outlet } from 'react-router-dom';
import { SearchBooks } from '../SearchBooks';

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
        <SearchBooks />
      </header>
      <Outlet />
    </>
  );
};
