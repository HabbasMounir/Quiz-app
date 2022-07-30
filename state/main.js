let   myQuiz=document.getElementById("Quiz--app")
let myanswers=document.querySelector(".answers")
let bullets=document.querySelector(".bullets")
let submitButton=document.querySelector(".submit_Button")
let   QuestionArea=document.getElementById("Quiz__area")
let countdownSpan=document.querySelector(".count_down")
let QuestionCount=0;
let rightAnswers=0;
let bulletArry=[""];


function getQuestion() {

    let myReauest = new XMLHttpRequest();

myReauest.onreadystatechange=function () {
    if(myReauest.status===200 && myReauest.readyState===4){
                let Question= JSON.parse(this.responseText)
                let QuestionCounter=Question.length
    //bullets creation
        bulletsCreator(QuestionCounter)

        // add Data
        addQuestionData(Question[QuestionCount],QuestionCounter);

        //click on submit
      submitButton.onclick = () => {
        // GET RIGHT ANSWER:
        let rightAnswer = Question[QuestionCount].rightanswer;


        // check
                checkRightnswer(rightAnswer,QuestionCounter);


                  QuestionCount++
        


        // remove
        // bullets.innerHTML=""
        myanswers.innerHTML=""
        QuestionArea.innerHTML=""



        addQuestionData(Question[QuestionCount],QuestionCounter); 
        ShowResulte(QuestionCounter);
};  
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
        i<=QuestionCount  ?bullet.className="bullet--active":"";
        bullets.appendChild(bullet)

    }
}

function addQuestionData(obj,QuCounter){
if ( QuestionCount<QuCounter) {
      // console.log(obj);
      let QuestionTitle=document.createElement("h2");
      QuestionTitle.innerHTML=`${obj["title"]} :`
      QuestionArea.appendChild(QuestionTitle);
  
  
      let answrSize=Object.keys(obj).length-2  //2(title + Right answer)
      // answer
  
      for(i=1;i<=answrSize;i++){
      let QuestionAnswer=document.createElement("div");
          QuestionAnswer.className="answer" 
  
                          // Create Radio Input
      let radioInput = document.createElement("input");
  
        // Add Type + Name + Id + Data-Attribute
      radioInput.name = "answer";
      radioInput.type = "radio";
      radioInput.id = `answer_0${i}`;
      radioInput.dataset.answer = obj[`answer_0${i}`];
  
        // Make First Option Selected
      if (i === 1) {
          radioInput.checked = true;
      }
  
        // Create Label
      let theLabel = document.createElement("label");
      theLabel.className=`labele--active`
        // Add For Attribute
      theLabel.htmlFor = `answer_0${i}`;
  
        // Create Label Text
      let theLabelText = document.createTextNode(obj[`answer_0${i}`]);
  
        // Add The Text To Label
      theLabel.appendChild(theLabelText);
  
        // Add Input + Label To Main Div
      QuestionAnswer.appendChild(radioInput);
      QuestionAnswer.appendChild(theLabel);
  
        // Append All Divs To Answers Area
          myanswers.appendChild(QuestionAnswer);
  
      }
}

}
function checkRightnswer(rigAns,QueCou){
    let answers=document.getElementsByName("answer")
    // console.log(answers)
    let choosenAnswer;
    for(let i=0; i <answers.length; i++){
            let  labels=document.querySelectorAll("label")

        labels[i].classList.remove("answer--wrong")            
        labels[i].classList.remove("answer--right")   

        if(answers[i].checked === true){
            let  bulleter=document.querySelectorAll(".bullets span")
            choosenAnswer=answers[i].dataset.answer

        if (choosenAnswer===rigAns) {
          rightAnswers++;
            labels[i].classList.add("answer--right")
            bulletArry[bulletArry.length]=true;
            bulleter[QuestionCount].className="bullet--right"
        } else{
            labels[i].classList.add("answer--wrong")
            bulletArry[bulletArry.length]=false;
            bulleter[QuestionCount].className="bullet--wrong"
        }


        QuestionCount+1 <bulleter.length ?bulleter[QuestionCount+1].className="bullet--active":"";
        answers[i].checked = false;
        
      }
    }

}



function ShowResulte(Counter){
if(QuestionCount===Counter){
let resultMessage;

    if (rightAnswers==0) {
  resultMessage="Do you even know your birthday";

    }else if(rightAnswers>Counter/2 && rightAnswers < Counter) {
      resultMessage="Very well";
    } else if(rightAnswers== Counter) {
      resultMessage="GG ";
    }else{
      resultMessage="At least you tried";
    }
console.log(rightAnswers)
console.log(resultMessage)
QuestionArea.remove();
submitButton.remove();


myanswers.classList.add("result")
myanswers.innerHTML=`
<div class="resultMessage">${resultMessage}</div>
<div class="result__number">
<span class="result__numberHand">${rightAnswers}</span>/${Counter}
</div> 
`
  

let resultHand=document.querySelector(".result__numberHand")
if(rightAnswers== 0) {
  resultHand.style.color=" var(--noHand)";
}else if(rightAnswers>Counter/2 && rightAnswers < Counter) {
  resultHand.style.color=" var(----right)";

  } else if(rightAnswers== Counter) {
    resultHand.style.color=" var(--perfect)";
  }else{
    resultHand.style.color=" var(--wrong)";
  }

}
}

function countDown(duration,QuCounter) {
  if ( QuestionCount<QuCounter) {
let minutes ,seconds;
countdownInterval=setInterval(() => {
  minutes=parseInt(duration/60)
  seconds=parseInt(duration%60)
}, 1000);
}
}