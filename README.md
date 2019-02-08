![101Script](https://github.com/brettderham/101Script/blob/master/resources/101script-logo.jpg "101Script")

# 101Script

A programming language for beginners.

Repo for Riley Persily, Thomas Ochsner, Simon Wroblewski, Kea Braekman, and Brett Derham

## Introduction

101Script is a simple, easy-to-read programming language intended to be used by those new to programming.  There are multiple ways to write certain operations to ease beginners into this language and others similar to it.  Thanks to 101Script's omission of extra symbols in its syntax, along with the fact that it is weakly and dynamically typed, users will be able to run code without the need to pore over tedious details of the code.

## Features

* `.IOI` file extension
* Weakly & Dynamically Typed
* Multiple names/ways to use basic operations
* Type inference
* String Interpolation
* Simple loops (`for` and `while`)
* Semi-colon not required after every line

## Examples


### Variable Declarations
```
name = "Thomas"                 let name = "Thomas"
age = 21                        let age = 21
sexy = true                     let sexy = true
```

### Arithmetic
```
x = (10*(3^2))/2                let x = (10*((3 ** 2))/2
y = 5 + 3 - 2                   let y = 5 + 3 - 2
```

### If Statements 
```
if(x > 5):                      if(x > 5) {
	print(x);						console.log(x)
else if(x < 3):                 } else if(x < 3) {
	print(y);						console.log(y)
else:                           } else {
	print(z);						console.log(z);
                                            }
```

### Basic Loop Statements
```
x = 0                       let x = 0
loop(5):                    while(x < 5) {
    x++                         x++
    print(x);                   console.log(x)
                            }
```

### While Statements
```
y = 0                       let y = 0
loopWhile(y < 8):           while(y < 8) {
    f(y);                       f(y)
                            }
```

### Functions 
```
function multiplyByThree(x):        function multiplyByThree(x) {
    return x * 3;                       return x*3
                                    }
```

### Comments
```
-- single line					// single line
-* multiple						/* multiple
   lines *-						   lines */
```

### Objects
```
Shape =:                        let shape = {
    name = "circle",            name: "circle",
    radius = 3;                 radius: 3
                                }
    print(Shape.name)				console.log(Shape.name)

```

**piEstimate 101Script:**  
![101pi](https://github.com/brettderham/101Script/blob/master/resources/pie101.png "101pi")  
**piEstimate JS:**  
![jspi](https://github.com/brettderham/101Script/blob/master/resources/pieJS.png "jspi")  

### Alternative Operations

There are two ways to write most operations: The typical symbol and a simplified string representation of the operation.  (Shown below)

```
addedTo         +=

multipliedBy    *=

subtractedFrom  -=

dividedFrom     /=

equals          ==

notEquals       !=

gets            =

lessThan        <

greaterThan     >

lessOrEq        <=

greaterOrEq     >=
```

#### Method A

![MethodA](https://github.com/brettderham/101Script/blob/master/resources/changeMaker101a.png "Method A")

#### Method B

![MethodB](https://github.com/brettderham/101Script/blob/master/resources/changeMaker101b.png "Method B")
