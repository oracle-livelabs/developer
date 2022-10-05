# Introduction to the Foreign Function & Memory API

## Introduction


This lab introduces you to the Foreign Function & Memory API, a Preview Feature of Java 19.

Estimated Time: ~10 minutes



### **About Panama's Foreign Function & Memory API**

The Foreign Function & Memory (FFM) API, defined in JEP 424, introduces an API by which Java programs can interoperate with code and data outside of the Java runtime. The FFM API enables (1) to efficiently invoke **foreign functions** (i.e., code outside the JVM) and (2) to safely access **foreign memory** (i.e., memory not managed by the JVM). In practice, the FFM API defines classes and interfaces so that client code can

   * Allocate foreign memory (`MemorySegment`, `MemoryAddress`, and `SegmentAllocator`),
   * manipulate and access structured foreign memory (`MemoryLayout`),
   * control the allocation and deallocation of foreign memory (`MemorySession`), and
   * call foreign functions (`Linker`, `FunctionDescriptor`, and `SymbolLookup`).


### **Objectives**


In this lab, you will:
* Get a high-level overview of the FFM API and some of its key concepts.
* Get an introduction on lesser-known Java-related concepts (ex. Preview Feature, Incubator Modules, etc.) used in this workshop.

Note that this part of the workshop is theoretical as it introduces and explains some key concepts required to better understand the hands-on exercises.

