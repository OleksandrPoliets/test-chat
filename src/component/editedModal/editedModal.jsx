import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Modal} from 'semantic-ui-react';

function EditedModal({isEdit, message, cancelEdit, saveChange}) {
    const [text, setText] = useState(message);
    const [open, setOpen] = useState(isEdit);

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
        >
            <Modal.Header>Edit your message</Modal.Header>
            <Modal.Content image>
                <Modal.Description>
                    <Form reply onSubmit={() => saveChange(text)}>
                        <Form.TextArea
                            value={text}
                            placeholder="Type a comment..."
                            onChange={ev => setText(ev.target.value)}
                        />
                        <Button type="submit" content="Save changes" labelPosition="left" icon="edit" primary/>
                        <Button
                            content="Cancel"
                            labelPosition='right'
                            icon='cancel'
                            onClick={() => {
                                setOpen(false);
                                cancelEdit()
                            }
                            }
                            negative
                        />
                    </Form>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

EditedModal.propTypes = {
    isEdit: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    cancelEdit: PropTypes.func.isRequired,
    saveChange: PropTypes.func.isRequired
};

export default EditedModal
