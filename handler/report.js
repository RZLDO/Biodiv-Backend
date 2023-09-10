const connection = require('../service/databaseConnection');

const fs = require('fs');
const PDFDocument = require('pdfkit-table');

const getReportPenyebaran = async (request, h) => {
  const doc = new PDFDocument();
  // Replace with the path to your header image
  const headerImagePath = './asset/LogoBiodiversity.png';

  const headerImage = fs.readFileSync(headerImagePath);

  doc.image(headerImage, 50, 50, { width: 50, align: 'center' });

  doc.moveTo(50, 110).lineTo(550, 110).stroke();
  const titleText = 'Biodiv Informatics';
  const subtitleText = 'Laporan Spesies';
  const [result] = await (await connection).execute('SELECT tb_lokasi.*, tb_spesies.nama_umum AS nama_spesies FROM tb_lokasi JOIN tb_spesies ON tb_lokasi.id_spesies = tb_spesies.id_spesies ORDER BY nama_spesies');
  doc.moveDown(5);
  const table = {
    title: 'Data Sebaran Makhluk Hidup',
    subtitle: 'Data Sebaran Per Daerah',
    headers: ['Nama Spesies', 'Lokasi Penyebaran', 'Jumlah'],
    rows: [],
  };
  result.forEach((result) => {
    const row = [result.nama_spesies, result.nama_lokasi, result.jumlah];
    table.rows.push(row);
  });

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

const getReportSpesies = async (request, h) => {
  const doc = new PDFDocument();
  // Replace with the path to your header image
  const headerImagePath = './asset/LogoBiodiversity.png';

  const headerImage = fs.readFileSync(headerImagePath);

  doc.image(headerImage, 50, 50, { width: 50, align: 'center' });

  doc.moveTo(50, 110).lineTo(550, 110).stroke();
  const titleText = 'Biodiv Informatics';
  const subtitleText = 'Laporan Sebaran';
  const [result] = await (await connection).execute('SELECT tb_spesies.*, tb_genus.nama_latin AS nama_genus FROM tb_spesies JOIN tb_genus ON tb_spesies.id_genus = tb_genus.id_genus ORDER BY nama_genus');
  doc.font('Helvetica-Bold').fontSize(18).text(titleText, 130, 60);
  doc.font('Helvetica').fontSize(14).text(subtitleText, 130, 80);
  doc.moveDown(2);
  const table = {
    title: 'Data Spesies',
    subtitle: 'Data Spesies Dan Genus nya',
    headers: ['Nama Spesies', 'Nama Genus', 'Habitat', 'Keterangan'],
    rows: [],
  };
  result.forEach((result) => {
    const row = [result.nama_umum, result.nama_genus, result.habitat, result.keterangan];
    table.rows.push(row);
  });

  const availableWidth = doc.page.width - doc.page.margins.left - 40 - doc.page.margins.right - 20;

  // Mengatur margin kanan ke nol
  doc.page.margins.right = 0;

  doc.table(table, {
    width: availableWidth,
  });
  doc.end();
  const response = h.response(doc);
  response.header('Content-Type', 'application/pdf');
  return response;
};

module.exports = [getReportPenyebaran, getReportSpesies];
