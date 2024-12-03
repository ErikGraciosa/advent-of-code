package day2;

public class Day2 {
    //Psuedo code
    //STAR 
    //Situation
      //The puzzle input has 1 report per line
        //Each report is a list of numbers(levels) separated by spaces
        //Reports can be 'safe'
          //Safe reports are either gradually all increasing or all decreasing
          //Gradually is defined as at least 1 and at most 3 difference between two 'levels'
    //Task
      //Parse the input into an array of arrays, with each line being its own array
      //Instantiate a safe counter
      //Loop through the outer array
        //Check inner array for 
          //All increasing OR All decreasing 
          //AND
          //Each adjacent number is at least 1 and at most 3 apart
        //If a 'safe' increment a safe counter
      //Print the value of the safe counter after going through all 'reports'