## Task 1: Foreign Function & Memory API - Overview and Key Concepts

   At a high level, the steps required to invoke, from Java code, a foreign function are
   
   1. Find the target *foreign function* (in a C library)
   
   To find the target foreign function, the FFM API uses a *Linker*. A Linker is a bridge between two binary interfaces: the Java Virtual Machine and an Application Binary Interface (ABI), ex. the C ABI.
   
   2. Allocate *foreign memory*
   
   The Java client code needs to allocate, using the FFM API, the foreign memory, i.e. off-heap memory, required for proper operation of the native function.
   
   3. Obtain a method handle of the target foreign function, and invoke it

   To perform a downcall (Java code calling native code), the FFM API needs to know which native function to invoke. This is achieved with a *FunctionDescriptor* which describes the signature of the C function to invoke, i.e. its parameter types and its return type. To model those C types from Java, the FFM API uses various *MemoryLayout* objects.

   The native function will be invoked via a corresponding [Method Handle](https://docs.oracle.com/en/java/javase/19/docs/api/java.base/java/lang/invoke/MethodHandle.html). This Method Handle is created based on the corresponding FunctionDescriptor.
   

💡 The section above describes, at a high-level, how a *downcall* (Java code calling native code) is performed but the Linker interoperates in both-direction and also enables *upcall* (native code calling Java code). Upcalls will be discussed in a later section.


## Task 2: Preview Feature

Let's now discuss *preview feature* as you will be using the FFM API, a preview feature of Java 19. 

Java language features and Java SE API features have a lot of exposure, and any mistake in their design can have negative consequences. To avoid such a risk, JEP 12 offers the ability to preview new Java language and Java SE API features.

A *preview feature* is a feature that is believed to be **fully specified** and **implemented** but may still change before it is included in the Java platform on a final and permanent basis, i.e., it is **non-final**. The received feedback will be evaluated and used to make eventual adjustments before that feature becomes permanent.

Important **safeguards prevent developers from using non-final features accidentally**. This is necessary because a non-final feature may well be different when it becomes final and permanent in a later Java feature release. Moreover, only final, permanent features are subject to Java's stringent backward-compatibility rules. Therefore, to avoid unintentional use, preview features are **disabled by default**, and the JDK documentation unequivocally warns you about the non-final nature of these features and any of their associated APIs.

Preview features are also specific to a given Java SE feature release and require the use of special flags at **compile time** as well as at **runtime**.


```java
// compile time
javac --enable-preview --release 19 MyClass.java
```

```java
// runtime
java --enable-preview MyClass
```
This workshop requires those flags to be set as the FFM API is a preview feature of Java 19. If you don't, you will get an error informing you that you are trying to use preview features and that you need to explicitly enable those.

```text
> javac MyClass.java
MyClass.java:42: error: java.lang.foreign.Linker is a preview API and is disabled by default.
    Linker linker = Linker.nativeLinker();
    ^
…
(use --enable-preview to enable preview APIs)
1 error
```

You will always get a message informing you, at both compile time and at runtime, that preview features are being used. This informative note is not a warning and can be ignored.


```text 
> javac --enable-preview --release 19 …
Note: Simple.java uses preview features of Java SE 19.
Note: Recompile with -Xlint:preview for details.
…

> java --enable-preview …
Note: Simple.java uses preview features of Java SE 19.
…
```
## Task 3: Incubator Modules

JEP 11 introduces the notion of incubation to enable the inclusion of JDK APIs and JDK tools that might one day, after improvements and stabilizations, be included and supported in the Java SE platform or in the JDK. The Vector API is one of the incubating APIs (4th round of incubation) in Java 19.

Similar to Preview Features, incubator modules are also shielded from accidental use because incubating can be done only in the `jdk.incubator` namespace. Therefore, an application on the classpath must use the `--add-modules` command-line option to explicitly request resolution for an incubating feature. Alternatively, a modular application must specify requires or requires transitive dependencies upon an incubating feature directly.

It should be mentioned that when an incubating API moves from incubation to being included in the Java platform, its namespace changes. For example, when the FFM API was incubating (Java 17 & 18), it was residing in the `jdk.incubator.foreign` package of the `jdk.incubator.foreign` module. Starting with Java 19, the FFM API left incubation and now resides in the `java.lang.foreign` package of the `java.base` module.


## Task 4: Launch Single-File Source-Code Programs

Since Java 11 and JEP 330 (Launch Single-File Source-Code Programs), it is possible to compile and run a class in one single command. 

The example below invokes the Java launcher (`java`), not the Java compiler (`java`), on a Java class. This instructs the Java launcher to compile the class before executing it. This is also possible with a class that is using a preview feature.


```java
// compile *and* run MyClass.java
java --enable-preview --source 19 MyClass.java
```

Using the traditional approach, i.e. `javac` and `java`, or the other, i.e. just `java` is just a matter of preferences. In the end, the same underlying operations are always performed.

## Task 5: Enable Native Access

The FFM API has been designed with safety in mind, part of it, however, is inherently unsafe. This is fundamentally due to the fact that Java code might invoke an unsafe native method, and obviously, the Java Virtual Machine has no control over what happens on the foreign side. For that reason, the JVM will issue a warning at run time when a native call is performed.

```text
...
WARNING: A restricted method in java.lang.foreign.Linker has been called
WARNING: java.lang.foreign.Linker::nativeLinker has been called by the unnamed module
WARNING: Use --enable-native-access=ALL-UNNAMED to avoid a warning for this module
...
```

Such a warning can be disabled with the `--enable-native-access=M` flag on the java command line. This flag disables warning when some native code is invoked from the specified module(s). In addition, when that flag is set, an `IllegalCallerException` will be thrown when any unspecified module(s) is trying to perform a native invocation. 


## Learn More


* Panama section on [Inside Java](https://inside.java/tag/panama)
* [Core Libraries - Foreign Function and Memory API](https://docs.oracle.com/en/java/javase/19/core/foreign-function-and-memory-api.html#GUID-FBE990DA-C356-46E8-9109-C75567849BA8)
* [Video: Project Panama: Say Goodbye to JNI](https://inside.java/2022/04/04/projectpanama/)
* [JEP 424: Foreign Function & Memory API (Preview)](https://openjdk.org/jeps/424)
* [Using the Preview Features Available in the JDK](https://dev.java/learn/using-the-preview-features-available-in-the-jdk/)
* [JEP 330: Launch Single-File Source-Code Programs](https://openjdk.org/jeps/330)
* [JEP 12: Preview Features](https://openjdk.org/jeps/12)
* [JEP 11: Incubator Modules](https://openjdk.org/jeps/12)

## Acknowledgements
* **Author** - [Denis Makogon, DevRel, Java Platform Group - Oracle](https://twitter.com/denis_makogon)
* **Contributor** -  [David Delabassée, DevRel, Java Platform Group - Oracle](https://twitter.com/delabassee)
* **Last Updated By/Date** - David Delabassée, Sept. 29 2022
