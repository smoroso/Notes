# Whats is it?

1. Specificity determines which CSS rule is applied by the browsers.
2. Specificity is usually the reason why your CSS-rules don’t apply to some elements, although you think they should.
3. Every selector has its place in the specificity hierarchy.
4. If two selectors apply to the same element, the one with higher specificity wins.
5. There are four distinct categories which define the specificity level of a given selector: inline styles, IDs, classes, attributes, and elements.
6. You can understand specificity if you love Star Wars: CSS Specificity Wars.
7. You can understand specificity if you love poker: CSS Specificity for Poker Players
8. When selectors have an equal specificity value, the latest rule is the one that counts.
9. When selectors have an unequal specificity value, the more specific rule is the one that counts.
10. Rules with more specific selectors have a greater specificity.
11. The last rule defined overrides any previous, conflicting rules.
12. The embedded style sheet has a greater specificity than other rules.
13. ID selectors have a higher specificity than attribute selectors.
14. You should always try to use IDs to increase the specificity.
15. A class selector beats any number of element selectors.
16. The universal selector and inherited selectors have a specificity of 0, 0, 0, 0.
17. You can calculate CSS specificity with CSS Specificity Calculator.

There are four distinct categories which define the specificity level of a given selector:

1. Inline styles (Presence of style in document). An inline style lives within your XHTML document. It is attached directly to the element to be styled. E.g. <h1 style=“color: #fff;”>
2. IDs (# of ID selectors) ID is an identifier for your page elements, such as #div.
3. Classes, attributes and pseudo-classes (# of class selectors). This group includes .classes, [attributes] and pseudo-classes such as :hover, :focus etc.
4. Elements and pseudo-elements (# of Element (type) selectors). Including for instance :before and :after.

Universal selector (*), combinators (+, >, ~, ' ') and negation pseudo-class (:not()) have no effect on specificity. (The selectors declared inside :not() do, however.)

# Example:
```
npm install
npm test
```

# Links
- [CSS Specificity: Things You Should Know](https://www.smashingmagazine.com/2007/07/css-specificity-things-you-should-know/)
- [CSS Specificity](https://www.w3schools.com/css/css_specificity.asp)
- [Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)
