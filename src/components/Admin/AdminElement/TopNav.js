import React from "react";
import { Menu, Dropdown, Button } from "antd";
import Avatar from "@mui/material/Avatar";
import {
  LogoutOutlined,
  UserOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { deepPurple } from "@mui/material/colors";
import authAPI from "../../../api/authAPI";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const TopNav = (props) => {
  const History = useHistory();
  const loggedInUser = useSelector((state) => state.user.current);
  const inpath = window.location.pathname.split("/")[1];
  const menu = (
    <Menu
      items={[
        {
          label:
            inpath !== "account" ? null : (
              <div
                style={{ display: "flex", alignItems: "center" }}
                onClick={(e) => {
                  e.preventDefault();
                  History.push({
                    pathname: "/",
                  });
                }}
              >
                <RollbackOutlined style={{ fontSize: 20, marginRight: 15 }} />
                <h6 className="mt-2">Trở về trang chính</h6>
              </div>
            ),
        },
        {
          label: (
            <div
              style={{ display: "flex", alignItems: "center" }}
              onClick={(e) => {
                e.preventDefault();
                History.push({
                  pathname: "/account/" + loggedInUser.user._id,
                  data: loggedInUser.user._id,
                });
              }}
            >
              <UserOutlined style={{ fontSize: 20, marginRight: 15 }} />
              <h6 className="mt-2">Quản lý tài khoản</h6>
            </div>
          ),
        },
        {
          type: "divider",
        },
        {
          label: (
            <div
              style={{ display: "flex", alignItems: "center" }}
              onClick={(e) => {
                handleLogOut(e);
              }}
            >
              <LogoutOutlined style={{ fontSize: 20, marginRight: 15 }} />
              <h6 className="mt-1">Đăng xuất</h6>
            </div>
          ),
        },
      ]}
    />
  );
  const handleLogOut = async (e) => {
    try {
      await authAPI.logout({
        refreshToken: JSON.parse(localStorage.getItem("user")),
      });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      History.push({ pathname: "/" });
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Dropdown overlay={menu} placement="bottomLeft" arrow>
        {!loggedInUser.user.avatar ? (
          <Avatar
            sx={{
              bgcolor: deepPurple[500],
              width: 60,
              height: 60,
              marginRight: "150px",
            }}
          >
            OP
          </Avatar>
        ) : (
          <Avatar
            alt="Avatar"
            src={loggedInUser.user.avatar}
            sx={{
              width: 60,
              height: 60,
              marginRight: "150px",
              border: "1px solid rgba(165, 165, 165, 0.5)",
            }}
          />
        )}
      </Dropdown>
    </div>
  );
};

export default TopNav;
