package day1;
// Day 1 - 2024

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Day1 {
    public static void main(String[] args) {
        String filePath = "day1.input"; // Path to the input file

        try {
            // Read all lines from the file into a List
            List<String> lines = Files.readAllLines(Paths.get(filePath));
            
            // Example: Convert the list of strings to a list of integers
            List<Integer> numbers = lines.stream()
                                         .flatMap(line -> Arrays.stream(line.split("\\s+")))
                                         .map(Integer::parseInt)
                                         .collect(Collectors.toList());

            // Print the list of integers
            System.out.println(numbers);
            
            //Separate integers into two lists
            List<Integer> firstColumnNumbers = lines.stream()
            .map(line -> Integer.parseInt(line.split("\\s+")[0]))
            .collect(Collectors.toList());
            
            List<Integer> secondColumnNumbers = lines.stream()
            .map(line -> Integer.parseInt(line.split("\\s+")[1]))
            .collect(Collectors.toList());

            //Sort the lists smallest first
            Collections.sort(firstColumnNumbers);
            Collections.sort(secondColumnNumbers);
            
            // Visual check
            // System.out.println(firstColumnNumbers);
            // System.out.println(secondColumnNumbers);

            //Part 1
            // // Find difference between the firstColumnNumbers and secondColumnNumbers
            // int totalDifference = calculateTotalDifference(firstColumnNumbers, secondColumnNumbers);

            // // Print the total difference
            // System.out.println("Total Difference: " + totalDifference);

            //Part 2
            // Calculate the similarity score
            int similarityScore = calculateSimilarityScore(firstColumnNumbers, secondColumnNumbers);

            // Print the similarity score
            System.out.println("Similarity Score: " + similarityScore);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static int calculateTotalDifference(List<Integer> list1, List<Integer> list2) {
        // Ensure both lists are of the same size
        if (list1.size() != list2.size()) {
            throw new IllegalArgumentException("Both lists must have the same size");
        }

        // Calculate the sum of absolute differences
        int totalDifference = 0;
        for (int i = 0; i < list1.size(); i++) {
            int difference = Math.abs(list1.get(i) - list2.get(i));
            totalDifference += difference;
            System.out.printf("List1: %d, List2: %d, Difference: %d, Sum: %d%n", list1.get(i), list2.get(i), difference, totalDifference);
        }
        return totalDifference;
    }

    public static int calculateSimilarityScore(List<Integer> leftList, List<Integer> rightList) {
        // Create a frequency map for the right list
        Map<Integer, Long> rightListFrequency = rightList.stream()
                                                         .collect(Collectors.groupingBy(e -> e, Collectors.counting()));

        // Calculate the similarity score
        int similarityScore = 0;
        for (int number : leftList) {
            long count = rightListFrequency.getOrDefault(number, 0L);
            similarityScore += number * count;
        }

        return similarityScore;
    }
    
}