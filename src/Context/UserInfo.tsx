import { createContext, useContext, useState } from "react";

interface Person {
  name: string;
  lastName: string;
  isLoggedIn: boolean;
  cars: [{ brand: string; color: string }, { brand: string; color: string }];
  toggleLogin?: () => void;
}
type Props = {
  children: React.ReactNode;
};

export const UserContext = createContext<Person | null>(null);

const initialState: Person = {
  name: "Gerardo",
  lastName: "Estrada",
  isLoggedIn: false,
  cars: [
    {
      brand: "Toyota",
      color: "Blue",
    },
    {
      brand: "Nissan",
      color: "Red",
    },
  ],
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("You can't use the themecontext outside of the provider");
  }
  return context;
};

const UserContextProvider = ({ children }: Props) => {
  const [userInfo, setUserInfo] = useState(initialState);

  const toggleLogin = () => {
    setUserInfo((state) => {
      return {
        ...state,
        isLoggedIn: !state.isLoggedIn,
      };
    });
  };

  return (
    <UserContext.Provider value={{ ...userInfo, toggleLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
