"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_beautiful_dnd_1 = require("react-beautiful-dnd");
const styled_components_1 = __importDefault(require("styled-components"));
const Card = styled_components_1.default.div `
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props) => props.isDragging ? "#e4f2ff" : props.theme.todoCardColor};
  box-shadow: ${(props) => props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
`;
function DragabbleCard({ toDoId, toDoText, index }) {
    return (<react_beautiful_dnd_1.Draggable draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (<Card isDragging={snapshot.isDragging} ref={magic.innerRef} {...magic.dragHandleProps} {...magic.draggableProps}>
          {toDoText}
        </Card>)}
    </react_beautiful_dnd_1.Draggable>);
}
exports.default = react_1.default.memo(DragabbleCard);
