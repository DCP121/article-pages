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
            const $subHeader = $('<div>').text('حلبة رد مشترك لاتحاد الأمروى وإسرائيل صوتك فى الشرق الأوسط الجديد').css({
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
        });
