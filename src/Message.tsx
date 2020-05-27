/** @jsx jsx */
import { Box, Container } from "@material-ui/core";
import { jsx, css } from "@emotion/core";
export type MessageType = {
  name: string;
  content: string;
  sentAt: string; // timestamp
  readAt: string; // timestamp. TODO: for function of isRead?
  isRead: boolean;
  isMe: boolean;
  isSendSuccess: boolean;
  uuid: string;
};

// const msgStyle = css({
//   padding: "0 10px",
//   textAlign: "left",
//   display: "flex",
//   ".msg-owner-name": {
//     borderRadius: "50%",
//     border: "1px solid #333",
//     padding: "5px"
//   }
// });

// const msgStyle = css`
//   padding: 0 10px;
//   text-align: left;
//   display: flex;
//   .msg-owner-name {
//     border-radius: 50%;
//     border: 1px solid #333;
//     padding: 5px;
//   }
// `;

// const ownerName = css({

// });

export const Message: React.FC<MessageType> = ({
  name,
  content,
  sentAt,
  readAt,
  isRead,
  isMe,
  isSendSuccess,
  uuid,
}: MessageType) => {
  const msgStyle = css({
    padding: "0 10px",
    textAlign: "left",
    display: "flex",
    flexDirection: isMe ? "row-reverse" : "row",
    overflowWrap: "anywhere",
    ".msg-owner-name": {
      display: isMe ? "none" : "",
      borderRadius: "50%",
      border: "1px solid #333",
      padding: "10px",
      width: "30px",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    ".msg-content": {
      border: "1px solid #777",
      borderRadius: "25%",
      backgroundColor: isMe ? "rgba(102,238,170,0.7)" : "rgba(255,255,255,0.6)",
      padding: "10px",
      position: "relative",
    },
    ".msg-content:before": {
      content: "''",
      left: isMe ? "auto" : "-11px",
      position: "absolute",
      borderTop: "10px solid transparent ",
      borderRight: isMe
        ? "10px solid rgba(102,238,170,0.7)"
        : "10px solid rgba(255,255,255,0.3)",
      borderBottom: "5px solid transparent",
      transform: isMe ? "rotate(180deg)" : "",
      right: isMe ? "-8%" : "auto",

      // borderLeft: isMe
      //   ? "50px solid rgba(102,238,170,0.7)"
      //   : "50px solid rgba(255,255,255,0.6)"
    },
    ".msg-read-status, .msg-sent-time": {
      padding: "3px",
    },
  });

  return (
    <Box component="div" className="msg-container" css={msgStyle}>
      <div className="msg-owner-name">{name}</div>
      <div className="msg-content">{content}</div>
      <Box flexDirection="column" flexWrap="wrap">
        <div className="msg-read-status">{isRead && isMe ? `已讀` : ``}</div>
        <div className="msg-sent-time">
          {isSendSuccess
            ? Intl.DateTimeFormat("lt-LT", {
                timeZone: "Asia/Taipei",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }).format(new Date(sentAt))
            : "x"}
        </div>
      </Box>
    </Box>
  );
};
