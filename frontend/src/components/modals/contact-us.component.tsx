import React from "react";
import {BugOutlined, MessageOutlined} from '@ant-design/icons';
import {Modal, Tabs} from "antd";

const {TabPane} = Tabs;

type ContactUsProps = {
    visible: boolean;
    onCancel: () => void;
};

const ContactUs: React.FC<ContactUsProps> = (
    {
        visible,
        onCancel
    }) => {

    return <Modal
        title='Contact Support'
        visible={visible}
        onCancel={onCancel}
        footer={false}
    >
        <Tabs type="card">
            <TabPane tab={
                <span>
          <MessageOutlined/>
          Feedback
        </span>
            } key="Feedback">
            </TabPane>
            <TabPane tab={
                <span>
          <BugOutlined/>
          Issue
        </span>
            } key="Issue">
            </TabPane>
        </Tabs>
    </Modal>
};

export default ContactUs;