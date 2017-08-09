
    var testsContext = require.context("../../spec/javascripts/components", false);

    var runnable = testsContext.keys();

    runnable.forEach(testsContext);
    