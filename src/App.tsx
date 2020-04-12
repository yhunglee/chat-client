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
} from "@material-ui/core";
import { MessageHistory } from "./MessageHistory";
import MenuIcon from "@material-ui/icons/Menu";
import "typeface-roboto";
import React, {
  useEffect,
  useContext,
  useState,
  useRef,
  useCallback,
} from "react";
import { MessageType } from "./Message";

const appStyle = css({
  height: "100vh",
});

const titleStyle = css({
  color: "red ",
  backgroundColor: "brown ",
  margin: "0 30px ",
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

export const App: React.FC<{}> = ({}) => {
  // const ws = new WebSocket(URL);

  // const mhCtx = useContext(MessageHistoryContext);
  // const { setMessages } = mhCtx;
  const [messages, setMessages] = useState<MessageType[]>([]);
  const testValue = { messages, setMessages };

  const ws = useRef(new WebSocket(URL));

  const renderCount = useRef(0);

  const submitMessage = (msg: MessageType) => {
    ws.current.send(JSON.stringify(msg));

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
    setMessages([...messages, msg]);
    // }
  };

  // websocket onmessage
  useEffect(() => {
    ws.current.onmessage = (msg) => {
      const message = JSON.parse(msg.data);
      message.isMe = false;

      addMessage(message);
    };

    console.log(`hello`);
  });

  // close websocket
  useEffect(() => {
    return () => {
      ws.current.close();
    };
  }, [ws]);

  // useEffect(() => {
  //   ws.onopen = () => {
  //     // on conneting, do nothing but log it to the console
  //     console.log("connected");
  //   };

  //   ws.onmessage = (evt) => {
  //     // on receving a message, add it to the list of messages
  //     const message = JSON.parse(evt.data);

  //     // console.log(`evt.data: ${JSON.stringify(evt.data)}`);
  //     message.isMe = false;
  //     addMessage(message);
  //   };

  //   return () => {
  //     ws.onclose = () => {
  //       console.log(`disconnected`); // debug

  //       // TODO: automatically try to reconnect on connection loss
  //       ws = new WebSocket(URL);
  //     };
  //   };
  // }, []);

  return (
    <StylesProvider injectFirst>
      {/* <MessageHistoryContext.Provider value={testValue}> */}
      <div className="App" css={appStyle}>
        <AppBar position="sticky">
          {console.log(`renderCount: ${(renderCount.current += 1)}`)}
          {/* debug */}
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">聊天室</Typography>
            {/* <IconButton color="inherit" aria-label="font-large">
              <FormatSizeIcon />
            </IconButton> */}
          </Toolbar>
        </AppBar>

        <MessageHistory messages={messages} />
        <ChatInput submitFC={submitMessage} />
      </div>
      {/* </MessageHistoryContext.Provider> */}
    </StylesProvider>
  );
};
