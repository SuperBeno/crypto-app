import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Image,
    ScrollView,
    Animated,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import {VictoryScatter, VictoryLine, VictoryChart, VictoryAxis} from "victory-native";
import {VictoryCustomTheme} from '../styles';
import { HeaderBar, CurrencyLabel, TextButton, PriceAlert } from "../components";
import { dummyData, COLORS, FONTS, SIZES, icons} from "../constants";

const CryptoDetail = ({ route, navigation }) => {

    const [selectedCurrency, setSelectedCurrency] = React.useState(null)
    const [chartOptions, setChartoptions] = React.useState(dummyData.chartOptions)
    const [selectedOption, setSelectedoption] = React.useState(chartOptions[0])

    React.useEffect(() => {
        const {currency} = route.params;
        setSelectedCurrency(currency)
    }, [])

    function optionOnClickHandler(option) {
        setSelectedoption(option)
    }

    function renderChart() {
        return (
            <View
                style={{
                    marginTop:SIZES.padding,
                    marginHorizontal:SIZES.radius,
                    alignItems:'center',
                    borderRadius:SIZES.radius,
                    backgroundColor:COLORS.white,
                    ...styles.shadow
                }}
            >
                {/** Header */}
                <View 
                    style={{
                        flexDirection:'row',
                        marginTop:SIZES.padding,
                        marginHorizontal:SIZES.padding
                    }}
                >
                    <View style={{flex: 1}}>
                        <CurrencyLabel
                            icon={selectedCurrency?.image}
                            currency={selectedCurrency?.currency}
                            code={selectedCurrency?.code}
                        />
                    </View>
                    <View>
                        <Text style={{...FONTS.h3}}>${selectedCurrency?.amount}</Text>
                        <Text style={{ color: selectedCurrency?.type == "I" ? COLORS.green : COLORS.red, ...FONTS.body3 }}>${selectedCurrency?.changes}</Text>
                    </View>
                </View>
                {/** Chart */}
                <View 
                    style={{
                        marginTop:-25,

                    }}
                >
                    <VictoryChart
                        theme={VictoryCustomTheme}
                        height={220}
                        width={SIZES.width -40}
                    >
                        <VictoryLine
                            style={{
                                data: {
                                    stroke: COLORS.secondary
                                },
                                parent:{
                                    border: "1px solid #ccc"
                                }
                            }}
                            data={selectedCurrency?.chartData}
                            categories={{
                                x:["15 MIN", "30 MIN", "45 MIN", "60 MIN"],
                                y:["15", "30", "45"]
                            }}
                        />

                        <VictoryScatter
                            data={selectedCurrency?.chartData}
                            size={7}
                            style={{
                                data:{
                                    fill:COLORS.secondary
                                }
                            }}
                        />
                        <VictoryAxis
                            style={{
                                grid:{
                                    stroke:"transparent"
                                }
                            }}
                        />
                        <VictoryAxis
                            dependentAxis
                            style={{
                                axis:{
                                    stroke:"transparent"
                                },
                                grid:{
                                    stroke:'grey'
                                }
                            }}
                        />
                    </VictoryChart>
                </View>

                {/**Option */}
                <View 
                    style={{ 
                        width:'100%', 
                        paddingHorizontal:SIZES.padding, 
                        flexDirection: 'row', 
                        justifyContent:'space-between'
                        }}
                    >
                    {
                        chartOptions.map((option) => {
                            return(
                                <TextButton
                                    key={`option-${option.id}`}
                                    label={option.label}
                                    customContainerStyle={{
                                        height:30,
                                        width:60,
                                        borderRadius:15,
                                        backgroundColor: selectedOption.id == option.id ? COLORS.primary : COLORS.Lightgray
                                    }}
                                    customLabelStyle={{
                                        color: selectedOption.id == option.id ? COLORS.white : COLORS.gray, 
                                        ...FONTS.body5
                                    }}
                                    onPress={() => optionOnClickHandler(option)}
                                />
                            )
                        })
                    }
                </View>
                {/**Dots */}
            </View>
        )
    }
    function renderBuy(){
        return (
            <View
                style={{
                    marginTop:SIZES.padding,
                    marginHorizontal:SIZES.radius,
                    padding:SIZES.radius,
                    borderRadius:SIZES.radius,
                    backgroundColor:COLORS.white,
                    ...styles.shadow
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems:'center',
                        marginBottom: SIZES.radius
                    }}
                >
                    {/**Currency*/}
                    <View style={{flex:1}}>
                        <CurrencyLabel
                            icon={selectedCurrency?.image}
                            currency={`${selectedCurrency?.currency} Wallet`}
                            code={selectedCurrency?.code}
                        />
                    </View>
                    {/** Amount */}
                    <View style={{flexDirection: 'row', alignItems:'center'}}>
                        <View style={{marginRight:SIZES.base}}>
                            <Text style={{...FONTS.h3}}>${selectedCurrency?.wallet.value}</Text>
                            <Text style={{textAlign:'right', color:COLORS.gray,...FONTS.body4}}>{selectedCurrency?.wallet.crypto}{selectedCurrency?.code}</Text>
                        </View>
                        <Image
                            source={icons.right_arrow}
                            resizeMode='cover'
                            style={{
                                width: 20,
                                height:20,
                                tintcolor:COLORS.gray
                            }}
                        />
                    </View>
                </View>

                <TextButton
                    label="View"
                    onPress={() => navigation.navigate("Portfolio", {currency: selectedCurrency })}
                />
            </View>
        )
    }

    function renderAbout() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    marginHorizontal:SIZES.radius,
                    padding:SIZES.radius,
                    borderRadius:SIZES.radius,
                    backgroundColor:COLORS.white,
                    ...styles.shadow
                }}
            >
                <Text style={{...FONTS.h3}}>About {selectedCurrency?.currency}</Text>
                <Text style={{marginTop:SIZES.base, ...FONTS.body3}}>{selectedCurrency?.description}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor: COLORS.lightGray1
            }}
        >
            <HeaderBar 
                right={true}
                
            />

            <ScrollView>
                <View style={{flex:1, paddingBottom:SIZES.padding}}>
                    {renderChart()}
                    {renderBuy()}
                    {renderAbout()}
                    <PriceAlert
                        customContainerStyle={{
                            marginTop:SIZES.padding,
                            marginHorizontal:SIZES.radius
                        }}
                    />
                </View>
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

export default CryptoDetail;