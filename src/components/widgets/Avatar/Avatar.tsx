import {
  Image,
  ImageStyle,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle
} from 'react-native';
import React, { FC } from 'react';

import { styles } from './Avatar.style';

interface AvatarProps {
  photoId?: String,
  alt?: String,
  showBadge?: Boolean,
  styleContainer?: StyleProp<ViewStyle>,
  styleAlt?: StyleProp<TextStyle>,
  styleImg?: StyleProp<ImageStyle>,
}

const Avatar: FC<AvatarProps> = props => {

  const {
    photoId,
    alt,
    showBadge = false,
    styleContainer,
    styleAlt,
    styleImg
  } = props;

  return (
    <View style={[styles.avatar_containet, styleContainer]}>
      {
        photoId ?
          <Image
            style={[styles.image, styleImg]}
            source={{ uri: `http://hofenterprise.com/image/${photoId}` }}
          />
          : <Text style={[styles.alt, styleAlt]}>{alt}</Text>
      }
      {
        showBadge ?
          <View style={styles.badge} />
          : null
      }
    </View>
  )
}

export default Avatar;
