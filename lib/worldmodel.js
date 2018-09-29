
function World() {
    var facts = {};
    
    this.fact = function (verb, args) {
        if (!facts[verb])
            facts[verb] = [];
        
        if (typeof verb !== 'string')
            throw new Error('Invalid verb');
        
        if (!Array.isArray(args))
            throw new Error('Invalid arguments');
        
        facts[verb].push(args);
    };
    
    this.truth = function (verb, args) {
        var fs = facts[verb];
        
        if (!fs)
            return false;
        
        for (var k = 0; k < fs.length; k++)
            if (sameArguments(fs[k], args))
                return true;
            
        return false;
    };
}

function sameArguments(args1, args2) {
    if (args1.length !== args2.length)
        return false;
    
    var l = args1.length;
    
    for (var k = 0; k < l; k++)
        if (args1[k] !== args2[k])
            return false;
        
    return true;
}

function createWorld() {
    return new World();
}

module.exports = {
    world: createWorld
}