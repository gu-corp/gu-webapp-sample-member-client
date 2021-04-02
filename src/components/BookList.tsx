import { useEffect, useState } from 'react';
import { RootState }　from '~/store/configure-store';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { useAuthUser, withAuthUser, withAuthUserSSR, AuthAction } from 'next-firebase-auth'
import * as BookActions from '@store/actions/book-actions';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const useBooks = () => {
  return useSelector(
    (state: RootState) => ({
      books: state.bookState.books,
      isBookLoaded: state.bookState.isBookLoaded
    }),
    shallowEqual
  )
}

const BookList = () => {
  const { books, isBookLoaded } = useBooks();
  const user = useAuthUser()
  const dispatch = useDispatch();  
  const [isLoading, setIsLoading] = useState(false);

  const getBooks= () => {
    setIsLoading(true);
    user.getIdToken().then( token => {
      if ( token ) {
        dispatch(BookActions.listBooks(token)).catch(err => window.alert(err)).finally( () => setIsLoading(false));
      }
    });
  }   

  useEffect(() => {
    if ( !isBookLoaded ) {
      getBooks();
    }
  });
  return (
    <>
    { isBookLoaded ? (
      <>       
        <ul>
            {books && books.map((book) => (
            <li key={book.id}>
                Title : {book.title}
            </li>
            ))}
        </ul>
      </>      
    ) : (
        <div>Loading...</div>
    )}  
    </>      
  );
}

export default withAuthUser({
})(BookList)
