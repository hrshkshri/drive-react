# Drive React

**Drive React** is a practice project aimed at solidifying understanding of key concepts in Firebase. It implements features related to user authentication, form validation, and file/folder management.

### Demo
![Screenshot 2024-06-08 at 11 05 16 PM](https://github.com/hrshkshri/drive-react/assets/108923011/6bb1807b-6b7b-4f99-934d-a8e741c50075)
![Screenshot 2024-06-08 at 11 02 14 PM](https://github.com/hrshkshri/drive-react/assets/108923011/7641e7ae-4de8-46a3-8375-34348b4bd058)
![Screenshot 2024-06-08 at 10 57 09 PM](https://github.com/hrshkshri/drive-react/assets/108923011/274d57dd-6555-40e1-ab94-bc927452c1ee)
![Screenshot 2024-06-08 at 10 56 56 PM](https://github.com/hrshkshri/drive-react/assets/108923011/23d0292a-1145-43b8-a881-80db5de0a9f5)
![Screenshot 2024-06-08 at 10 56 43 PM](https://github.com/hrshkshri/drive-react/assets/108923011/755d312c-dc81-4f97-a1a5-b3e29aff6532)
![Screenshot 2024-06-08 at 10 56 34 PM](https://github.com/hrshkshri/drive-react/assets/108923011/d3bc2a05-b616-434c-b7dc-c98f5303c122)
![Screenshot 2024-06-08 at 10 54 59 PM](https://github.com/hrshkshri/drive-react/assets/108923011/bf9fd03d-f3c3-421e-9aa7-fe5fcbbc9ab2)



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
