import {
  FLEXIBLE_CRITERIA_STATUS,
  HARD_CRITERIA_STATUS,
  QUALITY_LEVEL,
  SUMMARY_CRITERIA_STATUS,
} from "./constants";
import type { ICodeEvaluation } from "./types";

export const SAMPLE_USER_CODE = `import heapq
from collections import defaultdict
import sys

def dijkstra(start, end, graph, cost_table):
    # Initialize all distances to infinity
    for i in range(len(cost_table)):
        cost_table[i] = float('inf')
    cost_table[start] = 0
   
    # Min heap: (cost, vertex)
    min_heap = [(0, start)]
   
    while min_heap:
        vertex_cost, vertex = heapq.heappop(min_heap)
       
        if vertex == end:
            break
           
        # Skip if we've already found a better path to this vertex
        if vertex_cost > cost_table[vertex]:
            continue
           
        for neighbor, cost in graph[vertex]:
            new_cost = vertex_cost + cost
           
            if cost_table[neighbor] > new_cost:
                cost_table[neighbor] = new_cost
                heapq.heappush(min_heap, (new_cost, neighbor))
   
    return cost_table[end]

def main():
    MAX_VERTICES = 10000
    INFINITE_COST = float('inf')
   
    # Initialize graph and cost table
    graph = [[] for _ in range(MAX_VERTICES)]
    cost_table = [INFINITE_COST] * MAX_VERTICES
   
    test_cases = int(input())
   
    for _ in range(test_cases):
        # Clear the graph
        for i in range(MAX_VERTICES):
            graph[i].clear()
       
        number_of_vertices, number_of_edges = map(int, input().split())
       
        # Read edges
        for _ in range(number_of_edges):
            from_vertex, to_vertex, cost = map(int, input().split())
            graph[from_vertex].append((to_vertex, cost))
       
        # Read start and end vertices
        start, end = map(int, input().split())
       
        # Run Dijkstra
        result = dijkstra(start, end, graph, cost_table)
       
        if result == INFINITE_COST:
            print("NO")
        else:
            print(result)

if __name__ == "__main__":
    main()`;

