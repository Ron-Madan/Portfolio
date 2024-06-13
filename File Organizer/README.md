My mother was facing an indexing issue in her work. A list of files had to be organized by date. The process was too time-consuming and, unfortunately, 
reduced her job efficiency and wasted precious time. As a result, I made it my goal to expedite the process. After examining the problem, I realized that 
I could use Python to simplify the process. I broke the problem down into multiple components and then programmed code segments to solve each section.

For instance, I first created a shorter program to identify dates from a string. The problem was correctly identifying the date and not accidentally 
taking the digit from the year (ex: 1 from 2021). Another issue was determining whether the date had 1 or 2 digits (ex: January 3 vs. January 17). 
To combat this, I ensured that there were no digits surrounding the date’s digit(s) and stored the first value that had a length of 1 or 2. Also, 
since some files have multiple dates (ex: “… from September 13, 2017 to October 7, 2018”), I checked the characters of the file’s name starting 
from the end.

Below, I have included a sample input and output of files:

Sample Input:

- Bilateral Shoulder Ultrasound, by Dr. XYZ, dated August 16, 2020.pdf
- Psychology Report, by Dr. XYZ, dated May 28, 2021.pdf
- Physician Addendum - Insurer Examination, by Dr. XYZ, dated April 1, 2021.pdf
- Left Shoulder Radiographs and Ultrasound, by Dr. XYZ, dated December 21, 2020.pdf
- Multidisciplinary Assessment Report, by Dr. XYZ, dated December 2, 2020.pdf
- Physician Assessment Report, by Dr. XYZ, dated December 2, 2020.pdf
- MRI Reports, dated March 1, 2021.pdf
- Physician Paper Review - Insurer Examination, by Dr. XYZ, dated April 7, 2021.pdf
- Orthopedic Report, by Dr. XYZ, dated April 28, 2021.pdf



Sample Output:

- Bilateral Shoulder Ultrasound, by Dr. XYZ, dated August 16, 2020
- Multidisciplinary Assessment Report, by Dr. XYZ, dated December 2, 2020
- Physician Assessment Report, by Dr. XYZ, dated December 2, 2020
- Left Shoulder Radiographs and Ultrasound, by Dr. XYZ, dated December 21, 2020
- MRI Reports, dated March 1, 2021
- Physician Addendum - Insurer Examination, by Dr. XYZ, dated April 1, 2021
- Physician Paper Review - Insurer Examination, by Dr. XYZ, dated April 7, 2021
- Orthopedic Report, by Dr. XYZ, dated April 28, 2021
- Psychology Report, by Dr. XYZ, dated May 28, 2021
