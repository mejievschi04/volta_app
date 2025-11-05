import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Settings() {
  const router = useRouter();
  const [isDark, setIsDark] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert('Deconectare', 'Sigur vrei să te deconectezi?', [
      { text: 'Anulează', style: 'cancel' },
      { text: 'Da', onPress: () => router.replace('/Login') },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setări</Text>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Profil utilizator */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profil</Text>
          <TouchableOpacity style={styles.row} onPress={() => router.push('/EditProfil')}>
            <Ionicons name="person-circle-outline" size={30} color="#FFEE00" />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.name}>Ion Mejievschi</Text>
              <Text style={styles.email}>ion.mjsky@email.com</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={24} color="#FFEE00" />
          </TouchableOpacity>
        </View>

        {/* Notificări */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notificări</Text>
          <View style={styles.row}>
            <Text style={styles.optionText}>Activează notificările</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#555', true: '#FFEE00' }}
              thumbColor={notificationsEnabled ? '#000' : '#fff'}
            />
          </View>
        </View>

        {/* Tema */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aparanță</Text>
          <View style={styles.row}>
            <Text style={styles.optionText}>Mod întunecat</Text>
            <Switch
              value={isDark}
              onValueChange={setIsDark}
              trackColor={{ false: '#555', true: '#FFEE00' }}
              thumbColor={isDark ? '#000' : '#fff'}
            />
          </View>
        </View>

        {/* Despre aplicație */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Despre aplicație</Text>
          <Text style={styles.aboutText}>
            Versiune: 1.0.0{"\n"}
            Aplicația Volta te ajută să fii mereu conectat cu cele mai noi promoții și oferte.
          </Text>
        </View>

        {/* Deconectare */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#000" />
          <Text style={styles.logoutText}>Deconectare</Text>
        </TouchableOpacity>

        {/* Înapoi */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={20} color="#FFEE00" />
          <Text style={styles.backText}>Înapoi</Text>
        </TouchableOpacity>

        {/* Spațiu pentru meniu */}
        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingTop: 40 },
  title: { fontSize: 28, fontWeight: '700', color: '#FFEE00', textAlign: 'center', marginBottom: 10 },
  scroll: { padding: 20, paddingBottom: 100 },
  section: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#222',
  },
  sectionTitle: { color: '#FFEE00', fontSize: 18, fontWeight: '600', marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  optionText: { color: '#EEE', fontSize: 16 },
  name: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  email: { color: '#AAA', fontSize: 14 },
  aboutText: { color: '#CCC', fontSize: 14, lineHeight: 20 },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFEE00',
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 10,
  },
  logoutText: { color: '#000', fontSize: 16, fontWeight: '600', marginLeft: 8 },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  backText: { color: '#FFEE00', fontSize: 16, marginLeft: 6 },
});
