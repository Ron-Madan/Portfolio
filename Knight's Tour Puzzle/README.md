This is a Python solver for the 'Knight's Tour' Puzzle. 

In my free time, I like to play strategic board games and solve puzzles. In fact, I am a big fan of the Knight’s Tour puzzle. The puzzle consists of a 10x10 grid where the objective is to fill in the missing numbers of the (Chess) Knight’s path. I wanted to challenge myself and test my knowledge; whether I would be able to create an AI solver for the puzzle using Python.

Here is a demo of the program in action:

--> https://youtu.be/CcMNKBv8iMQ

Once I started working on the project, I endured a major setback. Frankly, I thought I’ll be able to create the solver very easily, but I have to admit that it was more challenging than expected. Notably, when I first thought about solving this problem, I thought recursion would be the simplest solution. However, it had a major flaw as I found it to be a lot less intelligent than it had seemed. After examining the output, I realized that the solver was building paths that would obviously lead to failure. As a result, the time complexity of the solver was way too high and it was not utilizing ‘Artificial Intelligence’ in any way. As such, I decided to review my past courses and I found my answer.

To make the solver ‘smarter’, I wrote code to make the possible_moves() function only return moves that had a higher chance of successfully completing the path. To begin, to help the AI complete the path in the right direction, I ranked the possible movement options by ‘Euclidean Distance’ to the next highest value available in the path:

<img width="434" alt="Screen Shot 2022-10-02 at 12 07 20 PM" src="https://user-images.githubusercontent.com/37419003/193464142-0d7833cd-56c8-42a7-8700-0d1cdeb6325c.png">

Moreover, when both the previous and next numbers were available in the path, I wrote the method in such a way to ensure that the AI would only make moves that existed in both of those numbers’ domains. For example, if the number 14 is missing from the path, and both the numbers 13 and 15 are available, then the AI should only make moves that connect to both 13 and 15:

<img width="434" alt="Screen Shot 2022-10-02 at 12 07 40 PM" src="https://user-images.githubusercontent.com/37419003/193464167-ed9cbe97-da0c-4ddb-82ae-9e1130db9a87.png">

The reason for this being that any other move would automatically be incorrect, further increasing the time for the AI’s solution as it would be attempting to complete the path with an incorrect number placement. 

In essence, I combined recursion with Artificial Intelligence, and was able to develop a cool solver.
