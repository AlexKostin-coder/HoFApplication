import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  image_wrapper: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    backgroundColor: 'white',
    position: 'relative',
  },
  border: {
    borderBottomWidth: .5,
    borderColor: '#333333',
  },
  info_room: {
    marginTop: 20,
  },
  edit_info_room_block: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    color: 'grey'
  },
  textInput: {
    padding: 0,
  },
  icon_camera: {
    position: 'absolute'
  },
  image: {
    width: '100%',
    height: 200,
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginBottom: 6,
  },
  handle_btn: {
    position: 'absolute',
    bottom: 20,
    right: 0,
    left: 0
  },
  handle_btn_title: {
    fontSize: 18,
    color: 'green',
    textAlign: 'center'
  },
  devices_room: {
    marginTop: 20,
    marginBottom: 60,
    flex: 1,
  },
  no_devices_wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  no_devices_text: {
    color: 'grey',
    textAlign: 'center'
  },
  btn_add_new_devices: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
});