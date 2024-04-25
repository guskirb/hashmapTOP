import List from "./list.js";

class HashSet {
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

    set(key) {
        const hashCode = this.hash(key);

        this.checkCapacity();
        if (this.bucket[hashCode]) {
            if (this.bucket[hashCode].containsKey(key)) {
                let index = this.bucket[hashCode].findKey(key);
                this.bucket[hashCode].remove(index);
                this.bucket[hashCode].insertAt(key, index);
            } else {
                this.bucket[hashCode].append(key);
                this.keys++;
            }
        } else {
            this.bucket[hashCode] = new List;
            this.bucket[hashCode].prepend(key);
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
                    this.set(current.value);
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
                newArray.push(current.value);
                current = current.nextNode;
            }
        })
        return newArray;
    }

}

let myHash = new HashSet;

//hashset testing
console.log(myHash.set('Alex'));
console.log(myHash.set('Tanya'));
console.log(myHash.set('Michael'));
console.log(myHash.set('Johnny'));
console.log(myHash.set('Michelle'));
console.log(myHash.set('Ben'));
console.log(myHash.set('Gus'));
console.log(myHash.set('Jordan'));
console.log(myHash.set('Tom'));
console.log(myHash.set('Brian'));
console.log(myHash.set('Frank'));
console.log(myHash.set('Leslie'));
console.log(myHash.set('Henry'));
console.log(myHash.set('Max'));
console.log(myHash.set('Thomas'));
console.log(myHash.allKeys);
console.log(myHash.length);
console.log(myHash.bucketLength);