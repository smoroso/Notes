const assert = require("chai").assert;
const { compare, calculateSpecificity } = require("./main");

describe("calculateSpecificity", function() {
  describe("simple selectors", function() {
    it("works for an element selector", function() {
      assert.equal(calculateSpecificity("body"), 1);
      assert.equal(calculateSpecificity("p"), 1);
    });

    it("works for a pseudo-element selector", function() {
      assert.equal(calculateSpecificity("::before"), 1);
    });

    it("works for a class selector", function() {
      assert.equal(calculateSpecificity(".foo"), 10);
    });

    it("works for a pseudo-class selector", function() {
      assert.equal(calculateSpecificity(":hover"), 10);
    });

    it("works for an attribute selector", function() {
      assert.equal(calculateSpecificity("[id='foo']"), 10);
    });

    it("works for an id selector", function() {
      assert.equal(calculateSpecificity("#foo"), 100);
    });
  });

  describe("complex selectors", function() {
    it("works for an element combined with a class", function() {
      assert.equal(calculateSpecificity("div.big"), 11);
    });

    it("works for an element combined with an id", function() {
      assert.equal(calculateSpecificity("a#foo"), 101);
    });
  });

  describe("nested selectors", function() {
    it("works for different valid selectors combination", function() {
      assert.equal(calculateSpecificity("p a.foo"), 12);
      assert.equal(calculateSpecificity(".foo .bar"), 20);
      assert.equal(calculateSpecificity(".foo a[id='foo']"), 21);
      assert.equal(calculateSpecificity(".foo a#foo"), 111);
      assert.equal(calculateSpecificity("div.big a#foo"), 112);
      assert.equal(calculateSpecificity(".foo .bar a#foo:hover"), 131);
      assert.equal(calculateSpecificity("div.foo p#desc span[id='foo']::before"), 124);
    });
  });

  describe("invalid selectors", function() {
    it("gives 0 for invalid selectors", function() {
      assert.equal(calculateSpecificity("."), 0);
      assert.equal(calculateSpecificity("#"), 0);
    });
  });
});

describe("compare", function() {
  it("works", function() {
    assert.equal(compare("body p", "div"), "body p");
    assert.equal(compare(".class", "#id"), "#id");
    assert.equal(compare("div.big", ".small"), "div.big");
    assert.equal(compare(".big", ".small"), ".small"); // (because it appears later)
  });
});
