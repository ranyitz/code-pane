export const initialCode = `function Foo() {
  this.a = 1;
  this.b = 2;
}
 
Foo.prototype.c = 3;
 
_.values(new Foo);
// => [1, 2] (iteration order is not guaranteed)
 
_.values('hi');
// => ['h', 'i']`;
