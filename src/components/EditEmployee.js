// EditEmployee.js
import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
} from "@chakra-ui/react";
import Header from "./Header";
import axios from "axios";

const EditEmployee = ({ employeeId, onEditSuccess, onCancel }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);

  useEffect(() => {
    fetchEmployeeData();
  }, [employeeId]);

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/employees/${employeeId}`
      );
      if (response.status === 200) {
        const employeeData = response.data;
        setName(employeeData.Name);
        setEmail(employeeData.Email);
        setAge(employeeData.Age);
      } else {
        console.log("Error fetching employee data for edit");
      }
    } catch (error) {
      console.log("Error fetching employee data for edit:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestData = { Name: name, Email: email, Age: age };
      const response = await axios.put(
        `http://localhost:5000/api/employees/${employeeId}`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Employee data updated successfully");
        onEditSuccess();
        window.alert("Employee data updated successfully");
      } else {
        window.alert("Error updating employee data");
      }
    } catch (error) {
      console.log("Error updating employee data:", error);
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
            <Button type="button" mt={4} ml={4} onClick={onCancel}>
              Cancel
            </Button>
          </form>
        </Box>
      </Center>
    </>
  );
};

export default EditEmployee;
