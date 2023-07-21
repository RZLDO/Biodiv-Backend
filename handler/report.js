const connection = require('../service/databaseConnection');

const fs = require('fs');
const PDFDocument = require('pdfkit-table');

const getReportClass = async (request, h) => {
  const doc = new PDFDocument();
  // Replace with the path to your header image
  const headerImagePath = './asset/LogoBiodiversity.png';

  const headerImage = fs.readFileSync(headerImagePath);

  doc.image(headerImage, 50, 50, { width: 50, align: 'center' });

  doc.moveTo(50, 110).lineTo(550, 110).stroke();
  const titleText = 'Biodiv Informatics';
  const subtitleText = 'Laporan Bulanan';
  doc.moveDown(5); // Replace with your desired title text
  const table = {
    title: 'Log Activity',
    subtitle: 'Admin Activity',
    headers: ['Activity', 'Description', 'institusi'],
    rows: [
      ['Switzerland', '12%', '+1.12%'],
      ['France', '67%', '-0.98%'],
      ['England', '33%', '+4.44%'],
    ],
  };

  const availableWidth = doc.page.width - doc.page.margins.left + 20 - doc.page.margins.right + 20;
  doc.table(table, {
    width: availableWidth,
  });

  doc.font('Helvetica-Bold').fontSize(18).text(titleText, 130, 60);
  doc.font('Helvetica').fontSize(14).text(subtitleText, 130, 80);
  doc.end();
  const response = h.response(doc);
  response.header('Content-Type', 'application/pdf');
  return response;
};

module.exports = getReportClass;
