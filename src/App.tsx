import { useState, useEffect } from 'react'
import './App.css'
import { ProgressCard, TaskCard } from "./components"

function App() {

  const [taskData, setTaskData] = useState<any>([]);
  const [addValue, setAddValue] = useState<string>("");
  const [dropDownValue, setDropDownValue] = useState<any>();

  const options = [
    { value: 'All', label: 'All' },
    { value: 'Done', label: 'Done' },
    { value: 'Undone', label: 'Undone' }
  ]

  const checkHandle = (id: string) => {

    var taskDataBuffer: any = taskData;

    taskData.map((value: any, index: number) => {
      if (value.id === id) {
        taskDataBuffer[index].completed = !taskDataBuffer[index].completed
      }
    })

    setTaskData([...taskDataBuffer]);
  }

  const fetchDataFromAPI = () => {

    const initData: any = {
      "todos": [
        {
          "id": "5fe3f4ca-193c-4170-83c1-cb5a19908601",
          "title": "Buy food for dinner",
          "completed": true
        },
        {
          "id": "f619466c-a016-4281-b584-7db2795d103d",
          "title": "Call Marie at 10.00 PM",
          "completed": false
        },
        {
          "id": "5fe3f4ca-193c-4170-83c1-cb5a19908602",
          "title": "Write a react blog post",
          "completed": false
        }
      ]
    }

    setTaskData(initData.todos);
  }

  const initData = () => {
    setDropDownValue({ label: "All", value: "All" });
  }

  const handlerAddKeyPress = (evt: any) => {
    if (evt.key === "Enter") {
      var taskDataBuffer: any = taskData;
      taskDataBuffer.push({
        "id": generateUUID(),
        "title": addValue,
        "completed": false
      });
      setTaskData([...taskDataBuffer]);
      setAddValue(""); //reset
    };
  }

  const popupHandle = (id: any) => {

    var taskDataBuffer: any = taskData;

    taskData.map((value: any, index: number) => {
      if (value.id === id) {
        taskDataBuffer[index].popupStatus = !taskDataBuffer[index]?.popupStatus
      } else {
        taskDataBuffer[index].popupStatus = false
      }
    })

    setTaskData([...taskDataBuffer]);
  }

  const deleteHandle = (id: any) => {

    var taskDataBuffer: any = taskData;
    taskData.map((value: any, index: number) => {
      if (value.id === id) {
        taskDataBuffer.splice(index, 1)
      }
    })

    setTaskData([...taskDataBuffer]);
  }

  const editHandle = (id: any, valueChange: string) => {

    var taskDataBuffer: any = taskData;
    taskData.map((value: any, index: number) => {
      if (value.id === id) {
        taskDataBuffer[index].title = valueChange;
      }
    })

    setTaskData([...taskDataBuffer]);
  }

  const editOnClick = (id: any) => {

    var taskDataBuffer: any = taskData;
    taskData.map((value: any, index: number) => {
      if (value.id === id) {
        taskDataBuffer[index].editStatus = true;
      }
    })

    setTaskData([...taskDataBuffer]);
  }

  const editSave = (id: any) => {

    var taskDataBuffer: any = taskData;
    taskData.map((value: any, index: number) => {
      if (value.id === id) {
        taskDataBuffer[index].editStatus = false;
        taskDataBuffer[index].popupStatus = false;
      }
    })

    setTaskData([...taskDataBuffer]);
  }

  function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16;//random number between 0 and 16
      if (d > 0) {//Use timestamp until depleted
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {//Use microseconds since page-load if supported
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  };

  useEffect(() => {
    fetchDataFromAPI();
    initData();
  }, [])

  // useEffect(() => {
  //   console.log(dropDownValue);
  // }, [dropDownValue])

  return (
    <div style={{ padding: "70px 10vw", backgroundColor: "#F5F5F5", borderRadius: "20px", width: "70vw", maxWidth: "720px", zIndex: -10 }}>
      <ProgressCard taskData={taskData} />
      <TaskCard
        options={options}
        taskData={taskData}
        checkHandle={checkHandle}
        addValue={addValue}
        setAddValue={setAddValue}
        handlerAddKeyPress={handlerAddKeyPress}
        popupHandle={popupHandle}
        editOnClick={editOnClick}
        editHandle={editHandle}
        editSave={editSave}
        deleteHandle={deleteHandle}
        setDropDownValue={setDropDownValue}
        dropDownValue={dropDownValue} />
    </div>
  )
}

export default App
