import React, { useRef } from 'react'
import { Animated, StyleSheet, Text, TouchableOpacity, View, FlatList, Alert } from 'react-native'
import Container from '../components/Container';
import Fonts from '../constants/Fonts'
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { ACTIONS } from '../store/reducers/transactions';
import numbro from 'numbro';

const renderSummaryAndAction = () => {
    // This component renders the so called hero section on the home page. This section contains a title header, budget value, and a way to add new transactions 😉
    const { transactions } = useSelector((state => state))
    const marginRight = useRef(new Animated.Value(5)).current;
    const navigation = useNavigation()
    const handleAddNewTransactions = (callback = () => { }) => {
        Animated.timing(marginRight, {
            toValue: 8,
            duration: 100,
            useNativeDriver: false,
        }).start(callback)
    }
    const handleOnPressOut = () => {
        Animated.timing(marginRight, {
            toValue: 5,
            duration: 100,
            useNativeDriver: false
        }).start()
    }
    return <View style={styles.summaryAndAction}>
        <Text style={{ fontFamily: Fonts.regular, color: 'white', fontSize: 18, letterSpacing: 1, marginBottom: 15 }}>Budgeting Balance</Text>
        <Text style={{ fontFamily: Fonts.bold, color: 'white', fontSize: 35, letterSpacing: 1 }}>${numbro(transactions.total).format({ thousandSeparated: true })}</Text>
        <TouchableOpacity onPress={() => handleAddNewTransactions(() => {
            navigation.navigate('New Transaction')
        })} onPressOut={handleOnPressOut} onPressIn={() => handleAddNewTransactions()} activeOpacity={0.6} style={{ marginTop: 20 }}>
            <View style={{ paddingVertical: 8, paddingHorizontal: 20, backgroundColor: '#222', borderRadius: 100, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} >
                <Animated.Text style={{ color: 'white', fontFamily: Fonts.semiBold, marginRight, }}>Add New Transactions</Animated.Text>
                <Ionicons name="arrow-forward" size={20} color={'white'} />
            </View>
        </TouchableOpacity>
    </View >
}
const RenderRecentTransactionsHeader = (props) => {
    // This component renders the recent transactions header.
    const handleNavigateToAllTransactions = () => {
        // 1. Animate Arrow forward 5px to the right(no native driver)
        // 2. Navigate to page
        props.navigation.navigate('All Transactions')

    }
    return <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 25 }}>
        <Text style={{ fontFamily: Fonts.bold, fontSize: 18, color: 'white' }}>Recent Transactions</Text>

        <TouchableOpacity onPress={handleNavigateToAllTransactions} activeOpacity={0.8} style={{ flexDirection: 'row', width: '20%', maxWidth: 150, justifyContent: 'center', }}>
            <Text style={{ color: '#C0392B', marginRight: 5, fontFamily: Fonts.semiBold, fontSize: 16.5 }}>See All</Text>
            <Ionicons name="arrow-forward" size={20} color="#C0392B" />
        </TouchableOpacity>
    </View>
}
export const RenderRecentTransaction = (props) => {
    const dispatch = useDispatch()
    const handleDeleteItem = () => {
        dispatch({ type: ACTIONS.REMOVE_TRANSACTION, id: props.item.id })
    }
    return <TouchableOpacity onLongPress={handleDeleteItem} activeOpacity={0.8} style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: '#434343', borderBottomWidth: 1, marginBottom: 10, paddingVertical: 10, }}>
        <Text numberOfLines={1} style={{ fontSize: 18, color: 'white', fontFamily: Fonts.semiBold, flex: 1, marginRight: 15 }}>{props.item.name}</Text>
        <Text numberOfLines={1} style={{ fontSize: 13, color: 'white', fontFamily: Fonts.bold, color: props.item.isIncome ? '#2ecc71' : '#C0392B', }}>$ {numbro(props.item.price).format({ thousandSeparated: true })}</Text>
    </TouchableOpacity>

}

const RenderRecentTransactionBody = () => {
    const { transactions } = useSelector(state => state);
    if (!transactions.recentTransactions.length) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ fontFamily: Fonts.semiBold, color: 'white', textAlign: 'center', fontSize: 18, lineHeight: 43 }}>You have no recent transactions.</Text>
        </View>
    }
    return <FlatList
        data={transactions.recentTransactions.slice(0, 10)}
        renderItem={(item) => <RenderRecentTransaction item={item.item} />}
    />
}
const renderRecentTransactions = () => {
    const navigation = useNavigation()
    return (
        <>
            <RenderRecentTransactionsHeader navigation={navigation} />
            <RenderRecentTransactionBody />
        </>
    )
}
const Home = () => {


    return (
        <Container>
            {renderSummaryAndAction()}
            {renderRecentTransactions()}
        </Container>
    )
}

export default Home

const styles = StyleSheet.create({
    summaryAndAction: {
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
