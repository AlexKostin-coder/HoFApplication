import {
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { FC } from 'react';

import { CheckIcon } from 'native-base';
import Temperature from '../../../assets/icons/temperature.svg';
import WeatherDropsRain from '../../../assets/icons/weather-drops-rain.svg';
import { styles } from './TempHumSensor.style';

interface TempHumSensorProps {
  name: string,
  temperature: number,
  humidity?: number,
  _id: string,
  selected?: Array<string>,
  onPress?: () => void,
}

const TempHumSensor: FC<TempHumSensorProps> = props => {

  const {
    name,
    temperature,
    humidity,
    _id,
    selected,
    onPress,
  } = props;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.details}>
        <View>
          <Text style={styles.text}>{name}</Text>
          <Text style={[styles.text, { fontWeight: 'normal', color: 'grey', fontSize: 12 }]}>Sensor</Text>
        </View>
        <View style={styles.info_sensor}>
          <View style={styles.info_sensor_item}>
            <Temperature
              width={18}
              height={18}
              fill={'#008CCC'}
            />
            <Text style={[styles.text, { fontWeight: 'normal', color: 'grey' }]}>
              {temperature || ""}°C
            </Text>
          </View>
          <View style={styles.info_sensor_item}>
            {
              humidity ?
                <>
                  <WeatherDropsRain
                    width={18}
                    height={18}
                    fill={'#008CCC'}
                  />
                  <Text style={[styles.text, { fontWeight: 'normal', color: 'grey' }]}>
                    {humidity || ""}
                  </Text>
                </>
                : null
            }
          </View>
        </View>
      </View>
      <View style={styles.image_wrapper}>
        <CheckIcon style={styles.check_mark} size={selected?.includes(_id) ? "5" : "0"} />
        <Image
          style={styles.image}
          resizeMode='cover'
          source={
            require('../../../assets/images/tempsensor.jpg')
          }
        />
      </View>
    </TouchableOpacity>
  )
}

export default TempHumSensor;
