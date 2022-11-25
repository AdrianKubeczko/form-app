import { Dispatch, SetStateAction } from "react";
import "../styles/common.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import logOuthandler from "../handlers/logOuthandler";

const Navigation = ({
  setLoggedInAs,
}: {
  setLoggedInAs: Dispatch<SetStateAction<string | null | undefined>>;
}) => {
  const navigate = useNavigate();
  const links = [
    {
      route: "/form",
      label: "FORM",
    },
    {
      route: "/display",
      label: "TABLE",
    },
  ];

  return (
    <div className="navContainer">
      {links.map(({ route, label }) => (
        <Link key={route} style={{ textDecoration: "none" }} to={route}>
          <div className="linkContainer">{label}</div>
        </Link>
      ))}
      <Button
        sx={{ position: "absolute", right: 20 }}
        color="warning"
        variant="outlined"
        onClick={async () => {
          const response = await logOuthandler();
          if (response) {
            setLoggedInAs("");
            navigate("/");
          }
        }}
      >
        Log Out
      </Button>
    </div>
  );
};

export default Navigation;
