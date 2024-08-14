import React, { useState, FormEvent, ChangeEvent, useRef } from 'react';
import { pdfjs } from 'react-pdf';
//import { PDFDocument } from 'pdf-lib';
import { PDFDocument } from'@cantoo/pdf-lib';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

async function unlockPdf(pdfBlob: Blob, password: string): Promise<Blob> {
    // Convert Blob to ArrayBuffer
    const arrayBuffer = await pdfBlob.arrayBuffer();
  
    // Load the PDF
    const pdfDoc = await PDFDocument.load(arrayBuffer, { password: password });
  
    // Serialize the PDF to bytes
    const pdfBytes = await pdfDoc.save();
  
    // Convert the bytes to a Blob
    const unlockedBlob = new Blob([pdfBytes], { type: 'application/pdf' });
  
    return unlockedBlob;
}

const PDFViewerWithPassword: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);
    const [pdfDectyptData, setPdfDectyptData] = useState<ArrayBuffer | null>(null);
    const [blobData, setBlobData] = useState<Blob | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

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
                const pdfBytes = await pdf.getData();
                //previewOnly
                renderPdfOnCanvas(pdf);
                setPdfData(pdfBytes);

            } catch (error: any) {
                if (error.name === 'PasswordException' && error.code === pdfjs.PasswordResponses.INCORRECT_PASSWORD) {
                    setError('Incorrect password, please try again.');
                } else {
                    console.log(error);
                    setError(error.message || 'An error occurred while loading the PDF.');
                }
            }
        };

        fileReader.readAsArrayBuffer(file);

    };

    const downloadFileHandle = async () => {
        if (!pdfData) {
            setError('No file loaded or decrypted.');
            return;
        }
        try {
            const blob = new Blob([pdfData], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'DecryptedFile.pdf');

            // Append to html link element page
            document.body.appendChild(link);

            // Start download
            link.click();
        } catch (error) {
            setError('An error occurred while downloading the PDF.');
        }
    };

    const downloadFileDectyptHandle = async () => {
        if (!pdfDectyptData) {
            setError('No file loaded or decrypted.');
            return;
        }
        try {
            const blob = new Blob([pdfDectyptData], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'DecryptedFile.pdf');

            // Append to html link element page
            document.body.appendChild(link);

            // Start download
            link.click();
        } catch (error) {
            setError('An error occurred while downloading the PDF.');
        }
    };

    const downloadFileCryptoHandle = async () => {
        if (!pdfData) {
            setError('No file loaded or decrypted.');
            return;
        }
        try {
            const blob = new Blob([pdfData], { type: 'application/pdf' });
            const decryptBlob = await unlockPdf(blob, password);
            const url = window.URL.createObjectURL(decryptBlob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'FileCrypto.pdf');

            // Append to html link element page
            document.body.appendChild(link);

            // Start download
            link.click();
        } catch (error) {
            setError('An error occurred while downloading the PDF.');
        }
    };

    const downloadBlobHandle = async () => {
        if (!blobData) {
            setError('No file loaded or decrypted.');
            return;
        }
        try {
            const url = window.URL.createObjectURL(blobData as Blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'test.png');

            // Append to html link element page
            document.body.appendChild(link);

            // Start download
            link.click();
        } catch (error) {
            setError('An error occurred while downloading the PDF.');
        }
    };

    const renderPdfOnCanvas = async (pdf: any) => {
        const page = await pdf.getPage(1); // Render the first page
        const scale = 1;
        const viewport = page.getViewport({ scale });

        const canvas = canvasRef.current!;
        const context = canvas.getContext('2d')!;
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        await page.render(renderContext).promise;

        canvas.toBlob(async (blob) => {
            setBlobData(blob);
            changePNGtoPdf(blob);
        });
    };

    const changePNGtoPdf = async (blob: Blob | null) => {

        var arrayBuffers: ArrayBuffer;
        var fileReader = new FileReader();
        fileReader.onload = async function (event) {
            arrayBuffers = event?.target?.result as ArrayBuffer;
            const pdfDoc = await PDFDocument.create();
            const pngImage = await pdfDoc.embedPng(arrayBuffers);
            const page = pdfDoc.addPage();
            const { width, height } = pngImage.scale(1);
            page.setSize(width, height);
            page.drawImage(pngImage, {
                x: 0,
                y: 0,
                width,
                height,
            });
            const pdfBytes = await pdfDoc.save();
            setPdfDectyptData(pdfBytes);
            console.log(pdfBytes);
        };
        fileReader.readAsArrayBuffer(blob as Blob);
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
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h1 style={{ color: "red" }}>Password Correct!!</h1>
                    <button style={{marginTop: 10}} onClick={downloadFileHandle}>Download original pdf</button>
                    <button style={{marginTop: 10}} onClick={downloadFileDectyptHandle}>Download decrypted pdf</button>
                    <button style={{marginTop: 10}} onClick={downloadFileCryptoHandle}>Download Crypto pdf</button>
                    <button style={{marginTop: 10}} onClick={downloadBlobHandle}>Download images (PNG)</button>
                    <h1 style={{ color: "red" }}>Preview</h1>
                    <canvas ref={canvasRef}></canvas>
                </div>
            )}
        </div>
    );
};

export default PDFViewerWithPassword;
