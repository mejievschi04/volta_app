import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const POSTS: Record<string, any> = {
  '1': {
    id: '1',
    title: 'Mentenanța transformatoarelor: 5 pași esențiali',
    date: '2025-10-20',
    image: require('../../assets/images/Group 9.png'),
    content:
      'Transformatoarele sunt componente critice în rețelele electrice. În acest articol parcurgem 5 pași esențiali: inspectarea vizuală, verificarea conexiunilor, măsurători de izolație, testarea uleiului (dacă este cazul) și planificarea întreținerii preventive. Urmând acești pași reduci riscul de avarii și crești durata de viață a echipamentului.',
  },
  '2': {
    id: '2',
    title: 'Alegerea cablurilor pentru instalații industriale',
    date: '2025-09-12',
    image: require('../../assets/images/Group 9.png'),
    content:
      'Cablurile pentru industrie trebuie alese în funcție de curent, temperatură și mediu. Vom discuta despre factorii de încărcare, coeficienții de corecție pentru temperatură și tipurile de izolații rezistente la petrol, abur sau radiații UV.',
  },
  '3': {
    id: '3',
    title: 'Instrumente indispensabile în trusa electricianului',
    date: '2025-08-03',
    image: require('../../assets/images/Group 9.png'),
    content:
      'O trusă bine pregătită include: multimetrul, clampmetru, detector de tensiune, șurubelnițe izolate, clește de tăiat cabluri, decapator, tester de continuitate, lanternă, mănuși izolate și șorț de protecție. Vom explica când și cum se folosesc acestea.',
  },
};

export default function PostDetail() {
  const params = useLocalSearchParams();
  const id = (params as any).id as string;
  const post = POSTS[id];

  if (!post) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Articolul nu a fost găsit</Text>
      </View>
    );
  }
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable style={styles.backBtn} onPress={() => router.back()}>
        <MaterialCommunityIcons name="arrow-left" size={18} color="#FFF" />
        <Text style={styles.backText}>Înapoi</Text>
      </Pressable>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.date}>{post.date}</Text>
      <Image source={post.image} style={styles.image} resizeMode="cover" />
      <Text style={styles.content}>{post.content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 48, backgroundColor: '#071024', minHeight: '100%' },
  title: { color: '#FFF', fontSize: 22, fontWeight: '700', marginBottom: 8 },
  date: { color: '#7F8A94', marginBottom: 12 },
  image: { width: '100%', height: 200, borderRadius: 12, marginBottom: 16 },
  content: { color: '#DDD', fontSize: 16, lineHeight: 22 },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, marginTop: 10 },
  backText: { color: '#FFF', marginLeft: 8, fontSize: 16 },
});
