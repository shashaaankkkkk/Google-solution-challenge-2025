import React from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useEffect } from 'react';

const Contact = () => {
  const rotate = useSharedValue(0); // Initialize rotation at 0
  const scale = useSharedValue(0.5); // Initialize scale at 0.5

  useEffect(() => {
    // Animate rotation and scale when component mounts
    rotate.value = withTiming(143, { duration: 1500, easing: Easing.bounce });
    scale.value = withSpring(1, { damping: 10, stiffness: 100 });
  }, []);

  // Define animated styles with scaling and rotation
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotate.value}deg` }, // Apply rotation
    ],
  }));

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, animatedStyle]}>
        ❤️ From Shashank
      </Animated.Text>
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
