import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Layout,
  Typography,
  Space,
  Table,
  Button,
  Input,
  Modal,
  notification,
} from "antd";

import { list } from "../constants/parkingList";
import AddCar from "./AddCar";

const { Header, Content } = Layout;
const { Text, Title } = Typography;
const Contents = ({ parkingSlots, occupiedSlots }) => {
  const [carsList, setCarsList] = useState();
  const [showCarsList, setShowCarsList] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [totalSlots, setTotalSlots] = useState(parkingSlots);
  const [searchValue, setSearchValue] = useState("");
  const [availableSlots, setAvailableSlots] = useState(
    parkingSlots - occupiedSlots
  );
  const [collectedAmount, setCollectedAmount] = useState(0);

  React.useEffect(() => {
    let newList = list.splice(0, occupiedSlots);
    setCarsList(newList);
    setShowCarsList(newList);
  }, [occupiedSlots]);
  const onSearch = () => {
    let list = () => {
      return showCarsList.filter((o) =>
        Object.keys(o).some((k) => {
          if (typeof o[k] === "string") {
            return o[k].toLowerCase().includes(searchValue.toLowerCase());
          }
        })
      );
    };
    setCarsList(list);
  };
  const onReset = () => {
    setCarsList(showCarsList);
    setSearchValue("");
  };
  const onAddCar = (car) => {
    let list = [...showCarsList];
    list.push(car);
    setCarsList(list);
    setShowCarsList(list);
    setIsVisible(false);
    setAvailableSlots(availableSlots - 1);
  };
  const onRemove = (id, carNo) => {
    let list = [...showCarsList];
    let index = list.findIndex((item) => {
      return item.id === id;
    });
    list.splice(index, 1);
    setShowCarsList(list);
    setCarsList(list);
    setCollectedAmount(collectedAmount + 20);
    setAvailableSlots(availableSlots + 1);
    notification.info({
      message: `Car removed`,
      description: `Car ${carNo} removed from parking slot`
    })
  };
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Car No",
      dataIndex: "carNo",
      key: "carNo",
      sorter: (a, b) => a.carNo.localeCompare(b.carNo),
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      sorter: (a, b) => a.color.localeCompare(b.color),
    },
    {
      title: "Slot No",
      dataIndex: "slotNo",
      key: "carNo",
      sorter: (a, b) => a.slotNo - b.slotNo,
    },
    {
      title: "Date&Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (action, record) => (
        <Button className="btn-yellow" type="primary" onClick={() => onRemove(record.id, record.carNo)}>
          Remove
        </Button>
      ),
    },
  ];

  return (
    <Layout className="content__Layout">
      <Header>
        <Title level={3}>Automatic Parking Lot System</Title>
      </Header>
      <Content>
        <Row justify={"space-between"}>
          <Space direction={"vertical"}>
            <Row>
              <Text>Total Parking Slots - </Text>
              <Text type="danger">{totalSlots}</Text>
            </Row>
            <Row>
              <Text>Available Parking Slots - </Text>
              <Text type="danger">{availableSlots}</Text>
            </Row>
          </Space>
          <Space>
            <Button className="btn-green" type="primary" success onClick={() => setIsVisible(true)}>
              Park a Car
            </Button>
            <Button type="primary" danger onClick={() => notification.info({ message: `Collected Amount: ₹${collectedAmount}` })} >Query Data</Button>
          </Space>
        </Row>
        <Row justify={"end"}>
          <Space>
            <Input
              value={searchValue}
              onChange={(value) => setSearchValue(value.target.value)}
              placeholder={"TYPE REG NO"}
              style={{ width: "200px" }}
            />
            <Button className="btn-teal" type="primary" onClick={() => onSearch()}>
              Search
            </Button>
            <Button className="btn-grey" type="primary" onClick={() => onReset()}>
              Reset
            </Button>
          </Space>
        </Row>
        <Table className="content__top_margin" scroll={{ y: 400 }} dataSource={carsList} columns={columns} pagination={false} />
      </Content>
      <Modal
        title={'Add a Car in Parking Slot'}
        footer={false}
        className="content__add_car"
        visible={isVisible}
        onCancel={() => setIsVisible(false)}
      >
        <AddCar onAddCar={onAddCar} showCarsList={showCarsList} slotsAvailable={availableSlots} />
      </Modal>
    </Layout>
  );
};

Content.propTypes = {
  parkingSlots: PropTypes.number.isRequired,
  occupiedSlots: PropTypes.number.isRequired
};

export default Contents;
