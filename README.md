# Turn-Based Strategy Game

This is a simple turn-based strategy game coded in JavaScript. In this game, a player competes against the computer by managing resources (Peons) to either repair their own hit points or attack to reduce the computer's hit points. The game continues until one of the parties runs out of hit points or both do so simultaneously, resulting in a tie.

## Setup

Before you start playing the game, ensure you have Node.js installed on your computer. You can download it from [here](https://nodejs.org/).

1. **Install prompt-sync Package:**
   
   This game requires the `prompt-sync` package for synchronous command line input. Install it by running the following command in your terminal:
   ```
   npm install prompt-sync
   ```

2. **Download the Game:**
   
   Download the game script to a local directory.

3. **Start the Game:**
   
   Navigate to the directory where you saved the game script and run:
   ```
   node game.js
   ```

## How to Play

1. **Create or Select Peons:** 
   
   At the beginning of your turn, you'll be asked if you want to create a new peon or select an existing one. Peons are your workers that can either attack the opponent or repair your hit points.

2. **Assign Jobs to Peons:**
   
   - If creating a new peon, you'll specify its name. Newly created peons will have their job set to 'nothing' initially.
   - If selecting an existing peon, you can assign it to either 'attack' or 'repair'.

3. **Effects of Actions:**
   
   - **Attack:** Decreases the opponent's hit points.
   - **Repair:** Increases your hit points.

4. **End of Turn:**

   After your actions, the computer takes its turn, randomly deciding to attack you or repair its own hit points.

5. **Winning the Game:**

   The game ends when either the player's or the computer's hit points reach 0. The party with hit points remaining is declared the winner. If both hit points reach 0 simultaneously, it's a tie.

## Game Structure

- **Peon:** Represents a worker with a name and a job ('attack', 'repair', or 'nothing').
- **Barracks:** Stores and manages the peons.
- **Player:** Represents the game's player, including their hit points and barracks.

The game loop consists of player input, action processing, computer's turn, and checking the game's state to determine the outcome.

Enjoy strategizing and managing your resources wisely to win the game!