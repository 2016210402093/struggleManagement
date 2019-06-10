import React from 'react';
import './edit-message.css'
import { Upload, Drawer, Form, Button, Col, Row, Input, Icon,message,Modal } from 'antd'
import {url} from "../config";
import axios from 'axios'


class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }


    handleSubmit=(e)=>{
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);

                axios.post(url + 'info/addInfo', {
                    infoContent: values.infoContent,
                    infoTitle: values.infoTitle,
                    infoSubTitle: values.infoTitle,
                    userId: localStorage.getItem("userId")
                }).then((r) => {
                    console.log(r);
                    values.infoContent = "";
                    values.infoTitle = "";
                    values.infoTitle = "";
                    this.props.changeUserPagePerNum(5,""); //刷新
                    this.onClose();
                });
            }
        })
    };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return (
            <div>
                <Button type="" icon="form" onClick={this.showDrawer}>群发消息</Button>
                <Drawer
                    title="推送消息编辑"
                    width={900}
                    
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
                        <Row gutter={16}>
                                <Form.Item label="信息主题：">
                                    {getFieldDecorator('infoTitle', {
                                        rules: [{ required: true, message: '请输入信息主题' }],
                                    })(<Input placeholder="请输入信息主题" />)}
                                </Form.Item>
                           
                        </Row>
                        <Row gutter={16}>
                            <Form.Item label="信息介绍：">
                                {getFieldDecorator('infoSubTitle', {
                                    rules: [{ required: true, message: '请输入信息介绍' }],
                                })(<Input placeholder="请输入信息介绍" />)}
                            </Form.Item>

                        </Row>

                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label="具体内容:">
                                    {getFieldDecorator('infoContent', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入文字内容',
                                            },
                                        ],
                                    })(<Input.TextArea rows={10} placeholder="请输入文字内容" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <div className='edit-footer'>
                        <Button onClick={this.onClose} style={{ marginRight: 8 }}>取消</Button>
                        <Button onClick={this.handleSubmit}  type="primary">提交</Button>
                    </div>
                </Drawer>
            </div>
        )
    }
}
export default Form.create()(Edit);