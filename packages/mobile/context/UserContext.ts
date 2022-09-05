import { createContext } from "react";
import { User } from "../graphql/generated/graphql";

export interface UserContextType {}

interface Props {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>> | null;
}

export const UserContext = createContext<Props>({
  currentUser: null,
  setCurrentUser: null,
});
