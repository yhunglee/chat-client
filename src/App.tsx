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
import { v4 as uuidv4 } from "uuid";

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
