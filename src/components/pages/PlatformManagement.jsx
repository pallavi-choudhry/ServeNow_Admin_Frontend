import { useState } from 'react';
import React from 'react';

function PlatformManagement({ faqs, setFaqs }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editingFaq, setEditingFaq] = useState(null); // Track FAQ being edited
  const [editQuestion, setEditQuestion] = useState('');
  const [editAnswer, setEditAnswer] = useState('');

  // Add a new FAQ
  const addFaq = () => {
    if (question && answer) {
      setFaqs([...faqs, { id: faqs.length + 1, question, answer }]);
      setQuestion('');
      setAnswer('');
    }
  };

  // Start editing an FAQ
  const startEditing = (faq) => {
    setEditingFaq(faq.id);
    setEditQuestion(faq.question);
    setEditAnswer(faq.answer);
  };

  // Save edited FAQ
  const saveEdit = (id) => {
    if (editQuestion && editAnswer) {
      setFaqs(
        faqs.map((faq) =>
          faq.id === id ? { ...faq, question: editQuestion, answer: editAnswer } : faq
        )
      );
      setEditingFaq(null);
      setEditQuestion('');
      setEditAnswer('');
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingFaq(null);
    setEditQuestion('');
    setEditAnswer('');
  };

  // Delete an FAQ
  const deleteFaq = (id) => {
    setFaqs(faqs.filter((f) => f.id !== id));
  };

  return (
    <div className="mt-6 px-6">
      {/* Removed <h3>Manage FAQs</h3> to prevent double heading */}
      <div className="mb-6">
        <h4 className="text-xl font-semibold mb-4">Add New FAQ</h4>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="FAQ Question"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="FAQ Answer"
            className="border p-2 rounded w-full"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={addFaq}
          >
            Add FAQ
          </button>
        </div>
      </div>

      {(!faqs || !Array.isArray(faqs) || faqs.length === 0) ? (
        <p className="text-gray-500">No FAQs available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="text-left p-4 font-semibold">Question</th>
                <th className="text-left p-4 font-semibold">Answer</th>
                <th className="text-left p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {faqs.map((faq) => (
                <tr key={faq.id} className="border-b">
                  {editingFaq === faq.id ? (
                    <>
                      <td className="p-4">
                        <input
                          type="text"
                          value={editQuestion}
                          onChange={(e) => setEditQuestion(e.target.value)}
                          className="border p-2 rounded w-full"
                        />
                      </td>
                      <td className="p-4">
                        <input
                          type="text"
                          value={editAnswer}
                          onChange={(e) => setEditAnswer(e.target.value)}
                          className="border p-2 rounded w-full"
                        />
                      </td>
                      <td className="p-4">
                        <button
                          className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600"
                          onClick={() => saveEdit(faq.id)}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-4">{faq.question}</td>
                      <td className="p-4">{faq.answer}</td>
                      <td className="p-4">
                        <button
                          className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                          onClick={() => startEditing(faq)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                          onClick={() => deleteFaq(faq.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PlatformManagement;