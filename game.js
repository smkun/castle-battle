// Required module for synchronous input from the user
const prompt = require('prompt-sync')({sigint: true});

// Defines a Peon with a name and a default job
class Peon {
    constructor(name) {
        this.name = name;
        this.job = 'nothing'; // Default job is 'nothing'
    }
}

// Barracks class that stores multiple Peons
class Barracks {
    constructor() {
        this.peons = []; // Initializes an empty array to store peons
    }

    // Method to add a new Peon to the barracks
    addPeon(name) {
        this.peons.push(new Peon(name)); // Creates and adds a new peon with the given name
    }
}

// Player class representing each player in the game
class Player {
    constructor() {
        this.hitPoints = 10; // Each player starts with 10 hit points
        this.barracks = new Barracks(); // Initializes a new barracks for the player
    }
}

// Handles the actions a player can take on their turn
function playerTurn(player, computer) {
    // Displays current hit points for both players
    console.log(`Your hit points: ${player.hitPoints}. computer's hit points: ${computer.hitPoints}.`);
    
    // Prompts the player to create a peon or select an existing one
    const choice = prompt('Do you want to (1) create a peon or (2) select a peon? ');
    if (choice === '1') {
        // Creates a new peon
        const peonName = prompt("What is the peon's name? ");
        player.barracks.addPeon(peonName);
        console.log(`${peonName} has been added to your barracks.`);
    } else if (choice === '2' && player.barracks.peons.length > 0) {
        // Selects an existing peon to perform an action
        console.log('Select a peon:');
        player.barracks.peons.forEach((peon, index) => {
            console.log(`${index + 1}. ${peon.name} (${peon.job})`);
        });
        const peonChoice = parseInt(prompt()) - 1;
        if (peonChoice >= 0 && peonChoice < player.barracks.peons.length) {
            const action = prompt('Do you want this peon to (1) attack or (2) repair? ');
            const selectedPeon = player.barracks.peons[peonChoice];
            if (action === '1') {
                selectedPeon.job = 'attack';
                console.log(`${selectedPeon.name} is now set to attack.`);
            } else if (action === '2') {
                selectedPeon.job = 'repair';
                console.log(`${selectedPeon.name} is now set to repair.`);
            }
        }
    }

    // Applies the actions selected for each peon
    applyPeonActions(player, computer);
}

// Applies the effects of peons' actions, modifying hit points accordingly
function applyPeonActions(player, computer) {
    player.barracks.peons.forEach(peon => {
        if (peon.job === 'attack') {
            const damage = Math.floor(Math.random() * 3) + 1;
            computer.hitPoints -= damage;
            console.log(`${peon.name} attacks! The computer loses ${damage} hit points.`);
        } else if (peon.job === 'repair') {
            const repair = Math.floor(Math.random() * 3) + 1;
            player.hitPoints += repair;
            console.log(`${peon.name} repairs! You gain ${repair} hit points.`);
        }
    });
}

// Represents the computer's turn, where it randomly decides to attack or repair
function computerTurn(computer, player) {
    const hitPointsChange = Math.floor(Math.random() * 5) + 1;
    if (Math.random() < 0.5) {
        player.hitPoints -= hitPointsChange;
        console.log(`The computer attacks! You lose ${hitPointsChange} hit points.`);
    } else {
        computer.hitPoints += hitPointsChange;
        console.log(`The computer repairs! The computer gains ${hitPointsChange} hit points.`);
    }
}

// Checks the current state of the game to determine if there's a winner
function checkGameState(player, computer) {
    if (player.hitPoints <= 0 && computer.hitPoints <= 0) {
        return 'tie';
    } else if (player.hitPoints <= 0) {
        return 'lose';
    } else if (computer.hitPoints <= 0) {
        return 'win';
    }
    return 'continue'; // Game continues if no win/lose condition is met
}

// Main function to run the game loop
function main() {
    const player = new Player();
    const computer = new Player();
    let gameState = 'continue';
    
    // Game loop continues until a win, lose, or tie condition is met
    while (gameState === 'continue') {
        playerTurn(player, computer);
        gameState = checkGameState(player, computer);
        if (gameState !== 'continue') break;

        computerTurn(computer, player);
        gameState = checkGameState(player, computer);
    }

    // Final game state and hit points are displayed
    console.log(`Final score - Your hit points: ${player.hitPoints}, computer's hit points: ${computer.hitPoints}`);
    if (gameState === 'win') {
        console.log('You win!');
    } else if (gameState === 'lose') {
        console.log('You lose.');
    } else {
        console.log("It's a tie.");
    }
}

// Starts the game
main();
