import React,{useState,useEffect} from 'react'
import {Text,View,Dimensions,ScrollView,BackHandler, StyleSheet} from 'react-native'
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
        return (
            <>
            <Text>{name1}</Text>
            <ScrollView horizontal={true}>
            <LineChart
            data={{
                labels: epoch,
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
            <Text style={styles.titlefont}>{route.params.data.model_name}</Text>
            {DrawChart("accuracy", "val_accuracy", acc, val_acc)}
            {DrawChart("loss","val_loss", loss,val_loss)}
        </ScrollView>

    </View>
  )
}

export default DetailPage