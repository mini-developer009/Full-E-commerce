type Lang = 'en' | 'hi' | 'bn';

const digits = {
  en: ['0','1','2','3','4','5','6','7','8','9'],
  hi: ['०','१','२','३','४','५','६','७','८','९'],
  bn: ['০','১','২','৩','৪','৫','৬','৭','৮','৯'],
};

export default function convertDigits(input: string, to: Lang = 'en'): string {
  const allDigits = [...digits.en, ...digits.hi, ...digits.bn];
  return input.replace(/[\d०-९০-৯]/g, ch => {
    for (const lang of ['en','hi','bn'] as Lang[]) {
      const i = digits[lang].indexOf(ch);
      if (i !== -1) return digits[to][i];
    }
    return ch;
  });
}


