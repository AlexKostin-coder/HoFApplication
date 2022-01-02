import {
  Alert,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { FC } from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';

import Avatar from '../widgets/Avatar/Avatar';
import EditIcon from '../../assets/icons/edit.svg';
import Header from '../widgets/Header/Header';
import LogOutIcon from '../../assets/icons/logout.svg';
import { MainStackParamList } from '../Navigation/MainStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import SettingsIcon from '../../assets/icons/settings.svg';
import { authUserSelector } from '../../core/users/users.selectors';
import { logOut } from '../../core/auth/auth.actions';
import { styles } from './ProfileScreen.style';

type Props = NativeStackScreenProps<MainStackParamList, 'Profile'>;

interface ProfileScreenProps {
  navigation: Props['navigation'],
  route: Props['route']
}

const ProfileScreen: FC<ProfileScreenProps> = props => {

  const {
    navigation,
    route
  } = props;

  const dispatch = useDispatch();
  const authUser = useSelector(authUserSelector);

  const {
    photo,
    email,
    name,
  } = authUser || {};

  const confirmLogout = () => {
    Alert.alert(
      "Вихід!",
      `Ви точно бажаєте вийти?`,
      [
        {
          text: "Відмінити",
          style: "cancel"
        },
        {
          text: "Так",
          onPress: async () => await dispatch(logOut())
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title={''}
        onBack={() => navigation.goBack()}
      />
      <View style={styles.profile_tile}>
        <TouchableOpacity
          style={styles.edit_icon_wrapper}
        >
          <EditIcon
            width={18}
            height={18}
            fill={'grey'}
          />
        </TouchableOpacity>
        <Avatar
          photoId={photo}
          alt={name[0]?.toUpperCase() || ""}
          styleContainer={styles.avatar_container}
          styleAlt={styles.avatar_alt}
          styleImg={styles.avatar_img}
        />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
      <View style={styles.btns_group}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btn}>
          <View style={styles.btn_item}>
            <SettingsIcon
              width={18}
              height={18}
              fill={'grey'}
            />
          </View>
          <Text style={styles.btn_title}>Налаштування</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={confirmLogout}
          activeOpacity={0.8}
          style={styles.btn}>
          <View style={styles.btn_item}>
            <LogOutIcon
              width={18}
              height={18}
              fill={'grey'}
            />
          </View>
          <Text style={styles.btn_title}>Вийти</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProfileScreen;
