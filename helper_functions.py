# Importing Libraries
import random

# Defining Insertion Sort
def insertion_sort(numbers: list[int]) -> list[list[int]]:
	"""
	This function takes in a list of integers and returns the sorted list
	in ascending order, with each modified state, using the Insertion Sort algorithm.

	>>> insertion_sort([3, 19, 27, 13, 6])
	[[3, 13, 19, 27, 6], [3, 6, 13, 19, 27]]
	>>> insertion_sort([-4, 21, 11, -20])
	[[-4, 11, 21, -20], [-20, -4, 11, 21]]
	"""

	# Defining Transformations Array
	transformations = []
	transformations.append([i for i in numbers])

	# Controls the Pointer for the Sorted Left Side of the Array
	for end in range(1, len(numbers)):

		# Storing Current Index & Value
		item = numbers[end]
		i = end

		# Searching to See Where to Insert the Value
		while i > 0 and item < numbers[i - 1]:

			# Moves the Larger Value to the Right
			numbers[i] = numbers[i - 1]

			# Moving Counter to the Left of the Array
			i -= 1

		# Move the Smaller Value to the Sorted Left Side of the Array
		numbers[i] = item

		# Checking Last Transformation
		if transformations[-1] != numbers:

			# Adding Current State to Transformations
			transformations.append([i for i in numbers])

	# Returning Transformations
	return transformations


# Defining Bubble Sort
def bubble_sort(numbers: list[int]) -> list[list[int]]:
	"""
	This function takes in a list of integers and returns the sorted list
	in ascending order, with each modified state, using the Bubble Sort algorithm.

	>>> bubble_sort([3, 19, 27, 13, 6])
	[[3, 19, 27, 13, 6], [3, 13, 27, 19, 6], [3, 6, 27, 19, 13], [3, 6, 19, 27, 13], [3, 6, 13, 27, 19], [3, 6, 13, 19, 27]]
	>>> bubble_sort([-4, 21, 11, -20])
	[[-4, 21, 11, -20], [-20, 21, 11, -4], [-20, 11, 21, -4], [-20, -4, 21, 11], [-20, -4, 11, 21]]
	"""

	# Defining Transformations Array
	transformations = []
	transformations.append([i for i in numbers])

	# Looping Through Elements
	for i in range(len(numbers)):

		# Looping Through Remaining Elements
		for j in range(i + 1, len(numbers)):

			# Checking Consecutive Elements
			if numbers[i] > numbers[j]:

				# Swapping Elements
				numbers[i], numbers[j] = numbers[j], numbers[i]

				# Adding Current State to Transformations
				transformations.append([i for i in numbers])

	# Returning Transformations
	return transformations


# Defining Selection Sort
def selection_sort(numbers: list[int]) -> list[list[int]]:
	"""
	This function takes in a list of integers and returns the sorted list
	in ascending order, with each modified state, using the Selection Sort algorithm.

	>>> selection_sort([3, 19, 27, 13, 6])
	[[3, 19, 27, 13, 6], [3, 6, 27, 13, 19], [3, 6, 13, 27, 19], [3, 6, 13, 19, 27]]
	>>> selection_sort([-4, 21, 11, -20])
	[[-4, 21, 11, -20], [-20, 21, 11, -4], [-20, -4, 11, 21]]
	"""

	# Defining Transformations Array
	transformations = []
	transformations.append([i for i in numbers])

	# Looping Through Elements
	for i in range(len(numbers)):

		# Defining Minimum Index Value
		minimum = i

		# Looping Through Remaining Elements
		for j in range(i + 1, len(numbers)):

			# Checking Current Element with Minimum Index Value
			if numbers[j] < numbers[minimum]:

				# Updating Minimum Index Value
				minimum = j

		# Checking Minimum Index Value with Current i Value
		if i != minimum:

			# Storing Value at Index i
			temp = numbers[i]

			# Setting Current Index to Minimum Value
			numbers[i] = numbers[minimum]

			# Setting Value at Minimum Value Index with Temp
			numbers[minimum] = temp

			# Adding Current State to Transformations
			transformations.append([i for i in numbers])

	# Returning Transformations
	return transformations


# Defining Transformations Array (for Quick Sort Function)
transformations = []


