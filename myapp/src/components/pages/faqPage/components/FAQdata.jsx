
const FAQdata = [
        // 서비스
        { id: 1, category: '서비스', title: '캘린더가 정상적으로 작동하지 않아요', solution: '브라우저를 새로고침 해보세요' },
        { id: 2, category: '서비스', title: '로그인 화면이 나타나지 않습니다', solution: '쿠키와 캐시를 지워보세요' },
        { id: 3, category: '서비스', title: '이미지가 로드되지 않아요', solution: '인터넷 연결을 확인하세요' },
        { id: 4, category: '서비스', title: '알림이 오지 않습니다', solution: '알림 설정을 확인하세요' },
        { id: 5, category: '서비스', title: '페이지가 느리게 로드됩니다', solution: '브라우저를 최신 버전으로 업데이트하세요' },
        { id: 6, category: '서비스', title: '파일 업로드가 실패합니다', solution: '파일 크기를 확인하세요' },
        { id: 7, category: '서비스', title: '비디오가 재생되지 않습니다', solution: '브라우저 확장 프로그램을 비활성화 해보세요' },
        { id: 8, category: '서비스', title: '지도 기능이 동작하지 않습니다', solution: '위치 서비스를 활성화하세요' },
        { id: 9, category: '서비스', title: '소리가 나오지 않아요', solution: '음량 설정을 확인하세요' },
        { id: 10, category: '서비스', title: '데이터가 저장되지 않아요', solution: '서버 상태를 확인하세요' },

        // 결제
        { id: 11, category: '결제', title: '결제가 진행되지 않습니다', solution: '결제 정보를 다시 확인하세요' },
        { id: 12, category: '결제', title: '이중 결제가 발생했습니다', solution: '고객 지원 센터에 문의하세요' },
        { id: 13, category: '결제', title: '할인이 적용되지 않습니다', solution: '할인 코드를 다시 입력하세요' },
        { id: 14, category: '결제', title: '결제 내역을 찾을 수 없습니다', solution: '구매 기록을 확인하세요' },
        { id: 15, category: '결제', title: '환불이 처리되지 않았습니다', solution: '환불 정책을 확인하세요' },
        { id: 16, category: '결제', title: '결제 수단이 거부되었습니다', solution: '다른 결제 수단을 사용해보세요' },
        { id: 17, category: '결제', title: '결제 영수증이 이메일로 오지 않습니다', solution: '스팸 폴더를 확인하세요' },
        { id: 18, category: '결제', title: '자동 결제가 취소되지 않습니다', solution: '고객 지원 센터에 문의하세요' },
        { id: 19, category: '결제', title: '구독이 갱신되지 않았습니다', solution: '구독 상태를 확인하세요' },
        { id: 20, category: '결제', title: '프로모션 코드가 작동하지 않습니다', solution: '코드 유효 기간을 확인하세요' },

        // 환불
        { id: 21, category: '환불', title: '환불 요청이 거부되었습니다', solution: '환불 사유를 다시 작성해보세요' },
        { id: 22, category: '환불', title: '환불 처리 시간이 오래 걸립니다', solution: '환불 정책을 확인하세요' },
        { id: 23, category: '환불', title: '부분 환불이 불가능합니다', solution: '고객 지원 센터에 문의하세요' },
        { id: 24, category: '환불', title: '환불 상태를 확인할 수 없습니다', solution: '주문 번호를 확인하세요' },
        { id: 25, category: '환불', title: '상품이 회수되지 않았습니다', solution: '배송 상태를 확인하세요' },
        { id: 26, category: '환불', title: '환불 금액이 잘못되었습니다', solution: '환불 내역을 확인하세요' },
        { id: 27, category: '환불', title: '환불 신청 방법을 모르겠습니다', solution: '홈페이지의 환불 가이드를 참조하세요' },
        { id: 28, category: '환불', title: '환불 계좌 정보가 틀렸습니다', solution: '계좌 정보를 다시 입력하세요' },
        { id: 29, category: '환불', title: '환불 후에도 결제 금액이 청구되었습니다', solution: '고객 지원 센터에 문의하세요' },
        { id: 30, category: '환불', title: '환불 요청을 취소하고 싶습니다', solution: '환불 요청 취소 절차를 따르세요' },

        // 계정
        { id: 31, category: '계정', title: '계정 비밀번호를 잊어버렸습니다', solution: '비밀번호 재설정 페이지로 이동하세요' },
        { id: 32, category: '계정', title: '계정이 잠겼습니다', solution: '고객 지원 센터에 문의하세요' },
        { id: 33, category: '계정', title: '이메일 인증이 오지 않습니다', solution: '스팸 폴더를 확인하세요' },
        { id: 34, category: '계정', title: '계정을 삭제하고 싶습니다', solution: '계정 설정에서 삭제 절차를 따르세요' },
        { id: 35, category: '계정', title: '계정 정보가 업데이트되지 않습니다', solution: '브라우저 쿠키와 캐시를 지워보세요' },

        // 기타
        { id: 36, category: '기타', title: '계정 비밀번호를 잊어버렸습니다', solution: '비밀번호 재설정 페이지로 이동하세요' },
        { id: 37, category: '기타', title: '프로필 사진이 변경되지 않습니다', solution: '이미지 형식을 확인하세요' },
        { id: 38, category: '기타', title: '이메일 인증이 오지 않습니다', solution: '스팸 폴더를 확인하세요' },
        { id: 39, category: '기타', title: '계정이 잠겼습니다', solution: '고객 지원 센터에 문의하세요' },
        { id: 40, category: '기타', title: '언어 설정이 저장되지 않습니다', solution: '브라우저 쿠키 설정을 확인하세요' },
        { id: 41, category: '기타', title: '앱이 강제 종료됩니다', solution: '앱을 업데이트하세요' },
        { id: 42, category: '기타', title: '화면이 깨져 보입니다', solution: '해상도 설정을 확인하세요' },
        { id: 43, category: '기타', title: '푸시 알림이 작동하지 않습니다', solution: '앱 알림 설정을 확인하세요' },
        { id: 44, category: '기타', title: '데이터 백업이 실패했습니다', solution: '저장 공간을 확인하세요' },
        { id: 45, category: '기타', title: '계정 삭제가 불가능합니다', solution: '고객 지원 센터에 문의하세요' }
];

export default FAQdata;