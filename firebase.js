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

$(function() {
  $("#inputdata").click(function() {
    //location.href = "inputData.html";

    $("#test").empty();
    db.collection("water-home")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          var item = `${doc.data().N}`;
          $("#test").append(item);
        });
      });
  });
  //ค่าน้ำหน่วยละ 5 บ.
  $("#inputDataWater").click(function() {
    homeNumber = $("#number").val();
    beforeWater = $("#before").val();
    afterWater = $("#after").val();
    Datetime = $("#date").val();
    units = afterWater - beforeWater;
    total = units * WATER;
    console.log(Datetime);
    console.log(homeNumber);
    console.log(beforeWater);
    console.log(afterWater);
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
      <a class="card-link" onclick="waterMark(${"homeNumber"},${"Datetime"},${beforeWater},${afterWater},${units},${total})">บันทึก</a>
      <a class="card-link" onclick="waterBack()">กลับ(จะไม่มีการเก็บข้อมูล)</a>
      </div>`;
      $("#Details").append(details);
      //
    }
  });
});
//NUMBER, DAY, BEFORE, AFTER, UNITS, TOTAL

function waterMark(NUMBER, DAY, BEFORE, AFTER, UNITS, TOTAL) {
  alert(`คุณแน่ใจแล้วใช่ไหมที่จะเก็บข้อมูลพวกนี้ <br>
  วัน เดือน ปี: ${DAY} <br>
  บ้านเลขที่: ${NUMBER} <br>
  จดก่อน: ${BEFORE} <br>
  จดหลัง: ${AFTER} <br>
  หน่วยที่ใช่: ${UNITS} <br>
  จำนวนเงิน: ${TOTAL} <br>
  `)
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
}
function waterBack(){
// var wanwela;
// alert(wanwela.toLocaleDateString());
}