import React from 'react'
import { StyleSheet, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
const Container = (props) => {
    return (
        <SafeAreaView {...props} style={[styles.container, props.style]} >
            {props.children}
        </SafeAreaView >
    )
}

export default Container

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        paddingHorizontal: 15
    }
})
