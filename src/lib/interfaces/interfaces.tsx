// todoSlice.ts interface

export interface Todo {
  title: string;
  description?: string;
  category: "To Do" | "In Progress" | "Under Review" | "Finished";
  priority?: "Urgent" | "Medium" | "Low";
  deadline?: string;
  customProperties?: { [key: string]: any };
  createdAt: string;
  updatedAt: string;
  _id?: string;
}

export interface TodoState {
  "To Do": Todo[];
  "In Progress": Todo[];
  "Under Review": Todo[];
  Finished: Todo[];
  todosUpdated: boolean; // New state for tracking updates
}

// userInfoSlice.ts interface

export interface UserInfo {
  name: string;
  email: string;
  id: string;
}

// getmyToken.ts interface

export interface DecodedToken {
  id: string;
  email: string;
  name: string;
}

// mailer.ts interface

export interface SendEmailPropsType {
  email: string;
  emailType: string;
  userId: string;
}

// AddNewButton.tsx interface

export interface CustomProperty {
  key: string;
  value: string;
}

export interface Data {
  userInfo: {
    id: string;
  };
}
export interface Fields {
  Title: string;
  Category: string;
  Priority: string;
  Deadline: string;
  Description: string;
}

export interface FieldProps {
  iconSrc: string;
  label: string;
  value?: string;
  onChange: (value: string) => void;
}

// Cards.tsx interface

// export interface Props {
//   props: {
//     title: string;
//     category: string;
//     priority?: string;
//     deadline?: string;
//     description?: string;
//     customProperties?: { [key: string]: any }; // Updated to reflect object type
//     [key: string]: any; // Index signature for additional properties
//   };
// }

export interface Props {
  props: {
    title: string;
    description?: string;
    priority?: string;
    deadline?: string;
    customProperties?: Record<string, string>;
    _id?: string;
    createdAt?: string;
    category?:string;
  };
}

// Sidebar.tsx interface

export interface UserInfo {
  name: string;
  email: string;
  id: string;
}

export interface SideBarItemProps {
  icon: string;
  label: string;
}

// signup/page.tsx interface

export interface User {
  name?: string;
  email: string;
  password: string;
}

export interface ServerResponse {
  message: string;
  success?: boolean;
}

// // signin/page.tsx interface
// export interface SignInUser {
//   email: string;
//   password: string;
// }
