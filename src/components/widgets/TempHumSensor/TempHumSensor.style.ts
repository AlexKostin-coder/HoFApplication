import {
  Dimensions,
  StyleSheet
} from "react-native";

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 70,
    width: Math.floor(width / 2) - 18,
    paddingRight: 8,
    marginHorizontal: 4,
    marginVertical: 4,
    borderRadius: 16,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  detail_sensor: {
    width: (Math.floor(width / 2) - 20) / 1.5,
  },
  info_sensor: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  info_sensor_item: {
    flexDirection: 'row'
  },
  text: {
    color: "#333333"
  }
});