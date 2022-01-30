import {
  Alert,
  Button,
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
  createRoom,
  deleteRoom,
  editRoom,
  getRoomsByHouseId,
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
import { Menu } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Trash from '../../assets/icons/trash.svg';
import { currentHouseIdSelector } from '../../core/houses/houses.selectors';
import { getCurrentUrl } from '../../core/tools/getCurrentUrl';
import { getHouses } from '../../core/houses/houses.actions';
import { requestCameraPermission } from '../../handlers/PermissionAndroid';
import { roomsSelector } from '../../core/rooms/rooms.selectors';
import { styles } from './HandleRoomScreen.style';

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
  const dispatch = useDispatch();

  const {
    name,
    image_id,
  } = rooms[String(roomId)] || {};

  const [roomName, setRoomName] = useState<string>(name);
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
      const res = await dispatch(getRoomsByHouseId(currentHouseId));

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
      "Видалення!",
      `Ви точно бажаєте видалити кімнату ${name}?`,
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
      await dispatch(getRoomsByHouseId(currentHouseId));
      await dispatch(getHouses());
      navigation.navigate(MAIN_TAB, {});
    } catch (e) {
      console.log({ e });
    }
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
        <Menu
          w="160"
          trigger={(triggerProps) => {
            return (
              <TouchableOpacity
                style={styles.image_wrapper}
                {...triggerProps}
              >
                {
                  imageData.uri || image_id
                    ? (
                      <Image
                        style={styles.image}
                        resizeMode='cover'
                        source={{
                          uri: imageData.uri ? imageData.uri : `${getCurrentUrl()}images/${image_id}`,
                        }}
                      />
                    )
                    : null
                }
                <View style={styles.icon_camera}>
                  <Camera
                    width={20}
                    height={20}
                    fill={
                      imageData.uri || image_id
                        ? 'white'
                        : '#333333'
                    }
                  />
                </View>
              </TouchableOpacity>
            )
          }}
        >
          <Menu.Item onPress={() => chooseImage('camera')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Camera
                width={20}
                height={20}
                fill={'#333333'}
              />
              <Text style={{ marginLeft: 10, fontSize: 14, color: 'grey' }}>Камера</Text>
            </View>
            <View style={[styles.border, { marginLeft: 0 }]} />
          </Menu.Item>
          <Menu.Item onPress={() => chooseImage('gallery')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <GalleryPhoto
                width={20}
                height={20}
                fill={'#333333'}
              />
              <Text style={{ marginLeft: 10, fontSize: 14, color: 'grey' }}>Галерея</Text>
            </View>
            <View style={[styles.border, { marginLeft: 0 }]} />
          </Menu.Item>
        </Menu>
        <View style={styles.info_room}>
          <Text style={styles.label}>Назва:</Text>
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
          <View style={[styles.border, { marginTop: 6, }]} />
        </View>
        <TouchableOpacity
          onPress={handleRoom}
          style={styles.handle_btn}
        >
          <Text style={styles.handle_btn_title}>
            {type === "edit" ? "Зберегти" : "Додати"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HandleRoomScreen;
