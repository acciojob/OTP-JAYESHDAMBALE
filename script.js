//your JS code here. If required.
//your JS code here. If required.
 const codes = document.querySelectorAll('.code');

        // Focus on first input on page load
        codes[0].focus();

        codes.forEach((code, idx) => {
            code.addEventListener('keydown', (e) => {
                // Handle backspace
                if (e.key === 'Backspace') {
                    // If current field has content, clear it
                    if (code.value !== '') {
                        code.value = '';
                    } 
                    // If current field is empty, move to previous field and clear it
                    else if (idx > 0) {
                        codes[idx - 1].focus();
                        codes[idx - 1].value = '';
                    }
                    e.preventDefault();
                }
            });

            code.addEventListener('input', (e) => {
                const value = e.target.value;
                
                // Only allow numbers
                if (value && !/^[0-9]$/.test(value)) {
                    e.target.value = '';
                    return;
                }

                // Move to next field if current field has a value
                if (value && idx < codes.length - 1) {
                    codes[idx + 1].focus();
                }
            });

            // Handle paste event
            code.addEventListener('paste', (e) => {
                e.preventDefault();
                const pastedData = e.clipboardData.getData('text').trim();
                
                // Only process if pasted data contains only digits
                if (/^\d+$/.test(pastedData)) {
                    const digits = pastedData.split('').slice(0, codes.length - idx);
                    
                    digits.forEach((digit, i) => {
                        if (idx + i < codes.length) {
                            codes[idx + i].value = digit;
                        }
                    });

                    // Focus on next empty field or last field
                    const nextEmptyIndex = Math.min(idx + digits.length, codes.length - 1);
                    codes[nextEmptyIndex].focus();
                }
            });

            // Select content on focus for easier editing
            code.addEventListener('focus', (e) => {
                e.target.select();
            });
        });

        function verifyCode() {
            const code = Array.from(codes).map(input => input.value).join('');
            
            if (code.length === 6) {
                alert(`Verifying code: ${code}`);
                // Here you would typically send the code to your backend for verification
            } else {
                alert('Please enter all 6 digits');
            }
        }

