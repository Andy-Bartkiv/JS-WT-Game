# JS-WT-Game
WT-Game

////////////
THE GAME CONCEPT
The game is based on the ability to logically determine which wire goes where, 
and decide which Electronic Chip should be installed at each position on the circuit board 
in order to let electricity flow to the right places and not flow to the wrong places.

THE CIRCUIT BOARD
When doing electronics work, the screen shows a close-up of a circuit board. 
It is covered with chips, and there are signal traces running across the board and through those chips.
- Signal Paths
- Exit Chips
- Logic Chips

RULES OF THE GAME
An Electronics game begins with the chips on the board arranged in a way that the wires on the right-hand side 
(those going into the Target Chips) are carrying electricity into the Phone/Trace chips, and no electricity into the Alarm chips.

The Player's task is to alter the board so that the Paths running into the Phone/Trace chips will carry no electricity (Green). 
However, the game is instantly "lost" if electricity is ever passed into the Alarm chips. 

The game is played by picking up Chips from the circuit board, and placing them elsewhere to change the flow of electricity.
Initially the player has one random "Spare" chip in his hand, which he can replace with any other chip on the board. 
The chip that was picked up can then be placed elsewhere, and so on until the game is either won or lost.

In addition, this game is limited in time - you only have anywhere from 1 to 10 minutes to complete the mini-game, 
otherwise it ends with a semi-failure.

THE LOGIC OF CHIPS
There are exactly 12 different kinds of Logic Chips that can appear on a circuit board.
The actual number of chip types that you'll encounter is based on the difficulty level of the mini-game itself.
Each chip performs a different "logical operation". It acts based on the state of the two wires coming in its left side,
producing (or withholding) electricity on the two wires coming out the right side. Each chip reacts differently.
