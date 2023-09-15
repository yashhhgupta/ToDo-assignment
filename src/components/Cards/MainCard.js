import styles from "./MainCard.module.css";
import Card from "./Card";
import Modal from "../UI/Modal";
import Form from "../Forms/Form";
import { useState } from "react";
import { useSelector } from "react-redux";
import DropZone from "../DND/DropZone";
import { useDispatch } from "react-redux";
import { taskActions } from "../../store/task-slice";
const MainCard = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const data = useSelector((state) => state.task.tasks);
  const arr = data.filter((item) => item.status === props.status);
  const dispatch = useDispatch();
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const dropHandler = (target, element) => {
    dispatch(taskActions.rearrangeTask({ target, element }));
  };
  const temp ={
    title:"No Task Found",
  }
  return (
    <>
      <div className={styles.MainCard}>
        <div className={styles.content}>
          <span
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginLeft: "15px",
            }}
          >
            {props.status}
          </span>
          {arr.length === 0 ? (
            <div
              style={{ position: "relative", padding: "1px 0px 1px 0px" }}
            >
              <DropZone
                data={{ path: null, status: props.status }}
                onDrop={(data, item) => {
                  dropHandler(data, item);
                }}
              />
              <Card item={temp}/>
            </div>
          ) : (
            arr.map((task, index) => {
              return (
                <div
                  style={{ position: "relative", padding: "1px 0px 1px 0px" }}
                  key={task.id}
                >
                  <DropZone
                    data={{ path: task.id, status: props.status }}
                    onDrop={(data, item) => {
                      dropHandler(data, item);
                    }}
                  />
                  <Card item={task} />
                </div>
              );
            })
          )}
          <div
            onClick={openModal}
            style={{
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "bold",
              marginLeft: "15px",
            }}
          >
            Add a Task...
          </div>
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <Form onClose={closeModal} status={props.status} />
      </Modal>
    </>
  );
};
export default MainCard;
