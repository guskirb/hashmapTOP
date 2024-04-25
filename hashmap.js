import List from "./list.js";

class HashMap {
    constructor() {
        this.bucket = [];
        this.bucketLength = 16;
        this.loadFactor = 0.75;
        this.keys = 0;
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
                this.keys++;
            }
        } else {
            this.bucket[hashCode] = new List;
            this.bucket[hashCode].prepend({ key, value });
            this.keys++;
        }
    }

    checkCapacity() {
        if (this.atCapacity()) {
            this.keys = 0;
            this.bucketLength = this.bucketLength * 2;
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

    get(key) {
        const hashCode = this.hash(key);

        return this.bucket[hashCode].findValue(key);
    }

    has(key) {
        let hasKey = false;
        const hashCode = this.hash(key);

        if (this.bucket[hashCode]) {
            hasKey = this.bucket[hashCode].containsKey(key);
        }
        return hasKey;
    }

    remove(key) {
        let removedKey = false;
        const hashCode = this.hash(key);

        if (this.bucket[hashCode]) {
            let index = this.bucket[hashCode].findKey(key);
            this.bucket[hashCode].remove(index);
            removedKey = true;
            this.keys--;
        }

        return removedKey;
    }

    get length() {
        return this.keys;
    }

    clear() {
        this.bucket = [];
        this.bucketLength = 16;
        this.keys = 0;
    }

    allKeys() {
        let newArray = [];
        this.bucket.forEach((item) => {
            let current = item.head;

            while (current) {
                newArray.push(current.value.key);
                current = current.nextNode;
            }
        })
        return newArray;
    }

    allValues() {
        let newArray = [];
        this.bucket.forEach((item) => {
            let current = item.head;

            while (current) {
                newArray.push(current.value.value);
                current = current.nextNode;
            }
        })
        return newArray;
    }

    entries() {
        let newArray = [];
        this.bucket.forEach((item) => {
            let current = item.head;

            while (current) {
                newArray.push([current.value.value, current.value.key]);
                current = current.nextNode;
            }
        })
        return newArray;
    }
}

let myHash = new HashMap;

console.log(myHash.set('gus', 'hi'));
console.log(myHash.set('gus', 'lol'));
console.log(myHash.set('hiya', 'hi'));
console.log(myHash.set('hi', 'hi'));
console.log(myHash.set('gus', 'bye'));
console.log(myHash.set('gus', 'haha'));
console.log(myHash.allKeys());
console.log(myHash.allValues());
console.log(myHash.entries());
console.log(myHash.length);
