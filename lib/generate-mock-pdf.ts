// Simple PDF generation for mock reports
// Uses text-based PDF format for minimal dependencies

export function generateSimplePDF(domain: string, data: any): Buffer {
  const lines: string[] = [];
  
  lines.push('%PDF-1.4');
  lines.push('1 0 obj');
  lines.push('<<');
  lines.push('/Type /Catalog');
  lines.push('/Pages 2 0 R');
  lines.push('>>');
  lines.push('endobj');
  lines.push('2 0 obj');
  lines.push('<<');
  lines.push('/Type /Pages');
  lines.push('/Kids [3 0 R]');
  lines.push('/Count 1');
  lines.push('>>');
  lines.push('endobj');
  lines.push('3 0 obj');
  lines.push('<<');
  lines.push('/Type /Page');
  lines.push('/Parent 2 0 R');
  lines.push('/Resources 4 0 R');
  lines.push('/MediaBox [0 0 612 792]');
  lines.push('/Contents 5 0 R');
  lines.push('>>');
  lines.push('endobj');
  lines.push('4 0 obj');
  lines.push('<<');
  lines.push('/Font <<');
  lines.push('/F1 <<');
  lines.push('/Type /Font');
  lines.push('/Subtype /Type1');
  lines.push('/BaseFont /Helvetica');
  lines.push('>>');
  lines.push('>>');
  lines.push('>>');
  lines.push('endobj');
  
  const timestamp = new Date().toLocaleString();
  const content = `BT
/F1 16 Tf
50 750 Td
(Security Assessment Report) Tj
0 -30 Td
/F1 12 Tf
(Domain: ${domain}) Tj
0 -20 Td
(Generated: ${timestamp}) Tj
0 -40 Td
/F1 14 Tf
(Scan Results) Tj
/F1 10 Tf
0 -25 Td
(SSL/TLS Certificate Analysis:) Tj
0 -15 Td`;

  const stream = content;
  const streamLength = Buffer.byteLength(stream);
  
  lines.push('5 0 obj');
  lines.push('<<');
  lines.push(`/Length ${streamLength}`);
  lines.push('>>');
  lines.push('stream');
  lines.push(stream);
  lines.push('endstream');
  lines.push('endobj');
  lines.push('xref');
  lines.push('0 6');
  lines.push('0000000000 65535 f');
  lines.push('0000000009 00000 n');
  lines.push('0000000058 00000 n');
  lines.push('0000000115 00000 n');
  lines.push('0000000244 00000 n');
  lines.push('0000000370 00000 n');
  lines.push('trailer');
  lines.push('<<');
  lines.push('/Size 6');
  lines.push('/Root 1 0 R');
  lines.push('>>');
  lines.push('startxref');
  lines.push('0');
  lines.push('%%EOF');

  const pdfContent = lines.join('\n');
  return Buffer.from(pdfContent, 'utf-8');
}

// Create a proper PDF format report
export function generateReportPDF(domain: string, scanData: any): Buffer {
  const pdfLines: string[] = [];
  
  // PDF Header
  pdfLines.push('%PDF-1.4');
  pdfLines.push('1 0 obj');
  pdfLines.push('<< /Type /Catalog /Pages 2 0 R >>');
  pdfLines.push('endobj');
  
  pdfLines.push('2 0 obj');
  pdfLines.push('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  pdfLines.push('endobj');
  
  pdfLines.push('3 0 obj');
  pdfLines.push('<<');
  pdfLines.push('/Type /Page');
  pdfLines.push('/Parent 2 0 R');
  pdfLines.push('/MediaBox [0 0 612 792]');
  pdfLines.push('/Contents 4 0 R');
  pdfLines.push('/Resources << /Font << /F1 5 0 R >> >>');
  pdfLines.push('>>');
  pdfLines.push('endobj');
  
  pdfLines.push('5 0 obj');
  pdfLines.push('<<');
  pdfLines.push('/Type /Font');
  pdfLines.push('/Subtype /Type1');
  pdfLines.push('/BaseFont /Helvetica');
  pdfLines.push('>>');
  pdfLines.push('endobj');
  
  // Create content stream with actual data
  const reportText = buildReportText(domain, scanData);
  const contentStream = generatePDFContent(reportText);
  
  const contentLength = contentStream.length;
  pdfLines.push('4 0 obj');
  pdfLines.push(`<< /Length ${contentLength} >>`);
  pdfLines.push('stream');
  pdfLines.push(contentStream);
  pdfLines.push('endstream');
  pdfLines.push('endobj');
  
  // Build xref table
  const xrefOffsets: number[] = [];
  let currentOffset = 0;
  const pdfStart = pdfLines.join('\n');
  
  // Calculate offsets properly
  let offset = '%PDF-1.4\n'.length;
  xrefOffsets.push(offset);
  offset += '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n'.length;
  xrefOffsets.push(offset);
  offset += '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n'.length;
  xrefOffsets.push(offset);
  offset += '3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/MediaBox [0 0 612 792]\n/Contents 4 0 R\n/Resources << /Font << /F1 5 0 R >> >>\n>>\nendobj\n'.length;
  xrefOffsets.push(offset);
  offset += `4 0 obj\n<< /Length ${contentLength} >>\nstream\n${contentStream}\nendstream\nendobj\n`.length;
  xrefOffsets.push(offset);
  
  pdfLines.push('xref');
  pdfLines.push('0 6');
  pdfLines.push('0000000000 65535 f ');
  xrefOffsets.forEach(pos => {
    pdfLines.push(`${String(pos).padStart(10, '0')} 00000 n `);
  });
  
  pdfLines.push('trailer');
  pdfLines.push('<< /Size 6 /Root 1 0 R >>');
  pdfLines.push('startxref');
  pdfLines.push(String(offset + `5 0 obj\n<<\n/Type /Font\n/Subtype /Type1\n/BaseFont /Helvetica\n>>\nendobj\n`.length));
  pdfLines.push('%%EOF');
  
  const pdfContent = pdfLines.join('\n');
  return Buffer.from(pdfContent, 'utf-8');
}

function buildReportText(domain: string, scanData: any): string {
  const timestamp = new Date().toLocaleString();
  
  let text = `SECURITY ASSESSMENT REPORT\n`;
  text += `Domain: ${domain}\n`;
  text += `Generated: ${timestamp}\n`;
  text += `\nSSL/TLS ANALYSIS:\n`;
  
  if (scanData.ssl) {
    Object.entries(scanData.ssl).forEach(([key, val]: any) => {
      text += `  ${key}: ${val.status} - ${val.message}\n`;
    });
  }
  
  text += `\nSECURITY HEADERS:\n`;
  if (scanData.headers) {
    Object.entries(scanData.headers).forEach(([key, val]: any) => {
      text += `  ${key}: ${val.status} - ${val.message}\n`;
    });
  }
  
  text += `\nPORT SCAN:\n`;
  if (scanData.ports) {
    Object.entries(scanData.ports).forEach(([port, status]: any) => {
      text += `  Port ${port}: ${status}\n`;
    });
  }
  
  text += `\nSUBDOMAINS:\n`;
  if (scanData.subdomains) {
    Object.entries(scanData.subdomains).forEach(([subdomain, status]: any) => {
      text += `  ${subdomain}: ${status}\n`;
    });
  }
  
  return text;
}

function generatePDFContent(text: string): string {
  let content = 'BT\n/F1 12 Tf\n50 750 Td\n';
  
  const lines = text.split('\n');
  lines.forEach(line => {
    const escapedLine = line.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    content += `(${escapedLine}) Tj\n0 -15 Td\n`;
  });
  
  content += 'ET';
  return content;
}
