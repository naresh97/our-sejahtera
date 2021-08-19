import { Select } from '@chakra-ui/react';
import Flags from 'country-flag-icons/react/3x2';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../features/auth/langSlice';

function LanguageSwitcher() {
  const [, i18n] = useTranslation();
  const dispatch = useDispatch();

  const currentLangIcon = (() => {
    switch (i18n.language) {
      case 'en':
        return <Flags.GB />;
      case 'ms':
        return <Flags.MY />;
      case 'zh':
        return <Flags.CN />;
      case 'ta':
        return <Flags.IN />;
      default:
        return <Flags.GB />;
    }
  })();

  const handleSelectLanguage = e => {
    const languageKey = e.target.value;
    i18n.changeLanguage(languageKey);
    dispatch(setLanguage(languageKey));
  };
  return (
    <Select
      value={i18n.language}
      icon={currentLangIcon}
      variant="filled"
      onChange={handleSelectLanguage}
    >
      <option value="en">English</option>
      <option value="ms">Bahasa Melayu</option>
      {/*<option value="zh">中文</option>
      <option value="ta">தமிழ்</option>*/}
    </Select>
  );
}

export default LanguageSwitcher;
