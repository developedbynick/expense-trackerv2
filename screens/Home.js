import React, { useRef } from 'react'
import { Animated, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import Container from '../components/Container';
import Fonts from '../constants/Fonts'
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

const renderSummaryAndAction = () => {
    // This component renders the so called hero section on the home page. This section contains a title header, budget value, and a way to add new transactions 😉
    const { transactions } = useSelector((state => state))
    const marginRight = useRef(new Animated.Value(5)).current;
    const navigation = useNavigation()
    const handleAddNewTransactions = () => {
        Animated.timing(marginRight, {
            toValue: 8,
            duration: 100,
            useNativeDriver: false,
        }).start(() => {
            navigation.navigate('New Transaction');
            Animated.timing(marginRight, {
                duration: 100,
                toValue: 5,
                useNativeDriver: false
            })
        })
    }
    return <View style={styles.summaryAndAction}>
        <Text style={{ fontFamily: Fonts.regular, color: 'white', fontSize: 18, letterSpacing: 1, marginBottom: 15 }}>Budgeting Balance</Text>
        <Text style={{ fontFamily: Fonts.bold, color: 'white', fontSize: 35, letterSpacing: 1 }}>${transactions.total}</Text>
        <TouchableOpacity onPress={handleAddNewTransactions} activeOpacity={0.6} style={{ marginTop: 20 }}>
            <View style={{ paddingVertical: 8, paddingHorizontal: 20, backgroundColor: '#222', borderRadius: 100, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} >
                <Animated.Text style={{ color: 'white', fontFamily: Fonts.semiBold, marginRight, }}>Add New Transactions</Animated.Text>
                <Ionicons name="arrow-forward" size={20} color={'white'} />
            </View>
        </TouchableOpacity>
    </View>
}
const RenderRecentTransactionsHeader = (props) => {
    // This component renders the recent transactions header.
    const handleNavigateToAllTransactions = () => {
        // 1. Animate Arrow forward 5px to the right(no native driver)
        // 2. Navigate to page
        props.navigation.navigate('All Transactions')

    }
    return <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontFamily: Fonts.bold, fontSize: 18, color: 'white' }}>Recent Transactions</Text>

        <TouchableOpacity onPress={handleNavigateToAllTransactions} activeOpacity={0.8} style={{ flexDirection: 'row', width: '20%', maxWidth: 150, justifyContent: 'center', }}>
            <Text style={{ color: '#C0392B', marginRight: 5 }}>See All</Text>
            <Ionicons name="arrow-forward" size={20} color="#C0392B" />
        </TouchableOpacity>
    </View>
}
const RenderRecentTransactionBody = () => {
    const { transactions } = useSelector(state => state);
    if (!transactions.recentTransactions.length) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ fontFamily: Fonts.regular, color: 'white', textAlign: 'center', fontSize: 24, lineHeight: 43 }}>You have no recent transactions.</Text>
        </View>
    }
    return null
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
