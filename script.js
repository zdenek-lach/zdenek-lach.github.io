document.addEventListener('DOMContentLoaded', () => {
	console.log('DOM fully loaded and parsed');
	let skipIntro = localStorage.getItem('skipIntro') === 'true'; // Retrieve skipIntro from localStorage
	console.log('skipIntro:', skipIntro);

	const textElement = document.querySelector('.text');
	const textContainer = document.querySelector('.text-container');
	const header = document.querySelector('.header');
	const mainContent = document.querySelector('.main-content');
	const replayIntroButton = document.querySelector('.replay-intro-button');
	header.style.display = 'none'; // Hide the header initially
	mainContent.style.display = 'none'; // Hide the main content initially
	replayIntroButton.style.display = 'none'; // Hide the replay button initially

	const intro_messages = [
		'oh?',
		'hi!',
		'...',
		"so.. you're looking for more information about me?",
		'okay, here you go..',
	];
	let messageIndex = 0;
	let charIndex = 0;
	let currentMessage = intro_messages[messageIndex];

	function typeWriter() {
		if (charIndex < currentMessage.length) {
			textElement.textContent += currentMessage.charAt(charIndex);
			charIndex++;
			setTimeout(typeWriter, 50); // Typing speed
		} else {
			if (messageIndex < intro_messages.length - 1) {
				messageIndex++;
				setTimeout(displayNextMessage, 2000); // Wait before displaying the next message
			} else {
				setTimeout(showContent, 2000); // Show content after the last message
			}
		}
	}

	function displayNextMessage() {
		textElement.textContent = '';
		currentMessage = intro_messages[messageIndex];
		charIndex = 0;
		typeWriter();
	}

	function showContent() {
		console.log('Showing content');
		document.body.classList.add('intro-done'); // Change background color and trigger fade-in
		header.style.display = 'flex'; // Show the header
		header.classList.add('visible'); // Ensure the header is visible
		mainContent.style.display = 'block'; // Show the main content
		mainContent.classList.add('visible'); // Ensure the main content is visible with animation
		replayIntroButton.style.display = 'inline-block'; // Show the replay button
		replayIntroButton.classList.add('visible'); // Ensure the replay button is visible with animation
		const sections = mainContent.querySelectorAll('section');
		let expandedSections = [];
		let maxExpandedSections;

		switch (true) {
			case screen.height <= 720 || screen.width <= 600:
				maxExpandedSections = 1;
				break;
			case screen.height <= 900:
				maxExpandedSections = 2;
				break;
			case screen.height <= 1080:
				maxExpandedSections = 3;
				break;
			default:
				maxExpandedSections = 5;
				break;
		}

		sections.forEach((section, index) => {
			section.classList.add('collapsed'); // Ensure all sections are collapsed initially
			const title = section.querySelector('h2');
			title.addEventListener('click', () => {
				if (section.classList.contains('visible')) {
					section.classList.remove('visible');
					section.classList.remove('animated-border');
					section.classList.add('collapsed');
					expandedSections = expandedSections.filter((s) => s !== section);
				} else {
					if (expandedSections.length >= maxExpandedSections) {
						const oldestSection = expandedSections.shift();
						oldestSection.classList.remove('visible');
						oldestSection.classList.remove('animated-border');
						oldestSection.classList.add('collapsed');
					}
					section.classList.add('visible');
					section.classList.add('animated-border');
					section.classList.remove('collapsed');
					expandedSections.push(section);
				}
			});
		});

		// Animation to open all sections and then gradually close them
		setTimeout(() => {
			console.log('Opening all sections');
			sections.forEach((section) => {
				section.classList.add('visible');
				section.classList.add('animated-border');
				section.classList.remove('collapsed');
			});
			setTimeout(() => {
				console.log('Closing sections gradually');
				for (let i = sections.length - 1; i >= 0; i--) {
					setTimeout(() => {
						sections[i].classList.remove('visible');
						sections[i].classList.remove('animated-border');
						sections[i].classList.add('collapsed');
					}, (sections.length - 1 - i) * 50);
				}
				setTimeout(() => {
					// Keep the first section open
					sections[0].classList.add('visible');
					sections[0].classList.add('animated-border');
					sections[0].classList.remove('collapsed');
					expandedSections.push(sections[0]); // Add the first section to expandedSections
				}, sections.length * 50);
			}, 1000); // Delay before starting to close sections
		}, 1000); // Delay before opening all sections

		textContainer.style.display = 'none'; // Hide the text container
		localStorage.setItem('skipIntro', 'true'); // Set skipIntro to true in localStorage
	}

	if (skipIntro) {
		console.log('Skipping intro');
		showContent(); // Skip the intro and show the content immediately
	} else {
		console.log('Starting intro');
		setTimeout(displayNextMessage, 2000); // Initial delay before displaying the first message
	}

	replayIntroButton.addEventListener('click', () => {
		console.log('Replay intro button clicked');
		localStorage.setItem('skipIntro', 'false'); // Set skipIntro to false in localStorage
		location.reload(); // Reload the page
	});

	window.addEventListener('scroll', () => {
		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
			replayIntroButton.classList.add('visible'); // Show the button when scrolled to the bottom
		} else {
			replayIntroButton.classList.remove('visible'); // Hide the button when not at the bottom
		}
	});
});
