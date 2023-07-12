# Text Blocks

## Introduction

This lab introduces text blocks

Estimated Time: ~20 minutes

### **Objectives**

In this lab, you will learn how to:

* create a text block
* manage indentation, trailing white space, and line breaks


## Task 1: Creating A Text Block

Creating strings with line breaks in them used to be rather tedious:

```java
<copy>
// unreadable
String html = "<html>\    <body>\n        <p>Hello, world</p>\n    </body>\n</html>\n";
// somewhat readable
html = "<html>\n" +
       "    <body>\n" +
       "        <p>Hello, world</p>\n" +
       "    </body>\n" +
       "</html>\n";
</copy>
```

Thanks to text blocks, this becomes much easier:

```java
<copy>
String html = """
		<html>
			<body>
				<p>Hello, world</p>
			</body>
		</html>
		""";
</copy>
```

A text block has the following syntax:

* it begins with three quotation marks `"""` _and a newline_ as opening delimiter
* it ends with three quotation marks `"""` as closing delimiter _either_ on the same line as the content _or_ on its own line (with different results)

💪 Create a new file `TextBlocks.java` with a main method as follows and run the program:

```java
<copy>
public class TextBlocks {

	public static void main(String[] args) {
		String html = """
				<html>
					<body>
						<p>Hello, world</p>
					</body>
				</html>
				""";
		System.out.println("---\n" + html + "---");
	}

}
</copy>
```

💪 Now convince yourself of the first syntax rule by removing the newline after the opening `"""` and changing that line to `String html = """<html>`.
This results in a compile error.
You will learn a little later why the newline is necessary.

Now turn to the closing `"""`.
As it is, the printed output looks as follows:

```html
<copy>
---
<html>
	<body>
		<p>Hello, world</p>
	</body>
</html>
---
</copy>
```

💪 Move the closing `"""` to the last line of the string: `</html>""";`
The output now looks differently:

```html
---
<copy>
<html>
	<body>
		<p>Hello, world</p>
	</body>
</html>---
</copy>
```

As you can see, the position of the closing `"""` decides whether the string ends with a newline or not.


## Task 2: Managing Indentation

Source code is formatted and part of that formatting is indentation, which impacts how far the lines of a text block are indented - that's called _incidental_ white space.
The multi-line text can be indented as well, though (see the HTML example above) - that's called _essential_ white space.
Text blocks give you a few tools to make sure, they only contain _essential_ white space.

The most powerful tool is the position of the closing delimiter.
If it's on its own line, then it's indentation is considered to be incidental and all indentation in the preceding lines beyond that is considered essential.
The following snippet indicates the distinction with a `|`:

```java
<copy>
public class TextBlocks {

	public static void main(String[] args) {
		// visualization of incidental | essential whitespace
		String html = """
				|<html>
				|    <body>
				|        <p>Hello, world</p>
				|    </body>
				|</html>
				""";
		System.out.println("---\n" + html + "---");
	}

}
</copy>
```

💪 Try that out by going back to the HTML snippet in `TextBlocks` and moving the closing `"""` (on their own line) to the left and right be deleting and adding white space.
Running the program with different indentations will result in different output.

In a real code base, where indentation is defined by the formatting guide or tool, you would probably (un-)indent the content of the string instead of the closing delimiter but the effect is the same.
This mechanism should be your default to manage indentation but it doesn't work if the string is not supposed to end with a newline.

If the string is not supposed to end with a newline, you have three options:

* Keep `"""` in its own line and end the preceding line with `\` (see below for an explanation).
* Keep `"""` in its own line and call `stripTrailing()` on the text block to remove the final newline.
* Place `"""` on the last line of content and call `indent()` with a positive number to add that many spaces.

💪 Give each of those mechanisms a try to generate HTML output that has four spaces of indentation but no trailing newline.


## Task 3: Managing Trailing Whitespace

Trailing white space is most often unintentional, idiosyncratic, and insignificant and it is pretty likely that you don't care about it.
Consequently, text blocks strip them.
So any tab, space, or other whitespace characters that may appear in a line of a text block before the newline, will be removed.

If it is indeed important to keep white space at the end of a line, you can insert the new escape sequence `\s`.
It translates to a single space (`\u0020`) and everything preceding it is conserved - even other white space.
So in the following example, each line is exactly six characters long:

```java
<copy>
// all lines have length 6
String colors = """
	red  \s
	green\s
	blue \s
	""";
</copy>
```


## Task 4: Managing Line Breaks

To make sure that text blocks result in the same strings on all systems, line terminators are translated to `\n`, _even on Windows systems_.
If `\r\n` is desired, `\r` can be inserted at the end of the line:

```java
<copy>
// all lines will end with \r\n
String html = """
		<html>\r
			<body>\r
				<p>Hello, world</p>\r
			</body>\r
		</html>\r
		""";
</copy>
```

You can also remove line breaks that are present in the source code but not supposed to show up in the resulting string, by ending a line with a backslash `\` before the line break:

```java
<copy>
// the resulting string has a single line
String text = """
		Lorem ipsum dolor sit amet, consectetur adipiscing \
		elit, sed do eiusmod tempor incididunt ut labore \
		et dolore magna aliqua.\
		""";
</copy>
```

As you can see, this is also a way to have the closing delimiter on its own line (to manage indentation) while still keeping the string from ending with a newline.


## Learn More

* [JEP 378: Text Blocks](https://openjdk.org/jeps/378)
* [Programmer's Guide To Text Blocks](https://cr.openjdk.java.net/~jlaskey/Strings/TextBlocksGuide_v11.html)

## Acknowledgements

* **Author** - [Nicolai Parlog, DevRel, Java Platform Group - Oracle](https://nipafx.dev/)
* **Last Updated By/Date** - Nicolai Parlog, Sep. 21 2022
