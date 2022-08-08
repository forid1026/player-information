const searchPlayer = () => {
  const inputText = document.getElementById("input-text");
  spinner("visible");
  const searchText = inputText.value;
  if (searchText == "") {
    spinner("visible");
    const errorDisplay = document.getElementById("error-display");
    errorDisplay.innerHTML = `<h3 class="text-center text-danger">You have entire empty search</h3>`;
    document.getElementById("players").textContent = "";
    document.getElementById("player-detail").textContent = "";
    document.getElementById("player-detail").textContent = "";
    spinner("hidden");
  } else {
    document.getElementById("error-display").textContent = "";
    console.log(searchText);
    inputText.value = "";
    document.getElementById("players").textContent = "";
    document.getElementById("player-detail").textContent = "";
    document.getElementById("player-detail").textContent = "";
    searchPlayerResult(searchText);
  }
};

const searchPlayerResult = async (playerName) => {
  console.log(playerName);
  const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${playerName}`;
  const res = await fetch(url);
  const data = await res.json();
  displayResult(data.player);
};

const displayResult = (players) => {
  console.log(players);
  if (players == null) {
    const errorDisplay = document.getElementById("error-display");
    errorDisplay.innerHTML = `<h3 class="text-center text-danger">Your Search Result Not Found! Try Again</h3>`;
    document.getElementById("players").textContent = "";
    document.getElementById("player-detail").textContent = "";
    document.getElementById("player-detail").textContent = "";
    spinner("hidden");
  } else {
    const playersDiv = document.getElementById("players");
    players.map((playerInfo) => {
      const player = document.createElement("div");
      player.classList.add("col-md-4", "mb-4");
      let playerImage;
      if (playerInfo.strCutout == null) {
        playerImage =
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT81rdkpAzH-RIdOOEmqEE4GmnQy2LdlodJPQ&usqp=CAU";
      } else {
        playerImage = playerInfo.strCutout;
      }
      player.innerHTML = `
    <div class="card">
        <img  src="${playerImage}" class="card-img-top h-75" alt="...">
        <div class="card-body">
            <h5 class="card-title">${playerInfo.strPlayer}</h5>
            <p class="card-text">${playerInfo.strNationality}</p>
             <a href="#" onclick="playerDetails(${playerInfo.idPlayer})" class="btn btn-info">Get Detail</a>
        </div>
    </div>
    `;
      playersDiv.appendChild(player);
      spinner("hidden");
    });
  }
};

const playerDetails = async (playerId) => {
  spinner("visible");
  const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data.players);
  console.log("data", data.players);
};

const displayDetails = (info) => {
  const playersDetail = document.getElementById("player-detail");
  info.map((playerDetail) => {
    const singleDiv = document.createElement("div");
    singleDiv.classList.add("col-md-6", "mb-5", "mx-auto", "d-block");
    let playerImage;
    if (playerDetail.strCutout == null) {
      playerImage =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT81rdkpAzH-RIdOOEmqEE4GmnQy2LdlodJPQ&usqp=CAU";
    } else {
      playerImage = playerDetail.strCutout;
    }
    singleDiv.innerHTML = `
    <div class="card">
        <img  src="${playerImage}" class="card-img-top h-75" alt="...">
        <div class="card-body">
            <h4 class="card-title">${playerDetail.strPlayer}</h4>
            <p class="card-text">Nationality: ${playerDetail.strNationality}</p>
            <p class="card-text">Birth Date: ${playerDetail.dateBorn}</p>
            <p class="card-text">Birth Location: ${playerDetail.strBirthLocation}</p>
            <p class="card-text">Height: ${playerDetail.strHeight}</p>
            <p class="card-text">Weight: ${playerDetail.strWeight}</p>
            <p class="card-text">Jersey Number: ${playerDetail.strNumber}</p>
            <p class="card-text">Playing Position: ${playerDetail.strPosition}</p>
            <p class="card-text">Club: ${playerDetail.strTeam}</p>
            <p class="card-text">Income: ${playerDetail.strWage}</p>
            <p class="card-text text-justify">Bio: ${playerDetail.strDescriptionEN}</p>
        </div>
    </div>
    `;
    playersDetail.textContent = "";
    playersDetail.appendChild(singleDiv);
    spinner("hidden");
  });
};

const spinner = (displaySpinner) =>
  (document.getElementById("loader").style.visibility = displaySpinner);
