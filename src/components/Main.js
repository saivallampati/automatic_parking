import React, { useState } from "react";
import { InputNumber, Button, Modal, notification, Form } from "antd";
import Contents from "./Content";
const Main = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(true);
  const [parkingSlots, setParkingSlots] = useState();
  const [occupiedSlots, setOccupiedSlots] = useState();
  const onsubmit = (values) => {
    if (values.occupiedSlots > values.parkingSlots) {
      notification.warning({
        message: 'Please check the fields',
        description: 'Occupied slots should be less than or equals to total parking slots'
      })
    } else {
      setParkingSlots(values.parkingSlots);
      setOccupiedSlots(values.occupiedSlots);
      setVisible(false);
    }
  };
  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const buttonItemLayout = {
    wrapperCol: {
      span: 24,
      offset: 18,
    },
  };
  return (
    <div className="main__layout" >
      <Modal
        className="close__none"
        title={"Fill the details"}
        visible={visible}
        footer={false}
        onCancel={false}
      >
        <Form form={form} {...formItemLayout} onFinish={onsubmit}>
          <Form.Item
            label="No.of.Parking Slots"
            name="parkingSlots"
            rules={[
              {
                type: "number",
                min: 1,
                max: 10,
                required: true,
              },
            ]}
          >
            <InputNumber
              style={{ width: "87%" }}
              placeholder="Total Parking slots"
            />
          </Form.Item>
          <Form.Item
            label="No.of.Occupied Slots"
            name="occupiedSlots"
            rules={[
              {
                type: "number",
                min: 1,
                max: 5,
                required: true,
              },
            ]}
          >
            <InputNumber
              max={5}
              min={1}
              style={{ width: "87%" }}
              placeholder="Occupied Slots"
            />
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {!visible && (
        <Contents parkingSlots={parkingSlots} occupiedSlots={occupiedSlots} />
      )}
    </div>
  );
};

export default Main;
