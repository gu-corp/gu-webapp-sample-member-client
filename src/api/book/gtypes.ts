export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Book = {
  __typename?: 'Book';
  id: Scalars['String'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};


export type Query = {
  __typename?: 'Query';
  getBook: Book;
  listBooks: Array<Book>;
};


export type QueryGetBookArgs = {
  id: Scalars['String'];
};


export type QueryListBooksArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addBook: Book;
  removeBook: Scalars['Boolean'];
};


export type MutationAddBookArgs = {
  book: NewBookInput;
};


export type MutationRemoveBookArgs = {
  id: Scalars['String'];
};

export type NewBookInput = {
  title: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  bookAdded: Book;
};
