document.addEventListener('DOMContentLoaded', () => {
	let skipIntro = localStorage.getItem('skipIntro') === 'true'; // Retrieve skipIntro from localStorage

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
		replayIntroButton.style.display = 'inline-block'; // Show the replay button
		replayIntroButton.classList.add('visible'); // Ensure the replay button is visible with animation
		const sections = mainContent.querySelectorAll('section');
		let expandedSections = [];

		sections.forEach((section) => {
			section.classList.add('collapsed'); // Initially keep all sections collapsed
		});

		setTimeout(() => {
			sections.forEach((section) => {
				section.classList.add('visible'); // Open all sections at once
				section.classList.remove('collapsed');
				section.classList.add('animated-border'); // Add animated border to expanded sections
				expandedSections.push(section);
			});

			setTimeout(() => {
				let delay = 0;
				for (let i = expandedSections.length - 1; i >= 0; i--) {
					setTimeout(() => {
						if (i !== 0) {
							expandedSections[i].classList.remove('visible');
							expandedSections[i].classList.add('collapsed');
							expandedSections[i].classList.remove('animated-border'); // Remove animated border from collapsed sections
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
					section.classList.remove('animated-border'); // Remove animated border from collapsed sections
					expandedSections = expandedSections.filter((s) => s !== section);
				} else {
					section.classList.add('visible');
					section.classList.remove('collapsed');
					section.classList.add('animated-border'); // Add animated border to expanded sections
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

	replayIntroButton.addEventListener('click', () => {
		localStorage.setItem('skipIntro', 'false'); // Set skipIntro to false in localStorage
		location.reload(); // Reload the page
	});
});
