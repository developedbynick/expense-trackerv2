import React from 'react'
import { StyleSheet } from 'react-native'
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons'
const HeaderButtonComponent = (props) => {
    return (
        <HeaderButton IconComponent={Ionicons} iconSize={23} color='white' {...props}>
        </HeaderButton>
    )
}

export default HeaderButtonComponent

const styles = StyleSheet.create({})
