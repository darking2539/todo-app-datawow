import Icon from '@mdi/react';
import { mdiDotsHorizontal } from '@mdi/js';
import CheckBox from '../CheckBox'


export default function TaskChip(props: any) {

    const { id, title, completed, checkHandle, popupStatus, popupHandle, editHandle, editStatus, editOnClick, deleteHandle, editSave } = props;


    return (
        <div>
            {!editStatus && (<div>
                <div id={id} style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "15px 20px", marginTop: "20px", backgroundColor: "#FFFFFF", borderRadius: "9999px" }}>
                    <div style={{ display: "flex" }}>
                        <CheckBox id={id} checkedValue={completed} checkHandle={checkHandle} />
                        <div style={{ marginLeft: "15px", textDecoration: `${completed ? "line-through" : "none"}`, color: `${completed ? "#A9A9A9" : "#2E2E2E"}` }}>{title}</div>
                    </div>

                    <div style={{ cursor: "pointer" }} onClick={(evt: any) => popupHandle(id, evt)}>
                        <Icon path={mdiDotsHorizontal}
                            size={1}
                            color="#9796A8" />
                    </div>
                </div>

                {popupStatus && (
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <div style={{ padding: "10px 40px 10px 15px", backgroundColor: "#FFFFFF", boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)", borderRadius: "10px", position: 'absolute', marginTop: "-15px", marginRight: "15px" }}>
                            <div style={{ fontWeight: 400, color: "#2E2E2E", fontSize: '14px', margin: "5px 5px 5px 5px", cursor: "pointer" }} onClick={(evt: any) => editOnClick(id, evt)}>Edit</div>
                            <div style={{ fontWeight: 400, color: "#E07C7C", fontSize: '14px', margin: "10px 5px 5px 5px", cursor: "pointer" }} onClick={(evt: any) => deleteHandle(id, evt)}>Delete</div>
                        </div>
                    </div>
                )}
            </div>
            )}

            {editStatus && (
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", padding: "15px 20px", marginTop: "20px", backgroundColor: "#FFFFFF", borderRadius: "9999px" }}>
                    <input type="text" placeholder="Add your to do..." style={{ border: "none", outline: "none", fontWeight: 500, fontSize: '18px', width: "100%" }} value={title} onChange={(evt: any) => editHandle(id, evt.target.value)} ></input>
                    <button style={{color: "#FFFFFF", backgroundColor: "#585292", border: "none", padding: "0px 20px", borderRadius: "999px", height: "30px", cursor: "pointer"}} onClick={(evt: any) => editSave(id, evt)}>Save</button>
                </div>
            )}
        </div>
    )
}
