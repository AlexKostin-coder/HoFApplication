import {
  HOME_SCREEN,
  LINK_DEVICES_SCREEN,
  NOTIFICATIONS_SCREEN
} from '../../core/navigation/navigation.const';
import React, { FC } from 'react';

import AddIcon from '../../assets/icons/add.svg';
import HomeIcon from '../../assets/icons/home.svg';
import HomeScreen from '../HomeScreen/HomeScreen';
import LinkDevicesScreen from '../LinkDevicesScreen/LinkDevicesScreen';
import MailIcon from '../../assets/icons/mail.svg';
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
      <Tab.Screen options={{
        tabBarLabel: "Дім",
        tabBarIcon: ({ color, size }) => (
          <HomeIcon color={color} width={size} height={size} />
        ),
      }}
        name={HOME_SCREEN}
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Додати пристрій",
          tabBarIcon: ({ color, size }) => (
            <AddIcon color={color} width={size} height={size} />
          ),
        }}
        name={LINK_DEVICES_SCREEN}
        component={LinkDevicesScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Сповіщення",
          tabBarIcon: ({ color, size }) => (
            <MailIcon color={color} width={size} height={size} />
          ),
          tabBarBadge: 3,
        }}
        name={NOTIFICATIONS_SCREEN}
        component={NotificationScreen}
      />
    </Tab.Navigator>
  );
}

export default MainTab;