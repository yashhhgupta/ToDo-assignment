import styles from './Card.module.css';
import { BiTimeFive } from "react-icons/bi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import FloatCard from '../UI/FloatCard';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { taskActions } from '../../store/task-slice';
import Modal from '../UI/Modal';
import Form from '../Forms/Form';
import { useDrag } from "react-dnd";
import { useRef } from "react";
import { useEffect } from 'react';
const style = {
  backgroundColor: "white",
  cursor: "move",
};
const Card  =(props)=>{
  const dispatch = useDispatch();
  const [floatOpen,setFloatOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const dragRef = useRef(null);
  const [{ isDragging }, ref] = useDrag(
    () => ({
      type: "component",
      item: { type: "component", path: props.item.id, status: props.item.status },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [props.item]
  );
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const openFloatModal = () => {
    setFloatOpen(!floatOpen);
  }
  const EditClickHandler = () => {
    openModal();
    openFloatModal();
  }
  const DeleteClickHandler = () => {
    dispatch(taskActions.deleteTask(props.item.id));
    openFloatModal();
  }
  useEffect(() => {
    if (isDragging) {
      setOpacity(0.5);
    } else {
      setOpacity(1);
    }
  }, [isDragging]);

  ref(dragRef);
    return (
      <>
        <div
          className={styles.Card}
          ref={dragRef}
          style={{ ...style, opacity }}
        >
          {props.item.img && (
            <img src={props.item.img} className={styles.image}></img>
          )}
          <div className={styles.content}>
            <span style={{ fontWeight: "600" }}>{props.item.title}</span>
            {props.item.id && (
              <div
                className={styles.row}
                style={{ justifyContent: "space-between" }}
              >
                <div className={styles.row}>
                  <BiTimeFive /> &nbsp;
                  <span style={{ fontSize: "13px" }}>{props.item.date}</span>
                </div>
                <BiDotsVerticalRounded
                  onClick={openFloatModal}
                  style={{ cursor: "pointer" }}
                />
                {floatOpen && (
                  <FloatCard
                    edit={EditClickHandler}
                    delete={DeleteClickHandler}
                  />
                )}
              </div>
            )}
          </div>
        </div>
        <Modal isOpen={modalOpen} onClose={closeModal}>
          <Form onClose={closeModal} item={props.item} />
        </Modal>
      </>
    );
}
export default Card;