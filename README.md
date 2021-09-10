# Il Brutto - client

Contributors: Filip Almstedt, Edvin Sjögren, Erik Åström

To watch our repository for the server, go to: [Il-Brutto-Back-End](https://github.com/FilipAlmstedt/Il-Brutto-Back-End.git)

---

## What is Il Brutto - client?

_This is a group project which was to create a MERN stack web application that a restaurant uses._ 

_This is the repository for the client, the front-end so this is there we handle out functionality for our . The framework we use for this project is React with typescript._ 

_The website is a SPA which uses routing to route to different components._ 

_There is an admin page but there is no login functionality so that page is only a route._ 

---

## Getting Started

To install and use the project:

1. Navigate to the directory where you want to put your repository,
2. Run `git clone https://github.com/FilipAlmstedt/Il-Brutto-Front-End.git`
3. Run `npm install` to install node modules and all the extra plugins and dependencies that are needed.

---

## Functions

The user that could be admin or normal user will be able to: 

* Clients will be able to create reservations and then get the confirmation mail from back-end
* Clients will be able to cancel reservations and get cancellation mail from back-end

* Admin clients will be able to create reservations and then get the confirmation mail from back-end
* Admin clients will be able to cancel reservations and then get the cancellation mail from back-end
* Admin clients will be able to edit reservations.

---

## Follow project rules

### Naming conventions
_Below you'll find a brief summary of the naming conventions for this project_

#### Variables

- Use let or const instead of var
- When naming variables, use English and not Swedish.
- When naming variables use **camelCase**
    - Eg. `let userName = "hello world"`
- When creating a class, or creating a new component, use **PascalCase**
    - Eg. `export class Booking {...}`
- When naming variables in SASS, use **kebab-case**
  - Eg. `$bg-color: grey`

---

### Created Components

* There is four folders for the components in the project. 
* One for admin, one called BookingComponents which is all the child components for the bookingPage. 
* There is one called layout which is the footer and header component 
* And then we have pages which is all the pages that has a route.

---

### Styling

In this project we use SASS for styling. The application is designed with the MOBILE FIRST principle so we style the application for mobile users first and then for desktops.

The folder we add SASS-files in is called SCSS and is located in the src-folder in the project from the root directory.

When we use margins or padding on an element we use `.rem`

The SCSS-folder contains: 
```
.                       # src-folder
├── assets              # folder that contains images
├── components          # folder that contains styling buttons, forms or icons etc. that is reused in the other SASS-files
├── layout              # folder that contains styling for footer and header
├── pages               # folder that contains styling for the specific components
├── utilities           # folder that contains mixins, variables that's reused in the other SASS-files
└── App.scss            # SASS-file that is used for styling and imports the other SASS-files

```

_The `utilities` folder contains all major presets for the project, corresponding with Brand Outline as presented in [FIGMA team project IL BRUTTO](https://www.figma.com/file/KKd0ShsoPkyrjkDGNEEwlG/IL-BRUTTO?node-id=99%3A326)_

---

### Lifting State Up

When using child components we are using props and lifting state up to send in objects and communicate with the functions in the child components, the majority is from bookingPage to the child components.

---


## Project Structure: 

This from the folder src in a created react project: 

```
.
├── __mocks__                                                           # mocks for testing
├── components                                                          # folder for all the components created for the project
│        ├── AdminComponents                                            # folder for all child componends regarding adminPage
│        │       ├── AdminBookingTable                                  # folder for the component that renders out the reservations
│        │       │            ├── AdminBookingTable.test.tsx            # test-file for AdminbookingTable component
│        │       │            └──  AdminBookingTable.tsx                # component that renders out reservations
│        │       ├── AdminEditBooking.tsx                               # component that lets the admin edit reservation
│        │       └── AdminSeatingTime.tsx                               # component that lets the admin choose seating time
│        ├── BookingComponents                                          # folder for all the child components for bookingPage
│        │           ├── SeatingComponents                              # folder that includes the seatingTime components
│        │           └── ...                                            # all the remaining child components
│        │ 
│        ├── Layout                                                     # folder that includes the footer and header components
│        └── Pages                                                      # folder that includes the "main" components that has routes
├── Models                                                              # folder that contains the classes needed
├── App.tsx                                                             
├── ... 
└── SCSS                                                                # SASS-folder with styling
     ├── App.scss                                                       # SASS-file that is used for styling and imports the other SASS-files
     └── ...                                                            # Remaining SASS-files which includes SASS-files structure for mixins, pages, etc.
```


---

## Testing

To initialize test, enter `npm test` in terminal. 

We are using react-test-library.

When creating test files, make sure to put them inside a folder containing the component that is going to be tested. The name of the folder should be the same as the name of the component. The test file is also named the same way: <component-name>.test.tsx

Example:

```
.
├── __mocks__                                                           # mocks for testing
├── components                                                          # folder for all the components created for the project
│        ├── AdminComponents                                            # folder for all child componends regarding adminPage
│        │       ├── AdminBookingTable                                  # folder for the component that renders out the reservations
│        │       │            ├── AdminBookingTable.test.tsx            # test-file for AdminbookingTable component
│        │       │            └──  AdminBookingTable.tsx                # component that renders out reservations
```
---