# Defining Helper Function for Quick Sort
def partition(numbers: list[int], low: int, high: int) -> int:
	"""
	This function uses the last value as the pivot and places all values
	smaller than the pivot to the left of the pivot and all values greater
	than the pivot to the right of the pivot.
	"""

	# Storing Pivot Value
	pivot = numbers[high]

	# Setting Index of Smaller Element,
	# Represents Index the Swap is Made With
	i = low - 1
	
	# Looping Through Values from Low to High
	for j in range(low, high):

		# Checking Whether Current Value is Less than Pivot
		if numbers[j] < pivot:
			
			# Increasing Swap Index
			i += 1

			# Swapping Index i & j
			numbers[i], numbers[j] = numbers[j], numbers[i]

			# Checking Last Transformation
			if transformations[-1] != numbers:

				# Adding Current State to Transformations
				transformations.append([i for i in numbers])
	
	# Placing Pivot at Correct Position
	numbers[i + 1], numbers[high] = numbers[high], numbers[i + 1]

	# Checking Last Transformation
	if transformations[-1] != numbers:

		# Adding Current State to Transformations
		transformations.append([i for i in numbers])
	
	# Returning New Partition Index
	return i + 1


# Defining Quick Sort
def quick_sort(numbers: list[int], low: int, high: int) -> None:
	"""
	This function takes in a list of integers and calls the Partition
	function to Sort the list.
	"""

	# Checking Indexes
	if low < high:
		
		# Calling Partition on Provided Indexes
		pivot = partition(numbers, low, high)
		
		# Sorting Both Sides of Partition
		quick_sort(numbers, low, pivot - 1)
		quick_sort(numbers, pivot + 1, high)


def run_quick_sort(numbers: list[int]) -> list[list[int]]:
	"""
	This function takes in a list of integers and returns the sorted list
	in ascending order, with each modified state, using the Quick Sort algorithm.

	>>> run_quick_sort([3, 19, 27, 13, 6])
	[[3, 19, 27, 13, 6], [3, 6, 27, 13, 19], [3, 6, 13, 27, 19], [3, 6, 13, 19, 27]]
	>>> run_quick_sort([-4, 21, 11, -20])
	[[-4, 21, 11, -20], [-20, 21, 11, -4], [-20, -4, 11, 21]]
	"""

	# Clearing Transformations Array
	transformations[:] = []

	# Adding Current State to Transformations
	transformations.append([i for i in numbers])

	# Calling Quick Sort Function
	quick_sort(numbers, 0, len(numbers) - 1)

	# Returning Transformations
	return transformations


# Defining Difference Function
def difference(nums1: list[int], nums2: list[int]) -> list[int]:
	"""
	This function takes in 2 lists and returns the indexes where the
	elements do not match.
	
	>>> difference([1, 2, 3, 4], [1, 2, 4, 3])
	[2, 3]
	>>> difference([3, 13, 19, 27, 6, 4], [3, 6, 13, 19, 27, 4])
	[1, 2, 3, 4]
	"""
	
	# Returning Comprehension with Differing Indexes
	return [i for i in range(len(nums1)) if nums1[i] != nums2[i]]


# Defining Random Lengths Function
def get_lengths(count: int) -> list[int]:
	"""
	This function takes in an integer n, and returns a list of n random integers.

	>>> get_lengths(5)
	[71, 46, 26, 57, 19]
	>>> get_lengths(3)
	[31, 70, 41]
	"""

	# Generating Random Numbers
	random_numbers = [random.randint(1,100) for i in range(count)]

	# Returning Lengths
	return random_numbers


# Defining Rectangles Function
def get_rectangles(random_numbers: list[int]) -> list[list[int]]:
	"""
	This function takes in a list of lengths and returns rectangle coordinates for the rectangles.

	>>> get_rectangles([71, 46, 26, 57, 19])
	[[100, 0, 35, 710], [135, 0, 35, 460], [170, 0, 35, 260], [205, 0, 35, 570], [240, 0, 35, 190]]
	>>> get_rectangles([31, 70, 41])
	[[100, 0, 35, 310], [135, 0, 35, 700], [170, 0, 35, 410]]
	"""

	# Calculating Rectangle Width
	rec_width = int(1050 / len(random_numbers))

	# Creating Rectangle Coordinates
	# --> Format: [X, Y, Width, Height]
	rectangle_coordinates = [[50 + (length) * rec_width, 0, rec_width, random_numbers[length] * 7] for length in range(len(random_numbers))]

	# Returning Rectangles
	return rectangle_coordinates




