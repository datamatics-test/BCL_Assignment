import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default class CategoryList extends Component {
  componentWillMount() {}

  tr() {
    return ["#EE70E9", "#8363F9"];
  }
  render() {
    const test = this.tr();
    return (
      <View>
        {Object.keys(this.props.categoryList).map((categoryObject, j) => {
          {
            let color;
            let categorValue = categoryObject.substring(
              categoryObject.length - 1,
              categoryObject.length
            );

            return this.props.categoryList[categoryObject].map(
              (category, i) => {
                return (
                  <View key={i} style={styles.ViewContainer}>
                    <View style={{ flexDirection: "row", textAlign: "center" }}>
                      <LinearGradient
                        colors={["#EE70E9", "#8363F9"]}
                        style={{
                          padding: 15,
                          alignItems: "center",
                          borderRadius: 50 / 2,
                          height: 50,
                          width: 50,
                          marginBottom: 15
                        }}
                      >
                        <Text
                          style={{
                            backgroundColor: "transparent",
                            fontSize: 15,
                            color: "black",
                            textAlign: "center"
                          }}
                        >
                          {categorValue}
                        </Text>
                      </LinearGradient>
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

const categoryTextContainerColor = {
  A: ["#EE70E9", "#8363F9"]
};
