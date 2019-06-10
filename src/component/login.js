import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Layout, Menu, Select, Form, Icon, Input, Button, Checkbox } from 'antd';
import Msg from './msg.js'
import 'antd/dist/antd.css';
import "./login.css";
import axios from 'axios'
import {url} from '../config'
const { Option } = Select;
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      isLogin: 0,
      msg: null,
    }
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        if (!err) {
            let usr = values.userName;
            let pwd = values.password;
            let data = {  "userName": usr, "password": pwd  };
            axios.post(url+'login', data).then((r) => {
                if(r.data.code === 1){
                    axios.defaults.headers.common.authorization = r.data.data.token;
                    console.log(r.data.data.result[0].USER_ID,r.data.data.token );
                    localStorage.setItem("userId", r.data.data.result[0].USER_ID)
                }
                this.setState({ msg: r.data.msg, show: true, isLogin: r.data.code});
            });
        }
    });
};
  render() {
    const { getFieldDecorator } = this.props.form;
    let isLogin = this.state.isLogin, msg = this.state.msg, show = this.state.show;
    if (isLogin === 1)
      return <Redirect push to='/Home' />;
    return (
      <div className='login-g'>
        <Msg msg={msg} show={show} />
        <div className='login-body'>
          <div className="login-logo">
            <img src="" alt="" className='logo-pic' />
          </div>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item className="login-form-row">
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }]
              })
                (<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />)}
            </Form.Item >
            <Form.Item className="login-form-row">
              {
                getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })
                  (
                    <Input
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="Password"
                    />
                  )
              }

            </Form.Item>
            <Form.Item style={{marginTop: "20px"}}>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
export default Form.create()(Login);