// JS Code for Train Scheduler Homework Assignment
// Project Title: Train Scheduler
// Created by Connor Hoy



  // Initialize Firebase

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