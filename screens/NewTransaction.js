import React from 'react'
import { ScrollView } from 'react-native'
import Form from '../components/newTransactions/Form'


const NewTransaction = () => {
    return (
        <ScrollView contentContainerStyle={{ flex: 1, paddingHorizontal: 10 }} style={{ backgroundColor: '#111' }}>
            <Form />
        </ScrollView>
    )
}

export default NewTransaction

