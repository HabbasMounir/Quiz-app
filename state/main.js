let   myQuiz=document.getElementById("Quiz--app")
let myanswers=document.querySelector(".answers")
let bullets=document.querySelector(".bullets")
let submitButton=document.querySelector(".submit_Button")

let QuestionCount=0;
let   QuestionArea=document.getElementById("Quiz__area")






function getQuestion() {

    let myReauest = new XMLHttpRequest();

myReauest.onreadystatechange=function () {
    if(myReauest.status===200 && myReauest.readyState===4){
        // console.log(myReauest)
                let Question= JSON.parse(this.responseText)
                let QuestionCounter=Question.length
        console.log(QuestionCounter)

    //bullets creation
        bulletsCreator(QuestionCounter)

        // add Data
        addQuestionData(Question[QuestionCount],QuestionCounter);
    }
}



myReauest.open("GET","./state/QU.json",true);
myReauest.send();




}
getQuestion()

function bulletsCreator(num) {

    // creat spans
    for (let i = 0; i < num; i++) {
            // creat span
        let    bullet=document.createElement("span")

        i===QuestionCount  ?bullet.className="bullet--active":"";
        bullets.appendChild(bullet)

    }
}
function addQuestionData(obj,Count){
    console.log(obj);
    let QuestionTitle=document.createElement("h2");
    QuestionTitle.innerHTML=`${obj["title"]} :`
    QuestionArea.appendChild(QuestionTitle);

}