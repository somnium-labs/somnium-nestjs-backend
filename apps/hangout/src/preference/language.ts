/**
 * 행아웃 서비스 내에서 지원하는 언어 목록
 */
enum Language {
  EN = 'en',
  KO = 'ko',
  JA = 'ja',
  ZH_CN = 'zh-cn',
  ZH_TW = 'zh-tw',
}

namespace Language {
  export function defaultLanguage(): Language {
    return Language.EN;
  }

  export function getText(
    texts: Map<Language, string>,
    language: Language = defaultLanguage(),
  ): string {
    const text = texts[language] || texts[defaultLanguage()];
    if (!text) {
      const firstTextValue = Object.values(texts)[0];
      return firstTextValue || '';
    }
    return text;
  }
}

export { Language };
