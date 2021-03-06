import {
  ActivityIndicator,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import {
  validEmail,
  validPassword
} from '../../core/tools/validationData';

import { MainStackParamList } from '../Navigation/LoginStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { REGISTRATION_SCREEN } from '../../core/navigation/navigation.const';
import { getAuth } from '../../core/auth/auth.actions';
import { getUser } from '../../core/users/users.actions';
import md5 from 'md5';
import { styles } from './LoginScreen.style';
import { useDispatch } from 'react-redux';
import { GET_AUTH } from '../../core/auth/auth.const';

type Props = NativeStackScreenProps<MainStackParamList, 'Login'>;

interface LoginScreenProps {
  navigation: Props['navigation'],
}

const LoginScreen: FC<LoginScreenProps> = (props) => {

  const {
    navigation
  } = props;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const dispatch = useDispatch();

  const authHandle = async () => {
    const validPass = validPassword(password);
    if (!validPass.status) {
      setShowError(true);
    }

    if (email.length && password.length) {
      setIsLoading(true);
      try {
        const res = await dispatch(getAuth(email, md5(password)));
        if (res.type === GET_AUTH) {
          await dispatch(getUser());
          setEmail("");
          setPassword("");
          setShowKeyboard(false);
          setShowError(false);
        }
      } catch (e) {
        console.log({ e });
      }
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setShowKeyboard(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setShowKeyboard(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const validPass = validPassword(password);
  const validEma = validEmail(email);

  return (
    <View style={styles.container}>
      {
        !showKeyboard
          ? (
            <View style={styles.wrapperTitle}>
              <Text style={styles.title}> ?????????????? ?? HOF!</Text>
            </View>
          )
          : null
      }
      <View style={[styles.wrapperLoginForm, showKeyboard ? { marginTop: 250, } : {}]}>
        <View style={{ width: '100%' }}>
          <Text style={styles.label}>E-mail</Text>
          <View style={[styles.wrapperInput, showError && !validEma.status ? { borderColor: 'red' } : {}]}>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              placeholder="E-mail"
              placeholderTextColor={'black'}
              value={email}
              onChangeText={(val) => { setEmail(val) }}
              returnKeyType="next"
            />
          </View>
          <Text style={styles.errorMsg}>{showError && validEma.errorText ? validEma.errorText : ''}</Text>
        </View>
        <View style={{ width: '100%' }}>
          <Text style={styles.label}>????????????</Text>
          <View style={[styles.wrapperInput, showError && !validPass.status ? { borderColor: 'red' } : {}]}>
            <TextInput
              style={styles.input}
              placeholder="????????????"
              placeholderTextColor={'black'}
              value={password}
              onChangeText={(val) => { setPassword(val) }}
              returnKeyType="next"
            />
          </View>
          <Text style={styles.errorMsg}>{showError && validPass.errorText ? validPass.errorText : ''}</Text>
        </View>
        <TouchableOpacity style={styles.recoveryBtn}>
          <Text style={styles.other_info}>???????????? ?????????????</Text>
        </TouchableOpacity>
        <View style={styles.wrapperBtn}>
          <TouchableOpacity
            onPress={authHandle}
            style={[styles.loginBtn, { marginRight: 15 }]}
          >
            {
              isLoading
                ? (<ActivityIndicator color="white" size="small" />)
                : (<Text style={[styles.textBtn, { color: 'white' }]}>????????????</Text>)
            }
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signInBtn}
            onPress={() => { navigation.navigate(REGISTRATION_SCREEN, {}); }}
          >
            <Text style={[styles.textBtn, { color: '#4B0082' }]}>??????????????????????????????</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.agreeCase}>
          <TouchableOpacity onPress={() => { }}>
            <Text style={styles.other_info}>?????? ?????? ?????????? ???? ???????????????????????? ?? ????????????
              <Text style={{ fontWeight: "bold", color: "#2F4F4F" }}> ?????????????? ????????????????????????</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View >
  )
}

export default LoginScreen;
