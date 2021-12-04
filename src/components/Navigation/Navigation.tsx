import {
	Text,
	TouchableOpacity,
} from 'react-native';
import {
	useDispatch,
	useSelector,
} from 'react-redux';

import React from 'react'
import Toast from 'react-native-simple-toast';
import { getAuth } from '../../core/auth/auth.actions';
import { removeMessageByKey } from '../../core/ui/ui.actions';
import { selectUIMessages } from '../../core/ui/ui.selectors';

const Navigation = () => {
	const dispatch = useDispatch();
	const messages = useSelector(selectUIMessages);

	messages.map(message => {
		Toast.show(message.text, Toast.LONG);
		dispatch(removeMessageByKey(message.key));
	});

	return (
		<TouchableOpacity
			onPress={async () => { await dispatch(getAuth('sanya.bedson@gmail.com', 'qwerty')) }}
		>
			<Text>login</Text>
		</TouchableOpacity>
	)
}

export default Navigation
