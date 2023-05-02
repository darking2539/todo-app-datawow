import Icon from '@mdi/react';
import { mdiCheck } from '@mdi/js';

export default function CheckBox(props: any) {

    const { id, checkedValue, checkHandle } = props;

    return (
        <div id={id} key={id} style={{cursor: "pointer"}} onClick={(evt:any )=> checkHandle(id, evt)}>
            {checkedValue && (
                <div style={{ width: "22px", height: "22px", border: "2px solid #585292", borderRadius: "6px", backgroundColor: "#585292" }}>
                    <div style={{transform: "scale(0.8)", marginTop: "-1px"}}>
                        <Icon path={mdiCheck}
                            size={1}
                            color="white" />
                    </div>
                </div>)}
            {!checkedValue && (<div style={{ width: "22px", height: "22px", border: "2px solid #585292", borderRadius: "6px" }} />)}
        </div>
    )
}
