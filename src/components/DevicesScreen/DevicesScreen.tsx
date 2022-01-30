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
import { styles } from './DevicesScreen.style';

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
    title = "",
    alias = "",
  } = route.params;

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useDispatch();

  const getDevices = async () => {

  }

  useEffect(() => {
    getDevices();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title={title}
      />
      <View style={styles.content}>
        {/* <FlatList
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
        /> */}
      </View>
    </View>
  )
}

export default DevicesScreen;