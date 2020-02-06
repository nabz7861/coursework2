// Generating content based on the template
var template = "<article>\n\
	<img src='data/img/placeholder.png' data-src='data/img/SLUG.jpg' alt='NAME'>\n\
	<h3>NAME</h3>\n\
	<ul>\n\
	<li><span>course-Price:</span> <strong> price</strong></li>\n\
	<li><span>courseTopic:</span> topic</a></li>\n\
	<li><span>review:</span> rating</a></li>\n\
	<li><span>location</span> locate</a></li>\n\
	\n\
	</ul>\n\
</article>";
var catched = '';
for(var i=0; i<courses.length; i++) {
	var entry = template.replace(/POS/g,(i+1))
		.replace(/SLUG/g,courses[i].slug)
		.replace(/NAME/g,courses[i].name)
		.replace(/price/g,courses[i].price)
		.replace(/topic/g,courses[i].topic)
		.replace(/rating/g,courses[i].rating)
		.replace(/locate/g,courses[i].locate);
	entry = entry.replace('<a href=\'http:///\'></a>','-');
	catched += entry;
};
document.getElementById('catched').innerHTML = catched;

// Registering Service Worker
if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/coursework2/sw.js');
};

// Requesting permission for Notifications after clicking on the button
var button = document.getElementById("notifications");
button.addEventListener('click', function(e) {
	Notification.requestPermission().then(function(result) {
		if(result === 'granted') {
			randomNotification();
		}
	});
});

// Setting up random Notification
function randomNotification() {
	var randomItem = Math.floor(Math.random()*courses.length);
	var notifTitle = courses[randomItem].name;
	var notifBody = 'This will cost you '+courses[randomItem].price+'.';
	var notifImg = 'data/img/'+courses[randomItem].slug+'.jpg';
	var options = {
		body: notifBody,
		icon: notifImg
	}
	var notif = new Notification(notifTitle, options);
	setTimeout(randomNotification, 30000);
};

// Progressive loading images
var imagesToLoad = document.querySelectorAll('img[data-src]');
var loadImages = function(image) {
	image.setAttribute('src', image.getAttribute('data-src'));
	image.onload = function() {
		image.removeAttribute('data-src');
	};
};
if('IntersectionObserver' in window) {
	var observer = new IntersectionObserver(function(items, observer) {
		items.forEach(function(item) {
			if(item.isIntersecting) {
				loadImages(item.target);
				observer.unobserve(item.target);
			}
		});
	});
	imagesToLoad.forEach(function(img) {
		observer.observe(img);
	});
}
else {
	imagesToLoad.forEach(function(img) {
		loadImages(img);
	});
}