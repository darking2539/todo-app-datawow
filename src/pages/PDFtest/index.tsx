import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { pdfjs } from 'react-pdf';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PDFViewerWithPassword: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [pdfData, setPdfData] = useState<any>(null);
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);
        setPdfData(null); // Reset PDF data when a new file is selected
        setError('');
    };

    const handlePasswordSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        
        if (!file) {
            setError('Please select a file.');
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = async () => {
            try {
                const loadingTask = pdfjs.getDocument({ data: new Uint8Array(fileReader.result as ArrayBuffer), password });
                const pdf = await loadingTask.promise;
                setPdfData(pdf);
            } catch (error: any) {
                if (error.name === 'PasswordException' && error.code === pdfjs.PasswordResponses.INCORRECT_PASSWORD) {
                    setError('Incorrect password, please try again.');
                } else {
                    setError('An error occurred while opening the PDF.');
                }
            }
        };
        fileReader.readAsArrayBuffer(file);
    };

    return (
        <div>
            {!pdfData ? (
                <div>
                    <input 
                        type="file" 
                        accept="application/pdf" 
                        onChange={handleFileChange} 
                    />
                    <form onSubmit={handlePasswordSubmit}>
                        <label>
                            Enter Password:
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </label>
                        <button type="submit">Open PDF</button>
                    </form>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                </div>
            ) : (
                <h1 style={{color: "red"}}>Password Correct!!</h1>
            )}
        </div>
    );
};

export default PDFViewerWithPassword;
