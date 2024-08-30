document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const historyButton = document.getElementById('historyButton');
    const historyPanel = document.getElementById('historyPanel');
    const fullHistory = document.getElementById('fullHistory');
    const clearHistoryButton = document.getElementById('clearHistoryButton');
    const title = document.getElementById('title');
    const starContainer = document.querySelector('.stars');
    const numberOfStars = 200;
    
    let currentInput = '';
    let calculationHistory = [];

    // Create a shadow element for the cursor
    const cursor = document.createElement('div');
    cursor.className = 'cursor-shadow';
    document.body.appendChild(cursor);

    // Create stars in the background
    function createStar() {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;

        // Random animation
        const animationDuration = Math.random() * 5 + 5;
        star.style.animation = `move ${animationDuration}s linear infinite`;

        starContainer.appendChild(star);
    }

    for (let i = 0; i < numberOfStars; i++) {
        createStar();
    }

    // Update cursor position
    document.addEventListener('mousemove', function (e) {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    });

    // Toggle History Panel visibility
    historyButton.addEventListener('click', function () {
        historyPanel.style.display = historyPanel.style.display === 'block' ? 'none' : 'block';
    });

    // Clear history using the new button
    clearHistoryButton.addEventListener('click', function () {
        calculationHistory = [];
        fullHistory.innerHTML = '';
    });

    // Handle button clicks
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.getAttribute('data-value');
            handleInput(value);
        });
    });

    // Handle keyboard input
    document.addEventListener('keydown', function (e) {
        if (e.key.match(/[0-9\/*\-+.%]/)) {
            handleInput(e.key);
        } else if (e.key === 'Enter') {
            handleInput('=');
        } else if (e.key === 'Backspace') {
            handleInput('Backspace');
        } else if (e.key === 'Escape') {
            handleInput('C');
        }
    });

    // Function to handle calculator input
    function handleInput(input) {
        if (input === 'C') {
            currentInput = '';
            display.value = currentInput;
        } else if (input === 'Backspace') {
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
        } else if (input === '=') {
            calculateResult();
        } else {
            currentInput += input;
            display.value = currentInput;
        }
        updateCaretPosition();
    }

    // Function to calculate the result
    function calculateResult() {
        try {
            const sanitizedInput = currentInput.replace(/[^-()\d/*+.]/g, '');
            if (sanitizedInput) {
                const result = Function('"use strict";return (' + sanitizedInput + ')')();
                if (result === Infinity || result === -Infinity) {
                    throw new Error("Divide by zero");
                }
                calculationHistory.push(currentInput + ' = ' + result);
                fullHistory.innerHTML = calculationHistory.join('<br>');
                currentInput = result.toString();
                display.value = currentInput;
            }
        } catch (error) {
            if (error.message === "Divide by zero") {
                display.value = "Cannot divide by zero";
            } else {
                display.value = 'Error';
            }
            currentInput = '';
        }
    }

    // Function to update caret position
    function updateCaretPosition() {
        const caret = document.querySelector('.caret');
        const displayWidth = display.offsetWidth;
        const textWidth = display.scrollWidth;
        const caretWidth = caret.offsetWidth;

        caret.style.left = `${displayWidth - caretWidth}px`;
        caret.style.top = `calc(50% - ${caret.offsetHeight / 2}px)`;
    }

    // Initial caret position setup and attach to input event
    updateCaretPosition();
    document.addEventListener('input', updateCaretPosition);

    function typeWriter(text, i) {
        if (i < text.length) {
            title.innerHTML += text.charAt(i);
            setTimeout(function() {
                typeWriter(text, i + 1);
            }, 100);
        }
    }

    typeWriter(titleText, 0);
});
