/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Button
} from 'react-native';

import { useEffect, useState } from 'react';

import Home from './Home'

import MobileChat from '../MobileChat';
import GTextField from '../components/GTextField';
import GText from '../components/GText';
import GButton from '../components/GButton';

function Login(): JSX.Element {

  useEffect(() => {
    MobileChat.init();
    setTimeout( () => {
      if(MobileChat.instance.user) {
        setShowLogin(false);
      } else {
        setShowLogin(true);
      }     
    }, 500)
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(true);

  const clear = () => {
    setUsername('');
    setPassword('');
  }

  const login = () => {
    if(username && password) {
      MobileChat.login(username, password).then((response) => {
        if(response) {
          setShowLogin(false);
        } else {
          alert("Login failed please check login information")
        }
      });
    } else {
      alert("Please fill all the information")
    }
  }

  const register = () => {
    navigation.navigate("Register");
  }

  const showLoginScreen = () => {
    if(showLogin) {
      return (
        <ScrollView style={styles.mainContainer}>
        <View style={{flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
          <Image style={styles.splashLogo} source={require('../assets/chatgpt.png')}></Image>
          <GText text={"ChatGPT Client App"} style={{fontSize: 30, fontFamily: 'FishGrill', color: 'black', marginTop: 15}}></GText>
          <GText text="Please enter your information to log in" style={{fontSize: 12, color: 'black'}}></GText>
          <GTextField 
            onChangeText={text => setUsername(text)}
            label={"Username"} 
            placeholder={"Username"}>
          </GTextField>

          <GTextField 
            onChangeText={text => setPassword(text)}
            label={"Password"} 
            secureTextEntry={true} 
            placeholder={"Password"}
            value={password}>
          </GTextField>

          <GButton text="Create new account" onPress={() => register()} style={{
            width: '100%', 
            backgroundColor: 'transparent',
            shadowColor: undefined,
            shadowOffset: undefined,
            shadowOpacity: undefined,
            shadowRadius: undefined,
            elevation: undefined,
            marginTop: 5,
            marginBottom: -17
          }}
          textStyle={{
            textShadowColor: "rgba(0, 0, 0, 0.25)",
            textShadowOffset: {
              width: 0,
              height: 1,
            },
            textShadowRadius: 7,
            textDecorationLine: 'underline'
          }}></GButton>

          <View style={{flexDirection: 'row'}}>
            <GButton onPress={() => clear()} text="Cancel"></GButton>
            <GButton onPress={() => login()} text="Login" style={[styles.button,{marginLeft: 15}]}></GButton> 
          </View>
        </View>   

        <View style={{height: 500}}></View>     
      </ScrollView>
      )
    } else {
      return <Home></Home>;
    }
  }

  return (
    <SafeAreaView>
      {showLoginScreen()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#275a8a',
    padding: 10,
    marginTop: 25,
    borderRadius: 10,
    width: 75,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textField: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    width: 250
  },
  mainContainer: {
    alignContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#bad2e8'
  },
  splashLogo: {
    height: 75,
    width: 75,
    marginTop: 50
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Login;
