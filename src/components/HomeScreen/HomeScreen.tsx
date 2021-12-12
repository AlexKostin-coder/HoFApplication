import {
  Avatar,
  Image,
} from 'native-base';
import {
  FlatList,
  ImageBackground,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { authUserSelector } from '../../core/users/users.selectors';
import { getRooms } from '../../core/rooms/rooms.actions';
import { getTemperatureSensors } from '../../core/devices/devices.actions';
import { getUser } from '../../core/users/users.actions';
import { logOut } from '../../core/auth/auth.actions';
import { roomsSelector } from '../../core/rooms/rooms.selectors';
import { styles } from './HomeScreen.style';
import { tempHumSensorsSelector } from '../../core/devices/devices.selectors';

const catagoriesDevice = [
  { id: '', name: '', image_id: '' },
  { id: '1', name: 'Температура/Вологість', image_id: 'tempsensor.jpg' },
];

const HomeScreen: FC = () => {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getData = async () => {
    setIsLoading(true);
    await Promise.all([
      dispatch(getUser()),
      dispatch(getRooms()),
      dispatch(getTemperatureSensors()),
    ]);
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  const tempHumSensors = useSelector(tempHumSensorsSelector);
  const authUser = useSelector(authUserSelector);
  const rooms = useSelector(roomsSelector);


  const {
    name,
    user_id,
    photo,
    email,
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.name}>Привіт, {name}</Text>
          <Text style={styles.welcome_title}>Офіс</Text>
        </View>
        <TouchableOpacity>
          <Avatar
            bg="lightBlue.400"
            source={{
              uri: `http://hofenterprise.com/image/${photo ? photo : ''}`,
            }}
          >
            {name ? name[0].toUpperCase() : ''}
            <Avatar.Badge bg="green.500" />
          </Avatar>
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
            } = room;

            const addRoom = _id === ""
              ? true
              : false;

            const quantityDeviceRoom = id_Sensor?.length || 0;

            return (
              <TouchableOpacity
                style={[styles.room, addRoom ? styles.room_add : {}]}
                activeOpacity={0.6}
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
                          // { uri: "https://reactjs.org/logo-og.png" }
                          require('../../assets/images/test-room.jpg')
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
        <FlatList
          data={catagoriesDevice.concat().reverse()} // TODO тимчасово
          style={styles.catagories_device_list}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          numColumns={catagoriesDevice.length > 2 ? 2 : catagoriesDevice.length <= 2 ? 1 : 0}
          renderItem={({ item: catagoryDevice, index }) => {
            const {
              id,
              name,
              image_id,
            } = catagoryDevice;

            const addCategoryDevice = id === ""
              ? true
              : false;

            return (
              <TouchableOpacity
                style={[styles.catagories_device, addCategoryDevice ? styles.room_add : {}]}
                activeOpacity={0.6}
              >
                {
                  addCategoryDevice ? (
                    <View style={styles.room_add_wrapper}>
                      <View style={styles.room_add_content}>
                        <Text style={styles.room_add_title}>+</Text>
                      </View>
                    </View>
                  )
                    : (
                      <View style={styles.catagories_device_content}>
                        <Image
                          style={styles.catagories_device_image}
                          source={
                            require('../../assets/images/tempsensor.jpg')
                          }
                          alt='image_id'
                        />
                        <Text>{name}</Text>
                      </View>
                    )
                }
              </TouchableOpacity>
            )
          }}
        />
      </View>
    </View >
  )
}

export default HomeScreen
