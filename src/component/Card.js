import React, { useState } from 'react';
import './Card.css';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteNote, editNote } from '../redux/noteSlice';

function Card({ data }) {
    const [show, setShow] = useState(false);
    const [noteContent, setNoteContent] = useState({ note: data.note, title: data.title, important: data.important });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteNote(id));
    };

    const handleEdit = () => {
        if (noteContent.note.trim() === "" || noteContent.title.trim() === "") {
            alert('Please add a note');
        } else {
            const updatedNote = { id: data.id, bodyData: { note: noteContent.note, title: noteContent.title, important: noteContent.important } };
            dispatch(editNote(updatedNote));
            handleClose();
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setNoteContent({ ...noteContent, [name]: newValue });
    };

    return (
        <div>
            <div className="card" style={{ backgroundColor: "black" }}>
                <div className="header">
                    <div className="top">
                        <div className="circle">
                            <i className="fa-solid  fa-file-pen" style={{ color: "#fafbf0" }} onClick={handleShow}></i>
                        </div>
                        <div className="circle">
                            <i className="fa-regular  fa-circle-xmark" style={{ color: "red" }} onClick={() => handleDelete(data.id)}></i>
                        </div>
                        <div className="circle">
                            {
                                 noteContent.important &&
                                <i className="fa-solid  fa-bookmark" style={{ color: "gold"}}></i>
                            }
                        </div>
                        <div className="title d-flex">
                            <p id="title2">{data.date}</p>
                            <p id="title2">{data.time}</p>
                        </div>
                    </div>
                </div>
                <div className="code-container">
                    <h5 className='text-white'>{data.title}</h5>
                    <textarea className="area" id="code" name="note" readOnly value={data.note}>
                    </textarea>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" name='title' className='form-control' value={noteContent.title} onChange={handleInputChange} />
                    <textarea
                        name='note'
                        className='form-control mt-3'
                        value={noteContent.note}
                        onChange={handleInputChange}
                    ></textarea>
                    <div className="form-check mt-3">
                        <input
                            type="checkbox"
                            name="important"
                            className="form-check-input"
                            checked={noteContent.important}
                            onChange={handleInputChange}
                        />
                        <label className="form-check-label">
                            Mark as Important
                        </label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEdit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Card;
