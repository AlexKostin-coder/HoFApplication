import React, { FC } from 'react';

import HomeScreen from '../HomeScreen/HomeScreen';
import LinkDevicesScreen from '../LinkDevicesScreen/LinkDevicesScreen';
import NotificationScreen from '../NotificationScreen/NotificationScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

type TabParamList = {
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
      <Tab.Screen options={{ title: "Дім" }} name="Home" component={HomeScreen} />
      <Tab.Screen options={{ title: "Додати пристрій" }} name="LinkDevices" component={LinkDevicesScreen} />
      <Tab.Screen options={{ title: "Сповіщення" }} name="Notifications" component={NotificationScreen} />
    </Tab.Navigator>
  );
}

export default MainTab;