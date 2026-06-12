export interface LetterTheme {
  headingFont: string;
  bodyFont: string;
  gradient: string;
  accentColor: string;
  surfaceColor: string;
  textColor: string;
  mutedTextColor: string;
  shadowColor: string;
  borderColor: string;
}

export interface LetterBackground {
  ambientGradient: string;
  overlayPatternOpacity: number;
  floatingElements: Array<{
    size: number;
    x: string;
    y: string;
    delay: number;
    duration: number;
    blur: number;
    color: string;
  }>;
}

export interface LetterGift {
  image: string;
  alt: string;
  message: string;
}

export interface LetterData {
  id: string;
  slug: string;
  recipientName: string;
  introTitle: string;
  introMessage: string;
  passwordRequired: boolean;
  password?: string;
  passwordHint?: string;
  loadingMessage: string;
  letterTitle: string;
  letterBody: string[];
  closingMessage: string;
  signature: string;
  gift?: LetterGift;
  theme: LetterTheme;
  background: LetterBackground;
}

export type LetterStep = 'intro' | 'password' | 'loading' | 'letter';

