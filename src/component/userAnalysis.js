import { Table } from 'antd';
import React from 'react';
import './u-analysis.css';
import Data from './data1.js'
import Head from './head.js';
class UserAna extends React.Component {
    constructor(props){
        super();
        this.state={
            title:'用户数据',
            subtitle:'昨日用户数据',
            list:[{
                content:'新注册用户',
                number:'47'
            },{
                content:'昨日访问',
                number:'18'
            },{
                content:'累计注册',
                number:'67'
            },{
                content:'累计访问',
                number:'234'
            },],
            columns: [
                {
                  title: '时间',
                  dataIndex: 'time',
                  key: 'time',
                  render: text => <a href="javascript:;">{text}</a>,
                },
                {
                  title: '新注册数',
                  dataIndex: 'New_register',
                  key: 'New_register',
                },
                {
                  title: '日访问数',
                  dataIndex: 'daily_visit',
                  key: 'daily_visit',
                },
                {
                    title: '累计注册',
                    dataIndex: 'sum_register',
                    key: 'sum_register',
                  },],
            data: [
                    {
                      key: '1',
                      time: '2019-5-31',
                      New_register: 32,
                      daily_visit: 100,
                      sum_register: 30,
                    },
                    {
                        key: '2',
                        time: '2019-6-1',
                        New_register: 32,
                        daily_visit: 100,
                        sum_register: 30,
                    },
                    {
                        key: '3',
                        time: '2019-6-2',
                        New_register: 32,
                        daily_visit: 100,
                        sum_register: 30,
                    },]
        }
    }

    componentDidMount(){
        // localStorage.setItem("selectedKeys", "1");
        // localStorage.setItem("openKeys", "sub1");
    }

    render() {
        return (
            <div>
                <Head />
                <Data title={this.state.title} subtitle={this.state.subtitle} list={this.state.list}/>
                <div className='data-table'>
                    <div className='tableName'>
                        <div>2019年3月18日至2019年4月18</div>
                        <div>导出数据</div>
                    </div>
                     <Table columns={this.state.columns} dataSource={this.state.data} />
                </div>
            </div>
        )
    }
}
export default UserAna;