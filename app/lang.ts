enum LanguageDirection {
    RTL = "rtl",
    LTR = "ltr",
  }
  
  type Language = {
    key: string;
    value: string;
    dir: string;
  };
  
  export const Lang: Language[] = [
    {
      key: "en",
      value: "English",
      dir: LanguageDirection.LTR,
    },
    {
      key: "he",
      value: "Hebrew",
      dir: LanguageDirection.RTL,
    },
  ];