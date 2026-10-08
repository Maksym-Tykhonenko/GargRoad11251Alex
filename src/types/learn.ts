export type LearnLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type LearnCategoryId =
  | 'engine'
  | 'howItWorks'
  | 'fuel'
  | 'braking'
  | 'transmission'
  | 'cooling';

export type LearnCategory = {
  id: LearnCategoryId;
  title: string;
  color: string;
  icon:
    | 'settings'
    | 'car'
    | 'fuel'
    | 'tire'
    | 'tune'
    | 'thermostat';
};

export type LearnArticle = {
  id: string;
  categoryId: LearnCategoryId;
  title: string;
  level: LearnLevel;
  summary: string;
  paragraphs: string[];
  keyTakeaway: string;
  minutes: number;
};
