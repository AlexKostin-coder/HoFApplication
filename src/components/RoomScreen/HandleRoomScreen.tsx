import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
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
import { HOME_SCREEN } from '../../core/navigation/navigation.const';
import Header from '../widgets/Header/Header';
import { MainStackParamList } from '../Navigation/MainStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Trash from '../../assets/icons/trash.svg';
import { roomsSelector } from '../../core/rooms/rooms.selectors';
import { styles } from './HandleRoomScreen.style';

type Props = NativeStackScreenProps<MainStackParamList, 'Room'>;

interface HandleRoomScreenProps {
  navigation: Props['navigation'],
  route: Props['route']
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

  const [editableName, setEditableName] = useState(false);
  const [roomName, setRoomName] = useState(name);
  const [isLoading, setIsLoading] = useState(false);

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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={styles.image_wrapper}>
            <Camera
              width={20}
              height={20}
              fill={'#333333'}
            />
          </TouchableOpacity>
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
