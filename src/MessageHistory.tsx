/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Box } from "@material-ui/core";
import { MessageType, Message } from "./Message";
// import Message from "./Message";

const boxStyle = css({
  // top: "0",
  position: "fixed",
  height: "calc(100vh - 70px - 137px)",
  backgroundColor: "#8b9",
  overflowY: "scroll",
  overflowH: "hidden",
  // overflow: "auto",
  display: "flex",
  flexDirection: "column",
});

const messageStyle = (messageType: MessageType) => css({});

type MsgList = {
  messages: MessageType[];
};

export const MessageHistory: React.FC<MsgList> = ({ messages }) => {
  // const { messages } = useContext(MessageHistoryContext);
  // const mhCtx = useContext(MessageHistoryContext);
  // const messages = mhCtx.messages || [];
  return (
    <Box width="100%" css={boxStyle}>
      {messages.map((msg: MessageType, index) => {
        return (
          <Message
            key={index}
            name={msg.name}
            content={msg.content}
            sentAt={msg.sentAt}
            readAt={msg.readAt}
            isRead={msg.isRead}
            isMe={msg.isMe}
            isSendSuccess={msg.isSendSuccess}
            uuid={msg.uuid}
            css={messageStyle}
          />
        );
      })}
      {/* <Message
        name={exampleMsg.name}
        content={exampleMsg.content}
        sentAt={exampleMsg.sentAt}
        readAt={exampleMsg.readAt}
        isRead={exampleMsg.isRead}
        isMe={exampleMsg.isMe}
        isSendSuccess={exampleMsg.isSendSuccess}
        css={messageStyle}
      />
      <Message
        name={exampleMsg1.name}
        content={exampleMsg1.content}
        sentAt={exampleMsg1.sentAt}
        readAt={exampleMsg1.readAt}
        isRead={exampleMsg1.isRead}
        isMe={exampleMsg1.isMe}
        isSendSuccess={exampleMsg1.isSendSuccess}
        css={messageStyle}
      />
      <Message
        name={exampleMsg2.name}
        content={exampleMsg2.content}
        sentAt={exampleMsg2.sentAt}
        readAt={exampleMsg2.readAt}
        isRead={exampleMsg2.isRead}
        isMe={exampleMsg2.isMe}
        isSendSuccess={exampleMsg2.isSendSuccess}
        css={messageStyle}
      /> */}
    </Box>
  );
};
