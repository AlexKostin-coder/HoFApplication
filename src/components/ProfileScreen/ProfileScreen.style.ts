import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile_tile: {
    alignItems: 'center',
    justifyContent: 'center',
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
  settings_container: {
    flex: 1,
  },
  settings_view: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20
  },
  settings_wrapper: {
    width: 120,
    height: 120,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settings_title: {
    marginTop: 10,
    textAlign: 'center',
  },
});