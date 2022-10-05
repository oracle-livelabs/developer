# Exploring Virtual Threads

## Introduction


This lab guides you through Virtual Threads and related API.

Estimated Time: 25 minutes


### Objectives

In this lab, you will:
* Create virtual threads
* See how virtual threads use platform thread to run
* See how virtual threads free the platform thread they use when they are blocking

### Prerequisites

You can clone the repository with the following command: 

```text
<copy>git clone https://github.com/JosePaumard/2022_javaone-loom-livelab.git</copy>
```

All the files in this part are located under the `src` folder, in the `loom.virtualthreads` package. You can now move to the `src` directory, which contains the code you need to edit to complete the lab.

In case you are stuck at some point, you can check the content of the `solutions` directory with solutions to the questions in this lab. 

Virtual Threads are a preview feature of the JDK 19. You will need to enable preview features at compile and runtime explicitly. The below command demonstrates how to compile with preview features: 

```text
<copy>javac --enable-preview --release 19 Main.java </copy>
```

Running code with preview features would look like this:

```text
<copy>java --enable-preview Main</copy>
```

You can learn more about preview features here: [https://dev.java/learn/using-the-preview-features-available-in-the-jdk/](https://dev.java/learn/using-the-preview-features-available-in-the-jdk/).

## Task 1: Introducing Virtual Threads

A virtual thread is a thread, and most of what you already know about threads applies to virtual threads. A virtual thread is built on a task, that can be an instance of `Runnable`, or `Callable`. It can be started and interrupted, just as regular threads. 

A virtual thread uses a regular platform thread to run. This platform thread is called the carrier thread of this virtual thread. A virtual thread has a unique feature: it can be mounted or dismounted from a platform thread. This mechanism is used everytime a virtual threads blocks. Whether it is waiting for data coming from some I/O source, blocking on a lock or synchronized block, or sleeping, a virtual thread is dismounted from its carrier thread. Its stack is copied to the heap memory, and its previous carrier thread becomes free to mount another virtual thread. With this system, platform threads never block. 

Because the price of blocking a virtual thread is much cheaper than bocking a platform thread, writing blocking code is OK with virtual threads. 

## Task 2: Version Check

Open *`A_VersionCheck`*.

This first class is just there to ensure that you are running the correct version of Java. Also, make sure that you have enabled preview features. From the `src`, you need to run the following: 

```text
<copy>java loom/virtualthreads/A_VersionCheck.java</copy>
```

It should display the following: 

```text
JDK version = 19
JDK vendor  = Oracle Corporation
```


## Task 3: Starting Threads

Open *`B_StartingThreads`*.

You can just run this class with the following command and see what it prints. 

```text
<copy>java loom/virtualthreads/B_StartingThreads.java</copy>
```

The main thread is a platform thread. What is the number of this thread?


## Task 4: Starting Virtual Threads

Open *`C_StartingThreads`*.

Let us now see how to create and launch virtual threads.

First, Loom brings a new pattern to start platform threads. Platform threads and virtual threads are running tasks, instances of `Runnable`.

So let us create a first task that prints the current thread. The current thread is the thread that is running this task.

Loom also brings new patterns to create and launch platform threads. You need to call `join()` to ensure that this thread has enough time to run. Check the code of this class to see this pattern.

Then try to find a similar pattern to start a virtual thread. Create a new virtual thread with the name "virtual", identical to the previous platform thread, and start it.

Do not forget to call `join()` on this virtual thread. 

To run this class, you need to compile it first, with the following command: 

```text
<copy>javac --enable-preview --release 19 loom/virtualthreads/C_StartingVirtualThreads.java</copy>
```

If your code is correct, it will compile it and give you the following notes: 

```text
Note: loom\virtualthreads\C_StartingVirtualThreads.java uses preview features of Java SE 19.
Note: Recompile with -Xlint:preview for details.
```

You can then run this class with the following command: 

```text
<copy>java --enable-preview loom/virtualthreads/C_StartingVirtualThreads</copy>
```

How can you tell the thread you created is a virtual thread?

What is platform thread used to run this virtual thread?

You can also explore these two patterns and see how you can customize the threads you are launching.

## Task 5: Yielding Virtual Threads

Open *`D_YieldingVirtualThreads`*.

Let us now create a bunch of virtual threads and see how they can jump from one platform thread to another. This is a feature that is unique to Loom virtual threads.

You need to create an unstarted virtual thread in the code that does the following:

* If the index is 0, then print the current thread,
* then go to sleep for a few milliseconds; 20 is enough.
* If the index is 0, then print the current thread again,
* then go to sleep again,
* If the index is 0, print the current thread one last time.

You can compile your code using the following command:
```text
<copy>javac --enable-preview --release 19 loom/virtualthreads/D_YieldingVirtualThreads.java</copy>
```

Then you can run it with the following command: 

```text
<copy>java --enable-preview loom/virtualthreads/D_YieldingVirtualThreads</copy>
```

What platform thread is running your virtual thread?

Can you see your virtual thread jumping from one platform thread to the other?

Does blocking a virtual thread block a platform thread?

Try to increase or decrease the number of virtual threads you are creating. Do you still see this behavior? What is the maximum number of virtual threads can you run? 

Because blocking a Loom virtual thread is so cheap, trying to pool them becomes useless. 

## Task 6: How Many Platform Threads

Open *`E_HowManyPlatformThreads`*.

Let us discover how many platform threads you need to run your virtual threads.

There are two concurrent sets created in this class, one to store the name of the pooled platform threads used by default and the other to store the name of the platform threads.

You can paste the code from the previous exercise here. Then, you can call the two methods `readThreadPoolName()` and `readPlatformThreadName()` and add the pool name and the platform thread name in the corresponding sets.

You can compile this code using the following command:
```text
<copy>javac --enable-preview --release 19 loom/virtualthreads/E_HowManyPlatformThreads.java</copy>
```

Then you can run it with the following command:

```text
<copy>java --enable-preview loom/virtualthreads/E_HowManyPlatformThreads</copy>
```

How many pools is Loom using?

How many platform threads have been used for your virtual threads?

You can try to increase the number of virtual threads to see if this number varies. You can also try to run this code on a machine with a different number of cores to see how this number changes.

## Wrapping Up

In this lab you have learned:
* the new virtual threads, introduced by Loom
* the new patterns brought by Loom to create platform threads and virtual threads
* how virtual threads are executed by carrier threads
* how can Loom can remove a virtual thread that is blocking from its carrier thread
* the small number of carrier threads needed to run hundreds of thousands of virtual threads

## Learn More

* [Virtual Threads - JEP 425](https://openjdk.org/jeps/425)

## Acknowledgements
* **Author** - [José Paumard, Java Developer Advocate, Java Platform Group - Oracle](https://twitter.com/JosePaumard)
* **Contributors** -  Billy Korando, Java Developer Advocate, Java Platform Group
* **Last Updated By/Date** - José Paumard, October 2022
