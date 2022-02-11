import { createContext, useContext, useReducer } from "react";

interface Person {
  name: string;
  lastName: string;
  isLoggedIn: boolean;
  cars: Car[];
  toggleLogin?: () => void;
  addCar?: () => void;
  updateCar?: () => void;
  removeCar?: () => void;
}

interface Car {
  id: number;
  brand: string;
  color: string;
}

type Props = {
  children: React.ReactNode;
};

type Action = {
  type: CarActionKind;
  payload: Car;
};

enum CarActionKind {
  add = "ADD_CAR",
  update = "UPDATE_CAR",
  remove = "REMOVE_CAR",
}

export const UserContext = createContext<Person | null>(null);

const initialState: Person = {
  name: "Gerardo",
  lastName: "Estrada",
  isLoggedIn: false,
  cars: [
    {
      id: 1,
      brand: "Toyota",
      color: "Blue",
    },
    {
      id: 2,
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

function carReducer(state: Person, action: Action) {
  switch (action.type) {
    case CarActionKind.add:
      return {
        ...state,
        cars: [...state.cars, action.payload],
      };
    case CarActionKind.update:
      return {
        ...state, cars: state.cars.map((car) => {
          if (car.id === action.payload.id){
            return action.payload;
          }
          return car
        })
      }
    case CarActionKind.remove:
      return {
        ...state,
        cars: state.cars.filter((car) => car.id !== action.payload.id),
      };
  }
}

const UserContextProvider = ({ children }: Props) => {
  const [userInfo, dispatch] = useReducer(carReducer, initialState);

  const addCar = () => {
    dispatch({
      type: CarActionKind.add,
      payload: { id: 3, brand: "Chevrolet", color: "Yellow" },
    });
    console.log(userInfo.cars);
  };

  const updateCar = () => {
    dispatch({
      type: CarActionKind.update,
      payload: { id: 1, brand: "Toyota", color: "Green"}
    })
  }
  console.log(userInfo.cars);

  const removeCar = () => {
    dispatch({
      type: CarActionKind.remove,
      payload: { id: 1, brand: "Toyota", color: "Blue" },
    });
    console.log(userInfo.cars);
  };

  return (
    <UserContext.Provider value={{ ...userInfo, addCar, removeCar, updateCar }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
