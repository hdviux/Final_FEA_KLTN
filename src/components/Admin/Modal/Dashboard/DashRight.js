import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import orderAPI from "../../../../api/orderAPI";
import { Empty, Spin, Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const DashRight = () => {
  const [data, setData] = useState([]);
  const loggedInUser = useSelector((state) => state.user.current);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const action = async () => {
      try {
        const result = await orderAPI.getcosteachuser(loggedInUser.accessToken);
        const arr = [];
        for (let index = 0; index < result.result.length; index++) {
          arr.push({
            key: index + 1,
            name: result.result[index].name,
            cost: result.result[index].cost,
          });
        }
        
        setData(arr);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    action();
  }, []);
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Tên người dùng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Chi trả",
      dataIndex: "cost",
      key: "cost",
    },
  ];
  return (
    <div>
      <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
        <h4>Top người dùng chi trả nhiều nhất</h4>
      </div>
      {loading === true ? (
        <div
          style={{
            display: "flex",
            height:"150px",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
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
          dataSource={data}
          pagination={{ pageSize: 5 }}
          locale={{
            emptyText: <Empty description={false} />,
          }}
        />
      )}
    </div>
  );
};
export default DashRight;
