import { Picker } from '@react-native-picker/picker'
import React, { useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native'
import { TextInput, Checkbox } from 'react-native-paper'
import Fonts from '../../constants/Fonts';
import { ACTIONS } from '../../store/reducers/transactions';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Transaction from '../../model/Transaction';
const RenderNewTransactionHeader = () => {
    return <View style={{ justifyContent: 'center', alignItems: 'center', height: '20%', }}>
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
        setChecked(false)
    }
    const handleAddNewTransaction = () => {
        // 1. Validate
        if (!category && !priceValue && Number(priceValue) > 0 && !name) return Alert.alert('Did you fill out the form properly?', 'There is something important missing from an input.')
        // 2. Dispatch Action
        dispatch({ type: ACTIONS.ADD_NEW_TRANSACTION, transaction: new Transaction(name, Math.random() * 100000000000000000000000) })
        // 3. Reset Values
        resetValues()
        // 4. Navigate to home screen
        navigation.navigate('Home')

    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.formContainer}>
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
                <TextInput value={priceValue} onChangeText={(text) => setPriceValue(text.trim())} label='Value ' placeholderTextColor='white' underlineColor="#C0392B" theme={{
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
        </KeyboardAvoidingView>
    )
}

export default Form

const styles = StyleSheet.create({
    formContainer: {
        justifyContent: 'center',
        flex: 0.7,
    }
})
