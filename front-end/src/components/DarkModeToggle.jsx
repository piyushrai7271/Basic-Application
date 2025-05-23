import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const theme = isDark ? 'dark' : 'light';
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      style={{
        marginRight: '8px',
        padding: '6px 12px',
        backgroundColor: isDark ? '#555' : '#ddd',
        color: isDark ? '#fff' : '#000',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
