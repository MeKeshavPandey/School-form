import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '3rem' }}>
      <h1>School Directory App</h1>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
        <Link href="/addschool">
          <button style={{ padding: '1rem 2rem', fontSize: '1.1rem', cursor: 'pointer' }}>
            Add School
          </button>
        </Link>
        <Link href="/showschool">
          <button style={{ padding: '1rem 2rem', fontSize: '1.1rem', cursor: 'pointer' }}>
            View Schools
          </button>
        </Link>
      </div>
    </div>
  );
}
