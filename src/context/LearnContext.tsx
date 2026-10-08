import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  LEARN_ARTICLES,
  LEARN_CATEGORIES,
  getLearnArticle,
  getLearnStats,
  getNextArticle,
} from '../data/learn';
import {loadJson, loadString, saveJson, saveString, storageKeys} from '../storage/persist';
import type {LearnArticle, LearnCategory, LearnCategoryId} from '../types/learn';

type LearnContextValue = {
  ready: boolean;
  categories: LearnCategory[];
  articles: LearnArticle[];
  bookmarks: string[];
  lastReadId: string | null;
  stats: {topics: number; minutes: number};
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  markRead: (id: string) => void;
  getArticle: (id: string) => LearnArticle | undefined;
  getCategory: (id: LearnCategoryId) => LearnCategory | undefined;
  getNext: (id: string) => LearnArticle | undefined;
  filterArticles: (params: {
    query: string;
    categoryId: LearnCategoryId | 'all';
    bookmarkedOnly?: boolean;
  }) => LearnArticle[];
};

const LearnContext = createContext<LearnContextValue | null>(null);

export function LearnProvider({children}: {children: React.ReactNode}) {
  const [ready, setReady] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [lastReadId, setLastReadId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const [savedBookmarks, savedLastRead] = await Promise.all([
        loadJson<string[]>(storageKeys.learnBookmarks, []),
        loadString(storageKeys.learnLastRead, null),
      ]);
      if (!mounted) {
        return;
      }
      setBookmarks(savedBookmarks);
      setLastReadId(savedLastRead);
      setReady(true);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarks(current => {
      const next = current.includes(id)
        ? current.filter(item => item !== id)
        : [...current, id];
      void saveJson(storageKeys.learnBookmarks, next);
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (id: string) => bookmarks.includes(id),
    [bookmarks],
  );

  const markRead = useCallback((id: string) => {
    setLastReadId(id);
    void saveString(storageKeys.learnLastRead, id);
  }, []);

  const getArticle = useCallback((id: string) => getLearnArticle(id), []);

  const getCategory = useCallback(
    (id: LearnCategoryId) => LEARN_CATEGORIES.find(item => item.id === id),
    [],
  );

  const getNext = useCallback((id: string) => getNextArticle(id), []);

  const filterArticles = useCallback(
    ({
      query,
      categoryId,
      bookmarkedOnly,
    }: {
      query: string;
      categoryId: LearnCategoryId | 'all';
      bookmarkedOnly?: boolean;
    }) => {
      const normalized = query.trim().toLowerCase();
      return LEARN_ARTICLES.filter(article => {
        if (categoryId !== 'all' && article.categoryId !== categoryId) {
          return false;
        }
        if (bookmarkedOnly && !bookmarks.includes(article.id)) {
          return false;
        }
        if (!normalized) {
          return true;
        }
        const category = LEARN_CATEGORIES.find(
          item => item.id === article.categoryId,
        );
        const haystack = [
          article.title,
          article.summary,
          article.level,
          article.keyTakeaway,
          category?.title ?? '',
          ...article.paragraphs,
        ]
          .join(' ')
          .toLowerCase();
        return haystack.includes(normalized);
      });
    },
    [bookmarks],
  );

  const value = useMemo(
    () => ({
      ready,
      categories: LEARN_CATEGORIES,
      articles: LEARN_ARTICLES,
      bookmarks,
      lastReadId,
      stats: getLearnStats(),
      toggleBookmark,
      isBookmarked,
      markRead,
      getArticle,
      getCategory,
      getNext,
      filterArticles,
    }),
    [
      ready,
      bookmarks,
      lastReadId,
      toggleBookmark,
      isBookmarked,
      markRead,
      getArticle,
      getCategory,
      getNext,
      filterArticles,
    ],
  );

  return (
    <LearnContext.Provider value={value}>{children}</LearnContext.Provider>
  );
}

export function useLearn() {
  const context = useContext(LearnContext);
  if (!context) {
    throw new Error('useLearn must be used within LearnProvider');
  }
  return context;
}
