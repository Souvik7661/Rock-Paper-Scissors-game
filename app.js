let userScore=0;
let compScore=0;
let userName = prompt("PLEASE ENTER YOUR NAME :) ");
if (!userName) userName = "You";
document.querySelector("#user-name").innerText=userName;
const choice=document.querySelectorAll(".Choice");

const msg=document.querySelector("#msg");

const userScorePara= document.querySelector("#user-score");
const compscorePara= document.querySelector("#comp-score");
const generateCompchoice=() =>
{
    const options =["rock","paper","scissors"];
    const randIdx=Math.floor(Math.random()*3);
    return options[randIdx];
}

const draw=()=>
{
    msg.innerText=` Game Draw !!${userName} .. Play Again :) `;
    msg.style.backgroundColor="white";
}


const winner=(win,userchoice,compChoice)=>
{
    if(win)
    {
        userScore++;
        userScorePara.innerText=userScore
        console.log("Win");
        msg.innerText=`Congratulations ${userName} :) because, your ${userchoice} beats ${compChoice}`;
        msg.style.backgroundColor="lightgreen";
    }
    else
    {
        compScore++;
        compscorePara.innerText=compScore;
        msg.innerText=`Better Luck Next Time ! Because, ${compChoice} beats your ${userchoice}`;
        msg.style.backgroundColor="red";
    }
};
const playGame=(userchoice)=>
{
    const compChoice=generateCompchoice();
    console.log("comp choice =", compChoice);
    const user=userchoice.toLowerCase();
    const comp=compChoice.toLowerCase();

    if(user==comp)
    {
        draw();
    }
    else
    {
        let win=true;
        if(user=="rock")
        {
           win= comp=="paper" ? false : true;
        }
        else
        {
            if(user=="paper")
            {
                win=comp=="scissors" ? false:true;
            }
            else
            {
                win=comp=="rock"? false:true;
            }
        }
        winner(win,userchoice,compChoice);
    }
};

choice.forEach((choice) => 
    {
    choice.addEventListener("click",()=>
    {
        const userchoice=choice.getAttribute("id");
        playGame(userchoice);
    });
    
});

document.querySelector("#reset-btn").addEventListener("click",()=>
{
    userScore=0;
    compScore=0;
    userScorePara.innerText=userScore;
    compscorePara.innerText=compScore;
    msg.innerText=`Scores reset... Let's Play Again , ${userName} !`;
    msg.style.backgroundColor="white";
})