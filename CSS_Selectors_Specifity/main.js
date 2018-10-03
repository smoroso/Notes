const SPECIFICITIES = [
  {
    name: "element",
    regexp: /^[a-zA-Z]+/,
    value: 1
  },{
    name: "pseudo-element",
    regexp: /:{2}[a-zA-Z]+/,
    value: 1
  },{
    name: "class",
    regexp: /\.\w+/,
    value: 10
  },{
    name: "pseudo-class",
    regexp: /^\w*[^:]*:[^:]*\w*$/,
    value: 10
  },{
    name: "attribute",
    regexp: /\[.+\]/,
    value: 10
  },{
    name: "id",
    regexp: /#\w+/,
    value: 100
  }
];

const compare = (a, b) => {
  if(calculateSpecificity(a) > calculateSpecificity(b)) { return a; }
  return b;
};

const calculateSpecificity = (selector = "") => {
  decomposedSelector = selector.split(" ");
  return decomposedSelector.reduce((accumulator, currentSelector) => {
    return accumulator + getSpecificity(currentSelector);
  }, 0);
};

const getSpecificity = (selector) => {
  return SPECIFICITIES.reduce((accumulator, currentSpecifity) => {
    let value = currentSpecifity.regexp.test(selector) ? currentSpecifity.value : 0;
    return accumulator + value;
  }, 0);
};

module.exports = {
  compare,
  calculateSpecificity
};
