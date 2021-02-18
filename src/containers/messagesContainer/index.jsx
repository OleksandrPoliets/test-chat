import React from 'react';
import PropTypes from 'prop-types';
import {Comment} from 'semantic-ui-react'

import styles from './styles.module.scss';
import UserMesage from "../../component/message";

const MesagesContainer = ({messages, carentUser, setLike}) => {
    const options = {

        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    return (
        <div className={styles.messagesWrap}>
            <Comment.Group size='large'>
                {
                    messages.map(el => (
                            <UserMesage
                                key={el.id}
                                userName={el.user}
                                imgSrc={el.avatar}
                                text={el.text}
                                id={el.id}
                                canEdit={el.userId === carentUser}
                                like={el.likers.length}
                                setLike={setLike}
                                date={new Date(el.createdAt).toLocaleString("en-US", options)}
                            />
                        )
                    )
                }
            </Comment.Group>
        </div>

    );
};

MesagesContainer.propTypes = {
    messages: PropTypes.array.isRequired,
    carentUser: PropTypes.string.isRequired,
    setLike: PropTypes.func.isRequired
};

export default MesagesContainer;
