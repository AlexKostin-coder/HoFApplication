import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  house_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    flex: 1,
    backgroundColor: 'white',
  },
  house_item_title: {
    fontSize: 16,
    color: 'black'
  },
  house_info: {
    color: 'grey'
  },
  add_house_item: {
    padding: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  add_house_item_title: {
    color: 'green',
    fontSize: 18,
  },
  wrapper_house_info: {
    flexDirection: 'row', 
    alignItems: 'center'
  }
});