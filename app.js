document.addEventListener("DOMContentLoaded", () => 
{
  let userScore = 0;
  let compScore = 0;
  let userName = "You";

  const welcomeScreen = document.getElementById("welcome-screen");
  const gameScreen = document.getElementById("game-screen");
  const startBtn = document.getElementById("startBtn");
  const nameInput = document.getElementById("name-input");
  const userNameDisplay = document.getElementById("user-name");
  

  startBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();

    if (name !== "") {
      userName = name;
      userNameDisplay.textContent = userName;
      welcomeScreen.style.display = "none";
      gameScreen.classList.add("show");
      document.getElementById("welcome-screen").remove();
      loadParticles("dark");
    } 
    else 
    {
      alert(" PLEASE ENTER YOUR NAME FIRST !");
    }
  });

nameInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      startBtn.click();
    }
  });

  const choice = document.querySelectorAll(".Choice");
  const msg = document.querySelector("#msg");
  const userScorePara = document.querySelector("#user-score");
  const compscorePara = document.querySelector("#comp-score");

  const generateCompchoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
  };

  const draw = () => {
    msg.innerText = `😐 It's a Draw, ${userName}. Try Again!`;
    msg.style.backgroundColor = "#333";
  };

  const winner = (win, userchoice, compChoice) => {
    const chosenDiv = document.getElementById(userchoice);
    chosenDiv.classList.add("winner-glow");
    setTimeout(() => chosenDiv.classList.remove("winner-glow"), 1000);

    userScorePara.style.color = userScore >= compScore ? "lightgreen" : "white";
    compscorePara.style.color = compScore > userScore ? "salmon" : "white";

    if (win) {
      userScore++;
      userScorePara.innerText = userScore;
      userScorePara.classList.add("bounce");
      setTimeout(() => userScorePara.classList.remove("bounce"), 500);
      msg.innerText = `🎉 ${userName}, you won!`;
    } else {
      compScore++;
      compscorePara.innerText = compScore;
      compscorePara.classList.add("bounce");
      setTimeout(() => compscorePara.classList.remove("bounce"), 500);
      msg.innerText = `😞 ${userName}, you lost!`;
    }
  };

  const playGame = (userchoice) => {
  const compChoice = generateCompchoice();
  const user = userchoice.toLowerCase();
  const comp = compChoice.toLowerCase();
  const clickedDiv = document.getElementById(userchoice);
  const compDiv = document.getElementById(compChoice);

  choice.forEach(c => c.classList.remove("choice-win", "choice-lose", "choice-draw", "hand-shake"));

  clickedDiv.classList.add("hand-shake");
  compDiv.classList.add("hand-shake");

  setTimeout(() => {
    clickedDiv.classList.remove("hand-shake");
    compDiv.classList.remove("hand-shake");

    if (user === comp) {
      draw();
      clickedDiv.classList.add("choice-draw");
      compDiv.classList.add("choice-draw");
    } else {
      let win = true;
      if (user === "rock") {
        win = comp !== "paper";
      } else if (user === "paper") {
        win = comp !== "scissors";
      } else {
        win = comp !== "rock";
      }

      winner(win, userchoice, compChoice);

      if (win) {
        clickedDiv.classList.add("choice-win");
        compDiv.classList.add("choice-lose");
      } else {
        clickedDiv.classList.add("choice-lose");
        compDiv.classList.add("choice-win");
      }
    }
  }, 600); 
};

  choice.forEach((choice) => {
    choice.addEventListener("click", () => {
      const userchoice = choice.getAttribute("id");
      playGame(userchoice);
    });
  });

  document.querySelector("#reset-btn").addEventListener("click", () => {
    userScore = 0;
    compScore = 0;
    userScorePara.innerText = userScore;
    compscorePara.innerText = compScore;
    msg.innerText = `Scores reset... Let's play again, ${userName}!`;
    msg.style.backgroundColor = "white";
  });


  const toggleBtn = document.getElementById('toggle-btn');
  let isDark = true;

  toggleBtn.addEventListener('click', () => {
    isDark = !isDark;
    document.body.classList.toggle('light-mode', !isDark);
    toggleBtn.textContent = isDark ? '🌙 Dark Mode' : '☀️ Light Mode';
    loadParticles(isDark ? 'dark' : 'light');
  });

  function loadParticles(mode) {
  particlesJS("particles-js", {
    particles: {
      number: { value: mode === "light" ? 200 : 300 },
      color: {
        value: mode === "dark"
          ? ["#00ffe7", "#ff00c8", "#00f"]
          : ["#ffd600", "#fff700", "#fffbe6"]
      },
      shape: { type: ["circle", "stars","triangle"] },
      opacity: { value: mode === "light" ? 1 : 0.9, random: true },
      size: { value: mode === "light" ? 6 : 5, random: true },
      line_linked: {
        enable: true,
        distance: 120,
        color: mode === "dark" ? "#ffffff" : "#ffd600",
        opacity: 0.6,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        out_mode: "out"
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" }
      },
      modes: {
        repulse: { distance: 100 },
        push: { particles_nb: 4 }
      }
    },
    retina_detect: true
  });

  setTimeout(() => 
    {
    const canvas = document.querySelector('#particles-js > canvas');
    if (canvas) {
      canvas.style.filter = mode === 'light'
        ? 'drop-shadow(0 0 32px #ffd600) drop-shadow(0 0 64px #fffbe6)'
        : 'drop-shadow(0 0 24px #00ffe7) drop-shadow(0 0 32px #ff00c8)';
    }
    }, 500);
    }
  });
