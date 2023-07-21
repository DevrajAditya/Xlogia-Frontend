import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
} from "@chakra-ui/react";
import Header from "./Header";

const Form = ({ onSubmitSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestData = { name, email, age };
      console.log("first", requestData);
      const response = await fetch("http://localhost:5000/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        console.log("New employee data saved successfully");
        setName("");
        setEmail("");
        setAge(0);
        onSubmitSuccess();
        window.alert("Data saved successfully");
      } else {
        window.alert("Error saving form data");
      }
    } catch (error) {
      console.log("Error saving form data:", error);
    }
  };

  return (
    <>
      <Header />
      <Center mt="1em">
        <Box
          w="400px"
          p={4}
          borderWidth="1px"
          borderRadius="1px solid gray"
          boxShadow="md"
        >
          <form onSubmit={handleSubmit}>
            <FormControl display="flex" alignItems="center">
              <FormLabel flex="0 0 100px">Name:</FormLabel>
              <Input
                flex="1"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <br />
            <FormControl display="flex" alignItems="center">
              <FormLabel flex="0 0 100px">Email:</FormLabel>
              <Input
                flex="1"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <br />
            <FormControl display="flex" alignItems="center">
              <FormLabel flex="0 0 100px">Age:</FormLabel>
              <Input
                flex="1"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </FormControl>
            <br />
            <Button type="submit" mt={4} colorScheme="blue">
              Save
            </Button>
          </form>
        </Box>
      </Center>
    </>
  );
};

export default Form;
