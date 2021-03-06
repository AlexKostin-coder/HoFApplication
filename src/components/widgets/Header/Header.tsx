import React, { FC, ReactElement } from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import ArrowLeft from '../../../assets/icons/arrow-left.svg';
import { styles } from './Header.style';
import { useNavigation } from '@react-navigation/native';

interface Header {
  title: String,
  subtitle?: String,
  onHandle?: () => void
  iconHandle?: ReactElement
}

const Header: FC<Header> = props => {

  const {
    title,
    subtitle,
    onHandle,
    iconHandle
  } = props;

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.back_btn_wrapper}>
        <TouchableOpacity
          style={styles.back_btn}
          onPress={() => navigation.goBack()}
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
        {
          subtitle
            ? (<Text style={styles.subtitle}>{subtitle}</Text>)
            : null
        }
      </View>
      <View style={styles.other_btn}>
        {
          Boolean(onHandle) ?
            <TouchableOpacity
              style={styles.back_btn}
              onPress={() => onHandle()}
            >
              {iconHandle}
            </TouchableOpacity>
            : null
        }
      </View>
    </View>
  )
}

export default Header;
