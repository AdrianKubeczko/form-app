import "../styles/common.css";
import { PersonalData } from "../types";

import { useEffect, useState } from "react";
const PersonalDataDisplay = ({
  loggedInAs,
}: {
  loggedInAs: string | null | undefined;
}) => {
  const [firstname, setFirstname] = useState<string | undefined>("---");
  const [lastName, setLastName] = useState<string | undefined>("---");
  const [country, setCountry] = useState<string | undefined>("---");
  const [gender, setGender] = useState<string | undefined>("---");
  const [date, setDate] = useState<string | undefined>("---");
  const [address, setAddress] = useState<string | undefined>("---");

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
      setDate(date);
    };
    setFormData();
  }, [loggedInAs]);
  const dataToDisplay = [
    {
      label: "First Name",
      value: firstname,
    },
    {
      label: "Last Name",
      value: lastName,
    },
    {
      label: "Country of Birth",
      value: country,
    },
    {
      label: "Gender",
      value: gender,
    },
    {
      label: "Date of Birth",
      value: date,
    },
    {
      label: "Address",
      value: address,
    },
  ];

  return (
    <div className="contentWrapper">
      <div className="tableContainer">
        {dataToDisplay.map(({ label, value }) => (
          <div key={label}>
            <div className="tableHeader tableCell">{label}</div>
            <div className="tableCell">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalDataDisplay;
