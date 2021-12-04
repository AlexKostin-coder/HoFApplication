import {
	useDispatch,
	useSelector,
} from 'react-redux';

import LoginStack from './LoginStack';
import MainStack from './MainStack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import Toast from 'react-native-simple-toast';
import { isLoginSelector } from '../../core/auth/auth.selectors';
import { removeMessageByKey } from '../../core/ui/ui.actions';
import { selectUIMessages } from '../../core/ui/ui.selectors';

const Navigation = () => {
	const dispatch = useDispatch();
	const messages = useSelector(selectUIMessages);
	const isLogin = useSelector(isLoginSelector);

	messages.map(message => {
		Toast.show(message.text, Toast.LONG);
		dispatch(removeMessageByKey(message.key));
	});

	return (
		<NavigationContainer>
			{
				isLogin
					? (<MainStack />)
					: (<LoginStack />)
			}
		</NavigationContainer>
	)
}

export default Navigation
