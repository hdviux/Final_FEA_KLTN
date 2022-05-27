import React, { useEffect, useState } from "react";
import LeftNav from "./LeftNav";
import TopNav from "./TopNav";
import { Table, Button, Empty, Spin } from "antd";
import contactAPI from "../../../api/contactAPI";
import moment from "moment";
import ItemButtonContact from "../Modal/Contact/ItemButtonContact";
import { DatePicker } from "antd";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { async } from "@firebase/util";
import { LoadingOutlined, SyncOutlined } from "@ant-design/icons";
const TabContact = (props) => {
  const { RangePicker } = DatePicker;
  const [allContact, setAllContact] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const handleChangeDebut = (range) => {
    const valueOfInput1 = range[0].format();
    const valueOfInput2 = range[1].format();
    setStartDate(new Date(valueOfInput1));
    setEndDate(new Date(valueOfInput2));
  };
  const onSearch = async () => {
    setLoading(true);
    if (startDate === "" || endDate === "") {
      Swal.fire({
        title: "Chưa chọn ngày!",
        icon: "warning",
        showConfirmButton: false,
        timer: 1000,
      });
    }
    if (startDate !== "" || endDate !== "") {
      const arr = [];
      for (let index = 0; index < allContact.length; index++) {
        const timeSend = new Date(allContact[index].timeSend);
        if (
          timeSend.getTime() <= endDate.getTime() &&
          timeSend.getTime() >= startDate.getTime()
        ) {
          arr.push({
            key: allContact[index].key,
            name: allContact[index].name,
            email: allContact[index].email,
            content: allContact[index].content,
            timeSend: allContact[index].timeSend,
          });
        }
      }
      setAllContact(arr);
    }
    setLoading(false);
  };
  useEffect(() => {
    const action = async () => {
      try {
        const getAllContact = await contactAPI.getallcontact();
        const arr = [];
        for (let index = 0; index < getAllContact.result.length; index++) {
          arr.push({
            key: getAllContact.result[index]._id,
            name: getAllContact.result[index].name,
            email: getAllContact.result[index].email,
            content: getAllContact.result[index].content,
            timeSend: getAllContact.result[index].timeSend,
          });
        }
        setAllContact(arr);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    action();
  }, []);
  const resetData = async () => {
    try {
      setLoading(true);
      setStartDate("");
      setEndDate("");
      const getAllContact = await contactAPI.getallcontact();
      const arr = [];
      for (let index = 0; index < getAllContact.result.length; index++) {
        arr.push({
          key: getAllContact.result[index]._id,
          name: getAllContact.result[index].name,
          email: getAllContact.result[index].email,
          content: getAllContact.result[index].content,
          timeSend: getAllContact.result[index].timeSend,
        });
      }
      setAllContact(arr);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Tên người gửi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ngày gửi",
      dataIndex: "timeSend",
      key: "timeSend",
      render: (text) => <div> {moment(text).format("DD-MM-YYYY")}</div>,
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      width: "40%",
    },
    {
      title: "",
      key: "action",
      render: (rowKey) => <ItemButtonContact data={rowKey} />,
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
            <RangePicker
              onChange={handleChangeDebut}
              placeholder={["Từ ngày", "Đến ngày"]}
              format="DD-MM-YYYY"
              clearIcon={<SyncOutlined onMouseDown={resetData} />}
            />
            <Button
              type="primary"
              style={{ marginLeft: "20px" }}
              onClick={onSearch}
            >
              Tìm kiếm
            </Button>
          </div>
          {loading === true ? (
            <div
              style={{
                display: "flex",
                flex: 1,
                height: 200,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
              dataSource={allContact}
              locale={{
                emptyText: <Empty description={false} />,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TabContact;
