//Initializing base variables
var capacity = [8,5,3];
var ans = [],memory = [];
var initialValues = [8,0,0];
var finalValues = [4,4,0];

//jug object 
function jugState(a,b,c){
	 this.a = a;
	 this.b = b;
	 this.c = c;
	 this.stateEquals = function(newState){
		 return (this.a === newState.a)&&(this.b === newState.b)&&(this.c === newState.c);
	 }
}
 
//helper function to check memory
function isInMemory(newState){
	 var flag= false;
	 for(mem in memory){
		 if(memory[mem].stateEquals(newState)){
			 flag = true;
			 break;
		 }
	 }
	 return flag;
}
 
function isInvalidState(newState){
 return !((newState.a>-1)&&(newState.b>-1)&&(newState.c>-1));
}
 
//initializing objects for capacity and state
var jugCapacity = new jugState(capacity[0],capacity[1],capacity[2]);
var initialState = new jugState(initialValues[0],initialValues[1],initialValues[2]);
var finalState = new jugState(finalValues[0],finalValues[1],finalValues[2]);

//recursive function to get capacity
function getAllStates(initialState,finalState){
	if(isInvalidState(initialState)){
		return false;
	}
	if(initialState.stateEquals(finalState)){  // to check if the function reached the desired output
		ans.push(initialState);
		return true;
	}
	if(isInMemory(initialState)){   // to check already visited states
		return false;
	}
    memory.push(initialState);
    // empty jug A:
	if(initialState.a>0){
		if((initialState.a+initialState.b)<jugCapacity.b){
			var newState = new jugState(0,initialState.a+initialState.b,initialState.c);
			if(getAllStates(newState,finalState)){
				ans.push(initialState);
				return true;
			}
		}else{
			var newState = new jugState(initialState.a-(jugCapacity.b-initialState.b),jugCapacity.b,initialState.c);
			if(getAllStates(newState,finalState)){
				ans.push(initialState);
				return true;
			}
		}
		if((initialState.a+initialState.c)<jugCapacity.c){
			var newState = new jugState(0,initialState.b,initialState.a+initialState.c);
			if(getAllStates(newState,finalState)){
				ans.push(initialState);
				return true;
			}
		}else{
			var newState = new jugState(initialState.a-(jugCapacity.c-initialState.c),initialState.b,jugCapacity.c);
			if(getAllStates(newState,finalState)){
				ans.push(initialState);
				return true;
			}
		}
    }
    
    // empty jug B:
	if(initialState.b>0){
		if((initialState.a+initialState.b)<jugCapacity.a){
			var newState = new jugState(initialState.a+initialState.b,0,initialState.c);
			if(getAllStates(newState,finalState)){
				ans.push(initialState);
				return true;
			}
		}else{
			var newState = new jugState(jugCapacity.a,initialState.b-(jugCapacity.a-initialState.a),initialState.c);
			if(getAllStates(newState,finalState)){
				ans.push(initialState);
				return true;
			}
		}
		if((initialState.b+initialState.c)<jugCapacity.c){
			var newState = new jugState(initialState.a,0,initialState.b+initialState.c);
			if(getAllStates(newState,finalState)){
				ans.push(initialState);
				return true;
			}
		}else{
			var newState = new jugState(initialState.a,initialState.b-(jugCapacity.c-initialState.c),jugCapacity.c);
			if(getAllStates(newState,finalState)){
				ans.push(initialState);
				return true;
			}
		}
    }
    // empty jug C:
	if(initialState.c>0){
		if((initialState.a+initialState.c)<jugCapacity.a){
			var newState = new jugState(initialState.a+initialState.c,initialState.b,0);
			if(getAllStates(newState,finalState)){
				ans.push(initialState);
				return true;
			}
		}else{
			var newState = new jugState(jugCapacity.a,initialState.b,initialState.c-(jugCapacity.a-initialState.a));
			if(getAllStates(newState,finalState)){
				ans.push(initialState);
				return true;
			}
		}
		if((initialState.b+initialState.c)<jugCapacity.b){
			var newState = new jugState(initialState.a,initialState.b+initialState.c,0);
			if(getAllStates(newState,finalState)){
				ans.push(initialState);
				return true;
			}
		}else{
			var newState = new jugState(initialState.a,jugCapacity.b,initialState.a-(jugCapacity.b-initialState.b));
			if(getAllStates(newState,finalState)){
				ans.push(initialState);
				return true;
			}
		}
	}
	return false;
 }
 

//Get answer and print it
try{
	if(getAllStates(initialState,finalState)){
		ans.reverse();
		ans.forEach((answer)=>{
			 console.log(answer.a+" "+answer.b+" "+answer.c);
        });        
	}else{
		console.log("With the given initial state and capacity, desired final state cant be reached");
	}
}catch(err){
	console.log("With the given initial state and capacity, desired final state cant be reached");
}



// Test cases for possible combinations:
// three jugs:
// 1)  initial state : 8 0 0 
//     capacity: 8 5 3
//     final state: 4 4 0
// 2) initial state: 8 0 0
//    capacity: 8 5 3 
//    final state: 1 4 3

// Test cases for combinations which cant be reached:

// 1) initial state: 8 0 0
//    capacity: 8 5 3 
//    final state: 2 4 2
// 2) initial state: 8 0 0
//    capacity: 8 5 3
//    final state: 3 3 2