import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import tw from "../lib/tailwind";
import { grey0, grey100 } from "../theme/style";

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
      icon={() => <EvilIcons name="search" size={24} color={grey0} />}
      clearIcon={() => <MaterialIcons name="clear" size={20} color={grey0} />}
      onChangeText={(newText) => handleChange(newText)}
      value={text}
      placeholderTextColor={grey100}
      style={tw`bg-grey-500`} // text-grey-0 doesn't work
      theme={{ colors: { text: grey0 } }}
    />
  );
};

export default SearchBar;
