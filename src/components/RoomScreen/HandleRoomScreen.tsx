import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import {
  CameraOptions,
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';
import React,
{
  FC,
  useState,
} from 'react';
import {
  createRoom,
  deleteRoom,
  editRoom,
  getRooms,
} from '../../core/rooms/rooms.actions';
import {
  useDispatch,
  useSelector
} from 'react-redux';

import Camera from '../../assets/icons/camera.svg';
import Edit from '../../assets/icons/edit.svg';
import GalleryPhoto from '../../assets/icons/gallery-photo.svg';
import { HOME_SCREEN } from '../../core/navigation/navigation.const';
import Header from '../widgets/Header/Header';
import { MainStackParamList } from '../Navigation/MainStack';
import { Menu } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Trash from '../../assets/icons/trash.svg';
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
  const dispatch = useDispatch();

  const {
    name
  } = rooms[String(roomId)] || {};

  const [editableName, setEditableName] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>(name);
  const [imageData, setImageData] = useState<ImageData>({
    height: 0,
    uri: "",
    width: 0,
    fileName: "",
    type: "",
    fileSize: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRoom = async () => {
    setIsLoading(true);
    setEditableName(false);
    try {
      if (type === 'edit') {
        if (name !== roomName) {
          await dispatch(editRoom({ roomId, name: roomName }));
          await dispatch(getRooms());
        }
      }
      else {
        if (roomName) {
          await dispatch(createRoom({ name: roomName }));
          await dispatch(getRooms());
          navigation.goBack();
        }
      }
    } catch (e) {
      console.log({ e });
    }
    setIsLoading(false);
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
      await dispatch(deleteRoom(roomId));
      await dispatch(getRooms());
      navigation.navigate(HOME_SCREEN, {});
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
    let imageData = {};

    const options: CameraOptions = {
      mediaType: 'photo',
      maxWidth: 400,
      maxHeight: 400,
      quality: 0,
    };
    if (result) {
      if (type === 'camera') {
        imageData = await launchCamera(options);
      } else if (type === 'gallery') {
        imageData = await launchImageLibrary(options);
      }

      if (!imageData.didCancel) {
        const {
          height = 0,
          uri = "",
          width = 0,
          fileName = "",
          type = "",
          fileSize = 0,
        } = imageData.assets[0] || {};

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
        onBack={() => navigation.goBack()}
        {...type === 'edit' ? editProps : {}}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Menu
            w="160"
            trigger={(triggerProps) => {
              return (
                <TouchableOpacity
                  style={styles.image_wrapper}
                  {...triggerProps}
                >
                  {
                    imageData.uri ?
                      <Image
                        style={{ width: 50, height: 50, borderRadius: 25 }}
                        source={{
                          uri: imageData.uri,
                        }}
                      />
                      : null
                  }
                  <View style={styles.icon_camera}>
                    <Camera
                      width={20}
                      height={20}
                      fill={
                        imageData.uri
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
                <Text style={{ marginLeft: 10, fontSize: 14 }}>Камера</Text>
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
                <Text style={{ marginLeft: 10, fontSize: 14 }}>Галерея</Text>
              </View>
              <View style={[styles.border, { marginLeft: 0 }]} />
            </Menu.Item>
          </Menu>

          {
            !editableName
              ? (
                <TouchableOpacity
                  style={styles.edit_info_room_block}
                  onPress={() => setEditableName(true)}
                >
                  <Text style={styles.name}>
                    {
                      roomName
                        ? roomName
                        : name
                          ? name
                          : 'Введіть назву кімнати...'
                    }
                  </Text>
                  <Edit
                    width={16}
                    height={16}
                    fill={'#333333'}
                  />
                </TouchableOpacity>
              )
              : (
                <View style={styles.edit_info_room_block}>
                  <TextInput
                    value={roomName}
                    autoFocus={true}
                    placeholder='Введіть назву кімнати...'
                    placeholderTextColor={'grey'}
                    style={[styles.name, styles.textInput]}
                    onChangeText={(text) => setRoomName(text)}
                    onSubmitEditing={handleRoom}
                  />
                </View>
              )
          }
        </View>
        <View style={styles.border} />
      </View>
    </View>
  )
}

export default HandleRoomScreen;
