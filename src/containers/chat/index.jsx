import React, {useState, useEffect} from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import {Loader, Dimmer, List} from 'semantic-ui-react'
import ChatHeader from "../../component/chatHeader";
import UsersList from "../usersList";
import UserInput from "../../component/userInput";
import MesagesContainer from "../messagesContainer";
import styles from './styles.module.scss';


const Chat = ({userInfo}) => {
    const apiUrl = 'https://edikdolynskyi.github.io/react_sources/messages.json';
    const [chatState, setChatState] = useState({
        message: [],
        users: [],
        lastMessageTime: '',
        loading: true
    });
    useEffect(async () => {
        const {data} = await axios.get(apiUrl);
        const tempData = data.map(el => {
            return {
                ...el,
                likers: []
            }
        })
        const lastMessageTime = tempData[tempData.length - 1].createdAt
        setChatState({
            message: [...tempData],
            users: [...countMembers(tempData), {...userInfo}],
            lastMessageTime,
            loading: false
        });
    }, [setChatState]);

    const countMembers = data => {
        const tempArr = []
        data.map(el => {
            const {userId, avatar, user} = el;
            if (tempArr.length === 0) {
                tempArr.push({userId, avatar, user});
            } else {
                const result = tempArr.find(name => name.user === el.user);
                if (!result) {
                    tempArr.push({userId, avatar, user});
                }
            }
        });
        return tempArr;
    };

    const handleLike = postId => {
        const tempMessage = chatState.message.map(el => {
            if (el.id === postId && el.userId !== userInfo.userId) {
                const tempLike = el.likers.findIndex(el => el === userInfo.userId);
                if (tempLike === -1) {
                    el.likers.push(userInfo.userId)
                } else {
                    el.likers.splice(tempLike,1);
                }
            }
            return el;
        });

        setChatState({
            message: [...tempMessage],
            users: [...chatState.users],
            lastMessageTime: chatState.lastMessageTime,
            loading: false
        });
    };

    const handlePost = data => {
        const date = new Date().toISOString();
        console.log(date)
        const tempMessage = [...chatState.message];
        tempMessage.push({
            id: Date.now().toString(),
            userId: userInfo.userId,
            avatar: userInfo.avatar,
            user: userInfo.user,
            likers: [],
            text: data,
            createdAt: date,
            editedAt: ""
        })
        setChatState({
            message: [...tempMessage],
            users: [...chatState.users],
            lastMessageTime: date,
            loading: false
        });
    }

    return (
        <main className={styles.main}>
            {chatState.loading
                ? (
                    <Dimmer active inverted>
                        <Loader size='large'>Loading</Loader>
                    </Dimmer>
                )
                : (
                    <>
                        <ChatHeader
                            chatName='test'
                            memberCounter={chatState.users.length}
                            messageCounter={chatState.message.length}
                            lastMessage={chatState.lastMessageTime}
                        />
                        <div className={styles.chatWrap}>
                            <div className={styles.messageWrap}>
                                <MesagesContainer
                                    messages={chatState.message}
                                    carentUser={userInfo.userId}
                                    setLike={handleLike}
                                />
                                <UserInput
                                    postMessage={handlePost}
                                />
                            </div>
                            <UsersList
                                users={chatState.users}
                            />
                        </div>

                    </>


                )}

        </main>
    );
};

Chat.propTypes = {
    userInfo: PropTypes.object.isRequired
};

export default Chat;
