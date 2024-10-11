import { createContext, useState, ReactNode } from "react";

// Define the user details type
type UserDetails = {
  id: string;
  name: string;
  email: string;
  verified: boolean;
};

// Define the context type
type UserContextType = {
  GlobalUserDetails: UserDetails | null;
  setGlobalUserDetails: React.Dispatch<React.SetStateAction<UserDetails | null>>;
};

// Create the context with an initial value
export const userContext = createContext<UserContextType | undefined>(undefined);

// Define the provider component
export function GlobalContextProvider({ children }: { children: ReactNode }) {
  // Initialize state for userDetails
  const [GlobalUserDetails, setGlobalUserDetails] = useState<UserDetails | null>(null);

  return (
    <userContext.Provider value={{ GlobalUserDetails, setGlobalUserDetails }}>
      {children}
    </userContext.Provider>
  );
}
