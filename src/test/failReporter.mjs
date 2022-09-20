export default class FailReporter {
    apply(jestHooks) {
        jestHooks.onTestRunComplete(({testResults}) => {
            console.log('\n\nFailing Tests:')
            testResults
                .filter(({numFailingTests})=>numFailingTests>0)
                .forEach(({testFilePath})=>console.log(testFilePath.split('/').reverse()[0]))
        });
    }
}
