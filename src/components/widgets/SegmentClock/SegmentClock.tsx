import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { FC } from 'react';
import * as stylesTemp from '../TempHumSensor/TempHumSensor.style';

interface ISegmentClock {
  onPress: () => void,
};

const SegmentClock: FC<ISegmentClock> = (props) => {
  const {
    onPress
  } = props;
  return (
    <TouchableOpacity
      style={stylesTemp.styles.container}
      onPress={onPress}
    >
      <Text>SegmentClock</Text>
    </TouchableOpacity>
  )
}

export default SegmentClock;
