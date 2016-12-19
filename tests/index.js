const testsContext = require.context('app' , true, /__tests__/);
testsContext.keys().map((test) => testsContext(test) )
