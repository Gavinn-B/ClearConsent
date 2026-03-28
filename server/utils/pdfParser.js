import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

export async function extractTextFromPdf(buffer) {
    try {
        // pdfjs-dist expects a Uint8Array
        const uint8Array = new Uint8Array(buffer); // convert Buffer to Uint8Array
        // load the PDF doc from the binary data 
        const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
        const pdf = await loadingTask.promise;
        
        let fullText = '';
    
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const pageText = content.items.map(item => item.str).join(' ');

            // append each page's text with a newline separator 
            fullText += pageText + '\n';
        }
        
        return fullText;
    } catch (error) {
        console.error('Error parsing PDF:', error);
        throw error;
    }
}