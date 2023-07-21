import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import TableHeading from "./TableHeading";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/employees");
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      } else {
        console.log("Error fetching employee data");
      }
    } catch (error) {
      console.log("Error fetching employee data:", error);
    }
  };

  const handleEdit = async (employeeId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/employees/${employeeId}`
      );
      if (response.ok) {
        const employeeData = await response.json();
        // Handle edit action here with the employeeData
        console.log(`Edit employee with ID: ${employeeId}`, employeeData);
      } else {
        console.log("Error fetching employee data for edit");
      }
    } catch (error) {
      console.log("Error fetching employee data for edit:", error);
    }
  };

  const handleDelete = async (employeeId) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this record?"
      );
      if (!confirmed) {
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/employees/${employeeId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log(`Delete employee with ID: ${employeeId}`);
        fetchEmployees();
        window.alert("Record deleted successfully!");
      } else {
        console.log("Error deleting employee");
      }
    } catch (error) {
      console.log("Error deleting employee:", error);
    }
  };

  const handleAddRecord = () => {
    window.location.href = "/";
  };

  return (
    <>
      <TableHeading />
      <Center mt="1em" ml="25em">
        <Box w="800px" p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Age</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {employees.map((employee) => (
                <Tr key={employee._id}>
                  <Td>{employee.Id}</Td>
                  <Td>{employee.Name}</Td>
                  <Td>{employee.Email}</Td>
                  <Td>{employee.Age}</Td>
                  <Td>
                    <Button
                      colorScheme="blue"
                      size="sm"
                      onClick={() => handleEdit(employee.Id)}
                    >
                      Edit
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDelete(employee.Id)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Button mt="10" onClick={handleAddRecord}>
            {" "}
            Add Record
          </Button>
        </Box>
      </Center>
    </>
  );
};

export default EmployeeTable;
