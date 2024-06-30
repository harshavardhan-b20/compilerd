const testCases = [
    {
        name: 'cpp : hello world',
        reqObject: {
            language: 'cpp',
            script:
                '#include<bits/stdc++.h>\n' +
                'using namespace std;\n' +
                'int main(){\n' +
                '    cout << "hello world";\n' +
                'return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'hello world',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'cpp : print stdin',
        reqObject: {
            language: 'cpp',
            script:
                '#include<bits/stdc++.h>\n\n' +
                'using namespace std;\n' +
                'int main(){\n\n' +
                '    int a;\n' +
                '    while(cin >> a){\n' +
                '        cout << a << endl;\n' +
                '    }\n' +
                '    return 0;\n\n' +
                '}\n',
            stdin: '1 2 3',
        },
        expectedResponse: {
            val: '1\n2\n3\n',
            status: 200,
            error: 0,
        },

    },
    {
        name: 'nodejs : hello world',
        reqObject: {
            language: 'nodejs',
            script: 'console.log(\'hello world\')',
        },
        expectedResponse: {
            val: 'hello world\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'nodejs : print stdin',
        reqObject: {
            language: 'nodejs',
            script:
                'process.stdin.setEncoding(\'utf8\'); \n ' +
                'process.stdin.on(\'data\', (input) => { \n ' +
                '  console.log(input); \n ' +
                ' \n ' +
                '}); \n ',
            stdin: '1 2 3',
        },
        expectedResponse: {
            val: '1 2 3\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'python : hello world',
        reqObject: {
            language: 'python',
            script: 'print(\'hello world\')',
        },
        expectedResponse: {
            val: 'hello world\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'python : print stdin',
        reqObject: {
            language: 'python',
            script:
                'try:\n' +
                '    while(True):\n' +
                '        line = input()\n' +
                '        if not line:\n' +
                '            break\n' +
                '        print(line)\n' +
                'except EOFError:\n' +
                '    pass',
            stdin: '1 2 3',
        },
        expectedResponse: {
            val: '1 2 3\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'c : hello world',
        reqObject: {
            language: 'c',
            script:
                '#include<stdio.h>\n\n' +
                'int main(){\n\n' +
                '    printf("hello world");\n' +
                '    return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'hello world',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'c : print stdin',
        reqObject: {
            language: 'c',
            script:
                '#include <stdio.h>\n' +
                'int main() {\n' +
                '    int number;\n' +
                '    while (scanf("%d", &number) == 1) {\n' +
                '        printf("%d\\n", number);\n' +
                '    } \n' +
                '    return 0;\n' +
                '}',
            stdin: '1 2 3',
        },
        expectedResponse: {
            val: '1\n2\n3\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'java : print stdin',
        reqObject: {
            language: 'java',
            script:
                'import java.util.Scanner;\n' +
                'public class Solution {\n' +
                '    public static void main(String[] args) {\n' +
                '        System.out.println("hello world");\n' +
                '    }\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'hello world\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'java : print stdin',
        reqObject: {
            language: 'java',
            script:
                'import java.util.Scanner;\n' +
                'public class Solution {\n' +
                '    public static void main(String[] args) {\n' +
                '        Scanner scanner = new Scanner(System.in);\n' +
                '        while (scanner.hasNextInt()) {\n' +
                '            int number = scanner.nextInt();\n' +
                '            System.out.println(number);\n' +
                '        } \n' +
                '        scanner.close();\n' +
                '    }\n' +
                '}\n',
            stdin: '1 2 3',
        },
        expectedResponse: {
            val: '1\n2\n3\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'ruby : print hello world',
        reqObject: {
            language: 'ruby',
            script:
                'print "hello world"'
        },
        expectedResponse: {
            val: 'hello world',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'ruby : print stdin',
        reqObject: {
            language: 'ruby',
            script:
                'user_input = gets.chomp\n' +
                'puts user_input',
            stdin: '10\n'
        },
        expectedResponse: {
            val: '10\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'TLE test',
        reqObject: {
            language: 'nodejs',
            script: 'for(let i=0 ; ; ){i++}',
        },
        expectedResponse: {
            val: 'Time limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'MLE test',
        reqObject: {
            language: 'python',
            script: 'one_gb_data = bytearray(1000 * 1024 * 1024)',
        },
        expectedResponse: {
            val: 'Memory limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'MLE test 2',
        reqObject: {
            language: 'python',
            script:
                'import time\n' +
                'def consume_memory(target_mb, duration_sec):\n' +
                '    float_size = 8\n' +
                '    floats_per_mb = (1024 * 1024) // float_size\n' +
                '    total_floats = target_mb * floats_per_mb\n' +
                '    iterations = int(duration_sec / 0.1)\n' +
                '    floats_per_iteration = total_floats // iterations\n' +
                '    memory_hog = []\n' +
                '    for _ in range(iterations):\n' +
                '        memory_hog.extend([0.0] * floats_per_iteration)\n' +
                '        time.sleep(0.1)\n' +
                'consume_memory(1000, 1)\n',
        },
        expectedResponse: {
            val: 'Memory limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'MLE test 3',
        reqObject: {
            language: 'python',
            script:
                'a = [100]\n' +
                'for i in a:\n' +
                '    a.append(i)\n',
        },
        expectedResponse: {
            val: 'Memory limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'OPEN AI test promptv1',
        reqObject: {
            language: 'promptv1',
            prompt: 'The question is what is 2 plus 2. The answer given is 4.',
        },
        expectedResponse: {
            val: {},
            status: 200,
            error: 0,
        },
    },
    {
        name: 'OPEN AI test promptv2',
        reqObject: {
            language: 'promptv2',
            prompt: 'The question is what is 2 plus 2. The answer given is 4.',
        },
        expectedResponse: {
            val: {},
            status: 200,
            error: 0,
        },
    },
 {
        name: 'C: infinite loop',
        reqObject: {
            language: 'c',
            script:
                '#include <stdio.h>\n' +
                'int main() {\n' +
                '    for (;;) {}\n' + // Infinite loop
                '    return 0;\n' +
                '}',
        },
        expectedResponse: {
            val: null,
            status: 400,
            error: 'Time limit exceeded: Program exceeded maximum execution time',
        },
    },
    {
        name: 'CPP: stack overflow',
        reqObject: {
            language: 'cpp',
            script:
                '#include <iostream>\n' +
                'using namespace std;\n' +
                'void recursiveFunction() {\n' +
                '    int array[10000];\n' +
                '    recursiveFunction();\n' +
                '}\n' +
                'int main() {\n' +
                '    recursiveFunction();\n' +
                '    return 0;\n' +
                '}',
        },
        expectedResponse: {
            val: null,
            status: 400,
            error: 'Stack overflow: Program ran out of stack space',
        },
    },
    {
        name: 'Python: KeyboardInterrupt exception',
        reqObject: {
            language: 'python',
            script:
                'import time\n' +
                'try:\n' +
                '    while True:\n' +
                '        time.sleep(1)\n' +
                'except KeyboardInterrupt:\n' +
                '    print("Program interrupted by user")\n',
        },
        expectedResponse: {
            val: 'Program interrupted by user\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'Java: concurrent modification exception',
        reqObject: {
            language: 'java',
            script:
                'import java.util.ArrayList;\n' +
                'import java.util.List;\n' +
                'public class Main {\n' +
                '    public static void main(String[] args) {\n' +
                '        List<Integer> list = new ArrayList<>();\n' +
                '        list.add(1);\n' +
                '        for (int num : list) {\n' +
                '            list.add(2); // ConcurrentModificationException\n' +
                '        }\n' +
                '    }\n' +
                '}\n',
        },
        expectedResponse: {
            val: null,
            status: 400,
            error: 'Concurrent modification exception',
        },
    },
    {
        name: 'Node.js: uncaught exception handling',
        reqObject: {
            language: 'nodejs',
            script:
                'process.on("uncaughtException", (err) => {\n' +
                '    console.error("Uncaught exception:", err);\n' +
                '});\n' +
                'throw new Error("Uncaught error");\n',
        },
        expectedResponse: {
            val: 'Uncaught exception: Error: Uncaught error\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'Ruby: floating point arithmetic precision',
        reqObject: {
            language: 'ruby',
            script:
                'result = 0.1 + 0.2\n' +
                'puts result\n',
        },
        expectedResponse: {
            val: '0.3\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'Java: divide by zero exception',
        reqObject: {
            language: 'java',
            script:
                'public class Main {\n' +
                '    public static void main(String[] args) {\n' +
                '        int a = 1, b = 0;\n' +
                '        int result = a / b;\n' +
                '        System.out.println(result);\n' +
                '    }\n' +
                '}\n',
        },
        expectedResponse: {
            val: null,
            status: 400,
            error: 'Arithmetic exception: / by zero',
        },
    },
    {
        name: 'Node.js: asynchronous error with rejection',
        reqObject: {
            language: 'nodejs',
            script:
                'async function main() {\n' +
                '    let promise = new Promise((resolve, reject) => {\n' +
                '        reject(new Error("Promise rejection"));\n' +
                '    });\n' +
                '    await promise;\n' +
                '}\n' +
                'main();\n',
        },
        expectedResponse: {
            val: null,
            status: 400,
            error: 'Unhandled promise rejection: Promise rejection',
        },
    },
{
        name: 'Valid JavaScript code execution',
        reqObject: {
            language: 'javascript',
            script: 'console.log("Hello, World!");',
        },
        expectedResponse: {
            val: 'Hello, World!\n',
            status: 200,
            error: null,
        },
    },
    {
        name: 'Valid Python code execution',
        reqObject: {
            language: 'python',
            script: 'print("Hello, World!")',
        },
        expectedResponse: {
            val: 'Hello, World!\n',
            status: 200,
            error: null,
        },
    },
    {
        name: 'Invalid language',
        reqObject: {
            language: 'unknown',
            script: 'print("Hello, World!")',
        },
        expectedResponse: {
            val: null,
            status: 400,
            error: 'Unsupported language',
        },
    },
    {
        name: 'Malformed JSON input',
        reqObject: '{"language": "python", "script": "print("Hello, World!")"}',
        expectedResponse: {
            val: null,
            status: 400,
            error: 'Invalid JSON found',
        },
    },
    {
        name: 'Missing required field: script',
        reqObject: {
            language: 'python',
        },
        expectedResponse: {
            val: null,
            status: 400,
            error: 'Validation error: "script" is required',
        },
    },
    {
        name: 'SQL Injection attempt',
        reqObject: {
            language: 'python',
            script: 'print("1; DROP TABLE users;")',
        },
        expectedResponse: {
            val: '1; DROP TABLE users;\n',
            status: 200,
            error: null,
        },
    },
    {
        name: 'Valid large input',
        reqObject: {
            language: 'python',
            script: 'print("A".repeat(10000))',
        },
        expectedResponse: {
            val: 'A'.repeat(10000) + '\n',
            status: 200,
            error: null,
        },
    },
    {
        name: 'Invalid type for script field',
        reqObject: {
            language: 'python',
            script: 12345,
        },
        expectedResponse: {
            val: null,
            status: 400,
            error: 'Validation error: "script" must be a string',
        },
    },
    {
        name: 'Compilation error in C++',
        reqObject: {
            language: 'cpp',
            script: '#include <iostream>\nint main() { std::cout << "Hello, World! }',
        },
        expectedResponse: {
            val: null,
            status: 400,
            error: 'Compilation error',
        },
    },
    {
        name: 'Runtime error in JavaScript',
        reqObject: {
            language: 'javascript',
            script: 'console.log(nonexistentVariable);',
        },
        expectedResponse: {
            val: null,
            status: 400,
            error: 'Runtime error',
        },
    },
    {
        name: 'Edge case: empty script',
        reqObject: {
            language: 'python',
            script: '',
        },
        expectedResponse: {
            val: '',
            status: 200,
            error: null,
        },
    },
    {
        name: 'Edge case: minimum valid input',
        reqObject: {
            language: 'python',
            script: 'print("")',
        },
        expectedResponse: {
            val: '\n',
            status: 200,
            error: null,
        },
    },
    {
        name: 'Edge case: maximum valid input size',
        reqObject: {
            language: 'python',
            script: 'print("A".repeat(1048576))',  // 1MB script
        },
        expectedResponse: {
            val: 'A'.repeat(1048576) + '\n',
            status: 200,
            error: null,
        },
    },
    {
        name: 'Invalid JSON syntax: missing closing bracket',
        reqObject: '{"language": "python", "script": "print("Hello, World!"}',
        expectedResponse: {
            val: null,
            status: 400,
            error: 'Invalid JSON found',
        },
    },
    {
        name: 'Invalid JSON syntax: extra comma',
        reqObject: '{"language": "python", "script": "print("Hello, World!")",}',
        expectedResponse: {
            val: null,
            status: 400,
            error: 'Invalid JSON found',
        },
    },
    {
        name: 'Long-running script',
        reqObject: {
            language: 'python',
            script: 'import time\ntime.sleep(5)\nprint("Done")',
        },
        expectedResponse: {
            val: 'Done\n',
            status: 200,
            error: null,
        },
    },
    {
        name: 'Burst of simultaneous requests',
        reqObject: {
            language: 'python',
            script: 'print("Burst Test")',
        },
        expectedResponse: {
            val: 'Burst Test\n',
            status: 200,
            error: null,
        },
    },
    {
        name: 'Command injection attempt',
        reqObject: {
            language: 'python',
            script: 'import os\nos.system("ls")',
        },
        expectedResponse: {
            val: null,
            status: 400,
            error: 'Security error: command injection attempt',
        },
    },
    {
        name: 'Path traversal attack',
        reqObject: {
            language: 'python',
            script: 'with open("../../etc/passwd", "r") as f:\n    print(f.read())',
        },
        expectedResponse: {
            val: null,
            status: 400,
            error: 'Security error: path traversal attempt',
        },
    },
    {
        name: 'Valid Ruby code execution',
        reqObject: {
            language: 'ruby',
            script: 'puts "Hello, World!"',
        },
        expectedResponse: {
            val: 'Hello, World!\n',
            status: 200,
            error: null,
        },
    },
    {
        name: 'Syntax error in Java code',
        reqObject: {
            language: 'java',
            script: 'public class Main { public static void main(String[] args) { System.out.println("Hello, World!"; } }',
        },
        expectedResponse: {
            val: null,
            status: 400,
            error: 'Syntax error',
        },
    },
{
        name: 'C: segmentation fault',
        reqObject: {
            language: 'c',
            script:
                '#include <stdio.h>\n' +
                'int main() {\n' +
                '    int *ptr = NULL;\n' +
                '    printf("%d", *ptr);\n' +
                '    return 0;\n' +
                '}',
        },
        expectedResponse: {
            val: null,
            status: 400,
            error: 'Segmentation fault',
        },
    },
    
    {
        name: 'Python: zero division error',
        reqObject: {
            language: 'python',
            script:
                'try:\n' +
                '    result = 10 / 0\n' +
                'except ZeroDivisionError as e:\n' +
                '    print("Zero division error occurred")\n',
        },
        expectedResponse: {
            val: 'Zero division error occurred\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'Java: array index out of bounds',
        reqObject: {
            language: 'java',
            script:
                'public class Main {\n' +
                '    public static void main(String[] args) {\n' +
                '        int[] arr = new int[5];\n' +
                '        System.out.println(arr[10]);\n' +
                '    }\n' +
                '}\n',
        },
        expectedResponse: {
            val: null,
            status: 400,
            error: 'Array index out of bounds',
        },
    },
    {
        name: 'Node.js: unhandled promise rejection',
        reqObject: {
            language: 'nodejs',
            script:
                'async function main() {\n' +
                '    let promise = Promise.reject(new Error("Promise rejected"));\n' +
                '    await promise;\n' +
                '}\n' +
                'main();\n',
        },
        expectedResponse: {
            val: null,
            status: 400,
            error: 'Unhandled promise rejection: Promise rejected',
        },
    },
    {
        name: 'Ruby: file not found error',
        reqObject: {
            language: 'ruby',
            script:
                'begin\n' +
                '    File.open("/path/to/nonexistent/file.txt")\n' +
                'rescue Errno::ENOENT => e\n' +
                '    puts "File not found: #{e.message}"\n' +
                'end\n',
        },
        expectedResponse: {
            val: 'File not found: No such file or directory @ rb_sysopen - /path/to/nonexistent/file.txt\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'Node.js: asynchronous error handling with promises',
        reqObject: {
            language: 'nodejs',
            script:
                'function asyncFunction() {\n' +
                '    return new Promise((resolve, reject) => {\n' +
                '        setTimeout(() => {\n' +
                '            reject(new Error("Async error"));\n' +
                '        }, 100);\n' +
                '    });\n' +
                '}\n' +
                'async function main() {\n' +
                '    try {\n' +
                '        await asyncFunction();\n' +
                '    } catch (err) {\n' +
                '        console.error("Caught async error:", err);\n' +
                '    }\n' +
                '}\n' +
                'main();\n',
        },
        expectedResponse: {
            val: 'Caught async error: Error: Async error\n',
            status: 200,
            error: 0,
        },
    },
{
        name: 'C: buffer overflow',
        reqObject: {
            language: 'c',
            script:
                '#include <stdio.h>\n' +
                '#include <string.h>\n' +
                'int main() {\n' +
                '    char buffer[5];\n' +
                '    strcpy(buffer, "1234567890");\n' + // Buffer overflow
                '    printf("%s\n", buffer);\n' +
                '    return 0;\n' +
                '}',
        },
        expectedResponse: {
            val: null,
            status: 400,
            error: 'Buffer overflow: Program attempted to write beyond allocated memory',
        },
    },
    {
        name: 'CPP: divide by zero',
        reqObject: {
            language: 'cpp',
            script:
                '#include <iostream>\n' +
                'using namespace std;\n' +
                'int main() {\n' +
                '    int a = 1, b = 0;\n' +
                '    int result = a / b;\n' +
                '    cout << result << endl;\n' +
                '    return 0;\n' +
                '}',
        },
        expectedResponse: {
            val: null,
            status: 400,
            error: 'Arithmetic exception: Division by zero',
        },
    },
    {
        name: 'Python: recursion depth exceeded',
        reqObject: {
            language: 'python',
            script:
                'def recursive_function():\n' +
                '    return recursive_function()\n' +
                'recursive_function()\n',
        },
        expectedResponse: {
            val: null,
            status: 400,
            error: 'Recursion depth exceeded: Maximum recursion depth exceeded',
        },
    },
    {
        name: 'Java: array index out of bounds exception',
        reqObject: {
            language: 'java',
            script:
                'public class Main {\n' +
                '    public static void main(String[] args) {\n' +
                '        int[] arr = new int[5];\n' +
                '        System.out.println(arr[10]);\n' + // Array index out of bounds
                '    }\n' +
                '}\n',
        },
        expectedResponse: {
            val: null,
            status: 400,
            error: 'Array index out of bounds exception',
        },
    },
    {
        name: 'Node.js: synchronous unhandled exception',
        reqObject: {
            language: 'nodejs',
            script:
                'function main() {\n' +
                '    throw new Error("Unhandled exception");\n' +
                '}\n' +
                'main();\n',
        },
        expectedResponse: {
            val: null,
            status: 400,
            error: 'Unhandled exception: Error: Unhandled exception',
        },
    },
    {
        name: 'Ruby: file read error',
        reqObject: {
            language: 'ruby',
            script:
                'begin\n' +
                '    File.open("/nonexistent/file.txt", "r") do |file|\n' + // File read error
                '        puts file.read\n' +
                '    end\n' +
                'rescue Exception => e\n' +
                '    puts e.message\n' +
                'end\n',
        },
        expectedResponse: {
            val: 'No such file or directory @ rb_sysopen - /nonexistent/file.txt\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'C: null pointer dereference',
        reqObject: {
            language: 'c',
            script:
                '#include <stdio.h>\n' +
                'int main() {\n' +
                '    int *ptr = NULL;\n' +
                '    printf("%d\n", *ptr);\n' + // Null pointer dereference
                '    return 0;\n' +
                '}',
        },
        expectedResponse: {
            val: null,
            status: 400,
            error: 'Null pointer dereference: Program attempted to access memory through a null pointer',
        },
    },
    {
        name: 'CPP: out of memory error',
        reqObject: {
            language: 'cpp',
            script:
                '#include <iostream>\n' +
                'using namespace std;\n' +
                'int main() {\n' +
                '    int *arr = new int[1000000000000];\n' + // Allocate too much memory
                '    delete[] arr;\n' +
                '    return 0;\n' +
                '}',
        },
        expectedResponse: {
            val: null,
            status: 400,
            error: 'Out of memory: Program ran out of memory',
        },
    },
    {
        name: 'Python: assertion error',
        reqObject: {
            language: 'python',
            script:
                'assert False, "Assertion failed"\n',
        },
        expectedResponse: {
            val: null,
            status: 400,
            error: 'Assertion error: Assertion failed',
        },
    },
    {
        name: 'Java: file not found exception',
        reqObject: {
            language: 'java',
            script:
                'import java.io.File;\n' +
                'import java.io.FileReader;\n' +
                'public class Main {\n' +
                '    public static void main(String[] args) throws Exception {\n' +
                '        File file = new File("/nonexistent/file.txt");\n' + // File not found
                '        FileReader fr = new FileReader(file);\n' +
                '    }\n' +
                '}\n',
        },
        expectedResponse: {
            val: null,
            status: 400,
            error: 'File not found exception: /nonexistent/file.txt (No such file or directory)',
        },
    },
    {
        name: 'Node.js: file write permission denied',
        reqObject: {
            language: 'nodejs',
            script:
                'const fs = require("fs");\n' +
                'fs.writeFileSync("/root/test.txt", "Hello, World!");\n',
        },
        expectedResponse: {
            val: null,
            status: 400,
            error: 'Permission denied: Permission denied, open \'/root/test.txt\'',
        },
    },
]

module.exports = { testCases }
