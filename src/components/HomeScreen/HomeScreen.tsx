import {
  DEVICES_SCREEN,
  HANDLE_ROOM_SCREEN,
  PROFILE_SCREEN,
  ROOM_SCREEN
} from '../../core/navigation/navigation.const';
import {
  FlatList,
  Image,
  ImageBackground,
  RefreshControl,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  NavigationProp,
  ParamListBase
} from '@react-navigation/native';
import React, {
  FC,
  useEffect,
  useState
} from 'react';
import {
  currentHouseIdSelector,
  housesSelector
} from '../../core/houses/houses.selectors';
import {
  useDispatch,
  useSelector
} from 'react-redux';

import Avatar from '../widgets/Avatar/Avatar';
import { authUserSelector } from '../../core/users/users.selectors';
import { getCurrentUrl } from '../../core/tools/getCurrentUrl';
import { getHouses } from '../../core/houses/houses.actions';
import { getRooms } from '../../core/rooms/rooms.actions';
import { logOut } from '../../core/auth/auth.actions';
import { roomsSelector } from '../../core/rooms/rooms.selectors';
import { styles } from './HomeScreen.style';
import { tempHumSensorsSelector } from '../../core/devices/devices.selectors';

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

interface HomeScreenProps {
  navigation: NavigationProp<ParamListBase>
}

const HomeScreen: FC<HomeScreenProps> = props => {

  const {
    navigation
  } = props;

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const authUser = useSelector(authUserSelector);
  const rooms = useSelector(roomsSelector);
  const houses = useSelector(housesSelector);
  const currentHouseId = useSelector(currentHouseIdSelector);
  const tempHumSensors = useSelector(tempHumSensorsSelector);

  const getData = async () => {
    setIsLoading(true);
    await dispatch(getHouses());
    if (currentHouseId) {
      await dispatch(getRooms(currentHouseId));
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  const {
    name,
    photo,
  } = authUser || {};

  const roomsData = Object.keys(rooms)
    .sort((a, b) => {
      const roomIdA = rooms[a]._id;
      const roomIdB = rooms[b]._id;
      if (roomIdA < roomIdB) {
        return 1;
      }
      if (roomIdA > roomIdB) {
        return -1;
      }
      return 0;
    })
    .map((roomId, index) => {
      return { ...rooms[roomId] };
    });

  const hasDevices = true; //Object.keys(tempHumSensors).length

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.name}>Привіт, {name}</Text>
          <Text style={styles.welcome_title}>Офіс</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate(PROFILE_SCREEN, {})}>
          <Avatar
            photoId={photo}
            alt={name[0]?.toUpperCase() || ""}
            showBadge={true}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.rooms}>
        <Text style={styles.rooms_title}>Кімнати</Text>
        <FlatList
          data={roomsData}
          style={styles.rooms_list}
          keyExtractor={(item, index) => `${item._id}-${index}`}
          horizontal={true}
          renderItem={({ item: room, index }) => {
            const {
              id_Sensor,
              name,
              _id,
              image_id,
            } = room;

            const addRoom = _id === ""
              ? true
              : false;

            const quantityDeviceRoom = id_Sensor?.length || 0;

            return (
              <TouchableOpacity
                style={[styles.room, addRoom ? styles.room_add : {}]}
                activeOpacity={0.6}
                onPress={() => navigation.navigate(addRoom ? HANDLE_ROOM_SCREEN : ROOM_SCREEN, { roomId: _id, type: 'add' })}
              >
                {
                  addRoom
                    ? (
                      <View style={styles.room_add_wrapper}>
                        <View style={styles.room_add_content}>
                          <Text style={styles.room_add_title}>+</Text>
                        </View>
                      </View>
                    )
                    : (
                      <ImageBackground
                        source={
                          { uri: `${getCurrentUrl()}images/${image_id}` }
                        }
                        resizeMode="cover"
                        borderRadius={12}
                        style={styles.room_content}
                      >
                        <Text style={styles.room_name}>{name}</Text>
                        <Text style={styles.room_quantity_device}>{quantityDeviceRoom} пристроїв</Text>
                      </ImageBackground>
                    )
                }
              </TouchableOpacity>
            )
          }}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={async () => await getData()}
            />
          }
        />
      </View>
      <View style={styles.devices}>
        <Text style={styles.devices_title}>Пристрої</Text>
        {
          hasDevices
            ? (
              <FlatList
                data={catagoriesDevice.concat().reverse()} // TODO тимчасово
                style={styles.catagories_device_list}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                numColumns={2}
                renderItem={({ item: catagoryDevice, index }) => {
                  const {
                    id: categoryId,
                    name,
                    image_id,
                  } = catagoryDevice;

                  return (
                    <TouchableOpacity
                      style={styles.catagories_device}
                      activeOpacity={0.6}
                      onPress={() => {
                        navigation.navigate(DEVICES_SCREEN, {
                          categoryId,
                          title: name
                        })
                      }}
                    >
                      <View style={styles.catagories_device_content}>
                        <Image
                          style={styles.catagories_device_image}
                          source={
                            require('../../assets/images/tempsensor.jpg')
                          }
                        />
                        <Text style={styles.catagories_device_text}>{name}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                }}
              />
            )
            : (
              <View style={styles.no_devices}>
                <Text>Натисність "+", щоб додати пристрої</Text>
              </View>
            )
        }
      </View>
    </View >
  )
}

export default HomeScreen
