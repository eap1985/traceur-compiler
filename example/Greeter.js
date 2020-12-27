export default class Greeter {
  constructor(message) {
    this.message = message;
  }

  greet() {
    let element = document.querySelector('#message');
    element.textContent = this.message;
  }

  assert(value, desc) {
    let li = document.createElement("li");
    li.className = value ? "pass" : "faigit l";
    li.appendChild(document.createTextNode(desc));
    document.getElementById("results").appendChild(li);
  }

}

function greetnew(message) {
  let element = document.querySelector('#message');
  element.textContent = message;
}

export { greetnew as sayHello }
