import {
  Actionsheet,
  CheckIcon,
  ChevronDownIcon,
  Divider,
  ScrollView,
  useDisclose
} from 'native-base';
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
  HANDLE_ROOM_SCREEN,
  HOUSES_SCREEN,
  PROFILE_SCREEN,
  ROOM_SCREEN,
  SEGMENT_CLOCK_SCREEN
} from '../../core/navigation/navigation.const';
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
  getHouses,
  setCurrentHouse
} from '../../core/houses/houses.actions';
import {
  useDispatch,
  useSelector
} from 'react-redux';

import Avatar from '../widgets/Avatar/Avatar';
import TempHumSensor from '../widgets/TempHumSensor/TempHumSensor';
import { authUserSelector } from '../../core/users/users.selectors';
import { declOfNum } from '../../core/tools/declOfNum';
import { getCurrentUrl } from '../../core/tools/getCurrentUrl';
import { getRoomsByParam } from '../../core/rooms/rooms.actions';
import {
  getTemperatureSensorsByParam,
  getSegmentClocks
} from '../../core/devices/devices.actions';
import { roomsSelector } from '../../core/rooms/rooms.selectors';
import { styles } from './HomeScreen.style';
import {
  temperatureSensorsSelector,
  segmentClocksSelector,
} from '../../core/devices/devices.selectors';
import SegmentClock from '../widgets/SegmentClock/SegmentClock';
import { getUser } from '../../core/users/users.actions';

interface HomeScreenProps {
  navigation: NavigationProp<ParamListBase>
}

const HomeScreen: FC<HomeScreenProps> = props => {

  const {
    navigation
  } = props;

  const dispatch = useDispatch();

  const authUser = useSelector(authUserSelector);
  const rooms = useSelector(roomsSelector);
  const houses = useSelector(housesSelector);
  const currentHouseId = useSelector(currentHouseIdSelector);
  const temperatureSensors = useSelector(temperatureSensorsSelector);
  const segmentClocks = useSelector(segmentClocksSelector);

  const {
    temperature_sensors = [],
    segment_clocks = [],
    rooms: roomsCurrentHouse = [],
  } = houses[currentHouseId] || {};

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getData = async () => {
    setIsLoading(true);
    try {
      await dispatch(getUser());
      await dispatch(getHouses());
      if (currentHouseId) {
        dispatch(getTemperatureSensorsByParam({ house_id: currentHouseId }));
        dispatch(getSegmentClocks({ house_id: currentHouseId }));
        dispatch(getRoomsByParam({ house_id: currentHouseId }));
      }
    } catch (e) {
      console.log({ e });
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, [currentHouseId]);

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();

  const selectCurrentHouseId = (house_id: string) => {
    dispatch(setCurrentHouse(house_id));
    onClose();
    getData();
  }

  const {
    name,
    photo,
  } = authUser || {};

  const roomsData = Object.keys(rooms).length
    ? Object.keys(rooms)
      .sort((a, b) => {
        const roomAName = rooms[a].name;
        const roomBName = rooms[b].name;
        if (roomAName < roomBName) {
          return 1;
        }
        if (roomAName > roomBName) {
          return -1;
        }
        return 0;
      })
      .filter((room_id) => {
        const { house } = rooms[room_id];
        return house === currentHouseId || house === ""
      })
      .map((roomId, index) => {
        return { ...rooms[roomId] };
      })
    : [];

  const housesData = Object.keys(houses).length
    ? Object.keys(houses)
      .filter((house_id) => house_id !== "")
      .map((house_id) => ({ ...houses[house_id] }))
    : [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.name}>Привіт, {name}</Text>
          <TouchableOpacity style={styles.wrapper_home_name} onPress={onOpen}>
            <Text style={styles.welcome_title}>{houses[currentHouseId]?.name || ""}</Text>
            <ChevronDownIcon size="5" />
          </TouchableOpacity>
          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
              {
                housesData.map((house) => {
                  const {
                    name,
                    _id,
                  } = house;
                  return (
                    <Actionsheet.Item
                      key={_id}
                      endIcon={<CheckIcon size={currentHouseId === _id ? "5" : "0"} />}
                      onPress={() => selectCurrentHouseId(_id)}
                    >
                      {name}
                    </Actionsheet.Item>
                  )
                })
              }
              <Divider />
              <Actionsheet.Item
                justifyContent={"center"}
                onPress={() => { onClose(); navigation.navigate(HOUSES_SCREEN); }}
              >
                Керування будинками
              </Actionsheet.Item>
            </Actionsheet.Content>
          </Actionsheet>
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
              name,
              _id,
              image_id,
              temperature_sensors = [],
              segment_clocks = [],
            } = room;

            const addRoom = _id === ""
              ? true
              : false;

            const count_devices = temperature_sensors.length + segment_clocks.length;

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
                        <Text style={[styles.room_name, !image_id ? { color: 'black' } : {}]}>{name}</Text>
                        <Text style={[styles.room_quantity_device, !image_id ? { color: 'grey' } : {}]}>{count_devices} {declOfNum(count_devices, ['пристрій', 'пристрої', 'пристроїв'])}</Text>
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
        <ScrollView contentContainerStyle={{ paddingTop: 12 }}>
          {
            segment_clocks.map((segment_clock_id) => (
              <SegmentClock
                key={segment_clock_id}
                {...segmentClocks[segment_clock_id]}
                onPress={() => navigation.navigate(SEGMENT_CLOCK_SCREEN, { segment_clock_id })}
              />
            ))
          }
          {
            temperature_sensors.map((temperature_sensor_id) => (
              <TempHumSensor
                key={temperature_sensor_id}
                {...temperatureSensors[temperature_sensor_id]}
              />
            ))
          }
        </ScrollView>
      </View>
    </View >
  )
}

export default HomeScreen
