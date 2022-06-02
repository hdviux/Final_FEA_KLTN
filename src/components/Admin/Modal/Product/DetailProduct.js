import React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useEffect } from "react";
import { async } from "@firebase/util";
import categoryAPI from "../../../../api/categoryAPI";
import brandAPI from "../../../../api/brandAPI";
import { useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import UpdateProduct from "./UpdateProduct";
import { CommentOutlined, LoadingOutlined } from "@ant-design/icons";
import ModalCommentEvaluateProduct from "./ModalCommentEvaluateProduct";
import { Image, Spin } from "antd";
const DetailProduct = (props) => {
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalCommentEvaluateProduct, setModalCommentEvaluateProduct] =
    useState(false);
  const steps = props.data.image;
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState([]);
  const [loading, setLoading] = useState(true);
  const maxSteps = steps.length;
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  useEffect(() => {
    const action = async () => {
      try {
        const findCategory = await categoryAPI.findcategorybyid({
          categoryID: props.data.categoryID,
        });
        setCategory(findCategory.result);
        const findBrand = await brandAPI.findbrandbyidproduct({
          brandID: props.data.brandID,
        });
        setBrand(findBrand.result);
        const arr = [];
        const arrDes = props.data.description.split("-");
        for (let index = 0; index < arrDes.length; index++) {
          if (index > 0) {
            arr.push(arrDes[index]);
          }
        }
        setDescription(arr);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    action();
  }, []);

  return (
    <div>
      <UpdateProduct
        show={showModalUpdate}
        dataProduct={props.data}
        dataCategory={category}
        dataBrand={brand}
        onHide={() => {
          setShowModalUpdate(false);
        }}
      />
      <ModalCommentEvaluateProduct
        visible={showModalCommentEvaluateProduct}
        dataProduct={props.data}
        dataCategory={category}
        dataBrand={brand}
        onCancel={() => {
          setModalCommentEvaluateProduct(false);
        }}
      />
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
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
            <Box
              sx={{
                maxWidth: 400,
                width: "100%",
                p: 2,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                maxHeight: "auto",
              }}
            >
              <Image height={380} src={steps[activeStep]} alt="" />
            </Box>
            <MobileStepper
              variant="text"
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Sau
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Trước
                </Button>
              }
            />
          </Box>

          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              paddingLeft: "25px",
              paddingBottom: "25px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                paddingRight: "30px",
                justifyContent: "flex-end",
                marginBottom: "50px",
              }}
            >
              <Button
                style={{ width: "50%" }}
                startIcon={<BorderColorIcon />}
                color="error"
                onClick={() => {
                  setShowModalUpdate(true);
                }}
              >
                Chỉnh sửa
              </Button>
              <Button
                style={{ width: "50%" }}
                startIcon={<CommentOutlined />}
                type="primary"
                onClick={() => {
                  setModalCommentEvaluateProduct(true);
                }}
              >
                Bình luận
              </Button>
            </div>
            <div
              style={{ display: "flex", width: "100%", flexDirection: "row" }}
            >
              <div
                style={{
                  display: "flex",
                  width: "50%",
                  flexDirection: "column",
                  paddingLeft: "8%",
                }}
              >
                <h4>Chi tiết sản phẩm</h4>
              </div>
            </div>
            <div
              style={{ display: "flex", width: "100%", flexDirection: "row" }}
            >
              <div
                style={{
                  display: "flex",
                  width: "50%",
                  flexDirection: "column",
                  paddingLeft: "8%",
                }}
              >
                <h6>Tên sản phẩm:</h6>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "50%",
                  flexDirection: "column",
                  paddingRight: "30px",
                }}
              >
                <h6>{props.data.productName}</h6>
              </div>
            </div>

            <div
              style={{ display: "flex", width: "100%", flexDirection: "row" }}
            >
              <div
                style={{
                  display: "flex",
                  width: "50%",
                  flexDirection: "column",
                  paddingLeft: "8%",
                }}
              >
                <h6>Độ tuổi:</h6>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "50%",
                  flexDirection: "column",
                  paddingRight: "30px",
                }}
              >
                <h6>{props.data.age}</h6>
              </div>
            </div>

            <div
              style={{ display: "flex", width: "100%", flexDirection: "row" }}
            >
              <div
                style={{
                  display: "flex",
                  width: "50%",
                  flexDirection: "column",
                  paddingLeft: "8%",
                }}
              >
                <h6>Loại sản phẩm:</h6>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "50%",
                  flexDirection: "column",
                  paddingRight: "30px",
                }}
              >
                <h6>{category.categoryName}</h6>
              </div>
            </div>
            <div
              style={{ display: "flex", width: "100%", flexDirection: "row" }}
            >
              <div
                style={{
                  display: "flex",
                  width: "50%",
                  flexDirection: "column",
                  paddingLeft: "8%",
                }}
              >
                <h6>Thương hiệu:</h6>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "50%",
                  flexDirection: "column",
                  paddingRight: "30px",
                }}
              >
                <h6>{brand.brandName}</h6>
              </div>
            </div>
            <div
              style={{ display: "flex", width: "100%", flexDirection: "row" }}
            >
              <div
                style={{
                  display: "flex",
                  width: "50%",
                  flexDirection: "column",
                  paddingLeft: "8%",
                }}
              >
                <h6>Giá:</h6>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "50%",
                  flexDirection: "column",
                  paddingRight: "30px",
                }}
              >
                <h6>{props.data.price}</h6>
              </div>
            </div>
            <div
              style={{ display: "flex", width: "100%", flexDirection: "row" }}
            >
              <div
                style={{
                  display: "flex",
                  width: "50%",
                  flexDirection: "column",
                  paddingLeft: "8%",
                }}
              >
                <h6>Số lượng:</h6>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "50%",
                  flexDirection: "column",
                  paddingRight: "30px",
                }}
              >
                <h6>{props.data.quantity}</h6>
              </div>
            </div>
            <div
              style={{ display: "flex", width: "100%", flexDirection: "row" }}
            >
              <div
                style={{
                  display: "flex",
                  width: "50%",
                  flexDirection: "column",
                  paddingLeft: "8%",
                }}
              >
                <h6>Mô tả:</h6>
              </div>
            </div>
            {description.map((data, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "row",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      flexDirection: "column",
                      paddingLeft: "8%",
                      paddingRight: "8%",
                    }}
                  >
                    <h6>- {data}</h6>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailProduct;
