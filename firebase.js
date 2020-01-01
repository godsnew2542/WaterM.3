// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDzC3MKzts8zV88PLnF9fNj5GgjRLJDcz4",
  authDomain: "water-93945.firebaseapp.com",
  databaseURL: "https://water-93945.firebaseio.com",
  projectId: "water-93945",
  storageBucket: "water-93945.appspot.com",
  messagingSenderId: "1095403922088",
  appId: "1:1095403922088:web:21336be155f17dd8bc589d",
  measurementId: "G-RYWPJCFPFD"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

//ค่่าน้ำหมู่บ้าน
var WATER = 5;

var homeNumber;
var beforeWater;
var afterWater;
var Datetime;
var units;
var total;
// ตัวเลือกเกี่ยวกับตกลง
var Confirm;

$(function() {
  // $("#inputdata").click(function() {
  //   //location.href = "inputData.html";

  //   // $("#test").empty();
  //   // db.collection("water-home")
  //   //   .get()
  //   //   .then(querySnapshot => {
  //   //     querySnapshot.forEach(doc => {
  //   //       var item = `${doc.data().N}`;
  //   //       $("#test").append(item);
  //   //     });
  //   //   });
  // });

  $("#inputDataWater").click(function() {
    homeNumber = $("#number").val();
    beforeWater = $("#before").val();
    afterWater = $("#after").val();
    Datetime = $("#date").val();
    units = afterWater - beforeWater;
    total = units * WATER;
    // console.log(Datetime);
    // console.log(homeNumber);
    // console.log(beforeWater);
    // console.log(afterWater);
    if (
      Datetime == "" ||
      homeNumber == "" ||
      beforeWater == "" ||
      afterWater == ""
    ) {
      alert("กรุณากรอกข้อมูลของท่านให้ครบถ้วน");
    } else if (
      Datetime != "" ||
      homeNumber != "" ||
      beforeWater != "" ||
      afterWater != ""
    ) {
      $("#Details").empty();
      var details = `
      <div class="card" style="width: 30rem;">
      <div class="card-body">
      <h5 class="card-title">บิลค่าน้ำ</h5>
      <h6 class="card-subtitle mb-2 text-muted">${homeNumber} ม.3 ต.โคกเคียน อ.ตะกั่วป่า จ.พังงา</h6>
      <p class="card-text">
          วันที่ ${Datetime}
          <table class="table table-bordered">
              <tr>
                  <th>จดก่อน</th>
                  <th>จดหลัง</th>
                  <th>หน่วยที่ใช้</th>
                  <th>บาท</th>
              </tr>
              <tr>
                  <th>${beforeWater}</th>
                  <th>${afterWater}</th>
                  <th>${units}</th>
                  <th>${total}</th>
              </tr>
          </table>
      </p>
      <a class="card-link" style="color: blue;" onclick="waterMark(${"homeNumber"},${"Datetime"},${beforeWater},${afterWater},${units},${total})">บันทึก</a>
      <a class="card-link" onclick="waterBack()">กลับ</a>
      </div>`;
      $("#Details").append(details);
    }
  });
});

function waterMark(NUMBER, DAY, BEFORE, AFTER, UNITS, TOTAL) {
  Confirm = confirm(`คุณแน่ใจแล้วใช่ไหมที่จะเก็บข้อมูลพวกนี้
  วัน เดือน ปี: ${DAY}
  บ้านเลขที่: ${NUMBER}
  จดก่อน: ${BEFORE}
  จดหลัง: ${AFTER}
  หน่วยที่ใช่: ${UNITS}
  จำนวนเงิน: ${TOTAL}
  `);
  if (Confirm == true) {
    db.collection("test-water")
      .doc(`${NUMBER},${DAY}`)
      .set({
        after: AFTER,
        before: BEFORE,
        datetime: DAY,
        homeNumber: NUMBER,
        total: TOTAL,
        units: UNITS
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  } else {
    // console.log("ไม่เลือก");
  }
}

function waterBack() {
  Confirm = confirm(`ระบบจะไม่บันทึกข้อมูล คุณแน่ใจหรือไหม`);
  if (Confirm == true) {
    location.href = "index.html";
  } else {
    // console.log("ไม่เลือก");
  }
}