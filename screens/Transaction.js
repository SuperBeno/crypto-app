import React from 'react';
import {
    StyleSheet,
    View,
    Text, 
    SafeAreaView,
    ScrollView
} from 'react-native';

import {HeaderBar, CurrencyLabel, TextButton, TransactionHistory, HeaderPortfolio} from "../components";
import { dummyData, COLORS, SIZES, FONTS} from "../constants";

const Transaction = () => {

    const [transactionHistory, settransactionHistory] = React.useState(dummyData.transactionHistory)

    return (
        <SafeAreaView style={{flex:1}}>
            <HeaderBar
                rigth={false}
            />
            <ScrollView>
                <HeaderPortfolio />
                <TransactionHistory
                customContainerStyle={{marginTop:-90,...styles.shadow}}
                history={transactionHistory}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    }
})

export default Transaction;