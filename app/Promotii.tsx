import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

const { height, width } = Dimensions.get('window');
const ITEM_HEIGHT = Math.round(height * 0.25); // 25% din ecran

// fiecare promo are imagine + deadline (ISO string)
const promos = [
  { 
    id: 'p1', 
    title: 'Promoția 1', 
    subtitle: 'Reducere 20% la toate produsele',
    image: 'https://images.pexels.com/photos/237997/pexels-photo-237997.jpeg',
    deadline: '2025-11-05T23:59:59',
  },
  { 
    id: 'p2', 
    title: 'Promoția 2', 
    subtitle: 'Transport gratuit',
    image: 'https://images.pexels.com/photos/9665360/pexels-photo-9665360.jpeg',
    deadline: '2025-11-06T18:00:00',
  },
  { 
    id: 'p3', 
    title: 'Promoția 3', 
    subtitle: 'Cumpără 2, primești 1',
    image: 'https://images.pexels.com/photos/237997/pexels-photo-237997.jpeg',
    deadline: '2025-11-04T12:00:00',
  },
  { 
    id: 'p4', 
    title: 'Promoția 4', 
    subtitle: 'Cadou la prima comandă',
    image: 'https://images.pexels.com/photos/9665360/pexels-photo-9665360.jpeg',
    deadline: '2025-11-10T10:00:00',
  },
  { 
    id: 'p5', 
    title: 'Promoția 5', 
    subtitle: 'Ofertă limitată',
    image: 'https://images.pexels.com/photos/237997/pexels-photo-237997.jpeg',
    deadline: '2025-11-08T22:00:00',
  },
];

export default function Promotii() {
  const router = useRouter();
  const [timers, setTimers] = useState({});

  // actualizăm countdown-urile la fiecare 1 sec
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const updated = {};
      promos.forEach((promo) => {
        const distance = new Date(promo.deadline).getTime() - now;
        if (distance <= 0) {
          updated[promo.id] = 'Expirat';
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          updated[promo.id] = `${days}z ${hours}h ${minutes}m`;
        }
      });
      setTimers(updated);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Promoții</Text>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {promos.map((p) => (
          <TouchableOpacity
            key={p.id}
            style={[styles.card, { height: ITEM_HEIGHT, width: width - 40 }]}
            activeOpacity={0.85}
            onPress={() => router.push(`/Promotii/${p.id}`)}
          >
            <Image source={{ uri: p.image }} style={styles.image} />
            
            <View style={styles.overlay}>
              <View>
                <Text style={styles.cardTitle}>{p.title}</Text>
                <Text style={styles.cardSubtitle}>{p.subtitle}</Text>
              </View>
              <Text style={styles.timer}>
                {timers[p.id] || '...'}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingTop: 20, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: '#fff', marginBottom: 12, marginTop: 12 },
  list: { paddingBottom: 40, alignItems: 'center' },
  card: {
    backgroundColor: '#111',
    borderRadius: 12,
    marginVertical: 8,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.85,
  },
  overlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  cardTitle: { color: '#FFEE00', fontSize: 20, fontWeight: '700', marginBottom: 4 },
  cardSubtitle: { color: '#FFF', fontSize: 14 },
  timer: {
    color: '#FFEE00',
    fontSize: 14,
    fontWeight: '600',
    alignSelf: 'flex-end',
  },
});
