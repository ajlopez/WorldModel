
function isVariable(x) {
    if (typeof x !== 'string')
        return false;
    
    if (x.length !== 1)
        return false;
    
    return x.toUpperCase() === x;
}

function Fact(head, args) {
    if (typeof head !== 'string')
        throw new Error('Invalid head in fact');
    
    if (!Array.isArray(args))
        throw new Error('Invalid arguments in fact');

    this.head = function () { return head; };
    
    this.arguments = function () { return args; };
    
    this.matches = function (fact) { 
        if (head !== fact.head())
            return null;
        
        var context = {};
        var fargs = fact.arguments();
  
        if (args.length !== fargs.length)
            return null;
        
        for (var n in args) {
            var arg = args[n];            
            var farg = fargs[n];
            
            if (arg === farg)
                continue;
            
            if (isVariable(arg)) {
                if (context[arg] === farg)
                    continue;
                
                if (context[arg])
                    return null;
                
                context[arg] = farg;
            }
            else
                return null;
        }
        
        return context;
    };
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
    
    this.matches = function (head, args) {
        var fact = new Fact(head, args);
        var fs = this.facts(head);
        var matches = [];
        
        for (var n in fs) {
            var f = fs[n];
            var context = fact.matches(f);
            
            if (context)
                matches.push({ fact: f, context: context });
        }
        
        return matches;
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

function createFact(head, args) {
    return new Fact(head, args);
}

module.exports = {
    world: createWorld,
    fact: createFact
}