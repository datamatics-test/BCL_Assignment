import React, { Component } from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Asset, font } from "expo";

export default class CategoryWithGradient extends Component {
  render() {
    let catGradientColor;
    let selectedCategory = this.props.categoryValue.substring(
      this.props.categoryValue.length - 1,
      this.props.categoryValue.length
    );

    if (selectedCategory == "A") {
      catGradientColor = ["#EE70E9", "#8363F9"];
    } else if (selectedCategory == "B") {
      catGradientColor = ["#3AD1BF", "#119BD2"];
    } else {
      catGradientColor = ["#8E70EE", "#2E84C1"];
    }

    return (
      <View>
        <LinearGradient
          colors={catGradientColor}
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
              color: "white",
              textAlign: "center"
            }}
          >
            {selectedCategory}
          </Text>
        </LinearGradient>
      </View>
    );
  }
}
