const express = require("express");
const router = express.Router();
const mongojs = require("mongojs");

//encrypted
TxphE5Pi13roiYhRZCUBkFR7lvvZJvMj7TnF3lORQL/JCxL2vovQ6NA2ifR6grvJnD95YZdU1tWkUfw+8S+nMRXGNNza6FriOp4Bqic+2MnSpwK1OXqLSpSC0XkxCpq5BJ5C/4eql2vG3x0wsmbWKYNYu2M1xqeNoKiiINHV+uuJCsJj5aUV1w5O0ZGtmuZl4S6KmiFQ2x54rFwrm1OaFBMSKuaLIa6AQ8igWsrS4SfSjuOfvQOtiSM1AMIFevejDVO0kUUzxog7ja8cosuycKz7aNab3uFfr5hubWjVhE6JomhwHQ38HajKtYh3081GkP0DUHRauRbWuev/jPoKoQ7rrUB2foipgDA4TB8TfBahubYalRgzeJ+UDXjQGe9OYVmVc77Jcyz9+8DjZMgN41M0wwDE1lo2DKW215KSaci7/UqS7DdIbitqarAUrSSyg/qsij5A69hesHmxcQN6Y//3xzZw4PkTPNqaTAKqvzdfAm99fhQgxDkkkZKmw2Ii/WzHGRp1MEQ7Mj5WVpHlw41HgCSp1yn+1OHPzNZAs3xpoO17V5OFHEdSwMdjqR2r/RLpNXqixDQo1VC4w1nnH77JEz3NQNFUB+wS7My7Rfusjna3EWInKI8HHQwF6vijhvXrZeUYWJq0F+Z57VezxFaxaPvh2Qzb3lXXDyhwwNE=
//encrypted
PAwtMU3OjrnaFGun2fvcSCsXGSQ/cDoTd5v6WGlp41H4QEToPyuUwvCoSdXDNw8vvlT34XI40JgC8BKQh/4iYV6/cKxAth7gdEuReIex6xEM8wicoMOZmRHsBiatFuQKMdlaw3ur8r+jMSYmOULEO+jjCuJECRSKoMnQNtlZRDHtlMfJyhJJO/3TCPEcLZTmlYXI22POwyh31Z/+rqLhxq9q+TXpIy1f2pk3tWzZ82GXxV86sbRzzp4SBQVbI1U1t3gkcGB4KnJ1xe2Ymi93V5vkN5Hf07JpisujxCfwF4TKCcdZVckH7n1AA8EpgrGA0FqhbTx6GyUjFJKlfXjjfMcCkszFPxqI46HRzHWKFpXtnvtAdGN/rgxCHmtGuqfoZgaZ/nmKMrtvMlAJ9+aU8+vRGHyd67YAIGby4cpdeaVjMU0Z2YueHkoafghpvbHDu9e4/t2cQ1IWrOGBwdFpH16DX/MMlFiqAV2m2U4n2XHyiXBnhq9h2zLRpiZ6u+HRzr77acznSEGjMWAxH/Kv88qDlo/BsfQO74v+/awMt3gmsjr1af59kiC08dDxdR5F9HXXNTp/VvDwutGuAMdbSxHufBfM42+X7I2XXpHYd/RDW5fC4A/QQ5qk72vFHSbgjWAkPiWhzVwtWS4n4fiKtF10Vwf6QI9ps05pCVraIDM=
//encrypted
U5xRNFObBTGQCycHqR0Pu5BHStV5Jcrg7XKhK+bRz8k2J9H7FIxTknInHW0+vs2n6RTT0DPXmbAzt7OvMHb75UIp0W6YKPNyo9s4xDoDqpJN67OZLE6jDPRdOu6ZcSb7n2CUhCYBCrY/dzLOFw7zIT2PssVN0YvdxBFvfNMb7ojcQ0xtcqUurdL7AxjUxjUvpTyG8eA0NuuqmMp4AHQnFbtVglYh9KY1KAgzVhXp4KGYesFTNSj8isEgd1tLFiLWH9E4t3EpsVkM3QTf1p36ncifUBdnc49UK1xR9iGCZSaO8LbpV40+rDIPbNpCKFaLXDix26AOMDW3v0FPbYuko52EPD4T4Lpo74th5wJ+muvtTAU6PmO2t9/XOy77T7DtazxSjpIS5BFs66myAmVNoznePDrp1QvYgesg7JiWYMH0L/C5xvlrgqlbbdOUjBNuOlJy5d5IVxqR+AKAXT6GTeR8RzoXWsOq99ocFRq3UsVDex6SNmSchuiAf0IP0uSzPPLocCzNoUzUI0HwsM9cT+TcaVTMewD1tdG/Dzp2GwVEYNlxWmDraKSwOY/iql6ofTSup04HjJjclGKDq1qLhlniI4w1/u1cMfjuaEhCznVVgi4ymg/tDJ8Tya12XZ7bsp3KOe5k/hh3ibSkG0oKutWfW6F7XHfOyaN671zZ4Bs=


router.get("/",(req,res)=>{
    res.status(200).json({success: true})
})

router.get("/dense/getdatas",(req,res)=>{
    dense_db.Dense_collection.find((err, result)=>{
        if(err){
            res.send(err);
        }else{
            res.json(result);
        }
    })
})

router.get("/res/getdatas",(req,res)=>{
    res_db.resnet_collection.find((err, result)=>{
        if(err){
            res.send(err);
        }else{
            res.json(result);
        }
    })
})

router.get("/pytorch/getdatas",(req,res)=>{
    pytorch_db.pytorch.find((err, result)=>{
        if(err){
            res.send(err);
        }else{
            res.json(result);
        }
    })
})

module.exports = router;