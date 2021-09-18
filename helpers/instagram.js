ให้ exec = ต้องการ ('child_process').exec

module.exports = (ชื่อผู้ใช้ IG) => {
  ให้ cmd = 'wget https://instagram.com/'+usernameIG+' -qO -';
  ให้สื่อ = [];
  คืนสัญญาใหม่ ((แก้ไข, ปฏิเสธ) => {
    exec (cmd, ฟังก์ชั่น (ผิดพลาดดังนั้น) {
      ถ้า (ผิดพลาด) {
        ปฏิเสธ(ผิดพลาด);
        กลับผิดพลาด;
      }
      เอาต์พุต = so.split('window._sharedData = ')
      ถ้า (เอาต์พุตความยาว > 1){
        ให้ dataScrap = output[1].split(';</script>')
        ให้ tojson = JSON.parse(dataScrap[0]);
        ให้ userProfile = tojson.entry_data.ProfilePage[0].user
        ให้ผู้ติดตาม = userProfile.followed_by.count
        ให้ติดตาม = userProfile.follows.count
        ให้ bio = userProfile.biography
        ให้ชื่อผู้ใช้ = userProfile.username
        ให้ profilePic = userProfile.profile_pic_url
        ให้ชื่อเต็ม = userProfile.full_name
        ให้ชื่อ = ชื่อเต็ม || ชื่อผู้ใช้
        ให้สื่อ = userProfile.media.nodes
        
		ถ้า (media.length > 0){
          สำหรับ (var i = 0; i < 2; i++) {
            if(typeof media[i].thumbnail_src !== 'undefined') {
              medias.push(สื่อ[i].thumbnail_src);
            } อื่น {
              สื่อ = 'ไม่ได้อัปโหลดรูปภาพ';
            }
          }
        } อื่น {
          สื่อ = '- ผู้ใช้เป็นแบบส่วนตัว -';
        }
        ให้ data = {
          โปรไฟล์ผู้ใช้: userProfile.profile_pic_url,
          ชื่อผู้ใช้: ชื่อ,
          ไบโอ : ไบโอ,
          สื่อ: สื่อ,
          ติดตาม :`ผู้ติดตาม: ${ผู้ติดตาม} <=> กำลังติดตาม: ${กำลังติดตาม}`,
        };
        แก้ไข (ข้อมูล)
      } อื่น {
        แก้ไข ('ไม่พบ')
      }
    })
  })
}