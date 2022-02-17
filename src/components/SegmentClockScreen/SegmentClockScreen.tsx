import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert
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
import {
  changeSettingsSegmentClock,
  changeColorClock,
  getSettingsSegmentClock,
  deleteSegmentClock
} from '../../core/devices/devices.actions';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { MainStackParamList } from '../Navigation/MainStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Trash from '../../assets/icons/trash.svg';
import {
  segmentClocksSelector,
  settingsSegmentClocksSelector
} from '../../core/devices/devices.selectors';
import { getUser } from '../../core/users/users.actions';
import { getHouses } from '../../core/houses/houses.actions';
import { currentHouseIdSelector } from '../../core/houses/houses.selectors';


type Props = NativeStackScreenProps<MainStackParamList, 'SegmentClock'>;

interface SegmentClockScreenProps {
  navigation: Props['navigation'],
  route: Props['route']
}

const converColor = (color: { h: number, s: number, v: number }, toStrip: boolean) => {
  const { h = 0, s = 0, v = 0 } = color || {};
  const _h = toStrip
    ? (Math.round(h) * 65536) / 360
    : (Math.round(h) * 360) / 65536;
  const _s = toStrip
    ? (Math.round(s * 100) * 255) / 100
    : (Math.round(s) / 255);
  const _v = toStrip
    ? (Math.round(v * 100) * 255) / 100
    : (Math.round(v) / 255);
  return { h: _h, s: _s, v: _v }
}

const hsvtohsl = (color: { h: number, s: number, v: number }, toStrip: boolean) => {
  const { h, s, v } = converColor(color, toStrip);

  let _h = h;
  let _s = s
  let _v = v;

  const l = (2 - _s) * _v / 2;

  if (l != 0) {
    if (l == 1) {
      _s = 0;
    } else if (l < 0.5) {
      _s = s * v / (l * 2);
    } else {
      _s = s * v / (2 - l * 2);
    }
  }

  return { h: _h, s: _s, l };
}

const SegmentClockScreen: FC<SegmentClockScreenProps> = (props) => {

  const {
    route,
    navigation
  } = props;

  const {
    segment_clock_id = ""
  } = route.params;

  const timer: ReturnType<typeof setTimeout | any> = useRef(0);
  const dispatch = useDispatch();
  const segmentClocks = useSelector(segmentClocksSelector);
  const settingsSegmentClocks = useSelector(settingsSegmentClocksSelector);
  const currentHouseId = useSelector(currentHouseIdSelector);

  const {
    settings,
    name
  } = segmentClocks[segment_clock_id] || {}
  const {
    _id: settings_clock_id,
    auto_bright,
    max_bright,
    min_bright,
    last_colors = [],
    bright: brightClock,
  } = settingsSegmentClocks[settings] || {};

  const [autoBright, setAutoBright] = useState(auto_bright || false);
  const [bright, setBright] = useState(brightClock || 30);
  const [currentColor, setCurrentColor] = useState(converColor(last_colors[last_colors.length - 1], false) || { h: 0, s: 0, v: 0 });

  const getData = async () => {
    try {
      dispatch(getSettingsSegmentClock({ segment_clock_id }));
    } catch (e) {
      console.log({ e });
    }
  }

  useEffect(() => {
    getData();
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    }
  }, [segment_clock_id]);

  const handleChangeColor = (color: { h: number, s: number, v: number }) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(async () => {
      try {
        setCurrentColor(color);
        await dispatch(changeColorClock({ color: converColor(color, true), settings_clock_id }));
        await getData();
      } catch (e) {
        console.log({ e });
      }
    }, 600);
  }

  const toggleCheckBox = async (value: boolean) => {
    try {
      setAutoBright(value);
      await dispatch(changeSettingsSegmentClock({ auto_bright: value, settings_clock_id }));
      await getData();
    } catch (err) {
      console.log('toggleCheckBox', err);
    }
  }

  const handleChangeBright = async (value: Array<number>) => {
    try {
      setBright(value[0]);
      await dispatch(changeSettingsSegmentClock({ bright: value[0], auto_bright: false, settings_clock_id }));
      await getData();
    } catch (err) {
      console.log('handleChangeBright', err);
    }
  }

  const handleDeleteSegmentClock = async () => {
    try {
      await dispatch(deleteSegmentClock({ segment_clock_id, house_id: currentHouseId }));
      await Promise.all([
        dispatch(getUser()),
        dispatch(getHouses())
      ]);
      navigation.goBack();
    } catch (err) {
      console.log('handleDeleteSegmentClock', err);
    }
  }

  const confirmDelete = () => {
    Alert.alert(
      "Видалення годинника!",
      `Ви дійсно бажаєте видалити годинник ${name}? Після видалення, дію неможливо буде відмінити!`,
      [
        {
          text: "Відмінити",
          style: "cancel"
        },
        {
          text: "Так",
          onPress: handleDeleteSegmentClock
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title={"Налаштування годинника"}
        onHandle={confirmDelete}
        iconHandle={
          < Trash
            width={18}
            height={18}
            fill={'#CE3B54'}
          />
        }
      />
      <View style={styles.content}>
        <TriangleColorPicker
          defaultColor={currentColor}
          color={currentColor}
          onColorChange={handleChangeColor}
          style={styles.triange_picker}
          hideControls={true}
        />
        <View style={styles.colors_block}>
          {
            last_colors.map((color, i) => {
              const { h = 0, s = 0, l = 0 } = hsvtohsl(color, false);
              return (
                <TouchableOpacity
                  key={i}
                  style={[styles.color_block, { backgroundColor: `hsl(${Math.floor(h)}, ${Math.floor(s * 100)}%, ${Math.floor(l * 100)}%)`, }]}
                  onPress={() => setCurrentColor(converColor(color, false))}
                />
              )
            })
          }
        </View>
        <View style={styles.wrapper_check_box}>
          <Text style={styles.text}>Авто корегування яскравості</Text>
          <CheckBox
            disabled={false}
            value={autoBright}
            onValueChange={toggleCheckBox}
          />
        </View>
        <Divider />
        <Text style={styles.text}>Рівень яскравості ({bright})</Text>
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
