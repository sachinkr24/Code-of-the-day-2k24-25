import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FormLink = () => {
  useEffect(() => {
    document.title = "Upload Form";
  }, []);
  const [formData, setFormData] = useState({
    day: '',
    formLink: '',
  });

  const { day, formLink } = formData;
  const [link, setLink] = useState([]);

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const res = await axios.get('https://cod2k24-mnnit.onrender.com/api/admin/form');
        setLink(res.data);
      } catch (error) {
        console.log(error.msg);
      }
    };
    fetchLink();
  }, [formData]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('here is the fp');
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ day, formLink });
    try {
      console.log(body);
      await axios.post('https://cod2k24-mnnit.onrender.com/api/admin/form', body, config);
    } catch (err) {
      console.log('dfasdfasdfasdfsdf');
      
      console.log(err.msg);
    }
  };
  const fixedInputClass =
    'rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm';

  return (
    <>
      <div className='pt-24'>
        <form className='mt-8 space-y-6' onSubmit={(e) => onSubmit(e)}>
          <div className='-space-y-px'>
            <div className='my-5 mx-5'>
              <input
                type='number'
                placeholder='Day'
                name='day'
                value={day}
                minLength={6}
                required
                onChange={(e) => onChange(e)}
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
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>

          {/* //Button */}
          <>
            {
              <button
                type='submit'
                className='w-1/2 mx-auto flex justify-center py-2 px-4  text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 mt-10'
                value='FormLink'
              >
                {' '}
                Submit
              </button>
            }
          </>
        </form>
      </div>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-4'>All Forms</h1>
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
      </div>
    </>
  );
};

export default FormLink;
