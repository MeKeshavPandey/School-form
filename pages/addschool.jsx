import { useForm } from 'react-hook-form';
import { useState } from 'react';
import styles from '../styles/AddSchool.module.css';

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('address', data.address);
      formData.append('city', data.city);
      formData.append('state', data.state);
      formData.append('contact', data.contact);
      formData.append('email', data.email);
      
      if (data.image[0]) {
        formData.append('image', data.image[0]);
      }

      const response = await fetch('/api/schools', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('School added successfully!');
        reset();
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage('Failed to add school. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Add New School</h1>
        
        {message && (
          <div className={message.includes('Error') ? styles.error : styles.success}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label>School Name *</label>
            <input
              type="text"
              {...register('name', { required: 'School name is required' })}
              className={errors.name ? styles.inputError : ''}
            />
            {errors.name && <span className={styles.errorText}>{errors.name.message}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Address *</label>
            <input
              type="text"
              {...register('address', { required: 'Address is required' })}
              className={errors.address ? styles.inputError : ''}
            />
            {errors.address && <span className={styles.errorText}>{errors.address.message}</span>}
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>City *</label>
              <input
                type="text"
                {...register('city', { required: 'City is required' })}
                className={errors.city ? styles.inputError : ''}
              />
              {errors.city && <span className={styles.errorText}>{errors.city.message}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>State *</label>
              <input
                type="text"
                {...register('state', { required: 'State is required' })}
                className={errors.state ? styles.inputError : ''}
              />
              {errors.state && <span className={styles.errorText}>{errors.state.message}</span>}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Contact Number *</label>
              <input
                type="text"
                {...register('contact', {
                  required: 'Contact number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Contact must be 10 digits'
                  }
                })}
                className={errors.contact ? styles.inputError : ''}
              />
              {errors.contact && <span className={styles.errorText}>{errors.contact.message}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>Email *</label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className={errors.email ? styles.inputError : ''}
              />
              {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>School Image</label>
            <input
              type="file"
              accept="image/*"
              {...register('image')}
            />
          </div>

          <button type="submit" disabled={loading} className={styles.submitBtn}>
            {loading ? 'Adding School...' : 'Add School'}
          </button>
        </form>
      </div>
    </div>
  );
}