/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from "@react-navigation/native"
import StartPage from "./src/AuthPage/StartPage"
import MainPage from "./src/MainPage/MainPage"
import DetailPage from "./src/DetailPage/DetailPage"
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start" screenOptions={{ headerShown: false}}>
        <Stack.Screen name="Home" component={MainPage} />
        <Stack.Screen name="Start" component={StartPage} />
        <Stack.Screen name="Detail" component={DetailPage} />
      </Stack.Navigator>
      
    </NavigationContainer>

  );
};



export default App;
