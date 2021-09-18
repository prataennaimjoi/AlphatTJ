const LineAPI = ต้องการ ('./api');
คำขอ const = ต้องการ ('คำขอ');
const fs = ต้องการ ('fs');
const unirest = ต้องการ ('unirest');
const webp = ต้องการ ('webp-converter');
เส้นทาง const = ต้องการ ('เส้นทาง');
const rp = ต้องการ ('ขอสัญญา');
const config = ต้องการ ('./config');
const { Message, OpType, Location } = ต้องการ ('../curve-thrift/line_types');
// ให้ exec = ต้องการ ('child_process').exec;

//TOLONG GANTI SEMUA SEPERTI LOCKUPDATEGROUP TAPI MSG SERTA UNMUTE/MUTE JAN LU OTAK ATIK BEGO~//
const myBott = [ 'u14f64e139a3817afaabe27d237afb36b', 'u49f93172b8c8865683dd2d47ccbb8613', 'uafa4799654e54457c87031c450f1ae42', 'u9e95a04f463bca969d248318b63281d0', 'u8bc7bff0a03e8a6e62d710a615c43dc3', 'uf2e49f5a15357adee664f757e1bedbfd']; // TARO MID LU Disini Supaya Bisa PKE COMMAND STAFF

const myBot = [ 'u14f64e139a3817afaabe27d237afb36b', 'u49f93172b8c8865683dd2d47ccbb8613', 'uafa4799654e54457c87031c450f1ae42', 'u9e95a04f463bca969d248318b63281d0', 'u8bc7bff0a03e8a6e62d710a615c43dc3', 'uf2e49f5a15357adee664f757e1bedbfd']; // TARO MID LU Disini
var vx = {};var midnornama = "";var pesane = "";var kickhim = "";var waitMsg = "no";//ห้ามเปลี่ยนแปลงสิ่งนี้

ฟังก์ชัน isAdminOrBot (พารามิเตอร์) {
    ส่งคืน myBot.includes(param);
}

ฟังก์ชัน isStaffOrBot (พารามิเตอร์) {
    ส่งคืน myBott.includes(param);
}

ฟังก์ชัน firstToUpperCase(str) {
    ส่งคืน str.substr(0, 1).toUpperCase() + str.substr(1);
}

ฟังก์ชัน isTGet(สตริง,พารามิเตอร์){
	ส่งคืน string.includes (พารามิเตอร์);
}


