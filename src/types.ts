export interface BooksDto {
  id: string;
  title: string;
  authors: string[];
  bookCover?: string;
  description?: string;
  categories: string[];
}
