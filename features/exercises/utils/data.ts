import type { IExercise } from "./types";

export const SAMPLE_EXERCISES: IExercise[] = [
  {
    problem_id: "two-sum-001",
    name: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    difficulty: 1, // Easy
    code_template: `function twoSum(nums: number[], target: number): number[] {
    // Your code here
    return [];
}`,
    guidelines: `
Guidelines:
- You can return the answer in any order
- You may assume that each input would have exactly one solution
- You may not use the same element twice
- Only one valid answer exists for each test case

Hints:
- Try using a hash map to store numbers you've seen
- For each number, check if (target - current number) exists in the hash map
`,
    solution: `function twoSum(nums: number[], target: number): number[] {
    const numMap = new Map<number, number>();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (numMap.has(complement)) {
            return [numMap.get(complement)!, i];
        }
        
        numMap.set(nums[i], i);
    }
    
    return []; // Should never reach here based on problem constraints
}`,
    public_test_path: "/tests/two-sum/public",
    hidden_test_path: "/tests/two-sum/hidden",
    steps: [
      {
        step_id: "step-1",
        step_number: 1,
        title: "Understanding the Problem",
        explanation:
          "First, let's understand what we need to do. We have an array of numbers and a target sum. We need to find two numbers in the array that add up to the target and return their indices.",
        solution:
          "// Step 1: Understand the input and output\n// Input: nums = [2,7,11,15], target = 9\n// Output: [0,1] because nums[0] + nums[1] = 2 + 7 = 9",
      },
      {
        step_id: "step-2",
        step_number: 2,
        title: "Brute Force Approach",
        explanation:
          "The simplest approach is to check every pair of numbers. For each number, check if there's another number that adds up to the target.",
        solution: `function twoSum(nums: number[], target: number): number[] {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}`,
      },
      {
        step_id: "step-3",
        step_number: 3,
        title: "Optimized Hash Map Solution",
        explanation:
          "We can optimize this using a hash map. As we iterate through the array, we store each number and its index. For each number, we check if its complement (target - current number) exists in our hash map.",
        solution: `function twoSum(nums: number[], target: number): number[] {
    const numMap = new Map<number, number>();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (numMap.has(complement)) {
            return [numMap.get(complement)!, i];
        }
        
        numMap.set(nums[i], i);
    }
    
    return [];
}`,
      },
    ],
    clos: [
      "Understand array manipulation and indexing",
      "Learn hash map usage for optimization",
      "Practice problem decomposition",
      "Understand time complexity trade-offs",
    ],
    time_limit_ms: 5000, // 5 seconds
    memory_limit_mb: 128, // 128MB
    isDone: false,
  },
];
