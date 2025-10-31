import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const INITIAL = [
  { id: 'n1', title: 'Plată nereușită', body: 'Plata pentru comanda #345 a eșuat.', unread: true },
  { id: 'n2', title: 'Promotie nouă', body: '25% reducere pentru următoarea cursă!', unread: true },
  { id: 'n3', title: 'Actualizare aplicație', body: 'Versiunea 1.2.0 este disponibilă.', unread: false },
  { id: 'n4', title: 'Sondaj rapid', body: 'Spune-ne cum ți s-a părut ultima cursă.', unread: true },
];

export default function Notifications() {
  const router = useRouter();
  const [items, setItems] = useState(INITIAL);

  const markRead = (id: string) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, unread: false } : it)));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Notificări</Text>

      {items.map((n) => (
        <Pressable
          key={n.id}
          style={[styles.item, n.unread && styles.unreadItem]}
          onPress={() => markRead(n.id)}
        >
          <View style={styles.itemLeft}>
            <MaterialCommunityIcons name={n.unread ? 'bell-alert' : 'bell'} size={20} color={n.unread ? '#000' : '#FFF'} />
          </View>
          <View style={styles.itemBody}>
            <Text style={[styles.itemTitle, n.unread && styles.unreadTitle]}>{n.title}</Text>
            <Text style={styles.itemText}>{n.body}</Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 48, backgroundColor: '#071024', minHeight: '100%' },
  header: { color: '#FFF', fontSize: 28, fontWeight: '700', marginBottom: 12 },
  item: { flexDirection: 'row', backgroundColor: '#0F1724', padding: 12, borderRadius: 12, marginBottom: 12, alignItems: 'center' },
  unreadItem: { backgroundColor: '#FFEE00', },
  itemLeft: { width: 36, alignItems: 'center' },
  itemBody: { flex: 1, marginLeft: 8 },
  itemTitle: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  unreadTitle: { color: '#000' },
  itemText: { color: '#C9D4DD', marginTop: 4 },
});
