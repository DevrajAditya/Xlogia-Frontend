import EmployeeTable from "./components/EmployeeTable";
import Form from "./components/Form";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/employee" element={<EmployeeTable />} />
      </Routes>
    </div>
  );
}

export default App;
