# Introduction


Welcome to the Project Loom hands-on lab! 

## About this Workshop

This hands-on workshop introduces you to Project Loom and the benefits it brings to the Java platform. It focuses on two key Loom technologies: Virtual threads ([https://openjdk.org/jeps/436](https://openjdk.org/jeps/436)) and Structured Concurrency ([https://openjdk.org/jeps/437](https://openjdk.org/jeps/437)). These features are second preview and incubator features of the recent JDK 20 release. This means that both Virtual threads and Structured Concurrency are available for testing and evaluation but are still subject to change before the become final and permanent features. 

### Objectives

In this hands-on workshop, you will 

* become familiar with Virtual Threads
	* How to create and launch Virtual Threads.
	* Understand the benefits Virtual Threads are bringing to concurrent programming, etc.
* become familiar with Structured Concurrency
	* Understand how to organize asynchronous tasks using the Structured Concurrency API, and more precisely the `StructuredTaskScope` class. 
	* How to launch tasks using instances of the `StructuredTaskScope` class, and get the results from them.
	* How to handle time-outs.
	* How to implement your own business logic, etc.

## Learn More

* [Java 19 Virtual Threads - JEP Café #11](https://www.youtube.com/watch?v=lKSSBvRDmTg)
* [Launching 10 millions virtual threads with Loom - JEP Café #12](https://www.youtube.com/watch?v=UVoGE0GZZPI)
* [Java Asynchronous Programming Full Tutorial with Loom and Structured Concurrency - JEP Café #13](https://www.youtube.com/watch?v=2nOj8MKHvmw)
* [Java 20 - From ThreadLocal to ScopedValue with Loom Full Tutorial](https://www.youtube.com/watch?v=fjvGzBFmyhM)

## Acknowledgements
* **Author** - [José Paumard, Java Developer Advocate, Java Platform Group - Oracle](https://twitter.com/JosePaumard)
* **Contributors** -  Billy Korando, Java Developer Advocate Java Platform Group; Ana-Maria Mihalceanu, Java Developer Advocate Java Platform Group
* **Last Updated By/Date** - Ana-Maria Mihalceanu, March 3 2023