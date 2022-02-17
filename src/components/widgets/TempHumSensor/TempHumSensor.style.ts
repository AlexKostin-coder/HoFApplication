import {
  Dimensions,
  StyleSheet
} from "react-native";

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: (width / 3) - 16,
    width: (width / 2) - 16,
    padding: 10,
    borderRadius: 16,
    marginRight: 12,
    marginBottom: 12,
    flexDirection: 'row',
    
  },
  details: {
    flex: 3,
    justifyContent: 'space-between',
    position: 'relative',
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
  },
  check_mark: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: 'green'
  }
});