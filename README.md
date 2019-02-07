![101Script](https://github.com/brettderham/101Script/blob/master/resources/101script-logo.jpg "101Script")
# 101Script
A programming language for beginners

Repo for Riley Persily, Thomas Ochsner, Simon Wroblewski, Kea Braekman, and Brett Derham

## Introduction
101Script is a simple, easy-to-read programming language intended to be used by those new to programming.  There are multiple ways to write certain operations to ease beginners into this language and others similar to it.  Thanks to 101Script's omission of extra symbols in its syntax, along with the fact that it is weakly and dynamically typed, users will be able to run code without the need to pore over tedious details of the code.
## Features
* `.IOI` file extension
* Weakly & Dynamically Typed
* Multiple names/ways to use basic operations

## Examples


```
name = "Thomas"                 let name = "Thomas"
age = 21                        let age = 21
sexy = true                     let sexy = true
```

```
x = 10 * (3^2) /2				let x = (10*((3 ** 2))/2
y = 5 + 3 - 2					let y = 5 + 3 - 2
```

```
if(x > 5):						if(x > 5) {
	print(x);						console.log(x)
else if(x < 3):					}else if(x < 3) {
	print(y);						console.log(y)
else:							}else {
	print(z);						console.log(z);
```

```
x = 0                       
loop(5):                    for(x = 0; x < 5; x++) {
    x++                        console.log(x)
    print(x);                  
                            }
```

```
y = 0                       let y = 0
loopWhile(y < 8):            while(y < 8) {
    f(y);                       f(y)
                            }
```

```
function multiplyByThree(x):		function multiplyByThree(x) {
	return x * 3;						return x*3
									}
```

```
Shape =:						let shape = {
	name = "circle",		    name: "circle",
	radius = 3;					radius: 3
								}
print(Shape.name)				console.print(Shape.name)
								
```

```
addedTo         +=

multipliedBy    *=

subtractedFrom  -=
```

### Alternative Operations
There are two ways to write most operations: The typical symbol and a simplified string representation of the operation.  (Shown below)
#### Method A
![MethodA](https://github.com/brettderham/101Script/blob/master/resources/changeMaker101a.png "Method A")
#### Method B
![MethodB](https://github.com/brettderham/101Script/blob/master/resources/changeMaker101b.png "Method B")
