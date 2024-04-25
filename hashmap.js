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
        if (this.keys >= (this.bucketLength * this.loadFactor)) {
            this.keys = 0;
            let newArray = this.bucket;
            this.bucket = [];
            this.bucketLength = this.bucketLength * 2;
            newArray.forEach(item => {
                let current = item.head;

                while (current) {
                    this.set(current.value.key, current.value.value);
                    current = current.nextNode;
                }
            })
        }
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

    get allKeys() {
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

    get allValues() {
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

    get entries() {
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

//hashmap testing
console.log(myHash.set('Alex', '18'));
console.log(myHash.set('Tanya', '28'));
console.log(myHash.set('Michael', '40'));
console.log(myHash.set('Johnny', '32'));
console.log(myHash.set('Michelle', '19'));
console.log(myHash.set('Ben', '35'));
console.log(myHash.set('Gus', '25'));
console.log(myHash.set('Jordan', '22'));
console.log(myHash.set('Tom', '29'));
console.log(myHash.set('Brian', '32'));
console.log(myHash.set('Frank', '20'));
console.log(myHash.set('Leslie', '43'));
console.log(myHash.set('Henry', '18'));
console.log(myHash.set('Max', '31'));
console.log(myHash.set('Thomas', '51'));
console.log(myHash.allKeys);
console.log(myHash.allValues);
console.log(myHash.entries);
console.log(myHash.length);
console.log(myHash.bucketLength);
