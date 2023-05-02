import './index.css'

export default function ProgressCard(props: any) {

    const { taskData } = props;

    
    const completedCount = () => {
        
        var count = 0;
        taskData.map((value: any) => {
            if (value?.completed) {
                count++;
            }
        })

        return count.toString();
    }
    
    const percentageCalculate = () => {
        
        var count = 0;
        taskData.map((value: any) => {
            if (value?.completed) {
                count++;
            }
        })

        return count/taskData.length * 100;
    }
    
    return (
    <div style={{padding: 5, backgroundColor: "#E07C7C", borderRadius: "20px"}}>
        <div style={{display: "flex", flexDirection: "column", padding: 10}}>
            <div style={{fontSize: "28px", fontWeight: 500}}>
                Progress
            </div>
            <div style={{}}>
                <div className='progress-bar'>
                    <div className='progress-bar-fill' style={{ width: `${percentageCalculate()}%`}}/>
                </div>
            </div>
            <div style={{color: "#EBB9B8", fontSize: "16px", fontWeight: 400}}>
                {`${completedCount()} completed`} 
            </div>
        </div>
    </div>

  )
}
