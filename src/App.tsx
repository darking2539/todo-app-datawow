import { useState, useEffect } from 'react';
import './App.css';
import { ProgressCard, TaskCard } from "./components";
import { CallGetDataList, CallDeleteData, CallAddData, CallEditData } from './API'


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
        var jsonParam: any = { id: id, title: taskDataBuffer[index].title, completed: !taskDataBuffer[index].completed };
        CallEditData(jsonParam).then(() => {
          fetchDataFromAPI();
        })
      }
    })
  }

  const fetchDataFromAPI = () => {

    CallGetDataList().then((resp:any)=> {
      setTaskData(resp?.data);
    })
    
  }

  const initStateData = () => {
    setDropDownValue({ label: "All", value: "All" });
  }

  const handlerAddKeyPress = (evt: any) => {
    if (evt.key === "Enter") {
      var jsonParam: any = { id: generateUUID(), title: addValue };
      CallAddData(jsonParam).then(()=> {
        fetchDataFromAPI();
        setAddValue(""); //reset
      })
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

  const deleteHandle = (id: string) => {

    CallDeleteData(id).then(()=> {
      fetchDataFromAPI();
    });
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
        var jsonParam: any = { id: id, title: taskDataBuffer[index].title, completed: taskDataBuffer[index].completed };
        CallEditData(jsonParam).then(() => {
          fetchDataFromAPI();
        })
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
    initStateData();
  }, [])

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
