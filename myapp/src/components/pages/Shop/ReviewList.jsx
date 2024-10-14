import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReviewList.css';

const ReviewList = ({ productId, userId }) => {
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [editingReview, setEditingReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingComment, setEditingComment] = useState(''); // 리뷰 수정 시 사용하는 별도의 상태

  // productId와 userId가 제대로 전달되는지 확인하기 위해 콘솔 로그 출력
  useEffect(() => {
    console.log("Received productId:", productId);
    console.log("Received userId:", userId);
  }, [productId, userId]);

  // 리뷰 목록 가져오기
  useEffect(() => {
    const fetchReviews = async () => {
      if (!productId) return; // productId가 없으면 API 호출하지 않음
      setLoading(true);
      try {
        const response = await axios.get(`/api/reviews/product/${productId}`);
        setReviews(response.data);
      } catch (error) {
        console.error('리뷰를 불러오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [productId]);

  // 새로운 리뷰 추가
  const handleAddReview = async () => {
    if(newComment.length<5){
      alert('리뷰는 최소 5글자 이상이어야 합니다.');
      return;
    }
    const token = localStorage.getItem('JwtToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    console.log('productId:', productId);
    console.log('userId:', userId);

    try {
      const response = await axios.post(
        '/api/reviews/add',
        {
          productId: productId,
          userId: userId,
          comment: newComment,
          rating: newRating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setReviews([...reviews, response.data]);
      setNewComment('');
      setNewRating(5);
    } catch (error) {
      console.error('리뷰 추가 중 오류 발생:', error);
      alert('리뷰 추가 중 문제가 발생했습니다.');
    }
  };

  // 리뷰 수정 시작 함수
  const startEditing = (review) => {
    setEditingReview(review.reviewId);
    setEditingComment(review.comment);
    setNewRating(review.rating);
  };

  // 리뷰 수정
  const handleEditReview = async () => {
    if(editingComment.length<5){
      alert('리뷰는 최소 5글자 이상이어야 합니다.');
      return;
    }
    const token = localStorage.getItem('JwtToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await axios.put(
        `/api/reviews/${editingReview}`,
        {
          comment: editingComment,
          rating: newRating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReviews(
        reviews.map((review) =>
          review.reviewId === editingReview ? response.data : review
        )
      );
      setEditingReview(null);
      setEditingComment('');
      setNewRating(5);
    } catch (error) {
      console.error('리뷰 수정 중 오류 발생:', error);
    }
  };

  // 리뷰 삭제
  const handleDeleteReview = async (reviewId) => {
    const token = localStorage.getItem('JwtToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    const confirmDelete = window.confirm('리뷰를 정말 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReviews(reviews.filter((review) => review.reviewId !== reviewId));
    } catch (error) {
      console.error('리뷰 삭제 중 오류 발생:', error);
    }
  };

  return (
    <div className="review-list">
      <h3 className="review-list-title">리뷰 목록</h3>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <ul className="review-list-items">
          {reviews.map((review) => (
            <li key={review.reviewId} className="review-list-item">
              {/* 수정 중인 리뷰일 경우, 텍스트 영역을 보여줌 */}
              {editingReview === review.reviewId ? (
                <textarea
                  className="review-textarea"
                  value={editingComment}
                  onChange={(e) => setEditingComment(e.target.value)}
                />
              ) : (
                <p className="review-comment">댓글: {review.comment}</p>
              )}
              <p className="review-rating">평점: {review.rating} / 5</p>

              {review.userId === userId && (
                <div className="review-actions">
                  {editingReview === review.reviewId ? (
                    <button className="review-submit-button" onClick={handleEditReview}>
                      수정 완료
                    </button>
                  ) : (
                    <button className="review-edit-button" onClick={() => startEditing(review)}>
                      수정
                    </button>
                  )}
                  <button className="review-delete-button" onClick={() => handleDeleteReview(review.reviewId)}>
                    삭제
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <h3 className="review-list-add-title">리뷰 추가</h3>
      <textarea
        className="review-textarea"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="리뷰를 입력하세요"
      />
      <select
        className="review-rating-select"
        value={newRating}
        onChange={(e) => setNewRating(Number(e.target.value))}
      >
        {['★★★★★', '★★★★', '★★★', '★★', '★'].map((rate, index) => (
          <option key={index} value={5 - index}>
            {rate}
          </option>
        ))}
      </select>

      <button className="review-submit-button" onClick={handleAddReview}>리뷰 추가</button>
    </div>
  );
};

export default ReviewList;
