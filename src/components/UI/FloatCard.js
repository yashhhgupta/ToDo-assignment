import styles from "./FloatCard.module.css";
import { AiOutlineEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";

const FloatCard = (props) => {
  const EditHandler = () => {
    props.edit();
  };
  const DeleteHandler = () => {
    props.delete();
  };
  return (
    <div className={styles.card}>
      <div className={styles.row} onClick={EditHandler}>
        <AiOutlineEdit />
        Edit
      </div>
      <div
        className={styles.row}
        style={{ color: "#D33852" }}
        onClick={DeleteHandler}
      >
        <AiFillDelete/> Delete
      </div>
    </div>
  );
};
export default FloatCard;
