import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  back_btn_wrapper: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 15
  },
  back_btn: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: 'white',
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title_wrapper: {
    flex: 4,
    marginLeft: 15
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: "#333333",
  }
});