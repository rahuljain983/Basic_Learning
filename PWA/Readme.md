# What are PWAs?

## PWAS are nothing but enhance your existing web pages to feel and work more like native mobile apps. it doesn't only include responsive design but features like 
## app working in offline mode, icon on home screen, accessign the device camera or location, syncronizing data in the background.
## 3 features of web apps:
#### 1. Be reliable: load fast and provide offline functionality. initial load is fast just like mobile apps.
#### 2. Fast: respond quickly to user actions.
#### 3. Engaging: Feel like a native app on mobile devices.


# PWA Core building Blocks:
 1. Service workers
 2. application manifest file
 3. responsive design
 
 
# Application Manifest file
 1. web manifest file makes web app installable. it means you can add your web app to the home screen and just clicking on it will open the application.
   it gives the web app a feeling like native app as it we can simply tap on the icon and enter our application so basically it increases the user interaction.
   
# Adding a PWA to a home screen. Chrome automatically detects a PWA and display a banner to add APP on home screen if certains conditions are met:
	1. has a mnifest file with : with short name , with name , a 144x144 png icon, a start_url
	2. has a service worker registered
	3. is server over https
	4. is visited atleast twice with in 5 minutes


# Adding Properties for safari
	1. 
	
	
	
# What is service worker?
service worker is a JS file runs in the backgroung which runs on its own seperate thread different from the main thread.
service workers are decoupled from HTML although we do register it using HTML but it has a certain scope. 
Scope means we can decide which pages of our application can work with SW.
Generaly, Scope of SW is the folder in which it is defined. It is applied to all HTML pages so we declares it in root web
folder where we have our main HTML page so that SW can be applied on the complete application.
service workers keeps on running even after pages have been closed.
service workers cant interact with the DOM.
 
# so what we can do with service workers?
SW can listen to events and then react it. so SW are all about reacting to events.

#Lets look at events which SW typically reacts to.
1. Fetch - browser initiates a HTTP request. so you can see SW as a network proxy which means every request made by the browser
goes through the SW. Important point is that traditional XHR dont trigger the fetch request or even axios dont trigger the 
fetch request.
2. Push Notifications - SW recieves web push notifications (from server).
3. Notification Interaction - User interacts with displayed notification.
4. Background sync - SW recieves background sync (Internet connection was restored).
5. SW Lifecycle - SW phase changes.


# SW Lifecycle
It gets register in 2 phases
1. Install Phase - when browser installs the service worker, it emits the install even in whcih we can hook and do some initial
	things like caching etc
2. Activation Phase - This happens after install phase when SW is ready to activate. it means no old service worker is running
	for that we need to close all the tabs so that browser safely knows that no page is interacting with SW so it can switch
	to new SW from old SW.
Browser installs the SW only for the first time or if the SW file has changed. if it is not changed it will not install it agIn
like it will not install it on every page refresh.


# SW doesn't work with AJAX. they works with fetch/promises.

# 