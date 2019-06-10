import React from 'react';
import { Table, Divider, Button,Icon,Modal } from 'antd';
import Search from './search.js';

import './essay-manage.css'
import {url} from "../config";
import axios from 'axios'
const confirm = Modal.confirm;


class EssayManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            columns: [
                {
                    title: '帖子名称',
                    dataIndex: 'essayname',
                    key: 'essayname',
                },
                {
                    title: '用户名',
                    dataIndex: 'username',
                    key: 'username',
                    sorter: (a, b) => a.username.length - b.username.length,
                    sortDirections: ['descend'],
                    render: text => <a >{text}</a>,
                },
                 {
                    title: '发帖时间',
                    dataIndex: 'write_time',
                    key: 'write_time',
                    sorter: (a, b) => a.write_Time < b.write_Time ?1:-1,
                    // sortDirections: ['descend'],
                    // render: text => <a href="javascript:;">{text}</a>,
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    key: 'essayId',
                    render: (text,record) => (
                        <span>
                            <a onClick={() => this.showDeleteConfirm(record.essayId)} className='delete'> 删除 </a>
                        </span>
                    )
                },
            ],
            data: [],
            inputValue: "",
            perNum: 5,
        }
    }

    showDeleteConfirm = (essayId)=> {
        let that = this;
        confirm({
            title: '你想要删除此水帖吗?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                //删除
                axios.post(url+'essay/deleteEssay',{
                    essayId: essayId
                }).then((r) => {
                    if(r.data.code === 1){
                        that.getAllEssayInfo();
                    }
                });

            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    getAllEssayInfo= ()=>{
        axios.post(url+'essay/essayList',{}).then((r) => {
            console.log(r)
            let data = [];
            for(let i=0; i<r.data.length; ++i){
                data.push({
                    key: i,
                    username: r.data[i].USER_NAME,
                    essayname: r.data[i].ESSAY_TITLE,
                    write_time: r.data[i].CREATION_TIME,
                    essayId: r.data[i].ESSAY_ID
                });
            }
            this.setState({data: data});
        });
    };


    changeUserPagePerNum = (number, inputValue) =>{
        this.setState({
            inputValue: inputValue,
            perNum: number,
        });

        if(inputValue.length === 0){
            this.getAllEssayInfo();
        }
        //模糊查询
        else {
            axios.post(url+'essay/queryByEssayTitle',{
                essayTitle: inputValue
            }).then((r) => {
                console.log(r);
                let data = [];
                for(let i=0; i<r.data.length; ++i){
                    data.push({
                        key: i,
                        username: r.data[i].USER_NAME,
                        essayname: r.data[i].ESSAY_TITLE,
                        write_time: r.data[i].CREATION_TIME,
                        essayId: r.data[i].ESSAY_ID
                    });
                }
                this.setState({data: data});
            });
        }
    };

    componentDidMount(){
        // localStorage.setItem("selectedKeys", "4");
        // localStorage.setItem("openKeys", "sub2");
        this.getAllEssayInfo();
    }

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
                <div className='essayHead'>
                    <div>
                        帖子列表
                    </div>
                    
                </div>
                <Table rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.data} pagination={{
                    pageSize: this.state.perNum
                }} />
            </div>
        )
    }
}

export default EssayManage;