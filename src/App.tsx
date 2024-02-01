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

  // Warning message for users
  const warningMessage = (
    <div className="warning-message">
      <p>
        <strong>Important:</strong> This app is designed to help you quickly
        check if a food item your pet has consumed is toxic to them.
      </p>
      <p>
        While some these foods are generally considered safe in moderation,
        always be cautious and consult with your veterinarian if you have
        concerns. In case of an emergency, call the ASPCA Animal Poison Control
        Center at <a href="tel:1-888-426-4435">1-888-426-4435</a> any time, day
        or night, including weekends and holidays.
      </p>
    </div>
  );

  // Determine the text color based on the presence of the word "toxic" in the result
  const textColor = result.toLowerCase().includes("toxic") ? "red" : "white";

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dog Food Safety Checker</h1>
        {warningMessage}
        <div>
          <Select
            value={selectedOption}
            onChange={handleChange}
            options={getOptions()}
            placeholder="Select or type a food item"
            styles={customStyles}
          />
        </div>
        <p style={{ color: textColor }}>{result}</p>
      </header>
    </div>
  );
};

export default App;
