export type SupportedLanguages = "en" | "ru";

export interface I18nConfig {
  defaultLanguage: SupportedLanguages;
  fallbackLanguage: SupportedLanguages;
  supportedLanguages: SupportedLanguages[];
}
