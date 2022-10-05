# LAB 3: A simple Downcall

## Introduction

In this lab, you will start to put in practices what you have learned so far.

Estimated Time: ~10 minutes


### **Objectives**

The previous section explained, in a simplified way, how the FFM API works with downcalls (Java code invoking C native code).
In this lab, you will write your first downcall.


## Task: A Simple Downcall

You will develop a simple Java application that will invoke the native C `atoi` function to convert a `string` to an `int`. 

The [`atoi`](https://cplusplus.com/reference/cstdlib/atoi/) function is part of the [C standard library](https://en.wikipedia.org/wiki/C_standard_library) and has the following signature: `int atoi ( const char * str );`
It parses the C-string `str` interpreting its content as an integral number, which is returned as a value of type `int`, it returns zero if no conversion is performed.

As mentioned earlier, the steps to perform a downcall are:
   
* Find the target foreign function in its C library using a linker
* Allocate the required foreign memory for the function
* Create a FunctionDecriptor that match the native function signature
* Create a Method Handle using the FunctionDescriptor and invoke the native function


1. Create the class

Using Cloud Editor, create a Java class named "Simple.java" with the following skeleton.


```java
<copy>
public class Simple {

    public static void main(String[] args) throws Throwable {
        String payload = "21";
    }

}
</copy>
```

2. Find the target foreign function

Specify the function name.

```java
<copy>
var functionName = "atoi";
</copy>
```
A [linker](https://docs.oracle.com/en/java/javase/19/docs/api/java.base/java/lang/foreign/Linker.html) is a key element that will enable access to foreign functions from Java code. Instantiate the linker with a [symbol lookup](https://docs.oracle.com/en/java/javase/19/docs/api/java.base/java/lang/foreign/SymbolLookup.html). This is required to find the target function. 


```java
<copy>
Linker linker = Linker.nativeLinker();
SymbolLookup linkerLookup = linker.defaultLookup();</copy>
```

2. Allocate the required foreign memory

Perform the lookup with the target function name, this will return a [memory segment](https://docs.oracle.com/en/java/javase/19/docs/api/java.base/java/lang/foreign/MemorySegment.html).

```
MemorySegment memSegment = linkerLookup.lookup(functionName).get();
```

3. Create a FunctionDecriptor

You should now create a [FunctionDescriptor](https://docs.oracle.com/en/java/javase/19/docs/api/java.base/java/lang/foreign/FunctionDescriptor.html) that matches the `int atoi ( const char * str )` signature.

```java
<copy>FunctionDescriptor funcDescriptor = FunctionDescriptor.of(JAVA_INT, ADDRESS);</copy>
```

4. Create a Method Handle

Using the FunctionDescriptor, you can now create the corresponding [Method Handle](https://docs.oracle.com/en/java/javase/19/docs/api/java.base/java/lang/invoke/MethodHandle.html).

```java
<copy>MethodHandle funcHandle = linker.downcallHandle(memSegment.address(), funcDescriptor);</copy>
```

5. Invoke the function

Using the newly created MethodHandle, you can now invoke the native function. You should cast the returned object to `int`.

```java
<copy>try (var memorySession = MemorySession.openConfined()) {
   var segment = memorySession.allocateUtf8String(payload);
   int result = (int) funcHandle.invoke(segment);
   System.out.println("The answer is " + result*2);
}</copy>
```
6. Fix the imports

Make sure to add the required imports. Your final class should look like the one below.

```java
<copy>
import java.lang.foreign.*;
import java.lang.invoke.MethodHandle;
import static java.lang.foreign.ValueLayout.*;

public class Simple {

    public static void main(String[] args) throws Throwable {
        String payload = "21";

        var functionName = "atoi";

        Linker linker = Linker.nativeLinker();

        SymbolLookup linkerLookup = linker.defaultLookup();

        MemorySegment memSegment = linkerLookup.lookup(functionName).get();

        FunctionDescriptor funcDescriptor = FunctionDescriptor.of(JAVA_INT, ADDRESS);

        MethodHandle funcHandle = linker.downcallHandle(memSegment.address(), funcDescriptor);

        try (var memorySession = MemorySession.openConfined()) {
            var segment = memorySession.allocateUtf8String(payload);
            int result = (int) funcHandle.invoke(segment);
            System.out.println("The answer is " + result*2);
        }
    }
}
</copy>
```

7. Test the Downcall

You can now compile and test the class. Do keep in mind that the FFM API is a Preview Feature in Java 19 so you should enable them at both compile time and runtime.


```java
<copy>javac --enable-preview --release 19 Simple.java</copy>
```

The javac compiler will inform you that you are using Preview Feature. This is not a warning, so there's nothing to worry about.

```text
Note: Task.java uses preview features of Java SE 19.
Note: Recompile with -Xlint:preview for details.
````

Preview features should also be enabled at runtime.

```java
<copy>java --enable-preview Simple</copy>
```

You can get rid of the FFM warnings but also perform the compilation and execution in a single command.

```text
<copy>java --enable-preview --source 19 --enable-native-access=ALL-UNNAMED Simple.java</copy>
```


## Conclusion

Congratulations, you just wrote your first downcall using the Foreign Function & Memory API! Now using a native function to perform such a trivial conversion is, at best, a convoluted approach. A simple `java.lang.Integer.valueOf(int)`would do the same job more easily but that's not the point. The point here is to show you the different steps required to invoke, from Java, a foreign function. Also, this example has been simplified as it doesn't, for example, deal with error handling (ex. what if a lookup fails?). Some of those points will be discussed later.

Finally, you might also think that the FFM API requires writing a lot of code. One thing to notice though is that you didn't write any C code, a clear benefit over the JNI API. But you would be right, that is still a lot of 'infrastructure' code to write. And that is where the tooling and more specifically `jextract` will be useful, a topic that will be discussed later.

You can now move to the next section.


## Acknowledgements
* **Author** - [Denis Makogon, DevRel, Java Platform Group - Oracle](https://twitter.com/denis_makogon)
* **Contributor** -  [David Delabassée, DevRel, Java Platform Group - Oracle](https://twitter.com/delabassee)
* **Last Updated By/Date** - David Delabassée, Sept. 10 2022