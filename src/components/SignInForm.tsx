import { useState, Dispatch, SetStateAction } from "react";
import "../styles/common.css";
import { Button, TextField } from "@mui/material";
import signInHandler from "../handlers/signInHandler";
import { useNavigate } from "react-router-dom";

const inputStype = {
  marginBottom: "10px",
};

const SignInForm = ({
  setLoggedInAs,
}: {
  setLoggedInAs: Dispatch<SetStateAction<string | null | undefined>>;
}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  return (
    <div className="contentWrapper">
      <TextField
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={inputStype}
        label="Username"
      />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={inputStype}
        type="password"
        label="Password"
      />
      <Button
        onClick={async () => {
          const response = await signInHandler({ username, password });
          if (response) {
            setLoggedInAs(username);
            navigate("/form");
          }
        }}
        variant="contained"
      >
        Sign In
      </Button>
    </div>
  );
};

export default SignInForm;
