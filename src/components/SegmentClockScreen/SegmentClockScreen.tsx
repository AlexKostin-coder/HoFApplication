import {
  Text,
  View,
  Dimensions
} from 'react-native';
import React,
{
  FC,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Divider } from 'native-base';
import { styles } from './SegmentClockScreen.style';
import Header from '../widgets/Header/Header';
import { TriangleColorPicker } from 'react-native-color-picker';
import { changeSettingsSegmentClock } from '../../core/devices/devices.actions';
import { useDispatch } from 'react-redux';
import { SegmentClockData } from '../../core/devices/devices.types';
import CheckBox from '@react-native-community/checkbox';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const SegmentClockScreen: FC = (props) => {

  const timer: ReturnType<typeof setTimeout | any> = useRef(0);
  const dispatch = useDispatch();
  const [autoBright, setAutoBright] = useState(false);
  const [bright, setBright] = useState(30);

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
      handleChangeSettingsSegmentClock({ color: { h, s, v } });
    }, 600);
  }

  const handleChangeSettingsSegmentClock = async (data: SegmentClockData) => {
    try {
      await dispatch(changeSettingsSegmentClock({ ...data, clockId: "620a98a24f257d159c124e19" }));
    } catch (err) {
      console.log('handleChangeSettingsSegmentClock', err);
    }
  }

  const toggleCheckBox = async (value: boolean) => {
    try {
      setAutoBright(value);
      await handleChangeSettingsSegmentClock({ auto_bright: value, })
    } catch (err) {
      console.log('toggleCheckBox', err);
    }
  }

  const handleChangeBright = async (value: Array<number>) => {
    try {
      setBright(value[0]);
      await handleChangeSettingsSegmentClock({ bright: value[0] });
    } catch (err) {
      console.log('handleChangeBright', err);
    }
  }

  return (
    <View style={styles.container}>
      <Header
        title={"Налаштування годинника"}
      />
      <View style={styles.content}>
        <TriangleColorPicker
          onColorChange={handleChangeColor}
          style={styles.triange_picker}
          hideControls={true}
        />
        <View style={styles.wrapper_check_box}>
          <Text style={styles.text}>Авто корегування яскравості</Text>
          <CheckBox
            disabled={false}
            value={autoBright}
            onValueChange={toggleCheckBox}
          />
        </View>
        <Divider />
        <Text style={styles.text}>Рівень яскравості</Text>
        <MultiSlider
          min={1}
          max={255}
          sliderLength={Dimensions.get('screen').width - 20}
          enabledOne={!autoBright}
          values={[bright]}
          onValuesChangeFinish={handleChangeBright}
        />
      </View>
    </View>
  )
}

export default SegmentClockScreen;
