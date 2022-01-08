import React,
{
  FC,
  useEffect
} from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Header from '../widgets/Header/Header';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TabParamList } from '../Navigation/MainTab';
import WifiManager from "react-native-wifi-reborn";
import { requestLocationPermission } from '../../handlers/PermissionAndroid';
import { styles } from './LinkDevicesScreen.style';

type Props = NativeStackScreenProps<TabParamList, 'LinkDevices'>;

interface LinkDevicesScreenProps {
  navigation: Props['navigation'],
}

const LinkDevicesScreen: FC<LinkDevicesScreenProps> = props => {

  const {
    navigation
  } = props;

  const findAndLinkDevice = async () => {
    const result = await requestLocationPermission();
    if (result) {
      const list = await WifiManager.loadWifiList();
      const hasDevice = list.map(({ SSID }) => SSID).includes("ESPAP");
      // const resultConnect = await WifiManager.connectToProtectedSSID("ESPAP", "", true);
      console.log(hasDevice);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={findAndLinkDevice}>
        <Text style={{ color: 'black' }}>Лінк</Text>
      </TouchableOpacity>
    </View>
  )
};

export default LinkDevicesScreen;
