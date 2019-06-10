import React from 'react';
import { BrowserRouter, Route,Link,NavLink} from "react-router-dom";
import 'antd/dist/antd.css';
import './home.css'
import { Layout, Menu, Icon, Avatar } from 'antd';
import UserAna from './userAnalysis.js'
import ContAna from './content-analysis.js'
import UserManage from './user-manage.js'
import FileManage from './file-manage.js'
import MessageEdit from './message-edit.js';
import EssayManage from './essay-manage.js';
import ClockManage from './clock-manage.js';
import Information from './platform-information.js'
import axios from 'axios'
import {url} from "../config";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedKeys:"1",
            openKeys: "sub1",
            userName: '',
            userImg: ''
        };
    }
    // //设置选择的标签
    // setChoseItem = () => {
    //     this.setState({
    //         selectedKeys: localStorage.getItem("selectedKeys"),
    //         openKeys: localStorage.getItem("openKeys"),
    //         userName: localStorage.getItem("userName"),
    //         userImg: localStorage.getItem("userImg")
    //     });
    // };

    getUserInfo = () =>{

        axios.post('http://47.102.199.210:9900/getUserInfo',{
            userId: localStorage.getItem("userId")
        }).then((r) => {
            window.localStorage.setItem("userImg", 'http://47.102.199.210:9900/'+r.data.data.userImg);
        });
    };

    componentWillMount (){
        this.setState({
            userName: localStorage.getItem("userName"),
            userImg: localStorage.getItem("userImg")
        });
        this.getUserInfo();
    }

    render() {
        return (
            <Layout className='home-g'>
                <Header className="header">
                    <div className='head'>
                        <img src={require("./img/logo_final.png")} alt="" />
                        <h1>考研管理平台</h1>
                    </div>
                    <div className='user'>
                        <div className='headscul'>
                            <Avatar src={this.state.userImg} size="large" className='he-logo' />
                            <span className='username'>{this.state.userName}</span>
                        </div>
                        <Link to="/">
                            <div>退出</div>
                        </Link>
                    </div>
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={[this.state.selectedKeys]}
                            defaultOpenKeys={[this.state.openKeys]}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <SubMenu key="sub1" title={<span><Icon type="bar-chart" />统计</span>}>
                                <Menu.Item  key="1">
                                    <Link to="/Home/"> 用户分析</Link>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Link to="/Home/ContAna"> 内容分析</Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon type="form" />管理</span>}>
                                <Menu.Item  key="3">
                                    <Link to="/Home/UserManage"> 用户管理</Link>
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <Link to="/Home/EssayManage"> 帖子管理</Link>
                                </Menu.Item>
                                <Menu.Item key="5">
                                    <Link to="/Home/ClockManage"> 打卡管理</Link>
                                </Menu.Item>
                                <Menu.Item key="6">
                                    <Link to="/Home/FileManage"> 文件管理</Link>
                                </Menu.Item>
                                <Menu.Item key="7">
                                    <Link to="/Home/MessageEdit"> 信息推送</Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title={<span><Icon type="setting" />设置</span>}>
                                <Menu.Item key="8"> <Link to="/Home/Information"> 平台信息</Link>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content className={"content"}>
                            <Route path="/Home/" exact component={UserAna} />
                            <Route path="/Home/ContAna" component={ContAna} />
                            <Route path="/Home/UserManage"  component={UserManage} />
                            <Route path="/Home/EssayManage"  component={EssayManage} />
                            <Route path="/Home/ClockManage"  component={ClockManage} />
                            <Route path="/Home/FileManage"  component={FileManage} />
                            <Route path="/Home/MessageEdit"  component={MessageEdit} />
                            <Route path="/Home/Information"  component={Information} />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default Home;