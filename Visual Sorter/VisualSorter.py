# Importing Libraries
import pygame
import time
import sys
import helper_functions

# Initializing Pygame
pygame.init()

# Defining Screen Size, Display & Sort Method
size = width, height = 1250, 800
screen = pygame.display.set_mode(size)
sort_method = 'insertion'

# Defining Program Booleans
draw_rectangles = True
sort = False

# Defining Colors
BLACK = (0, 0, 0)
CYAN = (24, 255, 241)
YELLOW = (255, 255, 0)
GREEN = (0, 255, 0)

# Filling Screen
screen.fill(BLACK)

# Calling Lengths Function
random_numbers = helper_functions.get_lengths(30)

# Calling Rectangle Function
rectangle_coordinates = helper_functions.get_rectangles(random_numbers)

# Running Pygame
while True:

	# Checking Events
	for event in pygame.event.get():

		# Checking for Quit
		if event.type == pygame.QUIT:

			# Closing Pygame
			sys.exit()

		# Checking for Key pressed
		if event.type == pygame.KEYDOWN:

			# Checking for 'R' Key
			if event.key == pygame.K_r:

				# Re-Generating Lengths
				random_numbers = helper_functions.get_lengths(30)

				# Re-Generating Rectangles
				rectangle_coordinates = helper_functions.get_rectangles(random_numbers)

				# Updating Draw Boolean
				draw_rectangles = True

				# Filling Screen
				screen.fill(BLACK)

			# Checking for 'I' Key
			elif event.key == pygame.K_i:

				# Updating Sort Method String
				sort_method = 'insertion'

			# Checking for 'B' Key
			elif event.key == pygame.K_b:

				# Updating Sort Method String
				sort_method = 'bubble'

			# Checking for 'S' Key
			elif event.key == pygame.K_b:

				# Updating Sort Method String
				sort_method = 'selection'

			# Checking for 'Enter' Key
			elif event.key == pygame.K_RETURN:

				# Updating Sort Boolean
				sort = True

				# Checking Sort Method
				if sort_method == 'insertion':

					# Calling Insertion Sort Function
					sort_states = helper_functions.insertion_sort(random_numbers)

				elif sort_method == 'bubble':

					# Calling Bubble Sort Function
					sort_states = helper_functions.bubble_sort(random_numbers)

				elif sort_method == 'selection':

					# Calling Selection Sort Function
					sort_states = helper_functions.selection_sort(random_numbers)

	# Checking Draw Boolean
	if draw_rectangles:

		# Drawing Rectangles
		for rectangle in range(len(rectangle_coordinates)):

			# Drawing Rectangle
			pygame.draw.rect(screen, CYAN, pygame.Rect(rectangle_coordinates[rectangle]))

			# Updating Screen
			pygame.display.flip()

		# Updating Draw Boolean
		draw_rectangles = False

	# Checking Sort Boolean
	elif sort:

		# Looping through sort states
		for state in range(1, len(sort_states)):

			# Filling Screen
			screen.fill(BLACK)

			# Calling Difference Function
			differences = helper_functions.difference(sort_states[state - 1], sort_states[state])

			# Generating Rectangles
			state_rectangles = helper_functions.get_rectangles(sort_states[state])

			# Drawing Rectangles in Current State
			for rectangle in range(len(state_rectangles)):

				# Checking Index in Difference
				if state == len(sort_states) - 1:

					# Drawing Rectangle
					pygame.draw.rect(screen, GREEN, pygame.Rect(state_rectangles[rectangle]))

				# Checking for Final State
				elif rectangle in differences:

					# Drawing Rectangle
					pygame.draw.rect(screen, YELLOW, pygame.Rect(state_rectangles[rectangle]))

				else:

					# Drawing Rectangle
					pygame.draw.rect(screen, CYAN, pygame.Rect(state_rectangles[rectangle]))

				# Updating Screen
				pygame.display.flip()

			# Adding Time Gap
			time.sleep(0.5)

		# Updating Sort Boolean
		sort = False




