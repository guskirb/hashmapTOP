import Node from "./node.js";

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    prepend(value) {
        this.head = new Node(value, this.head);
        this.size++;
    }

    append(value) {
        if (this.head === null) {
            this.head = new Node(value, this.head);

        } else {
            let current = this.head

            while (current.nextNode !== null) {
                current = current.nextNode;
            }
            current.nextNode = new Node(value);
        }
        this.size++;
    }

    get getSize() {
        return this.size;
    }

    get getHead() {
        return this.head.value;
    }

    get getTail() {
        let current = this.head

        while (current.nextNode !== null) {
            current = current.nextNode;
        }

        return current.value;
    }

    atIndex(value) {
        let current = this.head;

        for (let x = 0; x < value; x++) {
            current = current.nextNode;
        }

        return current.value;
    }

    pop() {
        let current = this.head
        while (current.nextNode.nextNode !== null) {
            current = current.nextNode;
        }
        current.nextNode = null;
        this.size--;
    }

    contains(value) {
        let current = this.head

        while (current !== null) {
            if (current.value === value) {
                return true;
            } else {
                current = current.nextNode;
            }
        }
        return false;
    }

    find(value) {
        let current = this.head
        let index = 0;

        while (current !== null) {
            if (current.value === value) {
                return index;
            } else {
                current = current.nextNode;
                index++;
            }
        }
        return null;
    }

    toString() {
        let current = this.head
        let string = '';

        while (current !== null) {
            string += `( ${current.value} ) -> `;
            current = current.nextNode;
        }
        string += `null`;
        return string;
    }

    insertAt(value, index) {
        let current = this.head;

        for (let x = 0; x < index - 1; x++) {
            current = current.nextNode;
        }
        current.nextNode = new Node(value, current.nextNode);
        this.size++;
    }

    remove(index) {
        let current = this.head;

        for (let x = 0; x < index - 1; x++) {
            current = current.nextNode;
        }
        current.nextNode = current.nextNode.nextNode;
    }
}

// console testing:
const newLL = new LinkedList();

newLL.append('wassup');
newLL.prepend('hi');
newLL.append('sup');
newLL.append('lol');

console.log(newLL.getSize);
newLL.pop();
console.log(newLL.find('lol'));
console.log(newLL.insertAt('helloo', 1));
console.log(newLL.remove(2));
console.log(newLL.toString());

console.log(newLL.find('lol'));