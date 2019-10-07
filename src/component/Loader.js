import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,Image,
  ActivityIndicator,
  Modal
} from 'react-native';


  const Loader = props => {
    const {
      loading,
      ...attributes
    } = props;
  

		return(
      <Modal
     // animationType={animationType}
      transparent={true}
      visible={loading}
    >
      <View style={styles.wrapper}>
        <View style={styles.loaderContainer}>
          <Image
            style={styles.loaderImage}
            source={require("../assets/LoaderMovement.gif")}
          />
        </View>
      </View>
    </Modal>
			
			)
	}


const styles = StyleSheet.create({
  wrapper: {
    zIndex: 9,
    backgroundColor: "rgba(0,0,0,0.6)",
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0
  },
  loaderContainer: {
    width: 90,
    height: 90,
    backgroundColor: "white",
    borderRadius: 15,
    position: "absolute",
    left: "50%",
    top: "50%",
    marginLeft: -45,
    marginTop: -45
  },
  loaderImage: {
    width: 90,
    height: 90,
    borderRadius: 15
  }
});
export default Loader;