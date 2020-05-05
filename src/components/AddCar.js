import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Typography } from "antd";
import moment from "moment";
import PropTypes from "prop-types";

const { Option } = Select;
const { Text } = Typography
const slotOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};
const buttonItemLayout = {
  wrapperCol: {
    span: 24,
    offset: 18,
  },
};

const AddCar = ({ showCarsList, onAddCar, slotsAvailable }) => {
  const [form] = Form.useForm();
  const [availableSlots, setAvailableSlots] = useState();
  useEffect(() => {
    let occupiedSlots = [];
    showCarsList.forEach((item) => {
      occupiedSlots.push(item.slotNo);
    });
    const availableSlots = slotOptions.filter((item) => {
      return occupiedSlots.indexOf(item) === -1;
    });
    setAvailableSlots(availableSlots);
  }, [showCarsList]);
  const onFinish = (values) => {
    values.id = showCarsList.length + 1;
    values.slotNo = parseInt(values.slotNo);
    values.time = moment().format("DD MMM YYYY, h:mm A");
    onAddCar(values);
    form.resetFields();
  };
  return (
    <>
      {slotsAvailable > 0 ? <Form form={form} {...formItemLayout} onFinish={onFinish}>
        <Form.Item
          label="Car No"
          name="carNo"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input style={{ width: '86%' }} placeholder="TYPE REG No" />
        </Form.Item>
        <Form.Item
          label="Car Color"
          name="color"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input style={{ width: '86%' }} placeholder="input placeholder" />
        </Form.Item>
        <Form.Item
          label="slot"
          name="slotNo"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select style={{ width: '86%' }} placeholder="Select a Slot">
            {availableSlots &&
              availableSlots.map((item) => {
                return <Option key={item}>{item}</Option>;
              })}
          </Select>
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
        </Button>
        </Form.Item>
      </Form> : <Text>All Slots are Occupied </Text>}
    </>
  );
};

AddCar.propTypes = {
  showCarsList: PropTypes.array.isRequired,
  slotsAvailable: PropTypes.number.isRequired,
  onAddCar: PropTypes.func.isRequired
};

export default AddCar;
