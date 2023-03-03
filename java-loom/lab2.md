# Exploring Structured Concurrency

## Introduction

The Structured concurrency API simplifies multithreaded programming by giving developers a powerful means to coordinate and manage cooperating groups of virtual threads. It treats multiple tasks running in different threads as a single unit of work, thereby streamlining error handling and cancellation, improving reliability, and enhancing observability. This is an incubating API in JDK 20.


### Objectives

This lab introduces you to Structured Concurrency, its programming model, and its API.

Estimated Time: 35 minutes

In this lab, you will:
* Create an asynchronous system using the Structured Concurrency API
* Launch and stop scopes
* Use and extend the StructuredTaskScope object
* Handle tasks in this object

### Prerequisites

You can clone the repository with the following command:

```text
<copy>git clone https://github.com/JosePaumard/2022_javaone-loom-livelab.git</copy>
```

All the files in this part are located under the `src` folder, in the `loom.structuredconcurrency` package. You can now move to the `src` directory, which contains the code you need to edit to complete the lab.

In case you are stuck at some point, you can check the content of the `solutions` directory with solutions to the questions in this lab.

Structured Concurrency is an incubator module (2nd incubation) in JDK 20. You will need to add this module at compile and run time explicitly. The below commands demonstrate how this is done:

```text
<copy>javac --enable-preview --release 20 --add-modules jdk.incubator.concurrent loom/virtualthreads/A_VersionCheck.java</copy>
```
Compiling this class will give you the following warning, which is expected: 

```text
warning: using incubating module(s): jdk.incubator.concurrent
1 warning
```

You can run this `A_VersionCheck` class with the following command:

```text
<copy>java --enable-preview --add-modules jdk.incubator.concurrent loom/virtualthreads/A_VersionCheck</copy>
```

It will print the following message on the console: 

```text
WARNING: Using incubator modules: jdk.incubator.concurrent
JDK version = 20
JDK vendor  = Oracle Corporation
```

