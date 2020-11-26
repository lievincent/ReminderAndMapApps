import { StatusBar } from "expo-status-bar";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";

import Header from "../shares/Header";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default class CameraScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cameraGranted: false,
      rollGranted: false,
    };
  }

  componentDidMount() {
    this.getCameraPermissions();

    // const focus = this.props.navigation.addListener("focus", () => {
    //   this.getCameraPermissions();
    // });
  }

  getCameraPermissions = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status === "granted") {
      this.setState({ cameraGranted: true });
    } else {
      this.setState({ cameraGranted: false });
      console.log("user has not granted camera permission");
    }
    this.getCameraRollPermissions();
  };

  getCameraRollPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      this.setState({ rollGranted: true });
    } else {
      this.setState({ rollGranted: false });
      console.log("user has not granted camera roll permission");
    }
  };

  takePictureAndCreateAlbum = async () => {
    const { uri } = await this.camera.takePictureAsync();
    console.log("uri", uri);
    const asset = await MediaLibrary.createAssetAsync(uri);
    console.log("asset", asset);
    MediaLibrary.createAlbumAsync("Expo", asset)
      .then(() => {
        Alert.alert("Album created!");
      })
      .catch((error) => {
        Alert.alert("An Error Occurred!");
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />

        <Header
          text={"Camera"}
          onPress={() => this.props.navigation.toggleDrawer()}
        />

        <Camera
          style={{ flex: 1, backgroundColor: "transparent" }}
          ref={(ref) => {
            this.camera = ref;
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              style={{
                alignSelf: "center",
                marginBottom: (screenWidth * 10) / 100,
              }}
              onPress={() =>
                this.state.rollGranted && this.state.cameraGranted
                  ? this.takePictureAndCreateAlbum()
                  : Alert.alert("Permissions not granted")
              }
            >
              <View style={styles.outerCircle}>
                <View style={styles.innerCircle}></View>
              </View>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  outerCircle: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "white",
    height: 70,
    width: 70,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "white",
    height: 60,
    width: 60,
    backgroundColor: "white",
  },
});
