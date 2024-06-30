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
]

module.exports = { testCases }
