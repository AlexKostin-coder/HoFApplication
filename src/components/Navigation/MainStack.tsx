import {
  DEVICES_SCREEN,
  HANDLE_ROOM_SCREEN,
  HOUSES_SCREEN,
  MAIN_TAB,
  PROFILE_SCREEN,
  ROOM_SCREEN,
  SEGMENT_CLOCK_SCREEN,
} from '../../core/navigation/navigation.const';
import React, { FC } from 'react';

import DevicesScreen from '../DevicesScreen/DevicesScreen';
import HandleRoomScreen from '../RoomScreen/HandleRoomScreen';
import HousesScreen from '../HousesScreen/HousesScreen';
import MainTab from './MainTab';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import RoomScreen from '../RoomScreen/RoomScreen';
import SegmentClockScreen from '../SegmentClockScreen/SegmentClockScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type MainStackParamList = {
  MainTab: {},
  Devices: {
    categoryId: string,
    title: string,
    alias: string,
  },
  Room: {
    roomId: string,
    type: 'edit' | 'add',
  },
  HandleRoom: {
    roomId: string,
    type: 'edit' | 'add',
  },
  Profile: {},
  Houses: {},
  SegmentClock: {},
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={MAIN_TAB} component={MainTab} />
      <Stack.Screen name={DEVICES_SCREEN} component={DevicesScreen} />
      <Stack.Screen name={ROOM_SCREEN} component={RoomScreen} />
      <Stack.Screen name={HANDLE_ROOM_SCREEN} component={HandleRoomScreen} />
      <Stack.Screen name={PROFILE_SCREEN} component={ProfileScreen} />
      <Stack.Screen name={HOUSES_SCREEN} component={HousesScreen} />
      <Stack.Screen name={SEGMENT_CLOCK_SCREEN} component={SegmentClockScreen} />
    </Stack.Navigator>
  )
};

export default MainStack;