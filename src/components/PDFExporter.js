import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  table: {
    display: 'table',
    width: '100%',
    marginBottom: 20,
  },
  tableRow: {
    display: 'table-row',
  },
  tableCell: {
    display: 'table-cell',
    padding: 5,
    border: '1px solid #ddd',
  },
  tableHeader: {
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5',
  },
});

function PDFExporter({ title, data, type }) {
  const generatePDF = async () => {
    try {
      // Wait for charts to be rendered
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create new PDF instance
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Add title
      doc.setFontSize(24);
      doc.text(title, 15, 20);
      
      // Add date
      const date = new Date().toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      doc.setFontSize(12);
      doc.text(`Generated on: ${date}`, 15, 30);

      // Add content based on type
      if (type === 'contributions') {
        // Add contribution summary
        doc.setFontSize(16);
        doc.text('Contribution Summary', 15, 45);
        
        // Add charts as images
        const charts = document.querySelectorAll('.chart-container');
        let yPosition = 55;
        
        // Process each chart
        for (const chart of charts) {
          const canvas = await html2canvas(chart, {
            scale: 2, // Better quality
            logging: false,
            useCORS: true
          });
          const imgData = canvas.toDataURL('image/png');
          
          // Add chart to PDF
          doc.addImage(imgData, 'PNG', 15, yPosition, 180, 100);
          
          // Add page break if needed
          if (yPosition + 110 > 280) { // Check if we need a new page
            doc.addPage();
            yPosition = 15;
          } else {
            yPosition += 110;
          }
        }

        // Add contribution details table
        doc.setFontSize(14);
        doc.text('Contribution Details', 15, yPosition + 10);
        yPosition += 20;

        const headers = ['Date', 'Chama', 'Amount', 'Status'];
        const rows = data.map(item => [
          item.date,
          item.chama,
          `KSH ${item.amount}`,
          item.status,
        ]);

        // Add table
        doc.autoTable({
          head: [headers],
          body: rows,
          startY: yPosition,
          headStyles: { fillColor: [230, 230, 230] },
          margin: { left: 15, right: 15 },
          styles: {
            fontSize: 8,
            cellPadding: 2
          }
        });
      }

      // Save PDF
      const filename = `${title.replace(/\s+/g, '_')}_${date.replace(/\s+/g, '_')}.pdf`;
      doc.save(filename);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <button
      onClick={generatePDF}
      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-300 transition-all"
    >
      Export to PDF
    </button>
  );
}

export default PDFExporter;
