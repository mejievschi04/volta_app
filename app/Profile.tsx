import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DiscountCard from './components/DiscountCard';

const ICON_COLOR = '#FFEE00';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const PURCHASE_HISTORY = [
  { date: '30 octombrie 2025', amount: 1240 },
  { date: '21 octombrie 2025', amount: 830 },
  { date: '10 octombrie 2025', amount: 562 },
];

export default function Profile() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const ActionButton = ({
    icon,
    label,
    onPress,
  }: {
    icon: string;
    label: string;
    onPress: () => void;
  }) => (
    <Pressable
      style={styles.actionButton}
      onPress={onPress}
      android_ripple={{ color: 'rgba(255,255,255,0.1)' }}
    >
      <MaterialCommunityIcons name={icon as any} size={24} color="#FFF" />
      <Text style={styles.actionLabel}>{label}</Text>
    </Pressable>
  );

  // Calculăm punctele totale
  const totalPoints = PURCHASE_HISTORY.reduce(
    (sum, item) => sum + Math.floor(item.amount * 0.05),
    0
  );

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={{ paddingBottom: 50 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Secțiune utilizator */}
      <View style={styles.userSection}>
        <View style={styles.avatarWrap}>
          <View style={[styles.avatar, styles.avatarFallback]}>
            <Text style={styles.avatarInitial}>I</Text>
          </View>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Mejievschi Ion</Text>
          <Text style={styles.userPhone}>078 123 456</Text>
        </View>
      </View>

      {/* Butoane acțiune */}
      <View style={styles.actionsSection}>
        <ActionButton
          icon="bell"
          label="Notificări"
          onPress={() => router.push('/Notifications')}
        />
        <ActionButton
          icon="cog"
          label="Setări"
          onPress={() => router.push('/Settings')}
        />
      </View>

      {/* Card reducere */}
      <View style={{ marginHorizontal: 10, marginBottom: 16 }}>
        <DiscountCard
          name="MEJIEVSCHI ION"
          discountValue={10} // reducere
          cardCode="VOLTA-4587"
          barcodeValue="458712345678"
        />
      </View>

      {/* Puncte totale */}
      <View style={styles.pointsSection}>
        <Text style={styles.pointsTitle}>Puncte totale: {totalPoints}</Text>
        <Text style={styles.pointsInfo}>
          Poți folosi aceste puncte pentru a obține reduceri suplimentare sau
          beneficii la următoarele cumpărături.
        </Text>
      </View>

      {/* Istoric cumpărături */}
      <View style={styles.historySection}>
        <Text style={styles.historyTitle}>Istoric cumpărături</Text>

        {PURCHASE_HISTORY.map((item, index) => {
          const saved = item.amount * 0.1; // Economisit 10%
          const points = Math.floor(item.amount * 0.05); // Puncte 5%
          return (
            <View key={index} style={styles.historyItem}>
              <View style={styles.historyLeft}>
                <Text style={styles.historyDate}>{item.date}</Text>
              </View>
              <View style={styles.historyRight}>
                <Text style={styles.historyAmount}>{item.amount} lei</Text>
                <Text style={styles.historySaved}>
                  Economisit: {saved.toFixed(2)} lei
                </Text>
                <Text style={styles.historyPoints}>Puncte: {points}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  avatarWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: ICON_COLOR,
    overflow: 'hidden',
    marginRight: 16,
  },
  avatar: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarFallback: {
    backgroundColor: '#000',
  },
  avatarInitial: {
    color: ICON_COLOR,
    fontSize: 32,
    fontWeight: '600',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 16,
    color: '#CCC',
  },
  actionsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    width: '48%',
    borderWidth: 1,
    borderColor: '#222',
  },
  actionLabel: {
    color: '#FFF',
    marginLeft: 12,
    fontSize: 16,
  },
  pointsSection: {
    backgroundColor: '#111',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#222',
    marginBottom: 24,
  },
  pointsTitle: {
    color: ICON_COLOR,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  pointsInfo: {
    color: '#CCC',
    fontSize: 14,
  },
  historySection: {
    backgroundColor: '#111',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#222',
    marginBottom: 24,
  },
  historyTitle: {
    color: ICON_COLOR,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  historyLeft: {
    width: SCREEN_WIDTH * 0.5,
  },
  historyRight: {
    width: SCREEN_WIDTH * 0.55,
    alignItems: 'flex-end',
  },
  historyDate: {
    color: '#EEE',
    fontSize: 14,
  },
  historyAmount: {
    color: '#FFEE00',
    fontWeight: '700',
    fontSize: 16,
  },
  historySaved: {
    color: '#CCC',
    fontSize: 12,
  },
  historyPoints: {
    color: '#00FF88',
    fontSize: 12,
  },
});
