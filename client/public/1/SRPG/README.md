# SRPG
unit-4 homework expanded

* Object and scope practice
* Includes flood-fill algorithm to determine movement of characters
* Includes A* algorithm to determine enemy AI

## Theme
The inspiration for the project is based on the Fire Emblem and Advance Wars games. The assignment asked for an RPG where you select enemies and I thought this would be a fun challenge to implement.

## Game logic
* Player chooses a character. All characters EXCEPT the one chosen are part of the player's team
	* ALl characters have these stats.
		* Attack Power
		* Health Points
		* Counter attack power

* The player selects a character on their side of the field and then a character on the enemy's side of the field as the target
	* The enemy's health is subtracted by the player character's attack power
	* The enemy then retaliates with his Counter Attack Power

* Once a player has attacked with all of his side's characters(or passed) the enemy then does the same thing

* If all enemies are defeated you win
* If all allies are defeated you lose

###Phases:

Select Char -> Select Target -> Move to Target -> Select Enemy -> Attack Enemy -> Enemy Turn -> Select Char


## Flood Fill
Movement:
Possible movement: Flood-fill algorithm with map
* Load a base map(text file) containing the array and the steps needed to enter each tile
* create an empty second map with tilepos: path. Path is an object with properties: steps left, and pathtaken
*We will also have an open and a closed set

1. initialize the open set with the starting position
2. While the open set is not empty
	3. set curr to open[0] and move open[0] to the closed set
	4. for all neighboring tiles
	    5. Calculate how many steps are left if the neighbor is moved into
		6. If we've already calculated this tile, only replace it in the travel map if it is a more optimal path
			If we do not have enough steps to move into the tile put it in the closed set and move to the next neighbor
			If we did have enough steps add that tile to the Open set

7. The map contains the location and contains the path taken to that location

## A*
Enemy Movement:
* Load a base map(text file) containing the array and the steps needed to enter each tile
* Enemy calculates the shortestPath and distance to each ally.
* We start with:
    *  an empty closed set
    * an openset with the enemy's current position
    * cameFrom, a map that will hold the optimal move into each tile
    * startToPos, a map that will hold the amount of steps taken to reach that tile with an optimal move
    * A function that estimates the number of moves(Simple vector subtraction of the start and target)

1. While the open set is not empty:
    2. take the element in the open set corresponding the smallest value estimated path
        3. If that key is our target we reconstruct the path and return it
        4. Otherwise put that element in the closed set, loop through the neighbors, and if it is the most optimal path to that tile replace it in the startToPos map and cameFrom map.
        5. Put all neighbors of that tile into the queue

## Known Issues and things to implement:
### High Priority:
* Animation sometimes skips, might be because elements are being pushed out of their box if the box is already taken
* AI competes for the same spots. They are allowed to move through each other but if they cannot go to their target location they are currently set not to move.

* Enemies will only attack if they START their turn adjacent to an ally
* Enemies do not move into the last tile they are able to

### Low Priority:
* Clicking too
* Hit sound does not play during a counterattack(but miss sound does)
* The level up banner denies the mouse from hovering over tiles while it is shown
* Forest tiles look a bit ugly
* Transition tiles and more tiles of each type
* Special tiles should give a bonus/hindrance to defense
* Level up info should be another div that temporarily covers the screen showing the stats that increased
* Character portraits/emblems
* SFX