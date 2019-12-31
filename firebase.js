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

var db = firebase.firestore();

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

  $("#inputDataWater").click(function() {
    var homeNumber = $("#number").val();
    var beforeWater = $("#before").val();
    var afterWater = $("#after").val();
    var Datetime = $("#date").val();
    console.log(Datetime);
    console.log(homeNumber);
    console.log(beforeWater);
    console.log(afterWater);
  });
});
