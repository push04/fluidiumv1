import React, { useState } from 'react';

const questions = [
  { q: 'What does the Bernoulli equation describe?', options: [
      'The relationship between pressure, velocity and height', 'Heat transfer rates', 'Stress in beams', 'Friction in gears'
    ], answer: 0 },
  { q: 'Which parameter indicates laminar or turbulent flow?', options: [
      'Mach number', 'Reynolds number', 'Prandtl number', 'Nusselt number'
    ], answer: 1 }
];

export default function QuizModal(){
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const toggle = () => { setOpen(!open); if(open){ setSelected({}); setSubmitted(false); } };
  const submit = () => setSubmitted(true);
  return (
    <>
      <button onClick={toggle} className="fixed bottom-4 right-4 p-3 rounded-full bg-accent text-white shadow-lg hover:bg-accent-dark">Quiz</button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card-light dark:bg-card-dark rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-lg font-semibold mb-4">Quick Quiz</h2>
            {questions.map((q, idx) => (
              <div key={idx} className="mb-4">
                <p className="font-medium mb-2">{q.q}</p>
                {q.options.map((opt, oIdx) => (
                  <label key={oIdx} className="block mb-1 cursor-pointer">
                    <input type="radio" name={`q${idx}`} checked={selected[idx] === oIdx} onChange={()=>setSelected({ ...selected, [idx]: oIdx })} className="mr-2" />
                    {opt}
                  </label>
                ))}
                {submitted && (
                  <p className={`mt-1 text-sm ${selected[idx] === q.answer ? 'text-green-600' : 'text-red-500'}`}>
                    {selected[idx] === q.answer ? 'Correct!' : `Incorrect. Correct answer: ${q.options[q.answer]}`}
                  </p>
                )}
              </div>
            ))}
            <div className="flex justify-end space-x-2">
              {!submitted && <button onClick={submit} className="px-4 py-2 bg-primary text-white rounded">Submit</button>}
              <button onClick={toggle} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded text-gray-800 dark:text-gray-100">Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
