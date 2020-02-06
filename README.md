# Match USF
## Try Match USF 
To view the main application, simply visit [Match USF](https://musf-frontend.herokuapp.com/)


> **Note**: Initial loading of the application may take a few seconds, this may include submitting forms or logging in as the admin. ***If the application displays an error during the initial load***, simply refresh the tab.


**Try the Administrator Portal:**


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Username** - admin 


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Password** - opentheportal

## Brief Overview
Match USF is a full-stack web application created to help the IT Senior Project professor match optimal project groups faster.
### The Problem
Group-based courses can often be a major pain for instructors due to having to group students up manually. In a simple course where everyone is doing the same project, instructors could just randomly group students to make their lives easy. Unfortunately when it comes to senior project courses, where each group's project can vary widely, it is very important to group students that are interested in doing the same things.


The instructor can of course put grouping in the hands of the students but that can also be very annoying for the students. In this case, students must advertise themselves (projects they are interested in, availability, etc.) in a discussion post and wait for others to notice and respond. Sometimes these responses can come too late, after the student has already either filled their current group or chose to join another. This can lead to a vicious cycle of constant emailing until the student finally finds an open group matching their needs. Therefore, this type of solution only moves the struggle from the teacher to the students.
### The Solution
In order to make the process of matching students into compatible groups faster and easier on both the students and the teacher, the best thing to do is to try to automate the task as much as possible.
## How Match USF Works
### For Students
Students using Match USF will simply need to fill out and submit a web-form containing their basic information, the top 3 projects they would be interested in working on (from most preferred to least preferred), and what time they are typically available.
### For Instructors
Instructors using Match USF will be able to login, view all the current submitted forms, delete forms, and finally run a create groups function that automatically creates and displays suggested groups of 3 or 4 based on shared project interests and available times.
## Technology Used
- **Hosted on:**
  - Heroku
- **Front-end Tools:**
  - React
  - Tachyons
  - Materialize
- **Back-end Tools:**
  - Node
  - Express
  - PostgreSQL
## About the Grouping Algorithm
The grouping algorithm creates groups of 3 or 4 (max) based on compatible availability time and project choice. It attempts to assign students to their first choice then filters down choice levels from there until most students have been assigned to a group. Students that were not able to be assigned are added to a final "Unassigned Students" group. From there, the instructor can contact and/or manually place the unassigned student(s) into another group, overriding the group size limit or availability constraint at their own discretion.


#### Students in the unassigned group are typically there for one or more of the following reasons:
- None of their selected choices had enough people to make a group
    - For example, two people selected project 5 as their 1st or 2nd choice but the algorithm couldn’t find a 3rd member to add
- The student picked all choices that no one else picked
- There was a project that met the students 1st, 2nd, or 3rd choice open **BUT** the time availability did not match
- There was a project that met the student’s 1st, 2nd, or 3rd choice **AND** time availability **BUT** it was already maxed 
