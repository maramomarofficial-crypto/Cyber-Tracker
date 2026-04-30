import { useState, useEffect } from 'react';

export default function QuickNote() {
  const [note, setNote] = useState('');

  useEffect(() => {
    setNote(localStorage.getItem('my_note') || '');
  }, []);

  const save = (v) => {
    setNote(v);
    localStorage.setItem('my_note', v);
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Quick Note 📝</h3>
      <textarea
        value={note}
        onChange={(e) => save(e.target.value)}
        placeholder="Write something to remember..."
        className="w-full h-32 p-4 bg-[#F1F5F9] rounded-2xl outline-none resize-none text-gray-700"
      />
    </div>
  );
}