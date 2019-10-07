/**
 * Created By: Mayank Chawla
 * Description: Used for fetching data to be shown in list
 */

import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CategoryWithGradient from "./CategoryWithGradient";
export default class CategoryList extends Component {
  componentDidMount() {}

  render() {
    return (
      <View>
        {Object.keys(this.props.categoryList).map((categoryObject, j) => {
          {
            return this.props.categoryList[categoryObject].map(
              (category, i) => {
                return (
                  <View key={i} style={styles.ViewContainer}>
                    <View style={{ flexDirection: "row", textAlign: "center" }}>
                      <CategoryWithGradient categoryValue={categoryObject} />
                      <Text style={{ padding: 15 }}>{category.balance}</Text>
                    </View>
                    <View>
                      <Text style={{ padding: 15 }}>{category.status}</Text>
                    </View>
                  </View>
                );
              }
            );
          }
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ViewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    borderBottomColor: "#F2F2F2",
    borderBottomWidth: 1
  },
  circle: {
    width: 30,
    height: 30,
    padding: 15,
    alignItems: "center",
    borderRadius: 30 / 2,
    backfaceVisibility: "visible"
  },
  categoryTextContainerColorA: {}
});
