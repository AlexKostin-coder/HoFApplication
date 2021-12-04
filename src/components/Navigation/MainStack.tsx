import { HOME_SCREEN } from '../../core/navigation/navigation.const';
import HomeScreen from '../HomeScreen/HomeScreen';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type MainStackParamList = {
  Home: {},
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={HOME_SCREEN} component={HomeScreen} />
    </Stack.Navigator>
  )
};

export default MainStack;