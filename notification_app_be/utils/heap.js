/**
 * notification_app_be/utils/heap.js
 * Min-Heap implementation to maintain top N notifications efficiently.
 */

class MinHeap {
    constructor(capacity, compareFn) {
        this.capacity = capacity;
        this.compareFn = compareFn;
        this.heap = [];
    }

    insert(val) {
        if (this.heap.length < this.capacity) {
            this.heap.push(val);
            this.bubbleUp(this.heap.length - 1);
        } else if (this.compareFn(val, this.heap[0]) > 0) {
            this.heap[0] = val;
            this.sinkDown(0);
        }
    }

    bubbleUp(index) {
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            if (this.compareFn(this.heap[index], this.heap[parentIndex]) >= 0) break;
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    sinkDown(index) {
        const length = this.heap.length;
        while (true) {
            let leftChild = 2 * index + 1;
            let rightChild = 2 * index + 2;
            let smallest = index;

            if (leftChild < length && this.compareFn(this.heap[leftChild], this.heap[smallest]) < 0) {
                smallest = leftChild;
            }
            if (rightChild < length && this.compareFn(this.heap[rightChild], this.heap[smallest]) < 0) {
                smallest = rightChild;
            }

            if (smallest === index) break;
            
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }

    getSortedElements() {
        return [...this.heap].sort((a, b) => this.compareFn(b, a)); // Sort descending for output
    }
}

module.exports = MinHeap;
