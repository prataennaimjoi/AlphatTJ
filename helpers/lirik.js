
module.exports = (ชื่อ) => {
  const Nightmare = ต้องการ ('ฝันร้าย');
  const nightmare = ฝันร้าย ({ แสดง: จริง });
  ถ้า(!หัวเรื่อง) {
    ส่งคืน 'กรุณาใส่ชื่อ';
  }
  ให้ lirik = 'lirik '+process.argv[2];
  คืนสัญญาใหม่ ((แก้ไข, ปฏิเสธ) => {
    ฝันร้าย
      .goto(`https://www.google.com/search?q=${lirik.replace(/ /g,'+')}`)
      .wait('#resultStats')
      .click('h3.r a')
      .evaluate(() => document.querySelectorAll('.col-lirik.lyrics-body')[0].innerText)
      .จบ()
      .then((dataLyrics) => {
        แก้ไข (dataLyrics);
        กลับ;
      })
      .catch ((ข้อผิดพลาด) => {
        ปฏิเสธ ('การค้นหาล้มเหลว');
        ส่งคืน 'การค้นหาล้มเหลว:' ข้อผิดพลาด;
      });
  })
}