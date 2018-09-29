
var wm = require('..');

exports['create world'] = function (test) {
    var world = wm.world();
    
    test.ok(world);
    test.equal(typeof world, 'object');
};

