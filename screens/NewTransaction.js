import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Container from '../components/Container'
import Fonts from '../constants/Fonts'


// Mini-components.
const RenderNewTransactionHeader = () => {
    return <View style={{ justifyContent: 'center', alignItems: 'center', height: '20%', }}>
        <Text style={{ color: 'white', fontFamily: Fonts.bold, fontSize: 30, textAlign: 'center' }}>New Transaction</Text>
    </View>
}
const NewTransaction = () => {
    return (
        <Container>
            <RenderNewTransactionHeader />
        </Container>
    )
}

export default NewTransaction

const styles = StyleSheet.create({})
