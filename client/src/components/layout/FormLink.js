import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FormLink = () => {
  const [formData, setFormData] = useState({
    day: '',
    formLink: '',
  });
  const { day, formLink } = formData;

  const [link, setLink] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for fetching data
  const [submitting, setSubmitting] = useState(false); // Loading state for form submission

  useEffect(() => {
    document.title = "Upload Form";

    const fetchLink = async () => {
      setLoading(true); // Set loading to true at the start of fetching
      try {
        const res = await axios.get('https://code-of-the-day-2k24-25-backend.onrender.com/api/admin/form');
        setLink(res.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchLink();
  }, [formData]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); // Set submitting to true when starting submission
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const body = JSON.stringify({ day, formLink });

    try {
      await axios.post('https://code-of-the-day-2k24-25-backend.onrender.com/api/admin/form', body, config);
      setFormData({ day: '', formLink: '' }); // Reset form data after successful submission
    } catch (err) {
      console.log(err.message);
    } finally {
      setSubmitting(false); // Set submitting to false after submission
    }
  };

  const fixedInputClass =
    'rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm';

  return (
    <>
      <div className='pt-24'>
        <form className='mt-8 space-y-6' onSubmit={onSubmit}>
          <div className='-space-y-px'>
            <div className='my-5 mx-5'>
              <input
                type='number'
                placeholder='Day'
                name='day'
                value={day}
                required
                onChange={onChange}
                className={fixedInputClass}
              />
            </div>
            <div className='my-5 mx-5'>
              <input
                type='text'
                placeholder='Form Link'
                name='formLink'
                value={formLink}
                required
                className={fixedInputClass}
                onChange={onChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 text-sm font-medium rounded-md text-white bg-gradient-to-br from-indigo-600 to-purple-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:shadow-lg hover:shadow-white transition-shadow duration-300"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>

      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-4'>All Forms</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className='overflow-x-auto'>
            <table className='min-w-full table-auto border-collapse border border-gray-200'>
              <thead>
                <tr>
                  <th className='px-4 py-2 bg-gray-100 border border-gray-200'>
                    Day
                  </th>
                  <th className='px-4 py-2 bg-gray-100 border border-gray-200'>
                    Form Link
                  </th>
                </tr>
              </thead>
              <tbody>
                {link.map((point, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                  >
                    <td className='px-4 py-2 border border-gray-200'>
                      {point.day}
                    </td>
                    <td className='px-4 py-2 border border-gray-200'>
                      {point.formLink}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default FormLink;