คลาส LINE ขยาย LineAPI {
    ตัวสร้าง () {
        ซุปเปอร์ ();
        this.receiverID = '';
        this.checkReader = [];
        this.sendStaff = 0;
        this.stateStatus = {
            ปิดเสียง: 0,
            ล็อคอินเชิญ: 0,
            lockupdategroup: 0,
            ล็อคจอย: 0,
            ยกเลิกล็อค: 0,
            ออโต้คิก:0,
            เข้าร่วมอัตโนมัติ:0,
            ยกเลิก: 0
            bc: 0,
            ซัมบูตัน: 0,
        }
    }

    getOprationType (การดำเนินการ) {
        สำหรับ (ให้ป้อน OpType) {
            if(operations.type == OpType[key]) {
                if (คีย์ !== 'NOTIFIED_UPDATE_PROFILE') {
                    console.info(`[* ${operations.type} ] ${key} `);
                }
            }
        }
    }


    แบบสำรวจความคิดเห็น (การดำเนินการ) {
        if(operation.type == 25 || operation.type == 26) {
// if(operation.type == 25) { 
// if(operation.type == 26) { 		
            const txt = (operation.message.text !== '' && operation.message.text != null) ? operation.message.text : '' ;
            ให้ข้อความ = ข้อความใหม่ (operation.message);
            this.receiverID = message.to = (operation.message.to === myBot[0]) ? operation.message.from : operation.message.to ;
            Object.assign(ข้อความ,{ ct: operation.createdTime.toString() });
            if(waitMsg == "ใช่" && operation.message.from == vx[0] && this.stateStatus.mute != 1){
				this.textMessage(txt,ข้อความ,ข้อความ.ข้อความ)
			} อื่น if(this.stateStatus.mute != 1){this.textMessage(txt,message);
			} อื่น if (txt == "เปิดเสียง" && this.stateStatus.mute == 1){
			    this.stateStatus.mute = 0;
			    this._sendMessage(ข้อความ,"BOT ON")
		    }else{console.info("ปิดบอท");}
        }

        if(operation.type == 13 && this.stateStatus.cancel == 1) {
            if(!isAdminOrBot(operation.param2) && !isStaffOrBot(operation.param2)) {
            this.cancelAll(operation.param1);
            }

        }

        if(operation.type == 13 && this.stateStatus.lockinvite == 1) {
            if(!isAdminOrBot(operation.param2) && !isStaffOrBot(operation.param2)) {
            this._kickMember(operation.param1,[operation.param2]);
             }

           }

		if(operation.type == 11 && this.stateStatus.lockupdategroup == 1){//update group (open qr)
		    ให้ seq = ข้อความใหม่ ();
			seq.to = operation.param1;
			this.textMessage("0103",seq,operation.param2,1);
		}อื่น if(operation.type == 11 && this.stateStatus.lockupdategroup == 1){
			ให้ seq = ข้อความใหม่ ();
			seq.to = operation.param1;
	     this.textMessage("0104",seq,operation.param2,1);
		}อื่น if(operation.type == 11 && this.stateStatus.lockupdategroup == 0){
			ให้ seq = ข้อความใหม่ ();
			seq.to = operation.param1;
	    this.textMessage("0103",seq,operation.param2,1);
		}

           if(operation.type == 11 && this.stateStatus.lockupdategroup == 1) { //ada update
           // op1 = กลุ่ม nya
           // op2 = อัปเดต หยาง 'เงอ'
           if(!isAdminOrBot(operation.param2) && !isStaffOrBot(operation.param2)) {
              this._kickMember(operation.param1,[operation.param2]);
             }

           }

          if(operation.type == 15 && this.stateStatus.sambutan == 1) {
             ปล่อย = ข้อความใหม่ ();
             out.to = operation.param1;

             out.text = "ยะกก ลาออกไหม สามัคคี เกเตมู ลากิ :("
			     this._client.sendMessage(0, ออก);
            }

            if(operation.type == 17 && this.stateStatus.sambutan == 1) {

               ให้ kam = ข้อความใหม่ ();
               kam.to = operation.param1;
               kam.text = "Selamat Datang, Jangan Lupa Berbaur ย่าห์ ^_^"
               this._client.sendMessage(0, kam);
               ให้ kom = ข้อความใหม่ ();
               kom.contentType = 7
               kom.contentMetadata = {'STKID':'247','STKPKGID':'3','STKVER':'100'};
               this._client.sendMessage(0, คอม);               
             }

           if(operation.type == 16 && this.stateStatus.sambutan == 1) {
             ให้ itil = ข้อความใหม่ ();
             itil.to = operation.param1;
             itil.text = "Terima Kasih Telah เชิญ Saya Di Group Anda ^_^\n\nSilahkan Ketik [help] Untuk Mengetahui Command Bot Kami.\n\n-NADYA-"
             this._client.sendMessage(0, itil);
           }

           if(operation.type == 19 && this.stateStatus.sambutan == 1) {
             ให้ plerrr = ข้อความใหม่ ();
             plerrr.to = operation.param1;
             plerrr.text = "Gosah แมน เตะ เตะ อะสุว _-"
             this._client.sendMessage(0, plerrr);
           }

           if(operation.type == 17 && this.stateStatus.lockjoin == 1) {
            if(!isAdminOrBot(operation.param2) || !isStaffOrBot(operation.param2)) {
            this._kickMember(operation.param1,[operation.param2]);
             }

           }

           if(operation.type == 19 && this.stateStatus.autokick == 1) { //ada kick
            // op1 = กลุ่ม nya
            // op2 = หยาง 'เอ๋อ' เตะ
            // op3 = หยาง ดิ คิก
            ถ้า (isAdminOrBot (operation.param3) && isStaffOrBot (operation.param3)) {
               this._invite(operation.param1,[operation.param3]);
            }
            if(!isAdminOrBot(operation.param2) && !isStaffOrBot(operation.param2)) {
               this._kickMember(operation.param1,[operation.param2]);
            } 

        }

        if(operation.type == 32 && this.stateStatus.lockcancel == 1) { //ada cancel
          // op1 = กลุ่ม nya
          // op2 = yang 'nge' ยกเลิก
          // op3 = หยาง 'ดี' ยกเลิก
          ถ้า (isAdminOrBot (operation.param3) && isStaffOrBot (operation.param3)) {
              this._invite(operation.param1,[operation.param3]);
          }
          if(!isAdminOrBot(operation.param2) && !isStaffOrBot(operation.param2)) {
              this._kickMember(operation.param1,[operation.param2]);
            }

        }

        if(operation.type == 13 && this.stateStatus.autojoin == 1){ //di ขอเชิญ
                this._acceptGroupInvitation(operation.param1);
      }

        if(operation.type == 55){ //ada reader

            const idx = this.checkReader.findIndex ((v) => {
                if(v.group == operation.param1) {
                    กลับ v
                }
            })
            if(this.checkReader.length < 1 || idx == -1) {
                this.checkReader.push ({ กลุ่ม: operation.param1, ผู้ใช้: [operation.param2], timeSeen: [operation.param3] });
            } อื่น {
                สำหรับ (var i = 0; i < this.checkReader.length; i++) {
                    if(this.checkReader[i].group == operation.param1) {
                        if(!this.checkReader[i].users.includes(operation.param2)) {
                            this.checkReader[i].users.push(operation.param2);
                            this.checkReader[i].timeSeen.push(operation.param3);
                        }
                    }
                }
            }
        }

        if(operation.type == 13) { // diinvite
            ถ้า (isAdminOrBot (operation.param2)) {
                ส่งคืน this._acceptGroupInvitation(operation.param1);
            } อื่น {
                ส่งคืน this._cancel(operation.param1,myBot);
            }
        }
        this.getOprationType(การดำเนินการ);
    }

    async ยกเลิกทั้งหมด (gid) {
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

    setState (seq, พารามิเตอร์) {
		ถ้า (พารามิเตอร์ == 1){
			ให้ isinya = "ตั้งค่า\n";
			สำหรับ (var k ใน this.stateStatus){
                if (typeof this.stateStatus[k] !== 'function') {
					if(this.stateStatus[k]==1){
						isinya += " "+firstToUpperCase(k)+" => on\n";
					}อื่น{
						isinya += " "+firstToUpperCase(k)+" => ปิด\n";
					}
                }
            }this._sendMessage(seq,isinya);
		}อื่น{
        if(!isAdminOrBot(seq.from) || !isStaffOrBot(seq.from)){
            ให้ [ การกระทำ , สถานะ ] = seq.text.split(' ');
            การกระทำ const = actions.toLowerCase();
            const state = status.toLowerCase() == 'on' ? 1 : 0;
            this.stateStatus[action] = state;
			ให้ isinya = "ตั้งค่า\n";
			สำหรับ (var k ใน this.stateStatus){
                if (typeof this.stateStatus[k] !== 'function') {
					if(this.stateStatus[k]==1){
						isinya += " "+firstToUpperCase(k)+" => on\n";
					}อื่น{
						isinya += " "+firstToUpperCase(k)+" => ปิด\n";
					}
                }
            }
            //this._sendMessage(seq,`สถานะ: \n${JSON.stringify(this.stateStatus)}`);
			this._sendMessage(seq,isinya);
        } อื่น {
            this._sendMessage(seq,`Mohon Maaf Anda Bukan Staff หรือ Admin~`);
        }}
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

    async leftGroupByName (เพย์โหลด) {
        ให้ gid = รอสิ่งนี้._findGroupByName(payload);
        สำหรับ (var i = 0; i < gid.length; i++) {
            this._leaveGroup(gid[i]);
        }
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

    async textMessage (textMessages, seq, param, lockt) {
        ให้ [ cmd, ...payload ] = textMessages.split(' ');
        เพย์โหลด = payload.join(' ');
        ให้ txt = textMessages.toLowerCase();
        ให้ messageID = seq.id;

        const ginfo = รอสิ่งนี้._getGroup(seq.to);
        const groupCreator = ('[ginfo.creator.mid]');
        const cot = textMessages.split('@');
        const com = textMessages.split(':');
        const cox = textMessages.split(' ');


        if(cmd == 'ยกเลิก') {
            ถ้า (เพย์โหลด == 'กลุ่ม') {
                ให้ groupid = รอนี้._getGroupsInvited();

                สำหรับ (ให้ i = 0; i < groupid.length; i++) {
                    this._rejectGroupInvitation(groupid[i]) นี้                    
                }
                กลับ;
            }
            ถ้า (this.stateStatus.cancel == 1) {
                this.cancelAll(seq.to);
            }
        }

		if(vx[1] == "msg" && seq.from == vx[0] && waitMsg == "ใช่"){
			ให้ panjang = txt.split("");
			if(txt == "ยกเลิก"){
				vx[0] = "";vx[1] = "";waitMsg = "ไม่";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"ยกเลิก");
			}อื่น if(vx[2] == "arg1" && vx[3] == "mid" && cot[1]){
				ให้ปัง = ข้อความใหม่ (); bang.to = seq.to;
				bang.text = "ตกลง !, btw pesan-nya apa ?"
				this._client.sendMessage(0,ปัง);
				ให้ ment = seq.contentMetadata.MENTION;
			    ให้ xment = JSON.parse(ment);let pment = xment.MENTIONEES[0].M;
				ให้ midnya = JSON.stringify(pment);
				vx[4] = มิดเนีย;
				vx[2] = "arg2";
			}อื่น if(vx[2] == "arg1" && vx[3] == "mid" && seq.contentType == 13){
				ให้ midnya = seq.contentMetadata.mid;let bang = ข้อความใหม่ ();bang.to = seq.to;
				bang.text = "ตกลง !, btw pesan-nya apa ?"
				this._client.sendMessage(0,ปัง);
				vx[4] = มิดเนีย;
				vx[2] = "arg2";
			}อื่น if(vx[2] == "arg1" && vx[3] == "mid" && panjang.length > 30){
				this._sendMessage(seq,"ตกลง !, btw pesan-nya apa ?");
				vx[4] = txt;
				vx[2] = "arg2";
			}อื่น if(vx[2] == "arg2" && vx[3] == "mid"){
				ให้ panjangs = vx[4].split("");
				ให้ kirim = ข้อความใหม่ (); ให้ปัง = ข้อความใหม่ ();
				bang.to = seq.to;
				if(panjangs[0] == "u"){
					kirim.toType = 0;
				}อื่น if(panjangs[0] == "c"){
					kirim.toType = 2;
				}อื่น if(panjangs[0] == "r"){
					kirim.toType = 1;
				}อื่น{
					kirim.toType = 0;
				}
				bang.text = "Terkirim คับ !";
				kirim.to = vx[4];
				kirim.text = txt;
				vx[0] = "";vx[1] = "";waitMsg = "ไม่";vx[2] = "";vx[3] = "";vx[4] = "";
				this._client.sendMessage(0, kirim);
				this._client.sendMessage(0, ปัง);
			}อื่น{
				this._sendMessage(seq," How to !msg\nTag / Kirim Kontak / Kirim Mid orang yang mau dikirimkan pesan !");
			}
		}if(txt == "msg") {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "ใช่";
			    vx[0] = seq.from;vx[1] = txt;vx[3] = "กลาง";
			    this._sendMessage(seq,"เมา คิริม เปซาน คี เซียปา คัก ?");
				this._sendMessage(seq,"Tag / Kirim Kontak / Kirim Mid orang yang mau dikirimkan pesan !");
				vx[2] = "arg1";
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"CANCELLED");
			}
		} 

		if(txt == '0103' && lockt == 1){
			let ax = await this._client.getGroup(seq.to);
			if(ax.preventJoinByTicket === true){}else{ax.preventJoinByTicket = true;await this._client.updateGroup(0, ax);}
		}
		if(txt == '0104' && lockt == 1){
			let ax = await this._client.getGroup(seq.to);
			if(ax.preventJoinByTicket === true){ax.preventJoinByTicket = false;await this._client.updateGroup(0, ax);}else{}
		}

      if(txt == 'add staff' && this.sendStaff == 0){
         this.sendStaff = 1;
         this._sendMessage(seq,'Kirim Contact Untuk Menambahkan Staff~')
       }

       if(seq.contentType == 13 && this.sendStaff == 1) {
          seq.contentType = 0;
          this.sendStaff = 0;
          myBott.push(seq.contentMetadata.mid);
          this._sendMessage(seq,'Sukses Menambahkan Staff Dengan Nama :'+'\n'+seq.contentMetadata.displayName);
        }

        if(txt == 'remove staff' && this.sendStaff == 0)
{
           this.sendStaff = 2;
           this._sendMessage(seq,'Kirim Contact Untuk Menghapus Staff~')
           }

           if(seq.contentType == 13 && this.sendStaff == 2)
{
              if(!isStaffOrBot(seq.contentMetadata.mid)) {
                 seq.contentType = 0;
                 this.sendStaff = 0;
                 await this._sendMessage(seq,'Dia Bukan Staff~');
       }
     else
       {
            seq.contentType = 0;
            while (myBott[myBott.indexOf(seq.contentMetadata.mid)])
        {
            delete myBott[myBott.indexOf(seq.contentMetadata.mid)];
        }
    this.sendStaff = 0;
    await this._sendMessage(seq,'Sukses Menghapus Staff~');
    }
}

        if(txt == 'info group') {
           this._sendMessage(seq, 'Nama Group :\n'+ginfo.name+'\n\nGroup ID :\n'+ginfo.id+'\n\nPembuat Group :\n'+ginfo.creator.displayName);
         }

        if(txt == 'respon') {
           if(!isAdminOrBot(seq.from) || !isStaffOrBot(seq.from)) {
            this._sendMessage(seq, 'Bot Masih Aktif 􀂳');
           }
        }

        if(txt == 'help') {
           this._sendMessage(seq, '==============================\n αll cσmmαnd\n==============================\n☞ gift\n☞ halo\n☞ help\n☞ creator\n☞ Bc [Jumlah] /[Text] (Jika Bc On)\n☞ info group\n☞ group creator\n☞ tag all\n☞ speed\n☞ set\n☞ check\n☞ status/setting\n☞ clear\n☞ hak admin dan staff\n\n==============================\n\n==============================\n☞ respon\n☞ Open url\n☞ Close url\n☞ bye\n☞ spam\n☞ Cancel on/off\n☞ Lockinvite on/off\n☞ Lockupdategroup on/off\n☞ LockJoin on/off\n☞ LockCancel on/off\n☞ Autokick on/off\n☞ Autojoin on/off\n☞ Kill「@」\n☞ msg\n☞ Bc on/off\n☞ Sambutan on/off\n\n==============================\n\n==============================\n☞ mute\n☞ unmute\n☞ add staff\n☞ remove staff\n\n==============================\nN A D Y A\n==============================');
        }

         if(txt == 'hak admin dan staff' || txt == 'hak staff dan admin') {
            this._sendMessage(seq, 'Staff Bisa Memakai Command Yang Di Staff Dan All Tetapi Tidak Bisa Memakai Command Yang Di Admin Serta Tidak Bisa Inv Bot Ke Group Mana Pun (Isitilah Nya Kek CreatorGroup Siri Lah Tpi Tidak Bisa Change, Kalo Mao Change Perlu Minta Ke Admin)\n\nKalo Admin Bisa Memakai Command All, Staff, Admin Dan Membawa Bot Kemana Pun Tanpa Limit (Kecuali Situ Limit Inv)\n\n-NADYA-');
         }

         if(txt == 'status') {
            this._sendMessage(seq,`Status: \n${JSON.stringify(this.stateStatus)}\n\n*Note: Jika Status Menunjukkan 0 Itu Berarti Off Dan Jika Status Menunjukkan 1 Itu Berarti On.\n\n-NADYA-`);
          }

		if(txt == "setting"){
			this.setState(seq,1)
		}

        if(txt == 'noob') {

           seq.contentType = 7
           seq.contentMetadata = {'STKID':'404','STKPKGID':'1','STKVER':'100'};
           this._client.sendMessage(3, seq);
          }

          if(txt == 'gift') {
             seq.contentType = 9
             seq.contentMetadata = {'PRDID': 'a0768339-c2d3-4189-9653-2909e9bb6f58','PRDTYPE': 'THEME','MSGTPL': '5'};
             this._client.sendMessage(1, seq);
          }

        if(txt == 'halo') {
          if(!isAdminOrBot(seq.from) || !isStaffOrBot(seq.from)) {
        this._sendMessage(seq, 'Halo Juga Admin Atau Staff');
        }
      else
        {
         this._sendMessage(seq, 'Hallo Juga Kakak :)');
         }
     }



        if(txt == 'speed') {
            const curTime = (Date.now() / 1000);

            await this._sendMessage(seq,'Tunggu...');


            const rtime = (Date.now() / 1000) - curTime;
            await this._sendMessage(seq, `${rtime} second`);
        }

        if(txt == 'tag all') {
let { listMember } = await this.searchGroup(seq.to);
     const mentions = await this.mention(listMember);
        seq.contentMetadata = mentions.cmddata; await this._sendMessage(seq,mentions.names.join(''))
        }

        if(txt === 'kernelo') {
            exec('uname -a;ptime;id;whoami',(err, sto) => {
                this._sendMessage(seq, sto);
            })
        }

        if(txt == 'set') {
            this._sendMessage(seq, `Pembacaan Read Dimulai Dari Sekarang.`);
            this.removeReaderByGroup(seq.to);
        }

        if(txt == 'clear') {

            this.checkReader = []
            this._sendMessage(seq, `Menghapus Data Pembacaan Read`);
        }  


        if(txt == 'check'){
            let rec = await this.recheck(this.checkReader,seq.to);
            const mentions = await this.mention(rec);
            seq.contentMetadata = mentions.cmddata;
            await this._sendMessage(seq,mentions.names.join(''));
            
        }

         if (txt == 'group creator') {
             let gcreator = await this._getGroup(seq.to);
             seq.contentType = 13;
             seq.contentMetadata = {mid: gcreator.creator.mid, displayName: gcreator.creator.displayName};
             this._client.sendMessage(1, seq);
         }

        if(txt == 'creator') {
           this._sendMessage(seq, 'My Creator Is Bee\nId Line : http://line.me/ti/p/~nad_nad.\n\n-NADYA-');
           seq.contentType=13;
           seq.contentMetadata = { mid: 'u14f64e139a3817afaabe27d237afb36b' };
           this._client.sendMessage(1, seq);
        }

        if(txt == 'me') {
           seq.contentType=13;
           seq.contentMetadata ={ mid: seq.from };
           this._client.sendMessage(1, seq);
        }

        if(txt == 'myid') {
           seq.contentType=0;
           seq.contentMetadata =(`Your ID: ${seq.from}`);
           this._client.sendMessage(1, seq);
        }


        if(txt == 'setpoint for check reader .') {
            this.searchReader(seq);
        }

        if(txt == 'clearall') {
            this.checkReader = [];
        }


		if(txt == "mute") {
			this.stateStatus.mute = 1;
			this._sendMessage(seq,"BOT OFF")
		}

        const action = ['lockinvite on','lockinvite off','lockupdategroup on','lockupdategroup off','lockjoin on','lockjoin off','lockcancel on','lockcancel off','kick on','kick off','cancel on','cancel off','bc on','bc off','sambutan on','sambutan off','autokick on','autokick off','autojoin on','autojoin off']
        if(action.includes(txt)) {
            this.setState(seq)
        }

        const joinByUrl = ['open url','close url'];
        if(joinByUrl.includes(txt)) {
            this._sendMessage(seq,`Tunggu Sebentar ...`);
            let updateGroup = await this._getGroup(seq.to);
            updateGroup.preventJoinByTicket = true;
            if(txt == 'open url') {
                updateGroup.preventJoinByTicket = false;
                const groupUrl = await this._reissueGroupTicket(seq.to)
                this._sendMessage(seq,`Link Group = line://ti/g/${groupUrl}`);
            }
            await this._updateGroup(updateGroup);
        }

        if(cmd == 'join') { //untuk join group pake qrcode contoh: join line://anu/g/anu
            const [ ticketId ] = payload.split('g/').splice(-1);
            let { id } = await this._findGroupByTicket(ticketId);
            await this._acceptGroupInvitationByTicket(id,ticketId);
        }

        if(cmd == 'Kill'){
           let target = payload.replace('@','');
           let group = await this._getGroups([seq.to]);
           let gm = group[0].members;
              for(var i = 0; i < gm.length; i++){
                     if(gm[i].displayName == target){
                                  target = gm[i].mid;
                     }
               }

               this._kickMember(seq.to,[target]);
        }

               if(cmd == 'bc' || cmd == 'Bc' && this.stateStatus.bc == 1) {
                  const [  j, kata ] = payload.split('/');
                  for (var i=0; i <j; i++) {
                  this._sendMessage(seq,`${kata}`);
                }
          }

        if(cmd == 'spam') {
            for(var i= 0; i < 20;  i++) {
               this._sendMessage(seq, 'FUCK YOU!!!~');
        }
    }

        if(cmd == 'spm') { // untuk spam invite contoh: spm <mid>
            for (var i = 0; i < 100; i++) {
                this._createGroup(`FUCK YOU`,payload);
            }
        }
        
        if(txt == 'bye') {
           if(!isAdminOrBot(seq.from) || !isStaffOrBot(seq.from)){
          let txt = await this._sendMessage(seq, 'Kami Dari Anak Nadya Mengucapkan Terima Kasih Atas Groupnya Dan Kami Izin Leave~');
          this._leaveGroup(seq.to);
        }
    }

        if(cmd == 'lirik') {
            let lyrics = await this._searchLyrics(payload);
            this._sendMessage(seq,lyrics);
        }

        if(cmd === 'ip') {
            exec(`curl ipinfo.io/${payload}`,(err, res) => {
                const result = JSON.parse(res);
                if(typeof result.error == 'undefined') {
                    const { org, country, loc, city, region } = result;
                    try {
                        const [latitude, longitude ] = loc.split(',');
                        let location = new Location();
                        Object.assign(location,{ 
                            title: `Location:`,
                            address: `${org} ${city} [ ${region} ]\n${payload}`,
                            latitude: latitude,
                            longitude: longitude,
                            phone: null 
                        })
                        const Obj = { 
                            text: 'Location',
                            location : location,
                            contentType: 0,
                        }
                        Object.assign(seq,Obj)
                        this._sendMessage(seq,'Location');
                    } catch (err) {
                        this._sendMessage(seq,'Not Found');
                    }
                } else {
                    this._sendMessage(seq,'Location Not Found , Maybe di dalem goa');

                }
            })
        }
    }

}

module.exports = new LINE();