import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  welcome_title: {
    fontSize: 14,
    color: '#333333'
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: '#333333'
  },
  rooms: {
    marginTop: 20,
  },
  rooms_title: {
    fontSize: 20,
    color: 'black',
    paddingHorizontal: 10,
    fontWeight: '400',
  },
  rooms_list: {
    marginTop: 10,
    paddingLeft: 10,
    marginRight: 10,
  },
  room: {
    width: 200,
    height: 300,
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  room_add: {
    backgroundColor: 'none',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'grey',
  },
  room_add_wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  room_add_content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    backgroundColor: 'lightgrey',
    borderRadius: 30,
  },
  room_add_title: {
    fontSize: 40,
    color: "white",
  },
  room_content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
    justifyContent: 'flex-end',
    borderRadius: 12,
  },
  room_name: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  room_quantity_device: {
    color: 'white',
  },
  devices: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  devices_title: {
    fontSize: 20,
    color: 'black',
    fontWeight: '400',
  },
  catagories_device_list: {

  },
  catagories_device: {
    backgroundColor: 'white',
    width: Math.floor(width / 2) - 14,
    height: 140,
    marginTop: 10,
    marginRight: 8,
    borderRadius: 12,
  },
  catagories_device_content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  catagories_device_image: {
    width: 100,
    height: 100,
    resizeMode: 'cover'
  },
  catagories_device_text: {
    color: 'grey'
  },
  no_devices: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center'
  }
});