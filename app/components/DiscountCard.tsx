import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface DiscountCardProps {
  name: string;
  logo?: any; // optional logo image
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_HEIGHT = 180;
const CARD_WIDTH = SCREEN_WIDTH - 32; // padding 16 pe fiecare parte

const DiscountCard: React.FC<DiscountCardProps> = ({ name, logo }) => {
  const [flipped, setFlipped] = useState(false);
  const animatedValue = useState(new Animated.Value(0))[0];

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const flipCard = () => {
    if (flipped) {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
    setFlipped(!flipped);
  };

  return (
    <TouchableWithoutFeedback onPress={flipCard}>
      <View style={styles.container}>
        {/* Fața cardului */}
        <Animated.View
          style={[
            styles.card,
            { transform: [{ rotateY: frontInterpolate }] },
          ]}
        >
          <LinearGradient
            colors={["#1c1c1c", "#333300", "#000"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            {/* Colț stânga sus: 10% */}
            <View style={styles.corner}>
              <Text style={styles.discountText}>10%</Text>
            </View>

            {/* Logo Volta centrat */}
            {logo && (
              <Image source={logo} style={styles.logo} resizeMode="contain" />
            )}
            <View style={styles.logoFallback}>
              {!logo && <Text style={styles.logoText}>VOLTA</Text>}
            </View>

            {/* Nume jos */}
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{name}</Text>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Spatele cardului */}
        <Animated.View
          style={[
            styles.card,
            {
              transform: [{ rotateY: backInterpolate }],
              position: "absolute",
              top: 0,
            },
          ]}
        >
          <View style={styles.backCard}>
            <Text style={styles.barcodeText}>Card ID: 123456789</Text>
            <View style={styles.barcodeContainer}>
              {/* Linii barcode */}
              {Array.from({ length: 40 }).map((_, i) => {
                const barWidth = Math.random() > 0.5 ? 2 : 3;
                return (
                  <View
                    key={i}
                    style={{
                      width: barWidth,
                      height: 80,
                      backgroundColor: "#000",
                      marginRight: 2,
                    }}
                  />
                );
              })}
            </View>
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginVertical: 20,
    alignSelf: "center",
  },
  card: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    borderColor: "#FFEE00",
    borderWidth: 1,
    backfaceVisibility: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 8,
  },
  gradient: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    justifyContent: "space-between",
  },
  corner: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#FFEE00",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  logo: {
    width: 100,
    height: 40,
    marginTop: 20,
  },
  logoFallback: {
    left: 210,
    marginTop: -12,
  },
  logoText: {
    color: "#FFEE00",
    fontSize: 28,
    fontWeight: "700",
  },
  nameContainer: {
    position: "absolute",
    bottom: 12,
    right: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFEE00",
  },
  backCard: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  barcodeText: {
    position: "absolute",
    top: 16,
    fontSize: 12,
    color: "#000",
  },
  barcodeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: 40,
  },
});

export default DiscountCard;
