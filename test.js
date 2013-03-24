var test = require("tap").test;
var Heap = require('./binaryheap');

test("check order", function (t) {
  var input = [5, 8, 3, 2, 7, 4, 14];
  var output = [2, 3, 4, 5, 7, 8, 14];

  var heap = new Heap(true);
  input.forEach(function (i) {
    heap.insert({key: i}, i);
  });

  console.log('foo');

  t.equal(heap.length, input.length, "heap size matches input");

  var o = [];

  for (var i = 0; i < input.length; i++)
    o.push(heap.pop().key)

  t.equal(o.length, output.length, "heap sorted length matches");
  t.equivalent(o, output, "heap sorted matches expected output");

  heap = new Heap(false);
  output.reverse();

  input.forEach(function (i) {
    heap.insert({key: i}, i);
  });

  t.equal(heap.length, input.length, "heap size matches input");

  var o = [];

  for (var i = 0; i < input.length; i++)
    o.push(heap.pop().key)

  t.equal(o.length, output.length, "heap sorted length matches");
  t.equivalent(o, output, "heap sorted matches expected output");

  t.end();
});

var tree_count = 9;

var trees = [];
function getDot() {
  var tree = require('fs').createWriteStream('tree.'+ ++tree_count + '.dot');
  trees.push(tree);
  return tree;
};

function closeDot() {
  while (trees.length)
    trees.pop().end();
};

// rm -f anim.gif && for i in $(ls tree.*.dot); do dot -Tgif $i -o $(basename $i .dot).gif; done && gifsicle --delay=100 --loop *.gif > anim.gif

test("remove arbitrary elements", function (t) {
  var heap = new Heap();

  var elems = {
    a: { key: 5 },
    b: { key: 7 },
    c: { key: 3 },
    d: { key: 14 },
    e: { key: 8 },
    f: { key: 30 },
    g: { key: 23 },
    h: { key: 1 },
  };

  Object.keys(elems).forEach(function (key) {
    heap.insert(elems[key], elems[key].key);
    heap.print(getDot());
  });

  heap.print(getDot());
  heap.remove(elems.e);
  t.equal(heap.length, heap.count(heap.root), "length and count should match");
  t.equal(heap.length, Object.keys(elems).length - 1, "should only remove one ndoe");
  heap.print(getDot());

  heap.remove(elems.a);
  t.equal(heap.length, heap.count(heap.root), "length and count should match");
  t.equal(heap.length, Object.keys(elems).length - 1, "should only remove one ndoe");
  heap.print(getDot());


  heap.remove(elems.b);
  t.equal(heap.length, heap.count(heap.root), "length and count should match");
  t.equal(heap.length, Object.keys(elems).length - 1, "should only remove one ndoe");
  heap.print(getDot());

  closeDot();

  t.end();
});
