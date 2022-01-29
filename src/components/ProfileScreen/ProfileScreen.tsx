import {
  Alert,
  ScrollView,
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
import { HOUSES_SCREEN } from '../../core/navigation/navigation.const';
import Header from '../widgets/Header/Header';
import LogOutIcon from '../../assets/icons/logout.svg';
import { MainStackParamList } from '../Navigation/MainStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import SettingsIcon from '../../assets/icons/settings.svg';
import SmartHomeIcon from '../../assets/icons/smart-home.svg';
import SupportIcon from '../../assets/icons/support.svg';
import UserIcon from '../../assets/icons/user.svg';
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
      />
      <View style={styles.profile_tile}>
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
      <ScrollView style={styles.settings_container}>
        <View style={styles.settings_view}>
          <TouchableOpacity
            style={styles.settings_wrapper}
            onPress={() => navigation.navigate(HOUSES_SCREEN, {})}
          >
            <SmartHomeIcon
              width={24}
              height={24}
              fill={'grey'}
            />
            <Text style={styles.settings_title}>Керування будинками</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settings_wrapper}>
            <UserIcon
              width={24}
              height={24}
              fill={'grey'}
            />
            <Text style={styles.settings_title}>Налаштування профілю</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settings_wrapper}>
            <SettingsIcon
              width={24}
              height={24}
              fill={'grey'}
            />
            <Text style={styles.settings_title}>Налаштування</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settings_wrapper}
          >
            <SupportIcon
              width={28}
              height={28}
              fill={'grey'}
            />
            <Text style={styles.settings_title}>Підтримка</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settings_wrapper}
            onPress={confirmLogout}
          >
            <LogOutIcon
              width={24}
              height={24}
              fill={'#C52233'}
            />
            <Text style={[styles.settings_title, { color: '#C52233' }]}>Вийти</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default ProfileScreen;
