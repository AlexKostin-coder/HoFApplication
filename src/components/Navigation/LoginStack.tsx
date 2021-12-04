import { LOGIN_SCREEN } from '../../core/navigation/navigation.const';
import LoginScreen from '../LoginScreen/LoginScreen';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type MainStackParamList = {
  Login: {},
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
    </Stack.Navigator>
  )
};

export default LoginStack;