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

* In stepDad.html, there is a JavaScript object called fromServer, at about line 80. The graph title, x-axis label, and y-axis label can be changed there. The x-axis tick labels can be changed there, as well. All the attributes of the graph can be changed by editting that fromServer. 


### Output:

* The coordinates of points on the line that was drawn are printed at the top of the web page.
* Ideally, these coordinates can be used for other purposes.

Enjoy


