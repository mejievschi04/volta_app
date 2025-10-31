import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ICON_COLOR = '#FFEE00';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DISCOUNT_CARD_HEIGHT = SCREEN_HEIGHT * 0.25; // 25% of screen height

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

  const confirmLogout = () => {
    Alert.alert('Confirmare', 'Sigur vrei să ieși din cont?', [
      { text: 'Anulează', style: 'cancel' },
      { text: 'Ieși', style: 'destructive', onPress: () => router.replace('/Loading') },
    ]);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top-right logout button */}
      <Pressable
        style={[styles.logoutTop, { top: insets.top + 8 }]}
        onPress={confirmLogout}
        android_ripple={{ color: 'rgba(255,255,255,0.08)' }}
      >
        <MaterialCommunityIcons name="logout" size={18} color="#FFF" />
      </Pressable>
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
      <View style={[styles.discountCard, { height: DISCOUNT_CARD_HEIGHT }]}>
        <View style={styles.discountContent}>
          <Text style={styles.discountTitle}>Card de reducere</Text>
          <Text style={styles.discountPercentage}>10%</Text>
          <Text style={styles.discountInfo}>Reducere la următoarea cumpărătură</Text>
        </View>
      </View>

      {/* (Logout moved to top-right) */}
    </View>
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
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  actionLabel: {
    color: '#FFF',
    marginLeft: 12,
    fontSize: 16,
  },
  discountCard: {
    backgroundColor: '#1A2235',
    borderRadius: 16,
    margin: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: ICON_COLOR,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  discountContent: {
    flex: 1,
    justifyContent: 'center',
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
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2B1B1B',
    marginHorizontal: 16,
    marginTop: 'auto',
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  },
  logoutText: {
    color: '#FFF',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  logoutTop: {
    position: 'absolute',
    right: 12,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(43,27,27,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
