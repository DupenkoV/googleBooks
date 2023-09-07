import { BooksList } from '../BookList';
import { Routes, Route } from 'react-router-dom';
import { Details } from '../Details';
import { Layout } from '../index';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<BooksList />} />
        <Route path="details/:id" element={<Details />} />
      </Route>
    </Routes>
  );
};
