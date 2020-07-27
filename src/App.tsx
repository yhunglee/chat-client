/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import "./App.css";
import { ChatInput } from "./ChatInput";
import {
  StylesProvider,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Dialog,
  DialogActions,
  Button,
  TextField,
  DialogContent,
  DialogTitle,
  MenuItem,
} from "@material-ui/core";
import { MessageHistory } from "./MessageHistory";
import MenuIcon from "@material-ui/icons/Menu";
import "typeface-roboto";
import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import { MessageType } from "./Message";
import { v4 as uuidv4 } from "uuid";
import { SideDrawer } from "./Drawer";

const appStyle = css({
  height: "100vh",
});

const URL = "ws://localhost:3030";

type MessagesProps = {
  messages: MessageType[];
  setMessages: Function;
};

export const MessageHistoryContext = React.createContext<MessagesProps>({
  messages: [],
  setMessages: () => {},
});

export const App: React.FC<{}> = () => {
  // const ws = new WebSocket(URL);

  // const mhCtx = useContext(MessageHistoryContext);
  // const { setMessages } = mhCtx;
  const [messages, setMessages] = useState<MessageType[]>([]);
  // const testValue = { messages, setMessages };

  const ws = useRef<WebSocket | null>(null);

  const renderCount = useRef(0);

  const submitMessage = (msg: MessageType) => {
    if (ws.current) {
      msg.uuid = uuidv4(); // 設定訊息的唯一識別碼
      ws.current.send(JSON.stringify(msg));
    }

    addMessage(msg);
  };

  const addMessage = (msg: MessageType) => {
    // TODO: to update messageContext
    // console.log(`msg: ${JSON.stringify(msg)}, mhCtx: ${JSON.stringify(mhCtx)}`); // debug
    // if (mhCtx !== undefined) {
    // mhCtx.messages.push(msg);
    // mhCtx.messages = [...mhCtx.messages, msg];
    // MessageHistoryContext.Provider([..mhCtx.messages, msg]);
    // setMessages([...mhCtx.messages, msg]);
    // setMessages([...messages, msg]);

    // }
    setMessages((prev) => {
      return [...prev, msg];
    });
  };

  const updateMessage = (msg: MessageType) => {
    setMessages((prev) => {
      const matchedMsg = prev.find((element) => {
        return element.uuid === msg.uuid;
      });
      const matchedIndex = prev.findIndex(
        (element) => element.uuid === msg.uuid
      );
      if (matchedMsg && matchedIndex > -1) {
        prev.splice(matchedIndex, 1, {
          ...matchedMsg,
          isSendSuccess: msg.isSendSuccess,
        }); // 標記本機端傳送的訊息已經是成功傳送
        return [...prev];
      } else {
        return [...prev];
      }
    });
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen((prevState) => !prevState);

  const [modalIsOpen, setModalOpen] = useState(false);
  const toggleDialog = () =>
    setModalOpen((prevState) => {
      return !prevState;
    });

  const colorOptions = [
    {
      value: "#f44336",
      label: "red",
    },
    {
      value: "#e91e63",
      label: "pink",
    },
    {
      value: "#9c2730",
      label: "purple",
    },
    {
      value: "#673ab7",
      label: "deepPurple",
    },
    {
      value: "#3f51b5",
      label: "indigo",
    },
    {
      value: "#2196f3",
      label: "blue",
    },
    {
      value: "#03a9f4",
      label: "lightBlue",
    },
    {
      value: "#00bcd4",
      label: "cyan",
    },
    {
      value: "#009688",
      label: "teal",
    },
    {
      value: "#4caf50",
      label: "green",
    },
    {
      value: "#8bc34a",
      label: "lightGreen",
    },
    {
      value: "#cddc39",
      label: "lime",
    },
    {
      value: "#ffeb3b",
      label: "yellow",
    },
    {
      value: "#ffc107",
      label: "amber",
    },
    {
      value: "#ff9800",
      label: "orange",
    },
    {
      value: "#ff5722",
      label: "deepOrange",
    },
  ];
  const [selectedColor, setColor] = useState("#ff5722");
  const handleChangeColor = (event: ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  // websocket onmessage
  useEffect(() => {
    ws.current = new WebSocket(URL);
    ws.current.onmessage = (msg: MessageEvent) => {
      const message = JSON.parse(msg.data);

      if (message.isSendSuccess === false) {
        message.isMe = false;
        message.isSendSuccess = true; // 已成功收到遠端傳來的訊息, 修改本機端的遠端訊息樣式

        addMessage(message);
      } else {
        updateMessage(message);
      }
    };
  }, []);

  // close websocket
  useEffect(() => {
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [ws]);

  return (
    <StylesProvider injectFirst>
      {/* <MessageHistoryContext.Provider value={testValue}> */}
      <div className="App" css={appStyle}>
        <AppBar position="sticky">
          {console.log(`renderCount: ${(renderCount.current += 1)}`)}
          {/* debug */}
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <MenuIcon />
              <SideDrawer isOpen={isOpen} onClick={toggleDialog} />
            </IconButton>
            <Typography variant="h6">聊天室</Typography>
            {/* <IconButton color="inherit" aria-label="font-large">
              <FormatSizeIcon />
            </IconButton> */}
          </Toolbar>
        </AppBar>

        <MessageHistory messages={messages} />
        <ChatInput submitFC={submitMessage} />
        <Dialog
          open={modalIsOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">個人資料設定</DialogTitle>
          <DialogContent>
            <form className="profile">
              <TextField label="暱稱" variant="outlined" required />
              {/* TODO: need to add error and helperText to nickname field */}

              {/*  color picker */}

              <TextField
                select
                variant="outlined"
                onChange={handleChangeColor}
                value={selectedColor}
                css={{ backgroundColor: selectedColor }}
              >
                {colorOptions.map((color) => (
                  <MenuItem
                    value={color.value}
                    key={color.value}
                    css={{ backgroundColor: color.value }}
                  >
                    {color.label}
                  </MenuItem>
                ))}
              </TextField>

              <DialogActions>
                <Button onClick={() => setModalOpen(false)}>儲存</Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {/* </MessageHistoryContext.Provider> */}
    </StylesProvider>
  );
};
