import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapperTitle: {
    marginTop: 20,
    marginHorizontal: 10
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2F4F4F"
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black'
  },
  wrapperLoginForm: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 100,
    paddingHorizontal: 20
  },
  wrapperInput: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: 'grey',
    height: 40,
  },
  input: {
    fontSize: 16,
    marginLeft: 5,
    height: 40,
  },
  errorMsg: {
    fontSize: 12,
    marginLeft: 10,
    color: 'red',
  },
  loginBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#4B0082',
  },
  signInBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 2,
    height: 40,
    borderColor: '#4B0082'
  },
  textBtn: {
    fontWeight: 'bold',
    fontSize: 16
  },
  wrapperBtn: {
    flexDirection: 'row',
    marginTop: 10,
  },
  recoveryBtn: {
    marginTop: 10,
  },
  agreeCase: {
    marginTop: 10,
  },
  other_info: {
    color: 'black'
  }
});