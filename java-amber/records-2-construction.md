# Records, Customizing Construction

## Introduction

This lab dives deeper into how record construction can be customized

Estimated Time: ~15 minutes

### **Objectives**

In this lab, you will learn how to:

* override a record's canonical constructor
* use the compact constructor
* define additional constructors and static factory methods

The topic of constructing records is important because as data carriers, it's central to their design that they only represent legal states of the system.
It should not be possible to successfully create an instance of a record that is in an illegal state and it's the constructor's job to make sure of that.

## Task 1: Overriding The Canonical Constructor

If you create a record, the compiler generates a constructor for you that takes all components of your record as arguments and copies their values to the respective fields.
This is called the _canonical constructor_.

You can always override it by typing it out yourself and adding additional behavior in its body.
Examples for situations where you need to do that are:

1. You need to validate the state of your record.
2. You need to replace illegal arguments with legal ones.
3. You need to make a defensive copy of a mutable component.

💪 As an example for the first, create a file `Range.java` with the following line:

```java
<copy>
public record Range(int start, int end) { }
</copy>
```

💪 Assuming the range must be well-defined, `end` should not be smaller than `start`.
To achieve that, write a constructor just like for a class with fields `start` and `end` and throw an `IllegalArgumentException` if `end` is smaller than `start`.

The solution should look something like this:

```java
<copy>
public record Range(int start, int end) {

	public Range(int start, int end) {
		if (end < start) {
			throw new IllegalArgumentException("End cannot be smaller than start");
		}
		this.start = start;
		this.end = end;
	}
}
</copy>
```

To try this out, you can add the following `main` method:

```java
<copy>
public static void main(String[] args) {
	Range goodRange = new Range(0, 10);
	System.out.println("A good range starts with " + goodRange.start() + " and ends with " + goodRange.end());
	// trows an exception
	Range invalidRange = new Range(20, 5);
}
</copy>
```

## Task 2: Using The Compact Constructor

💪 Because overriding the canonical constructor is common, records make this case easier.
Revisit the constructor you just write and:

* remove the list of arguments, including the parenthesis
* remove the assignments to the fields

The result is called the _compact_ (canonical) constructor and its behavior is exactly what it was before these changes:

* it has as parameters the list of components (even though they're not in the code)
* it executes the code in the body
* it assigns arguments to the fields (even though that's not in the code)

This boils the example down to:

```java
<copy>
public record Range(int start, int end) {

	public Range {
		if (end < start) {
			throw new IllegalArgumentException("End cannot be smaller than start");
		}
	}
}
</copy>
```

The obvious effect is that it reduces the amount of code but the more relevant effects are:

* the code only shows the important part (the check) not the boilerplate (the assignments)
* when the components change, the constructor only needs to be updated if the components it deals with changed (like renaming `start`), not for unrelated changes (like adding a new component)

Note that a compact constructor not only doesn't _require_ you to assign fields, it _prevents_ you from doing so - that's something that falls to the generated code.
So if you need to assign a different value to the field than the argument, you can't do that directly.
Instead, you need to reassign the desired value to the parameter.

💪 As an example, consider ranges that must be positive and where any `start` or `end` below zero is replaced with zero.
Go ahead and expand the compact constructor you wrote with that functionality.

The result should look as follows:

```java
<copy>
public record Range(int start, int end) {

	public Range {
		if (end < start) {
			throw new IllegalArgumentException("End cannot be smaller than start");
		}
		if (start < 0) {
			start = 0;
		}
		if (end < 0) {
			end = 0;
		}
	}
}
</copy>
```

## Task 3: Defining Additional Constructors

Just like classes, records can have additional constructors but unlike in classes, they _must_ start with a `this(...)` call to another constructor.
Since recursive constructor calls are forbidden, this means all constructor calls eventually end with the canonical constructor.
So it's good practice to put all verification or mutation of arguments into the canonical constructor and then call that from other constructors.

💪 As an example, add an additional constructor to `Range` that only accepts the `end` parameter and uses it to create a range from 0 to `end`.

The result should look as follows:

```java
<copy>
public record Range(int start, int end) {

	public Range {
		if (end < start) {
			throw new IllegalArgumentException("End cannot be smaller than start");
		}
		if (start < 0) {
			start = 0;
		}
		if (end < 0) {
			end = 0;
		}
	}

	public Range(int end) {
		this(0, end);
	}

}
</copy>
```

To experiment with your new constructor, you need to modify the previous `main` method with the following content:

```java
<copy>
public static void main(String[] args) {
	Range goodRange = new Range(10);
	System.out.println("A good range starts by default with " + goodRange.start() + " and ends with "+ goodRange.end());
}
</copy>
```

Remember that you can run this small program by issuing the command `java Range.java`.


## Task 4: Factory Methods And Constructor Visibility

For some types, it is preferable to allow construction through static factory methods instead of constructors.
Records allow that as well, but the common practice to then make the constructor(s) private does not work.
Records are _transparent_ carriers (of immutable data), and that transparency requires their full API to be accessible - that includes the means to construct them from their constituent parts.
A possible compromise is to create static factory methods and then mark the constructor as deprecated to discourage its use.

The additional constructor you just added to `Range` is a good example:
Reading it does not make clear that it creates a range from 0 to the given argument.
A static factory method with a good name would make that clearer:

```java
<copy>
public record Range(int start, int end) {

	public Range {
		if (end < start) {
			throw new IllegalArgumentException("End cannot be smaller than start");
		}
		if (start < 0) {
			start = 0;
		}
		if (end < 0) {
			end = 0;
		}
	}

	// called as `var range = Range.from0To(10);`
	public static Range from0To(int end) {
		return new Range(0, end);
	}

}
</copy>
```


## Learn More

* [Record documentation on dev.java](https://dev.java/learn/using-record-to-model-immutable-data/)


## Acknowledgements

* **Author** - [Nicolai Parlog, DevRel, Java Platform Group - Oracle](https://nipafx.dev/)
* **Contributor** - [José Paumard, DevRel, Java Platform Group - Oracle](https://twitter.com/JosePaumard)
* **Last Updated By/Date** - Nicolai Parlog, Sep. 19th 2022
