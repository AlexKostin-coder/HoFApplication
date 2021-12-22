import React, { FC } from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import ArrowLeft from '../../../assets/icons/arrow-left.svg';
import Settings from '../../../assets/icons/settings.svg';
import { styles } from './Header.style';

interface Header {
  title: String,
  onBack: () => void,
  onHandle?: () => void
}

const Header: FC<Header> = props => {

  const {
    title,
    onBack,
    onHandle
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
            height={18}
            fill="#333333"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.title_wrapper}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.other_btn}>
        {
          Boolean(onHandle) ?
            <TouchableOpacity
              style={styles.back_btn}
              onPress={() => onHandle()}
            >
              <Settings
                width={18}
                height={18}
                fill="#333333"
              />
            </TouchableOpacity>
            : null
        }
      </View>
    </View>
  )
}

export default Header;
