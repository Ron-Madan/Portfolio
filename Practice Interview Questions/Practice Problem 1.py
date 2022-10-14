"""
This is a solution for a sample Coding Interview problem:


"Your task is to determine which apartment location minimizes the distance of the 
farthest REQUIRED amenity. We can assume that an apartment building exists
at every index."


Given Assumptions:
- All requirements can be satisfied by one or more buildings.
- All apartments will have information on every type of amenity.


Sample Call:
----------------------------------
>>> blocks = [ # info on apartments
{
"gym": False,
"school": True,
"store": False,
},

{
"gym": True,
"school": False,
"store": False,
},

{
"gym": True,
"school": True,
"store": False,
},

{
"gym": False,
"school": True,
"store": False,
},

{
"gym": False,
"school": True,
"store": True,
}
]

>>> reqs = ["gym", "school", "store"] # what amenities must be considered

>>> best_index(blocks, reqs) # returns best index
3
----------------------------------
"""
# Importing Libraries
import math


# Min Distance to Amenity - Helper Function
def min_distance(blocks: list[dict[str, bool]], index: int, req: str) -> int:
	"""
	Return the minimum distance to get to 'req' from 'index'.
	"""

	# Defining Index Values
	left_index = index + 1
	right_index = index - 1

	# Running While Loop to Search for Req
	while True:

		# Checking Left Side of Index
		if left_index > 1:

			# Shifting Index to Left
			left_index -= 1

			# Checking Req at New Index
			if blocks[left_index][req]:

				# Returning Distance
				return abs(index - left_index)


		# Checking Right Side of Index
		if right_index < len(blocks) - 2:

			# Shifting Index to Right
			right_index += 1

			# Checking Req at New Index
			if blocks[right_index][req]:
				
				# Returning Distance
				return abs(index - right_index)


# Max Distance to all Amenities - Helper Function
def max_distance(blocks: list[dict[str, bool]], index: int, missing: set[str]) -> int:
	"""
	Returns the maximum distance to get to all amenities.
	"""

	# Calculating Min Distance for Each Missing Amenity
	distances = {min_distance(blocks, index, req) for req in missing}

	# Handling Base Case of 0
	distances.add(0)

	# Returning Max Distance
	return max(distances)


# Finding Best Location - Main Function
def best_index(blocks: list[dict[str, bool]], reqs: list[str]) -> int:
	"""
	Returns the best index to live at given the 'blocks' buildings and
	'req' required amenities.
	"""

	# Finding Missing Amenities
	missing = [{req for req in reqs if not block[req]} for block in blocks]

	# Defining Min Distance & Best Index Variables
	min_distance = math.inf
	best_index = -1

	# Looping Through Blocks
	for i in range(len(blocks)):

		# Getting Max Distance for Index i
		distance = max_distance(blocks, i, missing[i])

		# Comparing Current Index
		if distance < min_distance:

			# Updating Min Distance & Best Index Variables
			min_distance = distance
			best_index = i

		# Checking for 0 Distance
		if distance == 0:
			
			# Returning Index
			return i

	# Returning Best Index
	return best_index


# ---------------------------------------------------------------------------------------
# Testing Program


if __name__ == '__main__':

	# Defining Blocks
	blocks = [
	{
	"gym": True,
	"school": False,
	"store": False,
	},

	{
	"gym": True,
	"school": False,
	"store": False,
	},

	{
	"gym": False,
	"school": False,
	"store": True,
	},

	{
	"gym": False,
	"school": False,
	"store": True,
	},

	{
	"gym": False,
	"school": False,
	"store": False,
	},

	{
	"gym": False,
	"school": False,
	"store": False,
	},

	{
	"gym": True,
	"school": False,
	"store": False,
	},

	{
	"gym": False,
	"school": True,
	"store": False,
	},

	{
	"gym": False,
	"school": False,
	"store": True,
	}
	]

	# Defining Requirements
	reqs = ["gym", "school", "store"]

	# Testing Function
	print(f"Best Index: {best_index(blocks, reqs)}")




