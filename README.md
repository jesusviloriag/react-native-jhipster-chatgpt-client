# react-native-jhipster-chatgpt-client
A mobile client with a java backend that connects to ChatGPT API

Run in Android

```
npx react-native run-android
```

Run in iOS

```
npx react-native run-ios
```

Run Backend

```
cd backend
./mvnw
npm start
```

Default accounts for login are:

```
username: admin, password: admin
username: user, password: user
```

Add your OpenAI key into the file:

```
react-native-jhipster-chatgpt-client\Backend\src\main\java\com\guaire\mobilechatgptclient\web\rest\ChatResource.java

Line: 80

ChatGPT chatGPT = ChatGPT.builder()
    .apiKey("<YOUR OPENAI KEY HERE>")
    .build()
    .init();
```

![alt text](https://i.imgur.com/3PGn4oE.png)
![alt text](https://i.imgur.com/tSzejpY.png)
![alt text](https://i.imgur.com/jTeCTtC.png)

If you intercept the chat messages in the backend, you can do stuff like this:

```Java
String res = chatGPT.chat(text + " (please answer as if you were Legolas)");
```

![alt text](https://i.imgur.com/OKh2eDh.png)
