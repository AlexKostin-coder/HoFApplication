import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  categories: {
    height: 120,
  },
  wrapper_category: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  category: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  category_title: {
    fontSize: 12,
    color: "#333333",
    width: 100,
    textAlign: 'center'
  },
  devices: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});