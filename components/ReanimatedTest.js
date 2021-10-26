import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
  interpolateColor,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

const DATA = ["1", "2", "3", "4"];

const ReanimatedTest = () => {
  const touchX = useSharedValue(0);
  const touchY = useSharedValue(0);

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      touchX.value = event.translationX;
      touchY.value = event.translationY;
    },
    onEnd: (event) => {
      touchX.value = withSpring(0);
      touchY.value = withSpring(0);
    },
  });
  const scrllviewAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollY.value,
        [0, 100, 300],
        ["rgb(100, 200, 10)", "rgb(225, 225, 225)", "rgb(30, 220, 500)"]
      ),
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: touchX.value }, { translateY: touchY.value }],
    };
  });

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      style={[{ height: "100%", width: "100%" }, scrllviewAnimatedStyle]}
      contentContainerStyle={styles.scrollContainer}
    >
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.circle, animatedStyle]}></Animated.View>
      </PanGestureHandler>
      {DATA.map((item, index) => (
        <View key={index} style={{ paddingVertical: 100 }}>
          <Text>{item}</Text>
        </View>
      ))}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  circle: {
    backgroundColor: "red",
    height: 90,
    width: 80,
    borderRadius: 40,
  },
  scrollContainer: {
    paddingTop: 200,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ReanimatedTest;
