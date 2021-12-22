import {
  Dimensions,
  StyleSheet
} from "react-native";

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 120,
    width: Math.floor(width / 2) - 18,
    padding: 10,
    borderRadius: 16,
    elevation: 2,
    margin: 5,
    flexDirection: 'row',
  },
  details: {
    flex: 3,
    justifyContent: 'space-between'
  },
  info_sensor: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  info_sensor_item: {
    flexDirection: 'row'
  },
  text: {
    color: "#333333",
    fontWeight: '700',
  },
  image_wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  image: { 
    width: 60, 
    height: 60, 
  }
});