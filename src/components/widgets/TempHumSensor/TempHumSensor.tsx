import {
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { FC } from 'react'

import Temperature from '../../../assets/icons/temperature';
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
      <Image
        style={{ width: 50, height: 50, marginRight: 5, }}
        resizeMode='cover'
        source={
          require('../../../assets/images/tempsensor.jpg')
        }
      />
      <View style={styles.detail_sensor}>
        <Text style={styles.text}>{name}</Text>
        <View style={styles.info_sensor}>
          <View style={styles.info_sensor_item}>
            <Temperature
              width={18}
              height={18}
              fill={'#008CCC'}
            />
            <Text style={styles.text}>
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
                  <Text style={styles.text}>
                    {hymidity !== "undefined" ? hymidity : ""}
                  </Text>
                </>
                : null
            }
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default TempHumSensor;
