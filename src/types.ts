export interface BooksDto {
  id: string;
  title: string;
  authors: string[];
  bookCover?: string;
  description?: string;
  categories: string[];
}
export interface FetchBooksArg {
  searchBook?: searchBook;
  booksNumber: number;
  isSearch: boolean;
  bookName?: string;
}

export interface searchBook {
  sorting: string;
  bookName: string;
  category: string[];
}
export interface StateProps {
  totalItems: number;
  booksList: BooksDto[];
  bookInfo: BooksDto | null;
  loading: boolean;
  bookName: any;
}
