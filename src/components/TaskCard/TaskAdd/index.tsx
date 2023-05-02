

export default function TaskAdd(props: any) {

    const { value, setAddValue, handlerKeyPress } = props;

    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", padding: "15px 20px", marginTop: "20px", backgroundColor: "#FFFFFF", borderRadius: "9999px" }}>
                <input type="text" placeholder="Add your to do..." style={{border: "none", outline: "none", fontWeight: 500, fontSize: '18px', width: "100%"}} value={value} onChange={(evt: any) => setAddValue(evt.target.value)} onKeyPress={handlerKeyPress} ></input>
        </div>
    )
}