import React from 'react';
import { Table, Divider, Button,Icon,Modal } from 'antd';
import Search from './search.js';

import './clock-manage.css';
import {url} from "../config";
import axios from 'axios'

const confirm = Modal.confirm;

  
  class ClockManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            columns: [
                
                {
                    title: '用户名',
                    dataIndex: 'username',
                    key: 'username',
                    sorter: (a, b) => a.username.length - b.username.length,
                    sortDirections: ['descend'],
                    render: text => <a href="javascript:;">{text}</a>,
                },
                {
                    title: '打卡内容',
                    dataIndex: 'clockcontent',
                    key: 'clockcontent',
                },
                 {
                    title: '打卡时间',
                    dataIndex: 'clock_time',
                    key: 'clock_time',
                    sorter: (a, b) => a.clock_time < b.clock_time ?1:-1,
                    render: text => <a href="javascript:;">{text}</a>,
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    key: 'operation',
                    render: (text,record) => (
                        <span>
                            <a onClick={() => this.showDeleteConfirm(record.clockId)} className='delete'> 删除 </a>
                        </span>
                    )
                },
            ],
            data: [],
            inputValue: "",
            perNum: 5,
        }
    }

      componentDidMount(){
          // localStorage.setItem("selectedKeys", "5");
          // localStorage.setItem("openKeys", "sub2");
          this.getAllClockInfo();
      }

      getAllClockInfo= ()=>{
          axios.post(url+'clock/clockList',{}).then((r) => {
              console.log(r);
              let data = [];
              for(let i=0; i<r.data.length; ++i){
                  data.push({
                      key: i,
                      username: r.data[i].USER_NAME,
                      clockcontent: r.data[i].CLOCK_CONTENT,
                      clock_time: r.data[i].CREATION_TIME,
                      clockId: r.data[i].CLOCK_ID
                  });
              }
              this.setState({data: data});
          });
      };


      showDeleteConfirm = (clockId)=> {
          let that = this;
          confirm({
              title: '你想要删除该记录吗?',
              okText: 'Yes',
              okType: 'danger',
              cancelText: 'No',
              onOk() {
                  //删除
                  axios.post(url+'clock/deleteClock',{
                      clockId: clockId
                  }).then((r) => {
                      if(r.data.code === 1){
                          that.getAllClockInfo();
                      }
                  });

              },
              onCancel() {
                  console.log('Cancel');
              },
          });
      };

      changeUserPagePerNum = (number, inputValue) =>{
          this.setState({
              inputValue: inputValue,
              perNum: number,
          });

          if(inputValue.length === 0){
              this.getAllClockInfo();
          }
          //模糊查询
          else {
              axios.post(url+'clock/queryByUserName',{
                  userName: inputValue
              }).then((r) => {
                  console.log(r);
                  let data = [];
                  for(let i=0; i<r.data.length; ++i){
                      data.push({
                          key: i,
                          username: r.data[i].USER_NAME,
                          clockcontent: r.data[i].CLOCK_CONTENT,
                          clock_time: r.data[i].CREATION_TIME,
                          clockId: r.data[i].CLOCK_ID
                      });
                  }
                  this.setState({data: data});
              });
          }
      };



    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };
        return (
            <div>
                <Search changeUserPagePerNum = {this.changeUserPagePerNum}/>
                <div className='clockHead'>
                    <div>
                        打卡列表
                    </div>
                    
                </div>
                <Table rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.data} pagination={{
                    pageSize: this.state.perNum
                }} />
            </div>
        )
    }
}

export default ClockManage;
