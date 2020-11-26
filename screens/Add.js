import { StatusBar } from "expo-status-bar";
import * as SQLite from "expo-sqlite";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  ScrollView,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";

import FlatButton from "../shares/Button";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const db = SQLite.openDatabase("db.db");

export default class AddScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: null,
      age: null,
      height: null,
      weight: null,
    };
  }

  saveData = (name, age, height, weight) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO items (name, age, height, weight) VALUES (?,?,?,?)",
        [name, age, height, weight],
        (tx, results) => {
          console.log(results);
          Alert.alert("Success", "It has been Saved");
        },
        function (tx, err) {
          console.log("ERROR", err);
          Alert.alert("Warning", "has not been Saved");
          return;
        }
      );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />

        <ScrollView style={{ marginHorizontal: 20, marginVertical: 10 }}>
          <View style={{ marginBottom: 5 }}>
            <Text style={styles.textStyle}>Full Name</Text>
            <TextInput
              style={styles.textInputStyle}
              onChangeText={(text) => this.setState({ fullName: text })}
            />
          </View>
          <View style={{ marginBottom: 5 }}>
            <Text style={styles.textStyle}>Age (years old)</Text>
            <TextInput
              style={styles.textInputStyle}
              keyboardType="numeric"
              onChangeText={(text) => this.setState({ age: text })}
            />
          </View>
          <View style={{ marginBottom: 5 }}>
            <Text style={styles.textStyle}>Height (cm)</Text>
            <TextInput
              style={styles.textInputStyle}
              keyboardType="numeric"
              onChangeText={(text) => this.setState({ height: text })}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.textStyle}>Weight (kg)</Text>
            <TextInput
              style={styles.textInputStyle}
              keyboardType="numeric"
              onChangeText={(text) => this.setState({ weight: text })}
            />
          </View>

          <FlatButton
            text={"save"}
            onPress={() =>
              this.saveData(
                this.state.fullName,
                this.state.age,
                this.state.height,
                this.state.weight
              )
            }
          />
        </ScrollView>
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
    marginBottom: 5,
  },
  textInputStyle: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 18,
    borderRadius: 10,
    padding: 5,
    backgroundColor: "white",
  },
});
