import {
  Text,
  View
} from 'react-native';
import React, { FC, useEffect, useRef } from 'react';
import { styles } from './SegmentClockScreen.style';
import Header from '../widgets/Header/Header';
import { TriangleColorPicker } from 'react-native-color-picker';
import { changeSettingsSegmentClock } from '../../core/devices/devices.actions';
import { useDispatch } from 'react-redux';
import { SegmentClockData } from '../../core/devices/devices.types';

const SegmentClockScreen: FC = () => {

  const timer: ReturnType<typeof setTimeout | any> = useRef(0);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    }
  }, []);

  const handleChangeColor = (color: { h: number, s: number, v: number }) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {

      const h = (Math.round(color.h) * 65536) / 360;
      const s = (Math.round(color.s * 100) * 255) / 100;
      const v = (Math.round(color.v * 100) * 255) / 100;


      handleChangeSettingsSegmentClock({ color: { h, s, v }, auto_bright: false, bright: 100 });
    }, 10);
  }

  const handleChangeSettingsSegmentClock = async (data: SegmentClockData) => {
    try {
      await dispatch(changeSettingsSegmentClock(data));
    } catch (err) {
      console.log('handleChangeSettingsSegmentClock', err);
    }
  }

  return (
    <View style={styles.container}>
      <Header
        title={"Налаштування годинника"}
      />
      <TriangleColorPicker
        onColorChange={handleChangeColor}
        style={{ flex: 1 }}
        hideControls={true}
      />
    </View>
  )
}

export default SegmentClockScreen;
