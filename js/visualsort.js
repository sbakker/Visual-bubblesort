// vars
var stop_sort = false;
var numbers   = Array();
var items     = 2400;

function initialise() {
    numbers = Array();
    for (i=0; i < items; i++){
        numbers.push(Math.floor(Math.random() * 500) +1);
        var graph = document.createElement('div');
        graph.setAttribute('id', i);
        graph.setAttribute('class', 'graphstyle');
        document.getElementById('graphcon').appendChild(graph);
        document.getElementById(i).style.height = numbers[i]+'px';
        document.getElementById(i).style.width = 0.5+'px';
    }
}

initialise();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function stopsort() {
    stop_sort = true;
}

async function sortgraph(func) {
    stop_sort = false;
    qs = await func(numbers);
    console.log("iterations: "+qs.iterations);
    console.log("swaps: "+qs.swaps);
}

async function quicksort(A) {
    return quicksort_iteration(A, 0, A.length);
}

function swap(A, i, j) {
    var ii = A[i];
    A[i] = A[j];
    A[j] = ii;
    document.getElementById(j).style.height = A[j]+'px';
    document.getElementById(i).style.height = A[i]+'px';
}

async function quicksort_iteration(A, i, n) {
    var qs = {
        'iterations' : 1,
        'swaps' : 0,
    };

    if (stop_sort) return qs;
    if (n <= 1) return qs;

    var x = A[i + Math.floor(Math.random() * n) + 1];
    var p = i-1;
    var j = i;
    var q = i+n;

    var nswap = 0;

    while (j < q) {
        if (A[j] < x) {
            swap(A, j++, ++p);
            nswap++;
        }
        else if (A[j] > x) {
            swap(A, j, --q);
            nswap++;
        }
        else {
            ++j;
        }
    }

    // Recursively sort sub-arrays.
    await sleep(0.01);
    var qs1 = await quicksort_iteration(A, i, p-i+1);
    await sleep(0.01);
    var qs2 = await quicksort_iteration(A, q, n-(q-i));

    // Return the statistics.
    qs.iterations = 1 + qs1.iterations + qs2.iterations;
    qs.swaps = nswap + qs1.swaps + qs2.swaps;
    return qs;
}

async function bubblesort(A) {
    var total_swaps = 0;
    var iterations = 0;
    do {
        if (stop_sort) break;
        iterations++;
        nswap = bubble_iteration(A);
        if (nswap > 0) {
            total_swaps += nswap;
            await sleep(0.01);
        }
    } while (nswap > 0);
    return { 'iterations' : iterations, 'swaps' : total_swaps };
}

function bubble_iteration(A) {
    var nswap = 0;
    for (i = 0; i < A.length-1; i++){
        if (A[i] > A[i+1]) {
            swap(A, i, i+1);
            nswap++;
            document.getElementById(i+1).style.height = numbers[i]+'px';
            document.getElementById(i+1).style.height = numbers[i+1]+'px';
        }
    }
    return nswap;
}
