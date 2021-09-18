const utf8 = ต้องการ ('utf8');
const RSA = ต้องการ ('node-bignumber');

คลาส PinVerifier {
  ตัวสร้าง (id, รหัสผ่าน) {
    this.id = id;
    this.password = รหัสผ่าน;
  }

  getRSACrypto (json) {
    const rsa = ใหม่ RSA.Key();
    const chr = String.fromCharCode;
    const sessionKey = json.sessionKey;
    ข้อความ const =
      utf8.encode(chr(sessionKey.length) +
      sessionKey + chr(this.id.length) +
      this.id + chr(this.password.length) + this.password);
    rsa.setPublic(json.nvalue, json.evalue);
    const credentials = rsa.encrypt(ข้อความ).toString('hex');
    ชื่อคีย์ const = json.keynm;
    กลับ { ชื่อคีย์, ข้อมูลประจำตัว, ข้อความ };
  }
}


module.exports = PinVerifier;