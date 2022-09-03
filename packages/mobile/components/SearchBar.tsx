import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";

interface Props {
  searchText: string;
  onChange: (text: string) => void;
  placeholder: string;
}

const SearchBar = ({ searchText, onChange, placeholder }: Props) => {
  const [text, setText] = useState<string>(searchText || "");

  const handleChange = (newText: string) => {
    setText(newText);
    if (onChange) onChange(newText);
  };

  return (
    <Searchbar
      placeholder={placeholder}
      icon={() => <EvilIcons name="search" size={24} color="black" />}
      clearIcon={() => <MaterialIcons name="clear" size={20} color="black" />}
      onChangeText={(newText) => handleChange(newText)}
      value={text}
    />
  );
};

export default SearchBar;
