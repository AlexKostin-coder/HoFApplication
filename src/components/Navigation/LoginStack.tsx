import {
  LOGIN_SCREEN,
  REGISTRATION_SCREEN
} from '../../core/navigation/navigation.const';

import LoginScreen from '../LoginScreen/LoginScreen';
import React from 'react';
import RegistrationScreen from '../RegistrationScreen/RegistrationScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type MainStackParamList = {
  Login: {},
  Registration: {}
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={REGISTRATION_SCREEN} component={RegistrationScreen} />
    </Stack.Navigator>
  )
};

export default LoginStack;