# Importing Libraries
import pygame
import time
import sys
import helper_functions

# Initializing Pygame
pygame.init()

# Defining Screen Size, Display & Sort Method
size = width, height = 1513, 830
screen = pygame.display.set_mode(size)
sort_method = 'insertion'

# Defining Program Booleans
draw_rectangles = True
sort = False
rectangle_update = False
active = False

# Defining Colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
CYAN = (24, 255, 241)
YELLOW = (255, 255, 0)
GREEN = (0, 255, 0)

# Defining Font & Program Text
mediumFont = pygame.font.Font("OpenSans-Regular.ttf", 25)
reset_text = mediumFont.render('"r": Randomize Lengths', True, WHITE)
insertion_text = mediumFont.render('"i": Select "Insertion Sort"', True, WHITE)
selection_text = mediumFont.render('"s": Select "Selection Sort"', True, WHITE)
bubble_text = mediumFont.render('"b": Select "Bubble Sort"', True, WHITE)
quick_text = mediumFont.render('"q": Select "Quick Sort"', True, WHITE)
start_text = mediumFont.render('"Enter": Start Sorting', True, WHITE)
num_rec_text = mediumFont.render('# of Rectangles: ', True, WHITE)

# Filling Screen
screen.fill(BLACK)

# Calling Lengths Function
number_of_rectangles = 30
random_numbers = helper_functions.get_lengths(number_of_rectangles)

# Calling Rectangle Function
rectangle_coordinates = helper_functions.get_rectangles(random_numbers)

# Defining Time Gaps
time_gaps = {

'insertion': 15 / number_of_rectangles, 
'selection': 15 / number_of_rectangles, 
'bubble': 3 / number_of_rectangles, 
'quick': 4.5 / number_of_rectangles

}

# User Text String
user_text = '30'
  
# Create Text Rectangle
input_rect = pygame.Rect(300, 725, 150, 50)
  
# Defining Text Box Colours
color_active = (51, 204, 51)
color_passive = (255, 128, 128)
color = color_passive

# Running Pygame
while True:

	# Checking Events
	for event in pygame.event.get():

		# Checking for Quit
		if event.type == pygame.QUIT:

			# Closing Pygame
			sys.exit()

		# Checking for Text Box Click
		if event.type == pygame.MOUSEBUTTONDOWN:

			# Checking for Collision with Text Box
			if input_rect.collidepoint(event.pos):

				# Updating Active State
				active = True

				# Resetting User Text
				user_text = ""

			else:

				# Updating Active State
				active = False

		# Checking for Key pressed
		if event.type == pygame.KEYDOWN:

			# Checking for 'R' Key
			if event.key == pygame.K_r:

				# Re-Generating Lengths
				random_numbers = helper_functions.get_lengths(number_of_rectangles)

				# Re-Generating Rectangles
				rectangle_coordinates = helper_functions.get_rectangles(random_numbers)

				# Updating Draw Boolean
				draw_rectangles = True

				# Filling Screen
				screen.fill(BLACK)

			# Check for Backspace
			elif event.key == pygame.K_BACKSPACE:
  
				# get text input from 0 to -1 i.e. end.
				user_text = user_text[:-1]

			# Checking for Numeric Input
			elif event.key == pygame.K_0 or event.key == pygame.K_1 or event.key == pygame.K_2 or event.key == pygame.K_3 or event.key == pygame.K_4 or event.key == pygame.K_5 or event.key == pygame.K_6 or event.key == pygame.K_7 or event.key == pygame.K_8 or event.key == pygame.K_9:

				# Adding onto User Text
				user_text += event.unicode

			# Checking for 'I' Key
			elif event.key == pygame.K_i:

				# Updating Sort Method String
				sort_method = 'insertion'

			# Checking for 'B' Key
			elif event.key == pygame.K_b:

				# Updating Sort Method String
				sort_method = 'bubble'

			# Checking for 'S' Key
			elif event.key == pygame.K_s:

				# Updating Sort Method String
				sort_method = 'selection'

			# Checking for 'Q' Key
			elif event.key == pygame.K_q:

				# Updating Sort Method String
				sort_method = 'quick'

			# Checking for 'Enter' Key
			elif event.key == pygame.K_RETURN:

				# Updating Sort Boolean
				sort = True

				# Checking Sort Method
				if sort_method == 'insertion':

					# Calling Insertion Sort Function
					sort_states = helper_functions.insertion_sort(random_numbers)

				# Checking Sort Method
				elif sort_method == 'bubble':

					# Calling Bubble Sort Function
					sort_states = helper_functions.bubble_sort(random_numbers)

				# Checking Sort Method
				elif sort_method == 'selection':

					# Calling Selection Sort Function
					sort_states = helper_functions.selection_sort(random_numbers)

				# Checking Sort Method
				elif sort_method == 'quick':

					# Calling Quick Sort Function
					sort_states = helper_functions.run_quick_sort(random_numbers)

	# Checking Active State
	if active:

		# Updating Text Box Colour
		color = color_active

		# Updating Rectangle Boolean
		rectangle_update = True

	else:

		# Updating Text Box Colour
		color = color_passive

		# Checking Rectangle Boolean
		if rectangle_update and user_text != "" and int(user_text) != number_of_rectangles:

			# Updating Number of Rectangles
			number_of_rectangles = int(user_text)

			# Re-Generating Lengths
			random_numbers = helper_functions.get_lengths(number_of_rectangles)

			# Re-Generating Rectangles
			rectangle_coordinates = helper_functions.get_rectangles(random_numbers)

			# Updating Draw Boolean
			draw_rectangles = True

			# Filling Screen
			screen.fill(BLACK)

			# Updating Rectangle Boolean
			rectangle_update = False

	# Creating User Text Box
	pygame.draw.rect(screen, color, input_rect)
	text_surface = mediumFont.render(user_text, True, (255, 255, 255))
	  
	# Renderung User Text Box
	screen.blit(text_surface, (input_rect.x+5, input_rect.y+5))

	# Updating Screen
	pygame.display.flip()

	# Checking Draw Boolean
	if draw_rectangles:

		# Drawing Rectangles
		for rectangle in range(len(rectangle_coordinates)):

			# Drawing Rectangle
			pygame.draw.rect(screen, CYAN, pygame.Rect(rectangle_coordinates[rectangle]))

		# Drawing Program Text
		screen.blit(reset_text, (1150, 100))
		screen.blit(insertion_text, (1150, 200))
		screen.blit(selection_text, (1150, 300))
		screen.blit(bubble_text, (1150, 400))
		screen.blit(quick_text, (1150, 500))
		screen.blit(start_text, (1150, 600))
		screen.blit(num_rec_text, (50, 725))

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

			# Drawing Program Text
			screen.blit(reset_text, (1150, 100))
			screen.blit(insertion_text, (1150, 200))
			screen.blit(selection_text, (1150, 300))
			screen.blit(bubble_text, (1150, 400))
			screen.blit(quick_text, (1150, 500))
			screen.blit(start_text, (1150, 600))
			screen.blit(num_rec_text, (50, 725))

			# Updating Screen
			pygame.display.flip()

			# Adding Time Gap
			time.sleep(time_gaps[sort_method])

		# Updating Sort Boolean
		sort = False




