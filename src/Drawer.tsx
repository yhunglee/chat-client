/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import CommentIcon from "@material-ui/icons/Comment";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import DynamicFeedIcon from "@material-ui/icons/DynamicFeed";
import React from "react";

export const SideDrawer: React.FC<{ isOpen: boolean; onClose: Function }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Drawer open={isOpen}>
      <List>
        <ListItem button key="0">
          <ListItemIcon>
            <AccountBoxIcon></AccountBoxIcon>
          </ListItemIcon>
          <ListItemText primary="個人資料設定" />
        </ListItem>
        <ListItem button key="1">
          <ListItemIcon>
            <ChromeReaderModeIcon></ChromeReaderModeIcon>
          </ListItemIcon>
          <ListItemText primary="聊天室公開列表" />
        </ListItem>

        <ListItem button key="2">
          <ListItemIcon>
            <DynamicFeedIcon></DynamicFeedIcon>
          </ListItemIcon>
          <ListItemText primary="新聞" />
        </ListItem>

        <ListItem button key="3">
          <ListItemIcon>
            <CommentIcon></CommentIcon>
          </ListItemIcon>
          <ListItemText primary="私訊列表" />
        </ListItem>

        <ListItem button key="4">
          <ListItemIcon>
            <FormatListNumberedIcon></FormatListNumberedIcon>
          </ListItemIcon>
          <ListItemText primary="本聊天室人員名單" />
        </ListItem>

        <ListItem button key="5">
          <ListItemIcon>
            <AccountBoxIcon></AccountBoxIcon>
          </ListItemIcon>
          <ListItemText primary="聊天室操作功能" />
        </ListItem>
      </List>
    </Drawer>
  );
};
