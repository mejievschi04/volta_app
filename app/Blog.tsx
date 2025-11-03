import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const POSTS = [
  {
    id: '1',
    title: 'Mentenanța transformatoarelor: 5 pași esențiali',
    excerpt: 'Ghid practic pentru verificarea și întreținerea transformatoarelor.',
    date: '2025-10-20',
    // remote image (transformer / industrial)
    image:
      'https://images.pexels.com/photos/4312898/pexels-photo-4312898.jpeg',
    content:
      'Transformatoarele sunt componente critice în rețelele electrice. În acest articol parcurgem 5 pași esențiali: inspectarea vizuală, verificarea conexiunilor, măsurători de izolație, testarea uleiului (dacă este cazul) și planificarea întreținerii preventive. Urmând acești pași reduci riscul de avarii și crești durata de viață a echipamentului.',
  },
  {
    id: '2',
    title: 'Alegerea cablurilor pentru instalații industriale',
    excerpt: 'Cum să selectezi secțiunea și izolația potrivită pentru medii dificile.',
    date: '2025-09-12',
    // remote image (cables / wiring)
    image:
      'https://images.pexels.com/photos/1070603/pexels-photo-1070603.jpeg',
    content:
      'Cablurile pentru industrie trebuie alese în funcție de curent, temperatură și mediu. Vom discuta despre factorii de încărcare, coeficienții de corecție pentru temperatură și tipurile de izolații rezistente la petrol, abur sau radiații UV.',
  },
  {
    id: '3',
    title: 'Instrumente indispensabile în trusa electricianului',
    excerpt: 'Top 10 instrumente care economisesc timp și cresc siguranța.',
    date: '2025-08-03',
    // remote image (tools)
    image:
      'https://images.pexels.com/photos/237997/pexels-photo-237997.jpeg',
    content:
      'O trusă bine pregătită include: multimetrul, clampmetru, detector de tensiune, șurubelnițe izolate, clește de tăiat cabluri, decapator, tester de continuitate, lanternă, mănuși izolate și șorț de protecție. Vom explica când și cum se folosesc acestea.',
  },
  {
    id: '4',
    title: 'Mentenanța retelei electrice: 5 pași esențiali',
    excerpt: 'Ghid practic pentru verificarea retelei electrice.',
    date: '2025-07-25',
    // remote image (transformer / industrial)
    image:
      'https://images.pexels.com/photos/237997/pexels-photo-237997.jpeg',
    content:
      'Transformatoarele sunt componente critice în rețelele electrice. În acest articol parcurgem 5 pași esențiali: inspectarea vizuală, verificarea conexiunilor, măsurători de izolație, testarea uleiului (dacă este cazul) și planificarea întreținerii preventive. Urmând acești pași reduci riscul de avarii și crești durata de viață a echipamentului.',
  },
];

export default function Blog() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Blog</Text>

      {POSTS.map((p) => (
        <Pressable
          key={p.id}
          style={[styles.card, { height: 140, width: '100%' }]}
          onPress={() => router.push({ pathname: '/Blog/[id]', params: { id: p.id } })}
        >
          <View style={styles.cardImageWrap}>
            <View style={styles.cardImageInner}>
              <Image source={{ uri: p.image }} style={{ width: 126, height: 126, borderRadius: 8 }} />
            </View>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.title}>{p.title}</Text>
            <Text style={styles.excerpt}>{p.excerpt}</Text>
            <Text style={styles.date}>{p.date}</Text>
          </View>
        </Pressable>
      ))}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 48, backgroundColor: '#000', minHeight: '100%' },
  header: { color: '#FFF', fontSize: 28, fontWeight: '700', marginBottom: 12, marginTop: 12 },
  card: { flexDirection: 'row', backgroundColor: '#333', padding: 12, borderRadius: 12, marginBottom: 12, overflow: 'hidden' },
  cardLeft: { width: 48, alignItems: 'center', justifyContent: 'center' },
  cardBody: { flex: 1 },
  cardImageWrap: { width: 120, backgroundColor: '#333', alignItems: 'center', justifyContent: 'center' },
  cardImageInner: { width: 96, height: 96, borderRadius: 8, backgroundColor: '#333', alignItems: 'center', justifyContent: 'center' },
  title: { color: '#FFF', fontSize: 16, fontWeight: '600',marginLeft: 12 },
  excerpt: { color: '#C9D4DD', marginTop: 4,marginLeft: 12 },
  date: { color: '#7F8A94', marginTop: 8, fontSize: 12 },
});
