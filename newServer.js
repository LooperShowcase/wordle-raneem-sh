const express=require("express")
const app =express();

const towin = "HAPPY";
app.get("/wordle/:word",function(req,res){
    const userguess=req.params.word.toUpperCase();
    let arr = ["","","","",""];

    let map ={
        H:1,
        A:1,
        P:2,
        Y:1,
    };
    for(let i=0;i<userguess.length;i++){
        if(userguess[i]===towin[i]){
            arr[i]="green";
            let curletter=userguess[i];
            map[curletter]--;
        }
    }
    console.log(arr);
    for(let i=0; i<userguess.length;i++){
     if(userguess[i]!==towin[i]){
        let curletter=userguess[i];
        if(map[curletter]===undefined){
            arr[i]="grey";
        }else if(map[curletter]>0){
            arr[i]="orange"
            map[curletter]--;
        }else{
            arr[i] = "grey";
        }
     }
    }
    res.send(arr);
});
app.use(express.static("public"));

app.listen(3000)

