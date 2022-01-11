import {
  ActivityIndicator,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { validEmail, validPassword } from '../../core/tools/validationData';

import { GET_AUTH } from '../../core/auth/auth.const';
import { getAuth } from '../../core/auth/auth.actions';
import { styles } from './LoginScreen.style';
import { useDispatch } from 'react-redux';

const LoginScreen: FC = () => {

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
      try {
        setIsLoading(true);
        await dispatch(getAuth(email, password));
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        console.log({ e });
      }
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
      {!showKeyboard ?
        <View style={styles.wrapperTitle}>
          <Text style={styles.title}> Вітаємо в HOF!</Text>
        </View>
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
          <Text style={styles.label}>Пароль</Text>
          <View style={[styles.wrapperInput, showError && !validPass.status ? { borderColor: 'red' } : {}]}>
            <TextInput
              style={styles.input}
              placeholder="Пароль"
              placeholderTextColor={'black'}
              value={password}
              onChangeText={(val) => { setPassword(val) }}
              returnKeyType="next"
            />
          </View>
          <Text style={styles.errorMsg}>{showError && validPass.errorText ? validPass.errorText : ''}</Text>
        </View>
        <TouchableOpacity style={styles.recoveryBtn}>
          <Text style={styles.other_info}>Забули пароль?</Text>
        </TouchableOpacity>
        <View style={styles.wrapperBtn}>
          <TouchableOpacity
            onPress={authHandle}
            style={[styles.loginBtn, { marginRight: 15 }]}
          >
            {isLoading
              ? (<ActivityIndicator color="white" size="small" />)
              : (<Text style={[styles.textBtn, { color: 'white' }]}>Увійти</Text>)
            }
          </TouchableOpacity>
          <TouchableOpacity style={styles.signInBtn}>
            <Text style={[styles.textBtn, { color: '#4B0082' }]}>Зареєструватися</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.agreeCase}>
          <TouchableOpacity onPress={() => { }}>
            <Text style={styles.other_info}>Під час входу ви погоджуєтеся з нашими
              <Text style={{ fontWeight: "bold", color: "#2F4F4F" }}> Умовами користування</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View >
  )
}

export default LoginScreen;
