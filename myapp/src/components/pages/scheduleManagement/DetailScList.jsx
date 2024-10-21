import { apiCall } from "../../../service/apiService";

export default function DetailScList({date, monthData}) {

    //선택한 날만 나오게 필터링
    const filteredSchedules = monthData.filter(schedule => {
        const scheduleDate = schedule.date; // LocalDate 형식으로 되어 있음
        return scheduleDate === date; // 선택한 날짜와 비교
    });

    //일정삭제
    const deleteSc = (e) => {
        e.preventDefault();

        const url = `/sc/delete/${e.target.id}`;
        const token = localStorage.getItem('JwtToken');

        apiCall(url,'delete',null,token)
        .then((Response)=>{
            alert("삭제되었습니다");
            window.location.reload();
        }).catch((err)=>{
            alert(err);
        })
    }

    //출결처리
    const updateAttd = (e) =>{
        e.preventDefault();
        const attendance = e.target.value;
        const scId = e.target.id;
        const url='/sc/attd';
        const userId = filteredSchedules.find(schedule => schedule.scId == scId)?.userId;
        
        const data = {
                    scId : scId, 
                    attendance : attendance,
                    userId : userId
                    }
        const token = localStorage.getItem('JwtToken');
        
        console.log(scId + e.target.value + userId);

        apiCall(url,'post',data,token)
        .then((Response)=>{
            alert('출결처리완료')
        }).catch((err)=>{
            alert(err)
        })
    }

    return(

        <tbody>
            {filteredSchedules.length > 0 ? (
                filteredSchedules.map(schedule => (
                    <tr key={schedule.scId}>
                        <td>{schedule.attendance === 'y' ? (
                                <i className="fa-regular fa-square attdY"></i>
                            ) : schedule.attendance === 'n' ? (
                                <i className="fa-regular fa-square attdN"></i>
                            ) : (
                                <i className="fa-regular fa-square"></i>
                            )}
                        </td>
                        <td>{schedule.startTime} ~ {schedule.endTime || "없음"}</td>
                        <td>{schedule.userName}</td>
                        {/* <td>Memo: {schedule.scheduleMemo}</td> */}
                        <td>{schedule.trainerName}</td>
                        <td> 
                            <button id={schedule.scId} value={'y'} 
                            onClick={updateAttd} className="dsclBtn attds">출석</button> 

                            <button id={schedule.scId} value={'n'} 
                            onClick={updateAttd} className="dsclBtn">결석</button>
                        </td>
                        <td>
                            <button onClick={deleteSc} 
                            id={schedule.scId} className="dsclBtn">삭제</button>
                        </td>
                    </tr>
                ))
                ) : (
                    <tr>
                        <td colSpan={4}>해당 날짜에 스케줄이 없습니다.</td>
                    </tr>
            )}
        </tbody>

    )


}