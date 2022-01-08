import {
  HOME_SCREEN,
  LINK_DEVICES_SCREEN,
  NOTIFICATIONS_SCREEN
} from '../../core/navigation/navigation.const';
import React, { FC } from 'react';

import HomeScreen from '../HomeScreen/HomeScreen';
import LinkDevicesScreen from '../LinkDevicesScreen/LinkDevicesScreen';
import NotificationScreen from '../NotificationScreen/NotificationScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export type TabParamList = {
  Home: {},
  LinkDevices: {};
  Notifications: {}
};

const Tab = createBottomTabNavigator<TabParamList>();

const MainTab: FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen options={{ title: "Дім" }} name={HOME_SCREEN} component={HomeScreen} />
      <Tab.Screen options={{ title: "Додати пристрій" }} name={LINK_DEVICES_SCREEN} component={LinkDevicesScreen} />
      <Tab.Screen options={{ title: "Сповіщення" }} name={NOTIFICATIONS_SCREEN} component={NotificationScreen} />
    </Tab.Navigator>
  );
}

export default MainTab;