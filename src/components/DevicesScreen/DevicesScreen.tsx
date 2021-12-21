import {
  FlatList,
  RefreshControl,
  View
} from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';

import Header from '../widgets/Header/Header';
import { MainStackParamList } from '../Navigation/MainStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import TempHumSensor from '../widgets/TempHumSensor/TempHumSensor';
import { getTemperatureSensors } from '../../core/devices/devices.actions';
import { styles } from './DevicesScreen.style';
import { tempHumSensorsSelector } from '../../core/devices/devices.selectors';

type Props = NativeStackScreenProps<MainStackParamList, 'Devices'>;

interface DevicesScreenProps {
  navigation: Props['navigation'],
  route: Props['route']
}

const DevicesScreen: FC<DevicesScreenProps> = props => {

  const {
    route,
    navigation,
  } = props;

  const {
    categoryId = "",
    title = ""
  } = route.params;

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useDispatch();

  const tempHumSensors = useSelector(tempHumSensorsSelector);

  const devices = Object.keys(tempHumSensors)?.length
    ? Object.keys(tempHumSensors)
      .filter((tempHumSensorId) => tempHumSensorId !== "")
      .map((tempHumSensorId) => {
        return { ...tempHumSensors[tempHumSensorId] }
      })
    : [];

  const getDevices = async () => {
    if (!devices.length) {
      setIsLoading(true);
      await dispatch(getTemperatureSensors());
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getDevices();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title={title}
        onBack={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <FlatList
          data={devices}
          style={styles.device_list}
          numColumns={2}
          keyExtractor={(item, index) => `${item._id}-${index}`}
          renderItem={({ item, index }) => (
            <TempHumSensor
              {...item}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={async () => await getDevices()}
            />
          }
        />
      </View>
    </View>
  )
}

export default DevicesScreen;