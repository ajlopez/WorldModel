
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
