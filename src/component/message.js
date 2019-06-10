import { Icon, List, Button,Modal} from 'antd';
import React from 'react';
import './message.css'

const confirm = Modal.confirm;


class MessageItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
        }
    }

    render() {
        this.state.listData = this.props.infoList;

        const IconText = ({ type, text }) => (
            <span>
                <Icon type={type} style={{ marginRight: 8, color: '#1890ff', fontSize: 20 }} />
                {text}
            </span>
        );
        return (
            <div >
                <List
                    header='历史图文列表'
                    bordered='true'
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => { console.log(page); }, pageSize: this.props.perNum,
                    }}
                    dataSource={this.state.listData}
                    renderItem={item => (
                        <List.Item className='messagelist'
                            key={item.title}
                            actions={[ 
                                <div className='messagetime'>{item.creationTime}</div>,
                                <IconText type="like-o" text={item.likeNum} />,
                            ]}
                            extra={
                                <div className='extra'>
                                    <img width={200} height={100} alt="logo" src={item.imgUrl} />
                                    <div className='operation'>
                                        <Button type="danger" icon="delete" className='delete' onClick={() => this.props.showDeleteConfirm(item.infoId)} >删除</Button>
                                    </div>

                                </div>

                            }
                        >
                            <List.Item.Meta
                                title={<a href={item.href}><h4>
                                    {item.title}
                                </h4></a>}
                                description={item.description}
                            />
                        </List.Item>
                    )}
                />

            </div>
        )
    }
}
export default MessageItem