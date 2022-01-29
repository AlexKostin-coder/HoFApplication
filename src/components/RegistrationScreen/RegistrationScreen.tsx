import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { FC, useState } from 'react';
import {
  validEmail,
  validPassword
} from '../../core/tools/validationData';

import { LOGIN_SCREEN } from '../../core/navigation/navigation.const';
import { MainStackParamList } from '../Navigation/LoginStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { REGISTRATION } from '../../core/auth/auth.const';
import md5 from 'md5';
import { registration } from '../../core/auth/auth.actions';
import { setMessages } from '../../core/ui/ui.actions';
import { styles } from './RegistrationScreen.style';
import { useDispatch } from 'react-redux';

type Props = NativeStackScreenProps<MainStackParamList, 'Login'>;

interface RegistrationScreenProps {
  navigation: Props['navigation'],
}

const RegistrationScreen: FC<RegistrationScreenProps> = props => {
  const { navigation } = props;

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordRepeat, setPasswordRepeat] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const isValieEmail = validEmail(email);
  const isValidPass = validPassword(password);

  const setDefaultValue = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPasswordRepeat("");
    setShowError(false);
    setIsLoading(false);
  }

  const registrationHandler = async () => {

    if (!isValieEmail.status) {
      return setShowError(true);
    }
    if (!isValidPass.status) {
      return setShowError(true);
    }
    if (password !== passwordRepeat) {
      return setShowError(true);
    }
    setIsLoading(true);
    try {
      const res = await dispatch(registration({ name, email, password: md5(password) }));
      if (res.type === REGISTRATION) {
        await dispatch(setMessages({
          type: 'info',
          text: "Успішна реєстрація",
        }));
        setDefaultValue();
        navigation.navigate(LOGIN_SCREEN, {});
      }
    } catch (e) {
      console.log({ e });
    }
    setIsLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapperTitle}>
        <Text style={styles.title}> Вітаємо в HOF!</Text>
      </View>
      <View style={styles.wrapperLoginForm}>
        <View style={{ width: '100%' }}>
          <Text style={styles.label}>Ім'я</Text>
          <View style={[styles.wrapperInput, showError && (!name || name.length < 2) ? { borderColor: 'red' } : {}]}>
            <TextInput
              style={styles.input}
              placeholder="Ім'я"
              placeholderTextColor={'grey'}
              value={name}
              onChangeText={(val) => { setName(val) }}
              returnKeyType="next"
            />
          </View>
          <Text style={styles.errorMsg}>{showError && (!name || name.length) < 2 ? "Ім'я повинне містити мініму 2 букви" : ''}</Text>
        </View>
        <View style={{ width: '100%' }}>
          <Text style={styles.label}>E-mail</Text>
          <View style={[styles.wrapperInput, showError && !isValieEmail.status ? { borderColor: 'red' } : {}]}>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              placeholder="E-mail"
              placeholderTextColor={'grey'}
              value={email}
              onChangeText={(val) => { setEmail(val) }}
              returnKeyType="next"
            />
          </View>
          <Text style={styles.errorMsg}>{showError && !isValieEmail.status ? isValieEmail.errorText : ''}</Text>
        </View>
        <View style={{ width: '100%' }}>
          <Text style={styles.label}>Пароль</Text>
          <View style={[styles.wrapperInput, showError && !isValidPass.status ? { borderColor: 'red' } : {}]}>
            <TextInput
              style={styles.input}
              placeholder="Пароль"
              placeholderTextColor={'grey'}
              value={password}
              onChangeText={(val) => { setPassword(val) }}
              returnKeyType="next"
              secureTextEntry={true}
            />
          </View>
          <Text style={styles.errorMsg}>{showError && !isValidPass.status ? isValidPass.errorText : ''}</Text>
        </View>
        <View style={{ width: '100%' }}>
          <Text style={styles.label}>Повторіть пароль</Text>
          <View style={[styles.wrapperInput, showError && password && !passwordRepeat && passwordRepeat !== password ? { borderColor: 'red' } : {}]}>
            <TextInput
              style={styles.input}
              placeholder="Повторіть пароль"
              placeholderTextColor={'grey'}
              value={passwordRepeat}
              onChangeText={(val) => { setPasswordRepeat(val) }}
              returnKeyType="next"
              secureTextEntry={true}
            />
          </View>
          <Text style={styles.errorMsg}>{showError && password && !passwordRepeat && passwordRepeat !== password ? "Паролі не збігаються" : ''}</Text>
        </View>
        <View style={styles.wrapperBtn}>
          <TouchableOpacity
            style={[styles.loginBtn, { marginRight: 15 }]}
            onPress={registrationHandler}
          >
            {
              isLoading
                ? (<ActivityIndicator color="white" size="small" />)
                : (<Text style={[styles.textBtn, { color: 'white' }]}>Зареєструватися</Text>)
            }
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { navigation.navigate(LOGIN_SCREEN, {}); }}
            style={styles.signInBtn}
          >
            <Text style={[styles.textBtn, { color: '#4B0082' }]}>Увійти</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View >
  );
};

export default RegistrationScreen;

