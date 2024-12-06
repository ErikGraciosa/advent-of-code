package day2;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class Day2 {
    public static void main(String[] args) {
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
 
      String filePath = "day2.input"; // Path to the input file
      
        try {
            //Read file
            List<String> lines = Files.readAllLines(Paths.get(filePath));

            //Convert input data to a list of list of integers
            List<List<Integer>> listOfLists = lines.stream()
            .map(str -> Arrays.stream(str.split(" "))  
                                .map(Integer::parseInt) 
                                .collect(Collectors.toList())) 
            .collect(Collectors.toList()); 
            System.out.println(listOfLists);
            
            //Part 1
            int badCounter = 0;

            for (int i = 0; i < listOfLists.size(); i++) {
                boolean safeListIncreasing = true;
                boolean safeListDecreasing = true;
                for (int j = 0; j < listOfLists.get(i).size() - 1; j++) {
                    //Increasing scenario
                    if(listOfLists.get(i).get(0) < listOfLists.get(i).get(1)) {
                        if (listOfLists.get(i).get(j) < listOfLists.get(i).get(j + 1) &&
                        listOfLists.get(i).get(j) + 3 >= listOfLists.get(i).get(j + 1)) {
                            //Do nothing
                        } else {
                            safeListIncreasing = false;
                        }
                    }
                    //Decreasing scenario
                    if(listOfLists.get(i).get(0) > listOfLists.get(i).get(1)) {
                        if (listOfLists.get(i).get(j) > listOfLists.get(i).get(j + 1) &&
                        listOfLists.get(i).get(j) - 3 <= listOfLists.get(i).get(j + 1)) {
                            //Do nothing
                        } else {
                            safeListDecreasing = false;
                        }
                    }
                }
                if(safeListIncreasing == false || safeListDecreasing == false || listOfLists.get(i).get(0) == listOfLists.get(i).get(1)) {
                    badCounter++;
                }
                
                
                
            }
            // Answer 472
            System.out.println(listOfLists.size() - badCounter);

            //Part 2
            // Allow a single 'bad level' (non decreasing or non increasing value or beyond 3 delta)
                // 
            part2(listOfLists);
     
        } catch (IOException e) {
            e.printStackTrace();
        }

        


    }


    public static int part1(List<List<Integer>> listOfLists) {
        int badCounter = 0;

            for (int i = 0; i < listOfLists.size(); i++) {
                boolean safeListIncreasing = true;
                boolean safeListDecreasing = true;
                for (int j = 0; j < listOfLists.get(i).size() - 1; j++) {
                    //Increasing scenario
                    if(listOfLists.get(i).get(0) < listOfLists.get(i).get(1)) {
                        if (listOfLists.get(i).get(j) < listOfLists.get(i).get(j + 1) &&
                        listOfLists.get(i).get(j) + 3 >= listOfLists.get(i).get(j + 1)) {
                            //Do nothing
                        } else {
                            safeListIncreasing = false;
                        }
                    }
                    //Decreasing scenario
                    if(listOfLists.get(i).get(0) > listOfLists.get(i).get(1)) {
                        if (listOfLists.get(i).get(j) > listOfLists.get(i).get(j + 1) &&
                        listOfLists.get(i).get(j) - 3 <= listOfLists.get(i).get(j + 1)) {
                            //Do nothing
                        } else {
                            safeListDecreasing = false;
                        }
                    }
                }
                if(safeListIncreasing == false || safeListDecreasing == false || listOfLists.get(i).get(0) == listOfLists.get(i).get(1)) {
                    badCounter++;
                }
                // Answer 472
                //System.out.println(listOfLists.size() - badCounter);


            }
            return badCounter;
    }
    
    public static void part2(List<List<Integer>> listOfLists) {
        int badCounter = 0;
        List<List<Integer>> badList = new ArrayList<>();

        for (int i = 500; i < listOfLists.size() - 1; i++) {
            boolean safeListIncreasing = true;
            boolean safeListDecreasing = true;
            boolean equalFirstNumbers = true;
            System.out.println("this is the input array: " + listOfLists.get(i));
            for (int j = 0; j < listOfLists.get(i).size() - 1;) {
                //Equals scenario
                if(listOfLists.get(i).get(0) == listOfLists.get(i).get(1)) {
                    List<Integer> workerList = new ArrayList<>(listOfLists.get(i));
                        System.out.println(listOfLists.get(i));
                        workerList.remove(j + 1);
                        System.out.println(workerList);
                        badList.add(workerList);
                        equalFirstNumbers = false;
                        j = 10000;
                } else if(listOfLists.get(i).get(0) < listOfLists.get(i).get(listOfLists.get(i).size() - 1)) {
                    if (listOfLists.get(i).get(j) < listOfLists.get(i).get(j) &&
                    listOfLists.get(i).get(j) + 3 >= listOfLists.get(i).get(j + 1)) {
                        //Do nothing
                        System.out.println("valid increment" + listOfLists.get(i).get(j) + " : " +  listOfLists.get(i).get(j + 1));
                        j++;
                    } else {
                        //Remove the bad element and add to badList for reprocess.
                        List<Integer> workerList = new ArrayList<>(listOfLists.get(i));
                        workerList.remove(j + 1);
                        badList.add(workerList);
                        safeListIncreasing = false;
                        j = 10000;
                    }
                } else if(listOfLists.get(i).get(0) > listOfLists.get(i).get(listOfLists.get(i).size() - 1)) {
                    if (listOfLists.get(i).get(j) > listOfLists.get(i).get(j + 1) &&
                    listOfLists.get(i).get(j) - 3 <= listOfLists.get(i).get(j + 1)) {
                        System.out.println("valid decrement" + listOfLists.get(i).get(j) + " : " +  listOfLists.get(i).get(j + 1));

                        //Do nothing
                        j++;
                    } else {
                        List<Integer> workerList = new ArrayList<>(listOfLists.get(i));
                        System.out.println(listOfLists.get(i));
                        workerList.remove(j + 1);
                        System.out.println(workerList);
                        badList.add(workerList);
                        safeListDecreasing = false;
                        j = 10000;
                    }
                } else if(listOfLists.get(i).get(0) == listOfLists.get(i).get(listOfLists.get(i).size() - 1)) {
                    List<Integer> workerList = new ArrayList<>(listOfLists.get(i));
                        System.out.println(listOfLists.get(i));
                        workerList.remove(j + 1);
                        System.out.println(workerList);
                        badList.add(workerList);
                        safeListDecreasing = false;
                        j = 10000;
                } else {
                    String message = "null case hit";
                    System.out.println(message);
                }
                

            }

        int part2failures = part1(badList);

        // if(safeListIncreasing == false || safeListDecreasing == false || equalFirstNumbers == false) {
        //     badCounter++;
        // }
        // Answer 472
            
        System.out.println(listOfLists.size() - part2failures);
        }
    }
}