import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next'
import { RootState }　from '~/store/configure-store';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { useAuthUser, withAuthUser, AuthAction } from 'next-firebase-auth'
import * as HelloActions from '@store/actions/hello-actions';

const useHelloMessage = () => {
  return useSelector(
    (state: RootState) => ({
      helloMessage: ( state.helloState.helloMessage )
    }),
    shallowEqual
  )
}

const PageLoader = () => (
  <>
    Loading...
  </>
)

const Hello = ({inputMessage}: {inputMessage: string}) => {
  const { t } = useTranslation('common')
  const { helloMessage } = useHelloMessage();
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const user = useAuthUser()

  const getHello= () => {
    dispatch(HelloActions.getHello(inputMessage ? inputMessage : 'Unknown'))
    .then(() => setIsError(false))
    .catch(err => {
      console.log(err);
      setIsError(true);
    })
  }   

  useEffect( () => {
    getHello();
  }, [inputMessage])

  return (
      <>{t('message')}: {helloMessage ? helloMessage : 'Loading...'}</>
  );
}

export default Hello
