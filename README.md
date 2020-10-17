# hand-drawn-curve-parser
This code enables a user to draw a line in their web browser.  Then, that line can be converted into a series of [x, y] coordinate pairs for analysis.  The user drawn line is parsed into a digital Catmull-Rom spline curve. Credit goes to Peter Cook for the curve code.  

## To run this code

* Install [git](https://github.com/git-guides/install-git)
* [Clone](https://github.com/git-guides/git-clone) this repo.
* Run this command: `$ cd hand-drawn-curve-parser`
* Install [Node.js](https://nodejs.org/en/download/)
* Add it to you path, as necessary: `export PATH=$PATH:/usr/local/nodejs/bin`
* Run this command: `$ node app.js`
* Point your web browser to `localhost:3000/stepDad.html`
* Draw a line in the purple box.
* Drag the bubbles to change the line.
* Click the "Next" button.
* Click the "Yes, I'm sure" button.
* Observe the discrete coordinates of points on your line at the top of the page. The numbers to the left of the colon are the bucket number.  The numbers to the right of colon are the y-axis value of the bubble.

## To change the input/output:

### Input:

* In stepDad.html, there is a JavaScript object called fromServer.  
    * The graph title,
    * x-axis label, and 
    * y-axis label can be changed there. 
    * The x-axis tick labels can be changed there, as well. 
    * All the attributes of the graph can be changed by editting that fromServer object.
    * You have to provide a JSON object with the following keys:
        * lofunc: a list, the length of the value associated with the key lofunc is used to 
          determine number of ticks on the x axis. The tick number is the same as the bucket number. 
          The zeroes are arbitrary.  To add more bubbles to the line, add elements to this array.
        * minValue: a number, this is the bottom of the y-axis. Ensure this is as low, or lower, than the lowest value you want to visualize.
        * maxValue: a number, this is the top of the y-axis.  Change this to whatever you want.
        * title: a string, the title of the graph.
        * xlabel: a string, the label for the x-axis.
        * ylabel: a string, the label for the y-axis.
        * xVals: a list of strings, xVals contains the individual tick labels. 
                 The quantity of these elements must be the same quantity as elements of lofunc.
                 Change these to whatever you want.

### Output:

* The Cartesian coordinates of points on the line that was drawn are printed at the top of the web page.
* Ideally, these coordinates can be used for other purposes.
* The object that is returned to the parent, from the child, is a JSON string. Parsed, this object contains a key, `coords`, which is mapped to a list of lists of pairs of upside down x,y cartesian coordinates.  These coordinates are then normalized to correspond to the bucket numbers of the x-axis and the y values of the y-axis in the normCoords function.  The variable `normalizedCoords` points to an object mapping bucket numbers to y values.  That is the variable you want to wrangle, for using the output.


## So what is going on, here?

When you run`node app.js` from the command line, your are using Node, a JavaScript engine based on Google Chrome's V8 engine, to serve this web application, locally.  You are hosting a web site on your computer just for yourself.  Website addresses get resolved into internet protocol (IP) addresses.  Your local IP address, and my local IP address, is 127.0.0.1 (a.k.a. localhost). When you direct your web browser to port 3000 at that IP, you will hopefully see this this web app.  This particular splash page is a boring 404.  However, when you append a `/stepDad.html` to that web address, you are asking for a specific route, which happens to be configured in `app.js` to respond with that file.  Communicates with another file, as described below.

### Parent/Child communication

The parent and the child message each other in this order:
    1. Parent initiates the loading of the child onto the DOM,
       and waits for the completion of this loading event.
    2. The child waits for a message from the parent.
    3. Upon recognizing that the child loaded onto the DOM,
       the parent sends the child a message, `fromServer`,
       containing all the data necessary to generate an empty graph.
    4. Upon receiving `fromServer`, the child renders an empty graph and
       waits for the user to draw on it.
    5. Once the user indicates that they are done making changes to their curve,
       the child parses the line into a series of discrete browser coordinates.
    6. The child sends the coordinates to the parent.
    7. The parent transforms the browser coordinates into cartesian
       coordinates and renders them on the DOM. 

To restate the above: `stepDad.html` contains a giant `<script>` tag that grabs a file called `curveParser.html` from the same directory.  It then creates an `iframe` HTML element, of this *.html file, and adds it to the document object model (the DOM). This is the child.  `stepDad` is the parent. The parent and the child message each other, back and forth.  The parent assigns an id, `cParser`, to the child, an `<iframe>`.  The parent, monitoring the loading process of the DOM, waits for the `cParser` element to load with jQuery’s `load` function.  Once this has occurred, the parent calls a function called `setupIframe`.  This function, defined in the `<script>` tag in `stepDad.html`, defines a function called `bindEvent`, which is used to monitor the browser window for a message.  `setupIframe` calls `bindEvent` which waits for a message.  The child, once loaded, posts a “ready” message to the parent.  Once the parent’s `bindEvent` detects this message, `bindEvent` sends the child `fromServer`, which contains everything the child needs to render the graph for the user to draw on.  Once the user draws the line, from the left purple line to the right purple line, makes their changes to the bubbles via click and drag, then clicks that they are sure that they don’t want to make any additional changes, the child parses the line into points and sends them to the parent.  The parent converts the points into cartesian coordinates and displays them at the top of the web page.


Enjoy

















