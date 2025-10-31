import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, usePathname } from 'expo-router';
// Using @expo/vector-icons for classic icons
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Neon yellow requested
const ICON_COLOR = '#FFEE00';

export default function BottomMenu() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const insetsBottom = Math.max(8, insets.bottom);
  const pathname = usePathname();

  // track hover state for web (Pressable)
  const [hovered, setHovered] = useState<string | null>(null);

  const Item = ({
    id,
    label,
    onPress,
    iconName,
  }: {
    id: string;
    label: string;
    onPress: () => void;
    iconName: string;
  }) => {
    const isHovered = hovered === id;
    // determine route path for this item by id -> route mapping
    const routeForId: Record<string, string> = {
      acasa: '/Home',
      promo: '/Promotii',
      profile: '/Profile',
      blog: '/Blog',
      harta: '/Harta',
    };
    const routePath = routeForId[id];
    const isActive = Boolean(pathname && routePath && pathname.startsWith(routePath));
    return (
      <Pressable
        onPress={onPress}
        onHoverIn={() => Platform.OS === 'web' && setHovered(id)}
        onHoverOut={() => Platform.OS === 'web' && setHovered(null)}
        style={({ pressed }) => [
          styles.item,
          pressed && styles.itemPressed,
          isHovered && styles.itemHover,
        ]}
        android_ripple={{ color: 'rgba(255,255,255,0.06)' }}
      >
        <MaterialCommunityIcons
          name={iconName as any}
          size={20}
          color={isActive ? ICON_COLOR : '#FFFFFF'}
        />
        <Text
          style={[
            styles.label,
            { color: isActive ? ICON_COLOR : '#FFFFFF', backgroundColor: 'transparent' },
          ]}
        >
          {label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container} pointerEvents="box-none">
      <View style={[styles.menu, { marginBottom: insetsBottom }]}> 
        <Item id="acasa" label="Acasă" iconName="home" onPress={() => router.push('/Home')} />
        <Item id="promo" label="Promoții" iconName="tag" onPress={() => router.push('/Promotii')} />
        {/* Profil in the middle */}
        <Item id="profile" label="Profil" iconName="account" onPress={() => router.push('/Profile')} />
        <Item id="blog" label="Blog" iconName="newspaper-variant-outline" onPress={() => router.push('/Blog')} />
        <Item id="harta" label="Hartă" iconName="map" onPress={() => router.push('/Harta')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  menu: {
    flexDirection: 'row',
    // solid black background per request
    backgroundColor: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    width: '96%',
    maxWidth: 1100,
    // neon yellow border + glow
    borderWidth: 1.5,
    borderColor: ICON_COLOR,
    shadowColor: ICON_COLOR,
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginHorizontal: 6,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  itemPressed: {
    transform: [{ scale: 0.99 }],
    // avoid adding a dark/opaque background on press; keep only subtle scale
    backgroundColor: 'transparent',
  },
  itemHover: {
    // very subtle yellow tint on hover (web) but mostly transparent
    backgroundColor: 'rgba(255,238,0,0.03)',
  },
  label: {
    color: ICON_COLOR,
    fontSize: 12,
    marginTop: 6,
    backgroundColor: 'transparent',
    fontWeight: '600',
    // subtle glow for neon effect (works on iOS/web; Android will approximate)
    textShadowColor: ICON_COLOR,
    textShadowRadius: 6,
    textShadowOffset: { width: 0, height: 0 },
  },
  icon: {
    fontSize: 18,
    color: '#FFEE00',
  },
});
