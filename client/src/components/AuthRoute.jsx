import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userCheckTkn } from "../api/user.api";
import Loading from "./Loading";
import Header from "./Header";

const AuthRoute = (props) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      setIsLoading(true);

      const { response, err } = await userCheckTkn();

      if (err) {
        localStorage.removeItem("token");
        setIsLoading(false);
      }

      if (response) navigate("/");
    };

    const token = localStorage.getItem("token");

    if (token) checkToken();
    else setIsLoading(false);
  }, [navigate]);

  return (
    isLoading ? (
      <Loading />
    ) : (
      <Container
        component="main"
        maxWidth="md"
        sx={{
          height: "120vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Header bg borderBottom>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              position: "relative",
              paddingX: 2,
              maxWidth: "md",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="700"
              sx={{
                color: "#FFFFFF",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center", // Center the text on mobile
                width: "100%",      // Expand the width to 100% on mobile
              }}
            >
              Lowfound OpenAI API Chat
            </Typography>
          </Box>
        </Header>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <img
            src="https://res.cloudinary.com/dhbejijc4/image/upload/v1692291743/0923a127d775a9af9cd12cc11608bbfd_1_greyf7.png"
            style={{
              maxWidth: "100%",
              transform: "translateY(-30%)",
            }}
          />
        </Box>







        <Box width="100%">
          {props.children}
        </Box>

        <Box padding={2}>
          <Typography variant="caption" color="primary">
            Developed by Mohamed Makni
          </Typography>
        </Box>
      </Container>
    )
  );
};

export default AuthRoute;