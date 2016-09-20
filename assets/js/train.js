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
    var trainDest = $("#trainDest").val().trim();
    var firstTrainTime = $("#firstTrainTime").val().trim();
    var trfrequency = $("#trfrequency").val().trim();

    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrainTime);
    console.log(trFrequency);

    // Creates local "temporary" object for holding employee data
    var newTrain = {
        name: trainName,
        Dest: trainDest,
        nextArrivalTime: firstTrainTime,
        frequency: trfrequency
    }

    // Uploads employee data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.trainName);
    console.log(newTrain.trainDest);
    console.log(newTrain.nextArrivalTime);
    console.log(newTrain.trfrequency)

    // Alert
    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#trainName").val("");
    $("#trainDest").val("");
    $("#firstTrainTime").val("");
    $("#trfrequency").val("");

    // Prevents moving to new page
    return false;
});


// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().trainName;
    var trainDest = childSnapshot.val().trainDest;
    var firstTrainTime = childSnapshot.val().firstTrainTime;
    var frequency = childSnapshot.val().frequency;

    // Employee Info
    console.log(trainName);
    console.log(trainDest);
    console.log(firstTrainTime);
    console.log(frequency);

    var tFrequency = parseInt(newTrain.frequency);
    var firstTime = newTrain.nextArrivalTime;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log("firstTimeConverted:" + moment(firstTimeConverted));

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes")
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))

    // Add each train's data into the table
    $("#trains > tbody").append("<tr><td>" + newTrain.name + "</td><td>" + newTrain.Dest + "</td><td>" + newTrain.frequency + "min </td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "min" + "</td></tr>");

});
 // newTrain = {
 //        name: trainName,
 //        Dest: trainDest,
 //        nextArrivalTime: firstTrainTime,
 //        frequency: frequency