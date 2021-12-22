import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingTop: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  back_btn_wrapper: {
    flex: 1,
    alignItems: 'flex-start'
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: "#333333",
  },
  other_btn: {
    flex: 1,
    alignItems: 'flex-end',
  }
});