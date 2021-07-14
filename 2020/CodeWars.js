const array = [ 6,
    35,
    24,
    44,
    19,
    19,
    21,
    24,
    45,
    23,
    36,
    47,
    8,
    5,
    42,
    39,
    1,
    36,
    47,
    38,
    30,
    35,
    22,
    46,
    27,
    23,
    16,
    12,
    4 ];
 const tills = 4;

 const array3 = [42,5,16,39,14,9,6,43,2,41,43,47,13,33,47,37,9,6,3,10,10,42] //should eval to 156. but getting 114
 const tills3 = 4
 
 const array2 = [ 2, 2, 3, 3, 4, 4 ];

 function queueTime(customers, n) {
    //TODO
    //.shift a number off the customers array and put onto a till. 
    //When a till becomes open, advance the next customer to the open till.
    let time = 0;
    console.time();
    if(customers.length != 0) {
      //for each till take a customer off the array, 
      //decrement the customer down to zero, when till has customer at zero, put new customer on to till.
      console.log(customers)
      console.log(n)
      while(customers.length > 0 && customers.length != null && n != 0){
        if(n > customers.length){
          n = customers.length;
        }
        for(let i = 0; i < n; i++){
          customers[i]--;
        }

        //only works if first customer is the one that goes to zero first, needs to detect any of the customers in the tills
        
        const toRemove = [];
        for(let j = 0; j < n; j++){
            if(customers[j] <= 0){
                toRemove.push(j);
            }
        }
        toRemove.sort((a,b) => b - a);
        toRemove.forEach(num => customers.splice(num, 1))

        // while(customers[0] <= 0){
        //   customers.shift();
        // }
        console.log(customers)
        time++;
      }
      
    }
    console.log(time);
    console.timeEnd();
    return time;
  }

  queueTime(array3, tills3);
