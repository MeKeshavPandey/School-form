import { useEffect, useState } from 'react';
import styles from '../styles/ShowSchools.module.css';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const response = await fetch('/api/schools');
      const data = await response.json();
      
      if (response.ok) {
        setSchools(data);
      } else {
        setError('Failed to fetch schools');
      }
    } catch (err) {
      setError('Error loading schools');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading schools...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>School Directory</h1>
      
      {schools.length === 0 ? (
        <p className={styles.noSchools}>No schools found. Add your first school!</p>
      ) : (
        <div className={styles.grid}>
          {schools.map((school) => (
            <div key={school.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                {school.image ? (
                  <img src={school.image} alt={school.name} className={styles.image} />
                ) : (
                  <div className={styles.placeholderImage}>No Image</div>
                )}
              </div>
              <div className={styles.cardContent}>
                <h2 className={styles.schoolName}>{school.name}</h2>
                <p className={styles.address}>{school.address}</p>
                <p className={styles.city}>{school.city}, {school.state}</p>
                <div className={styles.contact}>
                  <span>📞 {school.contact}</span>
                  <span>✉️ {school.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}