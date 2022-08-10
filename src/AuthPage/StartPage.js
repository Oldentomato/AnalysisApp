import React from 'react'
import {Alert,TouchableOpacity,View,StyleSheet,Text} from 'react-native'
import TouchID from 'react-native-touch-id'

function StartPage({navigation}) {

    const styles = StyleSheet.create({
        container:{
            flex: 1,
            alignItems: "center",
            backgroundColor: "#323232"
        },
        button:{
            backgroundColor: "#64c864",
            width: 100,
            height: 50,
            marginTop: 350,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center"
        },
        font:{
            fontSize: 20,
            fontWeight: "bold"
        },
        maintextfont:{
            marginTop: 100,
            fontSize: 40,
            fontWeight: "bold"
        }
    });


    const optionalConfigObject = {
        title: 'Authentication Required', //타이틀,
        imageColor: '#e00606', //지문인식 기본 컬러
        imageErrorColor: '#ff0000', //지문인식 실패 컬러
        sensorDescription: 'Touch sensor', //터치 센서
        sensorErrorDescription: 'Failed', //터치센서 Fail Text 변경
        cancelText: 'Cancel', //Android // 취소버튼 Text변경
        unifiedErrors: false //통합 오류 메시지 사용 (기본값 false)
    }

    const AuthHandler = () =>{
        TouchID.authenticate('사용자의 지문 필요', optionalConfigObject).then(
            success=>{
                if(success){
                    navigation.navigate('Home')
                }
                else{
                    Alert.alert(
                        "인증실패",
                        "인증에 실패했습니다",
                        [{
                            text: "확인",
                            onPress: () => navigation.navigate('Start')
                        }]
                    )
                }
            }
        ).catch(err=>{
            Alert.alert(
                "인증실패",
                "인증에 실패했습니다",
                [{
                    text: "확인",
                    onPress: () => navigation.navigate('Start')
                }]
            )
        })
    }
    
  return (
    <View style={styles.container}>

        <Text style={styles.maintextfont}>Analysis{"\n"}Application</Text>
        <TouchableOpacity onPress={AuthHandler} style={styles.button}>
            <Text style={styles.font}>LOGIN</Text>
        </TouchableOpacity>

    </View>

  )
}

export default StartPage