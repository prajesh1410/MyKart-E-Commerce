import React from "react";
import "./topbar.css";
import {
  NotificationsNone,
  Language,
  Settings,
  ExitToApp,
} from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userRedux";
import { useHistory } from "react-router-dom";

export default function Topbar() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("persist:root"); // Optional: clear persisted Redux state
    history.push("/login");
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">MyKartAdmin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="topAvatar"
          />
          <button className="logoutButton" onClick={handleLogout}>
            <ExitToApp style={{ marginRight: "5px" }} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
