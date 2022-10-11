#  Conclusion
## Project Panama Hands-On Lab



Panama is an ambitious project that is tackling complex challenges. To easily and securely enable interoperability between Java and the native world, Panama offers the Foreign Function Memory API. In addition, Panama also delivers the Vector API to enable SIMD programming from plain Java code. This API allows Java developers to express vector computations that will reliably compile at runtime to optimal vector hardware instructions on supported CPU architectures and thus achieve superior performance to equivalent scalar computations.

We made the deliberate choice to focus this workshop more on the FFM API. With this API, you created some simple downcalls and upcalls, you used jextract to create simple use-cases. They were intentionally simplified to show the mechanic of the FFM API at a high level. The FFM API will shine when it will be used with advanced foreign solutions, ex. Machine Learning frameworks. This will unlock new possibilities for the Java platform. And there's a lot more. For example, we didn't have the time to look at the Memory part of the FFM API, to discuss more advanced patterns such as how to exchange complex structures, how to work with variadic foreign functions, error-handlings, etc.
Another choice that we made is to use C for the foreign angle of this workshop. It is important to mention that the FFM API interoperates with any languages that offer an Application Binary Interface (ABI) such as Python, Golang, Rust, Swift, etc.

Despite all those choices, we hope that you now have a better idea of what Project Panama is and that you learned enough to start to think on how you could use those APIs in your own projects.


If you want to stay connected and see how Panama is evolving but also get the latest news on Java and OpenJDK, we invite you to check the following resources :

* Follow [@Java](https://twitter.com/java) on Twitter
* Visit [Inside.Java](https://inside.java/) and its [Panama](https://inside.java/tag/panama) section
* Visit [Dev.Java](https://dev.java)
* Check our different shows: [Inside Java Podcast](https://inside.java/podcast/), [Inside Java Newscast](https://inside.java/newscast), [JEP Café](https://inside.java/jepcafe), [Sip of Java](https://inside.java/sip)
* Subscribe to the [Java YouTube channel](https://www.youtube.com/java)

## Resources
* [JEP 424: Foreign Function & Memory API (Preview)](https://openjdk.org/jeps/424)
* [Core Libraries - Foreign Function and Memory API](https://docs.oracle.com/en/java/javase/19/core/foreign-function-and-memory-api.html#GUID-FBE990DA-C356-46E8-9109-C75567849BA8)
* [JEP 424: Foreign Function & Memory API (Preview)](https://openjdk.org/jeps/424)
* [Video: Project Panama: Say Goodbye to JNI](https://inside.java/2022/04/04/projectpanama/)
* [Jextract Early-Access Builds](https://jdk.java.net/jextract/)
* [Using the Preview Features Available in the JDK](https://dev.java/learn/using-the-preview-features-available-in-the-jdk/)
* [Cloud Shell](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/cloudshellintro.htm) documentation
* [Code Editor](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/code_editor_intro.htm) documentation

## Acknowledgements
* **Author** - [David Delabassée, DevRel, Java Platform Group - Oracle](https://twitter.com/delabassee)
* **Last Updated By/Date** - David Delabassée, Oct. 1 2022
