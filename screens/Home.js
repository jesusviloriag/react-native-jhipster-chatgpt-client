/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Image
} from 'react-native';

import { useEffect, useState } from 'react';

import MobileChat from '../MobileChat';

import Navigator from 'react-native-screen-navigator';

function Home(): JSX.Element {

  const [text, setText] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    MobileChat.init();
    fetchChats();
  }, []);

  const fetchChats = () => {

    MobileChat.instance.getAllUserChats().then((chats) => {
      setChats(chats);
    })

  }

  const showChatStream = () => {
    return chats?.map((item, key) => {
      return <View 
      key={key}
      style={{
        backgroundColor: item.author == "Me" ? 'white' : 'lightgray',
        padding: 15
      }}><Text style={{fontSize: 22}}><Text style={{fontWeight: 'bold'}}>{item.author}:</Text> {item.text}</Text></View>
    })
  }

  const onChangeText = () => {
    setText()
  }

  const sendChat = () => {
    setShowOverlay(true);
    MobileChat.instance.sendChat(text).then((response) => {
      console.log("RESPONSE",response);
      setChats(response);
      setShowOverlay(false);
    });
    setText("");
  }
  
  const handleKeyDown = function(e) {
    if(e.nativeEvent.key == "Return"){
      alert("ENTER PRESSED")
      sendChat(text)
    }
  }

  const showLoadingOverlay = () => {
    if(showOverlay) {
      return(
        <View style={{position: 'absolute', backgroundColor: 'rgba(0,0,0,0.75)', width: '100%', height: '100%', alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
          <View style={{backgroundColor: 'rgba(255,255,255,0.75)', padding: 35, borderRadius: 15}}> 
            <Text style={{fontSize: 28}}>Loading...</Text>
          </View>
        </View>
      )
    } else {
      return null;
    }
  }

  return (
    <KeyboardAvoidingView behavior="padding"
    keyboardVerticalOffset={0}
    style={{
      backgroundColor: 'white',
      height: Dimensions.get("window").height
    }}>
      <Text style={{fontSize: 30, padding: 15}}>Home</Text>
      <ScrollView style={{
        backgroundColor: 'white',
        borderRadius: 15,
        flex: 1
      }}
      ref={ref => {this.scrollView = ref}}
      onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}>
        {showChatStream()}
      </ScrollView>
      <View
        style={{padding: 5, borderTopWidth: 1, borderTopColor: 'lightgray', flexDirection: 'row'}}>
        <TextInput
          style={{
            backgroundColor: 'white',
            fontSize: 18,
            marginBottom: 25,
            flex: 1
          }}
          placeHolder={'Say something to ChatGPT'}
          onChangeText={setText}
          value={text}
          onKeyPress={handleKeyDown}
        />
        <TouchableOpacity onPress={() => sendChat(text)} style={{alignContent: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightblue', width: 50, height: 50, borderRadius: 25}}>
          <Image style={{height: 30, width: 30, marginLeft: -3, marginBottom: -3}} source={require('../assets/send.png')}></Image>
        </TouchableOpacity>
      </View>
      {showLoadingOverlay()}
    </KeyboardAvoidingView>
  );
}

export default Home;
