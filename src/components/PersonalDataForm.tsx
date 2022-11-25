import { useEffect, useState } from "react";
import "../styles/common.css";
import {
  Button,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import submitFormHandler from "../handlers/submitFormHandler";
import removeNilFields from "../utils/removeNilFields";
import { PersonalData } from "../types";

const inputStype = {
  marginBottom: "10px",
  minHeight: "60px",
};

const PersonalDataForm = ({
  loggedInAs,
}: {
  loggedInAs: string | null | undefined;
}) => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState<string | undefined>("");
  const [lastName, setLastName] = useState<string | undefined>("");
  const [country, setCountry] = useState<string | undefined>("");
  const [gender, setGender] = useState<string | undefined>("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [address, setAddress] = useState<string | undefined>("");

  useEffect(() => {
    if (!loggedInAs) return;
    const setFormData = async () => {
      const formDataRaw = await localStorage.getItem(loggedInAs);
      if (!formDataRaw) return;
      const {
        firstname,
        lastName,
        country,
        gender,
        date,
        address,
      }: PersonalData = JSON.parse(formDataRaw);

      setFirstname(firstname);
      setLastName(lastName);
      setCountry(country);
      setGender(gender);
      setAddress(address);
      setDate(date ? dayjs(date) : null);
    };
    setFormData();
  }, [loggedInAs]);

  return (
    <div className="contentWrapper">
      <div className="formColumnsContainer">
        <div className="formColumn">
          <TextField
            autoComplete="off"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            sx={inputStype}
            label="First Name"
          />
          <TextField
            autoComplete="off"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            sx={inputStype}
            label="Country of birth"
          />
          <RadioGroup
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            row
            sx={{ ...inputStype, justifyContent: "center" }}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </div>
        <div className="formColumn">
          <TextField
            autoComplete="off"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            sx={inputStype}
            label="Last Name"
          />
          <div style={inputStype}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Date of birth"
                inputFormat="DD/MM/YYYY"
                value={date}
                onChange={(e: Dayjs | null) => {
                  setDate(e);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <TextField
            autoComplete="off"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            sx={inputStype}
            label="Address"
          />
        </div>
      </div>
      <Button
        sx={{ width: "50%" }}
        onClick={async () => {
          const formData = {
            firstname,
            lastName,
            country,
            date: date?.format("DD.MM.YYYY"),
            gender,
            address,
          };
          const response = await submitFormHandler(
            removeNilFields(formData),
            loggedInAs
          );
          if (response) {
            navigate("/display");
          }
        }}
        variant="contained"
      >
        Submit Data
      </Button>
    </div>
  );
};

export default PersonalDataForm;
