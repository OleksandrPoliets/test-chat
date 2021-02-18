import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import styles from './styles.module.scss';

const UserInput = ({postMessage}) => {
    const [text, setText] = useState('');
    const handleChange = e => {
        e.preventDefault();
        postMessage(text);
        setText('');
    }
    return (
        <Form reply onSubmit={handleChange} className={styles.form}>
            <Form.TextArea
                value={text}
                placeholder="Type a comment..."
                onChange={ev => setText(ev.target.value)}
            />
            <Button type="submit" content="Post" labelPosition="left" icon="edit" primary />
        </Form>
    );
};

UserInput.propTypes = {
    postMessage: PropTypes.func.isRequired
};

export default UserInput;
