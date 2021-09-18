const thrift = ต้องการ ('thrift-http');
const unirest = ต้องการ ('unirest');
const qrcode = ต้องการ ('qrcode-terminal');
const util = ต้องการ ("util");
const mime = ต้องการ ("mime");
const fs = ต้องการ ('fs');
เส้นทาง const = ต้องการ ('เส้นทาง');
const rp = ต้องการ ('ขอสัญญา');
คำขอ const = ต้องการ ('คำขอ');
const เนื้อเพลง = ต้องการ ('../helpers/lirik');
const Ig = ต้องการ ('../helpers/instagram');

const LineService = ต้องการ ('../curve-thrift/LineService');
const {
  เข้าสู่ระบบResultType,
  ผู้ให้บริการข้อมูลประจำตัว,
  ชนิดของเนื้อหา,
  ข้อความ,
  คำขอเข้าสู่ระบบ
} = ต้องการ ('../curve-thrift/line_types');
const imgArr = ['png','jpg','jpeg','gif','bmp','webp'];


const PinVerifier = ต้องการ ('./pinVerifier');
var config = ต้องการ ('./config');
var moment = ต้องการ ('ช่วงเวลา');
var reqx = ใหม่ LoginRequest();
var reqxy = ใหม่ LoginRequest();

ฟังก์ชัน isImg (พารามิเตอร์) {
    ส่งคืน imgArr.includes (พารามิเตอร์);
}

ฟังก์ชัน ambilKata(params, kata1, kata2){
    if(params.indexOf(kata1) === false) คืนค่าเท็จ
    if(params.indexOf(kata2) === false) คืนค่าเท็จ
    ให้เริ่ม = params.indexOf(kata1) + kata1.length;
    ให้ end = params.indexOf(kata2, start);
    ให้ผลตอบแทน = params.substr(เริ่ม, สิ้นสุด - เริ่ม);
    ผลตอบแทนกลับ;
}

