import {
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTemperatureSensors } from '../../core/devices/devices.actions';
import { getUser } from '../../core/users/users.actions';
import { logOut } from '../../core/auth/auth.actions';
import { styles } from './HomeScreen.style';
import { tempHumSensorsSelector } from '../../core/devices/devices.selectors';

const HomeScreen: FC = () => {
  const dispatch = useDispatch();
  const tempHumSensors = useSelector(tempHumSensorsSelector);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getData = async () => {
    setIsLoading(true);
    await Promise.all([
      dispatch(getTemperatureSensors()),
      dispatch(getUser()),
    ]);
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={async () => await getData()}
        />
      }
    >
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
        {
          Object.keys(tempHumSensors).map((tempHumSensorsId, index) => {
            const {
              Sensor,
              id_Sensor
            } = tempHumSensors[tempHumSensorsId] || {};
            return (
              <View style={{
                backgroundColor: 'white',
                height: 80,
                width: 160,
                borderRadius: 16,
                margin: 5,
              }} key={`${tempHumSensorsId}-${index}`}>
                <Text>{Sensor}</Text>
              </View>
            )
          })
        }
      </View>
      <TouchableOpacity onPress={async () => { await dispatch(logOut()) }}>
        <Text>Вийти</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default HomeScreen
