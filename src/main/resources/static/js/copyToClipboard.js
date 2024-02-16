function copyToClipboard(button, text) {
    // Create a temporary textarea element
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();

    try {
        // Attempt to execute the copy command
        const successful = document.execCommand('copy');
        if (successful) {
            // Change the button text and add a class
            button.textContent = 'Copied!';
            button.classList.add('button-copied');

            // Set a timeout to revert the button back to its original state
            setTimeout(function() {
                button.textContent = 'Copy';
                button.classList.remove('button-copied');
            }, 2000); // 2 seconds delay
        } else {
            console.error('Copy command failed');
        }
    } catch (err) {
        console.error('Error during copy command', err);
    }
    document.body.removeChild(textArea);
}