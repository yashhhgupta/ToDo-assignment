import styles from "./Form.module.css";
import { useState } from "react";
import ImageUplaod from "./Image upload.svg";
import { useDispatch } from "react-redux";
import { taskActions } from "../../store/task-slice";
const Form =(props)=>{
  const dispatch = useDispatch();
  let id = props.item ? props.item.id : null;
  let titl = props.item ? props.item.title : "";
  let st = props.item ? props.item.status : props.status;
  let img = props.item ? props.item.img : "";
    const [title, setTitle] = useState(titl);
    const [status, setStatus] = useState(st);
    const [image, setImage] = useState(img);
    const ImageChangeHandler = (e) => {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        setImage(URL.createObjectURL(e.target.files[0]));
      }
    };
    const months = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    const submitHandler = (e) => {
      e.preventDefault();
      if (id == null) {
        id = Math.floor(Math.random() * 10000);
      }
      const today = new Date();
      const day = today.getDate();
      const monthIndex = today.getMonth();
      const monthName = months[monthIndex];

      const formattedDate = `${day} ${monthName}`;
      let item = {
        id: id,
        title: title,
        status: status,
        img: image,
        date: formattedDate,
      };
      console.log(item);
      setTitle("");
      setStatus("");
      setImage("");
      dispatch(taskActions.addTask(item));
      props.onClose();
    }
    return (
      <div className={styles.form}>
        <span style={{ fontWeight: "bold", fontSize: "25px" }}>
          Create a Task
        </span>
        <div style={{ marginTop: "20px" }}>
          <label
            htmlFor="title"
            style={{ fontWeight: "bold", fontSize: "20px" }}
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Enter Task Title"
            className={styles.input}
          />
          <div className={styles.imagebox}>
            <label for="status" className={styles.label}>
              Status
            </label>
            <select
              name="status"
              id="status"
              className={styles.select}
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <option value="Resources">Resources</option>
              <option value="To Do">To Do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className={styles.imagebox}>
            <label className={styles.imageInput}>
              <input
                type="file"
                accept="image/*"
                className={styles.addImageButton}
                onChange={ImageChangeHandler}
              />
              Add your image
            </label>
            <img
              src={image ? image : ImageUplaod}
              alt="Image"
              className={styles.image}
            />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>

          <button className={styles.btn} onClick={submitHandler} disabled={title?false:true}>
            {props.item ? "Update Task" : "Add Task"}
          </button>
        </div>
      </div>
    );
}
export default Form;