import React, {useEffect, useMemo, useState} from 'react';
import {
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppIcon} from '../../components/icons/AppIcon';
import {useLearn} from '../../context/LearnContext';
import {colors, fonts} from '../../constants/theme';
import type {LearnStackParamList} from '../../navigation/types';
import type {LearnArticle, LearnCategoryId} from '../../types/learn';

type Props = NativeStackScreenProps<LearnStackParamList, 'LearnHome'>;

export function LearnScreen({navigation}: Props) {
  const insets = useSafeAreaInsets();
  const {
    categories,
    bookmarks,
    lastReadId,
    stats,
    filterArticles,
    getArticle,
    getCategory,
    isBookmarked,
    toggleBookmark,
  } = useLearn();

  const [query, setQuery] = useState('');
  const [categoryId, setCategoryId] = useState<LearnCategoryId | 'all'>('all');
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const searching = query.trim().length > 0 || categoryId !== 'all' || bookmarkedOnly;

  const filtered = useMemo(
    () => filterArticles({query, categoryId, bookmarkedOnly}),
    [filterArticles, query, categoryId, bookmarkedOnly],
  );

  const lastRead = lastReadId ? getArticle(lastReadId) : undefined;

  const shareArticle = async (article: LearnArticle) => {
    await Share.share({
      message: `${article.title}\n\n${article.summary}\n\nKey takeaway: ${article.keyTakeaway}`,
    });
  };

  return (
    <View style={styles.LearnChassis}>
      <ScrollView
        contentContainerStyle={[
          styles.LearnScroll,
          {
            paddingTop: insets.top + 12,
            paddingBottom: Math.max(insets.bottom, 16) + 100,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Text style={styles.LearnEyebrow}>
          {stats.topics} topics · {stats.minutes} min of reading
        </Text>
        <View style={styles.LearnHeaderRow}>
          <Text style={styles.LearnTitle}>Learn</Text>
          <Pressable
            onPress={() => {
              setBookmarkedOnly(current => !current);
              setCategoryId('all');
            }}
            style={[
              styles.LearnBookmarkBadge,
              bookmarkedOnly && styles.LearnBookmarkBadgeActive,
            ]}>
            <AppIcon
              name="bookmark"
              color={bookmarkedOnly ? colors.orange : colors.cream}
              size={16}
            />
            <Text style={styles.LearnBookmarkCount}>{bookmarks.length}</Text>
          </Pressable>
        </View>

        <View style={styles.LearnSearch}>
          <AppIcon name="search" color={colors.label} size={18} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search brakes, batteries, DPF..."
            placeholderTextColor="rgba(235,238,245,0.45)"
            style={styles.LearnSearchInput}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
          />
          {query.length > 0 ? (
            <Pressable onPress={() => setQuery('')} hitSlop={8}>
              <AppIcon name="close" color={colors.label} size={16} />
            </Pressable>
          ) : null}
        </View>

        {searching ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.LearnChips}
            style={styles.LearnChipsScroll}>
            <Pressable
              onPress={() => setCategoryId('all')}
              style={[
                styles.LearnChip,
                categoryId === 'all' && styles.LearnChipActive,
              ]}>
              <AppIcon
                name="grid"
                color={
                  categoryId === 'all' ? colors.orange : 'rgba(235,238,245,0.72)'
                }
                size={14}
              />
              <Text
                style={[
                  styles.LearnChipLabel,
                  categoryId === 'all' && styles.LearnChipLabelActive,
                ]}>
                All
              </Text>
            </Pressable>
            {categories.map(category => {
              const active = categoryId === category.id;
              return (
                <Pressable
                  key={category.id}
                  onPress={() => setCategoryId(category.id)}
                  style={[styles.LearnChip, active && styles.LearnChipActive]}>
                  <AppIcon
                    name={category.icon}
                    color={active ? colors.orange : 'rgba(235,238,245,0.72)'}
                    size={14}
                  />
                  <Text
                    style={[
                      styles.LearnChipLabel,
                      active && styles.LearnChipLabelActive,
                    ]}>
                    {category.title}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        ) : (
          <>
            {lastRead ? (
              <Pressable
                onPress={() =>
                  navigation.navigate('ArticleDetail', {articleId: lastRead.id})
                }
                style={styles.LearnContinue}>
                <AppIcon name="chevronRight" color="#5b9dff" size={14} />
                <Text style={styles.LearnContinueLabel}>CONTINUE READING</Text>
              </Pressable>
            ) : null}

            <View style={styles.LearnGrid}>
              {categories.map(category => (
                <Pressable
                  key={category.id}
                  onPress={() => {
                    setCategoryId(category.id);
                    setBookmarkedOnly(false);
                  }}
                  style={styles.LearnCategoryCard}>
                  <View
                    style={[
                      styles.LearnCategoryIcon,
                      {backgroundColor: `${category.color}22`},
                    ]}>
                    <AppIcon
                      name={category.icon}
                      color={category.color}
                      size={18}
                    />
                  </View>
                  <Text style={styles.LearnCategoryTitle}>{category.title}</Text>
                </Pressable>
              ))}
            </View>
          </>
        )}

        <Text style={styles.LearnSectionLabel}>
          {filtered.length} ARTICLES
        </Text>

        {filtered.length === 0 ? (
          <View style={styles.LearnEmpty}>
            <View style={styles.LearnEmptyIcon}>
              <AppIcon name="search" color="#8b7cff" size={32} />
            </View>
            <Text style={styles.LearnEmptyTitle}>No articles found</Text>
            <Text style={styles.LearnEmptyBody}>
              Try a broader term like “brakes”, “battery” or “tires”.
            </Text>
            <Pressable
              onPress={() => {
                setQuery('');
                setCategoryId('all');
                setBookmarkedOnly(false);
              }}
              style={styles.LearnEmptyButton}>
              <Text style={styles.LearnEmptyButtonLabel}>Clear search</Text>
            </Pressable>
          </View>
        ) : (
          filtered.map(article => {
            const category = getCategory(article.categoryId);
            const bookmarked = isBookmarked(article.id);
            return (
              <Pressable
                key={article.id}
                onPress={() =>
                  navigation.navigate('ArticleDetail', {articleId: article.id})
                }
                style={styles.LearnArticleCard}>
                <View style={styles.LearnArticleMeta}>
                  <View style={styles.LearnArticleTagRow}>
                    {category ? (
                      <AppIcon
                        name={category.icon}
                        color={category.color}
                        size={12}
                      />
                    ) : null}
                    <Text
                      style={[
                        styles.LearnArticleTag,
                        {color: category?.color},
                      ]}>
                      {category?.title.toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.LearnLevelPill}>
                    <Text style={styles.LearnLevelLabel}>{article.level}</Text>
                  </View>
                </View>
                <Text style={styles.LearnArticleTitle}>{article.title}</Text>
                <Text style={styles.LearnArticleSummary} numberOfLines={3}>
                  {article.summary}
                </Text>
                <View style={styles.LearnArticleActions}>
                  <Pressable
                    onPress={() => toggleBookmark(article.id)}
                    style={[
                      styles.LearnActionButton,
                      bookmarked && styles.LearnActionButtonActive,
                    ]}>
                    <AppIcon
                      name="bookmark"
                      color={
                        bookmarked ? colors.orange : 'rgba(235,238,245,0.55)'
                      }
                      size={16}
                    />
                  </Pressable>
                  <Pressable
                    onPress={() => shareArticle(article)}
                    style={styles.LearnActionButton}>
                    <AppIcon name="share" color={colors.cream} size={16} />
                  </Pressable>
                </View>
              </Pressable>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

type DetailProps = NativeStackScreenProps<
  LearnStackParamList,
  'ArticleDetail'
>;

export function ArticleDetailScreen({navigation, route}: DetailProps) {
  const insets = useSafeAreaInsets();
  const {articleId} = route.params;
  const {
    getArticle,
    getCategory,
    getNext,
    isBookmarked,
    toggleBookmark,
    markRead,
  } = useLearn();

  const article = getArticle(articleId);
  const category = article ? getCategory(article.categoryId) : undefined;
  const next = article ? getNext(article.id) : undefined;
  const nextCategory = next ? getCategory(next.categoryId) : undefined;
  const bookmarked = article ? isBookmarked(article.id) : false;

  useEffect(() => {
    if (article) {
      markRead(article.id);
    }
  }, [article, markRead]);

  if (!article || !category) {
    return (
      <View style={[styles.LearnChassis, {paddingTop: insets.top + 20}]}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.DetailBackRow}>
          <AppIcon name="back" color={colors.orange} size={20} />
          <Text style={styles.DetailBack}>Learn</Text>
        </Pressable>
        <Text style={styles.LearnEmptyTitle}>Article not found</Text>
      </View>
    );
  }

  const share = async () => {
    await Share.share({
      message: `${article.title}\n\n${article.summary}\n\nKey takeaway: ${article.keyTakeaway}`,
    });
  };

  return (
    <View style={styles.LearnChassis}>
      <View
        style={[
          styles.DetailHeader,
          {paddingTop: insets.top + 8},
        ]}>
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={8}
          style={styles.DetailBackRow}>
          <AppIcon name="back" color={colors.orange} size={20} />
          <Text style={styles.DetailBack}>Learn</Text>
        </Pressable>
        <View style={styles.DetailHeaderActions}>
          <Pressable
            onPress={() => toggleBookmark(article.id)}
            style={styles.DetailHeaderButton}>
            <AppIcon
              name="bookmark"
              color={bookmarked ? colors.orange : 'rgba(235,238,245,0.55)'}
              size={16}
            />
          </Pressable>
          <Pressable onPress={share} style={styles.DetailHeaderButton}>
            <AppIcon name="share" color={colors.cream} size={16} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.DetailScroll,
          {paddingBottom: Math.max(insets.bottom, 24) + 24},
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.LearnArticleTagRow}>
          <AppIcon name={category.icon} color={category.color} size={12} />
          <Text style={[styles.LearnArticleTag, {color: category.color}]}>
            {category.title.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.DetailTitle}>{article.title}</Text>
        <Text style={styles.DetailLevel}>{article.level}</Text>
        <Text style={styles.DetailIntro}>{article.summary}</Text>

        {article.paragraphs.map((paragraph, index) => (
          <View key={`${article.id}-${index}`} style={styles.DetailSection}>
            <Text style={styles.DetailSectionNumber}>
              {String(index + 1).padStart(2, '0')}
            </Text>
            <Text style={styles.DetailSectionBody}>{paragraph}</Text>
          </View>
        ))}

        <View style={styles.DetailTakeaway}>
          <Text style={styles.DetailTakeawayLabel}>KEY TAKEAWAY</Text>
          <Text style={styles.DetailTakeawayBody}>{article.keyTakeaway}</Text>
        </View>

        <Pressable onPress={share} style={styles.DetailShareButton}>
          <AppIcon name="share" color={colors.cream} size={16} />
          <Text style={styles.DetailShareLabel}>Share article</Text>
        </Pressable>

        {next && nextCategory ? (
          <Pressable
            onPress={() =>
              navigation.replace('ArticleDetail', {articleId: next.id})
            }
            style={styles.DetailUpNext}>
            <Text style={[styles.DetailUpNextLabel, {color: nextCategory.color}]}>
              UP NEXT · {nextCategory.title.toUpperCase()}
            </Text>
            <View style={styles.DetailUpNextRow}>
              <Text style={styles.DetailUpNextTitle}>{next.title}</Text>
              <AppIcon name="chevronRight" color={colors.cream} size={22} />
            </View>
          </Pressable>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  LearnChassis: {
    flex: 1,
    backgroundColor: colors.background,
  },
  LearnScroll: {
    paddingHorizontal: 16,
  },
  LearnEyebrow: {
    fontFamily: fonts.sansMedium,
    fontSize: 14,
    color: colors.label,
  },

  LearnHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 16,
  },
  LearnTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 34,
    letterSpacing: -0.6,
    color: colors.cream,
  },
  LearnBookmarkBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 34,
    paddingHorizontal: 12,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  LearnBookmarkBadgeActive: {
    backgroundColor: 'rgba(255,178,63,0.2)',
  },
  LearnBookmarkCount: {
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    color: colors.cream,
  },
  LearnSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderRadius: 14,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    gap: 8,
  },

  LearnSearchInput: {
    flex: 1,
    fontFamily: fonts.sansRegular,
    fontSize: 16,
    color: colors.cream,
    paddingVertical: 0,
  },
  LearnContinue: {
    marginTop: 14,
    height: 46,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(91,157,255,0.55)',
    backgroundColor: 'rgba(91,157,255,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  LearnContinueLabel: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    letterSpacing: 0.8,
    color: '#5b9dff',
  },

  LearnGrid: {
    marginTop: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  LearnCategoryCard: {
    width: '31.5%',
    minHeight: 104,
    borderRadius: 18,
    padding: 12,
    backgroundColor: 'rgba(18,22,32,0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'space-between',
  },
  LearnCategoryIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  LearnCategoryTitle: {
    fontFamily: fonts.sansMedium,
    fontSize: 13,
    lineHeight: 16,
    color: colors.cream,
  },
  LearnChipsScroll: {
    marginTop: 14,
    marginHorizontal: -16,
  },
  LearnChips: {
    gap: 8,
    paddingLeft: 16,
    paddingRight: 0,
  },

  LearnChip: {
    height: 34,
    paddingHorizontal: 12,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  LearnChipActive: {
    backgroundColor: 'rgba(255,178,63,0.15)',
    borderColor: 'rgba(255,178,63,0.5)',
  },
  LearnChipLabel: {
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    color: 'rgba(235,238,245,0.72)',
  },

  LearnChipLabelActive: {
    color: colors.orange,
  },
  LearnSectionLabel: {
    marginTop: 18,
    marginBottom: 10,
    marginLeft: 4,
    fontFamily: fonts.sansBold,
    fontSize: 13,
    letterSpacing: 1,
    color: 'rgba(235,238,245,0.5)',
  },
  LearnArticleCard: {
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
    backgroundColor: 'rgba(18,22,32,0.92)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  LearnArticleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  LearnArticleTagRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexShrink: 1,
    gap: 6,
  },
  LearnArticleTag: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    letterSpacing: 0.6,
  },

  LearnLevelPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  LearnLevelLabel: {
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    color: colors.label,
  },
  LearnArticleTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 20,
    lineHeight: 26,
    color: colors.cream,
    marginBottom: 8,
  },

  LearnArticleSummary: {
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.body,
    marginBottom: 14,
  },
  LearnArticleActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  LearnActionButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  LearnActionButtonActive: {
    backgroundColor: 'rgba(255,178,63,0.18)',
  },
  LearnEmpty: {
    borderRadius: 26,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(18,22,32,0.85)',
  },
  LearnEmptyIcon: {
    width: 76,
    height: 76,
    borderRadius: 24,
    backgroundColor: 'rgba(139,124,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  LearnEmptyTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 19,
    color: colors.cream,
    marginBottom: 8,
  },
  LearnEmptyBody: {
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 21,
    color: colors.bodyMuted,
    textAlign: 'center',
    marginBottom: 18,
  },

  LearnEmptyButton: {
    height: 42,
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: 'rgba(139,124,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  LearnEmptyButtonLabel: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: '#8b7cff',
  },

  DetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  DetailBackRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
  },
  DetailBack: {
    fontFamily: fonts.sansMedium,
    fontSize: 17,
    color: colors.orange,
  },

  DetailHeaderActions: {
    flexDirection: 'row',
    gap: 8,
  },
  DetailHeaderButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  DetailScroll: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },

  DetailTitle: {
    marginTop: 10,
    fontFamily: fonts.sansBold,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.4,
    color: colors.cream,
  },
  DetailLevel: {
    marginTop: 10,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    color: colors.label,
  },
  DetailIntro: {
    marginTop: 16,
    marginBottom: 8,
    fontFamily: fonts.sansMedium,
    fontSize: 16,
    lineHeight: 24,
    color: colors.body,
  },

  DetailSection: {
    marginTop: 22,
  },
  DetailSectionNumber: {
    fontFamily: fonts.sansBold,
    fontSize: 28,
    fontStyle: 'italic',
    color: colors.orange,
    marginBottom: 8,
  },
  DetailSectionBody: {
    fontFamily: fonts.sansRegular,
    fontSize: 16,
    lineHeight: 24,
    color: colors.body,
  },

  DetailTakeaway: {
    marginTop: 28,
    borderRadius: 20,
    padding: 16,
    backgroundColor: 'rgba(255,178,63,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,178,63,0.35)',
  },
  DetailTakeawayLabel: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    letterSpacing: 1,
    color: colors.orange,
    marginBottom: 10,
  },
  DetailTakeawayBody: {
    fontFamily: fonts.sansMedium,
    fontSize: 16,
    lineHeight: 24,
    color: '#f3e6c8',
  },

  DetailShareButton: {
    marginTop: 16,
    height: 52,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  DetailShareLabel: {
    fontFamily: fonts.sansBold,
    fontSize: 16,
    color: colors.cream,
  },
  DetailUpNext: {
    marginTop: 14,
    borderRadius: 20,
    padding: 16,
    backgroundColor: 'rgba(18,22,32,0.95)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  DetailUpNextLabel: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  DetailUpNextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  DetailUpNextTitle: {
    flex: 1,
    fontFamily: fonts.sansBold,
    fontSize: 17,
    lineHeight: 22,
    color: colors.cream,
  },
});
