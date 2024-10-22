import axios from 'axios';
import { oicDownloadURL } from '../../constant';
import { useRef } from 'react';

const MyComponent: React.FC = () => {

  const input = useRef<HTMLInputElement>(null);

  const fetchPDF = async () => {
    try {
      const response = await axios.get<Blob>(
        `${oicDownloadURL}/${input?.current?.value}`,
        {
          headers: {
            'watermark-id': '20',
          },
          responseType: 'blob', // Get binary data (Blob)
        }
      );

      // Create a URL for the returned PDF Blob
      const fileURL = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));

      // Create a temporary link element to trigger download/open
      const link = document.createElement('a');
      link.href = fileURL;
      link.target = '_blank'; // Open in a new tab
      link.rel = 'noopener noreferrer'; // Recommended for security

      // Programmatically trigger the click to open the PDF
      link.click();

      // Clean up the URL object after the file is opened
      window.URL.revokeObjectURL(fileURL);

    } catch (error) {
      console.error('Error fetching PDF', error);
    }
  };

  return (
    <div>
      <h1>PDF Viewer</h1>
      <input type='text' ref={input} />
      <button onClick={fetchPDF}>Preview</button>
    </div>
  );
};

export default MyComponent;
