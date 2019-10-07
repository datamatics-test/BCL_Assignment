/**
 * Created By: Mayank Chawla
 * Description: Used for routing pages 
 * 
 **/
 
 import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from '../pages/Input';
import Signup from '../pages/Signup';
import Profile from "../pages/Profile";

export default class Routes extends Component {
	async componentWillMount() {
		await Expo.Font.loadAsync({
		
		'Roboto_medium': require('../../node_modules/native-base/Fonts/Roboto_medium.ttf'),
		
	   });
	  }
	render() {
		return(
			<Router>
			    <Scene>
							<Scene key="root" hideNavBar={true} initial={!this.props.isLoggedIn}>
								<Scene key="login" component={Login} initial={true} />
								<Scene key="signup" component={Signup} title="Register" />
							</Scene>
							<Scene key="app" hideNavBar={true}  initial={this.props.isLoggedIn}>
								<Scene key="profile" hideNavBar={true} component={Profile} />
							</Scene>
					</Scene>
			 </Router>
			)
	}
}
