const { Message, OpType, Location, Profile } = ต้องการ ('../curve-thrift/line_types');
const LineAPI = ต้องการ ('./api');
คำขอ const = ต้องการ ('คำขอ');
const fs = ต้องการ ('fs');
const unirest = ต้องการ ('unirest');
const webp = ต้องการ ('webp-converter');
เส้นทาง const = ต้องการ ('เส้นทาง');
const rp = ต้องการ ('ขอสัญญา');
const config = ต้องการ ('./config');

// ให้ exec = ต้องการ ('child_process').exec;

คำสั่งคลาสขยาย LineAPI {
// คลาส LINE ขยาย LineAPI {

    ตัวสร้าง () {
        ซุปเปอร์ ();
        this.spamName = [];
    }

    รับน้ำหนักบรรทุก () {
        if(typeof this.messages !== 'undefined'){
            return (this.messages.text !== null) ? this.messages.text.split(' ').splice(1) : '' ;
        }
        คืนค่าเท็จ;
    }

    async getProfile() {
        ให้ { displayName } = รอนี้._myProfile();
        ส่งคืน displayName;
    }


    async ยกเลิกสมาชิก () {
        ให้ groupID;
        if(this.payload.length > 0) {
            ให้ [ กลุ่ม ] = รอสิ่งนี้._findGroupByName(this.payload.join(' '));
            groupID = groups.id;
        } 
        ให้ gid = groupID || this.messages.to;
        ให้ { listPendingInvite } = รอ this.searchGroup(gid);
        ถ้า(listPendingInvite.length > 0){
            this._cancel(gid,listPendingInvite);
        }
    }

    async searchGroup (gid) {
        ให้ listPendingInvite = [];
        ให้ thisgroup = รอนี้._getGroups([gid]);
        if(กลุ่มนี้[0].เชิญ !== null) {
            listPendingInvite = กลุ่มนี้[0].invitee.map((คีย์) => {
                ส่งคืน key.mid;
            });
        }
        ให้ listMember = กลุ่มนี้[0].members.map((คีย์) => {
            ส่งคืน { กลาง: key.mid, dn: key.displayName };
        });

        กลับ { 
            รายการสมาชิก,
            รายการที่รอดำเนินการเชิญ
        }
    }

    เปิดปิด() {
        if(this.isAdminOrBot(this.messages.from)){
            ให้ [ การกระทำ , สถานะ ] = this.messages.text.split(' ');
            การกระทำ const = actions.toLowerCase();
            const state = status.toLowerCase() == 'on' ? 1 : 0;
            this.stateStatus[action] = state;
            this._sendMessage(this.messages,`สถานะ: \n${JSON.stringify(this.stateStatus)}`);
        } อื่น {
            this._sendMessage(this.messages,`ผู้ดูแลระบบ Kamu Bukan, ผู้ดูแลระบบ Mau Jadi? PC Admin1`);
            this._sendMessage(this.messages,`คีย์เวิร์ด Ketik Ini Untuk Melihat Admin : Admin1 Admin2 Admin3 Admin4 Admin5 Admin6 Admin7 Admin8 Admin9 Admin10 Admin11 Admin12 Admin13 Admin14 Admin15`);
        }
        Object.assign(this.messages,msg);
        this._sendMessage(this.messages);
    }

    กล่าวถึง (listMember) {
        ให้เอ่ยถึงสตริง = [''];
        ให้ mid = [''];
        สำหรับ (var i = 0; i < listMember.length; i++) {
            กล่าวถึงStrings.push('@'+listMember[i].displayName+'\n');
            mid.push(listMember[i].mid);
        }
        ให้ strings = talkingStrings.join('');
        ให้สมาชิก = strings.split('@').slice(1);
        
        ให้ tmp = 0;
        ให้ memberStart = [];
        ให้กล่าวถึงสมาชิก = member.map((v,k) => {
            ให้ z = tmp += v.length + 1;
            ปล่อยให้สิ้นสุด = z - 1;
            memberStart.push(สิ้นสุด);
            let talkingz = `{"S":"${(isNaN(memberStart[k - 1] + 1) ? 0 : memberStart[k - 1] + 1 ) }","E":"${end}", "M":"${กลาง[k + 1]}"}`;
            กลับมาพูดถึง;
        })
        กลับ {
            ชื่อ: talkingStrings.slice(1),
            cmddata: { กล่าวถึง: `{"MENTIONEES":[${mentionMember}]}` }
        }
    }

    async leftGroupByName (ชื่อ) {
        ให้ payload = ชื่อ || this.payload.join(' ');
        ให้ gid = รอสิ่งนี้._findGroupByName(payload);
        สำหรับ (ให้ i = 0; i < gid.length; i++) {
            this._leaveGroup(gid[i].id);
        }
        กลับ;
    }

    async ตรวจสอบอีกครั้ง (cs, กลุ่ม) {
        ให้ผู้ใช้;
        สำหรับ (var i = 0; i < cs.length; i++) {
            if(cs[i].group == group) {
                ผู้ใช้ = cs[i].users;
            }
        }
        
        ให้ contactMember = รอนี้._getContacts(users);
        ส่งคืน contactMember.map((z) => {
                ส่งคืน { displayName: z.displayName, mid: z.mid };
            });
    }

    removeReaderByGroup (groupID) {
        const groupIndex = this.checkReader.findIndex (v => {
            ถ้า (v.group == groupID) {
                กลับ v
            }
        })

        ถ้า (groupIndex != -1) {
            this.checkReader.splice(groupIndex,1);
        }
    }

    async getSpeed ​​() {
        ให้ curTime = Date.now() / 1000;
        รอ this._sendMessage(this.messages, 'Loading. . .');
        const rtime = (Date.now() / 1000) - curTime;
        รอสิ่งนี้._sendMessage(this.messages, `${rtime} วินาที`);
        กลับ;
    }

    async tagall () {
        ให้ rec = รอ this._getGroup(this.messages.to);
        const กล่าวถึง = รอ this.mention(rec.members);
        this.messages.contentMetadata = การกล่าวถึง.cmddata;
        รอ this._sendMessage(this.messages,mentions.names.join(''));
        กลับ;
    }

    async tagall2 () {
        ให้ rec = รอ this._getGroup(this.messages.to);
        const กล่าวถึง = รอ this.mention(rec.members);
        this.messages.contentMetadata = การกล่าวถึง.cmddata;
        รอ this._sendMessage(this.messages,mentions.names.join(''));
        กลับ;
    }

    vn() {
        this._sendFile(this.messages,`${__dirname}/../download/${this.payload.join(' ')}.m4a`,3);
    }

    ลากู() {
     {
        this._sendFile(this.messages,`${__dirname}/../download/${this.payload.join(' ')}.mp3`,3);
    }
    {
        this._sendMessage(this.messages, `Ok, Sabar Ya Kak, Tungguin... Lagu Kakak Lagi Aku Prosses ^_^`);
    }
    }

    วิดีโอ () {
    {
        this._sendFile(this.messages,`${__dirname}/../download/${this.payload.join(' ')}.mp4`,2);
    }
         this._sendMessage(this.messages, `Ok, Sabar Ya Kak, Tungguin... วิดีโอ Kakak Lagi Aku Prosses ^_^`);
    }

    ตรวจสอบเคอร์เนล () {
        exec('uname -a',(err, sto) => {
            ถ้า (ผิดพลาด) {
                this._sendMessage(this.messages, ผิดพลาด);
                กลับ
            }
            this._sendMessage(this.messages, sto);
            กลับ;
        });
    }

    setReader() {
        this._sendMessage(this.messages, "#↔️↔️↔️↔️ CCTV AKTIF ↔️↔️↔️↔️️#"+
" #️ Ketik Cyduk Untuk Melihat Sider! ️#");
        this.removeReaderByGroup(this.messages.to);
        กลับ;
    }

    เกลูอาร์() {
       { this._sendMessage(this.messages, `Apakah Kamu Yakin Mau Ngusir Aku??? :(`);
      }
      {
                    this._sendMessage(this.messages, `Ketik "#ya" Atau "#tidak"`);
      }
            กลับ;
      }

    บาตัล () {
                   this._sendMessage(this.messages, `Yaaay..., Maaciih Karna Udah Gak Jadi Ngusir Aku ^__^`);
      }


    สแปม2() {
                    this._sendMessage(this.messages, `3`);
                    this._sendMessage(this.messages, `2`);
                    this._sendMessage(this.messages, `1`);
                    this._sendMessage(this.messages, 'Fuck Off');
                    this._sendMessage(this.messages, `Ku mengejar bus yang mulai berjalan`);
                    this._sendMessage(this.messages, `กูอินกิน ungkapkan kepada dirimu`);
                    this._sendMessage(this.messages, `Kabut dalam hatiku telah menghilang`);
                    this._sendMessage(this.messages, `แดน ฮัล หยาง เพนติง บากิกุ ปุน เทอร์ลิฮัต`);
                    this._sendMessage(this.messages, `Walaupun jamaban itu sebenarnya begitu mudah`);
                    this._sendMessage(this.messages, `Tetapi entah mengapa diriku melewatkannya`);
                    this._sendMessage (this.messages, `Untukku menjadi diri sendiri`);
                    this._sendMessage(this.messages, `Ku harus jujur, pada perasaanku`);
                    this._sendMessage(this.messages, `Ku suka dirimu ku suka`);
                    this._sendMessage(this.messages, `คุ berlari sekuat tenaga`);
                    this._sendMessage (this.messages, `Ku suka selalu ku suka`);
                    this._sendMessage(this.messages, `คุ teriak sebisa suaraku`);
                    this._sendMessage(this.messages, `Ku suka dirimu ku suka`);
                    this._sendMessage(this.messages, `Walau susah untukku bernapas`);
                    this._sendMessage(this.messages, `ตักอะกัน ku sembunyikan`);
                    this._sendMessage(this.messages, `Oogoe daiyamondo~`);
                    this._sendMessage (this.messages, `Saat ku sadari sesuatu menghilang`);
                    this._sendMessage(this.messages, `Hati ini pun resah tidak tertahankan`);
                    this._sendMessage(this.messages, `Sekarang juga yang bisa ku lakukan`);
                    this._sendMessage(this.messages, `Merubah perasaan ke dalam กะตะกะตะ`);
                    this._sendMessage(this.messages, `เม้งปาเซดาริทาดี`);
                    this._sendMessage (this.messages, `Aku hanya menatap langit`);
                    this._sendMessage(this.messages, `Mataku berkaca kaca`);
                    this._sendMessage(this.messages, `Berlinang tak bisa berhenti`);
                    this._sendMessage(this.messages, `ได tempat kita tinggal, didunia ini`);
                    this._sendMessage(this.messages, `Dipenuhi cinta, kepada seseorang`);
                    this._sendMessage(this.messages, `คุ ยากิน อู คู ยากิน`);
                    this._sendMessage(this.messages, `Janji tak lepas dirimu lagi`);
                    this._sendMessage(this.messages, `คุ ยากิน อู คู ยากิน`);
                    this._sendMessage(this.messages, `Akhirnya kita bisa bertemu`);
                    this._sendMessage(this.messages, `คุ ยากิน อู คู ยากิน`);
                    this._sendMessage(this.messages, `คุ อะกัน บาฮาเกียกัน ดิริมู`);
                    this._sendMessage(this.messages, `Ku ingin kau mendengarkan`);
                    this._sendMessage(this.messages, `Oogoe daiyamondo~`);
                    this._sendMessage(this.messages, `จิกะ จิกา กามู รากู`);
                    this._sendMessage(this.messages, `ตักกัน บิซา เมมูลัย อะปุน`);
                    this._sendMessage(this.messages, `Ungkapkan perasaanmu`);
                    this._sendMessage(this.messages, `Jujurlah dari sekarang juga`);
                    this._sendMessage(this.messages, `จิกะ kau bersuar`);
                    this._sendMessage(this.messages, `Cahaya kan bersinar`);
                    this._sendMessage(this.messages, `Ku suka dirimu ku suka`);
                    this._sendMessage(this.messages, `คุ berlari sekuat tenaga`);
                    this._sendMessage (this.messages, `Ku suka selalu ku suka`);
                    this._sendMessage(this.messages, `คุ teriak sebisa suaraku`);
                    this._sendMessage(this.messages, `Ku suka dirimu ku suka`);
                    this._sendMessage(this.messages, `สัมไพกัน รสา สายังกู อินิ`);
                    this._sendMessage (this.messages, `Ku suka selalu ku suka`);
                    this._sendMessage(this.messages, `คุ teriakkan ditengah angin`);
                    this._sendMessage(this.messages, `Ku suka dirimu ku suka`);
                    this._sendMessage(this.messages, `Walau susah untuk ku bernapas`);
                    this._sendMessage(this.messages, `ตักอะกัน ku sembunyikan`);
                    this._sendMessage(this.messages, `Oogoe daiyamondo~`);
                    this._sendMessage(this.messages, `ข้อความที่ต้องการ`);
                    this._sendMessage(this.messages, `จิกะ kau diam kan tetap sama`);
                    this._sendMessage(this.messages, `Janganlah kau merasa malu`);
                    this._sendMessage(this.messages, `“Suka” itu kata paling hebat!`);
                    this._sendMessage(this.messages, `“Suka” itu kata paling hebat!`);
                    this._sendMessage(this.messages, `“Suka” itu kata paling hebat!`);
                    this._sendMessage(this.messages, `Ungkapkan perasaanmu`);
                    this._sendMessage(this.messages, `Jujurlah dari sekarang juga..`);
                    this._sendMessage (this.messages, `สแปมเสร็จแล้ว`);
           กลับ;
    }

    แจ่มใส() {
        this._sendMessage(this.messages, `รายการ Sider Terhapus !`);
        this.checkReader = [];
        กลับ
    }

    รายการ() {
            this._sendMessage(this.messages,`คีย์เวิร์ด Ketik Ini Untuk Melihat Admin : Admin1 Admin2 Admin3 Admin4 Admin5 Admin6 Admin7 Admin8 Admin9 Admin10 Admin11 Admin12 Admin13 Admin14 Admin15`);
     }

ผู้สร้าง () {
        ให้ผงชูรส = {
            ข้อความ:โมฆะ,
            ประเภทเนื้อหา: 13,
            การแสดงตัวอย่างเนื้อหา: null,
            ข้อมูลเมตาของเนื้อหา: 
            { กลาง: 'uda8195e53e6c6e17f3f745743e477100'}
        }
        Object.assign(this.messages,msg);
        this._sendMessage(this.messages);
 }

ผู้ดูแลระบบ1() {
        ให้ผงชูรส = {
            ข้อความ:โมฆะ,
            ประเภทเนื้อหา: 13,
            การแสดงตัวอย่างเนื้อหา: null,
            ข้อมูลเมตาของเนื้อหา: 
            { กลาง: 'uda8195e53e6c6e17f3f745743e477100'}
        }
        Object.assign(this.messages,msg);
        this._sendMessage(this.messages);
 }

ผู้ดูแลระบบ2() {
        ให้ผงชูรส = {
            ข้อความ:โมฆะ,
            ประเภทเนื้อหา: 13,
            การแสดงตัวอย่างเนื้อหา: null,
            ข้อมูลเมตาของเนื้อหา: 
            { กลาง: 'uda8195e53e6c6e17f3f745743e477100' }
        }
        Object.assign(this.messages,msg);
        this._sendMessage(this.messages);
 }

ผู้ดูแลระบบ3() {
        ให้ผงชูรส = {
            ข้อความ:โมฆะ,
            ประเภทเนื้อหา: 13,
            การแสดงตัวอย่างเนื้อหา: null,
            ข้อมูลเมตาของเนื้อหา: 
            { กลาง: 'uda8195e53e6c6e17f3f745743e477100' }
        }
        Object.assign(this.messages,msg);
        this._sendMessage(this.messages);
 }

ผู้ดูแลระบบ4() {
        ให้ผงชูรส = {
            ข้อความ:โมฆะ,
            ประเภทเนื้อหา: 13,
            การแสดงตัวอย่างเนื้อหา: null,
            ข้อมูลเมตาของเนื้อหา: 
            { กลาง: 'uda8195e53e6c6e17f3f745743e477100' }
        }
        Object.assign(this.messages,msg);
        this._sendMessage(this.messages);
 }

ผู้ดูแลระบบ5() {
        ให้ผงชูรส = {
            ข้อความ:โมฆะ,
            ประเภทเนื้อหา: 13,
            การแสดงตัวอย่างเนื้อหา: null,
            ข้อมูลเมตาของเนื้อหา: 
            { กลาง: 'uda8195e53e6c6e17f3f745743e477100' }
        }
        Object.assign(this.messages,msg);
        this._sendMessage(this.messages);
 }

ผู้ดูแลระบบ6() {
        ให้ผงชูรส = {
            ข้อความ:โมฆะ,
            ประเภทเนื้อหา: 13,
            การแสดงตัวอย่างเนื้อหา: null,
            ข้อมูลเมตาของเนื้อหา: 
            { กลาง: 'uda8195e53e6c6e17f3f745743e477100' }
        }
        Object.assign(this.messages,msg);
        this._sendMessage(this.messages);
 }

ผู้ดูแลระบบ7() {
        ให้ผงชูรส = {
            ข้อความ:โมฆะ,
            ประเภทเนื้อหา: 13,
            การแสดงตัวอย่างเนื้อหา: null,
            ข้อมูลเมตาของเนื้อหา: 
            { กลาง: 'uda8195e53e6c6e17f3f745743e477100' }
        }
        Object.assign(this.messages,msg);
        this._sendMessage(this.messages);
 }

ผู้ดูแลระบบ8() {
        ให้ผงชูรส = {
            ข้อความ:โมฆะ,
            ประเภทเนื้อหา: 13,
            การแสดงตัวอย่างเนื้อหา: null,
            ข้อมูลเมตาของเนื้อหา: 
            { กลาง: 'uda8195e53e6c6e17f3f745743e477100' }
        }
        Object.assign(this.messages,msg);
        this._sendMessage(this.messages);
 }

ผู้ดูแลระบบ9() {
        ให้ผงชูรส = {
            ข้อความ:โมฆะ,
            ประเภทเนื้อหา: 13,
            การแสดงตัวอย่างเนื้อหา: null,
            ข้อมูลเมตาของเนื้อหา: 
            { กลาง: 'uda8195e53e6c6e17f3f745743e477100' }
        }
        Object.assign(this.messages,msg);
        this._sendMessage(this.messages);
}

ผู้ดูแลระบบ 10 () {
        ให้ผงชูรส = {
            ข้อความ:โมฆะ,
            ประเภทเนื้อหา: 13,
            การแสดงตัวอย่างเนื้อหา: null,
            ข้อมูลเมตาของเนื้อหา: 
            { กลาง: 'uda8195e53e6c6e17f3f745743e477100' }
        }
        Object.assign(this.messages,msg);
        this._sendMessage(this.messages);
}

ผู้ดูแลระบบ11() {
        ให้ผงชูรส = {
            ข้อความ:โมฆะ,
            ประเภทเนื้อหา: 13,
            การแสดงตัวอย่างเนื้อหา: null,
            ข้อมูลเมตาของเนื้อหา: 
            { กลาง: 'udb43d62b8ab3d9390881ded66f8a037a' }
        }
        Object.assign(this.messages,msg);
        this._sendMessage(this.messages);
}

ผู้ดูแลระบบ 12() {
        ให้ผงชูรส = {
            ข้อความ:โมฆะ,
            ประเภทเนื้อหา: 13,
            การแสดงตัวอย่างเนื้อหา: null,
            ข้อมูลเมตาของเนื้อหา: 
            { กลาง: 'udb43d62b8ab3d9390881ded66f8a037a' }
        }
        Object.assign(this.messages,msg);
        this._sendMessage(this.messages);
}

ผู้ดูแลระบบ 13() {
        ให้ผงชูรส = {
            ข้อความ:โมฆะ,
            ประเภทเนื้อหา: 13,
            การแสดงตัวอย่างเนื้อหา: null,
            ข้อมูลเมตาของเนื้อหา: 
            { กลาง: 'udb43d62b8ab3d9390881ded66f8a037a' }
        }
        Object.assign(this.messages,msg);
        this._sendMessage(this.messages);
}

ผู้ดูแลระบบ 14() {
        ให้ผงชูรส = {
            ข้อความ:โมฆะ,
            ประเภทเนื้อหา: 13,
            การแสดงตัวอย่างเนื้อหา: null,
            ข้อมูลเมตาของเนื้อหา: 
            { กลาง: 'udb43d62b8ab3d9390881ded66f8a037a' }
        }
        Object.assign(this.messages,msg);
        this._sendMessage(this.messages);
}

ผู้ดูแลระบบ15() {
        ให้ผงชูรส = {
            ข้อความ:โมฆะ,
            ประเภทเนื้อหา: 13,
            การแสดงตัวอย่างเนื้อหา: null,
            ข้อมูลเมตาของเนื้อหา: 
            { กลาง: 'udb43d62b8ab3d9390881ded66f8a037a' }
        }
        Object.assign(this.messages,msg);
        this._sendMessage(this.messages);
}

    ผู้ดูแลระบบ 16() {
                    this._sendMessage(this.messages, `ผู้ดูแลระบบ 16 Belom Ada`);
     }

    ผู้ดูแลระบบ 17() {
                    this._sendMessage(this.messages, `ผู้ดูแลระบบ 17 Belom Ada`);
     }

    ผู้ดูแลระบบ 18 () {
                    this._sendMessage(this.messages, `ผู้ดูแลระบบ 18 Belom Ada`);
     }

    ผู้ดูแลระบบ19() {
                    this._sendMessage(this.messages, `ผู้ดูแลระบบ 19 Belom Ada`);
     }

    ผู้ดูแลระบบ 20() {
                    this._sendMessage(this.messages, `ผู้ดูแลระบบ 20 Belom Ada`);
     }

บอท2() {
        ให้ผงชูรส = {
            ข้อความ:โมฆะ,
            ประเภทเนื้อหา: 13,
            การแสดงตัวอย่างเนื้อหา: null,
            ข้อมูลเมตาของเนื้อหา: 
            { กลาง: 'uda8195e53e6c6e17f3f745743e477100' }
        }
        Object.assign(this.messages,msg);
        this._sendMessage(this.messages);
 }


    resetStateUpload() {
        this.stateUpload = {
            ไฟล์: '',
            ชื่อ: '',
            กลุ่ม: '',
            ผู้ส่ง: ''
        };
    }

    เตรียมอัปโหลด () {
        this.stateUpload = {
            ไฟล์: จริง,
            ชื่อ: this.payload.join(' '),
            กลุ่ม: this.messages.to,
            ผู้ส่ง: this.messages.from
        };
        this._sendMessage(this.messages,` ${this.stateUpload.name}`);
        กลับ;
    }
    
    async doUpload ({ id, contentType }) {
        ให้ url = `https://obs-sg.line-apps.com/talk/m/download.nhn?oid=${id}`;
        รอ this._download(url,this.stateUpload.name, contentType);
        this.messages.contentType = 0;
        this._sendMessage(this.messages,` ${this.stateUpload.name} `);
        this.resetStateUpload()
        กลับ;
    }

    ค้นหา LocalImage () {
        ให้ชื่อ = this.payload.join(' ');
        ให้ dirName = `${__dirname}/../download/${name}.jpg`;
        ลอง {
            this._sendImage(this.messages,dirName);
        } จับ (ผิดพลาด) {
             this._sendImage(this.messages,`ไม่มีรูปภาพ #${name} อัปโหลดแล้ว `);
        }
        กลับ ;
        
    }

    async joinQr () {
        const [ ticketId ] = this.payload[0].split('g/').splice(-1);
        ให้ { id } = รอสิ่งนี้._findGroupByTicket(ticketId);
        รอสิ่งนี้._acceptGroupInvitationByTicket(id,ticketId);
        กลับ;
    }

    async qrOpenClose() {
        ให้ updateGroup = รอ this._getGroup(this.messages.to);
        updateGroup.preventJoinByTicket = true;
        if(typeof this.payload !== 'undefined') {
            ให้ [ type ] = this.payload;

            ถ้า (ประเภท === 'เปิด') {
                updateGroup.preventJoinByTicket = เท็จ;
                const groupUrl = รอสิ่งนี้._reissueGroupTicket (this.messages.to)
                this._sendMessage(this.messages,`กลุ่มไลน์ = line://ti/g/${groupUrl}`);
            }
        }
        รอสิ่งนี้._updateGroup(updateGroup);
        กลับ;
    }

    กลุ่มสแปม () {
        if(this.isAdminOrBot(this.messages.from) && this.payload[0] !== 'kill') {
            ให้ s = [];
            สำหรับ (ให้ i = 0; i < this.payload[1]; i++) {
                ให้ชื่อ = `${Math.ceil(Math.random() * 1000)}${i}`;
                this.spamName.push(ชื่อ);
                this._createGroup(ชื่อ,[this.payload[0]]);
            }
            กลับ;
        } 
        สำหรับ (ให้ z = 0; z < this.spamName.length; z ++) {
            this.leftGroupByName(this.spamName[z]);
        }
        คืนค่าจริง;
    }

    ตรวจสอบ IP () {
        exec(`wget ipinfo.io/${this.payload[0]} -qO -`,(err, res) => {
            ถ้า (ผิดพลาด) {
                this._sendMessage(this.messages,'Error Please Install Wget');
                กลับ 
            }
            ผลลัพธ์ const = JSON.parse(res);
            if(typeof result.error == 'undefined') {
                const { org, ประเทศ, loc, เมือง, ภูมิภาค } = ผลลัพธ์;
                ลอง {
                    const [ละติจูด, ลองจิจูด ] = loc.split(',');
                    let location = new Location();
                    Object.assign(location,{ 
                        title: `Location:`,
                        address: `${org} ${city} [ ${region} ]\n${this.payload[0]}`,
                        latitude: latitude,
                        longitude: longitude,
                        phone: null 
                    })
                    const Obj = { 
                        text: 'Location',
                        location : location,
                        contentType: 0,
                    }
                    Object.assign(this.messages,Obj)
                    this._sendMessage(this.messages,'Location');
                } catch (err) {
                    this._sendMessage(this.messages,'Not Found');
                }
            } else {
                this._sendMessage(this.messages,'Location Not Found , Maybe di dalem goa');
            }
        })
        return;
    }

    async rechecks() {
        let rec = await this.recheck(this.checkReader,this.messages.to);
        const mentions = await this.mention(rec);
        this.messages.contentMetadata = mentions.cmddata;
        await this._sendMessage(this.messages,mentions.names.join('')+

"#↔️↔️↔️️↔️Sider Tercyduk↔️↔️↔️↔️#"+
"                                        ️#Ketik Clear Untuk Hapus List Sider#");
        return;
    }

    infokick() {
                    this._sendMessage(this.messages, `Cara Menggunakan Fitur Kickall :
1. Ketik Kick on
2. Kalau Seperti Ini Berarti Kick Mode Sudah On
    Status: 
"cancel":0,"kick":1
3. Terakhir, Kamu Ketik Kickall (Gak Pake Spasi)
4. Done~`);
     }


    async kickAll() {
        let groupID;
        if(this.stateStatus.kick == 1 && this.isAdminOrBot(this.messages.from)) {
            let target = this.messages.to;
            if(this.payload.length > 0) {
                let [ groups ] = await this._findGroupByName(this.payload.join(' '));
                groupID = groups.id;
            }
            let { listMember } = await this.searchGroup(groupID || target);
            for (var i = 0; i < listMember.length; i++) {
                if(!this.isAdminOrBot(listMember[i].mid)){
                    this._kickMember(groupID || target,[listMember[i].mid])
                }
            }
            return;
        } 
        return this._sendMessage(this.messages, ' Kick Error, Fitur Kick Hanya Untuk Admin Saja!');
    }

    help() {
           this._sendMessage(this.messages, `           👤 Keyword Khusus Admin 👤
[🔹]Kick On/Off ⏩ Mode Kick
[🔹]Kickall ⏩ Mengekick Semua Member
[🔹]Info kick ⏩ Cara Memakai Kickall
[🔹]Cancel On/Off ⏩ Mode Cancel
[🔹]Cancelall ⏩ Cancel Semua Invite
[🔹]Qrp On/Off ⏩ Protect Link QR

           👥 Keyword Dalam Group 👥
[🔹]Chucky keluar ⏩ Bot Keluar
[🔹]Status ⏩ Status Cancel/Kick/Qrp
[🔹]Speed ⏩ Ngetest Respons Bot
[🔹]Left NamaGroup ⏩ Bot Keluar
[🔹]Setpoint/Set/Cctv ⏩ Cctv Aktif
[🔹]Recheck/Check ⏩ Cek Sider
[🔹]Clear/Reset ⏩ Hapus List Sider
[🔹]Myid ⏩ Untuk Mengetahui MID
[🔹]Ig Ursname Kamu ⏩ Info Instagram
[🔹]Qr Open/Close ⏩ Link Group
[🔹]spam (S Kecil) ⏩ Bot Akan Spam
[🔹]List admin ⏩ Melihat Daftar Admin
[🔹]Tag all ⏩ Mengetag Semua Member
[🔹]Creator ⏩ Owner Pembuat Bot
[🔹]Gift ⏩ Gift Sticker & Gift Tema
[🔹]Suara bot1/bot2 ⏩ Suara Bot
[🔹]Media ⏩ Daftar Pap & Musik
#↔️↔️↔️↔️↔️↔️↔️↔️↔️↔️↔️↔️↔️↔#`);
     }

    media() {
                    this._sendMessage(this.messages, `              🎶 Keyword Media 🎶
[🔹]Pap owner/tt/tete/naked/bugil/pocong/titid/tytyd/kaget/tai/taik/kucing/anjing ⏩ Untuk Melihat Gambar Yang Dipilih

[🔹]Musik funny/broken/siul/spongebob/simfoni/titanic ⏩ Bot Akan Send Musik Yang Dipilih

[🔹]List lagu1 ⏩ Melihat Daftar Lagu
[🔹]List lagu2 ⏩ Melihat Daftar Lagu`);
     }

    listlagu1() {
                    this._sendMessage(this.messages, `           🎶 List Lagu 1 🎶
[🎵]/lagu baby shark
[🎵]/lagu ML
[🎵]/lagu despacito
[🎵]/lagu faded
[🎵]/lagu dear god
[🎵]/lagu jadi aku sebentar saja
[🎵]/lagu mendua
[🎵]/lagu tentang rasa
[🎵]/lagu sayang
[🎵]/lagu jaran goyang
[🎵]/lagu goyang dumang`);
      }

    listlagu2() {
                    this._sendMessage(this.messages, `           🎶 List Lagu 2 🎶
[🎵]/lagu asal kau bahagia
[🎵]/lagu canon rock
[🎵]/lagu closer
[🎵]/lagu dusk till dawn
[🎵]/lagu rockabye
[🎵]/lagu shape of you
[🎵]/lagu perfect
[🎵]/lagu hilang
[🎵]/lagu salah`);
      }

    gift() {
                    this._sendMessage(this.messages, `     🎁 STICKER 🎁

[🎉]Gift sticker 1
[🎉]Gift sticker 2
[🎉]Gift sticker 3
[🎉]Gift sticker 4

      🎁 THEMA 🎁

[🎉]Gift tema 1
[🎉]Gift tema 2
[🎉]Gift tema 3
[🎉]Gift tema 4`);
      }


    async checkIG() {
        try {
            let { userProfile, userName, bio, media, follow } = await this._searchInstagram(this.payload[0]);
            await this._sendFileByUrl(this.messages,userProfile);
            await this._sendMessage(this.messages, `${userName}\n\nBIO:\n${bio}\n\n\uDBC0 ${follow} \uDBC0`)
            if(Array.isArray(media)) {
                for (let i = 0; i < media.length; i++) {
                    await this._sendFileByUrl(this.messages,media[i]);
                }
            } else {
                this._sendMessage(this.messages,media);
            }
        } catch (error) {
            this._sendMessage(this.messages,`Error: ${error}`);
        }
        return;
    }
}

//module.exports = Command;
module.exports = new Command();
