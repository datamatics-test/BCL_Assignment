import React, {Component} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {Provider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { Stitch, AnonymousCredential } from "mongodb-stitch-react-native-sdk";
import Main from "./src/Main";
import persist from "./src/config/store";

const persistStore = persist();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: undefined,
      client: undefined,
      isLoadingComplete: false
    };
    this._loadClient = this._loadClient.bind(this);
  }

  componentDidMount() {
    this._loadClient();
  }
  

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  _loadClient() {
    Stitch.initializeDefaultAppClient("userauth-rxdni").then(client => {
      this.setState({ client });
      this.state.client.auth
        .loginWithCredential(new AnonymousCredential())
        .then(user => {
          console.log(`Successfully logged in as user ${user.id}`);
          this.setState({ currentUserId: user.id });
          this.setState({ currentUserId: client.auth.user.id });
        })
        .catch(err => {
          console.log(`Failed to log in anonymously: ${err}`);
          this.setState({ currentUserId: undefined });
        });
    });
  }

  render() {
    return (
      <Provider store={persistStore.store}>
        <PersistGate loading={null} persistor={persistStore.persistor}>
          <Main />


        </PersistGate>
      </Provider>
    );
  }
}