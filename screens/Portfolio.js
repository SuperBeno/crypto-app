import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

import { HeaderPortfolio} from "../components";
import Tabs from "../navigation/tabs";


const Portfolio = () => {
    return (
        <View>
            <HeaderPortfolio />
        
        </View>
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

export default Portfolio;