import React,{useState,useEffect} from 'react'
import {Text,View,Dimensions,ScrollView,BackHandler} from 'react-native'
import {LineChart} from 'react-native-chart-kit'

function DetailPage({route,navigation}) {
    const [acc,setacc] = useState(route.params.data.acc);
    const [val_acc,setval_acc] = useState(route.params.data.val_acc);
    const [loss,setloss] = useState(route.params.data.loss);
    const [val_loss,setval_loss] = useState(route.params.data.val_loss);
    const [epoch, setepoch] = useState(route.params.data.epoch);

    useEffect(()=>{
        const backhandler = BackHandler.addEventListener('hardwareBackPress', ()=>{
            navigation.navigate('Home')
        })
    },[])


    const DrawChart = (param, name) =>{
        return (
            <>
            <Text>{name}</Text>
            <ScrollView horizontal={true}>
            <LineChart
            data={{
                labels: epoch,
                datasets: [{
                    data: param
                }
                ]
            }}
            width={Dimensions.get("window").width+800}
            height={220}
            yAxisInterval={1}
            chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255,255,255,${opacity})`,
                labelColor: (opacity = 1) => `rgba(255,255,255,${opacity})`,
                style: {
                    borderRadius: 5
                },
                propsForDots: {
                    r: "3",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                }
            }}
            bezier
            style={{
                marginVertical: 10,
                borderRadius: 5
            }}
        />
        </ScrollView>
        </>
        )
    }

  return (
    <View style={{backgroundColor:"#000000"}}>
        <ScrollView>
            <Text>{route.params.data.model_name}</Text>
            {DrawChart(acc,"accuracy")}
            {DrawChart(val_acc, "valid_accuracy")}
            {DrawChart(loss, "loss")}
            {DrawChart(val_loss, "valid_loss")}
        </ScrollView>

    </View>
  )
}

export default DetailPage