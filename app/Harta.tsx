import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Text, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const stores = [
  { id: 1, name: 'Volta Centru', latitude: 47.0105, longitude: 28.8638 },
  { id: 2, name: 'Volta Botanica', latitude: 46.982, longitude: 28.861 },
  { id: 3, name: 'Volta Ciocana', latitude: 47.045, longitude: 28.88 },
];

const mapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#1d2c4d' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8ec3b9' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1a3646' }] },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#023e58' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#304a7d' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#0e1626' }],
  },
];

export default function Harta() {
  const [location, setLocation] = useState<any>(null);
  const [nearest, setNearest] = useState<any>(null);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permisiunea pentru locație este necesară pentru a utiliza harta.');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      const nearestStore = getNearestStore(loc.coords, stores);
      setNearest(nearestStore);
    })();
  }, []);

  if (!location)
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#00ff88" />
        <Text style={{ color: '#fff', marginTop: 10 }}>Se obține locația ta...</Text>
      </View>
    );

  const centerToUser = () => {
    mapRef.current?.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={mapStyle}
        showsUserLocation={true}
        showsMyLocationButton={false}
        zoomControlEnabled={false}
        toolbarEnabled={false}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {stores.map((store) => (
          <Marker
            key={store.id}
            coordinate={{ latitude: store.latitude, longitude: store.longitude }}
            title={store.name}
            description={
              store.id === nearest?.id ? 'Cel mai apropiat magazin Volta 🟢' : 'Magazin Volta'
            }
            pinColor={store.id === nearest?.id ? '#00ff88' : '#ff4444'}
          />
        ))}
      </MapView>

      {/* CARD SUS */}
      {nearest && (
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Cel mai apropiat magazin</Text>
          <Text style={styles.infoName}>{nearest.name}</Text>
          <Text style={styles.infoDistance}>
            Distanță: {nearest.distance.toFixed(2)} km
          </Text>
        </View>
      )}

      {/* Buton centrare */}
      <View style={styles.topButtons}>
        <TouchableOpacity style={styles.btn} onPress={centerToUser}>
          <Ionicons name="locate" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Mască peste logo Google (jos dreapta) */}
      <View style={styles.maskBottomRight} />
    </View>
  );
}

function getNearestStore(userCoords: any, stores: any[]) {
  const { latitude, longitude } = userCoords;
  let nearest = null;
  let minDist = Infinity;

  for (const store of stores) {
    const dist = getDistance(latitude, longitude, store.latitude, store.longitude);
    if (dist < minDist) {
      minDist = dist;
      nearest = { ...store, distance: dist };
    }
  }
  return nearest;
}

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  map: { width: '100%', height: '100%' },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  infoBox: {
    position: 'absolute',
    top: 60,
    left: width * 0.05,
    right: width * 0.05,
    backgroundColor: 'rgba(0,0,0,0.75)',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#00ff88',
  },
  infoTitle: { color: '#ccc', fontWeight: 'bold', fontSize: 15 },
  infoName: { color: '#fff', fontSize: 17, fontWeight: '700', marginVertical: 4 },
  infoDistance: { color: '#aaa', fontSize: 14 },
  topButtons: {
    position: 'absolute',
    top: 60,
    right: 20,
  },
  btn: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#00ff88',
  },
  maskBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 120,
    height: 30,
    backgroundColor: '#000',
  },
});
