"""
This program solves the University of Waterloo's Problem of the Week #3.
--> Link: https://www.cemc.uwaterloo.ca/resources/potw/2022-23/English/POTWE-22-C-03-P.pdf
"""

# Importing Libraries
import math

# Declarin Program Variables
current_state = [5, 3, 3, 3, 3]
solved = list.count(current_state, 0) == 4
state_count = 0


# Declaring Helper Function
def should_move(current_state: list[int], index: int) -> int:
	"""
	This program returns where the gophers in burrow 'index'
	should move.

	Preconditions:
	- all({i >= 0 for i in current_state})
	- len(current_state) == 5
	- 0 <= index < 5

	>>> should_move([6, 3, 2, 0, 4], 0)
	1
	>>> should_move([9, 0, 6, 0, 0], 2)
	-1
	"""

	# Declaring Variables
	left_burrow = math.inf
	current_burrow = current_state[index] - 1
	right_burrow = math.inf

	# CASE 1
	# Checking Left Burrow (if exists)
	if index - 1 >= 0:
		left_burrow = current_state[index - 1]

	# Checking Right Burrow (if exists)
	if index + 1 <= 4:
		right_burrow = current_state[index + 1]

	# Checking Minimum Gophers
	if left_burrow < current_burrow:
		return -1
	elif right_burrow < current_burrow:
		return 1

	# CASE 2
	# Checking Left Burrow
	if index > 0 and left_burrow == current_burrow:
		return -1

	# CASE 3
	# Returning Default Value (i.e. Stay in Current Burrow)
	return 0


# Declaring Helper Function
def next_state(current_state: list[int]) -> list[int]:
	"""
	This program returns the next state of the gophers, given their
	current state.

	Preconditions:
	- all({i >= 0 for i in current_state})
	- len(current_state) == 5

	>>> next_state([6, 3, 2, 0, 4])
	[0, 9, 0, 6, 0]
	>>> next_state([9, 0, 6, 0, 0])
	[0, 15, 0, 0, 0]
	"""

	# Creating State Copy
	copy = [i for i in current_state]

	# Creating Adjustments List
	adjustments = [0]*5

	# Finding Adjustments
	for burrow in range(5):

		# Adjusting Gophers in Current Burrow
		adjustment = should_move(current_state, burrow)

		# Adding Adjustment to Adjustments
		adjustments[burrow] = adjustment

	# Moving Gophers
	for burrow in range(5):

		# Moving Gophers
		copy[burrow + adjustments[burrow]] += current_state[burrow]

		# Removing Original Gophers
		copy[burrow] -= current_state[burrow]

	# Returning Updating State
	return copy


# Initializing While Loop
while not solved:

	# Outputting Current State
	print('Day ' + str(state_count) + ':')
	print(current_state)
	print('')

	# Calling Helper Function
	current_state = next_state(current_state)

	# Increasing State Count
	state_count += 1

	# Updating Solved Variable
	solved = list.count(current_state, 0) == 4


# Printing Final State
print('Day ' + str(state_count) + ':')
print(current_state)
print('\nGophers are in the same burrow!')




