import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, TextArea, Button } from 'semantic-ui-react'
import styles from './styles.module.scss';

const UserInput = ({postMessage}) => {
    const [text, setText] = useState('');
    const handleChange = e => {
        e.preventDefault();
        postMessage(text);
        setText('');
    }
    return (
        <form onSubmit={handleChange}>
            <textarea
                value={text}
                name=""
                id=""
                cols="30"
                rows="10"
                onChange={ev => setText(ev.target.value)}
            ></textarea>
            <Button color='green' type="submit">Green</Button>
        </form>
    );
};

UserInput.propTypes = {
    postMessage: PropTypes.func.isRequired
};

export default UserInput;
