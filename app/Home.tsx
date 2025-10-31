import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Image,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';


const { width, height } = Dimensions.get('window');
const CONTAINER_PADDING = 20; // matches styles.container padding
const slideWidth = width - CONTAINER_PADDING * 2;
const MAX_SLIDE_HEIGHT = 430;
// Compute base slide height (~55% of screen, capped at MAX_SLIDE_HEIGHT)
const BASE_SLIDE_HEIGHT = Math.min(MAX_SLIDE_HEIGHT, Math.round(height * 0.55));
const SLIDE_HEIGHT = BASE_SLIDE_HEIGHT; // responsive and capped at MAX_SLIDE_HEIGHT


export default function Home() {
  const router = useRouter();
  const userName = 'Ion';
  const initial = userName?.charAt(0)?.toUpperCase() ?? 'I';
  const [avatarLoaded, setAvatarLoaded] = useState(true);

  const now = Date.now();
  const slides = [
    { id: '1', src: require('../assets/images/Group 9.png'), endDate: new Date(now + 3 * 24 * 3600 * 1000) }, // 3 days
    { id: '2', src: require('../assets/images/Group 9.png'), endDate: new Date(now + 1 * 24 * 3600 * 1000 + 2 * 3600 * 1000) }, // 1 day + 2h
    { id: '3', src: require('../assets/images/Group 9.png'), endDate: new Date(now + 6 * 3600 * 1000) }, // 6 hours
  ];

  const scrollRef = useRef<ScrollView | null>(null);
  const [active, setActive] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  // update countdown for active slide every second
  useEffect(() => {
    function calcLeft(endDate: Date) {
      const diff = endDate.getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
      const days = Math.floor(diff / (24 * 3600 * 1000));
      const hours = Math.floor((diff % (24 * 3600 * 1000)) / (3600 * 1000));
      const minutes = Math.floor((diff % (3600 * 1000)) / (60 * 1000));
      return { days, hours, minutes };
    }

    // initialize
    setTimeLeft(calcLeft(slides[active].endDate));
    const timer = setInterval(() => {
      setTimeLeft(calcLeft(slides[active].endDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [active]);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const page = Math.round(e.nativeEvent.contentOffset.x / slideWidth);
    setActive(page);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.avatarWrap} onPress={() => router.push('/Profile')}>
          {avatarLoaded ? (
            <Image
              source={require('../assets/images/Group 9.png')}
              style={styles.avatar}
              onError={() => setAvatarLoaded(false)}
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitial}>{initial}</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.greetingWrap}>
          <Text style={styles.greeting}>Salut, Ion</Text>
          <Text style={styles.phone}>Bine ai revenit!</Text>
        </View>

        <View style={styles.topButtons}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/Notifications')}>
            <Text style={styles.icon}>🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/Settings')}>
            <Text style={styles.icon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.slideshowWrap, { height: SLIDE_HEIGHT + 20 }]}> 
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          ref={scrollRef}
        >
          {slides.map((s, i) => (
            <View key={s.id} style={[styles.slide, { width: slideWidth, height: SLIDE_HEIGHT }]}> 
              <View style={[styles.imageWrap, { height: SLIDE_HEIGHT }] }>
                <Image source={s.src} style={styles.image} resizeMode="cover" />
                <View style={styles.timerWrap} pointerEvents="none">
                  <View style={styles.timerBubble}>
                    <Text style={styles.timerText}>{`${timeLeft.days}d ${String(timeLeft.hours).padStart(2,'0')}h ${String(timeLeft.minutes).padStart(2,'0')}m`}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.dots}>
          {slides.map((s, i) => (
            <View key={s.id} style={[styles.dot, active === i && styles.dotActive]} />
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.allPromosBtn} onPress={() => router.push('/Promotii')}>
        <Text style={styles.allPromosText}>Toate promoțiile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 18 },
  greetingWrap: {},
  greeting: { color: '#FFEE00', fontSize: 26, fontWeight: '700' },
  phone: { color: '#EEE', marginTop: 6, fontSize: 14 },
  topButtons: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { marginLeft: 12, padding: 8, backgroundColor: '#111', borderRadius: 8 },
  icon: { fontSize: 18 },
  // reduce space between avatar and greeting
  avatarWrap: { marginRight: 2 },
  avatar: { width: 56, height: 56, borderRadius: 999, borderWidth: 3, borderColor: '#FFEE00' },
  avatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 999,
    borderWidth: 3,
    borderColor: '#FFEE00',
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: { color: '#FFEE00', fontWeight: '700', fontSize: 22 },
  // apologyBtn removed; avatar moved to the left

  // slideshow and slide sizing
  slideshowWrap: { marginTop: 20, height: 220, alignItems: 'center' },
  slide: { height: 200, marginHorizontal: 0, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  slideTitle: { color: '#FFEE00', fontSize: 20, fontWeight: '700' },
  dots: { flexDirection: 'row', marginTop: 10 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#333', marginHorizontal: 4 },
  dotActive: { backgroundColor: '#FFEE00' },

  allPromosBtn: {
    marginTop: 18,
    backgroundColor: '#FFEE00',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  allPromosText: { color: '#000', fontWeight: '700', fontSize: 16 },
  // image + timer styles
  imageWrap: { width: '100%', height: 200, borderRadius: 12, overflow: 'hidden' },
  image: { width: '100%', height: '100%' },
  timerWrap: { position: 'absolute', left: 0, right: 0, bottom: 12, alignItems: 'center' },
  timerBubble: { backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  timerText: { color: '#FFF', fontWeight: '700' },
});
