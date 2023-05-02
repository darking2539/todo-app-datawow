import TaskChip from "./TaskChip"
import DropDown from "./DropDown"
import TaskAdd from "./TaskAdd";
import "./index.css"

export default function TaskCard(props: any) {

  const { options, taskData, checkHandle, addValue, setAddValue, handlerAddKeyPress, popupHandle, editOnClick, editHandle, deleteHandle, editSave, dropDownValue, setDropDownValue } = props;

  return (
    <div className="main">
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <div className="text">Tasks</div>
        <DropDown
          options={options}
          value={dropDownValue}
          onChange={(value: any) => setDropDownValue(value)}
          defaultValue={{ label: "All", value: "All" }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>

        {taskData && taskData.map((value: any) => {
          
          if (dropDownValue.value === "Done" && !value.completed) {
            return
          }

          if (dropDownValue.value === "Undone" && value.completed) {
            return
          }
          
          return (
            <TaskChip
              key={value.id}
              id={value.id}
              title={value.title}
              completed={value.completed}
              checkHandle={checkHandle}
              popupStatus={value?.popupStatus}
              popupHandle={popupHandle}
              editStatus={value.editStatus}
              editHandle={editHandle}
              editOnClick={editOnClick}
              editSave={editSave}
              deleteHandle={deleteHandle} />
          );
        })}

        <TaskAdd value={addValue} setAddValue={setAddValue} handlerKeyPress={handlerAddKeyPress} />

      </div>
    </div>
  )
}
