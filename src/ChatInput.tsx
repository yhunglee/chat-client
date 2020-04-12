/** @jsx jsx */
import {
  Button,
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { css, jsx } from "@emotion/core";
import {
  FormEvent,
  useState,
  ChangeEvent,
  KeyboardEventHandler,
  useRef,
} from "react";
import CheckIcon from "@material-ui/icons/Check";
import { MessageType } from "./Message";
import PropTypes from "prop-types";

const boxStyle = css({
  bottom: "0%",
  position: "fixed",
});

const formStyle = css({
  width: "100%",
  minHeight: "15%",
  display: "flex",
  justifyContent: "center",
});

const textFieldStyle = css({
  minWidth: "70%",
  margin: "0 10px 5px",
});
const submitButtonStyle = css({
  minWidth: "10%",
  lineHeight: "4.5",
  backgroundColor: "#5f887b ",
});

const actionCollectionStyle = css({
  display: "flex",
  flexDirection: "column",
});

type ChatAction = {
  submitFC: Function;
};

export const ChatInput: React.FC<ChatAction> = ({ submitFC }) => {
  const [rawMsg, setRawMsg] = useState("");
  const [enabledEnter, setEnabledEnter] = useState(false);
  const msgElementRef = useRef<HTMLInputElement>(null);

  const handleKeyEnter = (event: React.KeyboardEvent) => {
    // console.log(`event.key: ${event.key}`); // debug
    if (enabledEnter && event.key === "Enter") {
      event.preventDefault();

      // clean raw message in textfield
      setRawMsg(``);
      // console.log(`rawMsg: ${rawMsg}`); // debugs
      const composedMsg: MessageType = {
        name: "test",
        content: rawMsg,
        sentAt: new Date().toISOString(),
        readAt: "",
        isRead: false,
        isMe: true,
        isSendSuccess: false,
      };
      submitFC(composedMsg);
    }
  };

  const handleEnterChange = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(`handleEnterChange: `); // debug
    setEnabledEnter(event.target.checked);
  };

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: generate formatted msg for preparing send to websocket
    const composedMsg: MessageType = {
      name: "test",
      content: rawMsg,
      sentAt: new Date().toISOString(),
      readAt: "",
      isRead: false,
      isMe: true,
      isSendSuccess: false,
    };
    submitFC(composedMsg);

    // clean raw message in textfield
    setRawMsg("");

    // overcome strict null check of typescript
    if (msgElementRef && msgElementRef.current) {
      msgElementRef.current.focus();
    }
  };

  const handleTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRawMsg(event.currentTarget.value);
  };

  return (
    <Box display="flex" flexWrap="wrap" width="100%" css={boxStyle}>
      <form
        action="."
        noValidate
        autoComplete="off"
        css={formStyle}
        onSubmit={(e) => {
          handleOnSubmit(e);
        }}
      >
        <TextField
          label="Message"
          multiline
          rows="5"
          variant="outlined"
          css={textFieldStyle}
          value={rawMsg}
          onChange={handleTextFieldChange}
          inputProps={{
            onKeyPress: (event: React.KeyboardEvent) => {
              handleKeyEnter(event);
            },
          }}
          autoFocus={true}
          inputRef={msgElementRef}
        ></TextField>
        <div className="action-collection" css={actionCollectionStyle}>
          <Button variant="contained" css={submitButtonStyle} type="submit">
            Send
          </Button>

          <FormControlLabel
            control={
              <Checkbox
                checked={enabledEnter}
                onChange={handleEnterChange}
                name="hello"
              />
            }
            label={`Enter √`}
          />
        </div>
      </form>
    </Box>
  );
};
