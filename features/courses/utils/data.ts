import type { ICourse } from "./types";

export const SAMPLE_COURSES: ICourse = {
  id: "introduction-to-programming-with-python",
  name: "Introduction to Programming with Python",
  chapters: [
    {
      id: "chapter-001",
      name: "Getting Started with Python",
      sessions: [
        {
          id: "session-001-001",
          name: "What is Python and Why Use It?",
          description:
            "Discover the fundamentals of Python programming language, its history, key features, and why it's one of the most popular programming languages today. Learn about Python's applications in web development, data science, automation, and more.",
          duration: 15,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl: "https://docs.python.org/3/tutorial/introduction.html",
        },
        {
          id: "session-001-002",
          name: "Installing Python and Setting Up Your Environment",
          description:
            "Step-by-step guide to installing Python on your computer and setting up your development environment. Learn about Python versions, package managers, and choosing the right code editor or IDE for your Python journey.",
          duration: 20,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl: "https://docs.python.org/3/using/index.html",
          practiceUrl: "/exercises",
        },
        {
          id: "session-001-003",
          name: "Your First Python Program - Hello World",
          description:
            "Write and run your very first Python program! Learn about Python syntax basics, how to execute Python code, and understand the structure of a simple Python program through the classic 'Hello World' example.",
          duration: 18,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/introduction.html#first-steps-towards-programming",
          practiceUrl: "/exercises",
        },
        {
          id: "session-001-004",
          name: "Understanding the Python Interpreter",
          description:
            "Explore how the Python interpreter works, the difference between compiled and interpreted languages, and learn to use Python's interactive mode for testing code snippets and debugging.",
          duration: 12,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl: "https://docs.python.org/3/tutorial/interpreter.html",
          practiceUrl: "/exercises",
        },
      ],
    },
    {
      id: "chapter-002",
      name: "Python Basics - Variables and Data Types",
      sessions: [
        {
          id: "session-002-001",
          name: "Variables and Assignment",
          description:
            "Learn how to create and use variables in Python. Understand variable naming conventions, assignment operators, and how Python handles variable references in memory.",
          duration: 22,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/introduction.html#using-python-as-a-calculator",
          practiceUrl: "/exercises",
        },
        {
          id: "session-002-002",
          name: "Numbers - Integers and Floats",
          description:
            "Master numeric data types in Python including integers, floating-point numbers, and basic arithmetic operations. Learn about number precision, division types, and mathematical functions.",
          duration: 25,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/introduction.html#numbers",
          practiceUrl: "/exercises",
        },
        {
          id: "session-002-003",
          name: "Strings and String Manipulation",
          description:
            "Dive deep into Python strings - creating, formatting, and manipulating text data. Learn about string methods, escape characters, string concatenation, and common string operations used in real-world programming.",
          duration: 30,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/introduction.html#strings",
          practiceUrl: "/exercises",
        },
        {
          id: "session-002-004",
          name: "Booleans and None Type",
          description:
            "Understand Boolean values (True/False) and the special None type in Python. Learn how different values are evaluated as True or False, and when to use None as a placeholder value.",
          duration: 16,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/library/stdtypes.html#boolean-values",
          practiceUrl: "/exercises",
        },
        {
          id: "session-002-005",
          name: "Type Conversion and Type Checking",
          description:
            "Learn how to convert between different data types in Python and check the type of variables. Understand implicit vs explicit type conversion and avoid common type-related errors.",
          duration: 20,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl: "https://docs.python.org/3/library/functions.html#type",
          practiceUrl: "/exercises",
        },
      ],
    },
    {
      id: "chapter-003",
      name: "Control Flow - Making Decisions",
      sessions: [
        {
          id: "session-003-001",
          name: "Conditional Statements - if, elif, else",
          description:
            "Master the art of making decisions in your code using if, elif, and else statements. Learn how to structure conditional logic and create programs that respond differently based on various conditions.",
          duration: 28,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/controlflow.html#if-statements",
          practiceUrl: "/exercises",
        },
        {
          id: "session-003-002",
          name: "Comparison Operators",
          description:
            "Explore all comparison operators in Python (==, !=, <, >, <=, >=) and learn how to compare different types of data. Understand operator precedence and common pitfalls when comparing values.",
          duration: 20,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/library/stdtypes.html#comparisons",
          practiceUrl: "/exercises",
        },
        {
          id: "session-003-003",
          name: "Logical Operators - and, or, not",
          description:
            "Learn to combine multiple conditions using logical operators. Understand how 'and', 'or', and 'not' work, short-circuit evaluation, and how to build complex conditional expressions.",
          duration: 24,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/library/stdtypes.html#boolean-operations-and-or-not",
          practiceUrl: "/exercises",
        },
        {
          id: "session-003-004",
          name: "Nested Conditions and Complex Logic",
          description:
            "Build sophisticated decision-making structures using nested if statements and complex logical expressions. Learn best practices for organizing conditional code and avoiding deeply nested structures.",
          duration: 26,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/controlflow.html#if-statements",
          practiceUrl: "/exercises",
        },
      ],
    },
    {
      id: "chapter-004",
      name: "Loops - Repeating Actions",
      sessions: [
        {
          id: "session-004-001",
          name: "Introduction to Loops",
          description:
            "Understand the concept of loops and why they're essential in programming. Learn about different types of loops and when to use each one for efficient code repetition.",
          duration: 15,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/controlflow.html#for-statements",
        },
        {
          id: "session-004-002",
          name: "For Loops and the range() Function",
          description:
            "Master for loops in Python and learn to use the powerful range() function. Understand how to iterate over sequences, use different range() parameters, and write efficient loop structures.",
          duration: 32,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/controlflow.html#for-statements",
          practiceUrl: "/exercises",
        },
        {
          id: "session-004-003",
          name: "While Loops",
          description:
            "Learn to create while loops for situations where you don't know exactly how many iterations you need. Understand loop conditions, avoiding infinite loops, and when to choose while over for loops.",
          duration: 28,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/reference/compound_stmts.html#while",
          practiceUrl: "/exercises",
        },
        {
          id: "session-004-004",
          name: "Loop Control - break and continue",
          description:
            "Gain precise control over loop execution using break and continue statements. Learn how to exit loops early, skip iterations, and implement complex loop logic patterns.",
          duration: 22,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/controlflow.html#break-and-continue-statements-and-else-clauses-on-loops",
          practiceUrl: "/exercises",
        },
        {
          id: "session-004-005",
          name: "Nested Loops",
          description:
            "Explore the power of nested loops for handling multi-dimensional data and complex iteration patterns. Learn best practices for nested loop design and performance considerations.",
          duration: 25,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/controlflow.html#for-statements",
          practiceUrl: "/exercises",
        },
      ],
    },
    {
      id: "chapter-005",
      name: "Data Structures - Lists and Tuples",
      sessions: [
        {
          id: "session-005-001",
          name: "Introduction to Lists",
          description:
            "Discover Python lists - dynamic, ordered collections that can store multiple items. Learn how to create lists, understand their mutable nature, and explore basic list operations for organizing data.",
          duration: 30,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists",
          practiceUrl: "/exercises",
        },
        {
          id: "session-005-002",
          name: "List Methods and Operations",
          description:
            "Master essential list methods like append(), remove(), sort(), and more. Learn how to modify lists efficiently and understand the difference between methods that modify lists in-place vs. those that return new lists.",
          duration: 35,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists",
          practiceUrl: "/exercises",
        },
        {
          id: "session-005-003",
          name: "List Indexing and Slicing",
          description:
            "Learn to access and manipulate specific elements or sections of lists using indexing and slicing. Understand positive and negative indices, slice notation, and advanced slicing techniques.",
          duration: 28,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/introduction.html#lists",
          practiceUrl: "/exercises",
        },
        {
          id: "session-005-004",
          name: "Tuples - Immutable Sequences",
          description:
            "Explore tuples as immutable alternatives to lists. Learn when to use tuples instead of lists, tuple packing and unpacking, and how immutability can make your code more reliable.",
          duration: 24,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/datastructures.html#tuples-and-sequences",
          practiceUrl: "/exercises",
        },
        {
          id: "session-005-005",
          name: "List Comprehensions",
          description:
            "Master the elegant and Pythonic way to create lists using list comprehensions. Learn the syntax, when to use comprehensions vs. traditional loops, and how they can make your code more readable and efficient.",
          duration: 32,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions",
          practiceUrl: "/exercises",
        },
      ],
    },
    {
      id: "chapter-006",
      name: "Data Structures - Dictionaries and Sets",
      sessions: [
        {
          id: "session-006-001",
          name: "Introduction to Dictionaries",
          description:
            "Learn about Python dictionaries - powerful key-value data structures. Understand how to create dictionaries, access values by keys, and use dictionaries to organize related data efficiently.",
          duration: 30,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/datastructures.html#dictionaries",
          practiceUrl: "/exercises",
        },
        {
          id: "session-006-002",
          name: "Dictionary Methods and Operations",
          description:
            "Explore essential dictionary methods like get(), keys(), values(), items(), and update(). Learn how to safely access dictionary data and perform common dictionary operations.",
          duration: 28,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/library/stdtypes.html#mapping-types-dict",
          practiceUrl: "/exercises",
        },
        {
          id: "session-006-003",
          name: "Iterating Through Dictionaries",
          description:
            "Master different techniques for looping through dictionaries. Learn how to iterate over keys, values, or key-value pairs, and understand best practices for dictionary iteration.",
          duration: 25,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/datastructures.html#looping-techniques",
          practiceUrl: "/exercises",
        },
        {
          id: "session-006-004",
          name: "Sets - Unique Collections",
          description:
            "Discover Python sets - collections of unique elements. Learn how to create sets, understand their mathematical properties, and use sets for removing duplicates and membership testing.",
          duration: 26,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/datastructures.html#sets",
          practiceUrl: "/exercises",
        },
        {
          id: "session-006-005",
          name: "Set Operations and Methods",
          description:
            "Explore advanced set operations including union, intersection, difference, and symmetric difference. Learn practical applications of set operations for data analysis and problem-solving.",
          duration: 24,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/library/stdtypes.html#set-types-set-frozenset",
          practiceUrl: "/exercises",
        },
      ],
    },
    {
      id: "chapter-007",
      name: "Functions - Organizing Your Code",
      sessions: [
        {
          id: "session-007-001",
          name: "What are Functions?",
          description:
            "Understand the concept of functions as reusable blocks of code. Learn why functions are crucial for organizing code, reducing repetition, and creating modular programs.",
          duration: 20,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/controlflow.html#defining-functions",
        },
        {
          id: "session-007-002",
          name: "Defining and Calling Functions",
          description:
            "Learn the syntax for creating your own functions and how to call them effectively. Understand function naming conventions and the anatomy of a function definition.",
          duration: 28,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/controlflow.html#defining-functions",
          practiceUrl: "/exercises",
        },
        {
          id: "session-007-003",
          name: "Parameters and Arguments",
          description:
            "Master function parameters and arguments to make your functions flexible and reusable. Learn the difference between parameters and arguments, and how to pass data to functions effectively.",
          duration: 32,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/controlflow.html#more-on-defining-functions",
          practiceUrl: "/exercises",
        },
        {
          id: "session-007-004",
          name: "Return Statements",
          description:
            "Understand how functions can send data back to the caller using return statements. Learn about functions that return values vs. those that don't, and how to work with returned data.",
          duration: 25,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/reference/simple_stmts.html#return",
          practiceUrl: "/exercises",
        },
        {
          id: "session-007-005",
          name: "Scope and Local vs Global Variables",
          description:
            "Understand variable scope in Python - how variables are accessible in different parts of your program. Learn about local and global variables, and how to avoid common scope-related issues.",
          duration: 30,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/classes.html#python-scopes-and-namespaces",
          practiceUrl: "/exercises",
        },
        {
          id: "session-007-006",
          name: "Default Parameters and Keyword Arguments",
          description:
            "Make your functions more flexible with default parameters and keyword arguments. Learn how to provide default values, use keyword arguments for clarity, and handle variable numbers of arguments.",
          duration: 26,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/controlflow.html#default-argument-values",
          practiceUrl: "/exercises",
        },
      ],
    },
    {
      id: "chapter-008",
      name: "File Handling and Input/Output",
      sessions: [
        {
          id: "session-008-001",
          name: "Reading User Input",
          description:
            "Learn how to make your programs interactive by reading user input. Master the input() function, handle different types of user data, and create user-friendly prompts and validation.",
          duration: 22,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/library/functions.html#input",
          practiceUrl: "/exercises",
        },
        {
          id: "session-008-002",
          name: "Opening and Reading Files",
          description:
            "Discover how to read data from external files in Python. Learn about file objects, different reading methods (read(), readline(), readlines()), and best practices for file handling.",
          duration: 30,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files",
          practiceUrl: "/exercises",
        },
        {
          id: "session-008-003",
          name: "Writing to Files",
          description:
            "Learn how to save data to files from your Python programs. Understand different writing modes, how to create and modify files, and techniques for formatting output data.",
          duration: 28,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files",
          practiceUrl: "/exercises",
        },
        {
          id: "session-008-004",
          name: "File Modes and Context Managers",
          description:
            "Master file modes (read, write, append) and learn to use context managers (with statements) for safe file handling. Understand how to prevent file corruption and resource leaks.",
          duration: 25,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/inputoutput.html#methods-of-file-objects",
          practiceUrl: "/exercises",
        },
        {
          id: "session-008-005",
          name: "Working with CSV Files",
          description:
            "Learn to work with CSV (Comma-Separated Values) files - a common data format. Understand how to read and write CSV files using Python's csv module and handle real-world data processing tasks.",
          duration: 32,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl: "https://docs.python.org/3/library/csv.html",
          practiceUrl: "/exercises",
        },
      ],
    },
    {
      id: "chapter-009",
      name: "Error Handling and Debugging",
      sessions: [
        {
          id: "session-009-001",
          name: "Understanding Python Errors",
          description:
            "Learn to read and understand different types of Python errors and exceptions. Understand error messages, stack traces, and how to identify the root cause of common programming errors.",
          duration: 24,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl: "https://docs.python.org/3/tutorial/errors.html",
        },
        {
          id: "session-009-002",
          name: "Try, Except, and Finally Blocks",
          description:
            "Master exception handling in Python using try, except, and finally blocks. Learn how to gracefully handle errors, prevent program crashes, and ensure code cleanup.",
          duration: 30,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/errors.html#handling-exceptions",
          practiceUrl: "/exercises",
        },
        {
          id: "session-009-003",
          name: "Common Exception Types",
          description:
            "Explore the most common Python exception types like ValueError, TypeError, KeyError, and IndexError. Learn to catch specific exceptions and handle different error scenarios appropriately.",
          duration: 26,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/library/exceptions.html#built-in-exceptions",
          practiceUrl: "/exercises",
        },
        {
          id: "session-009-004",
          name: "Debugging Techniques and Tools",
          description:
            "Develop essential debugging skills using print statements, Python's built-in debugger (pdb), and systematic debugging approaches. Learn how to track down bugs efficiently and test your code.",
          duration: 28,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl: "https://docs.python.org/3/library/pdb.html",
          practiceUrl: "/exercises",
        },
        {
          id: "session-009-005",
          name: "Best Practices for Error Handling",
          description:
            "Learn industry best practices for writing robust, error-resistant code. Understand when to catch exceptions, how to write meaningful error messages, and strategies for defensive programming.",
          duration: 22,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/errors.html#defining-clean-up-actions",
        },
      ],
    },
    {
      id: "chapter-010",
      name: "Object-Oriented Programming Basics",
      sessions: [
        {
          id: "session-010-001",
          name: "Introduction to Object-Oriented Programming",
          description:
            "Understand the fundamental concepts of Object-Oriented Programming (OOP) and how it differs from procedural programming. Learn about the benefits of OOP and when to use this programming paradigm.",
          duration: 25,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/classes.html#a-first-look-at-classes",
        },
        {
          id: "session-010-002",
          name: "Creating Classes and Objects",
          description:
            "Learn how to define classes and create objects (instances) in Python. Understand the relationship between classes and objects, and how to model real-world entities using OOP principles.",
          duration: 32,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/classes.html#class-definition-syntax",
          practiceUrl: "/exercises",
        },
        {
          id: "session-010-003",
          name: "Attributes and Methods",
          description:
            "Explore class attributes and methods - the data and behaviors that define your objects. Learn the difference between instance and class attributes, and how to create methods that operate on object data.",
          duration: 30,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/classes.html#class-objects",
          practiceUrl: "/exercises",
        },
        {
          id: "session-010-004",
          name: "Constructor Method (__init__)",
          description:
            "Master the constructor method (__init__) to initialize your objects properly. Learn how to set up initial object state, accept initialization parameters, and create robust object constructors.",
          duration: 28,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/classes.html#instance-objects",
          practiceUrl: "/exercises",
        },
        {
          id: "session-010-005",
          name: "Inheritance and Method Overriding",
          description:
            "Explore inheritance - one of the core OOP concepts that allows classes to inherit properties and methods from other classes. Learn how to create class hierarchies and override inherited methods.",
          duration: 35,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/classes.html#inheritance",
          practiceUrl: "/exercises",
        },
      ],
    },
    {
      id: "chapter-011",
      name: "Working with Libraries and Modules",
      sessions: [
        {
          id: "session-011-001",
          name: "Understanding Modules and Packages",
          description:
            "Learn how Python organizes code into modules and packages. Understand the module system, how to create your own modules, and the difference between modules and packages.",
          duration: 26,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl: "https://docs.python.org/3/tutorial/modules.html",
        },
        {
          id: "session-011-002",
          name: "Import Statements and Different Ways to Import",
          description:
            "Master different import techniques in Python. Learn about import, from...import, import...as statements, and understand when to use each approach for clean, maintainable code.",
          duration: 24,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl:
            "https://docs.python.org/3/tutorial/modules.html#more-on-modules",
          practiceUrl: "/exercises",
        },
        {
          id: "session-011-003",
          name: "Standard Library Overview",
          description:
            "Explore Python's extensive standard library - the collection of modules that comes built-in with Python. Discover useful modules for common programming tasks and learn how to leverage existing code.",
          duration: 30,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl: "https://docs.python.org/3/library/index.html",
        },
        {
          id: "session-011-004",
          name: "Installing External Packages with pip",
          description:
            "Learn to expand Python's capabilities by installing external packages using pip. Understand package management, virtual environments, and how to find and install third-party libraries.",
          duration: 20,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl: "https://pip.pypa.io/en/stable/user_guide/",
          practiceUrl: "/exercises",
        },
        {
          id: "session-011-005",
          name: "Popular Libraries - requests, datetime, math",
          description:
            "Get hands-on experience with popular Python libraries. Learn to make web requests with the requests library, work with dates and times using datetime, and perform advanced mathematics with the math module.",
          duration: 35,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl: "https://requests.readthedocs.io/en/latest/",
          practiceUrl: "/exercises",
        },
      ],
    },
    {
      id: "chapter-012",
      name: "Final Project and Next Steps",
      sessions: [
        {
          id: "session-012-001",
          name: "Project Planning and Requirements",
          description:
            "Learn how to plan and structure a Python project from start to finish. Understand requirements gathering, project organization, and breaking down complex problems into manageable tasks.",
          duration: 20,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl: "https://docs.python.org/3/tutorial/whatnow.html",
        },
        {
          id: "session-012-002",
          name: "Building a Simple To-Do List Application",
          description:
            "Apply all your Python knowledge to build a functional to-do list application. Learn to combine data structures, functions, user input, and file handling to create a complete program that solves real-world problems.",
          duration: 45,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl: "https://realpython.com/python-practice-problems/",
          practiceUrl: "/exercises",
        },
        {
          id: "session-012-003",
          name: "Adding Features and Error Handling",
          description:
            "Enhance your to-do list application with advanced features and robust error handling. Learn to implement data validation, handle edge cases, and make your application user-friendly and reliable.",
          duration: 40,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl: "https://realpython.com/python-practice-problems/",
          practiceUrl: "/exercises",
        },
        {
          id: "session-012-004",
          name: "Code Review and Refactoring",
          description:
            "Learn the important skills of code review and refactoring. Understand how to improve code readability, performance, and maintainability. Practice identifying code smells and applying refactoring techniques.",
          duration: 30,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl: "https://realpython.com/python-refactoring/",
          practiceUrl: "/exercises",
        },
        {
          id: "session-012-005",
          name: "Where to Go Next - Advanced Python Topics",
          description:
            "Explore the exciting world of advanced Python programming. Get an overview of web development with Flask/Django, data science with pandas/numpy, automation, machine learning, and other specialized Python applications.",
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          duration: 25,
          materialsUrl: "https://docs.python.org/3/tutorial/whatnow.html",
        },
        {
          id: "session-012-006",
          name: "Course Summary and Congratulations",
          description:
            "Celebrate your completion of the Python fundamentals course! Review key concepts you've learned, reflect on your programming journey, and get motivated for continued learning and building amazing projects with Python.",
          duration: 15,
          videoUrl: "https://www.youtube.com/watch?v=4u_oEz8m1bI",
          materialsUrl: "https://www.python.org/success-stories/",
        },
      ],
    },
  ],
};
