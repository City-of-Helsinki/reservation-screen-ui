/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 *   IMPORTANT: This file is used by the internal build
 *   script `extract-intl`, and must use CommonJS module syntax
 *   You CANNOT use import/export in this file.
 */
require('@formatjs/intl-pluralrules/polyfill');
require('@formatjs/intl-pluralrules/dist/locale-data/en');
require('@formatjs/intl-pluralrules/dist/locale-data/fi');
require('@formatjs/intl-pluralrules/dist/locale-data/sv');

require('@formatjs/intl-relativetimeformat/polyfill');
require('@formatjs/intl-relativetimeformat/dist/locale-data/en');
require('@formatjs/intl-relativetimeformat/dist/locale-data/fi');
require('@formatjs/intl-relativetimeformat/dist/locale-data/sv');

const enTranslationMessages = require('./translations/en.json');
const fiTranslationMessages = require('./translations/fi.json');
const svTranslationMessages = require('./translations/sv.json');

const DEFAULT_LOCALE = 'fi';

// prettier-ignore
const appLocales = [
  'fi',
  'en',
  'sv',
];

const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  fi: formatTranslationMessages('fi', fiTranslationMessages),
  sv: formatTranslationMessages('sv', svTranslationMessages),
};

exports.appLocales = appLocales;
exports.formatTranslationMessages = formatTranslationMessages;
exports.translationMessages = translationMessages;
exports.DEFAULT_LOCALE = DEFAULT_LOCALE;
