import engObj from './eng.json'
import rusObj from './rus.json'
import locales from '../data/locales.json'


export const getWordByLocale = (ident, curLocale) => {
  if (curLocale === locales.RUS) {
    return rusObj[ident]
  } else {
    return engObj[ident]
  }
}