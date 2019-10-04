import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
   Image 
} from 'react-native';

export default class Logo extends Component{
	render(){
		return(
			<View style={styles.container}>
				<Image  style={{width:150, height: 106.69,marginBottom:98.31}}
          			source={require('../assets/Vector.png')}/>
          		
  			</View>
			)
	}
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'flex-end',
    alignItems: 'center'
  }
});