import { useState } from "react";
import "./App.css";

interface Car {
  id: number;
  name: string;
}
const futureCars: Car[] = [
  {
    id: 1,
    name: "Volkswagen",
  },
  {
    id: 2,
    name: "BMW",
  },
  {
    id: 3,
    name: "Toyota",
  },
  {
    id: 4,
    name: "Nissan",
  },
  {
    id: 5,
    name: "General Motors",
  },
  {
    id: 6,
    name: "Hyundai",
  },
  {
    id: 7,
    name: "Peugeot",
  },
  {
    id: 8,
    name: "Kia",
  },
  {
    id: 9,
    name: "Volvo",
  },
  {
    id: 10,
    name: "Mazda",
  },
];
function App(): JSX.Element {
  const [selectedCars, setSelectedCars] = useState<Car[]>([]);
  const [applyChangesClicked, setApplyChangesClicked] = useState(false);

  const handleSelectedCars = (car: string, carID: number) => {
    setSelectedCars((selectedPrev) => [
      ...selectedPrev,
      { name: car, id: carID },
    ]);
  };

  const handleApplyChanges = () => {
    setApplyChangesClicked(true);
  };

  const handleReset = () => {
    setSelectedCars([]);
    setApplyChangesClicked(false);
  };

  const getSortedCars = () => {
    if (applyChangesClicked) {
      const selectedCarsSorted = [...selectedCars].sort((a, b) => a.id - b.id);
      const unselectedCars = futureCars.filter(
        (car) => !selectedCars.some((selected) => selected.id === car.id)
      );

      return [...selectedCarsSorted, ...unselectedCars];
    } else {
      return futureCars;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="head">
          <button onClick={handleReset} className="rest-btn">
            Reset
          </button>
          <span>Future Cars</span>
          <button onClick={handleApplyChanges} className="apply-btn">
            Apply Changes
          </button>
        </div>

        {getSortedCars().map((car: Car, index: number) => (
          <div className="cars-holder" key={index}>
            <div className="checkbox-holder">
              <input
                type="checkbox"
                id={`car${index}`}
                disabled={applyChangesClicked}
                onChange={() => {
                  handleSelectedCars(car.name, car.id);
                }}
              />
              <label htmlFor={`car${index}`}>{car.name}</label>
            </div>
            <span>{car.id}</span>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
