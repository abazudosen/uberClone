import "react-native-gesture-handler";

import React, { useState, useEffect } from 'react';
import { StatusBar, Platform } from "react-native";
import * as Location from 'expo-location';
import {withAuthenticator} from 'aws-amplify-react-native'

import Router from "./src/navigation/Root";

import Amplify from 'aws-amplify'
import config from './src/aws-exports'
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

const App = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
        );
        return;
      } else {
        Location.requestForegroundPermissionsAsync();
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Router />
    </>
  );
};

export default withAuthenticator(App);
