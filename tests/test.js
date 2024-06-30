const axios = require('axios')
const { testCases } = require('../data/testJson')
const { describe, expect, it } = require('@jest/globals')

const ENDPOINT = process.env.ENDPOINT || 'http://localhost:3000/api/execute/'

describe('Compiler API Tests', () => {
    for (const testCase of testCases) {
        it(testCase.name, async () => {
            let response;
            try {
                response = await axios.post(ENDPOINT, testCase.reqObject)
            } catch (error) {
                response = error.response
            }

            if (typeof response.data.output === 'object') {
                expect(response.data.output.score).toBeDefined()
                expect(response.data.output.rationale.positives).toBeDefined()
                expect(response.data.output.rationale.negatives).toBeDefined()
                expect(response.data.output.points).toBeDefined()
            } else {
                expect(response.data.output).toBe(testCase.expectedResponse.val)
            }
            expect(response.status).toBe(testCase.expectedResponse.status)
            if (testCase.expectedResponse.error) {
                expect(response.data.error).toBe(testCase.expectedResponse.error)
            } else {
                expect(response.data.error).toBeUndefined()
            }
        }, 15000)
    }

    // Performance test: burst of requests
    it('Burst of simultaneous requests', async () => {
        const promises = Array(10).fill(
            axios.post(ENDPOINT, {
                language: 'python',
                script: 'print("Burst Test")',
            })
        )
        const responses = await Promise.all(promises)

        responses.forEach((response) => {
            expect(response.data.output).toBe('Burst Test\n')
            expect(response.status).toBe(200)
            expect(response.data.error).toBeUndefined()
        })
    }, 30000)
})
