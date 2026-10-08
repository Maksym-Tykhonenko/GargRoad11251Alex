import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {colors, fonts} from '../../constants/theme';
import type {Vehicle} from '../../types/vehicle';
import {
  getPreTripProgress,
  getStatusColor,
  getStatusFromPercent,
  getStatusLabel,
  getVehicleProgress,
} from '../../types/vehicle';
import {AppIcon} from '../icons/AppIcon';
import {CircularStat} from '../stats/CircularStat';

type VehicleCardProps = {
  vehicle: Vehicle;
  editing?: boolean;
  onPress: () => void;
  onDeletePress?: () => void;
};

export function VehicleCard({
  vehicle,
  editing = false,
  onPress,
  onDeletePress,
}: VehicleCardProps) {
  const overall = getVehicleProgress(vehicle);
  const preTrip = getPreTripProgress(vehicle);
  const status = getStatusFromPercent(overall.percent);
  const statusColor = getStatusColor(status);

  return (
    <Pressable onPress={onPress} style={styles.VehicleCardChassis}>
      {editing ? (
        <Pressable
          onPress={onDeletePress}
          style={styles.VehicleCardDeleteBadge}
          hitSlop={8}>
          <AppIcon name="remove" color="#fff" size={14} />
        </Pressable>
      ) : null}

      <View style={styles.VehicleCardHeader}>
        <View
          style={[
            styles.VehicleCardIcon,
            {backgroundColor: `${vehicle.accent}22`},
          ]}>
          <AppIcon name="car" color={vehicle.accent} size={22} />
        </View>
        <View style={styles.VehicleCardTitles}>
          <Text style={styles.VehicleCardName}>{vehicle.name}</Text>
          <Text style={styles.VehicleCardModel}>
            {vehicle.year} {vehicle.model}
          </Text>
        </View>
        <CircularStat
          percent={overall.percent}
          size={48}
          width={5}
          tintColor={statusColor}
        />
      </View>

      <View style={styles.VehicleCardTags}>
        <View style={styles.VehicleCardTag}>
          <Text style={styles.VehicleCardTagLabel}>{vehicle.type}</Text>
        </View>
        <View style={styles.VehicleCardTag}>
          <Text style={styles.VehicleCardTagLabel}>{vehicle.fuel}</Text>
        </View>
        <View style={styles.VehicleCardPlate}>
          <Text style={styles.VehicleCardPlateLabel}>{vehicle.plate}</Text>
        </View>
      </View>

      <View style={styles.VehicleCardStats}>
        <View style={styles.VehicleCardStat}>
          <Text style={styles.VehicleCardStatLabel}>Mileage</Text>
          <Text style={styles.VehicleCardStatValue}>
            {vehicle.mileage.toLocaleString('en-US')}
            <Text style={styles.VehicleCardStatUnit}> km</Text>
          </Text>
        </View>
        <View style={styles.VehicleCardStat}>
          <Text style={styles.VehicleCardStatLabel}>Pre-trip</Text>
          <Text style={styles.VehicleCardStatValue}>
            {preTrip.done}/{preTrip.total}
            <Text style={styles.VehicleCardStatUnit}> done</Text>
          </Text>
        </View>
        <View style={[styles.VehicleCardStat, styles.VehicleCardStatWide]}>
          <Text style={styles.VehicleCardStatLabel}>
            {vehicle.lastActivityWhen}
          </Text>
          <Text style={styles.VehicleCardStatActivity}>
            {vehicle.lastActivityLabel}
          </Text>
        </View>
      </View>

      <View style={styles.VehicleCardFooter}>
        <View style={styles.VehicleCardProgressTrack}>
          <View
            style={[
              styles.VehicleCardProgressFill,
              {
                backgroundColor: statusColor,
                width: `${Math.max(4, overall.percent)}%`,
              },
            ]}
          />
        </View>
        <Text style={[styles.VehicleCardStatus, {color: statusColor}]}>
          {getStatusLabel(status)}
        </Text>
        <AppIcon
          name="chevronRight"
          color="rgba(235,238,245,0.55)"
          size={20}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  VehicleCardChassis: {
    backgroundColor: 'rgba(18,22,32,0.92)',
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 26,
    borderWidth: 1,
    marginBottom: 18,
    padding: 16,
  },
  VehicleCardDeleteBadge: {
    alignItems: 'center',
    backgroundColor: '#ff5a5f',
    borderRadius: 12,
    height: 24,
    justifyContent: 'center',
    left: -6,
    position: 'absolute',
    top: -6,
    width: 24,
    zIndex: 2,
  },

  VehicleCardHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 14,
  },
  VehicleCardIcon: {
    alignItems: 'center',
    borderRadius: 17,
    height: 54,
    justifyContent: 'center',
    width: 54,
  },

  VehicleCardTitles: {
    flex: 1,
    marginHorizontal: 12,
  },
  VehicleCardName: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: -0.3,
  },

  VehicleCardModel: {
    color: 'rgba(235,238,245,0.55)',
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    marginTop: 4,
  },
  VehicleCardTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 14,
  },

  VehicleCardTag: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 13,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  VehicleCardTagLabel: {
    color: 'rgba(235,238,245,0.8)',
    fontFamily: fonts.sansRegular,
    fontSize: 12,
  },

  VehicleCardPlate: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  VehicleCardPlateLabel: {
    color: '#10131a',
    fontFamily: fonts.sansBold,
    fontSize: 11.5,
    fontWeight: '700',
    letterSpacing: 1,
  },
  VehicleCardStats: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },

  VehicleCardStat: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 14,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  VehicleCardStatWide: {
    flex: 1.25,
  },
  VehicleCardStatLabel: {
    color: 'rgba(235,238,245,0.5)',
    fontFamily: fonts.sansRegular,
    fontSize: 11,
    marginBottom: 4,
  },

  VehicleCardStatValue: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 15,
    fontWeight: '700',
  },
  VehicleCardStatUnit: {
    color: 'rgba(235,238,245,0.5)',
    fontFamily: fonts.sansMedium,
    fontSize: 11,
    fontWeight: '500',
  },
  VehicleCardStatActivity: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 13.5,
    fontWeight: '700',
  },

  VehicleCardFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },

  VehicleCardProgressTrack: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 3,
    flex: 1,
    height: 6,
    overflow: 'hidden',
  },
  VehicleCardProgressFill: {
    borderRadius: 3,
    height: 6,
  },
  VehicleCardStatus: {
    fontFamily: fonts.sansBold,
    fontSize: 12.5,
    fontWeight: '700',
  },
});
