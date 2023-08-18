import Header from "../components/Header";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { chatCompletion, deleteChat, fetchChatHistory } from "../api/chat.api";
import { toast } from "react-toastify";
import TypeWriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Stack, Box, Typography, IconButton, FormControl, OutlinedInput, CircularProgress } from "@mui/material";

const messageType = {
  response: "response",
  question: "question"
};

const HomePage = () => {
  const username = localStorage.getItem("username");

  const navigate = useNavigate();
  const inputRef = useRef();
  const chatWrapperRef = useRef();

  const [onRequest, setOnRequest] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const [chatHistory, setChatHistory] = useState([]);
  const [deletedChats, setDeletedChats] = useState([]);


  useEffect(() => {
    fetchChatHistory()
      .then(data => setChatHistory(data));
  }, []);

  const handleDeleteChat = async (chatId) => {
    try {
      await deleteChat(chatId);
      setDeletedChats([...deletedChats, chatId]);
    } catch (error) {
      console.error(`Error deleting chat ${chatId}:`, error.message);
      // Handle the error, e.g., show a toast or error message
    }
  };


  const getAnswer = async () => {
    if (onRequest) return;


    setQuestion("");
    setOnRequest(true);

    const { response, err } = await chatCompletion({ question: question });

    if (response) {

      const newMessages = [...messages, {
        type: messageType.response,
        time: new Date().toLocaleString(),
        content: response.response,
        _id: response._id,
        question: question
      }];
      setMessages(newMessages);

    }

    if (err) {
      toast.error(err.message);
      setOnRequest(false);
    }
  };


  const onEnterPress = (e) => {
    if (e.keyCode === 13) getAnswer();
  };

  const onSignOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  useEffect(() => {
    setTimeout(() => {
      chatWrapperRef.current.addEventListener("DOMNodeInserted", e => {
        e.currentTarget.scroll({
          top: e.currentTarget.scrollHeight,
          behavior: "smooth"
        });
      });
    }, 200);
  }, []);

  const timestampStyles = {
    fontSize: '16px',
    color: '#AAA',
    fontweight: '400',
    fontfamily: 'Roboto',
    fontstyle: 'normal'
  };

  const outlines = {
    fontSize: '16px',
    color: '#0085FF',
    fontweight: '400',
    fontfamily: 'Roboto',
    fontstyle: 'normal'
  };

  const texts = {
    fontSize: '16px',
    color: '#222',
    fontweight: '400',
    fontfamily: 'Roboto',
    fontstyle: 'normal'
  };
  const textdelete = {
    fontSize: '16px',
    color: '#FF0000',
    fontweight: '400',
    fontfamily: 'Roboto',
    fontstyle: 'normal',
  };






  return (
    <Stack
      alignItems="center"
      justifyContent="space-between"
      sx={{ height: "100%" }}
    >

      <Header bg borderBottom>
        <Box sx={{
          width: "100%",
          height: "100%",
          position: "relative",
          paddingX: 2,
          maxWidth: "md"
        }}>
          <Typography
            variant="h6"
            fontWeight="700"
            sx={{
              color: "#FFFFFF",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              width: "100%",
            }}
          >
            Lowfound OpenAI API Chat
          </Typography>
          <IconButton
            onClick={onSignOut}
            sx={{
              position: "absolute",
              top: "50%",
              right: "16px",
              transform: "translateY(-50%)",
              color: "#FFFFFF"
            }}
          >
            <LogoutOutlinedIcon />
          </IconButton>
        </Box>
      </Header>


      <Box ref={chatWrapperRef} sx={{
        height: "100%",
        position: "fixed",
        zIndex: 1,
        maxWidth: "md",
        width: "100%",
        overflowY: "auto",
        paddingTop: "60px",
        paddingBottom: "90px",
        "&::-webkit-scrollbar": {
          width: "0px"
        }
      }}>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          maxWidth: "md",
          width: "100%"
        }}>
          <Box>
            {chatHistory.map((chat) => (
              !deletedChats.includes(chat._id) && (
                <Box key={chat._id} padding={1}>
                  <Box
                    sx={{
                      padding: 2,
                      bgcolor: "#F5F5F5",
                    }}
                  >
                    <div style={timestampStyles} className="timestamp">
                      {new Date(chat.createdAt).toLocaleString()}
                    </div>
                    <div style={outlines} className="Chatformat">
                      You asked:
                    </div>
                    <div style={texts} className="question">
                      {chat.question}
                    </div>
                    <div style={outlines} className="Chatformat">
                      GPT responded:
                    </div>
                    <div style={texts} className="response">
                      {chat.response}
                    </div>

                    <div style={textdelete} onClick={() => handleDeleteChat(chat._id)}>
                      Delete
                    </div>
                  </Box>
                </Box>
              )
            ))}
          </Box>

          {messages.map((item, index) => (
            !deletedChats.includes(item._id) && (
              <Box key={index} padding={1}>
                <Box
                  sx={{
                    padding: 2,
                    bgcolor: "#F5F5F5",
                  }}
                >
                  {item.type === messageType.response && (
                    <div>
                      <div style={timestampStyles} className="timestamp">
                        {item.time}
                      </div>
                      <div style={outlines} className="Chatformat">You asked: </div>
                      <div style={texts} className="question">{item.question}</div>
                      <div style={outlines} className="Chatformat">GPT responded: </div>
                      {index === messages.length - 1 && (
                        <TypeWriter
                          onInit={(writer) => {
                            writer.typeString(item.content)
                              .callFunction(() => {
                                document.querySelector(".Typewriter__cursor").style.display = "none";
                                setOnRequest(false);
                                setTimeout(() => {
                                  inputRef.current.focus();
                                }, 200);
                              })
                              .changeDelay(50)
                              .start();
                          }}
                        />
                      )}

                      <div style={textdelete} onClick={() => handleDeleteChat(item._id)}>
                        Delete
                      </div>

                    </div>

                  )}
                </Box>
              </Box>
            )
          ))}



        </Box>
      </Box>

      <Stack
        width="100%"
        alignItems="center"
        justifyContent="center"
        borderTop="1px solid #0085FF"
        bgcolor="#FFFFFF"
        zIndex={3}
      >
        <Box
          padding={2}
          width="100%"
          maxWidth="md"
        >
          <FormControl fullWidth variant="outlined">
            <OutlinedInput
              inputRef={inputRef}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none"
                }
              }}
              endAdornment={
                onRequest ? (
                  <CircularProgress size="1.5rem" />
                ) : (
                  <SendOutlinedIcon />
                )
              }
              autoFocus
              disabled={onRequest}
              onKeyUp={onEnterPress}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask something..."
            />
          </FormControl>
        </Box>
      </Stack>
    </Stack>
  );
};

export default HomePage;