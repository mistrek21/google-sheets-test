import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./ContactForm.css";

function ContactForm() {
  const { register, handleSubmit, watch, errors } = useForm();
  const [tableData, setTableData] = useState([]);

  // Show the data from the excell

  useEffect(() => {
    axios
      .get("https://sheet.best/api/sheets/ad418fb4-e9c4-4d9a-9a67-02ea71e31043")
      .then((res) => {
        console.log("google", res);
        setTableData(res.data);
      });
  }, []);

  // if you want to show the data after submit

  // const fetchData = () => {
  //   axios
  //     .get("https://sheet.best/api/sheets/ad418fb4-e9c4-4d9a-9a67-02ea71e31043")
  //     .then((res) => {
  //       console.log("google", res);
  //       setTableData(res.data);
  //     });
  // };

  // Submit the data to excell

  const submitFormToGoogle = (data) => {
    axios
      .post(
        "https://sheet.best/api/sheets/ad418fb4-e9c4-4d9a-9a67-02ea71e31043",
        data
      )
      .then((res) => {
        alert("Row succesfully added");
        // fetchData (if you want to show the data after submit)
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="contactForm">
      <table>
          {tableData.map(({ age, email, name, salary }) => (
            <tr>
              <td>{age}</td>
              <td>{email}</td>
              <td>{name}</td>
              <td>{salary}</td>
            </tr>
          ))}
      </table>

      <form onSubmit={handleSubmit(submitFormToGoogle)}>
        <TextField
          name="name"
          required
          {...register("name", { required: true })}
          label="Name"
        />
        <TextField
          name="age"
          required
          type="number"
          {...register("age", { min: 18, max: 99 }, { required: true })}
          label="Age"
        />
        <TextField
          name="salary"
          required
          type="number"
          {...register("salary", { required: true })}
          label="Salary"
        />
        <TextField
          name="email"
          type="email"
          required
          {...register("email", { required: true })}
          label="email"
        />
        <Button variant="outlined" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default ContactForm;
