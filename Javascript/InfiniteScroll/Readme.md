** loading.io  - to make your animation loading bar **

* How to implement infinit scroll functionality *
1. window.scrollY -> Distance from top of page user has scrolled.
2. window.innerHeight -> total height of browser window
3. document.body.offsetHeight -> Height of everything in the body including what is not in the view.  
so what we will do is that we will calculate sum of 1 & 2 and verify if it is less than 3 - 1000/. we are subtracting 1000 from 3 because that is the point where we will be calling our API to get the more data.


** How can we further optimize our websites as conenction might be poor**