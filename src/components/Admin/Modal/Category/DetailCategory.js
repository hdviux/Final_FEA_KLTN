import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CloseButton, Modal } from "react-bootstrap";
import { Input, Table } from "antd";
import "sweetalert2/src/sweetalert2.scss";
import "../../../../Styles/Modal.scss";
import productAPI from "../../../../api/productAPI";
import { Empty, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const DetailCategory = (props) => {
  const { Search } = Input;
  const [allProduct, setAllProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const onSearch = async (value) => {
    try {
      setLoading(true);
      const getAllProduct = await productAPI.findproductbynameandcategoryid({
        productName: value,
        categoryID: props.data._id,
      });
      const arr = [];
      for (let index = 0; index < getAllProduct.result.length; index++) {
        arr.push({
          key: getAllProduct.result[index]._id,
          productName: getAllProduct.result[index].productName,
          image: getAllProduct.result[index].image[0],
          quantity: getAllProduct.result[index].quantity,
          price: getAllProduct.result[index].price,
        });
      }
      setAllProduct(arr);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const handleGetAllProduct = async () => {
      try {
        const getAllProduct = await productAPI.findproductbycategoryid({
          categoryID: props.data._id,
        });
        const arr = [];
        for (let index = 0; index < getAllProduct.result.length; index++) {
          arr.push({
            key: getAllProduct.result[index]._id,
            productName: getAllProduct.result[index].productName,
            image: getAllProduct.result[index].image[0],
            quantity: getAllProduct.result[index].quantity,
            price: getAllProduct.result[index].price,
          });
        }
        setAllProduct(arr);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    handleGetAllProduct();
  }, []);
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
      title: "Tên",
      dataIndex: "productName",
      key: "productName",
      width: "40%",
    },
    { title: "Giá tiền", dataIndex: "price", key: "price" },
    { title: "Số lượng tồn", dataIndex: "quantity", key: "quantity" },
  ];
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="my-modal"
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Danh sách sản phẩm
        </Modal.Title>
        <CloseButton style={{ marginRight: "25px" }} onClick={props.onHide} />
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
            padding: "25px",
          }}
        >
          <Search
            placeholder="Nhập tên sản phẩm"
            allowClear
            enterButton="Tìm kiếm"
            size="large"
            style={{ width: "400px" }}
            onSearch={onSearch}
          />
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
            columns={columns}
            pagination={{ pageSize: 5 }}
            dataSource={allProduct}
            locale={{
              emptyText: <Empty description={false} />,
            }}
          />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default DetailCategory;