คลาส LineAPI {
  ตัวสร้าง () {
    this.config = config;
    this.setTHttpClient();
	this.axz = เท็จ;
	this.axy = เท็จ;
	this.gdLine = "http://gd2.line.naver.jp";
	this.gdLine2 = "http://gf.line.naver.jp";
  }

  setTHttpClient (ตัวเลือก = {
    โปรโตคอล: thrift.TCompactProtocol,
    ขนส่ง: thrift.TBufferedTransport,
    ส่วนหัว: this.config.Headers,
    เส้นทาง: this.config.LINE_HTTP_URL,
    https: จริง
  }) {
    options.headers['X-Line-Application'] = 'CHROMEOS\t2.1.5\tChrome_OS\t1';
// options.headers['X-Line-Application'] = 'DESKTOPMAC 10.10.2-YOSEMITE-x64 MAC 4.5.0';
// options.headers['X-Line-Application'] = 'DESKTOPMAC\t5.3.3-YOSEMITE-x64\tMAC\t10.12.0';
    this.options = ตัวเลือก;
    this.connection =
      thrift.createHttpConnection(this.config.LINE_DOMAIN_3RD, 443, this.options);
    this.connection.on('ข้อผิดพลาด', (ผิดพลาด) => {
      console.log('err', ผิดพลาด);
      กลับผิดพลาด;
    });
		if(this.axz === จริง){
			this._channel = thrift.createHttpClient(LineService, this.connection);this.axz = เท็จ;
		} else if(this.axy === จริง){
			this._authService = thrift.createHttpClient(LineService, this.connection);this.axy = เท็จ;
		} อื่น {
		    this._client = thrift.createHttpClient(LineService, this.connection);
		}
    
  }
  
  async _chanConn(){
	  this.options.headers['X-Line-Access'] = this.config.tokenn;
	  this.options.path = this.config.LINE_CHANNEL_PATH;
	  this.axz = จริง;
	  this.setTHttpClient(this.options);
	  กลับ Promise.resolve();
  }
  
  async _authConn(){
	  this.axy = จริง;
	  this.options.path = this.config.LINE_RS;
      this.setTHttpClient(this.options);
	  กลับ Promise.resolve();
  }

  async _tokenLogin (authToken ใบรับรอง) {
	this.options.path = this.config.LINE_COMMAND_PATH;
    this.config.Headers['X-Line-Access'] = authToken;config.tokenn = authToken;
    this.setTHttpClient(this.options);
    ส่งคืน Promise.resolve ({ authToken ใบรับรอง });
  }

  _qrCodeLogin() {
    this.setTHttpClient();
    คืนสัญญาใหม่ ((แก้ไข, ปฏิเสธ) => {
    this._client.getAuthQrcode(true, 'Nadya',(err, result) => {
      const qrcodeUrl = `line://au/q/${result.verifier}`;
      qrcode.generate (qrcodeUrl, {เล็ก: จริง});
      console.info(`\n\nลิงก์รหัส qr คือ: ${qrcodeUrl}`)
      Object.assign(this.config.Headers,{ 'X-Line-Access': result.verifier });
        unirest.get('https://gd2.line.naver.jp/Q')
          .headers (this.config.Headers)
          .timeout(1200000)
          .end (ไม่ตรงกัน (res) => {
            constVerifiedQr = res.body.result.verifier;
			this._authConn();
			reqx.type = 1;
			reqx.verifier = verifiedQr;
			this._authService.loginZ(reqx,(err,success) => {
				config.tokenn = Success.authToken;
				config.certificate = success.certificate;
				const authToken = config.tokenn;
			    ใบรับรอง const = config.certificate;
                this.options.headers['X-Line-Access'] = config.tokenn;
                this.options.path = this.config.LINE_COMMAND_PATH;
                this.setTHttpClient(this.options);
			    this.options.headers['User-Agent'] = 'บรรทัด/2.1.5';
			    this.axz = จริง;
			    this.setTHttpClient(this.options);
			    this.axz = เท็จ;
                แก้ไข ({ authToken, ใบรับรอง, VerifiedQr });
			})
          });
      });
    });
  }
  
  _xlogin(id,รหัสผ่าน){
	  const pinVerifier = PinVerifier ใหม่ (id, รหัสผ่าน);
      ส่งคืน Promise ใหม่ ((แก้ไข, ปฏิเสธ) => (
	     this._setProvider(id).then(() => {
			 this.setTHttpClient();
			 this._getRSAKeyInfo (this.provider, (คีย์, หนังสือรับรอง) => {
				 this.options.path = this.config.LINE_RS;
                 this.setTHttpClient(this.options);
				 const rsaCrypto = pinVerifier.getRSACrypto (ข้อมูลรับรอง);
				 reqx.type = 0;
				 reqx.identityProvider = this.provider;
				 reqx.identifier = rsaCrypto.keyname;
				 reqx.password = rsaCrypto.credentials;
				 reqx.keepLoggedIn = จริง;
				 reqx.accessLocation = this.config.ip;
				 reqx.systemName = 'LineAlphatFork-PC';
				 reqx.e2eeVersion = 0;
				 ลอง{
					 this._client.loginZ(reqx,
					 (ผิดพลาดสำเร็จ) => {
						 ถ้า (ผิดพลาด) {
                             console.log('\n\n');
                             console.error("=> "+err.reason);
                             process.exit();
                         }
						 this.options.path = this.config.LINE_COMMAND_PATH;
                         this.setTHttpClient(this.options);
						 this._authConn();
						 this._client.pinCode = success.pinCode;
                		 console.info("\n\n=============================\nป้อน Pincode นี้ => "+success.pinCode+" \nไปยังโทรศัพท์มือถือของคุณใน 2 นาที\n=============================");
                		 this._checkLoginResultType(success.type, ความสำเร็จ);
						 reqxy.type = 1;
               		     this._loginWithVerifier((verifierResult) => {
							 this.options.path = this.config.LINE_COMMAND_PATH;
                             this.setTHttpClient(this.options);
							 config.tokenn = verifierResult.authToken;
               		         this._checkLoginResultType(verifierResult.type, verifierResult);
               		         แก้ไข(ผลการตรวจสอบ);
              		     });
					 });
				 }จับ(ผิดพลาด) {
                     console.log('ข้อผิดพลาด');
                     console.log (ข้อผิดพลาด);
                 }
			 })
		 })
	  ));
  }

  async _loginWithVerifier (โทรกลับ) {
    ให้ retx = รอ this.getJson (this.config.LINE_CERTIFICATE_URL)
	reqxy.verifier = retx.result.verifier;
	this._authService.loginZ(reqxy,(err,success) => {
		โทรกลับ(สำเร็จ);
	})
  }

  _setProvider(id) {
    this.provider = this.config.EMAIL_REGEX.test(id) ?
      IdentityProvider.LINE :
      IdentityProvider.NAVER_KR;

    ส่งคืน this.provider === IdentityProvider.LINE ?
      this.getJson(this.config.LINE_SESSION_LINE_URL) :
      this.getJson(this.config.LINE_SESSION_NAVER_URL);
  }

  _checkLoginResultType(ประเภท, ผลลัพธ์) {
    this.config.Headers['X-Line-Access'] = result.authToken || ผลการตรวจสอบ;
    ถ้า (result.type === LoginResultType.SUCCESS) {
      this.certificate = result.certificate;
      this.authToken = result.authToken;
    } else if (result.type === LoginResultType.REQUIRE_QRCODE) {
      console.log('ต้องการรหัส QR');
    } else if (result.type === LoginResultType.REQUIRE_DEVICE_CONFIRM) {
      console.log('ต้องยืนยันอุปกรณ์');
    } อื่น {
      โยนข้อผิดพลาดใหม่ ('ประเภทที่ไม่รู้จัก');
    }
    ส่งคืนผลลัพธ์;
  }
  
  async gooGl (longUri){
	ส่งคืน Promise ใหม่ ((แก้ไข, ปฏิเสธ) => (unirest.post("https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyAsxyBNNjSqSKcEEElAzWBERqRF95QMMeY") ส่วนหัว ({'Content-Type': 'application /json'}).timeout(120000).send({longUrl: longUri}).end((res) => {res.error ?reject(res.error) : แก้ไข (res.body)})));
  }

  _sendMessage (ข้อความ txt seq = 0) {
    message.text = txt;
    ส่งคืน this._client.sendMessage(0, ข้อความ);
  }

  _kickMember (กลุ่ม memid) {
    ส่งคืน this._client.kickoutFromGroup(0,group,memid);
  }

  _cancel(groupid,สมาชิก) {
    ส่งคืน this._client.cancelGroupInvitation(0,groupid,member);
  }

  async _getGroupsJoined () {
    กลับมารอ this._client.getGroupIdsJoined()
  }

  async _myProfile () {
    กลับมารอ this._client.getProfile();
  }
  async _getGroupsInvited () {
    กลับมารอ this._client.getGroupIdsInvited()
  }

  async _acceptGroupInvitation (groupid) {
    this._client.acceptGroupInvitation(0,groupid);
    รอสิ่งนี้._getGroupsInvited();
    รอสิ่งนี้._getGroupsJoined();
    กลับ;
  }
  
  _inviteIntoGroup (กลุ่ม memid) {
    ส่งคืน this._client.inviteIntoGroup(0,group,memid);
  }

  _invite(กลุ่ม,สมาชิก) {
    ส่งคืน this._client.inviteIntoGroup(0, กลุ่ม, สมาชิก)
  }

  async _updateGroup (กลุ่ม) {
    กลับมารอ this._client.updateGroup(0, group)
  }

  _getContacts (กลาง) {
    ส่งคืน this._client.getContacts (กลาง)
  }
  
  _getProfile(กลาง){
	  ส่งคืน this._client.getProfile(กลาง);
  }

  async _getGroups (groupId) {
      กลับมารอ this._client.getGroups(groupId);
  }

  async _getGroup (groupId) {
    กลับมารอ this._client.getGroup(groupId);
  }
  
  async _getAllContactIds(){
	กลับมารอ this._client.getAllContactIds();
  }
  
  async _getRoom (รหัสห้อง) {
    กลับมารอ this._client.getRoom(roomId);
  }

  async _reissueGroupTicket (groupId) {
    กลับมารอ this._client.reissueGroupTicket(groupId);
  }

  async _findGroupByTicket (รหัสตั๋ว){
    กลับมารอ this._client.findGroupByTicket(ticketID);
  }
  
  async _acceptGroupInvitationByTicket (gid,ticketID){
    กลับมารอ this._client.acceptGroupInvitationByTicket(0,gid,ticketID);
  }
  
  async _dlImg (uri, ชื่อไฟล์, โทรกลับ){
    รอ rp.head(uri, function(err, res, body){rp(uri).pipe(fs.createWriteStream(filenames)).on('finish', callback);});
  };
  
  async _getRSAKeyInfo (ผู้ให้บริการ โทรกลับ){
	  ให้ผล = รอนี้._client.getRSAKeyInfo(ผู้ให้บริการ);
	  โทรกลับ (result.keynm, ผลลัพธ์);
  }
  
  async _fsUnlinkFile (extF, filepaths){
    fs.unlinkSync (เส้นทางของไฟล์);
  }
  
  async _getServerTime (ประทับเวลา){
      ให้จัดรูปแบบ = moment("/Date("+timestamp+"-0700)/")toString();
	  ส่งคืนรูปแบบ;
  }
  
  async _sendImageWithURL (ไปยัง, url, extF, เส้นทางของไฟล์){
	ถ้า(isImg(ต่อF)){
		this._sendFile(to,filepaths,1);
	}อื่น{
		ให้ aM = ข้อความใหม่ ();aM.to = to;aM.text = "Gagal, ไฟล์ ekstensi tidak diperbolehkan !";this._client.sendMessage(0,aM);
	}
  }
  
  _timeParse(วินาทีx){
	  ให้ sec_num = parseInt(secondx, 10); // อย่าลืม param ที่สอง
      ให้ชั่วโมง = Math.floor(sec_num / 3600);
      ให้นาที = Math.floor((sec_num - (hours * 3600)) / 60);
      ให้วินาที = sec_num - (ชั่วโมง * 3600) - (นาที * 60);

    ถ้า (ชั่วโมง < 10) {ชั่วโมง = "0"+ชั่วโมง;}
    ถ้า (นาที < 10) {นาที = "0"+นาที;}
    ถ้า (วินาที < 10) {วินาที = "0"+วินาที;}
    ส่งกลับชั่วโมง+':'+นาที+':'+วินาที;
  }
  
  async _textToSpeech (คำ ภาษา การโทรกลับ){
	  ให้ namef = __dirname+this.config.FILE_DOWNLOAD_LOCATION+"/tts.mp3";
	  const xoptions = {
          URL: `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(words)}&tl=${lang}&client=tw-ob&ttsspeed=0.24`,
          ส่วนหัว: {
              'ผู้อ้างอิง': 'http://translate.google.com/',
              'ตัวแทนผู้ใช้': 'stagefright/1.2 (Linux; Android 5.0)'
          }
      }
	  rp(xoptions).pipe(fs.createWriteStream(namef)).on('close', ()=>{callback(namef);})
  }
  
  async _youSound (url, โทรกลับ){
	  ให้ xurl = urls.replace(/\\/g , "");
	  ให้ video_id = xurl.split('v=')[1];
	  ให้ ampersandPosition = video_id.indexOf('&');
      if(เครื่องหมายและตำแหน่ง != -1) {
          video_id = video_id.substring(0, เครื่องหมายและตำแหน่ง);
      }
	  const xoptions = {
          URL: "http://www.yt-mp3.com/fetch?v="+video_id+"&referrer=http%3A%2F%2Fwww.yt-mp3.com%2F&apikey=yt-mp3.com",
          ส่วนหัว: {
              'ผู้อ้างอิง': 'http://www.yt-mp3.com',
              'ตัวแทนผู้ใช้': 'stagefright/1.2 (Linux; Android 5.0)',
          },
		  json: จริง
      }
	  rp (xoptions).then (ฟังก์ชัน (parsedBody) {
        โทรกลับ (parsedBody);
      })
    .catch (ฟังก์ชัน (ผิดพลาด) {
        console.info(ผิดพลาด);
      });
  }
  
  async _sendFile (ข้อความ เส้นทางของไฟล์ typeContent = 1) {
    ให้ชื่อไฟล์ = 'สื่อ';
    ให้ typeFile;
    
    สวิตช์ (typeContent) {
      กรณีที่ 2:
        typeFile = 'วิดีโอ'
        หยุดพัก;
      กรณีที่ 3:
        typeFile = 'เสียง'
        หยุดพัก;
      ค่าเริ่มต้น:
        typeFile = 'รูปภาพ'
        หยุดพัก;
    }

    ให้ M = ข้อความใหม่ ();
    M.to = ข้อความถึง;
    M.contentType= typeContent;
    M.contentPreview= null;
    M.contentMetadata= null;


    const filepath = path.resolve (เส้นทางไฟล์)
    fs.readFile (เส้นทางของไฟล์, async (ผิดพลาด, bufs) => {
      ให้ imgID = รอนี้._client.sendMessage(0,M);
        ข้อมูล const = {
          พารามิเตอร์: JSON.stringify ({
            ชื่อ: ชื่อไฟล์,
            ออยด์: imgID.id,
            ขนาด: bufs.length,
            ชนิด: typeFile,
            เวอร์ชัน: '1.0'
          })
        };
        ส่งคืนสิ่งนี้
          .postContent(config.LINE_POST_CONTENT_URL, data, filepath)
          .then((res) => {
            ถ้า (res.err) {
              console.log('err',res.error)
              กลับ;
            } 
            if(filepath.search(/download\//g) === -1) {
              fs.unlink (เส้นทางของไฟล์ (ผิดพลาด) => {
                ถ้า (ผิดพลาด) {
                  console.log('err on upload', ผิดพลาด);
                  กลับผิดพลาด
                };
              });
            }
            
          });
    });
  }

  async _sendImage (ถึง, เส้นทางไฟล์) {
    this._sendFile(to,filepaths,1);
  }
  
  async _getAlbum(gid,ctoken){
	ให้บอท = รอนี้._client.getProfile();
	ให้ optionx = {
        uri: this.gdLine+'/mh/album/v3/albums?sourceType=GROUPHOME&homeId='+gid,
        ส่วนหัว: {
            "Content-Type": "application/json",
			"X-Line-Mid": bot.mid,
            "x-lct": ctoken
        }
    };

    ส่งคืน Promise ใหม่ ((แก้ไข, ปฏิเสธ) => (
      unirest.get(optionx.uri)
        .headers(optionx.headers)
        .timeout(1200000)
        .end((res) => (
          res.error ? ปฏิเสธ (res.error): แก้ไข (res.body)
        ))
    ));
  }
  
  /*async _insertAlbum(gid,albumId,ctoken,img){
	ให้บอท = รอนี้._client.getProfile();
	ให้ M = ข้อความใหม่ ();
    M.to = gid;
    M.contentType = 1;
    M.contentPreview = null;
	//ให้ imgID = รอนี้._client.sendMessage(0,M);//console.info("image/"+x[x.length-1]);
	console.info("aa");console.info(albumId);console.info(gid);

	const filepath = path.resolve (img)
    fs.readFile (เส้นทางของไฟล์, async (ผิดพลาด, bufs) => {
      ให้ imgID = รอนี้._client.sendMessage(0,M);
      console.log(imgID.id);console.info(gid);console.info(bot.mid);console.info(img);คอนโซล.log(imgID.id);console.info(gid);console.info(bot.mid);console.info(img);
        ข้อมูล const = {
          พารามิเตอร์: JSON.stringify ({
            รหัสผู้ใช้: gid,
            ออยด์: imgID.id,
            ประเภท: 'ภาพ',
            เวอร์ชัน: '1.0'
          })
        };
        ส่งคืน this.postAlbum("http://obs-jp.line-apps.com/talk/m/object_info.nhn",bot.mid,albumId,ctoken, data, filepath).then((res) => ( res.error ? console.log('err',res.error): console.log('done')));
    });
  }*/
  
  async _createAlbum(gid,ชื่อ,ctoken){
	ให้บอท = รอนี้._client.getProfile();
	ให้ optionx = {
    วิธีการ: 'POST',
    uri: this.gdLine+'/mh/album/v3/album?count=1&auto=0&homeId='+gid,
    ร่างกาย: {
        ประเภท: "ภาพ",
		ชื่อเรื่อง: ชื่อ
    },
	ส่วนหัว: {
        "Content-Type": "application/json",
		"X-Line-Mid": bot.mid,
        "x-lct": ctoken
    },
    json: true // ทำให้เนื้อหาเป็น JSON . โดยอัตโนมัติ
    };

    รอ rp (optionx)
      .then (ฟังก์ชัน (parsedBody) {
        //console.info(แยกวิเคราะห์ร่างกาย);
      })
    .catch (ฟังก์ชัน (ผิดพลาด) {
        //console.info(ผิดพลาด);
      });
  }
  
  async _autoLike(ctoken,limit,comment){
	ให้ homeres = รอนี้._getPost(limit,ctoken);
	ให้ ress = homeres.result;
	ให้โพสต์ = ress.posts;
	สำหรับ (var i = 0; i < limit; i++){
		ให้ชอบ = โพสต์[i].postInfo.liked;
		ให้ mids = โพสต์[i].userInfo.mid;
		ให้ postId = โพสต์[i].postInfo.postId;
		ถ้า (ชอบ === เท็จ){
			รอสิ่งนี้._ไลค์(mids,postId,ctoken,1002);
			รอ this._commentTL(mids,postId,ctoken,comment);
		}
		if(posts[i] == posts[posts.length-1]){
			config.doing = "ไม่";
		}
	}
  }
  
  async _commentTL (กลาง, postId, ctoken, ความคิดเห็น){
	ให้บอท = รอนี้._client.getProfile();
	ให้ optionx = {
    วิธีการ: 'POST',
    uri: this.gdLine+'/mh/api/v23/comment/create.json?homeId='+mid,
    ร่างกาย: {
        commentText: แสดงความคิดเห็น,
		กิจกรรมExternalId: postId,
		นักแสดง ID: mid
    },
	ส่วนหัว: {
        "Content-Type": "application/json",
		"X-Line-Mid": bot.mid,
        "x-lct": ctoken
    },
    json: true // ทำให้เนื้อหาเป็น JSON . โดยอัตโนมัติ
    };

    รอ rp (optionx)
      .then (ฟังก์ชัน (parsedBody) {
        //console.info(แยกวิเคราะห์ร่างกาย);
      })
    .catch (ฟังก์ชัน (ผิดพลาด) {
        //console.info(ผิดพลาด);
      });
  }
  
  async _liking (กลาง, postId, ctoken, likeTypes = 1001) {
	ให้บอท = รอนี้._client.getProfile();
	ให้ optionx = {
    วิธีการ: 'POST',
    uri: this.gdLine+'/mh/api/v23/like/create.json?homeId='+mid,
    ร่างกาย: {
        likeType: likeTypes,
		activityExternalId: postId,
		actorId: mid
    },
	headers: {
        "Content-Type": "application/json",
		"X-Line-Mid": bot.mid,
        "x-lct": ctoken
    },
    json: true // Automatically stringifies the body to JSON
    };

    await rp(optionx)
      .then(function (parsedBody) {
        //console.info(parsedBody);
      })
    .catch(function (err) {
        // POST failed...
      });
  }
  
  async _getPost(limit,ctoken){
	let bot = await this._client.getProfile();let ret = '';
	let optionx = {
        uri: this.gdLine+'/tl/mapi/v21/activities',
        headers: {
            "Content-Type": "application/json",
			"X-Line-Mid": bot.mid,
            "x-lct": ctoken
        }
    };

    return new Promise((resolve, reject) => (
      unirest.get(optionx.uri+'?postLimit='+limit)
        .headers(optionx.headers)
        .timeout(120000)
        .end((res) => (
          res.error ? reject(res.error) : resolve(res.body)
        ))
    ));
  }
  
  async _testT(albumId,ctoken){
	let bot = await this._client.getProfile();
	let optionx = {
		uri: this.gdLine+"/al/",
		headers: {
			"X-Line-Mid": bot.mid,
            "X-Line-ChannelToken": ctoken,
			"X-Line-Album": albumId
        }
	};
	
	return new Promise((resolve, reject) => (
      unirest.get(optionx.uri)
        .headers(optionx.headers)
        .timeout(120000)
        .end((res) => (
          res.error ? reject(res.error) : resolve(res.body)
        ))
    ));
  }
  
  async _getHome(mid,ctoken){
	let bot = await this._client.getProfile();
	let optionx = {
		uri: this.gdLine+"/mh/api/v27/post/list.json",
		headers: {
            "Content-Type": "application/json",
			"X-Line-Mid": bot.mid,
            "x-lct": ctoken
        }
	};
	
	return new Promise((resolve, reject) => (
      unirest.get(optionx.uri+'?homeId='+mid+'&commentLimit=2&sourceType=LINE_PROFILE_COVER&likeLimit=6')
        .headers(optionx.headers)
        .timeout(120000)
        .end((res) => (
          res.error ? reject(res.error) : resolve(res.body)
        ))
    ));
  }
  
  _isoToDate(param,callback){
	  let xdate = new Date(param);
	  let xyear = xdate.getFullYear();
	  let xmonth = xdate.getMonth()+1;
	  let xdt = xdate.getDate();

	  if (xdt < 10) {
	    xdt = '0' + xdt;
	  }
	  if (xmonth < 10) {
	    xmonth = '0' + xmonth;
	  }

	  callback(xyear+'-' + xmonth + '-'+xdt);
  }
  
  async _base64Image(src, callback) {
    let datax = fs.readFileSync(src).toString("base64");
    let cx = util.format("data:%s;base64,%s", mime.lookup(src), datax);
	callback(cx);
  }
  
  _getImageFromLine(oid,callback){
	  //console.info(oid);console.info(this.config.Headers);
	  unirest.get("https://obs-sg.line-apps.com/talk/m/download.nhn?oid="+oid+"&tid=original")
        .headers(
		  this.config.Headers
		)
        .timeout(120000)
        .end((res) => (
          res.error ? callback(res.error) : callback(res.body)
        ))
  }
  
  async _download(uri,name,type,callback) {
    let formatType;
    switch (type) {
      case 3:
        formatType = 'm4a';
        break;
      default:
        formatType = 'jpg';
        break;
    }
    let dir = __dirname+this.config.FILE_DOWNLOAD_LOCATION;
    if (!fs.existsSync(dir)){
      await fs.mkdirSync(dir);
    }
    await unirest
    .get(uri)
    .headers({
      ...this.config.Headers
    })
    .end((res) => {
        if(res.error) {
            console.log(res.error);
            return 'err';
        }
    }).pipe(fs.createWriteStream(`${dir}/${name}.${formatType}`)).on('finish', function () { callback(dir+name+"."+formatType); });;
	//callback(dir+name+"."+formatType);
  }
  
  async _animePost(data,callback){
    rp(data).then(function (repos) {callback(JSON.parse(repos));}).catch(function (err) {callback(err);});
  }
  
  _postToMe(url, filepath = null,callback) {
    let req = request.post("http://aksamedia.com/googlex/x-up.php", function (err, resp, body) {
      if (err) {
        callback('Error!');
      } else {
        callback(body);
      }
    });
    let form = req.form();
    form.append('file', fs.createReadStream(filepath));
  }

  postContent(url, data = null, filepath = null) {
    return new Promise((resolve, reject) => (
      unirest.post(url)
        .headers({
          ...this.config.Headers,
          'Content-Type': 'multipart/form-data'
        })
        .timeout(120000)
        .field(data)
        .attach('files', filepath)
        .end((res) => {
          res.error ? reject(res.error) : resolve(res)
        })
    ));
  }
  
  postAlbum(url,botmid,albumId,ctoken, data = null, filepath = null) {
    return new Promise((resolve, reject) => (
      unirest.post(url)
        .headers({
          "Content-Type": "application/x-www-form-urlencoded",
		  "X-Line-Mid": botmid,
		  "X-Line-Album": albumId,
          "x-lct": ctoken,
		  "x-obs-host": "obs-jp.line-apps.com"
        })
        .timeout(120000)
        .field(data)
        .attach('files', filepath)
        .end((res) => {
          res.error ? reject(res.error) : resolve(res)
        })
    ));
  }
  
   async _fetchOperations(revision, count) {
    // this.options.path = this.config.LINE_POLL_URL
    return this._client.fetchOperations(revision, count);
  }

 async  _fetchOps(revision, count = 0) {
    return this._client.fetchOps(revision, count,0,0);
  }

  async getJson(path,headerx) {
    return new Promise((resolve, reject) => (
      unirest.get(`https://${this.config.LINE_DOMAIN}${path}`)
        .headers(
		  this.config.Headers
		)
        .timeout(120000)
        .end((res) => (
          res.error ? reject(res.error) : resolve(res.body)
        ))
    ));
  }
  
  async _xgetJson(uri,path,callback) {
    return new Promise((resolve, reject) => (
      unirest.get(`${uri}${path}`)
        .timeout(120000)
        .end((res) => (
          res.error ? callback(res.error) : callback(res.body)
        ))
    ));
  }
}

module.exports = LineAPI;