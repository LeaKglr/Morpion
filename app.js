const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const annonce = document.querySelector(".annonce");
// const recommencer = document.querySelector(".recommencer");

let currentPlayer = "x";
let playerXName = "Joueur X";
let playerOName = "Joueur O";

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function checkWin() {
    // Some : On va exécuter une boucle sur mon tableau de combinaisons
    // jusqu'à rencontrer un combo gagnat et là ça retourne true
    // sinon il va jusqu'à la fin et il retourne false si le dernier n'est pas bon
    return winCombos.some(combo => {
        // Every va exécutrer une fonction sur chaque élément de ma combinaison
        // actuelle et on va venir vérifier que la cellule correspond à chaque index
        // de ma combinaison et à chaque fois le même signe du joueur
        return combo.every(index => cells[index].textContent === currentPlayer);
    })
}

function checkDraw() {
    return [...cells].every(cell => cell.textContent !== "");
}

function switchPlayer() {
    currentPlayer = currentPlayer === "x" ? "o" : "x";
}

function createRestartButton() {
    const button = document.createElement("button");
    button.textContent= "Recommencer";
    button.classList.add("recommencer");
    button.addEventListener("click", resetGame);
    document.body.appendChild(button); // Ajoute le bouton au DOM 
}

function createChangePlayersButton() {
    const button = document.createElement("button");
    button.textContent = "Changer les joueurs";
    button.classList.add("changer-joueurs");
    button.addEventListener("click", changePlayers);

    const container = document.querySelector(".changer-joueurs");
    container.style.display = "block";
    container.innerHTML = "";  // Effacer tout contenu précédent
    container.appendChild(button);
}

function resetGame() {
    // Réinitialiser les cellules
    cells.forEach(cell => {
        cell.textContent = "";
    });
    currentPlayer = "x";
    annonce.textContent= "";

    // Réactiver le gestionnaire de clic sur le tableau
    board.addEventListener("click", handleClick);

    // Supprimer le bouton "Recommencer" après avoir cliqué
    const button = document.querySelector(".recommencer");
    if(button) {
        button.remove();
    }

    const changeContainer = document.querySelector(".changer-joueurs");
    changeContainer.style.display = "none";
}

function changePlayers() {
    resetGame();
    document.getElementById("playerForm").style.display = "block";
    board.style.display = "none";
}

function handleClick(event) {
    const cell = event.target;
    
    if(!cell.classList.contains("cell") || cell.textContent !== "") return;
    // Effacer l'annonce au premier clic
    if (annonce.textContent === playerXName + " commence !") {
        annonce.textContent = "";
    }
    cell.textContent = currentPlayer;

    if(checkWin()) {
        const winnerName = currentPlayer === "x" ? playerXName : playerOName;
        annonce.textContent = winnerName + " a gagné !";
        board.removeEventListener('click', handleClick);
        createRestartButton();
        createChangePlayersButton();
    } else if (checkDraw()) {
        annonce.textContent = "Match nul !";
        board.removeEventListener('click', handleClick);
        createRestartButton();
        createChangePlayersButton();
    } else {
        switchPlayer();
    }
    
}

function startGame() {
    const playerXInput = document.getElementById("playerX").value;
    const playerOInput = document.getElementById("playerO").value;

    playerXName = playerXInput !== "" ? playerXInput : "Joueur X";
    playerOName = playerOInput !== "" ? playerOInput : "Joueur O";

    document.getElementById("playerForm").style.display = "none";
    board.style.display = "grid";
    annonce.textContent = playerXName + " commence !";
    
    board.addEventListener("click", handleClick);
}

document.getElementById("startGame").addEventListener("click", startGame);
