const assert = require("assert");
const lowstore = require("../src/index");

describe("lowstore", function() {
  let store;
  let intn;

  it("initializes", function() {
    store = lowstore();
    store.should.be.an.Object;
    store.internal.should.be.an.Object;
    intn = store.internal;
  });

  it(".set", function() {
    assert.equal(intn.one, undefined);
    store.set("one", "val one");
    intn.one.should.be.exactly("val one");
  });

  it(".hset", function() {
    assert.equal(intn.two, undefined);
    store.hset("two", "subtwo", "val two");
    intn.two.should.be.an.Object;
    intn.two.subtwo.should.be.exactly("val two");
  });

  it(".push", function() {
    assert.equal(intn.three, undefined);
    store.push("three", "val three a");
    store.push("three", "val three b");
    intn.three.should.be.an.Array;
    intn.three.length.should.be.exactly(2);
    intn.three[0].should.be.exactly("val three a");
    intn.three[1].should.be.exactly("val three b");
  });

  it(".removeIndex", function() {
    store.removeIndex("three", 1);
    intn.three.length.should.be.exactly(1);
    intn.three[0].should.be.exactly("val three a");
    store.removeIndex("three", 0);
    intn.three.length.should.be.exactly(0);
  });

  it(".toggle", function() {
    assert.equal(intn.four, undefined);
    store.toggle("four", "four a", "four b");
    intn.four.should.be.exactly("four a");
    store.toggle("four", "four a", "four b");
    intn.four.should.be.exactly("four b");
    store.toggle("five", true, false);
    intn.five.should.be.exactly(true);
    store.toggle("five", true, false);
    intn.five.should.be.exactly(false);
    store.toggle("six");
    intn.six.should.be.exactly(true);
    store.toggle("six");
    intn.six.should.be.exactly(false);
  });

  it(".assign", function() {
    assert.equal(intn.assignText, undefined);
    store.assign({ assignText: "assigned1" });
    intn.assignText.should.be.exactly("assigned1");
    store.assign("assignText", { assignedSub: "assigned2" });
    intn.assignText.assignedSub.should.be.exactly("assigned2");
  });
});
