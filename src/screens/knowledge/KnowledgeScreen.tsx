import React, {useRef} from 'react';
import {
  Alert,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppIcon} from '../../components/icons/AppIcon';
import {KnowledgeGlyph} from '../../components/knowledge/KnowledgeGlyph';
import {CATEGORY_TINT} from '../../data/knowledge';
import {useKnowledge} from '../../context/KnowledgeContext';
import {colors, fonts} from '../../constants/theme';
import type {KnowledgeStackParamList} from '../../navigation/types';
import type {KnowledgeCard} from '../../types/knowledge';

type Props = NativeStackScreenProps<KnowledgeStackParamList, 'KnowledgeHome'>;
type TabId = 'deck' | 'known' | 'learn' | 'mine';

const TABS: {id: TabId; label: string}[] = [
  {id: 'deck', label: 'Deck'},
  {id: 'known', label: 'Known'},
  {id: 'learn', label: 'To Learn'},
  {id: 'mine', label: 'My Cards'},
];

export function KnowledgeScreen({navigation}: Props) {
  const insets = useSafeAreaInsets();
  const {
    deck,
    known,
    toLearn,
    customCards,
    streak,
    progressPercent,
    canUndo,
    setStatus,
    undo,
    deleteCard,
  } = useKnowledge();
  const [tab, setTab] = React.useState<TabId>('deck');
  const [dragX, setDragX] = React.useState(0);
  const frontRef = useRef(deck[0]);
  frontRef.current = deck[0];

  const front = deck[0];

  const pan = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dx) > 12 && Math.abs(gesture.dx) > Math.abs(gesture.dy),
      onPanResponderMove: (_, gesture) => {
        setDragX(gesture.dx);
      },
      onPanResponderRelease: (_, gesture) => {
        const current = frontRef.current;
        if (current && gesture.dx > 90) {
          setStatus(current.id, 'known');
        } else if (current && gesture.dx < -90) {
          setStatus(current.id, 'learn');
        }
        setDragX(0);
      },
      onPanResponderTerminate: () => {
        setDragX(0);
      },
    }),
  ).current;

  const confirmDelete = (card: KnowledgeCard) => {
    Alert.alert(
      `Delete “${card.title}”?`,
      'This custom card will be removed from all lists.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete card',
          style: 'destructive',
          onPress: () => deleteCard(card.id),
        },
      ],
    );
  };

  return (
    <View style={styles.KnowledgeChassis}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 8,
          paddingBottom: Math.max(insets.bottom, 12) + 108,
          paddingHorizontal: 16,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.KnowledgeHeader}>
          <View>
            <Text style={styles.KnowledgeKicker}>Swipe to sort what you know</Text>
            <Text style={styles.KnowledgeTitle}>Knowledge</Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate('KnowledgeCard', {})}
            style={styles.KnowledgeAdd}>
            <Text style={styles.KnowledgeAddLabel}>+</Text>
          </Pressable>
        </View>

        <View style={styles.KnowledgeStats}>
          <Stat icon="check" value={String(known.length)} label="Learned" />
          <Stat icon="cap" value={String(toLearn.length)} label="To review" />
          <Stat icon="cycle" value={`${progressPercent}%`} label="Progress" />
          <Stat icon="flame" value={String(streak)} label="Day streak" accent />
        </View>

        <View style={styles.KnowledgeProgressRow}>
          <Text style={styles.KnowledgeProgressLabel}>Knowledge progress</Text>
          <View style={styles.KnowledgeProgressTrack}>
            <LinearGradient
              colors={[colors.progressGradientStart, '#3ddc84']}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}
              style={[
                styles.KnowledgeProgressFill,
                {width: `${Math.max(progressPercent, 2)}%`},
              ]}
            />
          </View>
          <Text style={styles.KnowledgeProgressValue}>{progressPercent}%</Text>
        </View>

        <View style={styles.KnowledgeTabs}>
          {TABS.map(item => {
            const count =
              item.id === 'known'
                ? known.length
                : item.id === 'learn'
                  ? toLearn.length
                  : null;
            const active = tab === item.id;
            const label = count === null ? item.label : `${item.label} ${count}`;
            return (
              <Pressable
                key={item.id}
                onPress={() => setTab(item.id)}
                style={[styles.KnowledgeTab, active && styles.KnowledgeTabActive]}>
                <Text
                  style={[
                    styles.KnowledgeTabLabel,
                    active && styles.KnowledgeTabLabelActive,
                  ]}>
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {tab === 'deck' ? (
          <DeckPane
            front={front}
            behind={deck[1]}
            dragX={dragX}
            panHandlers={pan.panHandlers}
          />
        ) : null}

        {tab === 'known' ? (
          known.length === 0 ? (
            <EmptyState
              tint="#3ddc84"
              icon="check"
              title="No known cards yet"
              body="Swipe right on the cards you already understand — they’ll collect here."
            />
          ) : (
            known.map(card => (
              <ListCard key={card.id} card={card} badge="Known" />
            ))
          )
        ) : null}

        {tab === 'learn' ? (
          toLearn.length === 0 ? (
            <EmptyState
              tint={colors.orange}
              icon="cap"
              title="Nothing to review"
              body="Cards you swipe left land here so you can study them again later."
            />
          ) : (
            toLearn.map(card => (
              <ListCard key={card.id} card={card} badge="To learn" />
            ))
          )
        ) : null}

        {tab === 'mine' ? (
          <View>
            <Pressable
              onPress={() => navigation.navigate('KnowledgeCard', {})}
              style={styles.KnowledgeCreate}>
              <Text style={styles.KnowledgeCreateLabel}>+ Create knowledge card</Text>
            </Pressable>
            {customCards.length === 0 ? (
              <EmptyState
                tint={colors.orange}
                icon="card"
                title="No custom cards yet"
                body="Create cards for parts on your own car — they join the swipe deck automatically."
              />
            ) : (
              customCards.map(card => (
                <View key={card.id} style={styles.KnowledgeMineRow}>
                  <CardIcon card={card} />
                  <View style={styles.KnowledgeMineText}>
                    <Text style={styles.KnowledgeMineTitle}>{card.title}</Text>
                    <Text style={styles.KnowledgeMineMeta}>
                      {known.some(item => item.id === card.id)
                        ? 'Known'
                        : toLearn.some(item => item.id === card.id)
                          ? 'To learn'
                          : 'In deck'}{' '}
                      · {card.category}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() =>
                      navigation.navigate('KnowledgeCard', {cardId: card.id})
                    }
                    style={styles.KnowledgeMineAction}>
                    <AppIcon name="edit" color={colors.cream} size={16} />
                  </Pressable>
                  <Pressable
                    onPress={() => confirmDelete(card)}
                    style={styles.KnowledgeMineDelete}>
                    <AppIcon name="delete" color="#ff5a5f" size={16} />
                  </Pressable>
                </View>
              ))
            )}
          </View>
        ) : null}

        {tab === 'deck' && front ? (
          <View style={styles.KnowledgeActions}>
            <View style={styles.KnowledgeActionWrap}>
              <Pressable
                onPress={() => setStatus(front.id, 'learn')}
                style={styles.KnowledgeLearnButton}>
                <AppIcon name="school" color={colors.orange} size={26} />
              </Pressable>
              <Text style={styles.KnowledgeActionCaption}>Need to learn</Text>
            </View>
            <Pressable
              onPress={undo}
              disabled={!canUndo}
              style={[styles.KnowledgeUndo, !canUndo && styles.KnowledgeUndoOff]}>
              <AppIcon name="redo" color={colors.cream} size={20} />
            </Pressable>
            <View style={styles.KnowledgeActionWrap}>
              <Pressable
                onPress={() => setStatus(front.id, 'known')}
                style={styles.KnowledgeKnowButton}>
                <AppIcon name="check" color="#3ddc84" size={28} />
              </Pressable>
              <Text style={styles.KnowledgeActionCaption}>I know this</Text>
            </View>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

function Stat({
  icon,
  value,
  label,
  accent,
}: {
  icon: 'check' | 'cap' | 'cycle' | 'flame';
  value: string;
  label: string;
  accent?: boolean;
}) {
  const iconName =
    icon === 'check'
      ? 'check'
      : icon === 'cap'
        ? 'school'
        : icon === 'cycle'
          ? 'redo'
          : 'bolt';
  const iconColor = accent ? colors.orange : '#8fd18a';
  return (
    <View style={[styles.StatCard, accent && styles.StatCardAccent]}>
      <View style={styles.StatGlyph}>
        <AppIcon name={iconName} color={iconColor} size={16} />
      </View>
      <Text style={styles.StatValue}>{value}</Text>
      <Text style={styles.StatLabel}>{label}</Text>
    </View>
  );
}

function DeckPane({
  front,
  behind,
  dragX,
  panHandlers,
}: {
  front?: KnowledgeCard;
  behind?: KnowledgeCard;
  dragX: number;
  panHandlers: object;
}) {
  if (!front) {
    return (
      <EmptyState
        tint="#3ddc84"
        icon="check"
        title="Deck complete"
        body="Every card is sorted. Undo a choice or add a custom card to keep going."
      />
    );
  }
  const tint = CATEGORY_TINT[front.category];
  return (
    <View style={styles.DeckStack}>
      {behind ? <View style={styles.DeckBack} /> : null}
      <View
        {...panHandlers}
        style={[
          styles.DeckCard,
          {transform: [{translateX: dragX}, {rotate: `${dragX / 28}deg`}]},
        ]}>
        <LinearGradient
          colors={['#1a140c', '#12161f']}
          style={styles.DeckHero}>
          <View style={[styles.DeckTag, {borderColor: `${tint}55`}]}>
            <Text style={[styles.DeckTagLabel, {color: tint}]}>
              {front.category}
            </Text>
          </View>
          <View style={[styles.DeckIconRing, {borderColor: `${tint}66`}]}>
            <View style={[styles.DeckIconDash, {borderColor: `${tint}88`}]}>
              <KnowledgeGlyph name={front.icon} color={tint} size={64} />
            </View>
          </View>
        </LinearGradient>
        <View style={styles.DeckBody}>
          <Text style={styles.DeckTitle}>{front.title}</Text>
          <Text style={styles.DeckPrompt}>What is it?</Text>
          <Text style={styles.DeckCopy}>{front.what}</Text>
          <Text style={styles.DeckPrompt}>What does it do?</Text>
          <Text style={styles.DeckCopy}>{front.does}</Text>
        </View>
      </View>
    </View>
  );
}

function ListCard({card, badge}: {card: KnowledgeCard; badge: string}) {
  const known = badge === 'Known';
  return (
    <View style={styles.ListCard}>
      <CardIcon card={card} />
      <View style={styles.ListCardText}>
        <Text style={styles.ListCardTitle}>{card.title}</Text>
        <Text style={styles.ListCardBody} numberOfLines={2}>
          {card.what}
        </Text>
      </View>
      <View style={[styles.ListBadge, known && styles.ListBadgeKnown]}>
        <Text style={[styles.ListBadgeLabel, known && styles.ListBadgeLabelKnown]}>
          {badge}
        </Text>
      </View>
    </View>
  );
}

function CardIcon({card}: {card: KnowledgeCard}) {
  const tint = CATEGORY_TINT[card.category];
  return (
    <View style={[styles.CardIcon, {backgroundColor: `${tint}22`}]}>
      <KnowledgeGlyph name={card.icon} color={tint} size={22} />
    </View>
  );
}

function EmptyState({
  tint,
  icon,
  title,
  body,
}: {
  tint: string;
  icon: 'check' | 'cap' | 'card';
  title: string;
  body: string;
}) {
  return (
    <View style={styles.EmptyCard}>
      <View style={[styles.EmptyIcon, {backgroundColor: `${tint}18`}]}>
        <AppIcon
          name={icon === 'check' ? 'check' : icon === 'cap' ? 'school' : 'cards'}
          color={tint}
          size={26}
        />
      </View>
      <Text style={styles.EmptyTitle}>{title}</Text>
      <Text style={styles.EmptyBody}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  KnowledgeChassis: {
    backgroundColor: colors.background,
    flex: 1,
  },
  KnowledgeHeader: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  KnowledgeKicker: {
    color: 'rgba(235,238,245,0.55)',
    fontFamily: fonts.sansMedium,
    fontSize: 14,
    marginBottom: 2,
  },

  KnowledgeTitle: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -0.6,
  },
  KnowledgeAdd: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 19,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },

  KnowledgeAddLabel: {
    color: colors.orange,
    fontSize: 26,
    lineHeight: 28,
    marginTop: -2,
  },
  KnowledgeStats: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },

  StatCard: {
    backgroundColor: '#12161f',
    borderColor: 'rgba(255,255,255,0.07)',
    borderRadius: 16,
    borderWidth: 1,
    flex: 1,
    minHeight: 88,
    padding: 10,
  },
  StatCardAccent: {
    borderColor: 'rgba(255,178,63,0.3)',
  },
  StatGlyph: {
    marginBottom: 4,
  },

  StatValue: {
    color: colors.cream,
    fontFamily: fonts.condensedBoldItalic,
    fontSize: 26,
    fontWeight: '700',
  },
  StatLabel: {
    color: 'rgba(235,238,245,0.5)',
    fontFamily: fonts.sansRegular,
    fontSize: 11,
  },

  KnowledgeProgressRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  KnowledgeProgressLabel: {
    color: 'rgba(235,238,245,0.6)',
    fontFamily: fonts.sansRegular,
    fontSize: 12,
  },
  KnowledgeProgressTrack: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 3,
    flex: 1,
    height: 6,
    overflow: 'hidden',
  },

  KnowledgeProgressFill: {
    borderRadius: 3,
    height: 6,
  },
  KnowledgeProgressValue: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 12,
    fontWeight: '700',
  },
  KnowledgeTabs: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 13,
    flexDirection: 'row',
    marginBottom: 14,
    padding: 3,
  },

  KnowledgeTab: {
    alignItems: 'center',
    borderRadius: 10,
    flex: 1,
    paddingVertical: 8,
  },
  KnowledgeTabActive: {
    backgroundColor: '#2a3142',
  },

  KnowledgeTabLabel: {
    color: 'rgba(235,238,245,0.55)',
    fontFamily: fonts.sansRegular,
    fontSize: 12,
  },
  KnowledgeTabLabelActive: {
    color: colors.cream,
  },

  DeckStack: {
    minHeight: 430,
    marginBottom: 16,
  },
  DeckBack: {
    backgroundColor: '#12161f',
    borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: 30,
    borderWidth: 1,
    bottom: 18,
    left: 16,
    opacity: 0.6,
    position: 'absolute',
    right: 16,
    top: 22,
  },
  DeckCard: {
    backgroundColor: '#12161f',
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 30,
    borderWidth: 1,
    overflow: 'hidden',
  },

  DeckHero: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  DeckTag: {
    backgroundColor: 'rgba(7,9,15,0.55)',
    borderRadius: 10,
    borderWidth: 1,
    left: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: 'absolute',
    top: 16,
  },
  DeckTagLabel: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },

  DeckIconRing: {
    alignItems: 'center',
    borderRadius: 85,
    borderWidth: 1,
    height: 170,
    justifyContent: 'center',
    width: 170,
  },
  DeckIconDash: {
    alignItems: 'center',
    borderRadius: 61,
    borderStyle: 'dashed',
    borderWidth: 1,
    height: 122,
    justifyContent: 'center',
    width: 122,
  },
  DeckBody: {
    padding: 20,
  },

  DeckTitle: {
    color: colors.cream,
    fontFamily: fonts.condensedBoldItalic,
    fontSize: 32,
    fontStyle: 'italic',
    fontWeight: '700',
    letterSpacing: 0.3,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  DeckPrompt: {
    color: colors.orange,
    fontFamily: fonts.sansBold,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  DeckCopy: {
    color: 'rgba(235,238,245,0.82)',
    fontFamily: fonts.sansRegular,
    fontSize: 15,
    lineHeight: 21,
    marginBottom: 12,
  },

  KnowledgeActions: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  KnowledgeActionWrap: {
    alignItems: 'center',
    width: 92,
  },
  KnowledgeLearnButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,122,47,0.12)',
    borderColor: 'rgba(255,122,47,0.5)',
    borderRadius: 32,
    borderWidth: 1.5,
    height: 64,
    justifyContent: 'center',
    width: 64,
  },

  KnowledgeKnowButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(61,220,132,0.12)',
    borderColor: 'rgba(61,220,132,0.5)',
    borderRadius: 32,
    borderWidth: 1.5,
    height: 64,
    justifyContent: 'center',
    width: 64,
  },
  KnowledgeUndo: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 23,
    height: 46,
    justifyContent: 'center',
    marginTop: 9,
    width: 46,
  },

  KnowledgeUndoOff: {
    opacity: 0.4,
  },
  KnowledgeActionCaption: {
    color: 'rgba(235,238,245,0.6)',
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
  },

  ListCard: {
    alignItems: 'center',
    backgroundColor: '#161b27',
    borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
    padding: 12,
  },
  ListCardText: {
    flex: 1,
  },
  ListCardTitle: {
    color: colors.cream,
    fontFamily: fonts.sansSemiBold,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },

  ListCardBody: {
    color: 'rgba(235,238,245,0.55)',
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    lineHeight: 18,
  },
  ListBadge: {
    backgroundColor: 'rgba(255,122,47,0.16)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  ListBadgeKnown: {
    backgroundColor: 'rgba(61,220,132,0.16)',
  },

  ListBadgeLabel: {
    color: colors.orange,
    fontFamily: fonts.sansSemiBold,
    fontSize: 12,
    fontWeight: '600',
  },
  ListBadgeLabelKnown: {
    color: '#3ddc84',
  },
  CardIcon: {
    alignItems: 'center',
    borderRadius: 14,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },

  KnowledgeCreate: {
    alignItems: 'center',
    borderColor: 'rgba(255,178,63,0.7)',
    borderRadius: 16,
    borderStyle: 'dashed',
    borderWidth: 1.5,
    marginBottom: 12,
    paddingVertical: 16,
  },
  KnowledgeCreateLabel: {
    color: colors.orange,
    fontFamily: fonts.sansBold,
    fontSize: 16,
    fontWeight: '700',
  },
  KnowledgeMineRow: {
    alignItems: 'center',
    backgroundColor: '#161b27',
    borderRadius: 18,
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
    padding: 12,
  },

  KnowledgeMineText: {
    flex: 1,
  },
  KnowledgeMineTitle: {
    color: colors.cream,
    fontFamily: fonts.sansSemiBold,
    fontSize: 16,
    fontWeight: '600',
  },
  KnowledgeMineMeta: {
    color: '#5aa7ff',
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    marginTop: 2,
  },

  KnowledgeMineAction: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  KnowledgeMineActionLabel: {
    color: colors.cream,
    fontSize: 16,
  },

  KnowledgeMineDelete: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,90,95,0.12)',
    borderRadius: 12,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  KnowledgeMineDeleteLabel: {
    color: '#ff5a5f',
    fontSize: 16,
  },

  EmptyCard: {
    alignItems: 'center',
    backgroundColor: '#141820',
    borderRadius: 22,
    paddingHorizontal: 24,
    paddingVertical: 36,
  },
  EmptyIcon: {
    alignItems: 'center',
    borderRadius: 16,
    height: 64,
    justifyContent: 'center',
    marginBottom: 16,
    width: 64,
  },

  EmptyTitle: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  EmptyBody: {
    color: 'rgba(235,238,245,0.6)',
    fontFamily: fonts.sansRegular,
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
  },
});
