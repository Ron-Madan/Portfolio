For my Computer Science course’s Culminating Task, I had to create some sort of game using the Java programming language. I chose to recreate a version of the popular platformer game, Street Fighter, which is similar to games like Injustice and Mortal Kombat. It is a 2 player game and the goal is to knock out your opponent. However, instead of being a simple boxing match, players can use cool abilities to aid them in their task. In my version of the game, players can ‘hadouken’ (which is game talk for throwing a fireball), kick, block, and jump.

Here is a demo of the game in action:

--> https://youtu.be/5PksIe7EAjw

![mq2](https://user-images.githubusercontent.com/37419003/193457740-9635c9a0-5057-4710-bbc0-8a289da5532d.jpg)

Despite jumps never being incorporated in past class examples, I am very proud of the way I was able to accomplish this feat. Specifically, I used a downward opening parabola, with a vertical compression of 4 and a vertical translation of 9, to model the jump:

<img width="509" alt="Screen Shot 2022-10-02 at 12 10 54 PM" src="https://user-images.githubusercontent.com/37419003/193464361-396035fd-aa05-4fab-bb5e-04e66dbd9f1f.png">

It is important to notice that the roots of this quadratic equation are at -6 and 6. I used these values to generate the y-coordinates for jumping. I used a for loop and iterated through the values between -5 and 6. I started at -5 because the player should be in the air and start their jump when the respective key is pressed. In like manner, I ended at 6 in order to make the player land back on the ground (in other words, to obtain a y-value of 0). Essentially, these y-values were scaled according to the height of the screen and then stored in an array. Then, using a Timeline, when the jump key was pressed, the player’s image’s y-coordinate was repeatedly adjusted, after specified intervals of time, to give the effect that the player was jumping. I had some trouble getting the jumps to work this way. I was not sure how to track each player’s progress in their jumps. After thinking about the problem further, I realized that I could create global variables referencing each player’s position (or index) across their jumps (or jump value array). So, in the code, the ‘jump index’ was initialized to 0 and then increased whenever the Timeline ran. More importantly, when the index reached 12 (because there were 12 jump values: -5 to 6), the Timeline was stopped and the jump index was set back to 0. Here are the relevant code sections that demonstrate the above-mentioned process:

<img width="532" alt="Screen Shot 2022-10-02 at 12 11 31 PM" src="https://user-images.githubusercontent.com/37419003/193464405-ee739638-48b6-4971-8d1f-4f078f70c538.png">
<img width="564" alt="Screen Shot 2022-10-02 at 12 11 50 PM" src="https://user-images.githubusercontent.com/37419003/193464420-48be7780-4585-4f41-9aa7-f72611c3bd11.png">

On another note, the game had other sections of complexity as well. Notably, to make the blocks work properly, I had to compare the direction of the attack and the direction the player was facing. Also, in order to incorporate the Wild Cards, which add random effects to the speed or damage in the game, I created variables that were ‘factors’ of damage or speed. For example, if the selected Wild Card said “Double Damage”, then the damage factor variable would be set to 2. Likewise, whenever any damage would occur, the health bar would go down by “attackValue x damageFactor”.

Overall, it was definitely a fun game to create and it had over 2500 lines of code! As I had mentioned earlier on, I was most proud of the fact that I not only created a game that was similar to something I had played before, but I also found a creative way (that involved Timers, arrays, jump indexes and quadratic equations!) to recreate the idea of a player jumping. 
