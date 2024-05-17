import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './PostReview.module.css';

function PostReview() {
  const { bookingId } = useParams();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!review) {
      setError('Review cannot be empty');
      return;
    }
    if (!rating || rating < 1 || rating > 5) {
      setError('Rating must be between 1 and 5');
      return;
    }

    const userId = sessionStorage.getItem('user_id');
    const data = {
      userid: parseInt(userId),
      booking_id: bookingId,
      review,
      rating: parseInt(rating)
    };

    try {
      const response = await axios.post('http://localhost:3000/api/user/dashboard/booking/past-bookings/add-review', data, {
        withCredentials: true
      });

      if (response.status === 200) {
        alert('Review posted successfully!');
        navigate('/user-dashboard');
      } else {
        setError('Failed to post review');
      }
    } catch (error) {
      console.error('Error posting review:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Post Review</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="review">Review:</label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className={error ? styles.error : ''}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            className={error ? styles.error : ''}
          />
        </div>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <button type="submit" className={styles.submitButton}>Submit Review</button>
      </form>
    </div>
  );
}

export default PostReview;
