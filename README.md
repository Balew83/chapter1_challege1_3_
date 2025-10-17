🎯 Objective

Create a simple text-based Dungeon Game using loops, conditions, and random events. The player must survive through 5 rooms, each containing random events that can heal, harm, or challenge them.

🧠 How the Program Works

Starting the Game

The player starts with 100 health points.

A welcome message is displayed.

Room Exploration (Loop)

The game uses a for loop to move through 5 rooms.

In each room, a random event happens using Random.

Possible Events:

Case 1: Trap

The player falls into a trap and loses 20 health points.

The game checks if health drops to or below zero.

Case 2: Healing Potion

The player finds a potion and gains 15 health points.

Health is capped at 100 to avoid exceeding the limit.

Case 3: Monster Encounter

A monster appears!

The player must guess a number between 1 and 5 to defeat it.

If the guess is wrong, the player must try again until they guess correctly.

Game Over or Victory

If the player’s health reaches 0 or less, they are defeated.

If they survive all 5 rooms, they win and their remaining health is displayed.

🧩 Example Gameplay
Welcome to the Dungeon Game!
Your starting health is 100.
--------------------------------
Entering room 1...
A trap sprung!
You lost 20 health. Current health: 80
--------------------------------
Entering room 2...
You found a healing potion!
Your health is now 95.
--------------------------------
Entering room 3...
A monster appears!
Guess a number (1-5) to defeat it: 3
Wrong! Try again.
Guess a number (1-5) to defeat it: 5
You defeated the monster!
--------------------------------
Entering room 4...
A trap sprung!
You lost 20 health. Current health: 75
--------------------------------
Entering room 5...
You found nothing... it's quiet here.
--------------------------------
You cleared the dungeon! Victorious with 75 health!

⚙️ Key Concepts Used

for loop → to go through the 5 rooms

Random class → to generate random events and monster numbers

Scanner class → to take user input (guessing game)

switch statement → to decide what event happens in each room

Condition checks (if) → for health limits and defeat detection

✅ Advantages

Fun way to practice loops, conditions, and randomization.

Encourages logical thinking through player decisions.

Simple yet demonstrates multiple Java concepts together.

⚠️ Possible Improvements

Add more events (like treasure or boss fights).

Add a score system.

Use functions to make the code cleaner.

Add difficulty levels (easy, medium, hard).

🏁 Conclusion

This game demonstrates how control structures, randomness, and user interaction can create an engaging text-based adventure. It’s a great beginner project to strengthen Java fundamentals.
