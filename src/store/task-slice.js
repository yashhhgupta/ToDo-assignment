import { createSlice } from "@reduxjs/toolkit";
import Tasks from "../data/Tasks"
const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: Tasks,
  },
  reducers: {
    addTask(state, action) {
      //if task exits then update the task
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
      //else add the task
      else {
        state.tasks.push(action.payload);
      }
    },
    deleteTask(state, action) {
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      state.tasks.splice(index, 1);
    },
    rearrangeTask(state, action) {
      const target = action.payload.target;
      const element = action.payload.element;
      if(target.status === element.status){
        const targetIndex = state.tasks.findIndex((task) => task.id === target.path);
        const elementIndex = state.tasks.findIndex((task) => task.id === element.path);
        const temp = state.tasks[targetIndex];
        state.tasks[targetIndex] = state.tasks[elementIndex];
        state.tasks[elementIndex] = temp;
      }
      else{
        const targetIndex = state.tasks.findIndex((task) => task.id === target.path);
        const elementIndex = state.tasks.findIndex((task) => task.id === element.path);
        const temp = state.tasks[elementIndex];
        state.tasks.splice(elementIndex,1);
        temp.status = target.status;
        state.tasks.splice(targetIndex,0,temp);
      }
    }
  },
});

export const taskActions = taskSlice.actions;
export default taskSlice;
