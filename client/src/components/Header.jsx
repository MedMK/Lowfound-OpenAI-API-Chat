import { Box } from "@mui/material";

const Header = (props) => {
  return (
    <Box sx={{
      zIndex: 2,
      width: "100%",
      height: 60,
      bgcolor: props.bg && "#0085FF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {props.children}
    </Box>
  );
};

export default Header;