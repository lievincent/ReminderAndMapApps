import { StatusBar } from "expo-status-bar";
import * as SQLite from "expo-sqlite";
import React, { Component } from "react";
import { Card } from "react-native-paper";
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
  FlatList,
} from "react-native";

import Header from "../shares/Header";
import FlatButton from "../shares/Button";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const db = SQLite.openDatabase("db.db");

export default class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER, height INTEGER, weight INTEGER)",
        [],
        (tx, results) => {
          console.log(results);
        },
        (tx, err) => {
          console.log(err);
        }
      );
    });

    this.selectData();

    const focus = this.props.navigation.addListener("focus", () => {
      this.selectData();
    });
  }

  selectData = () => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM items", [], (tx, results) => {
        console.log(results, "HASIL");
        if (results.rows.length > 0) {
          this.setState({
            data: results.rows._array,
          });
        }
      });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />

        <Header
          text={"List"}
          onPress={() => this.props.navigation.toggleDrawer()}
        />

        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
          <FlatButton
            text={"Add new"}
            onPress={() => this.props.navigation.navigate("Add New")}
          />
        </View>

        {this.state.data.length === 0 ? (
          <Text>No data</Text>
        ) : (
          <View style={{ flex: 1, marginHorizontal: 15, marginTop: 5 }}>
            <Text
              style={{ marginBottom: 10, fontSize: 16, fontWeight: "bold" }}
            >
              Data :{" "}
            </Text>
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                <Card
                  style={{
                    padding: 10,
                    marginBottom: 10,
                    borderRadius: 10,
                  }}
                >
                  <Text style={styles.textStyle}>Name : {item.name}</Text>
                  <Text style={styles.textStyle}>Age : {item.age}</Text>
                  <Text style={styles.textStyle}>Height : {item.height}</Text>
                  <Text style={styles.textStyle}>Weight : {item.weight}</Text>
                </Card>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
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
  textStyle: {
    fontSize: 16,
    marginBottom: 5,
  },
});
