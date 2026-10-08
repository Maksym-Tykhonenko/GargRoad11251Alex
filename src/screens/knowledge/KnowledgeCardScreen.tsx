import React, {useMemo, useState} from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
import {
  KNOWLEDGE_CATEGORIES,
  KNOWLEDGE_ICONS,
  type KnowledgeCategory,
  type KnowledgeIcon,
} from '../../types/knowledge';

type Props = NativeStackScreenProps<KnowledgeStackParamList, 'KnowledgeCard'>;

export function KnowledgeCardScreen({navigation, route}: Props) {
  const insets = useSafeAreaInsets();
  const {getCard, saveCard, deleteCard} = useKnowledge();
  const existing = route.params.cardId
    ? getCard(route.params.cardId)
    : undefined;
  const editing = Boolean(existing?.custom);

  const [title, setTitle] = useState(existing?.title ?? '');
  const [category, setCategory] = useState<KnowledgeCategory>(
    existing?.category ?? 'Engine',
  );
  const [icon, setIcon] = useState<KnowledgeIcon>(existing?.icon ?? 'gear');
  const [what, setWhat] = useState(existing?.what ?? '');
  const [does, setDoes] = useState(existing?.does ?? '');

  const preview = title.trim() || 'Your component';
  const tint = CATEGORY_TINT[category];
  const canSave = title.trim() && what.trim() && does.trim();

  const headerTitle = useMemo(
    () => (editing ? 'Edit card' : 'New card'),
    [editing],
  );

  const onSave = () => {
    if (!canSave) {
      return;
    }
    saveCard(
      {title, category, icon, what, does},
      editing ? existing?.id : undefined,
    );
    navigation.goBack();
  };

  const onDelete = () => {
    if (!existing) {
      return;
    }
    Alert.alert(
      `Delete “${existing.title}”?`,
      'This custom card will be removed from all lists.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete card',
          style: 'destructive',
          onPress: () => {
            deleteCard(existing.id);
            navigation.goBack();
          },
        },
      ],
    );
  };

  return (
    <View style={styles.CardScreenChassis}>
      <View style={[styles.CardScreenHeader, {paddingTop: insets.top + 8}]}>
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={10}
          style={styles.CardScreenBackRow}>
          <AppIcon name="back" color={colors.orange} size={20} />
          <Text style={styles.CardScreenBack}>Knowledge</Text>
        </Pressable>
        <Text style={styles.CardScreenTitle}>{headerTitle}</Text>
        <Pressable onPress={onSave} hitSlop={10} disabled={!canSave}>
          <Text style={[styles.CardScreenSave, !canSave && styles.CardScreenSaveOff]}>
            Save
          </Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: Math.max(insets.bottom, 16) + 24,
          paddingHorizontal: 16,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#24180c', '#12161f']}
          style={styles.CardScreenPreview}>
          <KnowledgeGlyph name={icon} color={tint} size={42} />
          <Text style={styles.CardScreenPreviewTitle}>{preview}</Text>
        </LinearGradient>

        <Text style={styles.CardScreenLabel}>Component or concept</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="e.g. Glow Plugs"
          placeholderTextColor="rgba(235,238,245,0.35)"
          style={styles.CardScreenInput}
        />

        <Text style={styles.CardScreenLabel}>Category</Text>
        <View style={styles.CardScreenChips}>
          {KNOWLEDGE_CATEGORIES.map(item => {
            const active = item === category;
            return (
              <Pressable
                key={item}
                onPress={() => setCategory(item)}
                style={[styles.CardScreenChip, active && styles.CardScreenChipActive]}>
                <Text
                  style={[
                    styles.CardScreenChipLabel,
                    active && styles.CardScreenChipLabelActive,
                  ]}>
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.CardScreenLabel}>Icon</Text>
        <View style={styles.CardScreenIcons}>
          {KNOWLEDGE_ICONS.map(item => {
            const active = item === icon;
            return (
              <Pressable
                key={item}
                onPress={() => setIcon(item)}
                style={[styles.CardScreenIcon, active && styles.CardScreenIconActive]}>
                <KnowledgeGlyph
                  name={item}
                  color={active ? colors.orange : 'rgba(235,238,245,0.7)'}
                  size={22}
                />
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.CardScreenLabel}>What is it?</Text>
        <TextInput
          value={what}
          onChangeText={setWhat}
          placeholder="Describe the component in one or two sentences"
          placeholderTextColor="rgba(235,238,245,0.35)"
          multiline
          style={[styles.CardScreenInput, styles.CardScreenArea]}
        />

        <Text style={styles.CardScreenLabel}>What does it do?</Text>
        <TextInput
          value={does}
          onChangeText={setDoes}
          placeholder="Explain its job in plain language"
          placeholderTextColor="rgba(235,238,245,0.35)"
          multiline
          style={[styles.CardScreenInput, styles.CardScreenArea]}
        />

        <Pressable onPress={onSave} disabled={!canSave}>
          <LinearGradient
            colors={[colors.buttonGradientStart, colors.buttonGradientEnd]}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={[
              styles.CardScreenButton,
              !canSave && styles.CardScreenButtonOff,
            ]}>
            <View style={styles.CardScreenButtonInner}>
              <Text style={styles.CardScreenButtonLabel}>Save card</Text>
            </View>
          </LinearGradient>
        </Pressable>

        {editing ? (
          <Pressable onPress={onDelete} style={styles.CardScreenDelete}>
            <Text style={styles.CardScreenDeleteLabel}>Delete card</Text>
          </Pressable>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  CardScreenChassis: {
    backgroundColor: colors.background,
    flex: 1,
  },
  CardScreenHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 12,
    paddingHorizontal: 16,
  },

  CardScreenBackRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
    width: 110,
  },
  CardScreenBack: {
    color: colors.orange,
    fontFamily: fonts.sansRegular,
    fontSize: 16,
  },
  CardScreenTitle: {
    color: colors.cream,
    fontFamily: fonts.sansSemiBold,
    fontSize: 17,
    fontWeight: '600',
  },

  CardScreenSave: {
    color: colors.orange,
    fontFamily: fonts.sansBold,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'right',
    width: 110,
  },
  CardScreenSaveOff: {
    opacity: 0.35,
  },

  CardScreenPreview: {
    alignItems: 'center',
    borderRadius: 22,
    height: 150,
    justifyContent: 'center',
    marginBottom: 18,
  },
  CardScreenPreviewTitle: {
    color: colors.cream,
    fontFamily: fonts.condensedBoldItalic,
    fontSize: 26,
    fontStyle: 'italic',
    fontWeight: '700',
    letterSpacing: 0.4,
    marginTop: 10,
    textTransform: 'uppercase',
  },

  CardScreenLabel: {
    color: 'rgba(235,238,245,0.55)',
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    marginBottom: 8,
  },
  CardScreenInput: {
    backgroundColor: '#161b27',
    borderRadius: 14,
    color: colors.cream,
    fontFamily: fonts.sansRegular,
    fontSize: 16,
    marginBottom: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },

  CardScreenArea: {
    minHeight: 88,
    textAlignVertical: 'top',
  },
  CardScreenChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },

  CardScreenChip: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  CardScreenChipActive: {
    backgroundColor: 'rgba(255,178,63,0.16)',
    borderColor: 'rgba(255,178,63,0.7)',
    borderWidth: 1,
  },

  CardScreenChipLabel: {
    color: 'rgba(235,238,245,0.75)',
    fontFamily: fonts.sansRegular,
    fontSize: 14,
  },
  CardScreenChipLabelActive: {
    color: colors.orange,
  },
  CardScreenIcons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },

  CardScreenIcon: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  CardScreenIconActive: {
    backgroundColor: 'rgba(255,178,63,0.16)',
    borderColor: colors.orange,
    borderWidth: 1.5,
  },

  CardScreenButton: {
    borderRadius: 28,
    marginTop: 4,
    overflow: 'hidden',
  },
  CardScreenButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
    paddingVertical: 16,
  },

  CardScreenButtonOff: {
    opacity: 0.45,
  },
  CardScreenButtonLabel: {
    color: colors.buttonText,
    fontFamily: fonts.sansBold,
    fontSize: 17,
    fontWeight: '700',
  },

  CardScreenDelete: {
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 12,
  },
  CardScreenDeleteLabel: {
    color: '#ff5a5f',
    fontFamily: fonts.sansBold,
    fontSize: 16,
    fontWeight: '700',
  },
});
