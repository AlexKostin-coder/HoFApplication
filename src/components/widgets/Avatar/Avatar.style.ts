import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  avatar_containet: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#0DA1BF',
    position: 'relative',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  alt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  badge: {
    backgroundColor: '#06EF35',
    padding: 4,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
    right: 4,
  }
});