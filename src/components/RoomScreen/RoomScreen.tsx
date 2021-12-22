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

import Header from '../widgets/Header/Header';
import { MainStackParamList } from '../Navigation/MainStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import TempHumSensor from '../widgets/TempHumSensor/TempHumSensor';
import Temperature from '../../assets/icons/temperature.svg';
import { getDevicesRoom } from '../../core/rooms/rooms.actions';
import { roomsSelector } from '../../core/rooms/rooms.selectors';
import { styles } from './RoomScreen.style';
import { tempHumSensorsSelector } from '../../core/devices/devices.selectors';

type Props = NativeStackScreenProps<MainStackParamList, 'Room'>;

interface RoomScreenProps {
  navigation: Props['navigation'],
  route: Props['route']
}

const catagoriesDevice = [
  {
    id: '1',
    name: 'Температура/Вологість',
    image_id: 'tempsensor.jpg',
    type: 'temp/hum'
  },
  // {
  //   id: '12',
  //   name: 'Температура/Вологість',
  //   image_id: 'tempsensor.jpg',
  //   type: 'temp/hum'
  // },
];

const RoomScreen: FC<RoomScreenProps> = props => {
  const {
    navigation,
    route,
  } = props;

  const {
    roomId,
    name,
  } = route.params;

  const devices = useSelector(tempHumSensorsSelector);
  const rooms = useSelector(roomsSelector);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const currentRoom = rooms[String(roomId)];

  const devicesRoom = currentRoom.id_Sensor?.length &&
    Object.keys(devices).length
    ? currentRoom.id_Sensor.map((id_Sensor) => devices[id_Sensor] || {})
    : [];

  const getDataRoom = async () => {
    setIsLoading(true);
    await dispatch(getDevicesRoom(roomId));
    setIsLoading(false);
  }

  useEffect(() => {
    getDataRoom();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title={name}
        onBack={() => navigation.goBack()}
        onHandle={() => { console.log('12'); }}
      />
      <View style={styles.content}>
        <View style={styles.categories}>
          <FlatList
            data={catagoriesDevice}
            horizontal={true}
            keyExtractor={(item, index) => `${item.id}-${index}`}
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
            data={devicesRoom}
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