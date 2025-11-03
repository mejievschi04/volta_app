import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const ICON_COLOR = '#FFEE00';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DISCOUNT_CARD_HEIGHT = SCREEN_HEIGHT * 0.25;

export default function Profile() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const ActionButton = ({ icon, label, onPress }: { icon: string; label: string; onPress: () => void }) => (
    <Pressable
      style={styles.actionButton}
      onPress={onPress}
      android_ripple={{ color: 'rgba(255,255,255,0.1)' }}
    >
      <MaterialCommunityIcons name={icon as any} size={24} color="#FFF" />
      <Text style={styles.actionLabel}>{label}</Text>
    </Pressable>
  );

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* User Info Section */}
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

      {/* Actions Section */}
      <View style={styles.actionsSection}>
        <ActionButton
          icon="cog"
          label="Setări"
          onPress={() => router.push('/Settings')}
        />
        <ActionButton
          icon="bell"
          label="Notificări"
          onPress={() => router.push('/Notifications')}
        />
      </View>

      {/* Discount Card */}
      <LinearGradient
        colors={['#1a1a1a', '#333300', '#000']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.discountCard, { height: DISCOUNT_CARD_HEIGHT }]}
      >
        <View style={styles.discountContent}>
          <Text style={styles.discountTitle}>Card de reducere</Text>
          <Text style={styles.discountPercentage}>10%</Text>
          <Text style={styles.discountInfo}>Reducere la următoarea cumpărătură</Text>
        </View>
      </LinearGradient>

      {/* Istoric cumpărături */}
      <View style={styles.historySection}>
        <Text style={styles.historyTitle}>Istoric cumpărături</Text>
        <View style={styles.historyItem}>
          <Text style={styles.historyLabel}>30 octombrie 2025</Text>
          <Text style={styles.historyValue}>1.240 lei</Text>
        </View>
        <View style={styles.historyItem}>
          <Text style={styles.historyLabel}>21 octombrie 2025</Text>
          <Text style={styles.historyValue}>830 lei</Text>
        </View>
        <View style={styles.historyItem}>
          <Text style={styles.historyLabel}>10 octombrie 2025</Text>
          <Text style={styles.historyValue}>562 lei</Text>
        </View>
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
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#222',
  },
  actionLabel: {
    color: '#FFF',
    marginLeft: 12,
    fontSize: 16,
  },
  discountCard: {
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFEE00',
    ...Platform.select({
      ios: {
        shadowColor: ICON_COLOR,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  discountContent: {
    alignItems: 'center',
  },
  discountTitle: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 12,
  },
  discountPercentage: {
    fontSize: 48,
    fontWeight: 'bold',
    color: ICON_COLOR,
    marginBottom: 8,
  },
  discountInfo: {
    fontSize: 14,
    color: '#CCC',
  },
  historySection: {
    backgroundColor: '#111',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#222',
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
  historyLabel: {
    color: '#EEE',
  },
  historyValue: {
    color: '#00ff88',
    fontWeight: '600',
  },
});
