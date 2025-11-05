import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

const POSTS = [
  {
    id: '1',
    title: 'Mentenanța transformatoarelor: 5 pași esențiali',
    excerpt: 'Ghid practic pentru verificarea și întreținerea transformatoarelor.',
    date: '2025-10-20',
    image: 'https://images.pexels.com/photos/4312898/pexels-photo-4312898.jpeg',
    content:
      'Transformatoarele sunt componente critice în rețelele electrice. În acest articol parcurgem 5 pași esențiali: inspectarea vizuală, verificarea conexiunilor, măsurători de izolație, testarea uleiului (dacă este cazul) și planificarea întreținerii preventive. Urmând acești pași reduci riscul de avarii și crești durata de viață a echipamentului.',
  },
  {
    id: '2',
    title: 'Alegerea cablurilor pentru instalații industriale',
    excerpt: 'Cum să selectezi secțiunea și izolația potrivită pentru medii dificile.',
    date: '2025-09-12',
    image: 'https://images.pexels.com/photos/1070603/pexels-photo-1070603.jpeg',
    content:
      'Cablurile pentru industrie trebuie alese în funcție de curent, temperatură și mediu. Vom discuta despre factorii de încărcare, coeficienții de corecție pentru temperatură și tipurile de izolații rezistente la petrol, abur sau radiații UV.',
  },
  {
    id: '3',
    title: 'Instrumente indispensabile în trusa electricianului',
    excerpt: 'Top 10 instrumente care economisesc timp și cresc siguranța.',
    date: '2025-08-03',
    image: 'https://images.pexels.com/photos/237997/pexels-photo-237997.jpeg',
    content:
      'O trusă bine pregătită include: multimetrul, clampmetru, detector de tensiune, șurubelnițe izolate, clește de tăiat cabluri, decapator, tester de continuitate, lanternă, mănuși izolate și șorț de protecție. Vom explica când și cum se folosesc acestea.',
  },
  {
    id: '4',
    title: 'Mentenanța rețelei electrice: 5 pași esențiali',
    excerpt: 'Ghid practic pentru verificarea rețelei electrice.',
    date: '2025-07-25',
    image: 'https://images.pexels.com/photos/158827/pexels-photo-158827.jpeg',
    content:
      'Rețelele electrice trebuie inspectate periodic pentru a asigura funcționarea continuă și sigură. Vom trece în revistă verificarea conexiunilor, izolarea, protecțiile și testarea periodică.',
  },
];

export default function Blog() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Blog</Text>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {POSTS.map((p) => (
          <Pressable
            key={p.id}
            style={styles.card}
            onPress={() =>
              router.push({ pathname: '/Blog/[id]', params: { id: p.id } })
            }
          >
            <Image source={{ uri: p.image }} style={styles.cardImage} />
            <View style={styles.cardBody}>
              <Text style={styles.title}>{p.title}</Text>
              <Text style={styles.excerpt}>{p.excerpt}</Text>
              <Text style={styles.date}>{p.date}</Text>
            </View>
          </Pressable>
        ))}

        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  scroll: {
    paddingBottom: 100,
  },
  header: {
    color: '#FFEE00',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
  },
  cardImage: {
    width: 140,
    height: 170,
  },
  cardBody: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  excerpt: {
    color: '#C9D4DD',
    fontSize: 14,
    marginBottom: 6,
  },
  date: {
    color: '#FFEE00',
    fontSize: 12,
  },
});
