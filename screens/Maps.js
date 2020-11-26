import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import Header from "../shares/Header";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default class Maps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: null,
      locationFix: null,
      mocked: null,
    };
  }

  componentDidMount() {
    this.getLocationAsync();
  }

  getLocationAsync = async () => {
    await Location.hasServicesEnabledAsync();
    await Permissions.askAsync(Permissions.LOCATION);
    await Location.watchPositionAsync(
      { accuracy: Location.Accuracy.Highest, timeInterval: 1 },
      async (point) => {
        const location = point.coords;
        const { mocked } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
          timeInterval: 1,
        });
        this.setState({
          location: {
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          },
          locationFix: location,
          mocked,
        });
      }
    ).catch((err) => {
      return;
    });
  };

  handleMapRegionChange = (location) => {
    this.setState({ location });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />

        <Header
          text={"Maps"}
          onPress={() => this.props.navigation.toggleDrawer()}
        />

        {this.state.location ? (
          <MapView
            style={styles.mapStyle}
            initialRegion={this.state.location}
            mapType="mutedStandard"
            showsUserLocation={true}
            showsMyLocationButton={true}
            onRegionChange={this.handleMapRegionChange}
          >
            <Marker
              coordinate={this.state.locationFix}
              title={this.state.mocked ? "Mock Location" : "Current Location"}
              description={
                this.state.mocked
                  ? "Your device detected use mock location"
                  : "This my current location"
              }
            />
          </MapView>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  mapStyle: {
    flex: 1,
  },
  stat: {
    paddingHorizontal: 10,
  },
  statText: {
    fontSize: 18,
    margin: 5,
    color: "green",
    textAlign: "center",
    fontWeight: "bold",
  },
  statTextRed: {
    fontSize: 18,
    margin: 5,
    color: "red",
    textAlign: "center",
    fontWeight: "bold",
  },
});
