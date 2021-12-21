import {
  DEVICES_SCREEN,
  HOME_SCREEN
} from '../../core/navigation/navigation.const';
import React, { FC } from 'react';

import DevicesScreen from '../DevicesScreen/DevicesScreen';
import HomeScreen from '../HomeScreen/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type MainStackParamList = {
  Home: {},
  Devices: { 
    categoryId: String 
    title: String,
  }
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={HOME_SCREEN} component={HomeScreen} />
      <Stack.Screen name={DEVICES_SCREEN} component={DevicesScreen} />
    </Stack.Navigator>
  )
};

export default MainStack;