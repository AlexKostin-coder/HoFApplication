import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { FC } from 'react';
import * as stylesTemp from '../TempHumSensor/TempHumSensor.style';

interface ISegmentClock {
  onPress: () => void,
  name: string,
  type: string,
  temperature: number,
  humidity: number,
  pressure: number,
  altitude: number,
  _id: string,
  house: string,
};

const SegmentClock: FC<ISegmentClock> = (props) => {
  const {
    onPress,
    name,
    type,
    temperature,
    humidity,
    pressure,
    altitude,
    _id,
    house,
  } = props;

  return (
    <TouchableOpacity
      style={stylesTemp.styles.container}
      onPress={onPress}
    >
      <View>
        <Text style={stylesTemp.styles.text}>{name}</Text>
        <Text style={[stylesTemp.styles.text, { fontWeight: 'normal', color: 'grey', fontSize: 12, textTransform: 'capitalize' }]}>{type}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default SegmentClock;
