import React, { useEffect, useState } from "react";
import LeftNav from "./LeftNav";
import TopNav from "./TopNav";
import { Empty, Input, Spin } from "antd";
import { Table, Space, Button } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import AddProduct from "../Modal/Product/AddProduct";
import { useSelector } from "react-redux";
import productAPI from "../../../api/productAPI";
import DetailProduct from "../Modal/Product/DetailProduct";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import discountAPI from "../../../api/discountAPI";
import ButtonDiscount from "../Modal/Discount/ButtonDiscount";
const TabProduct = (props) => {
  const { Search } = Input;
  const loggedInUser = useSelector((state) => state.user.current);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [selectCart, setSelectCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const onSearch = async (value) => {
    try {
      setLoading(true);
      const getAllProduct = await productAPI.findproductbyname({
        productName: value,
      });
      const arr = [];
      for (let index = 0; index < getAllProduct.result.length; index++) {
        arr.push({
          key: getAllProduct.result[index]._id,
          productName: getAllProduct.result[index].productName,
          image: getAllProduct.result[index].image[0],
          quantity: getAllProduct.result[index].quantity,
          price: getAllProduct.result[index].price,
          description: <DetailProduct data={getAllProduct.result[index]} />,
        });
      }
      setAllProduct(arr);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const action = async () => {
      try {
        const getAllProduct = await productAPI.getallproduct();
        const arr = [];
        for (let index = 0; index < getAllProduct.result.length; index++) {
          arr.push({
            key: getAllProduct.result[index]._id,
            productName: getAllProduct.result[index].productName,
            image: getAllProduct.result[index].image[0],
            quantity: getAllProduct.result[index].quantity,
            price: getAllProduct.result[index].price,
            description: <DetailProduct data={getAllProduct.result[index]} />,
          });
        }
        setAllProduct(arr);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    action();
  }, []);

  const columns = [
    Table.SELECTION_COLUMN,
    Table.EXPAND_COLUMN,
    {
      title: (
        <div>
          <Button
            type="primary"
            danger
            onClick={async () => {
              try {
                if (selectCart.length === 0) {
                  Swal.fire({
                    title: "Chưa chọn sản phẩm!",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 1000,
                  });
                }
                if (selectCart.length !== 0) {
                  for (let index = 0; index < selectCart.length; index++) {
                    await productAPI.deleteproduct(
                      { productID: selectCart[index] },
                      loggedInUser.accessToken
                    );
                  }
                  Swal.fire({
                    title: "Xóa thành công!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000,
                  });
                  setTimeout(() => {
                    window.location.reload(false);
                  }, 1300);
                }
              } catch (error) {
                console.log(error);
              }
            }}
            style={{ width: "120px", marginLeft: "10px" }}
            variant="danger"
          >
            Xóa
          </Button>
        </div>
      ),
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
    {
      title: "Khuyến mã",
      dataIndex: "discount",
      key: "discount",
      render: (text, rowKey) => <ButtonDiscount data={rowKey}/>,
    },
  ];
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectCart(selectedRowKeys);
    },
  };

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
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  setShowModalAdd(true);
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    flexDirection: "row",
                  }}
                >
                  <PlusOutlined style={{ marginBottom: 4, marginRight: 15 }} />
                  Thêm sản phẩm
                </div>
              </Button>
            </div>
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
              rowSelection={{
                ...rowSelection,
              }}
              expandable={{
                expandedRowRender: (record) => (
                  <p style={{ margin: 0 }}>{record.description}</p>
                ),
              }}
              dataSource={allProduct}
              locale={{
                emptyText: <Empty description={false} />,
              }}
            />
          )}

          <AddProduct
            show={showModalAdd}
            datauser={loggedInUser.user}
            onHide={() => {
              setShowModalAdd(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TabProduct;
