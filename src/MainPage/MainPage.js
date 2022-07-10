import React,{useEffect,useState} from 'react'
import {Alert,BackHandler,View, Button, Text} from 'react-native'
import RNExitApp from 'react-native-exit-app'


function MainPage({navigation}) {
    const LocalURL = 'http://localhost:3000';
    const URL = 'https://qwer1234.loca.lt';
    const [data, setdata] = useState([]);
    const [status, setstatus] = useState("");


    const renderlist = data.map((element, index)=>{
        return(
            <Button key={index} title={element.model_name} onPress={()=>{
                navigation.navigate("Detail",{data: element})
            }} />
        );
    })


    useEffect(()=>{//adb reverse tcp:3000 tcp:3000 으로 서버의 포트와 맞춰야한다.
        fetch(URL+'/api/').then(response=> response.json()).then(online=>{
            if(online.success === true){
                fetch(URL+'/api/getdatas').then(response=> response.json()).then(result=>{
                    setstatus("<Online>")
                    for(var i in result){
                        const form = {
                            model_name :result[i].model_name,
                            epoch: result[i].epoch,
                            acc: result[i].acc,
                            val_acc: result[i].val_acc,
                            loss: result[i].loss,
                            val_loss: result[i].val_loss
                        }
                        setdata([form, ...data])
                    }
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

        const backhandler = BackHandler.addEventListener('hardwareBackPress', ()=>{
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
        })
        return () => backhandler.remove()
    },[])

  return (
    <View>
        <Text style={{color:'#000000'}}>{status}</Text>
        {renderlist}
    </View>
  )
}

export default MainPage