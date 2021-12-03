import { Text, TouchableOpacity, View } from 'react-native';

import React from 'react'
import { getAuth } from '../../core/auth/auth.actions';
import { useDispatch } from 'react-redux';

const Navigation = () => {
    const dispatch = useDispatch();
    return (
        <TouchableOpacity
            onPress={async () => { await dispatch(getAuth()) }}
        >
            <Text>login</Text>
        </TouchableOpacity>
    )
}

export default Navigation
