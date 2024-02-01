import React, { useState } from "react";
import Select from "react-select";
import "./App.css";
import { foodData } from "./foodData";

interface FoodItem {
  food: string;
  safeAmount: string;
}

const App = () => {
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [result, setResult] = useState("");

  // Function to convert foodData to the format required by React-Select
  const getOptions = () => {
    const sortedFoodData = [...foodData];
    sortedFoodData.sort((a, b) => a.food.localeCompare(b.food)); // Sort the array alphabetically by the 'food' property
    return sortedFoodData.map((item: FoodItem) => ({
      value: item.food,
      label: item.food,
    }));
  };

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
    const foodItem = foodData.find(
      (item) => item.food === selectedOption.value
    );
    if (foodItem) {
      setResult(`Safe Amount: ${foodItem.safeAmount}`);
    } else {
      setResult("");
    }
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      width: 300, // Set a fixed width or use percentage
      color: "black", // Text color
      backgroundColor: "white", // Background color of the input
    }),
    menu: (provided: any) => ({
      ...provided,
      color: "black", // Text color
      backgroundColor: "#f7f7f7", // Dropdown background color
    }),
    option: (provided: any, state: { isSelected: any }) => ({
      ...provided,
      backgroundColor: state.isSelected ? "blue" : "white",
      color: state.isSelected ? "white" : "black",
      "&:hover": {
        backgroundColor: state.isSelected ? "blue" : "#dddddd",
      },
    }),
    // Add other style customizations as needed
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dog Food Safety Checker</h1>
        <div>
          <Select
            value={selectedOption}
            onChange={handleChange}
            options={getOptions()}
            placeholder="Select or type a food item"
            styles={customStyles}
          />
        </div>
        {result && <p>{result}</p>}
      </header>
    </div>
  );
};

export default App;
