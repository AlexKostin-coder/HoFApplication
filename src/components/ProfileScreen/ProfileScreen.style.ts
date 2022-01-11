import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile_tile: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 180,
    backgroundColor: 'white',
    elevation: 5,
    position: 'relative'
  },
  edit_icon_wrapper: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  avatar_container: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatar_alt: {
    fontSize: 40,
  },
  avatar_img: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    marginTop: 4,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black'
  },
  email: {
    color: 'grey'
  },
  btns_group: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-end'
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  btn_item: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  btn_title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'grey'
  }
});