document.addEventListener('DOMContentLoaded', () => {
	let skipIntro = localStorage.getItem('skipIntro') === 'true'; // Retrieve skipIntro from localStorage

	const textElement = document.getElementById('text');
	const textContainer = document.getElementById('text-container');
	const header = document.getElementById('header');
	const mainContent = document.getElementById('main-content');
	header.style.display = 'none'; // Hide the header initially
	mainContent.style.display = 'none'; // Hide the main content initially

	const intro_messages = [
		'oh?',
		'hi!',
		'..',
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

		sections.forEach((section) => {
			section.classList.add('collapsed'); // Initially keep all sections collapsed
		});

		setTimeout(() => {
			sections.forEach((section) => {
				section.classList.add('visible'); // Open all sections at once
				section.classList.remove('collapsed');
				expandedSections.push(section);
			});

			setTimeout(() => {
				let delay = 0;
				for (let i = expandedSections.length - 1; i >= 0; i--) {
					setTimeout(() => {
						if (i !== 0) {
							expandedSections[i].classList.remove('visible');
							expandedSections[i].classList.add('collapsed');
						}
					}, delay);
					delay += 5; // 0.5s intervals
				}
			}, 1000); // Wait 2 seconds before starting to collapse sections
		}, 1000); // Wait 0.5 seconds before opening all sections

		sections.forEach((section) => {
			const title = section.querySelector('h2');
			title.addEventListener('click', () => {
				if (section.classList.contains('visible')) {
					section.classList.remove('visible');
					section.classList.add('collapsed');
					expandedSections = expandedSections.filter((s) => s !== section);
				} else {
					section.classList.add('visible');
					section.classList.remove('collapsed');
					expandedSections.push(section);
				}
			});
		});
		textContainer.style.display = 'none'; // Hide the text container
		localStorage.setItem('skipIntro', 'true'); // Set skipIntro to true in localStorage
	}

	if (skipIntro) {
		showContent(); // Skip the intro and show the content immediately
	} else {
		setTimeout(displayNextMessage, 2000); // Initial delay before displaying the first message
	}
});
