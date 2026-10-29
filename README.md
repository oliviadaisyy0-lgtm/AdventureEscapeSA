# Project Name : Adventure Escape SA

# Task 2 : Website Development
The purpose of the project is to create a user-friendly website with clear navigation, organised information, and a consistent design.
The website is developed using HTML, CSS and JavaScript and is based on the high-fidelity wireframes created in Figma.

## Project Objectives

* Develop a website based on the Figma designs.
* Provide clear and easy-to-use navigation.
* Present information in a simple and organised way.
* Create the required website pages.
* Collaborate as a group using GitHub.

## Website Pages
The website includes the following pages:
* Home Page (home.html) – Introduces the company with a banner, the buttons View Packages and Get Quote, and the featured packages. It gives access to the main sections of the website.
* About Us (about.html) – Provides information about the organisation, its background (founded by Liam Daniels), and its mission.
* Overview Page (overview.html) – Shows all 4 adventure packages and 3 individual activities. The buttons All, Packages and Individual Activities filter what is shown.
* Individual Page (individual.html) – Provides additional information about a selected package (for example the Mountain Adventure Package): pictures, rating, and sections that open and close (Description, What's Included, Meeting Point and Cancellation Policy). It also has a date box, Book Now, Add To Quote, Save and Share.
* Fees Page (fees.html) – Displays the prices. Visitors add activities to Your Selection and the subtotal, discount and total are calculated.
* Contact Page (contact.html) – Provides contact information, a map, and a form for visitors to make enquiries.

## Features

- **View Detail / View buttons:** each one opens `individual.html` with that package's own description, what is included, photos, meeting point and cancellation policy.
- **Overview filters:** the All, Packages and Individual Activities buttons show or hide the two sections.
- **Package page:**
  - The arrows open and close Description, What's Included, Meeting Point and Cancellation Policy (arrow down shows the information, arrow up hides it).
  - Clicking a small photo makes it the big photo.
  - Save remembers the package in the browser, and Share copies the page link.
  - Book Now needs a date, then opens the Contact page with the package filled in.
  - Add To Quote adds the package to the Fees page.
- **Fees page:**
  - `+ Add` puts an item in Your Selection, and `X` removes it.
  - The subtotal, discount and total update every time.
  - The selection is remembered in the browser.
  - Request Quote opens the Contact page with the quote in the message.
- **Contact page:** checks the name and email before sending, and has a package drop-down and a map link.


### Prices 

| Item | Price |
|---|---|
| Packages (Corporate Team Challenge, Mountain Adventure, Ultimate Adventure Day, Family Explorer) | R1 500 |
| Individual activities (Ziplining Adventure, Kayaking Experience, Rock Climbing Session) | R750 |

## Discount rule

| Bookings | Discount |
|---|---|
| 1 | 0% |
| 2 | 5% |
| 3 | 10% |
| 4 or more | 15% |

Example: Corporate Team Challenge (R1500) + Ziplining Adventure (R750) = R2250. Two bookings gives 5% off (R112.50), so the total is **R2137.50**.


## Technologies Used

* HTML5 – Structures the website content.
* CSS3 – Styles the website and controls its layout (all in style.css).
* JavaScript – Adds interactivity: filters, arrows, the fees calculator, forms and buttons (all in script.js).
* Visual Studio Code – Used to write and edit the code.
* Figma – Used to design the wireframes.
* GitHub – Used for version control and group collaboration.

## How to Run the Website
1. Clone or download this repository (click Code, then Download ZIP, and unzip it).
2. Open the project folder in Visual Studio Code.
3. Locate the home.html file.
4. Open home.html in a web browser, or use the Live Server extension in Visual Studio Code.
5. Use the navigation links to explore the website pages


## Project Structure
```text
adventure-escape/
|-- home.html
|-- about.html
|-- overview.html
|-- individual.html
|-- fees.html
|-- contact.html
|-- style.css
|-- script.js
|-- images/
|-- presentation/
|   |-- AdventureEscapeSA_Phase2.pptx
|   |-- AdventureEscapeSA_Phase2.pdf
|-- README.md
```

## Project Design

The website design follows the high-fidelity wireframes created in Figma. The layout, colours, images, logos, and content are intended to provide a consistent user experience.
* Colours: forest green, burnt orange and sand beige, to represent nature and adventure.
* Navigation: the same simple menu and the same layout on every page.
* Buttons: large and clearly interactive, with orange and green for the main actions.

## figma link for website and mobile 
https://www.figma.com/design/WJYrIjh7CamHH2RB8sEkSH/Adventure-Escape-SA?node-id=44-2&p=f&t=I7HIITXhT1nk1vz4-0

## Updates and changes

| Task | What was done |
|---|---|
| Task 1 | Individual report (scenario, colours, logo), group roles and tasks, research, infrastructure and low-fidelity wireframes in Figma |
| Task 2 | High-fidelity designs in Figma, first version of the website and mobile app |
| Task 3 | Website finished with working buttons and fee calculation, all CSS in one file, all JavaScript in one file, pictures built in, pages matched to the Figma designs |

Changes made in Task 3:
- Merged the separate page CSS files into one `style.css`.
- Merged the separate JavaScript files into one `script.js`.
- Added working filter buttons, arrows, photo swap, Save, Share, Book Now and Add To Quote.
- Added the fee calculator with the discount rule.
- Fixed a bug where refreshing the Fees page added a removed item again.



## Group Members

* Group Member 1: Rayan Bvulani 
* Group Member 2: Itumeleng Ndlovu 
* Group Member 3: Asukia Ebuta

## Demonstration

YouTube Video for html website: https://youtu.be/EOJXmWRH18s
final completed website: https://youtu.be/PSfgPdeRSlA



## Assignment Submission

This project final part of Task . The completed website HTML, CSS and JAVASCRIPT, and make presentation and final video.


