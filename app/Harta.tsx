import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Text, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const stores = [
  { id: 1, name: 'Service Centru', latitude: 47.019253274004505, longitude: 28.864151533617296 },
  { id: 2, name: 'Volta 1', latitude: 46.980650614582785, longitude: 28.890921593605434 },
  { id: 3, name: 'Volta 2 "Tools"', latitude: 46.99577603566025, longitude: 28.90237267409418 },
    { id: 4, name: 'Volta 3', latitude: 47.015576198461154, longitude: 28.873610152122808 },
      { id: 5, name: 'Volta 4', latitude: 47.05245166859262, longitude: 28.85054384711143 },
        { id: 6, name: 'Volta 5', latitude: 47.042002129366495, longitude: 28.798525077797365 },
          { id: 7, name: 'Volta 6', latitude: 46.99437774555062, longitude: 28.81509673970665 },
            { id: 8, name: 'Volta 7', latitude: 46.83412784551735, longitude: 28.610163620117056 },
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
