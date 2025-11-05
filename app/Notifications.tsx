import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Notification = {
  id: string;
  title: string;
  message: string;
  read: boolean;
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selected, setSelected] = useState<Notification | null>(null);
  const router = useRouter();

  // Notificări demo pentru inițializare
  const demoNotifications: Notification[] = [
    {
      id: '1',
      title: 'Reducere specială!',
      message: 'Ai 10% reducere la următoarea achiziție Volta!',
      read: false,
    },
    {
      id: '2',
      title: 'Program nou magazin',
      message: 'Volta Centru este deschis acum până la ora 20:00!',
      read: true,
    },
  ];

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const stored = await AsyncStorage.getItem('notifications');
      if (stored) {
        setNotifications(JSON.parse(stored) as Notification[]);
      } else {
        await AsyncStorage.setItem(
          'notifications',
          JSON.stringify(demoNotifications)
        );
        setNotifications(demoNotifications);
      }
    } catch (error) {
      console.error('Eroare la încărcarea notificărilor:', error);
    }
  };

  const saveNotifications = async (data: Notification[]) => {
    try {
      await AsyncStorage.setItem('notifications', JSON.stringify(data));
    } catch (error) {
      console.error('Eroare la salvare:', error);
    }
  };

  const markAsRead = (id: string) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    saveNotifications(updated);
  };

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    saveNotifications(updated);
  };

  const deleteAllNotifications = () => {
    Alert.alert('Confirmare', 'Ești sigur că vrei să ștergi toate notificările?', [
      { text: 'Anulează', style: 'cancel' },
      {
        text: 'Șterge',
        style: 'destructive',
        onPress: async () => {
          setNotifications([]);
          await AsyncStorage.removeItem('notifications');
        },
      },
    ]);
  };

  const handleOpen = (notif: Notification) => {
    markAsRead(notif.id);
    setSelected(notif);
  };

  return (
    <View style={styles.container}>
      {/* Buton Înapoi */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#FFEE00" />
        <Text style={styles.backText}>Înapoi</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Notificările tale</Text>

      {/* Acțiuni rapide */}
      {notifications.length > 0 && (
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={markAllAsRead}
          >
            <Ionicons name="checkmark-done" size={18} color="#ffee00" />
            <Text style={styles.actionText}>Toate citite</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#1a0000', borderColor: '#FFEE00' }]}
            onPress={deleteAllNotifications}
          >
            <Ionicons name="trash-outline" size={18} color="#FFEE00" />
            <Text style={[styles.actionText, { color: '#FFEE00' }]}>Șterge tot</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Lista notificărilor */}
      <ScrollView style={styles.scroll}>
        {notifications.length === 0 ? (
          <Text style={styles.emptyText}>Nu ai notificări momentan</Text>
        ) : (
          notifications.map((notif) => (
            <TouchableOpacity
              key={notif.id}
              style={[
                styles.notification,
                !notif.read && {
                  borderColor: '#FFEE00',
                  backgroundColor: '#1a1a00',
                },
              ]}
              onPress={() => handleOpen(notif)}
            >
              <Text style={styles.notifTitle}>{notif.title}</Text>
              <Text
                style={[
                  styles.notifMessage,
                  !notif.read && { color: '#FFEE00' },
                ]}
                numberOfLines={1}
              >
                {notif.message}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Pop-up mesaj */}
      <Modal
        visible={!!selected}
        transparent
        animationType="fade"
        onRequestClose={() => setSelected(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{selected?.title}</Text>
            <Text style={styles.modalMessage}>{selected?.message}</Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelected(null)}
            >
              <Text style={styles.closeText}>Închide</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 20,
  },
  backText: { color: '#FFEE00', marginLeft: 8, fontSize: 16 },
  title: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#FFEE00',
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#ffee00',
    fontWeight: '600',
  },
  scroll: { flex: 1 },
  notification: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#111',
  },
  notifTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  notifMessage: {
    color: '#AAA',
    marginTop: 4,
    fontSize: 14,
  },
  emptyText: {
    color: '#777',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 60,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FFEE00',
  },
  modalTitle: {
    color: '#FFEE00',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  modalMessage: {
    color: '#FFF',
    fontSize: 15,
    marginBottom: 20,
  },
  closeButton: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFEE00',
  },
  closeText: { color: '#FFEE00', fontWeight: '600' },
});
