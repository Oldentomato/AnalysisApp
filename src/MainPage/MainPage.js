import React,{useEffect,useState} from 'react'
import {Alert,BackHandler,View, TouchableOpacity, Text, StyleSheet,ScrollView} from 'react-native'
import RNExitApp from 'react-native-exit-app'
import AWS_URL from '../address/address'

//추가해야 할것
//모델 선택 페이지 추가
//모델리스트에서 파라미터들은 디테일페이지로 넘기고 현재 진행상황 프로그레스로만 확인
//디테일에서 테스트 결과도 출력시키기
function MainPage({navigation}) {
    const LocalURL = 'http://localhost:3000';
    const URL = AWS_URL;
    const [data, setdata] = useState([]);
    const [status, setstatus] = useState("");
    const [isready, setisready] = useState(false);

    const styles = StyleSheet.create({
        container:{
            flex: 1,
            backgroundColor: '#323232',
            alignItems: 'center',
        },
        statusfont:{
            fontSize: 15,
            color: '#0aff0a',
        },
        activefont:{
            fontSize: 15,
            color: '#32ff32',
        },
        stopfont:{
            fontSize: 15,
            color: '#ff3232',
        },
        button:{
            width: 200,
            marginTop: 50,
            backgroundColor: '#c85ac8',
            width: 350,
            paddingTop: 50,
            paddingBottom: 50,
            paddingLeft: 20,
            borderColor: '#000000',
            borderWidth: 3,
            borderColor: '#ffc832'
        },
        titlefont:{
            marginTop:15,
            fontSize: 30,
            fontWeight: 'bold',
        },
        loadingfont:{
            fontSize: 30,
            fontWeight: 'bold'
        }
    })


    const renderlist = data.map((element, index)=>{
        return(
            <TouchableOpacity key={index} style={styles.button} onPress={()=>{
                if(element.logs.epoch > 0)
                    navigation.navigate("Detail",{data: element})
            }} >
                <Text>Model_Name: {element.model_name}</Text>
                {element.logs.epoch+1 !== element.max_epoch ?
                 <Text>Progressed: {(element.logs.epoch+1) / (element.max_epoch) * 100}%</Text>:
                 <Text>isDone</Text>}
                {/* {element.isactive === true ? <Text style={styles.activefont}>Activating</Text>:
                <Text style={styles.stopfont}>Stopped</Text>}
                 <Text>Early_Stopped: {element.isearlystop ? "True" : "False"}</Text> */}
                 {/* <Text>Now Epoch: {(element.epoch_length - 1) + 1}</Text> */}

            </TouchableOpacity>
        );
    })


    useEffect(()=>{//adb reverse tcp:3000 tcp:3000 으로 서버의 포트와 맞춰야한다.
        fetch(URL+'/api/').then(response=> response.json()).then(online=>{
            if(online.success === true){
                fetch(URL+'/api/pytorch/getdatas').then(response=> response.json()).then(result=>{
                    setstatus("Server Online")
                    for(var i in result){
                        const form = {
                            model_name :result[i].model_name,
                            max_epoch: result[i].max_epoch,
                            acc: result[i].acc,
                            val_acc: result[i].val_acc,
                            loss: result[i].loss,
                            val_loss: result[i].val_loss,
                            // isactive: result[i].isactive,
                            // isearlystop: result[i].isearlystop,
                            learning_rate: result[i].learning_rate,
                            batch_size: result[i].batch_size,
                            optimizer: result[i].optimizer,
                            sgd_momentum: result[i].sgd_momentum,
                            lr_scheduler_gamma: result[i].lr_scheduler_gamma,
                            lr_scheduler_step: result[i].lr_scheduler_step,
                            logs: result[i].logs
                        }
                        setdata(data=>[...data, form])
                    }
                    setisready(true)
                }).catch((err)=>{
                    console.log("getdata_err=>"+err)
                    setstatus(`<GetData_Err>(Msg):${err}`)
                })
            }
            else{
                console.log("server offline!")
                setstatus("<Offline>")
            }
        }).catch((err)=>{
            console.log("online_check_err=>"+err)
            setstatus(`<Online_Check_Err>(Msg):${err}`)
        })

        const back_btn_callback = () =>{
            Alert.alert(
                "종료확인",
                "종료하시겠습니까?",
                [{
                    text: "예",
                    onPress:() => {
                        RNExitApp.exitApp();
                    }
                },
                {
                    text: "아니오",
                    style: "cancel"
                }
                ]
            )
            return true; //얘가 true여야 뒤로가기가 수행이 안된다.
        }

        const backhandler = BackHandler.addEventListener('hardwareBackPress', back_btn_callback)
        return () => {
            backhandler.remove()
        }
    },[])

  if(isready){
    return (
        <View style={styles.container}>
            <Text style={styles.statusfont}>{status}</Text>
            <Text style={styles.titlefont}>Model_List</Text>
            <ScrollView>
                {renderlist}
            </ScrollView>
    
        </View>
      )
  }
  else{
    return(
        <View style={styles.container}>
            <Text style={styles.statusfont}>{status}</Text>
            <Text style={styles.loadingfont}>Loading</Text>
        </View>

    )
  }
}

export default MainPage