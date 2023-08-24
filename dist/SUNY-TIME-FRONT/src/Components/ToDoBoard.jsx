"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_hook_form_1 = require("react-hook-form");
const react_beautiful_dnd_1 = require("react-beautiful-dnd");
const atoms_1 = require("../atoms");
const recoil_1 = require("recoil");
const ToDoBoard_1 = require("../assets/wrappers/ToDoBoard");
const ToDoDraggableCard_1 = __importDefault(require("./ToDoDraggableCard"));
function Board({ toDos, boardId }) {
    const setToDos = (0, recoil_1.useSetRecoilState)(atoms_1.toDoState);
    const { register, setValue, handleSubmit } = (0, react_hook_form_1.useForm)();
    const onValid = ({ toDo }) => {
        const newToDo = {
            id: Date.now(),
            text: toDo,
        };
        setToDos((allBoards) => {
            return Object.assign(Object.assign({}, allBoards), { [boardId]: [newToDo, ...allBoards[boardId]] });
        });
        setValue("toDo", "");
    };
    return (<ToDoBoard_1.Wrapper>
      <ToDoBoard_1.Title>{boardId}</ToDoBoard_1.Title>
      <ToDoBoard_1.Form onSubmit={handleSubmit(onValid)}>
        <input {...register("toDo", { required: true })} type="text" placeholder={`Add task on ${boardId}`}/>
      </ToDoBoard_1.Form>
      <react_beautiful_dnd_1.Droppable droppableId={boardId}>
        {(magic, info) => (<ToDoBoard_1.Area isDraggingOver={info.isDraggingOver} isDraggingFromThis={Boolean(info.draggingFromThisWith)} ref={magic.innerRef} {...magic.droppableProps}>
            {toDos.map((toDo, index) => (<ToDoDraggableCard_1.default key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text}/>))}
            {magic.placeholder}
          </ToDoBoard_1.Area>)}
      </react_beautiful_dnd_1.Droppable>
    </ToDoBoard_1.Wrapper>);
}
exports.default = Board;
