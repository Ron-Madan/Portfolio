The Minesweeper game consists of an 8x8 grid where there are 8 mines randomly scattered across the board. Each cell, when clicked, reveals the total 
number of mines adjacent to it. The game ends when either a mine is clicked by the player (Loss Scenario) or all of the safe cells have been clicked (Win 
Scenario).

Here is a demo of the program in action:

--> https://youtu.be/J1sevIcmYYc

The goal of the project was to create an AI program that would make safe moves based on its previous knowledge base. To achieve this, I utilized various 
objects and at first, I implemented a way to mark certain cells as safe or mines. Then, I had to program a way for the AI to create inferences based on 
what has happened on the board so far. For emphasis, when playing the game on your own, it is common to notice the powerful idea that certain cells around 
a particular cell can be marked as mines if there are only 'n' adjacent cells remaining to be discovered and 'n' mines around that cell still needed to 
be found. For instance, if there is only 1 undiscovered cell remaining around a cell marked with a 3, and this cell already has 2 mines in its vicinity 
(AKA 2 mines around it have been identified), then we can quickly mark the remaining cell as a mine:

<img width="242" alt="Screen Shot 2022-10-02 at 12 00 37 PM" src="https://user-images.githubusercontent.com/37419003/193463740-99e0b56f-fe1a-4c67-b4da-ca410ed6de1f.png">

This idea is also commonly used with cells marked with a 1 that only have 1 undiscovered cell remaining:

<img width="240" alt="Screen Shot 2022-10-02 at 12 00 56 PM" src="https://user-images.githubusercontent.com/37419003/193463759-1ffc4929-c208-48e5-b882-538891427ff6.png">

In like manner, if a cell marked with an 'n' has 'n' mines around it already identified, then its remaining undiscovered cells can be marked as safe. The 
reason for this being that all of the dangerous cells have already been revealed:

<img width="251" alt="Screen Shot 2022-10-02 at 12 01 19 PM" src="https://user-images.githubusercontent.com/37419003/193463791-90db17be-65b6-4e64-b540-43d58efcc20f.png">

Successfully following these 2 strategies can allow you to win almost any game of Minesweeper, unless of course, you have to resort to making random 
moves, which is just a matter of how a specific game has been generated.

To program these game strategies, I utilized each cell’s count and compared that to the remaining moves and the number of flagged mines. Essentially, 
if a cell’s situation matched the criteria described in the above illustrations, then the AI was able to make safe moves on behalf of the player. For 
instance, to replicate the second scenario, I checked whether the cell’s ‘count’ matched the ‘known_mines’ value (number of mines marked around that 
cell), at which point all the remaining undiscovered cells could be determined to be safe.

Overall, this was definitely a cool project to develop as it required me to not only debug and carefully think about my code, but also play the game 
myself to learn about the different strategies one can use to find safe moves on the board (when possible).
