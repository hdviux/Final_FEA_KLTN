import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "antd";
import { Button, DatePicker, Input, Table } from "antd";
import "sweetalert2/src/sweetalert2.scss";
import "../../../../Styles/Modal.scss";
import { Empty } from "antd";
import userAPI from "../../../../api/userAPI";
import commentAPI from "../../../../api/commentAPI";
import { useSelector } from "react-redux";
import moment from "moment";
import { Avatar, IconButton } from "@mui/material";
import { DeleteFilled, SyncOutlined } from "@ant-design/icons";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
const ModalCommentEvaluateProduct = (props) => {
  const { RangePicker } = DatePicker;
  const { Search } = Input;
  const loggedInUser = useSelector((state) => state.user.current);
  const [getAllComment, setGetAllComment] = useState([]);
  useEffect(() => {
    const action = async () => {
      try {
        let arr = [];
        const getAllComment = await commentAPI.getallcommentproduct({
          productID: props.dataProduct._id,
        });
        for (let index = 0; index < getAllComment.result.length; index++) {
          const getUserByID = await userAPI.finduserbyidincomment({
            userID: getAllComment.result[index].userID,
          });
          arr.push({
            key: getAllComment.result[index]._id,
            content: getAllComment.result[index].content,
            timeCreate: getAllComment.result[index].timeCreate,
            vote: getAllComment.result[index].vote.length,
            star: getAllComment.result[index].star,
            userID: getAllComment.result[index].userID,
            productID: getAllComment.result[index].productID,
            userName: getUserByID.result.userName,
            avatar: getUserByID.result.avatar,
          });
        }
        setGetAllComment(arr);
      } catch (error) {
        console.log(error);
      }
    };
    action();
  }, []);
  const onSearch = async (value) => {
    try {
      let arr = [];
      const getAllComment = await commentAPI.findcommentbyusername(
        {
          userName: value,
        },
        loggedInUser.accessToken
      );
      for (let index = 0; index < getAllComment.result.length; index++) {
        const getUserByID = await userAPI.finduserbyidincomment({
          userID: getAllComment.result[index].userID,
        });
        arr.push({
          key: getAllComment.result[index]._id,
          content: getAllComment.result[index].content,
          timeCreate: getAllComment.result[index].timeCreate,
          vote: getAllComment.result[index].vote.length,
          star: getAllComment.result[index].star,
          userID: getAllComment.result[index].userID,
          productID: getAllComment.result[index].productID,
          userName: getUserByID.result.userName,
          avatar: getUserByID.result.avatar,
        });
      }
      setGetAllComment(arr);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveItem = async (name) => {
    try {
      Swal.fire({
        title: "Bạn có muốn xóa bình luận này không?",
        icon: "warning",
        showDenyButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xóa",
        denyButtonText: `Hủy`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          setGetAllComment(getAllComment.filter((item) => item !== name));
          await commentAPI.deletecomment(
            { commentID: name.key },
            loggedInUser.accessToken
          );
          Swal.fire({
            title: "Xóa thành công!",
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      title: "",
      dataIndex: "avatar",
      key: "avatar",
      render: (text) => (
        <div>
          <Avatar
            sx={{ width: 70, height: 70, marginLeft: "40px" }}
            alt=""
            src={text}
          />
        </div>
      ),
      width: 200,
    },
    {
      title: "Tên người dùng",
      dataIndex: "userName",
      key: "userName",
    },
    { title: "Bình luận", dataIndex: "content", key: "content", width: "30%" },
    { title: "Đánh giá", dataIndex: "star", key: "star" },
    {
      title: "Thời gian tạo",
      dataIndex: "timeCreate",
      key: "timeCreate",
      render: (text) => <div> {moment(text).format("DD-MM-YYYY")}</div>,
    },
    { title: "Số lượt thích", dataIndex: "vote", key: "vote" },
    {
      title: "",
      key: "action",
      render: (rowKey) => (
        <IconButton onClick={() => handleRemoveItem(rowKey)}>
          <DeleteFilled style={{ fontSize: "25px", color: "#A9A9A9" }} />
        </IconButton>
      ),
    },
  ];
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const handleChangeDebut = (range) => {
    const valueOfInput1 = range[0].format();
    const valueOfInput2 = range[1].format();
    setStartDate(new Date(valueOfInput1));
    setEndDate(new Date(valueOfInput2));
  };
  const resetData = async () => {
    try {
      setStartDate("");
      setEndDate("");
      let arr = [];
      const getAllComment = await commentAPI.getallcommentproduct({
        productID: props.dataProduct._id,
      });
      for (let index = 0; index < getAllComment.result.length; index++) {
        const getUserByID = await userAPI.finduserbyidincomment({
          userID: getAllComment.result[index].userID,
        });
        arr.push({
          key: getAllComment.result[index]._id,
          content: getAllComment.result[index].content,
          timeCreate: getAllComment.result[index].timeCreate,
          vote: getAllComment.result[index].vote.length,
          star: getAllComment.result[index].star,
          userID: getAllComment.result[index].userID,
          productID: getAllComment.result[index].productID,
          userName: getUserByID.result.userName,
          avatar: getUserByID.result.avatar,
        });
      }
      setGetAllComment(arr);
    } catch (error) {
      console.log(error);
    }
  };
  const onSearchDate = async () => {
    if (startDate === "" || endDate === "") {
      Swal.fire({
        title: "Chưa chọn ngày!",
        icon: "warning",
        showConfirmButton: false,
        timer: 1000,
      });
    }
    const getAllComment = await commentAPI.getallcommentproduct({
      productID: props.dataProduct._id,
    });
    if (startDate !== "" || endDate !== "") {
      let arr = [];
      for (let index = 0; index < getAllComment.result.length; index++) {
        const timeSend = new Date(getAllComment.result[index].timeCreate);
        if (
          timeSend.getTime() <= endDate.getTime() &&
          timeSend.getTime() >= startDate.getTime()
        ) {
          const getUserByID = await userAPI.finduserbyidincomment({
            userID: getAllComment.result[index].userID,
          });
          arr.push({
            key: getAllComment.result[index]._id,
            content: getAllComment.result[index].content,
            timeCreate: getAllComment.result[index].timeCreate,
            vote: getAllComment.result[index].vote.length,
            star: getAllComment.result[index].star,
            userID: getAllComment.result[index].userID,
            productID: getAllComment.result[index].productID,
            userName: getUserByID.result.userName,
            avatar: getUserByID.result.avatar,
          });
        }
      }
      setGetAllComment(arr);
    }
  };
  return (
    <Modal
      {...props}
      centered
      footer={null}
      onCancel={props.onCancel}
      width={1000}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "space-between",
          padding: "25px",
        }}
      >
        <div>
          <RangePicker
            onChange={handleChangeDebut}
            placeholder={["Từ ngày", "Đến ngày"]}
            format="DD-MM-YYYY"
            size="large"
            clearIcon={<SyncOutlined onMouseDown={resetData} />}
          />
          <Button
            type="primary"
            size="large"
            style={{ marginLeft: "20px" }}
            onClick={onSearchDate}
          >
            Tìm kiếm
          </Button>
        </div>
        <Search
          placeholder="Nhập tên người dùng"
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          style={{ width: "400px" }}
          onSearch={onSearch}
        />
      </div>
      <Table
        columns={columns}
        pagination={{ pageSize: 5 }}
        dataSource={getAllComment}
        locale={{
          emptyText: <Empty description={false} />,
        }}
      />
    </Modal>
  );
};

export default ModalCommentEvaluateProduct;
