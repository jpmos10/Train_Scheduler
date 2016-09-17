// Initialize Firebase
var config = {
    apiKey: "AIzaSyCM2pxkn44c0qOTCKRzgd9fDa_8_d9X83Q",
    authDomain: "traintime-536df.firebaseapp.com",
    databaseURL: "https://traintime-536df.firebaseio.com",
    storageBucket: "traintime-536df.appspot.com",
    messagingSenderId: "589897693668"
};
firebase.initializeApp(config);
var database = firebase.database();


// 2. Button for adding Employees
$("#addTrain").on("click", function() {

    // Grabs user input
    var trainName = $("#trainName").val().trim();
    var etrainDest = $("#trainDest").val().trim();
    //var empStart = moment($("#startInput").val().trim(), "DD/MM/YY").format("X");
    var frequency = $("#frequency").val().trim();

    // Creates local "temporary" object for holding employee data
    var newTrain = {
        name: trainName,
        role: trainDest,
        //start: empStart,
        frequency: frequency
    }

    // Uploads employee data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.trainName);
    console.log(newTrain.trainDest);
    //console.log(newTrain.start);
    console.log(newTrain.frequency)

    // Alert
    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#trainName").val("");
    $("#trainDest").val("");
    //$("#startInput").val("");
    $("#frequency").val("");

    // Prevents moving to new page
    return false;
});


// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().trainName;
    var trainDest = childSnapshot.val().trainDest;
    //var empStart = childSnapshot.val().start;
    var frequency = childSnapshot.val().frequency;

    // Employee Info
    console.log(trainName);
    console.log(trainDest);
    //console.log(empStart);
    console.log(frequency);

    // Prettify the employee start
    var empStartPretty = moment.unix(empStart).format("MM/DD/YY");
    // Calculate the months worked using hardconre math
    // To calculate the months worked
    var empMonths = moment().diff(moment.unix(empStart, 'X'), "months");
    console.log(empMonths);

    // Calculate the total billed rate
    var empBilled = empMonths * empRate;
    console.log(empBilled);

    // Add each train's data into the table
    $("#employeeTable > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" + empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");

});
