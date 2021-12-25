import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 16,
  },
  image_wrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    backgroundColor: 'white'
  },
  border: {
    borderBottomWidth: .5,
    borderColor: '#333333',
    marginLeft: 60,
  },
  edit_info_room_block: {
    marginLeft: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  name: {
    fontSize: 16,
    color: 'grey'
  },
  textInput: {
    padding: 0
  }
});