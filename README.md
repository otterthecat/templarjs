Templar JS
=======

An experimental, logicless, Javascript templating engine that requires no tokens, only HTML.
Just set up some data attributes, and you're good to go.

Caveats
-------
As noted above, this is still experimental. It works, but it's nowhere near solid/stable enough or
in any way ready for real production use. It's probably not even ready for your grandma's blog.
If you choose to use it in your own projects, don't come crying to me
that things blew up.

Usage
-----

To start, just have a basic HTML file:

	<!doctype html>
	<html>
	  <head>
	    <title>templar</title>
	  </head>
	  <body>
	      <h2 data-templar="textContent: title"></h2>
	      <p data-templar="textContent: content"></p>
	  </body>
	</html>

Note the use of `data-templar` attribute. The value should be a comma-delimited list of key/value pairs,
similar to a JSON string. Each key name relates to a valid element property. The value will of each key
will map to a property name from your data you're using.

For instance, for the above example, we want to use this data:

	var my_data = {
        title: "Quotes by Z-Man",
        content: "This is my happening and it freaks me out!"
      };

With this javascript data object we can use it to let Templar JS know how to handle the HTML template:

	var tmpl = new Templar();
	tmpl.exec(my_data);

After the Templar instance executes, your HTML file from the above example will now look like this:

	<!doctype html>
	<html>
	  <head>
	    <title>templar</title>
	  </head>
	  <body>
	      <h2 data-templar="textContent: title">Quotes by Z-Man</h2>
	      <p data-templar="textContent: content">This is my happening and it freaks me out!</p>
	  </body>
	</html>

Templar JS can also loop through arrays defined in your data and create mulitple new elements.
Instead of setting an element's `data-templar` attribute as a JSON-like key/value string, simply
set the value as the property name of the array as defined in your data.

For instance, using this HTML:

	<ul data-templar="cookies">
		<li data-templar="textContent: cookieType"></li>
	</ul>

and this data:

	var my_data = {
		cookies = [{cookieType: 'chocolate chip'}, {cookieType: 'sugar'}, {cookieType: 'double stuff'}]
	}

will result in this output:

	<ul data-templar="cookies">
		<li data-templar="textContent: cookieType">choclolate chip</li>
		<li data-templar="textContent: cookieType">sugar</li>
		<li data-templar="textContent: cookieType">double stuff</li>
	</ul>