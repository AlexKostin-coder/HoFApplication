import React, { FC } from 'react';
import {
  Text,
  View
} from 'react-native';

import Header from '../widgets/Header/Header';
import { MainStackParamList } from '../Navigation/MainStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from './HandleRoomScreen.style';

type Props = NativeStackScreenProps<MainStackParamList, 'Room'>;

interface HandleRoomScreenProps {
  navigation: Props['navigation'],
  route: Props['route']
}

const HandleRoomScreen: FC<HandleRoomScreenProps> = props => {
  const {
    route,
    navigation
  } = props;

  const {
    roomId
  } = route.params;

  return (
    <View style={styles.container}>
      <Header
        title={'Редагування'}
        onBack={() => navigation.goBack()}
      />
      <Text></Text>
    </View>
  )
}

export default HandleRoomScreen;
