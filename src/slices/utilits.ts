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
