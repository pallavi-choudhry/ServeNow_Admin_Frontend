import {useState} from 'react';

import React from 'react';
function PlatformManagement({ faqs, setFaqs }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const addFaq = () => {
    if (question && answer) {
      setFaqs([...faqs, { id: faqs.length + 1, question, answer }]);
      setQuestion('');
      setAnswer('');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Platform Management</h2>
      <h3 className="text-lg font-semibold mb-2">Manage FAQs</h3>
      <ul className="mb-4">
        {faqs.map((faq) => (
          <li key={faq.id} className="mb-2">
            <span>
              {faq.question} - {faq.answer}
            </span>
            <button
              className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => setFaqs(faqs.filter((f) => f.id !== faq.id))}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="FAQ Question"
          className="border p-2 rounded"
        />
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="FAQ Answer"
          className="border p-2 rounded"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addFaq}>
          Add FAQ
        </button>
      </div>
    </div>
  );
}

export default PlatformManagement;
