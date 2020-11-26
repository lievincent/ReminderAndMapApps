import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { WebView } from "react-native-webview";

import Header from "../shares/Header";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default class News extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />

        <Header
          text={"News"}
          onPress={() => this.props.navigation.toggleDrawer()}
        />

        <WebView source={{ uri: "https://cosmos.id/" }}></WebView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
});
