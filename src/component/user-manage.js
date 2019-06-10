import React from 'react';
import EditableTable from './table.js'
import { Table, Divider, Button,Modal } from 'antd'
import './user-manage.css';
import Search from './search.js';
import AddUser from './modals/add-user.js';
import UpdateUser from './modals/updateUser.js'
import {url} from "../config";
import axios from 'axios'
const confirm = Modal.confirm;
  
  function showDeleteConfirm() {
    confirm({
      title: '你想要删除此用户吗?',
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  
class UserManage extends React.Component {
    constructor(props) {
        super(props);

        this.state ={
            perNum: 5,
            inputValue: ""
        }
    }

    getAllInfo = ()=>{
        axios.post(url+'user/userList',{}).then((r) => {
            let data = [];
            for(let i=0; i<r.data.length; ++i){
                data.push({
                    key: i,
                    userId: r.data[i].USER_ID,
                    username: r.data[i].USER_NAME,
                    email: r.data[i].USER_EMAIL,
                    testYear: r.data[i].TEST_YEAR,
                    goalSchool: r.data[i].GOAL_SCHOOL,
                    register_time: r.data[i].CREATION_TIME,
                    personal: r.data[i].USER_SIGNATURE,
                });
            }
            this.setState({userList: data});
        });
    }

    componentDidMount(){
        // localStorage.setItem("selectedKeys", "3");
        // localStorage.setItem("openKeys", "sub2");
        this.getAllInfo();
    }

    updateInfo = ()=>{
        console.log(this.state.perNum);
        this.changeUserPagePerNum(this.state.perNum, this.state.inputValue);
    };

    changeUserPagePerNum = (number, inputValue) =>{
        this.setState({
            inputValue: inputValue,
            perNum: number,
            userList: []
        });
        if(inputValue.length === 0){
            this.getAllInfo();
        }
        //模糊查询
        else {
            axios.post(url+'user/queryByUserName',{userName: inputValue}).then((r) => {
                let data = [];
                for(let i=0; i<r.data.length; ++i){
                    data.push({
                        key: i,
                        userId: r.data[i].USER_ID,
                        username: r.data[i].USER_NAME,
                        email: r.data[i].USER_EMAIL,
                        testYear: r.data[i].TEST_YEAR,
                        goalSchool: r.data[i].GOAL_SCHOOL,
                        register_time: r.data[i].CREATION_TIME,
                        personal: r.data[i].USER_SIGNATURE,
                    });
                }
                this.setState({userList: data});
            });
        }
        console.log(this.state)
    };

    render() {
        return (
            <div>
                <Search changeUserPagePerNum = {this.changeUserPagePerNum}/>
                <div className='userHead'>
                    <div>
                        用户列表
                    </div>
                    <div className='userBtns'>
                        <AddUser changeUserPagePerNum={this.changeUserPagePerNum}/>
                    </div>
                </div>
                <EditableTable perNum={this.state.perNum} userList={this.state.userList} updateInfo={this.updateInfo}/>
            </div>
        )
    }
}
export default UserManage;