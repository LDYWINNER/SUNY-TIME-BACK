"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_beautiful_dnd_1 = require("react-beautiful-dnd");
const recoil_1 = require("recoil");
const atoms_1 = require("../atoms");
const react_hook_form_1 = require("react-hook-form");
const ToDo_1 = require("../assets/wrappers/ToDo");
const ToDoBoard_1 = __importDefault(require("./ToDoBoard"));
function ToDo() {
    const [toDos, setToDos] = (0, recoil_1.useRecoilState)(atoms_1.toDoState);
    const onDragEnd = (info) => {
        const { destination, source } = info;
        if (!destination)
            return;
        if ((destination === null || destination === void 0 ? void 0 : destination.droppableId) === source.droppableId) {
            // same board movement.
            setToDos((allBoards) => {
                const boardCopy = [...allBoards[source.droppableId]];
                const taskObj = boardCopy[source.index];
                boardCopy.splice(source.index, 1);
                boardCopy.splice(destination === null || destination === void 0 ? void 0 : destination.index, 0, taskObj);
                return Object.assign(Object.assign({}, allBoards), { [source.droppableId]: boardCopy });
            });
        }
        if (destination.droppableId !== source.droppableId) {
            // cross board movement
            setToDos((allBoards) => {
                const sourceBoard = [...allBoards[source.droppableId]];
                const taskObj = sourceBoard[source.index];
                const destinationBoard = [...allBoards[destination.droppableId]];
                sourceBoard.splice(source.index, 1);
                destinationBoard.splice(destination === null || destination === void 0 ? void 0 : destination.index, 0, taskObj);
                return Object.assign(Object.assign({}, allBoards), { [source.droppableId]: sourceBoard, [destination.droppableId]: destinationBoard });
            });
        }
    };
    const { register, setValue, handleSubmit } = (0, react_hook_form_1.useForm)();
    const onValid = ({ boardname }) => {
        setToDos((allBoards) => {
            return Object.assign(Object.assign({}, allBoards), { [boardname]: [] });
        });
        setValue("boardname", "");
    };
    return (<react_beautiful_dnd_1.DragDropContext onDragEnd={onDragEnd}>
      <ToDo_1.Wrapper>
        <ToDo_1.Form onSubmit={handleSubmit(onValid)}>
          <input {...register("boardname", { required: true })} type="text" placeholder={`Add new board`}/>
        </ToDo_1.Form>
        <ToDo_1.Boards>
          {Object.keys(toDos).map((boardId) => (<ToDoBoard_1.default boardId={boardId} key={boardId} toDos={toDos[boardId]}/>))}
        </ToDo_1.Boards>
      </ToDo_1.Wrapper>
    </react_beautiful_dnd_1.DragDropContext>);
}
exports.default = ToDo;
