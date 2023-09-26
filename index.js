document.addEventListener('DOMContentLoaded', function () {
    // Create a div container with the id "app"
    const app = document.getElementById('app');

    // Define a CSS class for the container
    const containerClass = 'image-container';

    // Function to display a responsive image with a specific CSS class
    function displayResponsiveImage(parent, imagePath, containerClass) {
        // Create a container div for the image
        const imageContainer = document.createElement('div');
        imageContainer.classList.add(containerClass);
        imageContainer.style.width = 'auto'; // Set the width to auto to fit the image

        // Create an image element
        const imageElement = document.createElement('img');
        imageElement.src = imagePath;


        // Append the image to the container
        imageContainer.appendChild(imageElement);

        // Append the container to the parent
        parent.appendChild(imageContainer);

        // Return the image container for further manipulation if needed
        return imageContainer;
    }

    // Create a div for the first image and add it to the main app container
    const firstImageContainer = document.createElement('div');
    displayResponsiveImage(firstImageContainer, 'assets/mainImg.png', containerClass);
    app.appendChild(firstImageContainer);

    // Create a div with the class "d-flex" for the second image and h1 tag
    const flexContainer = document.createElement('div');
    flexContainer.classList.add('d-flex'); // Add Bootstrap's d-flex class

    // Example usage for the second image:
    // Use the imported image path 'comment-logo.png' as the second parameter,
    // and provide the container CSS class.
    displayResponsiveImage(flexContainer, 'https://ibb.co/fYYDQwH', containerClass);

    // Create an h1 tag with the content "Israel Today"
    const h1Element = document.createElement('h1');
    h1Element.textContent = 'Israel Today';

    // Append the h1 tag to the flex container
    flexContainer.appendChild(h1Element);

    // Append the flex container to the main app container
    app.appendChild(flexContainer);

    // Apply flex properties to the flex container
    flexContainer.style.display = 'flex';
    flexContainer.style.flexDirection = 'row'; // Horizontal flex layout
    flexContainer.style.justifyContent = 'space-between'; // Space between the elements

    // Add margin to the main div horizontally
    app.style.marginLeft = '40px';
    app.style.marginRight = '40px';

    // Add margin to the second div vertically
    flexContainer.style.marginTop = '30px';
    flexContainer.style.marginBottom = '30px';

    // Responsive adjustments using media queries
    // Adjust margins and flex direction for smaller screens
    function handleMediaQueryChange(e) {
        if (e.matches) {
            // For screens narrower than 768px
            app.style.marginLeft = '20px';
            app.style.marginRight = '20px';
            flexContainer.style.marginTop = '20px';
            flexContainer.style.marginBottom = '20px';
            flexContainer.style.flexDirection = 'column'; // Stack elements vertically
            // Set a maximum width relative to the screen width for the images
            firstImageContainer.querySelector('img').style.maxWidth = '100%';
            flexContainer.querySelector('img').style.maxWidth = '100%';
        } else {
            // Reset to the original styles for wider screens
            app.style.marginLeft = '150px';
            app.style.marginRight = '150px';
            flexContainer.style.marginTop = '30px';
            flexContainer.style.marginBottom = '30px';
            flexContainer.style.flexDirection = 'row'; // Horizontal flex layout
            // Reset the maximum width for the images
            firstImageContainer.querySelector('img').style.maxWidth = '100%';
            flexContainer.querySelector('img').style.maxWidth = '100%';
        }
    }

    // Define the media query based on screen width
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    // Initial check for the media query and add listener for changes
    handleMediaQueryChange(mediaQuery);
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Create the div element for the comment section
    let mainDivForCommentSection = document.createElement('div');
    mainDivForCommentSection.id = 'comment-section';

    mainDivForCommentSection.style.display = 'flex'; // Enable flex layout
    mainDivForCommentSection.style.flexDirection = 'column'; // Arrange items vertically
    mainDivForCommentSection.style.alignItems = 'flex-start'; // Align items to the left

    // Add styles to the div
    mainDivForCommentSection.style.width = '75%';
    mainDivForCommentSection.style.height = '100%';
    mainDivForCommentSection.style.marginLeft = '150px';
    mainDivForCommentSection.style.marginRight = '150px';

    // Create the divider (horizontal line) div
    let divider = document.createElement('div');
    divider.style.width = '100%'; // Width 100%
    divider.style.borderTop = '1px solid #000'; // Horizontal line style
    divider.style.marginTop = '10px'; // Optional margin

    // Create buttons div
    let buttonsDiv = document.createElement('div');
    buttonsDiv.style.display = 'flex'; // Enable flex layout
    buttonsDiv.style.alignSelf = 'flex-start'; // Arrange buttons horizontally
    buttonsDiv.style.width = '100%'; // Width 100%

    // Create buttons and add styles
    let button1 = document.createElement('button');
    button1.textContent = 'Button 1';
    button1.style.backgroundColor = 'cornflowerblue';
    button1.style.padding = '10px';
    button1.style.marginRight = '10px';
    button1.style.marginTop = '10px';
    button1.style.borderRadius = '10%';
    button1.style.border = 'none';

    let button2 = document.createElement('button');
    button2.textContent = 'Button 2';
    button2.style.backgroundColor = 'cornflowerblue';
    button2.style.padding = '10px';
    button2.style.marginRight = '10px';
    button2.style.marginTop = '10px';
    button2.style.borderRadius = '10%';
    button2.style.border = 'none';

    // Create the text name element
    let textName = document.createElement('div');
    textName.textContent = 'John Doe'; // Replace with the desired text
    textName.style.alignSelf = 'flex-end';
    textName.style.marginLeft = 'auto';
    textName.style.fontWeight = 'bold';
    textName.style.fontSize = '20px';
    textName.style.lineHeight = '2';

    // Append the elements to the main div
    mainDivForCommentSection.appendChild(divider);
    mainDivForCommentSection.appendChild(buttonsDiv);
    buttonsDiv.appendChild(button1);
    buttonsDiv.appendChild(button2);
    buttonsDiv.appendChild(textName);

    // Create the first child div (comment section)
    let commentSectionDiv = document.createElement('div');
    commentSectionDiv.style.display = 'flex'; // Enable flex layout
    commentSectionDiv.style.flexDirection = 'row'; // Arrange items horizontally
    commentSectionDiv.style.width = '100%';
    commentSectionDiv.style.paddingTop = '15px';

    // Create the input field and button
    let commentButton = document.createElement('button');
    commentButton.textContent = 'Post';
    commentButton.style.width = '200px';
    commentButton.style.backgroundColor = 'crimson';
    commentButton.style.border = 'none';

    let commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Add a comment'; // Input placeholder
    commentInput.style.width = '60%';

    // create element under logo

    let subHeader = document.createElement("div");
    subHeader.textContent = "حلبة رد مشترك لاتحاد الأمروى وإسرائيل صوتك فى الشرق الأوسط الجديد"
    subHeader.style.position = 'relative'
    subHeader.style.float = 'right'

    // Create the second child div (user image)
    let userImageDiv = document.createElement('div');
    let userImage = document.createElement('img');
    userImage.src = 'assets/ei_user.png'; // Replace with the URL of the user's image
    userImage.alt = 'User Image';
    userImage.style.width = '50px';
    userImage.style.height = '50px';

    userImageDiv.style.marginLeft = 'auto';



    // Append the elements to their respective parent divs
    commentSectionDiv.appendChild(commentButton);
    commentSectionDiv.appendChild(commentInput);
    userImageDiv.appendChild(userImage);
    commentSectionDiv.appendChild(userImageDiv);
app.appendChild(subHeader)
    mainDivForCommentSection.appendChild(commentSectionDiv);

    // Append the div to the document body or another container
    document.body.appendChild(mainDivForCommentSection);
});
