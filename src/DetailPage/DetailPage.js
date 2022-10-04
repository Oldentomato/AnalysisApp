import React,{useState,useEffect} from 'react'
import {Text,View,Dimensions,ScrollView,BackHandler, StyleSheet} from 'react-native'
import {LineChart} from 'react-native-chart-kit'

function DetailPage({route,navigation}) {
    const acc = route.params.data.logs.acc;
    const val_acc = route.params.data.logs.val_acc;
    const loss = route.params.data.logs.loss;
    const val_loss = route.params.data.logs.val_loss;
    const epoch = route.params.data.logs.epoch;
    
    const model_name = route.params.data.model_name
    const max_epoch = route.params.data.max_epoch
    const learning_rate = route.params.data.learning_rate
    const batch_size = route.params.data.batch_size
    const optimizer = route.params.data.optimizer
    const sgd_momentum = route.params.data.sgd_momentum
    const lr_scheduler_gamma = route.params.data.lr_scheduler_gamma
    const lr_scheduler_step = route.params.data.lr_scheduler_step
    
    useEffect(()=>{
        const backhandler = BackHandler.addEventListener('hardwareBackPress', ()=>{
            navigation.navigate('Home')
            return true;
        })
        return () =>{
            backhandler.remove();
        }
    },[])

    const styles = StyleSheet.create({
        container:{
            flex: 1,
            alignItems: "center",
            backgroundColor:"#323232"
        },
        titlefont:{
            marginTop:15,
            fontSize: 30,
            marginBottom: 40
        }
    })


    const DrawChart = (name1,name2, ...rest) =>{
        epoch_label = []
        for(let i =1; i<=epoch; i++){
            epoch_label[i] = i
        }
        return (
            <>
            <Text>{name1}</Text>
            <ScrollView horizontal={true}>
            <LineChart
            data={{
                labels: epoch_label,
                datasets: [{
                    data: rest[0],
                    color: (opacity = 1) => `rgba(255, 60, 0, ${opacity})` 
                },
                {
                    data: rest[1],
                    color: (opacity = 1) => `rgba(0, 100, 255, ${opacity})` 
                }
                ],
                legend: [name1,name2]
            }}
            width={Dimensions.get("window").width+800}
            height={220}
            yAxisInterval={1}
            chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#329632",
                backgroundGradientTo: "#329632",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255,255,255,${opacity})`,
                labelColor: (opacity = 1) => `rgba(255,255,255,${opacity})`,
                style: {
                    borderRadius: 5
                },
                propsForDots: {
                    r: "2",
                    strokeWidth: "2",
                    stroke: "#000000"
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
    <View style={styles.container}>

        <ScrollView>
        <Text style={styles.titlefont}>{model_name}</Text>
        <Text>Max Epoch: {max_epoch}</Text>
        <Text>learning_rate: {learning_rate}</Text>
        <Text>batch_size: {batch_size}</Text>
        <Text>optimizer: {optimizer}</Text>
        <Text>sgd_momentum: {sgd_momentum}</Text>
        <Text>lr_scheduler_gamma: {lr_scheduler_gamma}</Text>
        <Text>lr_scheduler_step: {lr_scheduler_step}</Text>
            {DrawChart("accuracy", "val_accuracy", acc, val_acc)}
            {DrawChart("loss","val_loss", loss,val_loss)}
        </ScrollView>


    </View>
  )
}

export default DetailPage