export const SAMPLE_STUDENT_CODE_EVALUATION: ICodeEvaluation = {
  hardCriteria: {
    correctness: {
      status: HARD_CRITERIA_STATUS.FAIL,
      issues: [
        `Lỗi syntax nghiêm trọng làm code không thể chạy được`,
        `Sử dụng sai cú pháp '*' thay vì '_' trong for loop`,
        `Sử dụng sai cú pháp '**name**' thay vì '__name__'`,
        `Biến 'test*cases', 'number*of_edges' có tên không hợp lệ`,
      ],
      evidence: [
        {
          description: "Dòng 25: for * in range(MAX*VERTICES) - syntax error",
          codeLine: 25,
        },
        {
          description: "Dòng 28: for * in range(test*cases) - syntax error",
          codeLine: 28,
        },
        {
          description:
            "Dòng 35: for * in range(number*of_edges) - syntax error",
          codeLine: 35,
        },
        {
          description: 'Dòng 45: if **name** == "__main__" - syntax error',
          codeLine: 45,
        },
      ],
    },
    languageSpecifications: {
      status: HARD_CRITERIA_STATUS.FAIL,
      issues: [
        "Code không tuân thủ cú pháp Python chuẩn",
        "Sử dụng các ký tự không hợp lệ trong Python",
      ],
      evidence: [
        {
          description:
            "Nhiều chỗ sử dụng * thay vì _ trong tên biến và for loop",
          codeLine: 25,
        },
        { description: "Sử dụng ** thay vì __ trong __name__", codeLine: 45 },
      ],
    },
    compilabilityAndExecution: {
      status: HARD_CRITERIA_STATUS.FAIL,
      syntaxErrors: [
        "SyntaxError tại dòng 25: for * in range(MAX*VERTICES)",
        "SyntaxError tại dòng 28: for * in range(test*cases)",
        "SyntaxError tại dòng 35: for * in range(number*of_edges)",
        'SyntaxError tại dòng 45: if **name** == "__main__"',
      ],
      runtimeErrors: ["Code không thể chạy do các lỗi syntax"],
      issues: [],
      evidence: [
        {
          description:
            "Python interpreter sẽ báo SyntaxError ngay khi parse code",
        },
        { description: "Không thể test chức năng do code không compile được" },
      ],
    },
    complexityAndEfficiency: {
      timeComplexity: "O((V + E) log V)",
      spaceComplexity: "O(V)",
      isOptimal: true,
      issues: [
        "Khởi tạo graph với kích thước cố định MAX_VERTICES có thể lãng phí bộ nhớ",
      ],
      evidence: [
        {
          description:
            "Thuật toán Dijkstra được implement đúng về mặt lý thuyết",
          codeLine: 4,
        },
        {
          description:
            "Sử dụng min-heap để tối ưu việc chọn vertex có cost nhỏ nhất",
          codeLine: 11,
        },
        {
          description:
            "Tuy nhiên khởi tạo mảng 10000 phần tử cho mọi test case là không cần thiết",
          codeLine: 25,
        },
      ],
    },
    algorithmRequirements: {
      status: HARD_CRITERIA_STATUS.PARTIAL,
      requiredAlgorithm: "Dijkstra Algorithm",
      implementedAlgorithm: "Dijkstra Algorithm",
      issues: [
        "Logic thuật toán đúng nhưng code không chạy được do syntax errors",
      ],
      evidence: [
        {
          description:
            "Hàm dijkstra() implement đúng logic của thuật toán Dijkstra",
          codeLine: 4,
        },
        {
          description:
            "Sử dụng heap để optimize, có early termination khi tìm thấy đích",
          codeLine: 13,
        },
      ],
    },
    submissionGuidelines: {
      status: HARD_CRITERIA_STATUS.PARTIAL,
      inputOutputFormat: true,
      otherRequirements: [
        "Đọc input từ stdin",
        "In output ra stdout",
        'Format output đúng (số hoặc "NO")',
      ],
      issues: ["Code không thể chạy do syntax errors"],
      evidence: [
        {
          description: "Input/output format được implement đúng về mặt logic",
          codeLine: 30,
        },
        { description: "Sử dụng input() và print() phù hợp", codeLine: 40 },
      ],
    },
  },

  flexibleCriteria: {
    algorithmicSteps: {
      status: FLEXIBLE_CRITERIA_STATUS.ACCEPTABLE,
      logicalFlow: [
        "Khởi tạo distances = infinity",
        "Set distance[start] = 0",
        "Sử dụng min-heap để chọn vertex có cost nhỏ nhất",
        "Cập nhật distances của các neighbors",
        "Early termination khi tìm thấy đích",
      ],
      missingSteps: [],
      incorrectSteps: [],
      issues: [],
      evidence: [
        {
          description:
            "Logic trong hàm dijkstra() tuân thủ đúng các bước của thuật toán",
          codeLine: 4,
        },
        {
          description:
            "Có optimization với early termination và skip processed vertices",
          codeLine: 13,
        },
      ],
    },
    algorithmDesignAndEfficiency: {
      status: FLEXIBLE_CRITERIA_STATUS.ACCEPTABLE,
      appropriateness: "Dijkstra algorithm phù hợp cho shortest path problem",
      designChoices: [
        "Sử dụng adjacency list để represent graph",
        "Sử dụng heapq cho min-heap",
        "Early termination khi tìm thấy target",
      ],
      improvements: [
        "Có thể khởi tạo graph động thay vì fixed size",
        "Có thể sử dụng dict thay vì list để tránh khởi tạo không cần thiết",
      ],
      issues: [],
      evidence: [
        { description: "Thuật toán được chọn phù hợp với bài toán" },
        {
          description: "Các optimization cơ bản đã được áp dụng",
          codeLine: 13,
        },
      ],
    },
    readabilityAndMaintainability: {
      overall: FLEXIBLE_CRITERIA_STATUS.NEEDS_IMPROVEMENT,
      issues: [],
      evidence: [
        {
          description:
            "Overall readability bị ảnh hưởng bởi syntax errors và style issues",
        },
      ],
      codeComments: {
        quality: QUALITY_LEVEL.ACCEPTABLE,
        issues: [
          "Comments có nhưng chưa đầy đủ",
          "Thiếu comments cho các phần logic phức tạp",
        ],
        evidence: [
          {
            description:
              'Có comments cơ bản như "Initialize all distances to infinity"',
            codeLine: 5,
          },
          {
            description:
              "Thiếu comments giải thích tại sao cần skip processed vertices",
            codeLine: 15,
          },
        ],
      },
      modularity: {
        quality: QUALITY_LEVEL.GOOD,
        issues: [],
        evidence: [
          { description: "Tách riêng hàm dijkstra() và main()", codeLine: 4 },
          { description: "Hàm dijkstra() có thể tái sử dụng" },
          { description: "Separation of concerns rõ ràng" },
        ],
      },
      codingStyle: {
        quality: QUALITY_LEVEL.POOR,
        issues: [
          "Lỗi syntax nghiêm trọng",
          "Tên biến không nhất quán (sử dụng * thay vì _)",
          "Formatting chưa chuẩn ở một số chỗ",
        ],
        evidence: [
          {
            description: "Nhiều syntax errors do sử dụng sai ký tự",
            codeLine: 25,
          },
          { description: "Indentation nhìn chung đúng nhưng có lỗi syntax" },
        ],
      },
    },
    edgeCaseHandling: {
      status: FLEXIBLE_CRITERIA_STATUS.GOOD,
      handledCases: [
        "No path exists (return INFINITE_COST)",
        "Skip already processed vertices",
        "Multiple test cases",
      ],
      missingCases: [
        "Validation input (negative costs, invalid vertices)",
        "Self-loops handling",
      ],
      issues: [],
      evidence: [
        {
          description: 'Có check result == INFINITE_COST để print "NO"',
          codeLine: 43,
        },
        {
          description: "Có check vertex_cost > cost_table[vertex] để skip",
          codeLine: 15,
        },
      ],
    },
  },

  summary: {
    overallAssessment:
      "Code có logic thuật toán đúng và thiết kế tốt, nhưng có nhiều lỗi syntax nghiêm trọng làm code không thể chạy được. Học sinh hiểu thuật toán Dijkstra nhưng cần cải thiện kỹ năng coding và review code.",
    strengths: [
      "Hiểu đúng thuật toán Dijkstra và implement logic chính xác",
      "Có các optimizations như early termination và skip processed vertices",
      "Code structure tốt với separation of concerns",
      "Handle edge case khi không có path",
      "Support multiple test cases",
    ],
    weaknesses: [
      "Lỗi syntax nghiêm trọng làm code không compile được",
      "Không careful trong việc type và review code",
      "Comments chưa đầy đủ cho logic phức tạp",
      "Memory usage chưa tối ưu (fixed size array)",
      "Thiếu input validation",
    ],
    recommendations: [
      "CRITICAL: Sửa tất cả syntax errors trước khi submit",
      "Sử dụng IDE/editor có syntax highlighting để detect lỗi sớm",
      "Test code locally trước khi submit",
      "Thêm comments giải thích cho logic phức tạp",
      "Consider sử dụng dynamic data structures thay vì fixed size",
      "Thêm input validation để handle invalid inputs",
      "Practice code review skills",
    ],
    status: SUMMARY_CRITERIA_STATUS.PARTIAL,
  },

  metadata: {
    evaluationDate: new Date().toISOString(),
    algorithm: "Dijkstra Shortest Path",
    language: "Python",
    problemType: "Graph Algorithm - Shortest Path",
  },
};