You can learn more about preview features [here](https://dev.java/learn/using-the-preview-features-available-in-the-jdk/).


#### Getting the Solutions

If you get stuck at some point, you can still check the solutions of the exercises in the `solutions` folder. You can even declare this folder as a source folder in your IDE to load these classes, check them, and execute them. 

The solutions should be seen as "possible solutions". There may be other ways to solve these exercises. 

## Task 1: Version Check

Open *`A_VersionCheck`*.

This first class is just there to ensure that you run the correct Java version. Also, make sure that you have enabled preview features. You need to run this class.

## Task 2: First Scope

Open *`B_FirstScope`*. 

Let us first explore the `StructuredTaskScope` class. This class is your main entry point for structured concurrency with Loom. Go ahead and visit the `Weather` record, and follow the instructions to implement the `readWeather()` method.

1. First, create an instance of the `StructuredTaskScope` class. This class implements `AutoCloseable`, so you should create it in a
_try-with-resources_ pattern. Because this scope will produce a `Weather` object, you should create an instance of `StructuredTaskScope<Weather>`. There is no trick here: this class has an empty constructor that you can call.

2. Second, create and submit a task to this scope. This task is an instance of `Callable<Weather>`, because your scope is parameterized by `Weather`. You can create this `Callable` by simply calling `readWeatherFromA()`. It will produce a (not so) random `Weather` instance after a little (random) delay. Submitting a task to a scope is done by calling its `fork()` method. It gives you a future object that you can put in a variable.

3. Third, once you have submitted tasks to your scope, you should call its `join()` method. This call is blocking: `join()` will return when all your tasks have been completed. Not calling `join()` will make your code fail with an exception when you call `get()` on your future objects. You can experiment with that in this lab. 

4. Fourth and last point: you can get the result of your future by calling its classical `get()` method, or even better, its new `resultNow()` method. This last method should be called only if you know that your future is complete, which is the case after you called `scope.join()`.

Once you complete this, you can run this `B_FirstScope` class. Do not forget to add the following options to run this main method: `--enable-preview --add-modules jdk.incubator.concurrent`. 

Every time you submit a callable to a structured task scope, it creates a virtual thread and uses it to execute this callable. Because it is cheap to create and block virtual threads, there is no need to pool them. Even if a structured task scope looks like an executor service, it works differently. An executor service pools platform threads; a structured task scope creates them on demand and lets them die when they are not needed.

You can compile this class with the following command: 

```text
<copy>javac --enable-preview --release 20 --add-modules jdk.incubator.concurrent loom/structuredconcurrency/B_FirstScope.java</copy>
```

And run it with the following command: 

```text
<copy>java --enable-preview --add-modules jdk.incubator.concurrent loom/structuredconcurrency/B_FirstScope</copy>
```

## Task 3: Shutdown on Success Scope

Open *`C_ShutdownOnSuccess`*.

At this point, you should have a working `Weather.readWeather()` method that queries one (fake) weather forecast server. 

You want to query more than one server, and because all results are equivalent (weather forecast should always be the same), you would like to get the first result and interrupt the other requests. Fortunately, there is a special scope to do that: the `StructuredTaskScope.ShutdownOnSuccess`. 

1. Modify the code you wrote in the previous section, and create an instance of this scope instead of the previous `StructuredTaskScope`. In this case, the `ShutdownOnSuccess` class takes a parameter, `Weather`.
2. Submit more than one query by calling `fork()` on your scope object and putting the returned future in a variable. You have more methods for that: `readWeatherFromB()`, `readWeatherFromC()`, `readWeatherFromD()`, etc... They have been written so that they will provide a `Weather` instance with a random delay.
3. Do not forget to call `scope.join()`; this is still mandatory.
4. Then you can call `scope.result()`, which returns the first `Weather` instance it gets. Moreover, all the other callables you have submitted have been canceled, and the corresponding virtual threads have been interrupted. You can check that by printing the state of all the futures on the console. To do that, the `Future` interface has a new method: `state()`. Note that it may happen that a future was not canceled because the scope did not have the time to interrupt the corresponding thread. 
5. Once you observe how these futures have been canceled, you can remove them from your code; you will no longer need them. 


You can compile this class with the following command:

```text
<copy>javac --enable-preview --release 20 --add-modules jdk.incubator.concurrent loom/structuredconcurrency/C_ShutdownOnSuccessScope.java</copy>
```

And run it with the following command:

```text
<copy>java --enable-preview --add-modules jdk.incubator.concurrent loom/structuredconcurrency/C_ShutdownOnSuccessScope</copy>
```


## Task 4: Extending Scope

Open *`D_ExtendingScope`*.

Extending a scope can be done to implement your own behavior. In this exercise, you will be querying several quotation servers, each giving you its price for a given journey. What you want is the lowest price. So you need to wait for all the answers from these servers and get the best quotation. 

1. Add some code in the `Quotation` record. This code should query some (fake) quotation servers using the same pattern you used to query the weather servers and a regular `StructuredTaskScope<Quotation>`.  Store each future in a variable. 
2. After your call `scope.join()`, add some code to get the best quotation, the one with the least price. You can use a Stream pattern to find this quotation or a for  loop. The code you have written is working and is getting the best quote. 

Let's extend the `StructuredTaskScope` class to implement this business logic (the computation of the best quotation from all the available quotations) with this class. 

3. Create a `QuotationScope` class that extends `StructuredTaskScope<Weather>`, and modify your `readQuotation()` method so that it forks its task using this scope rather than the plain `StructuredTaskScope<Weather>`. You can create it as a local class of the `Quotation` record.
4. Every time a task completes, Loom calls a callback method, `handleComplete()`, with the corresponding completed future. You can now override this method. The behavior of this method depends on the state of the future it processes. The state may have four values; you can create a switch to handle them.
- `RUNNING`: this case should never happen. The future passed to this method should not be in that state. 
- `SUCCESS`: you can save the quotation in a collection for future use. Let us call it `quotations` for future reference. 
- `FAILED`: something went wrong, no quotation could be got, and an exception has been thrown. You can save it in a collection for future use. Let us call it `exceptions`.
- `CANCELLED`: the task has been canceled or interrupted. In that case, no result and no exception has been produced. 

Be careful that the `handleComplete()` method is called in the virtual thread that executed your task. This method should be thread-safe, as well as the collections receiving the quotations and the exceptions. 

Once all the tasks you submitted are complete, your call to `join()` returns. At this point, the two collections you created: one for the quotations and the other for the exceptions, contain the results of your queries. You can now analyze them. 

5. Create a `bestQuotation()` method that analyzes the quotations you put in your collection and returns the one with the least price. 
6. Create an `exceptions()` method that takes all the exceptions you put in the other collection and add them as suppressed exceptions to a single exception. For instance, you can create a special class to do that, `QuotationException`.
7. You may wonder what would happen if your `quotations` collection is empty. In that case, you may have exceptions in your `exceptions` collection. So maybe you can design your `bestQuotation()` method to ensure it would fail with the right exception. 

Just some quick notes about the class you just wrote. First, it encapsulates your business logic. How do you need to aggregate your business data (in this example, the quotations)? The aggregation logic is written in the `bestQuotation()` method, so it's easy to review. Second, it processes one future at a time, so reviewing the code is simple: it's all in one place. 

Writing unit tests for this class is also easy. Because all your code is synchronous, you can easily create completed futures to call your `handleComplete()` method and check that it is doing the right thing. And the same goes for the `bestQuotation()` method. It is also a synchronous method that is very easy to unit test. 

You can compile this class with the following command:

```text
<copy>javac --enable-preview --release 20 --add-modules jdk.incubator.concurrent loom/structuredconcurrency/D_ExtendingScope.java</copy>
```

And run it with the following command:

```text
<copy>java --enable-preview --add-modules jdk.incubator.concurrent loom/structuredconcurrency/D_ExtendingScope</copy>
```

## Task 5: Building Travel Page

Open *`E_BuildingTravelPage`*.

Now that you have a quotation and weather service, what about building a travel page? The `TravelPage` record is there for that: it has a `quotation` component and a `weather` component. 

Before building your travel page, let us think about these two components. 
- The quotation component is critical: if you do not have a quotation, you cannot sell anything to your customer.
- The weather component, on the other hand, is nice to have, but if you do not have it, you can still sell something. Moreover, because of that, you do not want the weather to take too long to get and see your customer go away. 

1. The first thing you need to implement is a timeout on the weather. If something goes wrong, and you get an exception or getting the weather takes too long, you want to give a default value instead of making your whole process fail. The `StructuredTaskScope` class has just the right method for that: `joinUntil()`. If you want to set up a 100ms timeout, then you can pass `Instant.now().plusMillis(100)` to this `joinUntil()` method call. You will then have to handle a `TimeoutException` that you can use to return your default value for the weather.
2. Now you can create a `readTravelPage()` factory method in the `TravelPage` record, following what you did for `Weather` and `Quotation`. This method can create a scope and submit two callables to it: one to read the weather and the other to read the quotation. You can create your own `TravelPageScope` by extending `StructuredTaskScope`. To do that, you need to find a type parameter for this scope that is a super type to all the objects this scope has to handle: `Weather` and `Quotation`. So far, this type is `Object`. What about you create an interface, `PageComponent`, and make `Weather` and `Quotation` implement it? Then `TravelPageScope` can extend `StructuredTaskScope<PageComponent>`. 
3. You can handle the weather and the quotation with futures in the `readTravelPage()` method. This will work but will make it hard to unit test. If you decide to override the `handleComplete()` method, your business logic is written in its method that you can easily test. 
4. Here are some hints to override `handleComplete()`.

   1. You get a `Future<PageCompoment>` that can carry a value or an exception. So there are two things you need to do: check the state of this future and the type of value it carries. Checking the state first is your best choice. 
   2. You can follow what you did for the `QuotationScope` class and handle the `RUNNING` and `CANCELLED` cases in the same way.
   3. Handling the `SUCCESS` case is interesting. You need to check if the produced value is a `Weather` or a `Quotation`. You can do that with a switch on types, another preview feature of the JDK 20. Because you are working with Loom, preview features are already enabled, so you can use the switch on type without further configuration. You can even go one step further and seal the `PageComponent` interface, only permitting `Weather` and `Quotation` to implement. Your switch is now exhaustive without having to add a default case. You can now save the produced quotation and weather as instance fields of this scope. Make sure that they are volatile because they need to be visible. 
   4. Handling the `FAILURE` case can be done similarly. You may need to check if the exception is an instance of `Quotation.QuotationException`, handle it specifically, and catch all the other exceptions. 


You can compile this class with the following command:

```text
<copy>javac --enable-preview --release 20 --add-modules jdk.incubator.concurrent loom/structuredconcurrency/E_BuildingTravelPage.java</copy>
```

And run it with the following command:

```text
<copy>java --enable-preview --add-modules jdk.incubator.concurrent loom/structuredconcurrency/E_BuildingTravelPage</copy>
```


## Wrapping up

In this lab you have learned:
* how structured concurrency is working, based on the use of the `StructuredTaskScope` class
* the patterns to use these scope objects: how to send tasks to them, and how to join them
* how you can nest scopes
* how you can extend this class, overriding the `handleComplete()` method, to precisely implement the business needs you have.

You should be able to very easily write unit tests for all the steps of your asynchronous processing because all these steps are written in one method.

## Learn More


* [Structured Concurrency - JEP 428](https://openjdk.org/jeps/428)

## Acknowledgements
* **Author** - [José Paumard, Java Developer Advocate, Java Platform Group - Oracle](https://twitter.com/JosePaumard)
* **Contributors** -  Billy Korando, Java Developer Advocate Java Platform Group; Ana-Maria Mihalceanu, Java Developer Advocate Java Platform Group
* **Last Updated By/Date** - Ana-Maria Mihalceanu, March 3 2023