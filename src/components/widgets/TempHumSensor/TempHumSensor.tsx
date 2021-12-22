import {
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { FC } from 'react'

import Temperature from '../../../assets/icons/temperature.svg';
import WeatherDropsRain from '../../../assets/icons/weather-drops-rain.svg';
import { styles } from './TempHumSensor.style';

interface TempHumSensorProps {
  Sensor: string,
  StatusTemp: string | number,
  StatusHum: string | number,
  Range_max: string | number,
  Range_min: string | number,
  Battery_charge: string | number,
  _id: string,
  id_Sensor: string,
  StartTime: Array<{}>,
  EndTime: Array<{}>,
}

const TempHumSensor: FC<TempHumSensorProps> = props => {

  const {
    Sensor: name = "",
    StatusTemp: temperature = "",
    StatusHum: hymidity = "",
    id_Sensor: id_sensor = "",
  } = props;

  return (
    <TouchableOpacity style={styles.container}>
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
              {temperature !== "undefined" ? temperature : ""}
            </Text>
          </View>
          <View style={styles.info_sensor_item}>
            {
              hymidity !== "undefined" ?
                <>
                  <WeatherDropsRain
                    width={18}
                    height={18}
                    fill={'#008CCC'}
                  />
                  <Text style={[styles.text, { fontWeight: 'normal', color: 'grey' }]}>
                    {hymidity !== "undefined" ? hymidity : ""}
                  </Text>
                </>
                : null
            }
          </View>
        </View>
      </View>
      <View style={styles.image_wrapper}>
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
