import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Add.css';
import { useDispatch } from 'react-redux';
import { createNote } from '../redux/noteSlice';

function Add() {
  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString('en-IN');
    const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    return { date, time };
  };

  const [inputData, setInputdata] = useState({
    title: "",
    note: "",
    important: false,
    ...getCurrentDateTime()
  });

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setData = (e) => {
    let { name, value, type, checked } = e.target;
    value = type === 'checkbox' ? checked : value;
    setInputdata({ ...inputData, [name]: value });
  };

  console.log(inputData);

  const saveData = () => {
    if (inputData.note === "" || inputData.title === "") {
      alert('Please fill all datas');
    } else {
      dispatch(createNote(inputData));
      handleClose();
      setInputdata({
        title: "",
        note: "",
        important: false,
        ...getCurrentDateTime()
      });
    }
  };

  return (
    <div>
      <button className="comic-button" onClick={handleShow}>New Note</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            name='title'
            className='form-control'
            placeholder='Title'
            value={inputData.title}
            onChange={setData}
          />
          <textarea
            name='note'
            className='form-control mt-3'
            placeholder='Add Note'
            value={inputData.note}
            onChange={setData}
          ></textarea>
          <div className="form-check mt-3">
            <input
              type="checkbox"
              name="important"
              className="form-check-input"
              checked={inputData.important}
              onChange={setData}
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
          <Button variant="primary" onClick={saveData}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Add;
