# DaWanda Ruby Coding Styleguide

Mostly adapted from the [Ruby style guide](https://github.com/bbatsov/ruby-style-guide). So when something isn't listed here, but it is in Ruby style guide, then it is also what we enforce.


## Source Code Layout

- Use two spaces per indentation level (aka soft tabs).

  ```ruby
  # bad - four spaces
  def some_method
      do_something
  end

  # good
  def some_method
    do_something
  end
  ```

- Use spaces around operators, after commas, colons and semicolons,
  around `{` and before `}`. Whitespace might be (mostly) irrelevant to
  the Ruby interpreter, but its proper use is the key to writing easily
  readable code.

  ```ruby
  sum = 1 + 2
  a, b = 1, 2
  [1, 2, 3].each { |e| puts e }
  ```

- No spaces after `(`, `[` or before `]`, `)`.

  ```ruby
  some(arg).other
  [1, 2, 3].size
  ```

- Indent `when` as deep as `case`.

  ```ruby
  case
  when song.name == 'Misty'
    puts 'Not again!'
  when song.duration > 120
    puts 'Too long!'
  when Time.now.hour > 21
    puts "It's too late"
  else
    song.play
  end
  ```

- When assigning the result of a conditional expression to a variable,
  preserve the usual alignment of its branches.

  ```ruby
  kind =
    case year
    when 1850..1889 then 'Blues'
    when 1890..1909 then 'Ragtime'
    when 1910..1929 then 'New Orleans Jazz'
    when 1930..1939 then 'Swing'
    when 1940..1950 then 'Bebop'
    else 'Jazz'
    end

  result =
    if some_cond
      calc_something
    else
      calc_something_else
    end
  ```

- Use spaces around the `=` operator when assigning default values to
  method parameters:

  ```ruby
  def some_method(arg1 = :default, arg2 = nil, arg3 = [])
    # do something...
  end
  ```

- When continuing a chained method invocation on another line keep the
  `.` on the second line.

  ```ruby
  one.two.three
    .four
  ```

- Align the parameters of a method call if they span more than one line.
  Don't keep them hanging.

  ```ruby
  def send_mail(source)
    Mailer.deliver(
      to: 'bob@example.com',
      from: 'us@example.com',
      subject: 'Important message',
      body: source.text
    )
  end
  ```

- Add underscores to large numeric literals to improve their
  readability.

  ```ruby
  num = 1_000_000
  ```

- Limit lines to 80 characters.

- Avoid trailing whitespace.

- End each file with a newline.


## Syntax

- Use `def` with parentheses when there are parameters. Omit the
  parentheses when the method doesn't accept any parameters.

  ```ruby
  def some_method
  end

  def some_method_with_parameters(param1, param2)
  end
  ```

- Avoid the ternary operator (`?:`) except in cases where all expressions
  are extremely trivial.

- Ternary operators must not be nested.

- Use `!` instead of `not`.

  ```ruby
  x = !something
  ```

- Always use `&&` and `||` instead of the `and` and `or` keywords.

  ```ruby
  if some_condition && some_other_condition
    do_something
  end
  ```

- Omit the outer braces around an implicit options hash.

  ```ruby
  user.set(name: 'John', age: 45, permissions: { read: true })
  ```

- Prefer `{...}` over `do...end` for single-line blocks. Avoid using `{...}`
  for multi-line blocks (multiline chaining is always ugly). Always use
  `do...end` for "control flow" and "method definitions" (e.g. in
  Rakefiles and certain DSLs). Avoid `do...end` when chaining.

  ```ruby
  names.each { |name| puts name }

  names.select do |name|
    name.start_with?('S')
  end
  ```

- Avoid `return` where not required for flow of control.

- Avoid `self` where not required. (It is only required when calling
  a self write accessor)

  ```ruby
  # bad
  def ready?
    if self.last_reviewed_at > self.last_updated_at
      self.worker.update(self.content, self.options)
      self.status = :in_progress
    end
    self.status == :verified
  end

  # good
  def ready?
    if last_reviewed_at > last_updated_at
      worker.update(content, options)
      self.status = :in_progress
    end
    status == :verified
  end
  ```

- Avoid shadowing methods with local variables unless they are both
  equivalent.

  ```ruby
  class Foo
    attr_accessor :options

    # ok
    def initialize(options)
      self.options = options
      # both options and self.options are equivalent here
    end

    # bad
    def do_something(options = {})
      unless options[:when] == :later
        output(self.options[:message])
      end
    end

    # good
    def do_something(params = {})
      unless params[:when] == :later
        output(options[:message])
      end
    end
  end
  ```

- Don't use the return value of `=` (an assignment) in conditional
  expressions unless the assignment is wrapped in parentheses.

  ```ruby
  # bad (+ a warning)
  if v = array.grep(/foo/)
    do_something(v)
    ...
  end

  # good (MRI would still complain, but RuboCop won't)
  if (v = array.grep(/foo/))
    do_something(v)
    ...
  end

  # good
  v = array.grep(/foo/)
  if v
    do_something(v)
    ...
  end
  ```

- Use more descriptive method versions when available, e.g. `Array#join`
  instead of `Array#*` and similar.

- Avoid use of nested conditionals for flow of control. Prefer a guard
  clause when you can assert invalid data.

  ```ruby
  # bad
  def compute_thing(thing)
    if thing[:foo]
      update_with_bar(thing)
      if thing[:foo][:bar]
        partial_compute(thing)
      else
        re_compute(thing)
      end
    end
  end

  # good
  def compute_thing(thing)
    return unless thing[:foo]
    update_with_bar(thing[:foo])
    return re_compute(thing) unless thing[:foo][:bar]
    partial_compute(thing)
  end
  ```

- Prefer `map` over `collect`, `find` over `detect`, `select` over
  `find_all`, `reduce` over `inject` and `size` over `length`. This is
  not a hard requirement; if the use of the alias enhances readability,
  it's ok to use it.

- Use `flat_map` instead of `map` + `flatten`.

  ```ruby
  # bad
  all_songs = users.map(&:songs).flatten.uniq

  # good
  all_songs = users.flat_map(&:songs).uniq
  ```


## Naming

- Use `snake_case` for symbols, methods and variables.

- Use `PascalCase` (some call it CamelCase but please read http://c2.com/cgi/wiki?PascalCase) for classes and modules. (Keep acronyms like HTTP,
  RFC, XML uppercase.)

- Use `snake_case` for naming files and directories.

- The names of potentially *dangerous* methods (i.e. methods that modify
  `self` or the arguments, `exit!` (doesn't run the finalizers like
  `exit` does), etc.) should end with an exclamation mark if there
  exists a safe version of that *dangerous* method.

  ```ruby
  # bad - there is no matching 'safe' method
  class Person
    def update!
    end
  end

  # good
  class Person
    def update
    end
  end

  # good
  class Person
    def update!
    end

    def update
    end
  end
  ```

- Define the non-bang (safe) method in terms of the bang (dangerous) one
  if possible.

  ```ruby
  class Array
    def flatten_once!
      res = []

      each do |e|
        [*e].each { |f| res << f }
      end

      replace(res)
    end

    def flatten_once
      dup.flatten_once!
    end
  end
  ```

- Avoid the usage of class (`@@`) variables due to their "nasty"
  behavior in inheritance.

  ```ruby
  class Parent
    @@class_var = 'parent'

    def self.print_class_var
      puts @@class_var
    end
  end

  class Child < Parent
    @@class_var = 'child'
  end

  Parent.print_class_var # => will print "child"
  ```

  As you can see all the classes in a class hierarchy actually share one
  class variable. Class instance variables should usually be preferred
  over class variables.

- Indent the `public`, `protected`, and `private` methods as much as the
  method definitions they apply to. Leave one blank line above the
  visibility modifier and one blank line below in order to emphasize
  that it applies to all methods below it.

  ```ruby
  class SomeClass
    def public_method
      # ...
    end

    private

    def private_method
      # ...
    end

    def another_private_method
      # ...
    end
  end
  ```


## Exceptions

- Signal exceptions using the `fail` method. Use `raise` only when catching
  an exception and re-raising it (because here you're not failing, but
  explicitly and purposefully raising an exception).

  ```ruby
  begin
    fail 'Oops'
  rescue => error
    raise if error.message != 'Oops'
  end
  ```

- Use *implicit begin blocks* where possible.

  ```ruby
  # bad
  def foo
    begin
      # main logic goes here
    rescue
      # failure handling goes here
    end
  end

  # good
  def foo
    # main logic goes here
  rescue
    # failure handling goes here
  end
  ```

- Don't suppress exceptions.

  ```ruby
  # bad
  begin
    # an exception occurs here
  rescue SomeError
    # the rescue clause does absolutely nothing
  end

  # bad
  do_something rescue nil
  ```

-  Don't use exceptions for flow of control.

  ```ruby
  # bad
  begin
    n / d
  rescue ZeroDivisionError
    puts 'Cannot divide by 0!'
  end

  # good
  if d.zero?
    puts 'Cannot divide by 0!'
  else
    n / d
  end
  ```


## Collections

- Use `Hash#fetch` when dealing with hash keys that should be present.

  ```ruby
  heroes = { batman: 'Bruce Wayne', superman: 'Clark Kent' }
  # bad - if we make a mistake we might not spot it right away
  heroes[:batman] # => "Bruce Wayne"
  heroes[:supermann] # => nil

  # good - fetch raises a KeyError making the problem obvious
  heroes.fetch(:supermann)
  ```

- Introduce default values for hash keys via `Hash#fetch` as opposed to
  using custom logic.

  ```ruby
  batman = { name: 'Bruce Wayne', is_evil: false }

  # bad - if we just use || operator with falsy value we won't get the expected result
  batman[:is_evil] || true # => true

  # good - fetch work correctly with falsy values
  batman.fetch(:is_evil, true) # => false
  ```

- Prefer the use of the block instead of the default value in
  `Hash#fetch` if fallback is expensive.

  ```ruby
  batman = { name: 'Bruce Wayne' }

  # bad - if we use the default value, we eager evaluate it
  # so it can slow the program down if done multiple times
  batman.fetch(:powers, get_batman_powers) # get_batman_powers is an expensive call

  # good - blocks are lazy evaluated, so only triggered in case of KeyError exception
  batman.fetch(:powers) { get_batman_powers }
  ```


## Strings

- Prefer single-quoted strings when you don't need string interpolation
  or special symbols such as `\t`, `\n`, `'`, etc.

- Don't use `String#gsub` in scenarios in which you can use a faster more
  specialized alternative.

  ```ruby
  url = 'http://example.com'
  str = 'lisp-case-rules'

  # bad
  url.gsub("http://", "https://")
  str.gsub("-", "_")

  # good
  url.sub("http://", "https://")
  str.tr("-", "_")
  ```

- Don't use regular expressions if you just need plain text search in
  string: `string['text']`

## Nested attributes options
### Use Case Description
3 classes:
```ruby
# lib/models/order.rb
class Order < ActiveRecord::Base
  belongs_to :seller
end

# lib/models/seller.rb
class Seller < ActiveRecord::Base
  has_one :order
  has_one shop
end

# lib/models/shop.rb
class Shop < ActiveRecord::Base
  belongs_to :seller
end
```

A Container is taking in an Order instance and wants to get the shop title. How to do that?
```ruby
# lib/api/containers/order.rb
module Container
  class Order
    attr_reader :shop_title

    def initialize(order)
      @shop_title = '???'

      # other properties...
    end

    def as_json(*)
      {
        shop_title: shop_title
        # other properties...
      }
    end
  end
end
```

### Use Case Options
#### Option1: Chaining
```ruby
# lib/api/containers/order.rb
module Container
  class Order
    attr_reader :shop_title

    def initialize(order)
      @shop_title = order.seller.shop.title
    end
  end
end
```
Good:
- Minimalistic model

Bad:
- Maintainability

#### Option2: Delegation
```ruby
# lib/api/containers/order.rb
module Container
  class Order
    attr_reader :shop_title

    def initialize(order)
      @shop_title = order.seller_shop_title

      # other properties...
    end

    def as_json(*)
      {
        shop_title: shop_title
        # other properties...
      }
    end
  end
end

# lib/models/order.rb
class Order < ActiveRecord::Base
  belongs_to :seller

  delegate :shop_title, to: :seller, prefix: true, allow_nil: true
end

# lib/models/seller.rb
class Seller < ActiveRecord::Base
  has_one :order
  has_one :shop

  delegate :title, to: :shop, prefix: true, allow_nil: true
end

# lib/models/shop.rb
class Shop < ActiveRecord::Base
  belongs_to :seller
end
```
Good:
- Respecting the [Law of Demeter](https://devblast.com/b/rails-delegate-dont-break-the-law-of-demeter) (only talk to your friends, not your friend's friends)

Bad:
- Polutting the model(s) with delegation(s)

#### Option3: Service (Three-tier architecture)
- Presentation Tier: Order Container
- Logic Tier: Order Service
- Data Tier: Order Model

```ruby
# lib/api/containers/order.rb
require 'services/order_service.rb'

module Container
  class Order
    attr_reader :shop_title

    def initialize(order)
      @order_service = OrderService.new(order)
      @shop_title = @order_service.shop_title

      # other properties...
    end

    def as_json(*)
      {
        shop_title: shop_title
        # other properties...
      }
    end
  end
end

#lib/services/order_service.rb
class OrderService
  def initialize(order)
    @seller_service = SellerService.new(order.seller)
  end

  def shop_title
    @shop_title ||= @seller_service.shop_title
  end
end

class SellerService
  def initialize(seller)
    @shop = seller.shop
  end

  def shop_title
    @shop_title ||= @shop.try(:title)
  end
end
```

Good:
- Long term maintainability

Bad:
- More code needed compared to the chaining option

#### Option4: Domain Separated
```ruby
module Container
  class Order
    attr_reader :shop

    def initialize(order)
      shop = Models::Shop.find_by(user_id: order.seller_id)

      # other properties...
    end

    def as_json(*)
      {
        shop_title: shop.title
        # other properties...
      }
    end
  end
end
```

Good:
- No chaining; each domain describes itself and talks to its close relation
- Long-term maintainability
- Not directly relying on ActiveRecord magic
- Future compatibility with micro service extraction

Bad:
- More code needed compared to the chaining option

### Decision
After an intensive debate, we decided to encourage people to use the Option Number 4

## Metaprogramming

- Avoid needless metaprogramming.


## Misc

- Avoid hashes as optional parameters. Does the method do too much?
  (Object initializers are exceptions for this rule).

- Avoid methods longer than 10 LOC (lines of code). Ideally, most
  methods will be shorter than 5 LOC. Empty lines do not contribute to
  the relevant LOC.

- Avoid parameter lists longer than four parameters.

- Avoid more than three levels of block nesting.

- Use common sense.

- Prefer clarity over smartness.
