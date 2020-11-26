import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { TouchableOpacity } from "react-native-gesture-handler";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function Header({ text, onPress }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onPress}>
        <FontAwesome
          name="bars"
          size={(screenHeight * 3.5) / 100}
          style={{ color: "white" }}
        />
      </TouchableOpacity>
      <Text
        style={{
          marginLeft: 20,
          fontSize: 22,
          fontWeight: "bold",
          color: "white",
        }}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingTop: 50,
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
});
