import React, { FC } from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import ArrowLeft from '../../../assets/icons/arrow-left.svg';
import { styles } from './Header.style';

interface Header {
  title: String,
  onBack: () => void
}

const Header: FC<Header> = props => {

  const {
    title,
    onBack
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.back_btn_wrapper}>
        <TouchableOpacity
          style={styles.back_btn}
          onPress={() => onBack()}
        >
          <ArrowLeft
            width={18}
            height={18} fill="#333333"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.title_wrapper}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  )
}

export default Header;
