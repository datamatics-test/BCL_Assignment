/**
 * Created By: Mayank Chawla
 * Desciption: This is login page, user can login into app or can sign up
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Alert
} from 'react-native';
import {connect} from "react-redux";
import {compose} from "redux";
import { Field, reduxForm } from 'redux-form';
import InputText from "../component/InputText";
import Logo from '../component/Logo';
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
  constructor(props) {
    super(props);    this.state = {
      loading: false, //setting default value false of loader
      
    }
  }
	signup() {
		Actions.signup()
	}

  /**
   * used for showing loader, loader is displayed on setting loading value=true
   */
  onlogin = (values) => {
    this.setState({
      loading:true
    }
      

    )
    const stitchAppClient = Stitch.defaultAppClient;
    const mongoClient = stitchAppClient.getServiceClient(
      RemoteMongoClient.factory,
      "userlogin"
    );
    const db = mongoClient.db("mern-auth");  //Establising connection with MongoDB Atlas account
    const validates = db.collection("users"); //fetching User Collection
    
      validates
      .find({ email: values.email, password:values.password}, { sort: { date: -1 } }) //validating user
      .asArray()
      .then(resp => {
        if(resp.length!=1){ // if response lenth is not equal to 1 then user is not valid
          this.setState({
            loading:false //disabling loader screen
          })
        alert("Username or Password is Incorrect");
        
      }else{ // if user is valid
        this.setState({
          loading:false  //disabling loader screen
        })
        Actions.app(); //Routing to Profile page
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
            component={this.renderTextInput} />
            <Loader
          loading={this.state.loading} />
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
					<Text style={styles.signupText}>Don't Have An Account?</Text>
					<TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}> Signup</Text></TouchableOpacity>
				</View>
			</View>
			)
	}
}
/**
 * Validations for user id and password entered
 */
const validate = (values) => {
    const errors = {};
    if(!values.email) {
        errors.email = "Email is required"
    }
    if(!values.password) {
        errors.password = "Password is required"
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
