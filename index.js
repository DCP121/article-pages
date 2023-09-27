$(document).ready(function() {
    // Create a div container with the id "app"
    const $app = $('#app');

    // Define a CSS class for the container
    const containerClass = 'image-container';

    // Function to display a responsive image with a specific CSS class
    function displayResponsiveImage($parent, imagePath, containerClass) {
        // Create a container div for the image
        const $imageContainer = $('<div>').addClass(containerClass).css('width', 'auto');

        // Create an image element
        const $imageElement = $('<img>').attr('src', imagePath);

        // Append the image to the container
        $imageContainer.append($imageElement);

        // Append the container to the parent
        $parent.append($imageContainer);

        // Return the image container for further manipulation if needed
        return $imageContainer;
    }

    // Create a div for the first image and add it to the main app container
    const $firstImageContainer = $('<div>');
    displayResponsiveImage($firstImageContainer, 'https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/comment-topbanner.jpg', containerClass);
    $app.append($firstImageContainer);

    // Create a div with the class "d-flex" for the second image and h1 tag
    const $flexContainer = $('<div>').addClass('d-flex');

    // Example usage for the second image:
    // Use the imported image path 'comment-logo.png' as the second parameter,
    // and provide the container CSS class.
    displayResponsiveImage($flexContainer, 'https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/comment-logo.png', containerClass);

    // Create an h1 tag with the content "Israel Today"
    const $h1Element = $('<h1>').text('اهلا وسهلا').css({
        'font-family': 'Open Sans',
        'font-size': '86px',
        'font-weight': '300',
        'line-height': '117px',
        'letter-spacing': '0em',
        'text-align': 'right',
        'color': '#EB5757'
    });

    // Append the h1 tag to the flex container
    $flexContainer.append($h1Element);

    // Append the flex container to the main app container
    $app.append($flexContainer);

    // Apply flex properties to the flex container
    $flexContainer.css({
        'display': 'flex',
        'flex-direction': 'row',
        'justify-content': 'space-between'
    });

    // Add margin to the main div horizontally
    $app.css({
        'margin-left': '40px',
        'margin-right': '40px'
    });

    // Add margin to the second div vertically
    $flexContainer.css({
        'margin-top': '30px',
        'margin-bottom': '30px'
    });

    // Responsive adjustments using media queries
    // Adjust margins and flex direction for smaller screens
    function handleMediaQueryChange(e) {
        if (e.matches) {
            // For screens narrower than 768px
            $app.css({
                'margin-left': '20px',
                'margin-right': '20px'
            });
            $flexContainer.css({
                'margin-top': '20px',
                'margin-bottom': '20px',
                'flex-direction': 'column'
            });
            $firstImageContainer.find('img').css('max-width', '100%');
            $flexContainer.find('img').css('max-width', '100%');
        } else {
            // Reset to the original styles for wider screens
            $app.css({
                'margin-left': '150px',
                'margin-right': '150px'
            });
            $flexContainer.css({
                'margin-top': '30px',
                'margin-bottom': '30px',
                'flex-direction': 'row'
            });
            $firstImageContainer.find('img').css('max-width', '100%');
            $flexContainer.find('img').css('max-width', '100%');
        }
    }

    // Define the media query based on screen width
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    // Initial check for the media query and add a listener for changes
    handleMediaQueryChange(mediaQuery);
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Create the div element for the comment section
    const $mainDivForCommentSection = $('<div>').attr('id', 'comment-section').css({
        'display': 'flex',
        'flex-direction': 'column',
        'align-items': 'flex-start',
        'width': '75%',
        'height': '100%',
        'margin-left': '150px',
        'margin-right': '150px'
    });

    // Create the divider (horizontal line) div
    const $divider = $('<div>').css({
        'width': '100%',
        'border-top': '1px solid #000',
        'margin-top': '10px'
    });

    // Create buttons div
    const $buttonsDiv = $('<div>').css({
        'display': 'flex',
        'align-self': 'flex-start',
        'width': '100%'
    });

    // Create buttons and add styles
    const $button1 = $('<button>').text('Button 1').css({
        'background-color': 'cornflowerblue',
        'padding': '10px',
        'margin-right': '10px',
        'margin-top': '10px',
        'border-radius': '10%',
        'border': 'none'
    });

    const $button2 = $('<button>').text('Button 2').css({
        'background-color': 'cornflowerblue',
        'padding': '10px',
        'margin-right': '10px',
        'margin-top': '10px',
        'border-radius': '10%',
        'border': 'none'
    });

    // Create the text name element
    const $textName = $('<div>').text('John Doe').css({
        'align-self': 'flex-end',
        'margin-left': 'auto',
        'font-weight': 'bold',
        'font-size': '20px',
        'line-height': '2'
    });

    // Append the elements to the main div
    $mainDivForCommentSection.append($divider);
    $mainDivForCommentSection.append($buttonsDiv);
    $buttonsDiv.append($button1);
    $buttonsDiv.append($button2);
    $buttonsDiv.append($textName);

    // Create the first child div (comment section)
    const $commentSectionDiv = $('<div>').css({
        'display': 'flex',
        'flex-direction': 'row',
        'width': '100%',
        'padding-top': '15px'
    });

    // Create the input field and button
    const $commentButton = $('<button>').text('Post').css({
        'width': '200px',
        'background-color': 'crimson',
        'border': 'none'
    });

    const $commentInput = $('<input>').attr({
        'type': 'text',
        'placeholder': 'Add a comment'
    }).css('width', '60%');

    // Create element under the logo
    const $subHeader = $('<div>').text('حلبة رد مشترك لاتحاد الأمروى وإسرائيل صوتك في الشرق الأوسط الجديد').css({
        'font-size': '26px',
        'font-weight': '300',
        'line-height': '35px',
        'letter-spacing': '0em',
        'text-align': 'right',
        'color': '#828282'
    });

    // Create the second child div (user image)
    const $userImageDiv = $('<div>');
    const $userImage = $('<img>').attr('src', 'https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/ei_user.png').attr('alt', 'User Image').css({
        'width': '50px',
        'height': '50px',
        'margin-left': 'auto'
    });

    // Append the elements to their respective parent divs
    $commentSectionDiv.append($commentButton);
    $commentSectionDiv.append($commentInput);
    $userImageDiv.append($userImage);
    $commentSectionDiv.append($userImageDiv);
    $app.append($subHeader);
    $mainDivForCommentSection.append($commentSectionDiv);

    // Append the div to the document body or another container
    $('body').append($mainDivForCommentSection);

    // Create a modal in jQuery and add it to the body
    const $modal = $('<div>').addClass('modal').css({
        'display': 'none',
        'position': 'fixed',
        'top': '0',
        'left': '0',
        'width': '100%',
        'height': '100%',
        'background-color': 'rgba(0,0,0,0.4)',
        'z-index': '1'
    });

    const $modalContent = $('<div>').addClass('modal-content, row').css({
        'background-color': '#fff',
        'margin': 'auto',
        // 'padding': '20px',
        'width': '50%',
        'text-align': 'center',
        'margin-top': '100px',
        'display': 'flex',
        'justify-content': 'center'
    });
    $modalContent.css({
        'position': 'relative'
    });
    // Create the child div for the login form
    const $loginForm = $('<div>').css({
        'flex': '1',
        'padding': '20px 60px'
    });

const $loginHeader = $('<h2>').text('Login Form');

// Create a new element for the red text line
const $redText = $('<p>').text('To comment you need to login').css({
    'color': 'red',
    'margin-top': '5px', // Adjust margin if needed
});

// Append the login header and red text elements to the login form
$loginForm.append($loginHeader);

    // Create the email input field
    const $emailInput = $('<input>')
        .attr('type', 'email') // Set the input type to email
        .addClass('custom-input')
        .css({
            'margin-top': '10px',
            'width': '100%',
            'height': '40px',
            'background-color': '#F6F5F5',
            'position': 'relative',
            'border': 'none',
            'padding-right': '10px', // Adjust right padding for the input
            'text-align': 'right', // Align text to the right
            "margin-top" : "15px",
            "margin-bottom" : "10px",
        })
        .attr('placeholder', 'Email')
        .on('focus', function() {
            // Change the placeholder text color when input is focused
            $(this).css('color', '#333');
        })
        .on('blur', function() {
            // Restore the placeholder text color when input is blurred
            if ($(this).val() === '') {
                $(this).css('color', '#999');
            }
        });

    // Create a container div for the password input and show/hide toggle button
    const $passwordContainer = $('<div>').css({
        'display': 'flex',
        'align-items': 'center',
        'margin-top': '10px',
    });

    // Create the password input field
    const $passwordInput = $('<input>')
        .attr('type', 'password') // Set the input type to password
        .addClass('custom-input')
        .attr('id', 'passwordField')
        .css({
            'width': '100%', // Adjust input width
            'height': '40px',
            'background-color': '#F6F5F5',
            'position': 'relative',
            'border': 'none',
            'padding-right': '10px', // Adjust right padding for the input
            'text-align': 'right', // Align text to the right
            "margin-top" : "10px",
            "margin-bottom" : "10px",
        })
        .attr('placeholder', 'Password')
        .on('focus', function() {
            // Change the placeholder text color when input is focused
            $(this).css('color', '#333');
        })
        .on('blur', function() {
            // Restore the placeholder text color when input is blurred
            if ($(this).val() === '') {
                $(this).css('color', '#999');
            }
        });

    // Create an icon for show/hide password functionality
    const $showPasswordToggle = $('<i>').addClass('far fa-eye').css({
        'font-size': '24px', // Adjust the icon size
        'color': '#999', // Set the initial icon color
        'cursor': 'pointer',
        'margin-left': '5px', // Adjust margin between input and icon
    });

    // Toggle the password field between text and password type
    $showPasswordToggle.click(function() {
        const $passwordField = $('#passwordField');
        const fieldType = $passwordField.attr('type');
        if (fieldType === 'password') {
            $passwordField.attr('type', 'text');
            $(this).removeClass('fa-eye').addClass('fa-eye-slash'); // Change the icon to hide
        } else {
            $passwordField.attr('type', 'password');
            $(this).removeClass('fa-eye-slash').addClass('fa-eye'); // Change the icon to show
        }
    });

    const $loginButton = $('<button>').text('Login').css({'margin-top':'10px', "width": "100%","padding" : "5px 10px","background": "#E8505B", "border": "none", 'outline':'none', "color": "white","margin-top" : "10px","margin-bottom" : "10px",
});
// Create a section for other options
const $otherOptionsSection = $('<div>').css({
    'width': '100%',
    'text-align': 'center',
    'margin-top': '10px',
});

// Create the horizontal rule for the section
const $horizontalRule = $('<hr>').css({
    'border': 'none',
    'border-top': '1px solid #999',
    'margin': '0',
});


// Create the text for the section
const $otherOptionsText = $('<p>').text('Other options').css({
    'background-color': '#F6F5F5',
    'padding': '0 10px',
    "margin-top" : "10px",
    "margin-bottom" : "10px",
});

    // Append login form elements to the login form div
    $loginForm.append($loginHeader);
    $loginForm.append($redText);
    $loginForm.append($emailInput); // Append email input
    $passwordContainer.append($passwordInput); // Append password input to the container
    $passwordContainer.append($showPasswordToggle); // Append show/hide password icon to the container
    $loginForm.append($passwordContainer); // Append the container to the login form
    $loginForm.append($loginButton);
    $loginForm.append($otherOptionsSection);
    $otherOptionsSection.append($horizontalRule);
    $otherOptionsSection.append($otherOptionsText);


    // Create the "Forgot password?" link with red text
    const $forgotPasswordLink = $('<p>').text('Forgot password?').css({
        'color': 'red',
        'text-align': 'center',
        'cursor': 'pointer',
        "margin-top" : "10px",
        "margin-bottom" : "10px",
    }).click(function() {
    // Add functionality to handle "Forgot password?" click here
    // For example, you can show a password recovery form or trigger an action.
});
    $loginForm.append($forgotPasswordLink)
    const $registerLink = $('<p>').css({
         "margin-top" : "10px",
        "margin-bottom" : "10px",
        'text-align': 'center',
        });

// Create the "Don’t have an account?" text and make it black
$registerLink.append("Don’t have an account? ");
const $registerSpan = $('<span>').text('Register').css({
    'color': 'red',
    'cursor': 'pointer'
}).click(function() {
    // Add functionality to handle "Register" click here
    // For example, you can show a registration form or trigger an action.
});

// Append the "Register" text to the existing paragraph
$registerLink.append($registerSpan);
// Create the footer image below the form
const $footerImage = $('<img>').attr('src', 'https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/comment-logo.png').css({
    'width': '155.07px',
    'height': '20px',
    'margin-top': '20px', // Adjust margin as needed
});

// Append the footer image to the modal content

$loginForm.append($registerLink);
$loginForm.append($footerImage);

    // Create the child div for the image
    const $imageDiv = $('<div>').css({
        'flex': '1',
        "height": "auto",
        "width": "100%"
    });

    // Create an image element
    const $image = $('<img>').attr('src', 'https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/authentication-image.jpg').css({
        'width': '100%',
        'height': '100%'
    });

    // Append the image to the image div
    $imageDiv.append($image);

    // Append the login form and image divs to the modal content
    $modalContent.append($loginForm);
    $modalContent.append($imageDiv);

    // Create a close button for the modal
    // const $modalClose = $('<span>').text('×').css({
    //     'color': '#aaa',
    //     'float': 'right',
    //     'font-size': '28px',
    //     'font-weight': 'bold',
    //     'cursor': 'pointer'
    // }).click(function() {
    //     $modal.css('display', 'none');
    // });
    const $modalClose = $('<span>').html('&times;').addClass('modal-close').click(function() {
        $modal.css('display', 'none');
    });
    $modalClose.css({
        'color': '#aaa',
        'position': 'absolute',
        'top': '10px',
        'right': '10px',
        'font-size': '28px',
        'font-weight': 'bold',
        'cursor': 'pointer',
        'background-color': '#fff',
        'padding': '0px 10px',
        'border-radius': '0%'
    });
    // Append the close button to the modal content
    $modalContent.append($modalClose);

    // Append the modal content to the modal
    $modal.append($modalContent);

    // Append the modal to the body
    $('body').append($modal);

    // Open the modal when Button 1 is clicked
    $button1.click(function() {
        $modal.css('display', 'block');
    });
});
