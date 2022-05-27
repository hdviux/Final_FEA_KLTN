import React, { useEffect, useState } from "react";
import LeftNav from "./LeftNav";
import TopNav from "./TopNav";
import { Dropdown, Input, Spin } from "antd";
import { Table } from "antd";
import { LoadingOutlined, LockFilled, SettingFilled } from "@ant-design/icons";
import userAPI from "../../../api/userAPI";
import { useSelector } from "react-redux";
import ItemButtonUser from "../Modal/User/ItemButtonUser";
import { Avatar, IconButton } from "@mui/material";

const TabUser = (props) => {
  const { Search } = Input;
  const loggedInUser = useSelector((state) => state.user.current);
  const [loading, setLoading] = useState(true);
  const onSearch = async (value) => {
    try {
      setLoading(true);
      const getAllUser = await userAPI.finduserbynamechar(
        {
          userName: value,
        },
        loggedInUser.accessToken
      );
      const arr = [];
      for (let index = 0; index < getAllUser.result.length; index++) {
        arr.push({
          key: getAllUser.result[index]._id,
          fullName: getAllUser.result[index].fullName,
          userName: getAllUser.result[index].userName,
          role: getAllUser.result[index].role,
          email: getAllUser.result[index].email
            ? getAllUser.result[index].email
            : "Chưa cập nhật",
          phone: getAllUser.result[index].phone
            ? getAllUser.result[index].phone
            : "Chưa cập nhật",
          address: getAllUser.result[index].address
            ? getAllUser.result[index].address
            : "Chưa cập nhật",
          birthday: getAllUser.result[index].birthday
            ? getAllUser.result[index].birthday
            : "Chưa cập nhật",
          gender: getAllUser.result[index].gender
            ? getAllUser.result[index].gender
            : "Chưa cập nhật",
          avatar: getAllUser.result[index].avatar
            ? getAllUser.result[index].avatar
            : "https://firebasestorage.googleapis.com/v0/b/toyskid-653c4.appspot.com/o/user%2F49741781_p0.png?alt=media&token=9f91f371-1225-40e2-976b-7b10c1e66c40",
        });
      }
      setAllUser(arr);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const [allUser, setAllUser] = useState([]);
  useEffect(() => {
    const action = async () => {
      try {
        const getAllUser = await userAPI.getalluser();
        const arr = [];
        for (let index = 0; index < getAllUser.result.length; index++) {
          arr.push({
            key: getAllUser.result[index]._id,
            fullName: getAllUser.result[index].fullName,
            userName: getAllUser.result[index].userName,
            role: getAllUser.result[index].role,
            email: getAllUser.result[index].email
              ? getAllUser.result[index].email
              : "Chưa cập nhật",
            phone: getAllUser.result[index].phone
              ? getAllUser.result[index].phone
              : "Chưa cập nhật",
            address: getAllUser.result[index].address
              ? getAllUser.result[index].address
              : "Chưa cập nhật",
            birthday: getAllUser.result[index].birthday
              ? getAllUser.result[index].birthday
              : "Chưa cập nhật",
            gender: getAllUser.result[index].gender
              ? getAllUser.result[index].gender
              : "Chưa cập nhật",
            avatar: getAllUser.result[index].avatar
              ? getAllUser.result[index].avatar
              : "https://firebasestorage.googleapis.com/v0/b/toyskid-653c4.appspot.com/o/user%2F49741781_p0.png?alt=media&token=9f91f371-1225-40e2-976b-7b10c1e66c40",
          });
        }
        setAllUser(arr);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    action();
  }, []);
  const columns = [
    {
      title: "",
      dataIndex: "avatar",
      key: "avatar",
      render: (text) => (
        <div>
          <Avatar sx={{ width: 70, height: 70 }} alt="Remy Sharp" src={text} />
        </div>
      ),
    },
    {
      title: "Tên người dùng",
      dataIndex: "userName",
      key: "userName",
      sorter: (a, b) => a.userName.length - b.userName.length,
      render: (text, rowKey) => (
        <div
          style={{
            color: rowKey.role === 3 ? "#FFD700" : "",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <strong>{text}</strong>
          {rowKey.role === 1 ? (
            <strong>&nbsp;&nbsp;(Quản trị viên)</strong>
          ) : null}
          {rowKey.role === 3 ? (
            <LockFilled
              style={{
                fontSize: "25px",
                marginLeft: "25px",
                marginBottom: "5px",
              }}
            />
          ) : null}
        </div>
      ),
    },
    {
      title: "Địa chỉ email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "",
      key: "action",
      render: (text, rowKey) =>
        rowKey.role === 1 ? null : (
          <Dropdown overlay={<ItemButtonUser data={rowKey} arrow />}>
            <IconButton>
              <SettingFilled style={{ fontSize: "25px", color: "#A9A9A9" }} />
            </IconButton>
          </Dropdown>
        ),
    },
  ];
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "row",
        padding: "20px",
        height: "720px",
      }}
    >
      <LeftNav />
      <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
        <TopNav />
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            paddingLeft: "50px",
            paddingTop: "50px",
            paddingRight: "50px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              height: "150px",
              alignItems: "center",
            }}
          >
            <Search
              placeholder="Nhập tên người dùng"
              allowClear
              enterButton="TÌm kiếm"
              size="large"
              style={{ width: "400px" }}
              onSearch={onSearch}
            />
          </div>
          {loading === true ? (
            <div style={{display:"flex",flex:1,height:200,alignItems:"center",justifyContent:"center"}}>
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 55,
                    }}
                    spin
                  />
                }
              />
            </div>
          ) : (
            <Table
              pagination={{ pageSize: 5 }}
              columns={columns}
              dataSource={allUser}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default TabUser;
