import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import {BUILTIN_CARDS} from '../data/knowledge';
import type {
  KnowledgeCard,
  KnowledgeCategory,
  KnowledgeIcon,
  KnowledgeStatus,
} from '../types/knowledge';

type HistoryEntry = {
  id: string;
  previous: KnowledgeStatus;
};

type CardDraft = {
  title: string;
  category: KnowledgeCategory;
  icon: KnowledgeIcon;
  what: string;
  does: string;
};

type KnowledgeContextValue = {
  cards: KnowledgeCard[];
  deck: KnowledgeCard[];
  known: KnowledgeCard[];
  toLearn: KnowledgeCard[];
  customCards: KnowledgeCard[];
  streak: number;
  progressPercent: number;
  canUndo: boolean;
  getCard: (id: string) => KnowledgeCard | undefined;
  setStatus: (id: string, status: KnowledgeStatus) => void;
  undo: () => void;
  saveCard: (draft: CardDraft, id?: string) => void;
  deleteCard: (id: string) => void;
};

const KnowledgeContext = createContext<KnowledgeContextValue | null>(null);

export function KnowledgeProvider({children}: {children: React.ReactNode}) {
  const [customCards, setCustomCards] = useState<KnowledgeCard[]>([]);
  const [status, setStatusMap] = useState<Record<string, KnowledgeStatus>>({});
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [streak] = useState(0);

  const cards = useMemo(
    () => [...BUILTIN_CARDS, ...customCards],
    [customCards],
  );

  const statusOf = useCallback(
    (id: string): KnowledgeStatus => status[id] ?? 'deck',
    [status],
  );

  const deck = useMemo(
    () => cards.filter(card => statusOf(card.id) === 'deck'),
    [cards, statusOf],
  );
  const known = useMemo(
    () => cards.filter(card => statusOf(card.id) === 'known'),
    [cards, statusOf],
  );
  const toLearn = useMemo(
    () => cards.filter(card => statusOf(card.id) === 'learn'),
    [cards, statusOf],
  );

  const progressPercent = cards.length
    ? Math.round((known.length / cards.length) * 100)
    : 0;

  const getCard = useCallback(
    (id: string) => cards.find(card => card.id === id),
    [cards],
  );

  const setStatus = useCallback(
    (id: string, next: KnowledgeStatus) => {
      setStatusMap(current => {
        const previous = current[id] ?? 'deck';
        if (previous === next) {
          return current;
        }
        setHistory(stack => [...stack, {id, previous}]);
        return {...current, [id]: next};
      });
    },
    [],
  );

  const undo = useCallback(() => {
    setHistory(stack => {
      const last = stack[stack.length - 1];
      if (!last) {
        return stack;
      }
      setStatusMap(current => ({...current, [last.id]: last.previous}));
      return stack.slice(0, -1);
    });
  }, []);

  const saveCard = useCallback((draft: CardDraft, id?: string) => {
    const title = draft.title.trim();
    const what = draft.what.trim();
    const does = draft.does.trim();
    if (!title || !what || !does) {
      return;
    }
    if (id) {
      setCustomCards(current =>
        current.map(card =>
          card.id === id ? {...card, ...draft, title, what, does} : card,
        ),
      );
      return;
    }
    const card: KnowledgeCard = {
      id: `custom-${Date.now()}`,
      title,
      category: draft.category,
      icon: draft.icon,
      what,
      does,
      custom: true,
    };
    setCustomCards(current => [card, ...current]);
  }, []);

  const deleteCard = useCallback((id: string) => {
    setCustomCards(current => current.filter(card => card.id !== id));
    setStatusMap(current => {
      const next = {...current};
      delete next[id];
      return next;
    });
    setHistory(stack => stack.filter(entry => entry.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      cards,
      deck,
      known,
      toLearn,
      customCards,
      streak,
      progressPercent,
      canUndo: history.length > 0,
      getCard,
      setStatus,
      undo,
      saveCard,
      deleteCard,
    }),
    [
      cards,
      deck,
      known,
      toLearn,
      customCards,
      streak,
      progressPercent,
      history.length,
      getCard,
      setStatus,
      undo,
      saveCard,
      deleteCard,
    ],
  );

  return (
    <KnowledgeContext.Provider value={value}>
      {children}
    </KnowledgeContext.Provider>
  );
}

export function useKnowledge() {
  const context = useContext(KnowledgeContext);
  if (!context) {
    throw new Error('useKnowledge must be used within KnowledgeProvider');
  }
  return context;
}
