import { FLEXIBLE_CRITERIA_STATUS, HARD_CRITERIA_STATUS, QUALITY_LEVEL, SUMMARY_CRITERIA_STATUS } from "./constants";
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
        "Thuật toán không đúng. Hàm `find_max_length_substring` trả về độ dài của chuỗi con dài nhất không chứa ký tự lặp lại, nhưng không phải là chuỗi con dài nhất mà tất cả các ký tự đều khác nhau (nghĩa là không có ký tự lặp lại).",
      ],
      evidence: [
        {
          description:
            "Hàm `find_max_length_substring` không giải quyết đúng yêu cầu bài toán 'chuỗi con dài nhất mà tất cả các ký tự đều khác nhau'. Ví dụ, với 'abcabcbb', kết quả mong muốn là 'abc' (độ dài 3), nhưng code này có thể trả về các giá trị khác tùy thuộc vào cách triển khai chi tiết nếu không đúng.",
          codeLine: 2,
        },
      ],
    },
    languageSpecifications: {
      status: HARD_CRITERIA_STATUS.PASS,
      issues: [],
      evidence: [],
    },
    compilabilityAndExecution: {
      status: HARD_CRITERIA_STATUS.PASS,
      issues: [],
      evidence: [],
      syntaxErrors: [],
      runtimeErrors: [],
    },
    complexityAndEfficiency: {
      status: HARD_CRITERIA_STATUS.FAIL,
      issues: [
        "Độ phức tạp thời gian của thuật toán hiện tại là O(n^2) do sử dụng hai vòng lặp lồng nhau hoặc O(n*k) nếu duyệt qua chuỗi con và kiểm tra ký tự duy nhất (với k là độ dài chuỗi con tối đa).",
        "Có thể tối ưu hóa độ phức tạp thời gian xuống O(n) bằng cách sử dụng Sliding Window và HashMap để theo dõi các ký tự đã xuất hiện.",
      ],
      evidence: [
        {
          description:
            "Việc sử dụng vòng lặp lồng nhau hoặc duyệt lại các ký tự trong chuỗi con sẽ dẫn đến độ phức tạp không tối ưu.",
          codeLine: 6,
        },
      ],
      timeComplexity: "O(n^2)",
      spaceComplexity: "O(k)",
      isOptimal: false,
    },
    algorithmRequirements: {
      status: HARD_CRITERIA_STATUS.FAIL,
      issues: [
        "Thuật toán được triển khai không phải là thuật toán Sliding Window tối ưu được mong đợi cho bài toán này.",
        "Thuật toán hiện tại có vẻ như đang kiểm tra từng chuỗi con một cách thủ công hoặc không sử dụng cấu trúc dữ liệu hiệu quả để theo dõi các ký tự đã thấy.",
      ],
      evidence: [
        {
          description:
            "Thiếu việc sử dụng con trỏ 'left' và 'right' để định nghĩa cửa sổ, cũng như một hash map/set để lưu trữ các ký tự trong cửa sổ hiện tại để kiểm tra tính duy nhất O(1).",
          codeLine: 2,
        },
      ],
      requiredAlgorithm: "Sliding Window với HashMap/HashSet",
      implementedAlgorithm: "Brute Force hoặc biến thể không tối ưu",
    },
    submissionGuidelines: {
      status: HARD_CRITERIA_STATUS.PASS,
      issues: [],
      evidence: [],
      inputOutputFormat: true,
      otherRequirements: [],
    },
  },
  flexibleCriteria: {
    algorithmicSteps: {
      status: FLEXIBLE_CRITERIA_STATUS.NEEDS_IMPROVEMENT,
      issues: [
        "Các bước thuật toán không rõ ràng và không được tối ưu.",
        "Thiếu bước cập nhật cửa sổ trượt một cách hiệu quả.",
      ],
      evidence: [
        {
          description:
            "Không có logic rõ ràng để co lại cửa sổ khi một ký tự lặp lại được tìm thấy.",
          codeLine: 6,
        },
      ],
      logicalFlow: [
        "Khởi tạo `max_length = 0` và `start = 0`.",
        "Duyệt qua chuỗi với chỉ số `end`.",
        "Trong mỗi lần lặp, kiểm tra tính duy nhất của các ký tự trong chuỗi con từ `start` đến `end`.",
        "Nếu chuỗi con là duy nhất, cập nhật `max_length`.",
        "Không có logic rõ ràng để di chuyển `start` khi gặp ký tự trùng lặp.",
      ],
      missingSteps: [
        "Bước sử dụng một set hoặc hash map để lưu trữ các ký tự trong cửa sổ hiện tại.",
        "Bước di chuyển con trỏ `start` (left pointer) khi phát hiện ký tự trùng lặp để loại bỏ ký tự trùng lặp khỏi cửa sổ.",
      ],
      incorrectSteps: [
        "Cách xác định chuỗi con duy nhất không hiệu quả (có thể là lặp qua chuỗi con thay vì sử dụng set).",
      ],
    },
    algorithmDesignAndEfficiency: {
      status: FLEXIBLE_CRITERIA_STATUS.NEEDS_IMPROVEMENT,
      issues: [
        "Thiết kế thuật toán không hiệu quả. Nó không tận dụng cấu trúc dữ liệu phù hợp để đạt được độ phức tạp thời gian tối ưu.",
      ],
      evidence: [
        {
          description:
            "Thuật toán không sử dụng kỹ thuật 'Sliding Window' một cách hiệu quả, dẫn đến việc kiểm tra lặp lại các chuỗi con.",
          codeLine: 2,
        },
      ],
      appropriateness:
        "Thiết kế không phù hợp cho việc giải quyết bài toán này một cách tối ưu. Nó là một cách tiếp cận vét cạn hoặc gần vét cạn.",
      designChoices: [
        "Sử dụng biến `max_length` để lưu trữ độ dài tối đa.",
        "Duyệt qua chuỗi bằng một vòng lặp.",
      ],
      improvements: [
        "Sử dụng Sliding Window với hai con trỏ (left và right).",
        "Sử dụng một `set` hoặc `dictionary` để lưu trữ các ký tự trong cửa sổ hiện tại và kiểm tra tính duy nhất trong O(1).",
        "Khi tìm thấy ký tự trùng lặp, co cửa sổ từ bên trái bằng cách loại bỏ ký tự cũ khỏi set cho đến khi ký tự trùng lặp không còn trong cửa sổ.",
      ],
    },
    readabilityAndMaintainability: {
      status: FLEXIBLE_CRITERIA_STATUS.NEEDS_IMPROVEMENT,
      issues: [],
      evidence: [],
      overall: FLEXIBLE_CRITERIA_STATUS.NEEDS_IMPROVEMENT,
      codeComments: {
        quality: QUALITY_LEVEL.POOR,
        issues: ["Không có bất kỳ bình luận nào trong mã."],
        evidence: [
          {
            description:
              "Mã thiếu bình luận giải thích logic hoặc các phần quan trọng.",
            codeLine: 1,
          },
        ],
      },
      modularity: {
        quality: QUALITY_LEVEL.ACCEPTABLE,
        issues: [],
        evidence: [],
      },
      codingStyle: {
        quality: QUALITY_LEVEL.ACCEPTABLE,
        issues: [],
        evidence: [],
      },
    },
    edgeCaseHandling: {
      status: FLEXIBLE_CRITERIA_STATUS.NEEDS_IMPROVEMENT,
      issues: [
        "Không rõ ràng cách xử lý các trường hợp đặc biệt như chuỗi rỗng, chuỗi chỉ có một ký tự, hoặc chuỗi mà tất cả các ký tự đều giống nhau.",
      ],
      evidence: [
        {
          description:
            "Logic hiện tại không có xử lý rõ ràng cho các trường hợp cạnh. Ví dụ, với chuỗi rỗng, hàm này có thể trả về 0, nhưng cần kiểm tra xem nó có đúng cho mọi trường hợp rỗng/đơn ký tự không.",
          codeLine: 2,
        },
      ],
      handledCases: [],
      missingCases: [
        'Chuỗi rỗng ("").',
        'Chuỗi chỉ có một ký tự ("a").',
        'Chuỗi mà tất cả các ký tự đều giống nhau ("aaaaa").',
        "Chuỗi rất dài để kiểm tra hiệu suất.",
      ],
    },
  },
  summary: {
    overallAssessment:
      "Giải pháp hiện tại không chính xác và không tối ưu về hiệu suất. Thuật toán được triển khai không phải là Sliding Window tối ưu được mong đợi cho bài toán này, dẫn đến độ phức tạp thời gian cao (O(n^2)). Mã thiếu các bình luận và chưa xử lý đầy đủ các trường hợp cạnh. Cần cải thiện đáng kể về mặt thuật toán và cấu trúc dữ liệu để đạt được giải pháp tối ưu.",
    strengths: [
      "Cấu trúc hàm rõ ràng.",
      "Tuân thủ các quy tắc đặt tên cơ bản.",
    ],
    weaknesses: [
      "Thuật toán không chính xác và không tối ưu.",
      "Độ phức tạp thời gian cao (O(n^2) thay vì O(n)).",
      "Thiếu bình luận trong mã.",
      "Chưa xử lý đầy đủ các trường hợp cạnh.",
      "Không sử dụng cấu trúc dữ liệu phù hợp (Set/HashMap) để tối ưu hóa.",
    ],
    recommendations: [
      "Tìm hiểu và triển khai thuật toán Sliding Window (cửa sổ trượt) sử dụng một Set hoặc HashMap để lưu trữ các ký tự trong cửa sổ hiện tại. Điều này sẽ giảm độ phức tạp thời gian xuống O(n).",
      "Thêm bình luận vào mã để giải thích logic, đặc biệt là các phần quan trọng của thuật toán.",
      "Kiểm tra và xử lý các trường hợp cạnh như chuỗi rỗng, chuỗi một ký tự, chuỗi có tất cả các ký tự giống nhau.",
      "Xem xét lại logic để đảm bảo rằng chuỗi con được tìm thấy là 'dài nhất mà tất cả các ký tự đều khác nhau' chứ không phải chỉ là 'không chứa ký tự lặp lại' một cách chung chung.",
    ],
    status: SUMMARY_CRITERIA_STATUS.FAIL,
  },
  metadata: {
    evaluationDate: "2025-08-17",
    algorithm: "Sliding Window (chưa được triển khai đúng)",
    language: "Python",
    problemType: "String Manipulation, Array/Two Pointers",
  },
};
