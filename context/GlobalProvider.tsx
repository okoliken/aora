import {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { getCurrentUser } from "@/lib/appwrite";
import { Alert } from "react-native";

interface GlobalContextProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

interface User {
  $id?: string;
  email?: string;
  username?: string;
}
const GlobalContext = createContext<GlobalContextProps>({
  isLoading: true,
  isLoggedIn: false,
  user: null,
  setIsLoading: () => {},
  setIsLoggedIn: () => {},
  setUser: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: React.PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getCurrentUser();
        if (fetchedUser) {
          setIsLoggedIn(true);
          setUser(fetchedUser as User);
        }
      } catch (error) {
        Alert.alert("Error", error as string);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
