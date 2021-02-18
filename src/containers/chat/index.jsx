import React, {useState, useEffect} from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import {Loader, Dimmer} from 'semantic-ui-react';
import ChatHeader from "../../component/chatHeader";
import UsersList from "../usersList";
import UserInput from "../../component/userInput";
import MesagesContainer from "../messagesContainer";
import EditedModal from "../../component/editedModal/editedModal";
import styles from './styles.module.scss';


const Chat = ({userInfo, apiAddres}) => {
    const [edit, setEdit] = useState({
        editedPostId: '',
        isEdit: false,
        ediedText: ''
    });
    const [chatState, setChatState] = useState({
        message: [],
        users: [],
        lastMessageTime: '',
        loading: true
    });
    useEffect(async () => {
        const {data} = await axios.get(apiAddres);
        const tempData = data.map(el => {
            return {
                ...el,
                likers: []
            }
        });
        const lastMessageTime = tempData[tempData.length - 1].createdAt
        setChatState({
            message: [...tempData],
            users: [...countMembers(tempData), {...userInfo}],
            lastMessageTime,
            loading: false
        });
    }, [setChatState]);

    const countMembers = data => {
        const tempArr = [];
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
        });

        setChatState({
            message: [...tempMessage],
            users: [...chatState.users],
            lastMessageTime: date,
            loading: false
        });

    };

    const hanndleEddit = id => {
        const editedMessage = chatState.message.find(el => el.id === id);
        setEdit({
            editedPostId: id,
            isEdit: true,
            ediedText: editedMessage.text
        });
    };

    const closeEditor = () => {
        setEdit({
            editedPostId: '',
            isEdit: false,
            ediedText: ''
        })
    };

    const deleteMessage = id => {
        const tempMessage = chatState.message.filter(el => el.id !== id);
        const date = tempMessage[tempMessage.length - 1].createdAt;

        setChatState({
            message: [...tempMessage],
            users: [...chatState.users],
            lastMessageTime: date,
            loading: false
        });
    };

    const editPost = text => {
        const date = new Date().toISOString();
        const tempMessage = chatState.message.map(el => {
            if (el.id === edit.editedPostId) {
                return {
                    ...el,
                    text,
                    editedAt: date
                }
            } else {
                return el;
            }
        });
        setChatState({
            message: [...tempMessage],
            users: [...chatState.users],
            lastMessageTime: chatState.lastMessageTime,
            loading: false
        });
        closeEditor();
    };

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
                                    onEdit={hanndleEddit}
                                    messages={chatState.message}
                                    carentUser={userInfo.userId}
                                    setLike={handleLike}
                                    deleteOwnMesage={deleteMessage}
                                />
                                <UserInput postMessage={handlePost}/>
                            </div>
                            <UsersList
                                users={chatState.users}
                            />
                        </div>
                        {edit.isEdit && (
                            <EditedModal
                                isEdit={edit.isEdit}
                                message={edit.ediedText}
                                cancelEdit={closeEditor}
                                saveChange={editPost}
                            />
                            )}
                    </>
                )}
        </main>
    );
};

Chat.propTypes = {
    userInfo: PropTypes.object.isRequired,
    apiAddres: PropTypes.string.isRequired
};

export default Chat;
