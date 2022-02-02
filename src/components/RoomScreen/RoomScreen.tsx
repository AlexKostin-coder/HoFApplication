import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, {
  FC,
  useEffect,
  useState,
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';

import { HANDLE_ROOM_SCREEN } from '../../core/navigation/navigation.const';
import Header from '../widgets/Header/Header';
import { MainStackParamList } from '../Navigation/MainStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Settings from '../../assets/icons/settings.svg';
import TempHumSensor from '../widgets/TempHumSensor/TempHumSensor';
import Temperature from '../../assets/icons/temperature.svg';
import { categoryDevicesSelector } from '../../core/categoryDevices/categoryDevices.selectors';
import { getRoomsByParam } from '../../core/rooms/rooms.actions';
import { getTemperatureSensorsByParam } from '../../core/devices/devices.actions';
import { roomsSelector } from '../../core/rooms/rooms.selectors';
import { styles } from './RoomScreen.style';
import { temperatureSensorsSelector } from '../../core/devices/devices.selectors';

type Props = NativeStackScreenProps<MainStackParamList, 'Room'>;

interface RoomScreenProps {
  navigation: Props['navigation'],
  route: Props['route']
}

const RoomScreen: FC<RoomScreenProps> = props => {
  const {
    navigation,
    route,
  } = props;

  const {
    roomId,
  } = route.params;

  const rooms = useSelector(roomsSelector);
  const categoryDevices = useSelector(categoryDevicesSelector);
  const temperatureSensors = useSelector(temperatureSensorsSelector);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    _id,
    name,
    house,
    temperature_sensors,
    image_id,
  } = rooms[String(roomId)] || {};

  const getDataRoom = async () => {
    setIsLoading(true);
    try {
      await dispatch(getRoomsByParam({ room_id: _id }));
      await dispatch(getTemperatureSensorsByParam({ room_id: _id }));
    } catch (e) {
      console.log({ e });
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getDataRoom();
  }, []);

  const temperatureSensorsData = temperature_sensors && temperature_sensors.length
    ? temperature_sensors.map((temperature_sensor_id) => ({ ...temperatureSensors[temperature_sensor_id] }))
    : [];

  const categoryDevicesData = Object.keys(categoryDevices).length
    ? Object.keys(categoryDevices)
      .filter((category_devices_id) => category_devices_id !== "")
      .map((category_devices_id) => ({ ...categoryDevices[category_devices_id] }))
    : [];

  return (
    <View style={styles.container}>
      <Header
        title={name}
        onHandle={() => navigation.navigate(HANDLE_ROOM_SCREEN, { roomId: _id, type: 'edit' })}
        iconHandle={
          <Settings
            width={18}
            height={18}
            fill={'#333333'}
          />
        }
      />
      <View style={styles.content}>
        <View style={styles.categories}>
          <FlatList
            data={categoryDevicesData}
            horizontal={true}
            keyExtractor={(item, index) => item._id}
            renderItem={({ item, index }) => (
              <View style={styles.wrapper_category}>
                <TouchableOpacity style={styles.category}
                >
                  <Temperature
                    width={40}
                    height={40}
                    fill={'#333333'}
                  />
                </TouchableOpacity>
                <Text style={styles.category_title}>{item.name}</Text>
              </View>
            )}
          />
        </View>
        <View style={styles.devices}>
          <FlatList
            data={temperatureSensorsData}
            numColumns={2}
            keyExtractor={(item, index) => `${item._id}-${index}-${roomId}`}
            renderItem={({ item, index }) => (
              <TempHumSensor
                {...item}
              />
            )}

            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={async () => await getDataRoom()}
              />
            }
          />
        </View>
      </View>
    </View>
  )
}

export default RoomScreen;
