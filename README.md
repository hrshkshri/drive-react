# Drive React

**Drive React** is a practice project aimed at solidifying understanding of key concepts in Firebase. It implements features related to user authentication, form validation, and file/folder management.

## Features

- **User Registration**: Allow users to create accounts using email and password.
- **User Sign In**: Existing users can sign in securely.
- **Form Validation**: Implemented form validation for a seamless user experience.
- **Add Folders**: Users can create and manage folders.
- **Add Files**: Capability to upload and manage files.
- **Navigate Through Folders**: Easily navigate folders with a click, and track the folder path using breadcrumbs.

## Tech Stack

- **React Hooks**: Utilized for state management and component logic.
- **Context API**: Efficiently manages global state.
- **Firebase Auth (Email and Password)**: For secure user authentication.
- **Firebase Cloud Firestore**: Cloud-based NoSQL database for storing data.
- **Firebase Storage**: Cloud-based storage for managing files.
- **Material UI**: UI components for a clean and modern design.
- **Styled Components**: Styling solution for component-based styling.

## Getting Started

1. Clone the repository.
2. create `.env` file in the root directory and add the following:

```
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```
3. Install dependencies using `npm install`.
4. Run the application with `npm start`.
