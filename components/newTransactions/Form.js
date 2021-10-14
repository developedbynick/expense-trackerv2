import React, { useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, TouchableOpacity, Alert, Keyboard, Pressable, TouchableWithoutFeedback } from 'react-native'
import { TextInput, Checkbox } from 'react-native-paper'
import Fonts from '../../constants/Fonts';
import { ACTIONS } from '../../store/reducers/transactions';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid'
import { useDispatch } from 'react-redux';
import Transaction from '../../model/Transaction';
import numbro from 'numbro';
import { AdMobBanner } from 'expo-ads-admob';
import { ADS_BANNER_ID } from '../../constants/AdConfig';
const RenderNewTransactionHeader = () => {
    return <View style={{ justifyContent: 'center', alignItems: 'center', height: '15%', marginBottom: 5 }}>
        <Text style={{ color: 'white', fontFamily: Fonts.bold, fontSize: 30, textAlign: 'center' }}>New Transaction</Text>
    </View>
}
const Form = () => {
    const dispatch = useDispatch()
    const [category, setCategory] = useState('')
    const [name, setName] = useState('')
    const [priceValue, setPriceValue] = useState('')
    const [checked, setChecked] = useState(false)
    const navigation = useNavigation()

    const resetValues = () => {
        setName('');
        setPriceValue('')
        setCategory('')
        setChecked(false)
    }
    const handleAddNewTransaction = () => {
        // This needs to happen, because the priceValue is in a formatted string(1,000,000). Therefore, javascript does not understand that value, so we remove all the commas, and replace them with empty strings, making them look like (1000000)... replaceAll not available in expo RN
        const priceValueCopy = priceValue.split(',').join('')

        // 1. Validate
        if (!category || !priceValue || !name || +priceValueCopy === 0) return Alert.alert('Did you fill out the form properly?', 'There is something important missing from an input/s.')
        // 2. Add New transaction
        dispatch({ type: ACTIONS.ADD_NEW_TRANSACTION, transaction: new Transaction(category, name, +priceValueCopy, checked ? true : false, uuid.v4()) })
        // 3. CLear input fields
        resetValues()
        // 4. Navigate to Home
        navigation.navigate('Home')

    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={{ flex: 1, paddingHorizontal: 15, }} behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} style={styles.formContainer}>
                {RenderNewTransactionHeader()}
                <View style={{ marginBottom: 20 }}>
                    <TextInput value={category} onChangeText={(text) => setCategory(text)} label='Category' placeholderTextColor='white' underlineColor="#C0392B" theme={{
                        colors: {
                            primary: '#C0392B',
                            placeholder: 'white',
                            text: 'white'
                        }
                    }} outlineColor="white" style={{ backgroundColor: '#434343', color: 'white' }} left={<TextInput.Icon color='white' name="notebook" />} />
                </View>
                <View style={{ marginBottom: 20 }}>
                    <TextInput value={name} onChangeText={(text) => setName(text)} label='Name' placeholderTextColor='white' underlineColor="#C0392B" theme={{
                        colors: {
                            primary: '#C0392B',
                            placeholder: 'white',
                            text: 'white'
                        }
                    }} outlineColor="white" style={{ backgroundColor: '#434343', color: 'white' }} left={<TextInput.Icon color='white' name="id-card" />} />
                </View>
                <View style={{ marginBottom: 20 }}>
                    <TextInput keyboardType='numeric' value={priceValue ? numbro(priceValue).format({ thousandSeparated: true }) : ''} onChangeText={(text) => setPriceValue(text.trim())} label='Value ' placeholderTextColor='white' underlineColor="#C0392B" theme={{
                        colors: {
                            primary: '#C0392B',
                            placeholder: 'white',
                            text: 'white'
                        }
                    }} outlineColor="white" style={{ backgroundColor: '#434343', color: 'white' }} left={<TextInput.Icon color='white' name="cash" centered={true} />} />
                </View>
                <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontFamily: Fonts.semiBold, color: 'white', textTransform: 'capitalize', marginRight: 6 }}> Is this an income?</Text>
                    <Checkbox.Android onPress={() => setChecked(!checked)} label='Income' status={checked ? 'checked' : 'unchecked'} uncheckedColor='white' color='#2ecc71' style={{ backgroundColor: 'white', borderColor: 'white' }} />
                </View>
                <TouchableOpacity onPress={handleAddNewTransaction} activeOpacity={0.8} style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30, backgroundColor: '#C0392B', paddingVertical: 10, borderRadius: 5 }}>
                    <Text style={{ fontFamily: Fonts.bold, color: 'white', fontSize: 17 }}>Add New Transaction!</Text>
                </TouchableOpacity>
                <View style={{ overflow: 'hidden', marginTop: 10, borderRadius: 5 }} >
                    <AdMobBanner
                        bannerSize='fullBanner'
                        adUnitID={ADS_BANNER_ID}
                        servePersonalizedAds
                        onDidFailToReceiveAdWithError={(err) => console.log(err)}
                    />
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default Form

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
    }
})
