import React from "react";
import { List } from "antd";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CategoryIcon from "@mui/icons-material/Category";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import MessageIcon from "@mui/icons-material/Message";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ToysIcon from "@mui/icons-material/Toys";
import "../../../Styles/LeftNav.scss";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
const LeftNav = (props) => {
  const History = useHistory();
  const data = [
    {
      text: "Dashboard",
      icon: <LeaderboardIcon fontSize="large" />,
      pathname: "/",
    },
    {
      text: "Quản lý người dùng",
      icon: <ManageAccountsIcon fontSize="large" />,
      pathname: "/home/user",
    },
    {
      text: "Quản lý sản phẩm",
      icon: <ToysIcon fontSize="large" />,
      pathname: "/home/product",
    },
    {
      text: "Quản lý loại sản phẩm",
      icon: <CategoryIcon fontSize="large" />,
      pathname: "/home/category",
    },
    {
      text: "Quản lý thương hiệu",
      icon: <BubbleChartIcon fontSize="large" />,
      pathname: "/home/brand",
    },
    {
      text: "Quản lý hóa đơn",
      icon: <ShoppingCartIcon fontSize="large" />,
      pathname: "/home/order",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "350px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <img width={200} src={require("../../../images/TOYSKID.png")} alt="" />
      </div>
      <List
        bordered
        dataSource={data}
        style={{ height: "auto", borderRadius: "15px" }}
        renderItem={(item) => (
          <List.Item
            className="LeftNav"
            style={{
              background:
                window.location.pathname === item.pathname
                  ? "rgba(218, 218, 218, 0.5)"
                  : "",
            }}
          >
            <Link
              style={{ fontSize: "18px", color: "black" }}
              onClick={(e) => {
                e.preventDefault();
                History.push({
                  pathname: item.pathname,
                });
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                }}
              >
                <div style={{ marginRight: "25px", marginLeft: "25px" }}>
                  {item.icon}
                </div>
                {item.text}
              </div>
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
};

export default LeftNav;
