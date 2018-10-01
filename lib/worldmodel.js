
function Fact(head, args) {
    if (typeof head !== 'string')
        throw new Error('Invalid head in fact');
    
    if (!Array.isArray(args))
        throw new Error('Invalid arguments in fact');

    this.head = function () { return head; };
    
    this.arguments = function () { return args; };
}

function World() {
    var facts = {};
    
    this.fact = function (head, args) {
        if (!facts[head])
            facts[head] = [];
        
       
        facts[head].push(new Fact(head, args));
    };
    
    this.facts = function (head) {
        if (!facts[head])
            return [];
        
        return facts[head];
    };
    
    this.known = function (head, args) {
        var fs = facts[head];
        
        if (!fs)
            return false;
        
        for (var k = 0; k < fs.length; k++)
            if (sameArguments(fs[k].arguments(), args))
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