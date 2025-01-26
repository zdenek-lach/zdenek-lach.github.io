document.addEventListener('DOMContentLoaded', () => {
	const skipIntro = true;

	const textElement = document.getElementById('text');
	const textContainer = document.getElementById('text-container');
	const header = document.getElementById('header');
	const mainContent = document.getElementById('main-content');
	header.style.display = 'none'; // Hide the header initially
	mainContent.style.display = 'none'; // Hide the main content initially

	const intro_messages = [
		'oh?',
		'hi..',
		'um..',
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
		document.body.classList.add('intro-done'); // Change background color and trigger fade-in
		header.style.display = 'flex'; // Show the header
		header.classList.add('visible'); // Ensure the header is visible
		mainContent.style.display = 'block'; // Show the main content
		mainContent.classList.add('visible'); // Ensure the main content is visible with animation
		const sections = mainContent.querySelectorAll('section');
		let expandedSections = [];
		const maxExpandedSections = screen.height <= 1080 ? 3 : 5;
		console.log(screen.height);
		console.log(maxExpandedSections);
		sections.forEach((section, index) => {
			if (index === 0) {
				section.classList.add('visible'); // Expand the first section by default
				expandedSections.push(section);
			} else {
				section.classList.add('collapsed'); // Ensure other sections are collapsed
			}
			const title = section.querySelector('h2');
			title.addEventListener('click', () => {
				if (section.classList.contains('visible')) {
					section.classList.remove('visible');
					section.classList.add('collapsed');
					expandedSections = expandedSections.filter((s) => s !== section);
				} else {
					if (expandedSections.length >= maxExpandedSections) {
						const oldestSection = expandedSections.shift();
						oldestSection.classList.remove('visible');
						oldestSection.classList.add('collapsed');
					}
					section.classList.add('visible');
					section.classList.remove('collapsed');
					expandedSections.push(section);
				}
			});
		});
		textContainer.style.display = 'none'; // Hide the text container
	}

	if (skipIntro) {
		showContent(); // Skip the intro and show the content immediately
	} else {
		setTimeout(displayNextMessage, 2000); // Initial delay before displaying the first message
	}
});
