import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Container from '../components/Container'
import { useSelector } from 'react-redux'
import { RenderRecentTransaction } from './Home'
import Fonts from '../constants/Fonts';
import { useNavigation } from '@react-navigation/native'
const AllTransactions = () => {
    const { transactions } = useSelector(state => state)
    const navigation = useNavigation()
    return (
        <Container>
            {transactions.recentTransactions.length > 0 ? <FlatList data={transactions.recentTransactions} renderItem={({ item }) => <RenderRecentTransaction item={item} />} /> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{
                    textAlign: 'center',
                    lineHeight: 35,
                    color: 'white',
                    fontSize: 20,
                    marginBottom: 15,
                    fontFamily: Fonts.regular
                }}>It looks like you have 0 transactions. Why don't you add one or two?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('New Transaction')} style={{ backgroundColor: '#C0392B', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 5 }}>
                    <Text style={{ color: 'white', fontSize: 17, fontFamily: Fonts.semiBold, }}>Add A transaction</Text>
                </TouchableOpacity>
            </View>}

        </Container>
    )
}

export default AllTransactions

const styles = StyleSheet.create({})
