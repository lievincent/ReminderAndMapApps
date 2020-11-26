import { StatusBar } from "expo-status-bar";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Switch,
  Alert,
} from "react-native";
import TimePicker from "react-native-simple-time-picker";

import Header from "../shares/Header";
import FlatButton from "../shares/Button";
import { TextInput } from "react-native-paper";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default class Reminder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      switchValue: false,
      identifier: null,
      wakeUpIdentifier: null,
      show: false,
      selectedHours: 0,
      selectedMinutes: 0,
    };
  }

  toggleSwitch = async (value) => {
    if (value === true) {
      const data = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Reminder",
          body: "Remember to drink water!",
        },
        trigger: { seconds: 5, repeats: true },
      });

      this.setState({
        switchValue: value,
        identifier: data,
      });
    } else {
      await Notifications.cancelScheduledNotificationAsync(
        this.state.identifier
      );
      this.setState({
        switchValue: value,
        identifier: null,
      });
    }
  };

  setWakeUpReminder = async (hours, minutes) => {
    const data = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Reminder",
        body: "wake Up!",
      },
      trigger: { seconds: hours * 3600 + minutes * 60, repeats: false },
    });

    this.setState({
      wakeUpIdentifier: data,
    });

    Alert.alert("Done");
  };

  cancelWakeUpReminder = async () => {
    await Notifications.cancelScheduledNotificationAsync(
      this.state.wakeUpIdentifier
    );
    this.setState({
      wakeUpIdentifier: null,
    });
    Alert.alert("Alarm Canceled");
  };

  // cancellAll = () => {
  //   Notifications.cancelAllScheduledNotificationsAsync();
  // };

  componentDidMount() {
    let result = Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (Constants.isDevice && result.status === "granted") {
      console.log("Notification permissions granted");
    }

    Notifications.setNotificationHandler();
  }

  showTimePicker = () => {
    this.setState({ show: true });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />

        <Header
          text={"Reminder"}
          onPress={() => this.props.navigation.toggleDrawer()}
        />

        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>Reminder to drink</Text>
          <Switch
            style={{ width: (screenWidth * 10) / 100 }}
            onValueChange={this.toggleSwitch}
            value={this.state.switchValue}
          />
        </View>

        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>
            Reminder to wake up (Hours-Minutes)
          </Text>
          <TimePicker
            selectedHours={this.state.selectedHours}
            selectedMinutes={this.state.selectedMinutes}
            onChange={(hours, minutes) =>
              this.setState({ selectedHours: hours, selectedMinutes: minutes })
            }
          />
          <View style={{ marginBottom: 10 }}>
            <FlatButton
              text={"Set Reminder to wake up"}
              onPress={() =>
                this.setWakeUpReminder(
                  this.state.selectedHours,
                  this.state.selectedMinutes
                )
              }
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <FlatButton
              text={"Cancel Reminder to wake up"}
              onPress={() => this.cancelWakeUpReminder()}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  textStyle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  viewStyle: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
});
