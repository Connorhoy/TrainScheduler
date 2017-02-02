// JS Code for Train Scheduler Homework Assignment
// Project Title: Train Scheduler
// Created by Connor Hoy, worked in tandem with Austin I, with most JS taken from online, but edited and understood.
// .diff() is life.



  // Initializ Firebase

  var config = {
    apiKey: "AIzaSyDKv1Qw9cG5JdYGP-B6oMmfNijPl9mrEGs",
    authDomain: "trainschedulerapp-cf0f4.firebaseapp.com",
    databaseURL: "https://trainschedulerapp-cf0f4.firebaseio.com",
    storageBucket: "trainschedulerapp-cf0f4.appspot.com",
    messagingSenderId: "121382734539"
  };

  firebase.initializeApp(config);

  // Making a reference to the database.
  var database = firebase.database();

// Variables we'll be utilizing in the Train Scheduler application.
var name ='';
var destination = '';
var firstTrainTime = '';
var frequency = '';
var nextTrain = '';
var nextTrainFormatted = '';
var minutesAway = '';
var firstTimeConverted = '';
var currentTime = '';
var diffTime = '';
var tRemainder = '';
var minutesTillTrain = '';
var keyHolder = '';
var getKey = '';


$(document).ready(function() {

     $("#add-train").on("click", function() {
      console.log("button clicked");

      // Prevents defualt action being taken.
       event.preventDefault();

     	name = $('#name-input').val().trim();
     	destination = $('#destination-input').val().trim();
     	firstTrainTime = $('#first-train-time-input').val().trim();
     	frequency = $('#frequency-input').val().trim();
          firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
          currentTime = moment();
          diffTime = moment().diff(moment(firstTimeConverted), "minutes");
          tRemainder = diffTime % frequency;
          minutesTillTrain = frequency - tRemainder;
          nextTrain = moment().add(minutesTillTrain, "minutes");
          nextTrainFormatted = moment(nextTrain).format("hh:mm");

     	// Code for the push.
     	database.ref().push({
     		name: name,
     		destination: destination,
     		firstTrainTime: firstTrainTime,  
     		frequency: frequency,
               nextTrainFormatted: nextTrainFormatted,
               minutesTillTrain: minutesTillTrain
     	});

     	$('#name-input').val('');
     	$('#destination-input').val('');
     	$('#first-train-time-input').val('');
     	$('#frequency-input').val('');

     	return false;
     });

     database.ref().on("child_added", function(childSnapshot) {

		$('.train-schedule').append("<tr class='table-row' id=" + "'" +  + "'" + ">" +
               "<td class='col-xs-3'>" + childSnapshot.val().name +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().destination +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().frequency +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().nextTrainFormatted + 
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().minutesTillTrain + 
               "</td>" +
               "<td class='col-xs-1'>" + "<input type='submit' value='remove train' class='remove-train btn btn-primary btn-sm'>" + "</td>" +
          "</tr>");

// Handles and consoles out any errors.
}, function(errorObject){
	console.log("Errors handled: " + errorObject.code)
});


// Allows the user to remove a train from the selection. (BONUS POINTS BABY)
$("body").on("click", ".remove-train", function(){
     $(this).closest ('tr').remove();
     getKey = $(this).parent().attr('id');
     database.child(getKey).remove();
});

}); 