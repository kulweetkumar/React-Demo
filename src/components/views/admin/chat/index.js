import React, { useState, useEffect, useRef } from "react";
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import AuthService from 'services';
import swal from 'sweetalert';
import { MessageBox, ChatItem, Input, Button } from 'react-chat-elements'

import 'react-chat-elements/dist/main.css'

//countUp

const Chat = (props) => {

    const [sending, setSending] = useState(false);
    const [data, setData] = useState({});
    const inputReferance = useRef(null);

    const [inputValue, setInputValue] = useState('');
    // get data
    let isMounted = true;
    async function getData() {
        try {
            setSending(true);
            await props.dispatch(AuthService.dashboardCount()).then((res) => {
                if (isMounted) {
                    setSending(false);
                    setData(res.body);
                }
            });
        } catch (err) {
            setSending(false);
            console.log(err);
            if (err && err.data && err.data.message) {
                swal("Oops!", err.data.message, "error");
            }
        }
    };

    useEffect(() => {
        getData();
        return () => {
            isMounted = false;
        };
    }, []);


    return (
        <>
            <Helmet title="envelope" />
            <div className="app-title">
                <div>
                    <h1><i className="fa fa-envelope"></i> Chat</h1>
                </div>
                <ul className="app-breadcrumb breadcrumb">
                    <li className="breadcrumb-item"><i className="fa fa-home fa-lg"></i></li>
                </ul>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <ChatItem
                        avatar={'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg'}
                        alt={'Reactjs'}
                        title={'First'}
                        subtitle={'Hello '}
                        date={new Date()}
                        unread={0}
                    />
                    <ChatItem
                        avatar={'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg'}
                        alt={'Reactjs'}
                        title={'Second'}
                        subtitle={'How are you'}
                        date={new Date()}
                        unread={0}
                    />
                    <ChatItem
                        avatar={'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg'}
                        alt={'Reactjs'}
                        title={'Third'}
                        subtitle={'Hey'}
                        date={new Date()}
                        unread={0}
                    />
                </div>
                <div className="col-md-9">
                    <MessageBox
                        onReplyMessageClick={() => console.log('reply clicked!')}
                        position={'left'}
                        type={'text'}
                        text={'Tempor duis do voluptate enim duis velit veniam aute ullamco dolore duis irure.'}
                    />
                    <MessageBox
                        onReplyMessageClick={() => console.log('reply clicked!')}
                        position={'right'}
                        type={'text'}
                        text={'Tempor duis do voluptate enim duis velit veniam aute ullamco dolore duis irure.'}
                    />
                    <MessageBox
                        onReplyMessageClick={() => console.log('reply clicked!')}
                        position={'left'}
                        type={'text'}
                        text={'Tempor duis do voluptate enim duis velit veniam aute ullamco dolore duis irure.'}
                    />
                    <MessageBox
                        onReplyMessageClick={() => console.log('reply clicked!')}
                        position={'right'}
                        type={'text'}
                        text={'Tempor duis do voluptate enim duis velit veniam aute ullamco dolore duis irure.'}
                    />
                    <MessageBox
                        onReplyMessageClick={() => console.log('reply clicked!')}
                        position={'left'}
                        type={'text'}
                        text={'Tempor duis do voluptate enim duis velit veniam aute ullamco dolore duis irure.'}
                    />
                    <MessageBox
                        onReplyMessageClick={() => console.log('reply clicked!')}
                        position={'right'}
                        type={'text'}
                        text={'Tempor duis do voluptate enim duis velit veniam aute ullamco dolore duis irure.'}
                    />
                    <Input
                        referance={inputReferance}
                        placeholder='Type here...'
                        multiline={true}
                        value={inputValue}
                        rightButtons={<Button color='white' backgroundColor='black' text='Send' />}
                    />
                </div>

            </div>



        </>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.Auth.isAuthenticated,
        user: state.Auth,
    }
};
function mapDispatchToProps(dispatch) {
    return { dispatch };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat);