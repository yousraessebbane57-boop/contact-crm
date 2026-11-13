# Contact CRM

## Project Description

Contact CRM is a web application built with Angular that allows users to manage their professional and personal contacts.

The application provides contact and category management, search and filtering features, favorites, and a dashboard with useful statistics.

All application data is stored locally in the browser using localStorage. No external backend or database is required.

## Technologies

- Angular 22
- TypeScript
- HTML5
- CSS3
- Angular Router
- Reactive Forms
- Angular Signals
- Browser localStorage
- ESLint

## Installation

Clone the repository:

```bash
git clone <repositogit clone git@rendu-git.etna-alternance.net:module-10598/activity-57751/group-1086607.gitry-url>
```

Navigate to the project directory:

```bash
cd IDV-ANGU/day03/contact-crm
```

Install dependencies:

```bash
npm install
```

## Run the Project

Start the development server:

```bash
ng serve
```

Open your browser at:

http://localhost:4200

## Main Features

### Contact Management
- Create contacts.
- View contact details.
- Edit existing contacts.
- Delete contacts.
- Search contacts by name or email.
- Filter contacts by category.
- Sort contacts by name or creation date.
- Add or remove contacts from favorites.

### Category Management
- Create categories.
- View category details.
- Edit categories.
- Delete categories.
- Prevent deletion when contacts are assigned to a category.

### Dashboard
- Display the total number of contacts.
- Display the total number of categories.
- Display the number of favorite contacts.
- Show recently created contacts.

### Favorites
- Display all favorite contacts.
- Remove contacts from favorites.

## Architecture & Design Choices

The application follows a feature-based architecture.

- **Core:** contains shared models and services.
- **Shared:** contains reusable components such as the header and footer.
- **Features:** contains the dashboard, contacts, categories, and favorites sections.

Angular services centralize application logic and data management.

Angular Signals are used to manage reactive application state.

Reactive Forms handle contact and category forms, including validation.

Angular Router manages navigation between application pages.

The browser's localStorage provides persistent local data storage, allowing information to remain available after refreshing the page.

## Author

Yousra Essebbane

