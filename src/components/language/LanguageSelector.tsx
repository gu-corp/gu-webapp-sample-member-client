import { useTranslation, i18n } from 'next-i18next'
import { useRouter } from 'next/router'
import { setCookie } from 'nookies'

export const LanguageSelector = () => {
  const router = useRouter()
  const onHandleChange = e => {
    const language = e.target.value;
    console.log(language)
    // i18n.changeLanguage(e.target.value);
    router.push(router.route, router.route, { locale: language})
    setCookie(null, 'NEXT_LOCALE', language)
  }  
  if ( i18n && i18n.language ) {
    return (
      <select name='languageSelcter' value={i18n.language} onChange={onHandleChange}>
        <option value='en'>English</option>
        <option value='ja'>日本語</option>
      </select>
    )
  }
  return <>Error:No i18n instance</>;
}