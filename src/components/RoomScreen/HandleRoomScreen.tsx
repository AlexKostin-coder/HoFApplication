import {
  Actionsheet,
  Divider,
  Menu,
  useDisclose
} from 'native-base';
import {
  Alert,
  Button,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import {
  CREATE_ROOM,
  UPLOAD_IMAGE_ROOM
} from '../../core/rooms/rooms.const';
import {
  CameraOptions,
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';
import { HANDLE_ROOM_SCREEN, MAIN_TAB } from '../../core/navigation/navigation.const';
import React,
{
  FC,
  useState,
} from 'react';
import {
  addTemperetureSensors,
  createRoom,
  deleteRoom,
  deleteTemperetureSensors,
  editRoom,
  getRoomsByParam,
  uploadImageRoom,
} from '../../core/rooms/rooms.actions';
import {
  useDispatch,
  useSelector
} from 'react-redux';

import Camera from '../../assets/icons/camera.svg';
import Edit from '../../assets/icons/edit.svg';
import GalleryPhoto from '../../assets/icons/gallery-photo.svg';
import Header from '../widgets/Header/Header';
import { MainStackParamList } from '../Navigation/MainStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import TempHumSensor from '../widgets/TempHumSensor/TempHumSensor';
import Trash from '../../assets/icons/trash.svg';
import { currentHouseIdSelector } from '../../core/houses/houses.selectors';
import { getCurrentUrl } from '../../core/tools/getCurrentUrl';
import { getHouses } from '../../core/houses/houses.actions';
import { requestCameraPermission } from '../../handlers/PermissionAndroid';
import { roomsSelector } from '../../core/rooms/rooms.selectors';
import { styles } from './HandleRoomScreen.style';
import { temperatureSensorsSelector } from '../../core/devices/devices.selectors';

type Props = NativeStackScreenProps<MainStackParamList, 'Room'>;

interface HandleRoomScreenProps {
  navigation: Props['navigation'],
  route: Props['route']
}

interface ImageData {
  height: number,
  uri: string,
  width: number,
  fileName: string
  type: string
  fileSize: number,
}

const HandleRoomScreen: FC<HandleRoomScreenProps> = props => {
  const {
    route,
    navigation,
  } = props;

  const {
    roomId,
    type,
  } = route.params;

  const rooms = useSelector(roomsSelector);
  const currentHouseId = useSelector(currentHouseIdSelector);
  const temperatureSensors = useSelector(temperatureSensorsSelector);
  const dispatch = useDispatch();

  const {
    name,
    image_id,
    temperature_sensors,
  } = rooms[String(roomId)] || {};

  const [roomName, setRoomName] = useState<string>(name);
  const [selectedDevices, setSelectedDevices] = useState<Array<string>>([]);
  const [typeAction, setTypeAction] = useState<"add" | "delete">("add");

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();

  const [imageData, setImageData] = useState<ImageData>({
    height: 0,
    uri: "",
    width: 0,
    fileName: "",
    type: "",
    fileSize: 0,
  });

  const handleRoom = async () => {
    try {
      const action = type === 'edit'
        ? await dispatch(editRoom({ roomId, name: roomName }))
        : await dispatch(createRoom({
          houseId: currentHouseId,
          name: roomName,
        }));
      await dispatch(action);
      await dispatch(getHouses());
      const res = await dispatch(getRoomsByParam({ house_id: currentHouseId }));

      if (type === 'add') {
        const rooms = Object.keys(res.payload.rooms);
        const new_room_id = rooms.length
          ? rooms.find((room, index) => index == (rooms.length - 1))
          : "";

        navigation.replace(HANDLE_ROOM_SCREEN, {
          roomId: new_room_id || "",
          type: 'edit',
        });
      }
    } catch (e) {
      console.log({ e });
    }
  }

  const confirmDelete = () => {
    Alert.alert(
      "Видалення кімнати!",
      `Ви дійсно бажаєте видалити кімнату ${name}? Після видалення, дію неможливо буде відмінити!`,
      [
        {
          text: "Відмінити",
          style: "cancel"
        },
        {
          text: "Так",
          onPress: handleDeleteRoom
        }
      ]
    );
  }

  const handleDeleteRoom = async () => {
    try {
      await dispatch(deleteRoom(currentHouseId, roomId));
      await Promise.all([
        dispatch(getHouses()),
        dispatch(getRoomsByParam({ house_id: currentHouseId })),
      ]);
      navigation.navigate(MAIN_TAB, {});
    } catch (e) {
      console.log({ e });
    }
  }

  const addTemperetureSensorInRoom = async () => {
    try {
      const data = {
        room_id: roomId,
        devices_id: selectedDevices
      };
      await dispatch(addTemperetureSensors(data));
      await dispatch(getRoomsByParam({ room_id: roomId }));
      setSelectedDevices([]);
      onClose();
    } catch (e) {
      console.log({ e });
    }
  }

  const deleteTemperetureSensorWithRoom = async () => {
    try {
      const data = {
        room_id: roomId,
        devices_id: selectedDevices
      };
      await dispatch(deleteTemperetureSensors(data));
      await dispatch(getRoomsByParam({ room_id: roomId }));
      setSelectedDevices([]);
      setTypeAction("add");
    } catch (e) {
      console.log({ e });
    }
  }

  const selectTemperatureSensors = (temperature_sensor_id: string, type_select: "delete" | "add") => {
    setTypeAction(type_select);
    if (selectedDevices.includes(temperature_sensor_id)) {
      return setSelectedDevices((prev) => prev.filter((id) => id !== temperature_sensor_id));
    }
    return setSelectedDevices((prev) => [...prev, temperature_sensor_id]);
  }

  const editProps = {
    onHandle: confirmDelete,
    iconHandle:
      < Trash
        width={18}
        height={18}
        fill={'#CE3B54'}
      />
  }

  const chooseImage = async (type: 'camera' | 'gallery') => {
    const result = await requestCameraPermission();
    let data = {};

    const options: CameraOptions = {
      mediaType: 'photo',
    };
    if (result) {
      if (type === 'camera') {
        data = await launchCamera(options);
      } else if (type === 'gallery') {
        data = await launchImageLibrary(options);
      }

      if (!data.didCancel) {
        const {
          height = 0,
          uri = "",
          width = 0,
          fileName = "",
          type = "",
          fileSize = 0,
        } = data.assets[0] || {};

        setImageData({
          height,
          uri,
          width,
          fileName,
          type,
          fileSize,
        });
      }
    }
  }

  const temperatureSensorsData = temperature_sensors && temperature_sensors.length
    ? temperature_sensors.map((temperature_sensor_id) => ({ ...temperatureSensors[temperature_sensor_id] }))
    : [];

  const temperatureSensorsDataAll = Object.keys(temperatureSensors).length
    ? Object.keys(temperatureSensors)
      .filter((temperature_sensor_id) => {
        const hasRoom = temperatureSensors[temperature_sensor_id]?.room
          ? true
          : false;
        return temperature_sensor_id !== "" && temperature_sensors.includes(temperature_sensor_id) && !hasRoom
      })
      .map((temperature_sensor_id) => ({ ...temperatureSensors[temperature_sensor_id] }))
    : [];

  return (
    <View style={styles.container}>
      <Header
        title={type === 'edit' ? 'Редагування' : 'Додати кімнату'}
        subtitle={
          type == 'edit'
            ? roomName
              ? roomName
              : name
            : ""
        }
        {...type === 'edit' ? editProps : {}}
      />
      <View style={styles.content}>
        <View style={styles.info_room}>
          <Text style={styles.label}>Назва</Text>
          <View style={styles.edit_info_room_block}>
            <TextInput
              value={roomName}
              autoFocus={false}
              placeholder='Введіть назву кімнати...'
              placeholderTextColor={'grey'}
              style={[styles.name, styles.textInput]}
              onChangeText={(text) => setRoomName(text)}
            />
          </View>
          <Divider />
        </View>
        <View style={styles.devices_room}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>Пристрої</Text>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={onOpen}
            >
              <Text style={{ color: 'black', fontSize: 18 }}>+</Text>
            </TouchableOpacity>
          </View>
          {
            temperatureSensorsData.length
              ? (
                <FlatList
                  data={temperatureSensorsData}
                  keyExtractor={(item, index) => item._id}
                  numColumns={2}
                  renderItem={({ item: temperatureSensor, index }) => (
                    <TempHumSensor
                      {...temperatureSensor}
                      onPress={() => selectTemperatureSensors(temperatureSensor._id, "delete")}
                      selected={selectedDevices}
                    />
                  )}
                />
              )
              : (
                <View style={styles.no_devices_wrapper}>
                  <Text style={styles.no_devices_text}>Пристрої відсутні, щоб додати натисніть "+" та оберіть зі списку</Text>
                </View>
              )
          }
        </View>
        <TouchableOpacity
          onPress={typeAction === "delete" && selectedDevices.length ? deleteTemperetureSensorWithRoom : handleRoom}
          style={styles.handle_btn}
        >
          <Text style={styles.handle_btn_title}>
            {
              typeAction === "delete" && selectedDevices.length
                ? "Видалити пристрої"
                : type === "edit"
                  ? "Зберегти"
                  : "Додати"
            }
          </Text>
        </TouchableOpacity>
      </View>
      <Actionsheet isOpen={isOpen} onClose={() => { onClose(); setSelectedDevices([]); }}>
        <Actionsheet.Content>
          <FlatList
            data={temperatureSensorsDataAll}
            numColumns={2}
            keyExtractor={(item, index) => item._id}
            renderItem={({ item: temperatureSensor, index }) => (
              <TempHumSensor
                {...temperatureSensor}
                onPress={() => selectTemperatureSensors(temperatureSensor._id, "add")}
                selected={selectedDevices}
              />
            )}
          />
          {
            selectedDevices.length
              ? (
                <TouchableOpacity
                  onPress={addTemperetureSensorInRoom}
                  style={styles.btn_add_new_devices}
                >
                  <Text style={styles.handle_btn_title}>
                    Додати
                  </Text>
                </TouchableOpacity>
              )
              : null
          }
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  )
}

export default HandleRoomScreen;
