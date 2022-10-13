# Using jextract

## Introduction


This lab walks you through the the jextract tool and show you how to use it.

Estimated Time: ~25 minutes


## Task 1: Jextract overview

The previous labs explained the different steps required to perform downcalls, part of it was to write some code required for native code invocation such as
* Instantiate and configure a Linker.
* Perform a SymbolLookup to locate, using their string-based names, the native symbols of the foreign functions.
* Construct a FunctionDescriptor to describe native functions signatures.
* Create MemoryLayout objects to represent the arguments and the return value of the foreign functions.
* Etc. 

In the end, that is a lot of 'infrastructure' code, i.e. code that is required to perform what we want to do, i.e. invoking a foreign function. A clear benefit of the FFM API is that all this 'infrastructure' code is written in Java, which is not the case with the JNI API for which you have to write some of that 'infrastructure' code using C. 


The situation is getting even more complicated with native [variadic foreign functions](https://en.wikipedia.org/wiki/Variadic_function), i.e. functions accepting a variable number of arguments AKA *varargs* in Java. In the following C example...

```
<copy>
#include <stdio.h>

int main() {
   printf("Hello %s\n", "World!");
   printf("%s %\n", "Hello", " World!");
   return 0;
}
</copy>
```

... the compiler will create a special variant for the 2 `printf` functions:

```
int(const char*);
int(const char*, const char*);
```

This means that you would have to also handle the infrastructure code to deal with those 2 variants.


Writing infrastructure code can sometimes be seen as a necessary distraction. This is one of the problems that Project Panama aims to solve by providing a new code-generating tool - jextract - whose goal is to help developers to generate the infrastructure code around the native code of any C library. Jextract helps developers focus on writing business logic that uses foreign functions, and not on writing the infrastructure code required to use those foreign functions. 

Jextract is a tool, developed under the Project Panama umbrella, whose goal is to mechanically generates, from the corresponding C-header files, Java bindings for native libraries.

Technically, jextract relies on 2 dependencies: (1) the Foreign Function & Memory API, available in JDK19+ and (2) [libclang](https://clang.llvm.org/doxygen/group__CINDEX.html), a C interface to the Clang.

Jextract uses libclang to parse C header files and extract entities from native symbols (`struct`, `typedef`, `macro`, `global constant`, and `function`).

💡 libclang is a C interface to Clang and comes with Clang, a *compiler front-end for C-based languages* (ex. C, C++,  etc.). The Clang compiler front-end is responsible for translating C source code into an intermediate state. Clang will then use LLVM, a compiler back-end, to translate that intermediate state into machine code. 


## Task 2: Installing jextract

Although jextract is developed in the [OpenJDK Code Tools project](https://openjdk.org/projects/code-tools/), it is not per se part of the JDK itself. This is due to several reasons. First, jextract isn't yet finished and is only available, at this stage, via Early-Access builds. Second, not all Java developers write code that needs to interoperate with native code. Third, and probably the main reason, jextract would significantly increase the size of the JDK. For all those reasons, jextract is a separate bundle that needs to be downloaded independently.


💡 This workshop uses the [jextract Early-Access build published in July](https://jdk.java.net/jextract/). While waiting for the next early-access build, you can always build jextract yourself using the instructions at [https://github.com/openjdk/jextract](https://github.com/openjdk/jextract). 

Installing jextract is straight forward.

1. Get the jextract Early Access build.

Head to [https://jdk.java.net/jextract/](https://jdk.java.net/jextract/) and download the **Linux / x64** Early-Access builds using `wget`.

```text
> <copy>
wget https://download.java.net/java/early_access/jextract/2/openjdk-19-jextract+2-3_linux-x64_bin.tar.gz -P ~/
</copy>

Resolving download.java.net (download.java.net)... 23.55.248.91
Connecting to download.java.net (download.java.net)|23.55.248.91|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 153788298 (147M) [application/x-gzip]
Saving to: ‘/home/david_dela/openjdk-19-jextract+2-3_linux-x64_bin.tar.gz’

100%[==========================================>] 153,788,298  112MB/s in 1.3s

‘/home/david_dela/openjdk-19-jextract+2-3_linux-x64_bin.tar.gz’ saved [153788298/153788298]
```

2. Untar the archive

```text
> <copy>tar xvf ~/openjdk-19-jextract+2-3_linux-x64_bin.tar.gz
</copy>
   ```

Make sure to update the path to include jextract.

```text
> <copy>export PATH=$PATH:~/jextract-19/bin</copy>
````

💡 If you want the updated path to be persisted, update your `.bashrc` as follow.
```text
> <copy>echo 'export PATH=$PATH:~/jextract-19/bin' >> ~/.bashrc</copy>
```

3. Check the insallation

Confirm that jextract is installed properly.

```text
> <copy>jextract --version</copy>

jextract 19
JDK version 19-ea+23-1706
WARNING: A restricted method in java.lang.foreign.Linker has been called
WARNING: java.lang.foreign.Linker::nativeLinker has been called by module org.openjdk.jextract
WARNING: Use --enable-native-access=org.openjdk.jextract to avoid a warning for this module
```


## Task 3: Hello World

Before discussing jextract, let's start with a simple Java application making a downcall to a C Hello World function.

1. Create the foregin code.

Create a file named "helloworld.c" with the following content.

```
<copy>
#include <stdio.h>
#include "helloworld.h"

void helloworld(void) {
    printf("Hello World from C!\n");
}
</copy>
```

Create the corresponding "helloworld.h" header.

```
<copy>
#ifndef helloworld_h
#define helloworld_h

void helloworld(void);

#endif
</copy>
```


You can now compile the native Hello World function into a shared object.

```text
<copy>
 gcc -fPIC -shared -o libhelloworld.so helloworld.c
</copy>
```


2. Use jextract

Use jextract to generate the binding exposing the native function.


```text
<copy>
jextract -t org.hello -lhelloworld helloworld.h
</copy>
```

3. Write the Java application

Create a simple Java application named "HelloWorld.java".

```
<copy>
import static org.hello.helloworld_h.*;

public class HelloWorld {
    public static void main(String[] args) {
        helloworld();
    }
}
</copy>```

Compile and run it.

```text
<copy>
java --enable-native-access=ALL-UNNAMED --enable-preview --source=19 -Djava.library.path=$PWD HelloWorld.java
</copy>
```

As you can see, it is easy to invoke this simple C function from the Java application as jextract is handling all the infrastructure code.


## Task 4: Using jextract

To get some help, use the `-?` flag with `jextract`.

```text
<copy>
Usage: jextract <options> <header file>                                

Option                         Description                             
------                         -----------                             
-?, -h, --help                 print help                              
-D <macro>                     define a C preprocessor macro           
-I <path>                      specify include files path              
--dump-includes <file>         dump included symbols into specified file
--header-class-name <name>     name of the header class                
--include-function <name>      name of function to include             
--include-macro <name>         name of constant macro to include       
--include-struct <name>        name of struct definition to include    
--include-typedef <name>       name of type definition to include      
--include-union <name>         name of union definition to include     
--include-var <name>           name of global variable to include      
-l <library>                   specify a lib name or absolute lib path
--output <path>                specify the dir to place generated files
--source                       generate java sources                   
-t, --target-package <package> target package for specified header files
--version                      print version information and exit
</copy>   ```



1. Generate Java source classes corresponding to a C library.

The goal of jextract is to mechanically generate Java bindings from C native library headers. This can be done with the following command.

```text
> <copy>jextract --source -t clang.stdlib.stdio -I /usr/include --output ~/lab/src/main/java /usr/include/s	tdio.h</copy>
```

Let's break down the different arguments.
* `--source` instruct jextract to generate java sources
* `-t` is used to specify what target package should be used for the generated Java sources
* `-I` tells jextract where to find the C header files
* `--output` tells jextract where the java sources should be generated
* the final agrument (`/usr/include/stdio.h`) specifies which header file should be converted

Running the command above instructs jextract to create a new Java package containing classes covering the C stdio library API defined in the `stdio.h` header file. 

2. Exploring the generated classes.

You can confirm that jextract has generated multiple classes in the target directory with the target namespace.

```text
> <copy>find ~/lab/src/main/java/</copy>

…/lab/src/main/java/clang/stdlib/stdio/stdio_h.java
…/lab/src/main/java/clang/stdlib/stdio/__fsid_t.java
…/src/main/java/clang/stdlib/stdio/__mbstate_t.java
…/src/main/java/clang/stdlib/stdio/_G_fpos_t.java
…src/main/java/clang/stdlib/stdio/_G_fpos64_t.java
…/src/main/java/clang/stdlib/stdio/_IO_marker.java
…/src/main/java/clang/stdlib/stdio/_IO_FILE.java
…/src/main/java/clang/stdlib/stdio/__io_read_fn.java
…/src/main/java/clang/stdlib/stdio/__io_write_fn.java
…/src/main/java/clang/stdlib/stdio/__io_seek_fn.java
…/src/main/java/clang/stdlib/stdio/__io_close_fn.java
…/src/main/java/clang/stdlib/stdio/fpos_t.java
…/src/main/java/clang/stdlib/stdio/__FILE.java
…/src/main/java/clang/stdlib/stdio/FILE.java
…/src/main/java/clang/stdlib/stdio/constants$0.java
…/src/main/java/clang/stdlib/stdio/constants$1.java
…
…/src/main/java/clang/stdlib/stdio/Constants$root.java
…/src/main/java/clang/stdlib/stdio/RuntimeHelper.java
```


jextract creates different classes, including:
* **`stdio_h.java`** - a public API class that contains all exportable C stdio functions.
* **`FILE.java`** - a class that represents the C FILE struct, it contains [GroupLayout](https://docs.oracle.com/en/java/javase/19/docs/api/java.base/java/lang/foreign/GroupLayout.html) that corresponds to the C FILE struct as well as a set of getters and setters for each fields of the C struct.
* a series of **`constants$XX.java`** classes holding function descriptors and method handles for every native function extracted from the C stdio library
* **`Constants$root.java`** - a placeholder for [ValueLayouts](https://docs.oracle.com/en/java/javase/19/docs/api/java.base/java/lang/foreign/ValueLayout.html) corresponding to C primitive types
* **`RuntimeHelper.java`** - a private service class that contains helpers designed to construct method handles for each native function.

💡 A [struct](https://en.wikipedia.org/wiki/Struct_(C_programming_language)) is way of grouping, in C, mutliple variables into a single composite data type.


There are a few things to keep in mind:

* jextract runs recursively against the specified target header file(s). In this case, the C `stdio.h` header contains some additional imports from the C standard library. So jextract is also generating the corresponding Java sources for those.
* There is only one public API class no matter how large the library is.
* jextract will create a public class for every `struct` and `typedef` referenced in a header file.


## Task 5: Jextract advanced usage


As you saw in the previous section, jextract can potentially generate a lot of Java source files for a given header file. Not all of those files are required to execute one specific C function. To see what exactly jextract will generate for a given header file, you can use the `--dump-includes` flag and specify a file path. This dump file will list all native symbols jextract can potentially extract from the specified header file.

```text
--dump-includes <file> dump included symbols into specified file
```
💡 Make sure to perform the following lab in the `~/lab`directory, or any other directory you choose.

For instance, the following command will create a `stdio-dump.txt` file containing all native symbols jextract is capable of extracting from the `/usr/include/stdio.h` header:

```text
> <copy>jextract --source -t clang.stdlib.stdio -I /usr/include --dump-includes stdio-dump.txt /usr/include/stdio.h</copy>
```
💡 Make sure that the directory specifed in the `--dump-includes` path exists!


```text
> <copy>cat stdio-dump.txt</copy>
````


This `stdio-dump.txt` file contains a list of all the native symbols (`function`, `struct`, `enum`, `var`, `union`, etc.) jextract is able to extracte from the `/usr/include/stdio.h` header.

```text
#### Extracted from: …/jextract-19/conf/jextract/stdarg.h

--include-macro __GNUC_VA_LIST    # header: …/jextract-19/conf/jextract/stdarg.h
--include-typedef __gnuc_va_list  # header: …/jextract-19/conf/jextract/stdarg.h
--include-typedef va_list         # header: …/jextract-19/conf/jextract/stdarg.h

#### Extracted from: …/jextract-19/conf/jextract/stddef.h

--include-macro NULL      # header: …/jextract-19/conf/jextract/stddef.h
--include-typedef size_t  # header: …/jextract-19/conf/jextract/stddef.h

#### Extracted from: /usr/include/_G_config.h

--include-macro _G_BUFSIZ                # header: /usr/include/_G_config.h
--include-macro _G_HAVE_MMAP             # header: /usr/include/_G_config.h
--include-macro _G_HAVE_MREMAP           # header: /usr/include/_G_config.h
--include-macro _G_IO_IO_FILE_VERSION    # header: /usr/include/_G_config.h
--include-macro _G_config_h              # header: /usr/include/_G_config.h
--include-typedef _G_fpos64_t            # header: /usr/include/_G_config.h
--include-typedef _G_fpos_t              # header: /usr/include/_G_config.h

...
```
As you can see, that is a lot! The good news is that it is possible to ask jextract to apply some filter(s). For instance, the following command will instruct jextraxt to generate the infrastructure code only for the C `puts` native function. Check the `--include-function puts` flag.

```text
> <copy>jextract --source -t clang.stdlib.stdio -I /usr/include --output src/main/java --include-function puts /usr/include/stdio.h</copy>
```

Filtering helps to avoid creating unnecessary Java source files by omitting `functions`, `macros`, `structs`, `vars`, and `typedefs` that are not requied. 

The following approach could be used. 
* Using jextract to create a dump file for a given header.
* Remove from that dump file all elements that aren't required.
* Pass the simplified dump file as a parameter to instruct jextract to only generates the classes listed in that file.


To illustrate this, you can create a bare bone dump file for one foreign function, ex. `puts`.

```text
> <copy>echo "--include-function puts" >> simple-dump.txt</copy>
```
You can now use this file when invoking jextract to only generate the selected classes.

```text
> <copy>jextract --source -t clang.stdlib.stdio -I /usr/include --output src/main/java @simple-dump.txt /usr/include/stdio.h<copy>
```

💡 The file passed to jextract via `@` is a parameters placeholder. So in addition to the `include-*` arguments, it can also contain other flag(s) and parameter(s) to pass to jextract. You use such a file to store and pass to jextract any common arguments. 

```text
> cat param.txt 
--source -t clang.stdlib.stdio -I /usr/include /usr/include/stdio.h

> <copy>jextract @param.txt @custom-dump.txt</copy>
```

💡 There is only so much a tool can do. It remains essential to understand what you are filtering. For example, there may be dependencies between components of a header file. Excluding a required dependency may lead to issues when using another component relying on that dependency.


## Task 6: Using the generated classes

Now that you understand how jextract can help to generate the infrastructure code of foreign function(s), let's revisit the initial downcall with the C `atoi` function from the `stdlib` library.

1. Generate the infrastructure code

Use jextract to generate the code required to invoke the foreign `atoi` function.

```text
> <copy>javaextract --source -t clang.stdlib -I /usr/include --output src/main/java --include-function atoi /usr/include/stdlib.h</copy>
```

2. Write your logic 

Create the `src/main/java/AtoiTest.java` class with the following content.


```java
<copy>
import java.lang.foreign.MemorySession;
import clang.stdlib.stdlib_h;

public class AtoiTest {

  public static void main(String... args) {

     String payload = "21";

     try (var memorySession = MemorySession.openConfined()) {
        int result = (int) stdlib_h.atoi( memorySession.allocateUtf8String(payload) );
        System.out.println("The answer via the native `atoi` function is " + result*2);
     }
  }
}

</copy>
```


The key line is : ```int result = (int) stdlib_h.atoi( memorySession.allocateUtf8String(payload) );```
* `memorySession.allocateUtf8String(payload)` allocates some foreign memory holidng the `payload` string to be passed to the foregien function. 
* `stdlib_h.atoi()` is the Method Handle wrapping the foreign function.
* Once invoked, this Method Handle returns an `java.lang.object` carrying the result of the foreign function. That object is then casted to an `int`.


3. Run your code

Compile your code.
```text
> <copy>javac -classpath src/main/java/ -d target --enable-preview --source 19 src/main/java/AtoiTest.java</copy>

Note: Some input files use preview features of Java SE 19.
Note: Recompile with -Xlint:preview for details.
```
And run your program (warnings & notes omitted from the output).

```text
> <copy>java -classpath target --enable-preview AtoiTest
</copy>

The answer via the native `atoi` function is 42
```

And that's it! As you can see, the code to invoke the foreign `atoi` function is trivial to write, thanks to all the infrastructure code generated by jextract.

You can now compare this code to the code you had to write in the "A Simple Downcall" lab.



## Conclusion

In this lab, you have used jextract, a tool that generates the infrastructure code required for using foreign functions. Jextract helps developers as they can focus on writing the logic that will rely on this generated code to invoke foreign functions. An additional benefit of jextract is that the generated code will always be optimized to take benefits of various underlying optimizations (ex. JIT compiler and HotSpot optimizations), another important aspect that developers won't have to worry about! By analyzing the code that jextract generates also help to understand better the FFM API.



## Learn More

* [Jextract Early-Access Builds](https://jdk.java.net/jextract/)

## Acknowledgements
* **Author** - [Denis Makogon, DevRel, Java Platform Group - Oracle](https://twitter.com/denis_makogon)
* **Contributor** -  [David Delabassée, DevRel, Java Platform Group - Oracle](https://twitter.com/delabassee)
* **Last Updated By/Date** - David Delabassée, Oct. 1 2022
