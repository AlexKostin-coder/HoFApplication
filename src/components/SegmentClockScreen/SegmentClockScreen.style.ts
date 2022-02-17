import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  triange_picker: {
    height: Dimensions.get('window').height / 2,
  },
  wrapper_check_box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    color: 'grey',
    fontSize: 16
  },
  colors_block: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  color_block: {
    width: 50,
    height: 50,
    marginHorizontal: 6,
    borderRadius: 8
  }
});