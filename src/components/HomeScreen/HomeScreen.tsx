import React, { FC } from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { logOut } from '../../core/auth/auth.actions';
import { useDispatch } from 'react-redux';

const HomeScreen: FC = () => {
  const dispatch = useDispatch();
  return (
    <View>
      <TouchableOpacity onPress={async () => { await dispatch(logOut()) }}>
        <Text>Вийти</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen
