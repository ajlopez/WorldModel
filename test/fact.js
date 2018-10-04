
var wm = require('..');

exports['assert fact with one argument'] = function (test) {
    var world = wm.world();
    
    world.fact('cat', ['x1']);
    
    test.ok(world.known('cat', ['x1']));
    test.ok(!world.known('cat', ['x2']));
    test.ok(!world.known('dog', ['x1']));
};

exports['refuse fact with no array as arguments'] = function (test) {
    var world = wm.world();
    
    try {
        world.fact('cat', 'x1');
    }
    catch (ex) {
        return;
    }
    
    test.fail();
};

exports['refuse fact with no string as head'] = function (test) {
    var world = wm.world();
    
    try {
        world.fact(42, ['x1']);
    }
    catch (ex) {
        return;
    }
    
    assert.fail();
};

exports['assert fact with two arguments'] = function (test) {
    var world = wm.world();
    
    world.fact('name', ['x1', 'Alice']);
    
    test.ok(world.known('name', ['x1', 'Alice']));
    test.ok(!world.known('name', ['x1', 'Bob']));
    test.ok(!world.known('age', ['x1', 'Alice']));
};

exports['retrieve facts by head'] = function (test) {
    var world = wm.world();
    
    world.fact('name', ['x1', 'Alice']);
    world.fact('name', ['x2', 'Bob']);
    
    var facts = world.facts('name');

    test.ok(facts);
    test.ok(Array.isArray(facts));
    test.equal(facts.length, 2);
    
    test.equal(facts[0].head(), 'name');
    test.equal(facts[0].arguments().length, 2);
    test.equal(facts[0].arguments()[0], 'x1');
    test.equal(facts[0].arguments()[1], 'Alice');
    
    test.equal(facts[1].head(), 'name');
    test.equal(facts[1].arguments().length, 2);
    test.equal(facts[1].arguments()[0], 'x2');
    test.equal(facts[1].arguments()[1], 'Bob');
};

exports['retrieve no facts by head'] = function (test) {
    var world = wm.world();
    
    var facts = world.facts('name');

    test.ok(facts);
    test.ok(Array.isArray(facts));
    test.equal(facts.length, 0);
};

exports['matches with one variable'] = function (test) {
    var world = wm.world();
    
    world.fact('human', ['x1']);
    world.fact('human', ['x2']);
    
    var matches = world.matches('human', ['X']);

    test.ok(matches);
    test.ok(Array.isArray(matches));
    test.equal(matches.length, 2);
    
    test.equal(matches[0].fact.head(), 'human');
    test.deepEqual(matches[0].fact.arguments(), ['x1']);
    test.deepEqual(matches[0].context, { X: 'x1' });
    
    test.equal(matches[1].fact.head(), 'human');
    test.deepEqual(matches[1].fact.arguments(), ['x2']);
    test.deepEqual(matches[1].context, { X: 'x2' });
};

exports['matches with two variables'] = function (test) {
    var world = wm.world();
    
    world.fact('name', ['x1', 'Alice']);
    world.fact('name', ['x2', 'Bob']);
    
    var matches = world.matches('name', ['X', 'Y']);

    test.ok(matches);
    test.ok(Array.isArray(matches));
    test.equal(matches.length, 2);
    
    test.equal(matches[0].fact.head(), 'name');
    test.deepEqual(matches[0].fact.arguments(), ['x1', 'Alice']);
    test.deepEqual(matches[0].context, { X: 'x1', Y: 'Alice' });
    
    test.equal(matches[1].fact.head(), 'name');
    test.deepEqual(matches[1].fact.arguments(), ['x2', 'Bob']);
    test.deepEqual(matches[1].context, { X: 'x2', Y: 'Bob' });
};

exports['matches with one variable over facts with two arguments'] = function (test) {
    var world = wm.world();
    
    world.fact('name', ['x1', 'Alice']);
    world.fact('name', ['x2', 'Bob']);
    
    var matches = world.matches('name', ['x1', 'Y']);

    test.ok(matches);
    test.ok(Array.isArray(matches));
    test.equal(matches.length, 1);
    
    test.equal(matches[0].fact.head(), 'name');
    test.deepEqual(matches[0].fact.arguments(), ['x1', 'Alice']);
    test.deepEqual(matches[0].context, { Y: 'Alice' });
};

exports['matches with one repeated variable'] = function (test) {
    var world = wm.world();
    
    world.fact('friend', ['x1', 'x1']);
    world.fact('friend', ['x2', 'x1']);
    
    var matches = world.matches('friend', ['X', 'X']);

    test.ok(matches);
    test.ok(Array.isArray(matches));
    test.equal(matches.length, 1);
    
    test.equal(matches[0].fact.head(), 'friend');
    test.deepEqual(matches[0].fact.arguments(), ['x1', 'x1']);
    test.deepEqual(matches[0].context, { X: 'x1' });
};
