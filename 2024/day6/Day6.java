package day6;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Day6 {
    public static void main(String[] args) {
            // Part 1
                // The carrot (^) represents a guard that will move in a direction the arrow points until running into a #,
                    //Then the guard rotates 90 deg and continues a straight path and repeats until off the grid.
                // objective is to return the number of unique positions the guard will take until walking off the grid.
                
                
            // Determine matrix size
            // Store the direction the guard is facing and position
            // Check for obstruction in direction
              // Vertical
              // Horizontal
            // Add distinct positions, the guard could be in the same position twice if overlapping
            // Update direction and position when obstruction is hit 

            Integer[] currentPosition = {0, 0, 0}; //orientation (0-UP, 1-RIGHT, 2-DOWN, 3-LEFT), x-coord, y-coord
            Set<String> positionSet = new HashSet<>();

            // ***Start*** GPT generated to generate String[][] to traverse a matrix data structure.
            String fileName = "day6.input"; // File name containing your input

            // List to hold rows of the 2D array
            List<String[]> rows = new ArrayList<>();

            try (BufferedReader br = new BufferedReader(new FileReader(fileName))) {
                String line;
                while ((line = br.readLine()) != null) {
                    // Split each line into characters and store as a row
                    String[] row = line.split(""); // Split by character
                    rows.add(row);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            // Convert List<String[]> to String[y][x]
            String[][] data = rows.toArray(new String[0][]);

            // Print the 2D array to verify
            for (String[] row : data) {
                for (String cell : row) {
                    System.out.print(cell);
                }
                System.out.println(); // Move to next line
            }

            // *** end chat GPT generation for file input parsing grid is 130 x 130 origin is upper left


            //Find carrot initial position
            for (int i = 0; i < data[i].length - 1; i++) {
                for (int j = 0; j < data[j].length - 1; j++) {
                    if(data[i][j].equals("^")) {
                        currentPosition[1] = i;
                        currentPosition[2] = j;
                        System.out.println(Arrays.toString(currentPosition));
                        positionSet.add(Integer.toString(currentPosition[1]) + Integer.toString(currentPosition[2]));
                    }
                }
            }

            // Traverse the grid
            while(currentPosition[1] != 0 && currentPosition[1] != data.length - 1 && currentPosition[2] != 0 && currentPosition[2] != data[1].length - 1) {
                //Find IF obstruction in direction in UP direction
                if (currentPosition[0] == 0) {
                    for(int y = currentPosition[1]; y >= 0; y--) {
                        if(data[y][currentPosition[2]].equals("#")) {
                            currentPosition[1] = y + 1;
                            currentPosition[0] = 1;
                            positionSet.add("y" + Integer.toString(currentPosition[1]) + "x" + Integer.toString(currentPosition[2]));
                            System.out.println("current position is" + Arrays.toString(currentPosition) + "object is: " + data[currentPosition[1]][currentPosition[2]] + " set added: " + Integer.toString(currentPosition[1]) + Integer.toString(currentPosition[2]));
                            break;
                        }
                        currentPosition[1] = y;
                        positionSet.add("y" + Integer.toString(currentPosition[1]) + "x" + Integer.toString(currentPosition[2]));
                        System.out.println("current position is" + Arrays.toString(currentPosition) + "object is: " + data[currentPosition[1]][currentPosition[2]] + " set added: " + Integer.toString(currentPosition[1]) + Integer.toString(currentPosition[2]));
                    }
                } else if (currentPosition[0] == 1) { //facing right 
                    for(int x = currentPosition[2]; x <= data[1].length - 1; x++) {
                        if(data[currentPosition[1]][x].equals("#")) {
                            currentPosition[2] = x - 1;
                            currentPosition[0] = 2;
                            positionSet.add("y" + Integer.toString(currentPosition[1]) + "x" + Integer.toString(currentPosition[2]));
                            System.out.println("current position is" + Arrays.toString(currentPosition) + "object is: " + data[currentPosition[1]][currentPosition[2]] + " set added: " + Integer.toString(currentPosition[1]) + Integer.toString(currentPosition[2]));
                            break;
                        }
                        positionSet.add("y" + Integer.toString(currentPosition[1]) + "x" + Integer.toString(currentPosition[2]));
                        currentPosition[2] = x;
                        System.out.println("current position is" + Arrays.toString(currentPosition) + "object is: " + data[currentPosition[1]][currentPosition[2]] + " set added: " + Integer.toString(currentPosition[1]) + Integer.toString(currentPosition[2]));
                    }
                } else if (currentPosition[0] == 2) { // Facing down condition
                    for(int y = currentPosition[1]; y <= data.length - 1; y++) {
                        if(data[y][currentPosition[2]].equals("#")) {
                            currentPosition[1] = y - 1;
                            currentPosition[0] = 3;
                            positionSet.add("y" + Integer.toString(currentPosition[1]) + "x" + Integer.toString(currentPosition[2]));
                            System.out.println("current position is" + Arrays.toString(currentPosition) + "object is: " + data[currentPosition[1]][currentPosition[2]] + " set added: " + Integer.toString(currentPosition[1]) + Integer.toString(currentPosition[2]));
                            break;
                        }
                        positionSet.add("y" + Integer.toString(currentPosition[1]) + "x" + Integer.toString(currentPosition[2]));
                        currentPosition[1] = y;
                        System.out.println("current position is" + Arrays.toString(currentPosition) + "object is: " + data[currentPosition[1]][currentPosition[2]] + " set added: " + Integer.toString(currentPosition[1]) + Integer.toString(currentPosition[2]));
                    }
                } else if (currentPosition[0] == 3) { // Facing left condition
                    for(int x = currentPosition[2]; x >= 0; x--) {
                        if(data[currentPosition[1]][x].equals("#")) {
                            currentPosition[2] = x + 1;
                            currentPosition[0] = 0;
                            positionSet.add("y" + Integer.toString(currentPosition[1]) + "x" + Integer.toString(currentPosition[2]));
                            System.out.println("current position is" + Arrays.toString(currentPosition) + "object is: " + data[currentPosition[1]][currentPosition[2]] + " set added: " + Integer.toString(currentPosition[1]) + Integer.toString(currentPosition[2]));
                            break;
                        }
                        positionSet.add("y" + Integer.toString(currentPosition[1]) + "x" + Integer.toString(currentPosition[2]));
                        currentPosition[2] = x;
                        System.out.println("current position is" + Arrays.toString(currentPosition) + "object is: " + data[currentPosition[1]][currentPosition[2]] + " set added: " + Integer.toString(currentPosition[1]) + Integer.toString(currentPosition[2]));
                    }
                }
            
            
            
            }

            System.out.println(positionSet.size());
            // first guess 141 - too low
            // 5123 - too low - added the Set to check unique position
            // 5124 - too low - forgot starting position
            // 5162 - added x and y string due to overlaps like 3, 33 and 33, 3 being the same previously in the set



            // Part 2


    
    
    }
}
