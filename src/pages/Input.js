import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { compose } from "redux";
import { Field, reduxForm } from "redux-form";
import Confetti from "react-native-confetti";
import InputText from "../component/InputText";
import { loginUser } from "../action/auth.actions";
import Logo from "../component/Logo";
import Form from "../component/Form";
import Loader from "../component/Loader";
import { Actions } from "react-native-router-flux";
import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: "baseline",
    justifyContent: "center",
    marginTop: 30,
    flexDirection: "row"
  },
  signupTextCont1: {
    position: "relative",
    marginRight: 136,
    marginLeft: 47,
    marginTop: 20,
    flexDirection: "row"
  },
  signupText: {
    color: "#898989",
    fontSize: 16
  },
  signupButton: {
    color: "#31C5C3",
    fontSize: 16,
    fontWeight: "500"
  },
  button: {
    width: 281,
    height: 48,
    backgroundColor: "#31C5C3",
    borderRadius: 30,
    marginTop: 99,
    paddingVertical: 13
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 17,
    color: "white",
    textTransform: "capitalize",
    textAlign: "center",
    borderRadius: 10
  }
});

class Input extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { loadingVisible: false };
  // }

  // handleLoginButton() {
  //   this.setState({ loadingVisible: true });
  //   setTimeout(() => {
  //     this.props.navigation.navigate("HomeScreen");
  //     this.setState({ loadingVisible: false });
  //   }, 3000);
  // }
  //  <Loader modalVisible={loadingVisible} animationType="fade" />
  signup() {
    Actions.signup();
  }

  onlogin = values => {
    // this.loginUser(values);
    // Keyboard.dismiss();

    const stitchAppClient = Stitch.defaultAppClient;
    const mongoClient = stitchAppClient.getServiceClient(
      RemoteMongoClient.factory,
      "userlogin"
    );
    const db = mongoClient.db("mern-auth");
    const validates = db.collection("users");

    validates
      .find(
        { email: values.email, password: values.password },
        { sort: { date: -1 } }
      )
      .asArray()
      .then(resp => {
        if (resp.length != 1) {
          alert("Username or Password is Incorrect");
        } else {
          Actions.app();
        }
      })
      .catch(err => {
        console.warn(err);
      });
  };

  renderTextInput = field => {
    const {
      meta: { touched, error },
      label,
      secureTextEntry,
      maxLength,
      keyboardType,
      placeholder,
      input: { onChange, ...restInput }
    } = field;
    return (
      <View>
        <InputText
          onChangeText={onChange}
          maxLength={maxLength}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          label={label}
          {...restInput}
        />
        {touched && error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  };

  render() {
    const { handleSubmit, loginUser } = this.props;
    //console.log(loginUser);
    return (
      <View style={styles.container}>
        {loginUser && loginUser.isLoading && <Loader />}
        <Logo />
        <Field
          name="email"
          placeholder="Email"
          component={this.renderTextInput}
        />
        <Field
          name="password"
          placeholder="Password"
          secureTextEntry={true}
          component={this.renderTextInput}
        />
        <View style={styles.signupTextCont1}>
          <Text style={styles.signupText}>Forget</Text>
          <TouchableOpacity onPress={this.signup}>
            <Text style={styles.signupButton}> Email</Text>
          </TouchableOpacity>
          <Text style={styles.signupText}> Or</Text>
          <TouchableOpacity onPress={this.signup}>
            <Text style={styles.signupButton}> Password</Text>
          </TouchableOpacity>
          <Text style={styles.signupText}> ?</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(this.onlogin)}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Dont Have An Account?</Text>
          <TouchableOpacity onPress={this.signup}>
            <Text style={styles.signupButton}> Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = "Name is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
  }
  if (!values.password) {
    errors.password = "Name is required";
  }
  return errors;
};

mapStateToProps = state => ({
  loginUser: state.authReducer.loginUser
});

mapDispatchToProps = dispatch => ({
  dispatch
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({
    form: "login",
    validate
  })
)(Input);
