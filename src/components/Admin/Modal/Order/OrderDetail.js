import React, { useEffect, useState } from "react";
import orderAPI from "../../../../api/orderAPI";
import { useSelector } from "react-redux";
import { Empty, Popconfirm, Spin, Table } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import productAPI from "../../../../api/productAPI";
import { IconButton } from "@mui/material";
import { DeleteFilled, LoadingOutlined } from "@ant-design/icons";
const OrderDetail = (props) => {
  const loggedInUser = useSelector((state) => state.user.current);
  const [allOrderDetail, setAllOrderDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const action = async () => {
      try {
        const getAllOrderDetail = await orderAPI.getallorderdetailbyorderid(
          {
            orderID: props.data._id,
          },
          loggedInUser.accessToken
        );
        const arr = [];
        for (let index = 0; index < getAllOrderDetail.result.length; index++) {
          const findProduct = await productAPI.findproductbyid({
            productID: getAllOrderDetail.result[index].productID,
          });
          arr.push({
            _id: getAllOrderDetail.result[index]._id,
            image: findProduct.result.image[0],
            productName: findProduct.result.productName,
            uniCost: getAllOrderDetail.result[index].uniCost,
            quantity: getAllOrderDetail.result[index].quantity,
            totalMoney: getAllOrderDetail.result[index].totalMoney,
          });
        }
        setAllOrderDetail(arr);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    action();
  }, []);
  const handleRemoveItem = async (name) => {
    try {
      setAllOrderDetail(allOrderDetail.filter((item) => item !== name));
      await orderAPI.deleteorderdetail(
        { orderDetailID: name._id },
        loggedInUser.accessToken
      );
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      title: "",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <div>
          <img width={150} src={text} alt="" />
        </div>
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Giá ban đầu",
      dataIndex: "uniCost",
      key: "uniCost",
      render: (text) => <div>₫{text}</div>,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalMoney",
      key: "totalMoney",
      render: (text) => <div>₫{text}</div>,
    },
    {
      title: "",
      key: "action",
      render: (text, rowKey) =>
        props.data.orderStatus === "pending" ? (
          <Popconfirm
            placement="topRight"
            title="Bạn có muốn xóa sản phẩm này ra khỏi đơn hàng?"
            onConfirm={() => handleRemoveItem(rowKey)}
            okText="Có"
            cancelText="Không"
          >
            <IconButton>
              <DeleteFilled style={{ fontSize: "25px", color: "#A9A9A9" }} />
            </IconButton>
          </Popconfirm>
        ) : (
          <div></div>
        ),
    },
  ];
  return (
    <div>
      <h5>Chi tiết hóa đơn</h5>
      {loading === true ? (
        <div
          style={{
            display: "flex",
            flex: 1,
            height: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spin
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 35,
                }}
                spin
              />
            }
          />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={allOrderDetail}
          locale={{
            emptyText: <Empty description={false} />,
          }}
        />
      )}
    </div>
  );
};
export default OrderDetail;
