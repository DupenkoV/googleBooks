const BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q=';

//Функция для преобразования объекта ответа с API в объект для использования в SPA.

export const addBooks = booksArr => {
  return booksArr.map(item => {
    return {
      id: item.id,
      bookCover: item.volumeInfo.imageLinks
        ? item.volumeInfo.imageLinks.thumbnail
        : 'https://www.ulfven.no/files/sculptor30/library/images/default-product-image.png',
      title: item.volumeInfo.title,
      description: item.volumeInfo.description,
      authors: item.volumeInfo.authors ? item.volumeInfo.authors : [''],
      categories: item.volumeInfo.categories
        ? item.volumeInfo.categories
        : [''],
    };
  });
};

//Функция создания УРЛ для запроса в API

export const creatingUrl = (searchBook, isSearch, booksNumber) => {
  const { bookName, sorting, category } = searchBook;
  let finalURL = BASE_URL;
  if (isSearch) {
    if (category.includes('all')) {
      finalURL = finalURL + `${bookName}&maxResults=30&orderBy=${sorting}`;
    } else {
      finalURL =
        finalURL +
        `${bookName}+subject:${category.join(
          ' '
        )}&maxResults=30&orderBy=${sorting}`;
    }
  } else {
    if (category.includes('all')) {
      finalURL = `https://www.googleapis.com/books/v1/volumes?q=${bookName}&maxResults=30&startIndex=${booksNumber}&orderBy=${sorting}`;
    } else {
      finalURL =
        finalURL = `https://www.googleapis.com/books/v1/volumes?q=${bookName}+subject:${category.join(
          ' '
        )}&maxResults=30&startIndex=${booksNumber}&orderBy=${sorting}`;
    }
  }
  return finalURL;
};
