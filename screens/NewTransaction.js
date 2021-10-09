import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Container from '../components/Container'
import Fonts from '../constants/Fonts'
import Form from '../components/newTransactions/Form'


const NewTransaction = () => {
    return (
        <Container>
            <Form />
        </Container>
    )
}

export default NewTransaction

const styles = StyleSheet.create({})
