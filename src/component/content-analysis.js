import React from 'react';
import Data from './data1.js'
class ContAna extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                title: '帖子数据',
                subtitle: '昨日发帖数量',
                list: [{
                    content: '新增帖子数',
                    number: '13'
                }, {
                    content: '帖子点赞数',
                    number: '456'
                }, {
                    content: '累计点赞数',
                    number: '350'
                }, {
                    content: '累计评论数',
                    number: '76'
                }]
            },
            {
                title: '打卡数据',
                subtitle: '昨日打卡数量',
                list: [{
                    content: '新增打卡数',
                    number: '16'
                }, {
                    content: '打卡点赞数',
                    number: '167'
                }, {
                    content: '累计打卡数',
                    number: '34'
                }, {
                    content: '累计点赞数',
                    number: '247'
                }],
            },
            {
                title: '任务数据',
                subtitle: '昨日任务数量',
                list: [{
                    content: '新增任务数',
                    number: '123'
                }, {
                    content: '任务完成数',
                    number: '475'
                },]
            },
            ]
        }
    }

    componentDidMount(){
        // localStorage.setItem("selectedKeys", "2");
        // localStorage.setItem("openKeys", "sub1");
    }

render() {
    return (
        
        <div>
            {this.state.data.map((item, index) => {
                return (
                    <Data title={item.title} subtitle={item.subtitle} list={item.list} key={index} />
                )
            })}
        </div>
    )
}
}
export default ContAna;