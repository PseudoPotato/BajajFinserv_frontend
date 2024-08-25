import { useState } from 'react';
import Select from 'react-select';

export default function Home() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleJsonInputChange = (e) => {
    setJsonInput(e.target.value);
    setError('');
  };

  const validateJson = (input) => {
    try {
      JSON.parse(input);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateJson(jsonInput)) {
      setError('Invalid JSON input');
      return;
    }

    const parsedData = JSON.parse(jsonInput);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedData),
      });

      const data = await res.json();
      setResponse(data);
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch response from API');
    }
  };

  const handleOptionChange = (selected) => {
    setSelectedOptions(selected ? selected.map(option => option.value) : []);
  };

  const filterResponse = () => {
    if (!response) return {};

    const filteredResponse = {};
    if (selectedOptions.includes('Alphabets')) {
      filteredResponse.alphabets = response.alphabets;
    }
    if (selectedOptions.includes('Numbers')) {
      filteredResponse.numbers = response.numbers;
    }
    if (selectedOptions.includes('Highest lowercase alphabet')) {
      filteredResponse.highest_lowercase_alphabet =
        response.highest_lowercase_alphabet;
    }
    return filteredResponse;
  };

  const options = [
    { value: 'Alphabets', label: 'Alphabets' },
    { value: 'Numbers', label: 'Numbers' },
    { value: 'Highest lowercase alphabet', label: 'Highest lowercase alphabet' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">API Input</h1>
      <textarea
        className="w-full max-w-lg p-2 border rounded mb-4"
        rows="4"
        value={jsonInput}
        onChange={handleJsonInputChange}
        placeholder='{"data":["M","1","334","4","B"]}'
      />
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded mb-4"
        onClick={handleSubmit}
      >
        Submit
      </button>
      {isSubmitted && (
        <div className="mb-4 w-full max-w-lg">
          <label className="block text-xl mb-2">Multi Filter</label>
          <Select
            isMulti
            options={options}
            onChange={handleOptionChange}
            className="basic-single"
            classNamePrefix="select"
          />
        </div>
      )}
      {response && (
        <div className="w-full max-w-lg bg-white p-4 border rounded mt-4">
          <h2 className="text-lg font-semibold mb-2">Filtered Response</h2>
          <pre className="whitespace-pre-wrap text-sm text-gray-700">
            {JSON.stringify(filterResponse(), null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}