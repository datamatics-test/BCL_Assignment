import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Field, reduxForm } from 'redux-form';
import {connect} from "react-redux";
import {compose} from "redux";
import Confetti from "react-native-confetti";
import Logo from '../component/Logo';
import Form from '../component/Form';
import InputText from "../component/InputText";
import {createNewUser} from "../action/auth.actions";
import Loader from "../component/Loader";
import {ErrorUtils} from "../utils/auth.utils";
import { Stitch, RemoteMongoClient  } from "mongodb-stitch-react-native-sdk";
import {Actions} from 'react-native-router-flux';

const styles = StyleSheet.create({
  container : {
    backgroundColor:'white',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  signupTextCont: {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
  	color:'#898989',
  	fontSize:16
  },
  signupButton: {
  	color:'#31C5C3',
  	fontSize:16,
  	fontWeight:'500'
  },
  button: {
    width:281,
    height:48,
    backgroundColor:'#31C5C3',
    borderRadius: 30,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
  errorText: {
      color: "#898989",
      fontSize:14,
      paddingHorizontal:16,
      paddingBottom: 8
  },
  inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10
  }
});

class Signup extends Component {

  goBack() {
      Actions.pop();
  }

  
  onSignUp = (values) => {
    
    const stitchAppClient = Stitch.defaultAppClient;
    const mongoClient = stitchAppClient.getServiceClient(
      RemoteMongoClient.factory,
      "userlogin"
    );
    const db = mongoClient.db("mern-auth");
    const validates = db.collection("users");
    
      validates
      .find({ email: values.email}, { sort: { date: -1 } })
      .asArray()
      .then(resp => {
        if(resp.length!=1){
        this.registerUser(values);
      }else{
        alert("Email Id Already Registered");
        Actions.pop();
      }
      })
      .catch(err => {
        console.warn(err);
      });
  }
  registerUser(values){
    console.log(values);
    const stitchAppClient = Stitch.defaultAppClient;
    const mongoClient = stitchAppClient.getServiceClient(
      RemoteMongoClient.factory,
      "userlogin"
    );
    const db = mongoClient.db("mern-auth");
    const validates = db.collection("users");
    
    validates
    .insertOne({
      name:values.name,
      email:values.email,
      password:values.password,
      date: new Date()
    })
    .then(() => {
      if (this._confettiView) {
        this._confettiView.startConfetti();
      }
      console.log("added");
      alert("Successfully Register");
      Actions.pop();
    })
    .catch(err => {
      console.warn(err);
    });

  }
  renderTextInput = (field) => {
        const {meta: {touched, error}, label, secureTextEntry, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
        return (
            <View>
              <InputText
                  onChangeText={onChange}
                  maxLength={maxLength}
                  placeholder={placeholder}
                  keyboardType={keyboardType}
                  secureTextEntry={secureTextEntry}
                  label={label}
                  {...restInput} />
            {(touched && error) && <Text style={styles.errorText}>{error}</Text>}
            </View>
        );
  }

	render() {
    const { handleSubmit, createUser} = this.props;
		return(
			<View style={styles.container}>
        {createUser.isLoading && <Loader />}
				<Logo/>
        <Field
            name="name"
            placeholder="Name"
            component={this.renderTextInput} />
        <Field
            name="email"
            placeholder="Email"
            component={this.renderTextInput} />
        <Field
            name="password"
            placeholder="Password"
            secureTextEntry={true}
            component={this.renderTextInput} />
        <TouchableOpacity style={styles.button} onPress={handleSubmit(this.onSignUp)}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
				<View style={styles.signupTextCont}>
					<Text style={styles.signupText}>Already have an account?</Text>
					<TouchableOpacity onPress={this.goBack}><Text style={styles.signupButton}> Sign in</Text></TouchableOpacity>
				</View>
			</View>
			)
	}
}

const validate = (values) => {
    const errors = {};
    if(!values.name) {
        errors.name = "Name is required"
    }
    if(!values.email) {
        errors.email = "Email is required"
    }
    if(!values.password) {
        errors.password = "Password is required"
    }
    return errors;
};

mapStateToProps = (state) => ({
    createUser: state.authReducer.createUser
})

mapDispatchToProps = (dispatch) => ({
    dispatch
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "register",
    validate
  })
)(Signup);
