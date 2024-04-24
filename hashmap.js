import List from "./list.js";

class HashMap {
    constructor() {
        this.bucket = [];
        this.bucketLength = 16;
        this.loadFactor = 0.75;
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = hashCode % this.bucketLength;
        }

        return hashCode;
    }

    set(key, value) {
        const hashCode = this.hash(key);

        this.checkCapacity();
        if (this.bucket[hashCode]) {
            if (this.bucket[hashCode].containsKey(key)) {
                let index = this.bucket[hashCode].findKey(key);
                this.bucket[hashCode].remove(index);
                this.bucket[hashCode].insertAt({ key, value }, index);
            } else {
                this.bucket[hashCode].append({ key, value });
            }
        } else {
            this.bucket[hashCode] = new List;
            this.bucket[hashCode].prepend({ key, value });
        }
    }

    checkCapacity() {
        if (this.atCapacity()) {
            this.bucketLength = this.bucketLength * 2
            this.bucket.forEach(item => {
                let current = item.head;

                while (current) {
                    this.set(current.value.key, current.value.value);
                    current = current.nextNode;
                }
            })
        }
    }

    atCapacity() {
        let indexFull = 0;
        for (let x = 0; x < this.bucketLength; x++) {
            if (this.bucket[x]) {
                indexFull++
            }
        }
        return (indexFull >= (this.bucketLength * this.loadFactor) ? true : false);
    }

}
let myHash = new HashMap;

console.log(myHash.set('gus', 'hi'));
console.log(myHash.set('gus', 'lol'));
console.log(myHash.set('hiya', 'hi'));
console.log(myHash.set('hi', 'hi'));
console.log(myHash.set('gus', 'bye'));
console.log(myHash.set('gus', 'haha'));
