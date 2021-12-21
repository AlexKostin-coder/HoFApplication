import {
  Image,
  Text,
  View,
} from 'react-native';
import React, { FC } from 'react';

import { styles } from './Avatar.style';

interface AvatarProps {
  photoId?: String,
  alt?: String,
  showBadge?: Boolean
}

const Avatar: FC<AvatarProps> = props => {

  const {
    photoId,
    alt,
    showBadge = false
  } = props;

  return (
    <View style={styles.avatar_containet}>
      {
        photoId ?
          <Image
            style={styles.image}
            source={{ uri: `http://hofenterprise.com/image/${photoId}` }}
          />
          : <Text style={styles.alt}>{alt}</Text>
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
