// Function to load CSS stylesheets dynamically
function loadCSS(url) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
}

// Function to load scripts dynamically
function loadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.onload = callback;
    document.head.appendChild(script);
}

// Load CSS stylesheets
loadCSS("https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css");
loadCSS("https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css");

// Load JavaScript libraries
loadScript("https://code.jquery.com/jquery-3.6.0.min.js", function () {
    // jQuery has been loaded, now load other scripts
    loadScript("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", function () {
        // axios has been loaded, now load DataTables
        loadScript("https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js", function () {
            // DataTables has been loaded, now load Google API
            loadScript("https://apis.google.com/js/api.js", function () {
                // Google API has been loaded, you can now use jQuery, axios, DataTables, and Google API
                $(document).ready(function () {

                    // Create a div container with the id "app"
                    const $app = $('#app');
                    const containerClass = "image-container";
                    //api for comment listing pages 
                    let commentlistingdata;
                    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDFjNDE1Yzk2MTZkMTM1YmEzOTZmMSIsInNpdGUiOiJpc3JhZWxCYWNrT2ZmaWNlIiwiaWF0IjoxNjk2NDgyMTg5LCJleHAiOjE2OTY1Njg1ODl9.cxKYnLi7tJIZjIMrr6ZRAnY_wdj8rzkj6ZhMP8OSPbY'
                    $.ajax({
                        url: ' http://137.184.19.129:4002/api/v1/artical-page/articalPage?pageId=65098ac7dfc16014091b766f&userId=650be9d87b17d73c9b2c94ae', // Replace with your API endpoint
                        method: 'POST',
                        dataType: 'json',
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": 'application/json'
                        },

                        success: function (data) {
                            // The data variable now holds the fetched data
                            commentlistingdata = data;
                            console.log('Fetched Data:', commentlistingdata);

                            // You can use the data in subsequent operations or functions
                            processData(commentlistingdata);
                        },
                        error: function (xhr, status, error) {
                            console.error('Error fetching data:', error);
                        }
                    });

                    function processData(xyz) {
                        console.log(xyz)
                        console.log(commentlistingdata.data.pageData)
                        function displayResponsiveImage($parent, imagePath, containerClass) {
                            // Create a container div for the image
                            const $imageContainer = $("<div>")
                                .addClass(containerClass)
                                .css("width", "auto");

                            // Create an image element
                            const $imageElement = $("<img>").attr("src", imagePath);

                            // Append the image to the container
                            $imageContainer.append($imageElement);

                            // Append the container to the parent
                            $parent.append($imageContainer);

                            // Return the image container for further manipulation if needed
                            return $imageContainer;
                        }

                        // Create a div for the first image and add it to the main app container
                        const $firstImageContainer = $("<div>");
                        console.log(commentlistingdata, "fdsfdsdfdf");
                        displayResponsiveImage(
                            $firstImageContainer,
                            `http://137.184.19.129:4002/${commentlistingdata?.data?.pageData?.top_banner_image}`,
                            containerClass
                        );
                        $app.append($firstImageContainer);

                        // Create a div with the class "d-flex" for the second image and h1 tag
                        const $flexContainer = $("<div>").addClass("d-flex");

                        // Example usage for the second image:
                        // Use the imported image path 'comment-logo.png' as the second parameter,
                        // and provide the container CSS class.
                        displayResponsiveImage(
                            $flexContainer,
                            `http://137.184.19.129:4002/${commentlistingdata?.data?.pageData?.logo_image}`,
                            containerClass
                        );

                        // Create an h1 tag with the content "Israel Today"
                        const $h1Element = $("<h1>").text(commentlistingdata?.data?.pageData?.top_title).css({
                            "font-family": "Open Sans",
                            "font-size": "86px",
                            "font-weight": "300",
                            "line-height": "117px",
                            "letter-spacing": "0em",
                            "text-align": "right",
                            color: "#EB5757",
                        });

                        // Append the h1 tag to the flex container
                        $flexContainer.append($h1Element);

                        // Append the flex container to the main app container
                        $app.append($flexContainer);

                        // Apply flex properties to the flex container
                        $flexContainer.css({
                            display: "flex",
                            "flex-direction": "row",
                            "justify-content": "space-between",
                        });

                        // Add margin to the main div horizontally
                        $app.css({
                            "margin-left": "40px",
                            "margin-right": "40px",
                        });

                        // Add margin to the second div vertically
                        $flexContainer.css({
                            "margin-top": "30px",
                            "margin-bottom": "30px",
                        });

                        // Create the div element for the comment section
                        const $mainDivForCommentSection = $("<div>")
                            .attr("id", "comment-section")
                            .css({
                                display: "flex",
                                "flex-direction": "column",
                                "align-items": "flex-start",
                                width: "75%",
                                height: "100%",
                                "margin-left": "150px",
                                "margin-right": "150px",
                            });

                        // Create the divider (horizontal line) div
                        const $divider = $("<div>").css({
                            width: "100%",
                            "border-top": "1px solid #000",
                            "margin-top": "10px",
                        });

                        // Create buttons div
                        const $buttonsDiv = $("<div>").css({
                            display: "flex",
                            "align-self": "flex-start",
                            width: "100%",
                        });

                        // Create buttons and add styles
                        var $Login = $("<button>").text("Login").css({
                            "background-color": "cornflowerblue",
                            padding: "10px",
                            "margin-right": "10px",
                            "margin-top": "10px",
                            "border-radius": "10%",
                            border: "none",
                            outline: "none",
                            color: "white",
                        });
                        $Login.hover(
                            function () {
                                // Mouse enter (hover in) - Change the background color to red
                                $(this).css({
                                    "background-color": "#457effs",
                                    "box-shadow": "5px 5px 10px rgba(0, 0, 0, 0.2)",
                                });
                            },
                            function () {
                                // Mouse leave (hover out) - Restore the original background color
                                $(this).css({
                                    "background-color": "cornflowerblue",
                                    "box-shadow": "none",
                                });
                            }
                        );
                        const $Register = $("<button>").text("Register").css({
                            "background-color": "cornflowerblue",
                            padding: "10px",
                            "margin-right": "10px",
                            "margin-top": "10px",
                            "border-radius": "10%",
                            border: "none",
                            outline: "none",
                            color: "white",
                        });

                        // Create the text name element
                        const $textName = $("<div>").text("15 Comments").css({
                            "align-self": "flex-end",
                            "margin-left": "auto",
                            "font-weight": "bold",
                            "font-size": "20px",
                            "line-height": "2",
                        });

                        // Append the elements to the main div
                        $mainDivForCommentSection.append($divider);
                        $mainDivForCommentSection.append($buttonsDiv);
                        $buttonsDiv.append($Login);
                        $buttonsDiv.append($Register);
                        $buttonsDiv.append($textName);

                        // Create the first child div (comment section)
                        const $commentSectionDiv = $("<div>").css({
                            display: "flex",
                            "flex-direction": "row",
                            width: "100%",
                            "padding-top": "15px",
                            "justify-content": "flex-end",
                            gap: "17px",
                        });

                        // Create the input field and button
                        const $commentButton = $("<button>").text("send").css({
                            width: "100px",
                            "background-color": "crimson",
                            border: "none",
                        });

                        const $commentInput = $("<input>")
                            .attr({
                                type: "text",
                                placeholder: "Add a comment",
                            })
                            .css({
                                width: "80%",
                                direction: "rtl", // Add this line to set the text direction to RTL
                            });

                        // Create element under the logo
                        const $subHeader = $("<div>")
                            .text(commentlistingdata?.data?.pageData?.sub_title)
                            .css({
                                "font-size": "26px",
                                "font-weight": "300",
                                "line-height": "35px",
                                "letter-spacing": "0em",
                                "text-align": "right",
                                color: "#828282",
                            });

                        // Create the second child div (user image)
                        const $userImageDiv = $("<div>");
                        const $userImage = $("<img>")
                            .attr(
                                "src",
                                "https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/ei_user.png"
                            )
                            .attr("alt", "User Image")
                            .css({
                                width: "50px",
                                height: "50px",
                                "margin-left": "auto",
                            });
                        $commentSectionDiv.append($commentButton);
                        $commentSectionDiv.append($commentInput);
                        $userImageDiv.append($userImage);
                        $commentSectionDiv.append($userImageDiv);
                        $app.append($subHeader);
                        $mainDivForCommentSection.append($commentSectionDiv);
                        $("body").append($mainDivForCommentSection);
                        // $mainDivForCommentSection.append($containerCommentpart)

                        //comment listing part
                        commentlistingdata.data.allCommentsData.forEach((dataItem) => {
                            console.log('mapdata', dataItem);


                            const $maincommentlistingcontainer = $("<div>").addClass("mt-3").css({
                                display: "flex",
                                "flex-direction": "column",
                                "align-items": "flex-start",
                                width: "75%",
                                height: "100%",
                                "margin-left": "150px",
                                "margin-right": "150px",
                            });
                            const $container = $("<div>")
                                .addClass("containar-fluid")
                                .css({ width: "100%" });
                            const $containerCommentpart = $("<div>")
                                .addClass("col-12 main-comment container-fluid ")
                                .css({});



                            //comment header like user name and time 
                            const $commentheadermain = $("<div>").addClass(
                                "d-flex justify-content-between"
                            );
                            const $commenttime = $("<div>").text("8 min ago").css({});
                            const $commentuser = $("<div>").text("john").css({});

                            $commentheadermain.append($commenttime, $commentuser);

                            const $middelcomentpart = $("<div>")
                                .addClass("col-md-12 d-flex justify-content-end")
                                .css({});
                            const $commentuserImage = $("<img>")
                                .addClass("ml-3")
                                .attr(
                                    "src",
                                    "https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/ei_user.png"
                                )
                                .attr("alt", "User Image")
                                .css({
                                    width: "50px",
                                    height: "50px",
                                });
                            const $paragraph = $("<p>").text("This is a sample paragraph text.").css({
                                "font-size": "14px",
                                "margin-top": "10px",
                                "text-align": "right",
                            });

                            // Append the div to the document body or another container
                            //   $sectiondiv.append($containerCommentpart)

                            const $commentDiv = $("<div>").addClass("comment-div");

                            $middelcomentpart.append($paragraph, $commentuserImage);
                            //like comment div
                            const $socialicon = $("<div>")
                                .css({})
                                .addClass("col-md-12 d-flex justify-content-end")
                                .text("comment like");

                            const $likeIcon = $("<i>").addClass("bi bi-hand-thumbs-up")
                            const $commentIcon = $("<i>").addClass("bi bi-chat")

                            // Create the "See Original Comment" button
                            const $seeOriginalCommentButton = $("<button>")
                                .text("See Original Comment")
                                .addClass("btn btn-primary");

                            // Append the icons and button to the $socialicon
                            $socialicon.append($likeIcon, $commentIcon, $seeOriginalCommentButton);
                            //append comment section all div
                            $commentDiv.append($commentheadermain, $middelcomentpart, $socialicon);

                            //relay comment display section
                            const $replaycommentdiv = $("<div>").css({}).addClass("replay-comment");
                            //middelepart pragraph and user image
                            const $middelepartreplaycommentsection = $("<div>").addClass('col-md-12 d-flex justify-content-end');
                            const $commentreplyuserImage = $("<img>")
                                .addClass("ml-3")
                                .attr(
                                    "src",
                                    "https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/ei_user.png"
                                )
                                .attr("alt", "User Image")
                                .css({
                                    width: "50px",
                                    height: "50px",
                                });
                            const $commentreplayparagraph = $("<p>").text("This is a sample paragraph text.").css({
                                "font-size": "14px",
                                "margin-top": "10px",
                                "text-align": "right",
                            });
                            $middelepartreplaycommentsection.append($commentreplayparagraph, $commentreplyuserImage);
                            //social icon div
                            const $socialiconcommentreplay = $("<div>").addClass('col-md-12 d-flex justify-content-end')
                            const $likeIconreplaycomment = $("<i>").addClass("bi bi-hand-thumbs-up").text('like')
                            const $commentIconrelaycoment = $("<i>").addClass("bi bi-chat").text('comment')
                            $socialiconcommentreplay.append($likeIconreplaycomment, $commentIconrelaycoment)
                            $replaycommentdiv.append($middelepartreplaycommentsection, $socialiconcommentreplay);


                            //replay comment input div
                            const $replycommentinputsection = $("<div>").addClass('replaycoment-input');


                            const $replaycommentButton = $("<button>").text("send").css({
                                width: "100px",
                                "background-color": "crimson",
                                border: "none",
                            });
                            const $commentreplayInput = $("<input>")
                                .attr({
                                    type: "text",
                                    placeholder: "Add a comment",
                                })
                                .css({
                                    width: "80%",
                                    direction: "rtl", // Add this line to set the text direction to RTL
                                });
                            const $commentreplayuserImage = $("<img>")
                                .attr(
                                    "src",
                                    "https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/ei_user.png"
                                )
                                .attr("alt", "User Image")
                                .css({
                                    width: "50px",
                                    height: "50px",
                                    "margin-left": "auto",
                                });
                            $replycommentinputsection.append($replaycommentButton, $commentreplayInput, $commentreplayuserImage);




                            //Append the div to the document body or another container 

                            $containerCommentpart.append($commentDiv, $replaycommentdiv, $replycommentinputsection);
                            $container.append($containerCommentpart);
                            $maincommentlistingcontainer.append($containerCommentpart);
                            $("body").append($maincommentlistingcontainer);

                        })

                        //show more comment button div

                        const $showmorecommentdiv = $('<div>').css({})

                        const $showmorecommentbutton = $("<button>").text("show more comment").css({
                            "background-color": "cornflowerblue",
                            color: "white",
                        });

                        $showmorecommentdiv.append($showmorecommentbutton);
                        $("body").append($showmorecommentdiv)
                        const $footerImage = $('<img>').attr('src', 'https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/comment-logo.png').css({
                            'width': '155.07px',
                            'height': '20px',
                            'margin-top': '20px', // Adjust margin as needed
                        });


                        // Create the child div for the login form
                        const $loginForm = $('<div>').css({
                            'flex': '1',
                            'padding': '20px 60px',
                            'display': 'none'
                        });
                        const $ApierrorLogin = $('<div>').css({
                            'display': 'none',
                            'color': 'red',
                            'margin-top': '5px',
                        });
                        const $loginHeader = $('<h2>').text('Login Form');

                        // Create a new element for the red text line
                        const $redText = $('<p>').text('To comment you need to login').css({
                            'color': 'red',
                            'margin-top': '5px', // Adjust margin if needed
                        });

                        // Append the login header and red text elements to the login form
                        $loginForm.append($loginHeader);
                        const $emptyFieldErrorLogin = $('<div>')
                            .css({
                                'color': 'red',
                                'text-align': 'right',
                                'display': 'none',
                                'font-size': "14px"
                            })
                            .text('Please enter your email address');
                        const $emptyFieldErrorLoginPass = $('<div>')
                            .css({
                                'color': 'red',
                                'text-align': 'right',
                                'display': 'none',
                                'font-size': "14px"
                            })
                            .text('Please enter your Password');
                        // Create the email input field
                        const $emailInput = $('<input>')
                            .attr('type', 'email') // Set the input type to email
                            .attr('id', 'emailInput') // Add an ID here
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
                                "margin-top": "15px",
                                "margin-bottom": "10px",
                            }).keydown(function (event) {
                                if (event.keyCode == 32) {
                                    event.preventDefault();
                                }
                            })
                            .attr('placeholder', 'Email')
                            .on('focus', function () {
                                // Change the placeholder text color when input is focused
                                $(this).css('color', '#333');
                            })
                            .on('input', function () {
                                const email = $(this).val();
                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                // Check if the email is valid
                                if (!emailRegex.test(email)) {
                                    $errorElementLogin.css('display', 'block');
                                    $emptyFieldErrorLogin.css('display', 'none');

                                } else {
                                    $errorElementLogin.css('display', 'none');
                                }
                                if (email.trim() === "") {
                                    $emptyFieldErrorLogin.css('display', 'block')
                                    $errorElementLogin.css('display', 'none');
                                } else {
                                    $emptyFieldErrorLogin.css('display', 'none');
                                }
                            });

                        // Create a container div for the password input and show/hide toggle button
                        const $passwordContainer = $('<div>').css({
                            'align-items': 'center',
                            'margin-top': '10px',
                        });
                        var errorTextPass = 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character';
                        var $errorElementPass = $('<div>').css({
                            'color': 'red',
                            'text-align': 'right',
                            'display': 'none',
                            'font-size': "14px"
                        }).text(errorTextPass);
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
                                "margin-top": "10px",
                                "margin-bottom": "10px",
                            }).keydown(function (event) {
                                if (event.keyCode == 32) {
                                    event.preventDefault();
                                }
                            })
                            .attr('placeholder', 'Password')
                            .on('focus', function () {
                                // Change the placeholder text color when input is focused
                                $(this).css('color', '#333');
                            })
                            .on('blur', function () {
                                // Restore the placeholder text color when input is blurred
                                if ($(this).val() === '') {
                                    $(this).css('color', '#999');
                                }
                            })
                            .on('input', function () {
                                const password = $(this).val();

                                if (password.trim() === '') {
                                    $emptyFieldErrorLoginPass.css('display', 'block')
                                }
                                else {
                                    $emptyFieldErrorLoginPass.css('display', 'none')
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
                        $showPasswordToggle.click(function () {
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

                        const $loginButton = $('<button>').text('Login').css({
                            'margin-top': '10px', "width": "100%", "padding": "5px 10px", "background": "#E8505B", "border": "none", 'outline': 'none', "color": "white", "margin-top": "10px", "margin-bottom": "10px",
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
                            "margin-top": "10px",
                            "margin-bottom": "10px",
                        });
                        const errorTextEmailLogin = 'Please enter a valid email';
                        const $errorElementLogin = $('<div>').css({
                            'color': 'red',
                            'text-align': 'right',
                            'display': 'none',
                            'font-size': "14px"
                        }).text(errorTextEmailLogin);
                        // Append login form elements to the login form div
                        $loginForm.append($loginHeader);
                        $loginForm.append($redText);
                        $loginForm.append($ApierrorLogin)
                        $loginForm.append($emailInput); // Append email input
                        $loginForm.append($errorElementLogin);
                        $loginForm.append($emptyFieldErrorLogin)
                        $passwordContainer.append($passwordInput); // Append password input to the container
                        $passwordContainer.append($emptyFieldErrorLoginPass)
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
                            "margin-top": "10px",
                            "margin-bottom": "10px",
                        }).click(function () {
                            // Add functionality to handle "Forgot password?" click here  $loginForm.css('display', 'none');
                            $loginForm.css('display', 'none')
                            $ForgotPassForm.css('display', 'block');
                            $emptyFieldErrorLoginPass.css('display', 'none')
                            $emptyFieldErrorForgot.css('display', 'none')
                        });
                        $loginForm.append($forgotPasswordLink)
                        const $registerLink = $('<p>').css({
                            "margin-top": "10px",
                            "margin-bottom": "10px",
                            'text-align': 'center',
                        });

                        // Create the "Don’t have an account?" text and make it black
                        $registerLink.append("Don’t have an account? ");
                        const $registerSpan = $('<span>').text('Register').css({
                            'color': 'red',
                            'cursor': 'pointer'
                        }).click(function () {
                            // Add functionality to handle "Register" click here
                            $loginForm.css('display', 'none');
                            $registrationForm.css('display', 'block');
                            FormCleaner()
                        });

                        // Append the "Register" text to the existing paragraph
                        $registerLink.append($registerSpan);
                        // Append the footer image to the modal content

                        $loginForm.append($registerLink);
                        $loginForm.append('<img src="https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/comment-logo.png" style="width: 155.07px; height: 20px; margin-top: 20px;">');
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

                        $imageDiv.append($image);

                        // Open the modal when Login is clicked
                        $Login.click(function () {
                            $registerModal.css('display', 'block');
                            $loginForm.css('display', 'block');
                        });
                        async function handleLogin() {
                            // Move these lines inside the function
                            const email = $('#emailInput').val();
                            const password = $('#passwordField').val();
                            console.log(email, password, "aaa")
                            // Validate email and password (you can add more validation here)
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                            if (email.trim() === "") {
                                $emptyFieldErrorLogin.css('display', 'block');
                                if (password.trim() === "") {
                                    $emptyFieldErrorLoginPass.css('display', 'block');
                                    return;
                                }
                                return;
                            }
                            if (!emailRegex.test(email)) {
                                $errorElementLogin.css('display', 'block');
                                return
                            }
                            if (password.trim() === "") {
                                $emptyFieldErrorLoginPass.css('display', 'block');
                                return;
                            }

                            // Prepare the payload
                            const payload = {
                                email,
                                password,
                                ip: '127.0.0.1',
                                device: 'web'
                            };

                            // Send a POST request to the login API
                            try {
                                const response = await axios('http://137.184.19.129:4002/api/v1/user/login-article-page', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(payload)
                                });


                                console.log(response); // You can replace this with your desired logic
                                if (response.status === 200) {
                                    // Close the modal if login is successful
                                    $registerModal.css('display', 'none');
                                    onClosed();
                                    FormCleaner();
                                }

                            } catch (error) {

                                console.error('Error:', error.response.data.message);
                                $ApierrorLogin.empty();
                                $ApierrorLogin.append($('<p>').text(error.response.data.message))
                                $ApierrorLogin.css('display', 'block')

                                // Handle errors here if necessary
                            }
                        }
                        // Add a click event listener to the login button
                        $loginButton.click(handleLogin);

                        // Create a registration modal
                        const $registerModal = $('<div>').addClass('modal ').css({
                            'display': 'none',
                            'position': 'fixed',
                            'top': '0',
                            'left': '0',
                            'width': '100%',
                            'height': '100%',
                            'background-color': 'rgba(0,0,0,0.4)',
                            'z-index': '1'
                        });

                        const $registerModalContent = $('<div>').addClass('modal-content row').css({
                            'background-color': '#fff',
                            'margin': 'auto',
                            'width': '60%',
                            'text-align': 'center',
                            'margin-top': '100px',
                            'display': 'flex',
                            'flex-direction': 'row', // Change to row to arrange form and image side by side
                        });

                        $registerModalContent.css({
                            'position': 'relative'
                        });
                        const $ForgotPassForm = $('<div>').css({
                            "flex": "1",
                            'padding': '20px 60px',
                            'display': 'none'
                        });
                        const $ForgotPassHeader = $('<h2>').text('Forgot password');
                        const $redTextForgotPass = $('<p>').text("Enter your email address And we will send you an email to reset").css({
                            'color': 'black',
                            'margin-top': '5px', // Adjust margin if needed
                        });
                        const $ApierrorforgotPass = $('<div>').css({
                            'display': 'none',
                            'color': 'red',
                            'margin-top': '5px',
                        });

                        const errorTextEmailForgot = 'Please enter a valid email';
                        const $errorElementForgot = $('<div>').css({
                            'color': 'red',
                            'text-align': 'right',
                            'display': 'none',
                            'font-size': "14px"
                        }).text(errorTextEmailForgot);
                        const $emptyFieldErrorForgot = $('<div>')
                            .css({
                                'color': 'red',
                                'text-align': 'right',
                                'display': 'none',
                                'font-size': "14px"
                            })
                            .text('Please enter your email address');
                        // Create the email input field
                        const $ForgotPassEmailInput = $('<input>')
                            .attr('type', 'email')
                            .addClass('custom-input')
                            .attr('id', 'registerEmailInput')
                            .css({
                                'margin-top': '10px',
                                'width': '100%',
                                'height': '40px',
                                'background-color': '#F6F5F5',
                                'position': 'relative',
                                'border': 'none',
                                'padding-right': '10px',
                                'text-align': 'right',
                                'margin-top': '15px',
                                'margin-bottom': '10px',
                            })
                            .attr('placeholder', 'Email')
                            .on('focus', function () {
                                $(this).css('color', '#333');
                            })
                            .keydown(function (event) {
                                if (event.keyCode == 32) {
                                    event.preventDefault();
                                }
                            })
                            .on('input', function () {
                                const email = $(this).val();
                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                // Check if the email is valid
                                if (!emailRegex.test(email)) {
                                    $emptyFieldErrorForgot.css('display', 'none');
                                    $errorElementForgot.css('display', 'block');
                                } else {
                                    $errorElementForgot.css('display', 'none');
                                }
                                if (email.trim() === "") {
                                    $emptyFieldErrorForgot.css('display', 'block')
                                    $errorElementForgot.css('display', 'none');
                                } else {
                                    $emptyFieldErrorForgot.css('display', 'none');
                                }
                            });


                        // Create the registration button
                        const $ForgotPassSubmit = $('<button>').text('Submit').css({
                            'margin-top': '10px',
                            'width': '100%',
                            'padding': '5px 10px',
                            'background': '#E8505B',
                            'border': 'none',
                            'outline': 'none',
                            'color': 'white',
                            'margin-top': '10px',
                            'margin-bottom': '10px',
                        }).click(async function sendForgotPasswordRequest() {
                            const emailValue = $ForgotPassEmailInput.val();
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                            // Check if the email input is empty
                            if (emailValue.trim() === '') {
                                $emptyFieldErrorForgot.css('display', 'block');
                                $errorElementForgot.css('display', 'none');
                                return;
                            }
                            if (!emailRegex.test(emailValue)) {
                                $errorElementForgot.css('display', 'block');
                                return;
                            }

                            const otpConfirmationPayload = {
                                email: emailValue,
                            };

                            try {
                                const response = await axios.post('http://172.16.0.220:3001/api/v1/user/forgot-password-article-page', otpConfirmationPayload, {
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                });
                                console.log(response, 'response')
                                if (response.status === 200) {
                                    $registerModalContent.append($ResetPassForm);
                                    $registerModalContent.append($imageDivReg);
                                    $ForgotPassForm.css('display', 'none');
                                    $ResetPassForm.css({
                                        'display': 'block',
                                        'flex': '1',
                                        'padding': '20px 60px',
                                    });
                                }
                            } catch (error) {
                                console.error('Error:', error.response.data.message);
                                $ApierrorforgotPass.empty();
                                $ApierrorforgotPass.append($('<p>').text(error.response.data.message))
                                $ApierrorforgotPass.css('display', 'block')

                            }
                        })

                        // Append the "Login" text to the existing paragraph
                        const $BackToLoginForgot = $('<p>').text('Back to Login').css({
                            'color': 'red',
                            'margin-top': '5px',
                            'cursor': 'pointer',

                        }).click(function () {
                            // Add functionality to handle "Login" click here
                            // For example, you can show the login modal or trigger an action.
                            $ForgotPassForm.css('display', 'none');
                            $registrationForm.css('display', 'none');
                            $loginForm.css('display', 'block'); // Show the login modal
                            $otpForm.css("display", 'none')
                            ErrorCleaner()
                            FormCleaner()
                        });
                        const $registerLinkForgot = $('<p>').css({
                            "margin-top": "10px",
                            "margin-bottom": "10px",
                            'text-align': 'center',
                        });

                        // Create the "Don’t have an account?" text and make it black
                        $registerLinkForgot.append("Don’t have an account? ");
                        const $registerForgotSpan = $('<span>').text('Register').css({
                            'color': 'red',
                            'cursor': 'pointer'
                        }).click(function () {
                            // Add functionality to handle "Register" click here
                            $loginForm.css('display', 'none');
                            $ForgotPassForm.css('display', 'none')
                            $registrationForm.css('display', 'block');
                            ErrorCleaner()
                            FormCleaner()
                        });
                        $registerLinkForgot.append($registerForgotSpan)
                        // Append the name input field to the registration form
                        $ForgotPassForm.append($ForgotPassHeader)
                        $ForgotPassForm.append($redTextForgotPass);
                        $ForgotPassForm.append($ApierrorforgotPass);
                        $ForgotPassForm.append($ForgotPassEmailInput);
                        $ForgotPassForm.append($errorElementForgot);
                        $ForgotPassForm.append($emptyFieldErrorForgot);
                        $ForgotPassForm.append($ForgotPassSubmit);
                        // $ForgotPassForm.append($registerOtherOptionsSection);
                        $ForgotPassForm.append($BackToLoginForgot)
                        $ForgotPassForm.append($registerLinkForgot)
                        $ForgotPassForm.append('<img src="https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/comment-logo.png" style="width: 155.07px; height: 20px; margin-top: 20px;">')
                        // Create the child div for the registration form
                        const $registrationForm = $('<div>').css({
                            'flex': '1',
                            'padding': '20px 60px',
                            'display': 'none'
                        })

                        const $registerHeader = $('<h2>').text('Register');
                        const $redTextreg = $('<p>').text("To comment you need to register").css({
                            'color': 'red',
                            'margin-top': '5px', // Adjust margin if needed
                        });
                        const $emptyFieldErrorRegisterEmail = $('<div>')
                            .css({
                                'color': 'red',
                                'text-align': 'right',
                                'display': 'none',
                                'font-size': "14px"
                            })
                            .text('Please enter your email address');
                        const $emptyFieldErrorRegisterPass = $('<div>')
                            .css({
                                'color': 'red',
                                'text-align': 'right',
                                'display': 'none',
                                'font-size': "14px"

                            })
                            .text('Please enter your password');
                        const $emptyFieldErrorRegisterName = $('<div>')
                            .css({
                                'color': 'red',
                                'text-align': 'right',
                                'display': 'none',
                                'font-size': "14px"
                            })
                            .text('Please enter your name');
                        const $registerNameInput = $('<input>')
                            .attr('type', 'text')
                            .addClass('custom-input')
                            .attr('id', 'registerNameInput')
                            .css({
                                'width': '100%',
                                'height': '40px',
                                'background-color': '#F6F5F5',
                                'position': 'relative',
                                'border': 'none',
                                'padding-right': '10px',
                                'text-align': 'right',
                                'margin-top': '10px',
                                'margin-bottom': '10px',
                            })
                            .attr('placeholder', 'Name')
                            .on('focus', function () {
                                $(this).css('color', '#333');
                            })
                            .keydown(function (event) {
                                if (event.keyCode == 32) {
                                    event.preventDefault();
                                }
                            })
                            .on('blur', function () {
                                if ($(this).val() === '') {
                                    $(this).css('color', '#999');
                                }
                            }).on('input', function () {
                                const name = $(this).val();
                                // Check if the email is valid
                                if (name.trim() !== "") {
                                    $emptyFieldErrorRegisterName.css('display', 'none')

                                } else {
                                    $emptyFieldErrorRegisterName.css('display', 'block');
                                }
                            });

                        // Create the email input field
                        const $registerEmailInput = $('<input>')
                            .attr('type', 'email')
                            .addClass('custom-input')
                            .attr('id', 'registerEmailInput')
                            .css({
                                'margin-top': '10px',
                                'width': '100%',
                                'height': '40px',
                                'background-color': '#F6F5F5',
                                'position': 'relative',
                                'border': 'none',
                                'padding-right': '10px',
                                'text-align': 'right',
                                'margin-top': '15px',
                                'margin-bottom': '10px',
                            })
                            .attr('placeholder', 'Email')
                            .on('focus', function () {
                                $(this).css('color', '#333');
                            })
                            .keydown(function (event) {
                                if (event.keyCode == 32) {
                                    event.preventDefault();
                                }
                            })
                            .on('input', function () {
                                const email = $(this).val();
                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                // Check if the email is valid
                                if (!emailRegex.test(email)) {
                                    $errorElementReg.css('display', 'block');
                                } else {
                                    $errorElementReg.css('display', 'none');
                                }
                                if (email.trim() === "") {
                                    $emptyFieldErrorRegisterEmail.css('display', 'block')
                                    $errorElementReg.css('display', 'none');
                                } else {
                                    $emptyFieldErrorRegisterEmail.css('display', 'none');
                                }
                            });

                        // Create the password input field
                        const $registerPasswordField = $('<input>')
                            .attr('type', 'password')
                            .addClass('custom-input')
                            .attr('id', 'registerPasswordField')
                            .css({
                                'width': '100%',
                                'height': '40px',
                                'background-color': '#F6F5F5',
                                'position': 'relative',
                                'border': 'none',
                                'padding-right': '10px',
                                'text-align': 'right',
                                'margin-top': '10px',
                                'margin-bottom': '10px',
                            })
                            .attr('placeholder', 'Password')
                            .on('focus', function () {
                                $(this).css('color', '#333');
                            })
                            .keydown(function (event) {
                                if (event.keyCode == 32) {
                                    event.preventDefault();
                                }
                            })
                            .on('blur', function () {
                                if ($(this).val() === '') {
                                    $(this).css('color', '#999');
                                }
                            }).on('input', function () {
                                const password = $(this).val();
                                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                                console.log(!passwordRegex.test(password), 'testing pass')
                                if (!passwordRegex.test(password)) {
                                    $errorElementPass.css("display", "block")
                                    $emptyFieldErrorRegisterPass.css('display', 'none')
                                } else {
                                    $errorElementPass.css("display", "none")
                                }
                                if (password.trim() === '') {
                                    $errorElementPass.css("display", "none")
                                    $emptyFieldErrorRegisterPass.css('display', 'block')
                                }


                            })

                        // Create the registration button
                        const $registerButton = $('<button>').text('Register').css({
                            'margin-top': '10px',
                            'width': '100%',
                            'padding': '5px 10px',
                            'background': '#E8505B',
                            'border': 'none',
                            'outline': 'none',
                            'color': 'white',
                            'margin-top': '10px',
                            'margin-bottom': '10px',
                        })

                        // Create a section for other options
                        const $registerOtherOptionsSection = $('<div>').css({
                            'width': '100%',
                            'text-align': 'center',
                            'margin-top': '10px',
                        });

                        // Create the horizontal rule for the section
                        const $registerHorizontalRule = $('<hr>').css({
                            'border': 'none',
                            'border-top': '1px solid #999',
                            'margin': '0',
                        });

                        // Create the "Already have an account?" text and make it black
                        const $registerLoginLink = $('<p>').text('').css({
                            'color': 'black',
                            'margin-top': '10px',
                            'margin-bottom': '10px',
                        });
                        // Create the "I accept the terms and conditions" text with a clickable link
                        const $registerTermsLink = $('<p>').css({
                            'color': 'black',
                            'margin-top': '10px',
                            'margin-bottom': '10px',
                        });

                        // Create the actual link element
                        const $termsLink = $('<a>')
                            .attr('href', 'https://www.example.com/terms') // Replace with your actual terms and conditions URL
                            .css({
                                'color': 'inherit', // Inherit the color from the parent (black in this case)
                                'text-decoration': 'underline', // Remove the underline
                            })
                            .text('Terms and Conditions'); // The visible link text

                        // Append the link element to the "I accept the terms and conditions" text
                        $registerTermsLink.append('I accept the ');
                        $registerTermsLink.append($termsLink);

                        // Append the "I accept the terms and conditions" text to the existing paragraph
                        $registerLoginLink.append($registerTermsLink);

                        const $registerLoginLinkRed = $('<p>').text('Do you have an account ? ').css({
                            'color': 'black',
                            'margin-top': '10px',
                            'margin-bottom': '10px',
                        });

                        // Append the "Login" text to the existing paragraph
                        const $registerLoginSpan = $('<span>').text('Login').css({
                            'color': 'red',
                            'cursor': 'pointer',

                        }).click(function () {
                            // Add functionality to handle "Login" click here
                            $loginForm.css('display', 'block');
                            $registrationForm.css('display', 'none');
                            FormCleaner()
                            ErrorCleaner()
                        });
                        const errorTextEmailReg = 'Please enter a valid email';
                        const $errorElementReg = $('<div>').css({
                            'color': 'red',
                            'text-align': 'right',
                            'display': 'none',
                            'font-size': "14px"
                        }).text(errorTextEmailReg);
                        // Append the "Login" text to the existing paragraph
                        $registerLoginLinkRed.append($registerLoginSpan);
                        $registerLoginLink.append($registerLoginLinkRed)
                        // Append registration form elements to the registration form div
                        $registrationForm.append($registerHeader);
                        $registrationForm.append($redTextreg)

                        // Append the name input field to the registration form
                        $registrationForm.append($registerNameInput);
                        $registrationForm.append($emptyFieldErrorRegisterName)
                        $registrationForm.append($registerEmailInput)
                        $registrationForm.append($errorElementReg);
                        $registrationForm.append($emptyFieldErrorRegisterEmail)

                        $registrationForm.append($registerPasswordField);
                        $registrationForm.append($emptyFieldErrorRegisterPass);
                        $registrationForm.append($errorElementPass)
                        $registrationForm.append($registerButton);
                        $registrationForm.append($registerOtherOptionsSection);
                        $registrationForm.append($footerImage)
                        $registerOtherOptionsSection.append($registerHorizontalRule);
                        $registerOtherOptionsSection.append($registerLoginLink);

                        // Append the registration form div to the registration modal content
                        $registerModalContent.append($registrationForm);
                        $registerModalContent.append($loginForm);
                        $registerModalContent.append($ForgotPassForm);
                        // Create a div for the image
                        const $imageDivReg = $('<div>').css({
                            'flex': '1',
                            'width': '100%',
                            'max-width': '400px',
                            'display': 'flex', // Add display flex to arrange the form and image side by side
                            'flex-direction': 'column', // Arrange them horizontally
                            'align-items': 'center', // Center the image horizontally
                        }).addClass("d-none d-xl-block");
                        // }).addClass("d-none d-lg-block d-xl-block");

                        // Create an image element
                        const $registrationImage = $('<img>')
                            .attr('src', 'https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/authentication-image.jpg') // Replace with the actual path to your image
                            .css({
                                'max-width': '100%',
                                'height': '100%', // Maintain aspect ratio
                                'object-fit': 'cover'
                            });

                        // Append the image to the image div
                        $imageDivReg.append($registrationImage);

                        // Append the image div to the registration modal content
                        $registerModalContent.append($imageDivReg);
                        function ErrorCleaner() {
                            $errorElementForgot.css('display', 'none')
                            $errorElementLogin.css('display', 'none')
                            $errorElementReg.css('display', 'none')
                            $errorElementOtp.css('display', 'none')
                            $errorElementResetPass.css('display', 'none')
                            $emptyFieldErrorForgot.css('display', 'none');
                            $emptyFieldErrorLogin.css('display', 'none');
                            $emptyFieldErrorLoginPass.css('display', 'none');
                            $emptyFieldErrorRegisterName.css('display', 'none')
                            $emptyFieldErrorRegisterEmail.css('display', 'none')
                            $emptyFieldErrorRegisterPass.css('display', 'none')
                            $emptyFieldErrorOtp.css('display', 'none')
                            $emptyFieldErrorResetPass.css('display', 'none')
                            $errorElementPass.css("display", 'none')
                            $ApierrorforgotPass.css('display', 'none')
                            $ApierrorLogin.css('display', 'none')
                            $ApierrorResetPass.css('display', 'none')


                        }
                        function FormCleaner() {
                            $emailInput.val("")
                            $passwordInput.val("")
                            $otpInput.val('')
                            $registerEmailInput.val('')
                            $registerNameInput.val("")
                            $registerPasswordField.val('')
                            $ForgotPassEmailInput.val('')
                            $ResetInput.val('')
                        }
                        function onClosed() {
                            $registerModal.css('display', 'none');
                            $registrationForm.css("display", 'none')
                            $loginForm.css('display', 'none');
                            $otpForm.css('display', 'none')
                            $ResetPassForm.css('display', 'none')
                            $ForgotPassForm.css('display', 'none')
                            ErrorCleaner()
                        }
                        // Create a close button for the registration modal
                        const $registerModalClose = $('<span>').html('&times;').addClass('modal-close').click(function () {
                            onClosed()
                            FormCleaner()
                        });

                        $registerModalClose.css({
                            'color': '#aaa',
                            'position': 'absolute',
                            'top': '10px',
                            'right': '10px',
                            'font-size': '28px',
                            'font-weight': 'bold',
                            'cursor': 'pointer',
                            'background-color': '#fff',
                            'padding': '0px 10px',
                        });

                        // Append the close button to the registration modal content
                        $registerModalContent.append($registerModalClose);

                        // Append the registration modal content to the registration modal
                        $registerModal.append($registerModalContent);

                        // Append the registration modal to the body
                        $('body').append($registerModal);
                        // Open the registration modal when the "Register" button is clicked
                        $Register.click(function () {

                            $registerModal.css('display', 'block');
                            $loginForm.css('display', 'none');
                            $registrationForm.css('display', 'block');


                        });
                        // Create a div for the OTP form
                        const $otpForm = $('<div>').css({
                            'display': 'none', // Initially hide the OTP form
                            // 'flex': '1', // Allow the OTP form to grow within the flex container
                            'padding': '20px 60px', // Add padding for spacing
                        });

                        // Create an h2 header for the OTP form
                        const $otpHeader = $('<h2>').text('OTP Verification').css({
                            // Add your styling for the OTP form header
                        });

                        // Create the red text "Enter OTP for verification"
                        const $redTextOtp = $('<p>').text('Enter OTP for verification').css({
                            'color': 'red',
                            'margin-top': '5px', // Adjust margin if needed
                        });
                        const $emptyFieldErrorOtp = $('<div>')
                            .css({
                                'color': 'red',
                                'text-align': 'right',
                                'display': 'none',
                                'font-size': "14px"
                            })
                            .text('Please enter OTP');
                        const errorTextOtp = 'Please enter a valid OTP';
                        const $errorElementOtp = $('<div>').css({
                            'color': 'red',
                            'text-align': 'right',
                            'display': 'none'
                        }).text(errorTextOtp);
                        // Create an input field for OTP
                        const $otpInput = $('<input>')
                            .attr('type', 'text')
                            .addClass('custom-input')
                            .attr('id', 'otpInput')
                            .keydown(function (event) {
                                if (event.keyCode == 32) {
                                    event.preventDefault();
                                }
                            })
                            .css({
                                'width': '100%',
                                'height': '40px',
                                'background-color': '#F6F5F5',
                                'position': 'relative',
                                'border': 'none',
                                'padding-right': '10px',
                                'text-align': 'right',
                                'margin-top': '10px',
                                'margin-bottom': '10px',
                            })
                            .attr('placeholder', 'Enter OTP')
                            .on('focus', function () {
                                $(this).css('color', '#333');
                            })
                            .on('blur', function () {
                                if ($(this).val() === '') {
                                    $(this).css('color', '#999');
                                }
                            }).on('input', function () {
                                const otpRegex = /^\d{6}$/;

                                const otpInput = $(this).val()
                                if (!otpRegex.test(otpInput)) {
                                    $errorElementOtp.css('display', 'block');
                                    $emptyFieldErrorOtp.css('display', 'none');

                                } else {
                                    $errorElementOtp.css('display', 'none');
                                }
                                if (otpInput.trim() === "") {
                                    console.log(123)
                                    $emptyFieldErrorOtp.css('display', 'block')
                                    $errorElementOtp.css('display', 'none');
                                } else {
                                    $emptyFieldErrorOtp.css('display', 'none');
                                }
                            })

                        // Create a button for OTP confirmation
                        const $otpConfirmButton = $('<button>').text('Submit OTP').css({
                            'margin-top': '10px',
                            'width': '100%',
                            'padding': '5px 10px',
                            'background': '#E8505B',
                            'border': 'none',
                            'outline': 'none',
                            'color': 'white',
                            'margin-top': '10px',
                            'margin-bottom': '10px',
                        }).click(handleOTPConfirmation);
                        // Create the horizontal rule for the section
                        const $OtpHorizontalRule = $('<hr>').css({
                            'border': 'none',
                            'border-top': '1px solid #999',
                            'margin': '10px 0px',
                        });

                        // Append the "Login" text to the existing paragraph
                        const $BackToLogin = $('<p>').text('Back to Login').css({
                            'color': 'red',
                            'margin-top': '5px',
                            'cursor': 'pointer',

                        }).click(function () {
                            // Add functionality to handle "Login" click here
                            // For example, you can show the login modal or trigger an action.
                            $registrationForm.css('display', 'none');
                            $loginForm.css('display', 'block'); // Show the login modal
                            $otpForm.css("display", 'none')
                            $ForgotPassForm.css('display', 'none');
                            FormCleaner()
                        });
                        // Create the footer image for the OTP form
                        const $footerImageOtp = $('<img>').attr('src', 'https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/comment-logo.png').css({
                            'width': '155.07px',
                            'height': '20px',
                            'margin-top': '20px', // Adjust margin as needed
                        });

                        // Append OTP form elements to the OTP form container
                        $otpForm.append($otpHeader);
                        $otpForm.append($redTextOtp);
                        $otpForm.append($otpInput);
                        $otpForm.append($emptyFieldErrorOtp)
                        $otpForm.append($errorElementOtp)
                        $otpForm.append($otpConfirmButton);
                        $otpForm.append($OtpHorizontalRule)
                        $otpForm.append($BackToLogin)
                        $otpForm.append($footerImageOtp);
                        // Append the OTP form to the document body or another container
                        $('body').append($otpForm);

                        // Function to handle OTP confirmation
                        function handleOTPConfirmation() {
                            const enteredOTP = $otpInput.val().trim();
                            const otpRegex = /^\d{6}$/;
                            if (enteredOTP === '') {
                                $emptyFieldErrorOtp.css('display', 'block')
                                return;
                            }
                            if (!otpRegex.test(enteredOTP)) {
                                $errorElementOtp.css('display', 'block')
                                return
                            }
                            const email = $registerEmailInput.val();
                            // Prepare the payload for OTP confirmation
                            const otpConfirmationPayload = {
                                email: email,
                                otp: parseInt(enteredOTP),
                                // Include any other necessary data for OTP confirmation
                            };

                            // Send a POST request to the OTP confirmation API
                            fetch('http://172.16.0.220:3001/api/v1/user/verify-otp-for-article', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(otpConfirmationPayload),
                            })
                                .then(response => response.json())
                                .then(data => {
                                    // Handle the API response here
                                    console.log(data); // You can replace this with your desired logic
                                    $registerModal.css('display', 'none');
                                    onClosed()
                                    FormCleaner()
                                    alert('User Verified successfully. Please Login.')
                                })
                                .catch(error => {
                                    console.error('Error:', error);
                                    alert('An error occurred during OTP confirmation.');
                                });
                        }

                        // Create a div for the OTP form
                        const $ResetPassForm = $('<div>').css({
                            'display': 'none', // Initially hide the OTP form
                            // 'flex': '1', // Allow the OTP form to grow within the flex container
                            'padding': '20px 60px', // Add padding for spacing
                        });

                        // Create an h2 header for the OTP form
                        const $ResetPassHeader = $('<h2>').text('Reset password').css({
                            // Add your styling for the OTP form header
                        });

                        // Create the red text "Enter OTP for verification"
                        const $RedTextResetPass = $('<p>').text('Enter OTP & new password').css({
                            'color': 'red',
                            'margin-top': '5px', // Adjust margin if needed
                        });
                        const $ApierrorResetPass = $('<div>').css({
                            'display': 'none',
                            'color': 'red',
                            'margin-top': '5px',
                        });
                        const $PasswordNotSame = $('<p>').text('Password must be same').css({
                            "display": "none",
                            'color': 'red',
                            'margin-top': '5px', // Adjust margin if needed
                        });
                        const $emptyFieldErrorResetPass = $('<div>')
                            .css({
                                'color': 'red',
                                'text-align': 'right',
                                'display': 'none',
                                'font-size': "14px"
                            })
                            .text('Please enter OTP');
                        const $emptyFieldErrorResetNewPass = $('<div>')
                            .css({
                                'color': 'red',
                                'text-align': 'right',
                                'display': 'none',
                                'font-size': "14px"
                            })
                            .text('Please enter new password');
                        const $emptyFieldErrorResetConfirmPass = $('<div>')
                            .css({
                                'color': 'red',
                                'text-align': 'right',
                                'display': 'none',
                                'font-size': "14px"
                            })
                            .text('Please confirm password');
                        const errorTextResetPass = 'Please enter a valid OTP';
                        const $errorElementResetPass = $('<div>').css({
                            'color': 'red',
                            'text-align': 'right',
                            'display': 'none'
                        }).text(errorTextResetPass);

                        const errorTextPassReset = 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character';
                        const $errorElementPassReset = $('<div>').css({
                            'color': 'red',
                            'text-align': 'right',
                            'display': 'none',
                            'font-size': "14px"
                        }).text(errorTextPassReset);
                        const errorTextPassResetConfirm = 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character';
                        const $errorElementPassResetConfirm = $('<div>').css({
                            'color': 'red',
                            'text-align': 'right',
                            'display': 'none',
                            'font-size': "14px"
                        }).text(errorTextPassResetConfirm);
                        // Create the password input field
                        // Create an input field for OTP
                        const $ResetInput = $('<input>')
                            .attr('type', 'text')
                            .addClass('custom-input')
                            .attr('id', 'ResetInput')
                            .keydown(function (event) {
                                if (event.keyCode == 32) {
                                    event.preventDefault();
                                }
                            })
                            .css({
                                'width': '100%',
                                'height': '40px',
                                'background-color': '#F6F5F5',
                                'position': 'relative',
                                'border': 'none',
                                'padding-right': '10px',
                                'text-align': 'right',
                                'margin-top': '10px',
                                'margin-bottom': '10px',
                            })
                            .attr('placeholder', 'Enter OTP')
                            .on('focus', function () {
                                $(this).css('color', '#333');
                            })
                            .on('blur', function () {
                                if ($(this).val() === '') {
                                    $(this).css('color', '#999');
                                }
                            }).on('input', function () {
                                const otpRegex = /^\d{6}$/;

                                const ResetInput = $(this).val()
                                if (!otpRegex.test(ResetInput)) {
                                    $errorElementResetPass.css('display', 'block');
                                    $emptyFieldErrorResetPass.css('display', 'none');

                                } else {
                                    $errorElementResetPass.css('display', 'none');
                                }
                                if (ResetInput.trim() === "") {
                                    console.log(123)
                                    $emptyFieldErrorResetPass.css('display', 'block')
                                    $errorElementResetPass.css('display', 'none');
                                } else {
                                    $emptyFieldErrorResetPass.css('display', 'none');
                                }
                            })
                        // Create the password input field
                        const $ResetPassInput = $('<input>')
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
                                "margin-top": "10px",
                                "margin-bottom": "10px",
                            }).keydown(function (event) {
                                if (event.keyCode == 32) {
                                    event.preventDefault();
                                }
                            })
                            .attr('placeholder', 'New password')
                            .on('focus', function () {
                                // Change the placeholder text color when input is focused
                                $(this).css('color', '#333');
                            })
                            .on('blur', function () {
                                // Restore the placeholder text color when input is blurred
                                if ($(this).val() === '') {
                                    $(this).css('color', '#999');
                                }
                            })
                            .on('input', function () {
                                const password = $(this).val();
                                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

                                if (!passwordRegex.test(password)) {
                                    $errorElementPassReset.css("display", "block")
                                    $emptyFieldErrorResetNewPass.css('display', 'none')
                                } else {
                                    $errorElementPassReset.css("display", "none")
                                }
                                if (password.trim() === '') {
                                    $errorElementPassReset.css("display", "none")
                                    $emptyFieldErrorResetNewPass.css('display', 'block')
                                }

                            });

                        // Create the password input field
                        const $ResetPassReInput = $('<input>')
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
                                "margin-top": "10px",
                                "margin-bottom": "10px",
                            }).keydown(function (event) {
                                if (event.keyCode == 32) {
                                    event.preventDefault();
                                }
                            })
                            .attr('placeholder', 'Confirm password')
                            .on('focus', function () {
                                // Change the placeholder text color when input is focused
                                $(this).css('color', '#333');
                            })
                            .on('blur', function () {
                                // Restore the placeholder text color when input is blurred
                                if ($(this).val() === '') {
                                    $(this).css('color', '#999');
                                }
                            })
                            .on('input', function () {
                                const password = $(this).val();
                                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

                                if (!passwordRegex.test(password)) {
                                    $errorElementPassResetConfirm.css("display", "block")
                                    $emptyFieldErrorResetConfirmPass.css('display', 'none')
                                } else {
                                    $errorElementPassResetConfirm.css("display", "none")
                                }
                                if (password.trim() === '') {
                                    $errorElementPassResetConfirm.css("display", "none")
                                    $emptyFieldErrorResetConfirmPass.css('display', 'block')
                                }
                            });

                        // Create a button for OTP confirmation
                        const $ResetPassButton = $('<button>').text('Reset password').css({
                            'margin-top': '10px',
                            'width': '100%',
                            'padding': '5px 10px',
                            'background': '#E8505B',
                            'border': 'none',
                            'outline': 'none',
                            'color': 'white',
                            'margin-top': '10px',
                            'margin-bottom': '10px',
                        }).click(handleResetSubmit);
                        // Create the horizontal rule for the section
                        const $ResetPassHorizontalRule = $('<hr>').css({
                            'border': 'none',
                            'border-top': '1px solid #999',
                            'margin': '10px 0px',
                        });

                        // Append the "Login" text to the existing paragraph
                        const $BackToLoginResetPass = $('<p>').text('Back to Login').css({
                            'color': 'red',
                            'margin-top': '5px',
                            'cursor': 'pointer',

                        }).click(function () {
                            // Add functionality to handle "Login" click here
                            // For example, you can show the login modal or trigger an action.
                            $registrationForm.css('display', 'none');
                            $loginForm.css('display', 'block'); // Show the login modal
                            $ResetPassForm.css("display", 'none')
                            $ForgotPassForm.css('display', 'none');
                            FormCleaner()
                            ErrorCleaner()
                        });

                        // Append OTP form elements to the OTP form container
                        $ResetPassForm.append($ResetPassHeader);
                        $ResetPassForm.append($RedTextResetPass);
                        $ResetPassForm.append($PasswordNotSame)
                        $ResetPassForm.append($ResetInput);
                        $ResetPassForm.append($emptyFieldErrorResetPass)
                        $ResetPassForm.append($errorElementResetPass)
                        $ResetPassForm.append($ResetPassInput)
                        $ResetPassForm.append($emptyFieldErrorResetNewPass)
                        $ResetPassForm.append($errorElementPassReset)
                        $ResetPassForm.append($ResetPassReInput)
                        $ResetPassForm.append($emptyFieldErrorResetConfirmPass)
                        $ResetPassForm.append($errorElementPassResetConfirm)

                        $ResetPassForm.append($ResetPassButton);
                        $ResetPassForm.append($ResetPassHorizontalRule)
                        $ResetPassForm.append($BackToLoginResetPass)
                        $ResetPassForm.append('<img src="https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/comment-logo.png" style="width: 155.07px; height: 20px; margin-top: 20px;">');
                        // Append the OTP form to the document body or another container
                        $('body').append($ResetPassForm);

                        // Function to handle OTP confirmation
                        async function handleResetSubmit() {
                            const enteredOTP = $ResetInput.val().trim();
                            const otpRegex = /^\d{6}$/;
                            const newPass = $ResetPassInput.val().trim()
                            const confirmPass = $ResetPassReInput.val().trim()
                            console.log(newPass, confirmPass, 'asas')
                            if (enteredOTP === '') {
                                $emptyFieldErrorResetPass.css('display', 'block')
                                if (newPass === '') {
                                    $emptyFieldErrorResetNewPass.css('display', 'block')
                                    if (confirmPass === '') {
                                        $emptyFieldErrorResetConfirmPass.css('display', 'block')
                                        return;
                                    }
                                    return;
                                }
                                if (confirmPass === '') {
                                    $emptyFieldErrorResetConfirmPass.css('display', 'block')
                                    return;
                                }
                                return;
                            }
                            if (newPass === '') {
                                $emptyFieldErrorResetNewPass.css('display', 'block')
                                if (confirmPass === '') {
                                    $emptyFieldErrorResetConfirmPass.css('display', 'block')
                                    return;
                                }
                                return;
                            }
                            if (confirmPass === '') {
                                $emptyFieldErrorResetConfirmPass.css('display', 'block')
                                return;
                            }
                            if (!otpRegex.test(enteredOTP)) {
                                $errorElementResetPass.css('display', 'block')
                                return
                            }
                            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                            if (!passwordRegex.test(newPass) || !passwordRegex.test(confirmPass)) {
                                return;
                            }

                            if (newPass !== confirmPass) {
                                $PasswordNotSame.css('display', 'block')
                                return
                            } else {
                                $PasswordNotSame.css('display', 'none')

                            }
                            const emailValue = $ForgotPassEmailInput.val();

                            const ResetPassVal = {
                                email: emailValue,
                                otp: parseInt(enteredOTP),
                                password: newPass
                                // Include any other necessary data for OTP confirmation
                            };
                            console.log(ResetPassVal)
                            // Send a POST request to the OTP confirmation API
                            try {
                                const response = await axios('http://172.16.0.220:3001/api/v1/user/reset-password-article-page', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(ResetPassVal),
                                });

                                if (response.status === 200) {
                                    // Handle the API response here
                                    $registerModal.css('display', 'none');
                                    onClosed();
                                    FormCleaner();
                                }

                            } catch (error) {
                                console.error('Error:', error.response.data.message);
                                $ApierrorResetPass.empty();
                                $ApierrorResetPass.append($('<p>').text(error.response.data.message))
                                $ApierrorResetPass.css('display', 'block')
                            }
                        }

                        async function handleRegistration() {

                            const name = $registerNameInput.val().trim();
                            const email = $registerEmailInput.val();
                            const password = $registerPasswordField.val();
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                            if (name.trim() === '') {
                                $emptyFieldErrorRegisterName.css('display', 'block')
                                if (email.trim() === "") {
                                    $emptyFieldErrorRegisterEmail.css('display', 'block');
                                    if (password.trim() === "") {
                                        $emptyFieldErrorRegisterPass.css('display', 'block');
                                        return;
                                    }
                                    return;
                                }
                                return;
                            }
                            if (email.trim() === "") {
                                $emptyFieldErrorRegisterEmail.css('display', 'block');
                                if (password.trim() === "") {
                                    $emptyFieldErrorRegisterPass.css('display', 'block');
                                    return;
                                }
                                return;
                            }
                            if (!emailRegex.test(email)) {
                                $errorElementReg.css('display', 'block');
                                return
                            }
                            if (password.trim() === "") {
                                $emptyFieldErrorRegisterPass.css('display', 'block');
                                return;
                            }
                            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                            if (!passwordRegex.test(password)) {
                                $errorElementPass.css('display', 'block');
                                return
                            }
                            // Log the form input values to the console
                            console.log('Name:', name);
                            console.log('Email:', email);
                            console.log('Password:', password);

                            // Prepare the payload
                            const payload = {
                                name: name,
                                email: email,
                                password: password,
                                site: "israel-today",
                                ip: "172.16.2.52",
                                device: "web"
                            }

                            try {
                                const response = await fetch('http://172.16.0.220:3001/api/v1/user/register-article-page', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(payload)
                                });

                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }
                                console.log(response, 'response')
                                const data = await response.json();

                                // Handle the API response here
                                console.log(data); // You can replace this with your desired logic
                                // Close the registration form and show the OTP confirmation form if registration is successful
                                $registerModalContent.append($otpForm);
                                $registerModalContent.append($imageDivReg);

                                $registrationForm.css('display', 'none');
                                $otpForm.css({
                                    'display': 'block', 'flex': '1', // Allow the OTP form to grow within the flex container
                                    'padding': '20px 60px', // Add padding for spacing
                                });

                            } catch (error) {
                                console.error('Error:', error);
                                // alert('An error occurred during registration.');
                            }

                        }

                        $registerButton.click(handleRegistration)

                        // Responsive adjustments using media queries
                        // Adjust margins and flex direction for smaller screens
                        function handleMediaQueryChange(e) {
                            if (e.matches) {
                                // For screens narrower than 768px
                                $app.css({
                                    "margin-left": "20px",
                                    "margin-right": "20px",
                                });
                                $flexContainer.css({
                                    "margin-top": "20px",
                                    "margin-bottom": "20px",
                                    "flex-direction": "column",
                                });
                                $firstImageContainer.find("img").css("max-width", "100%");
                                $flexContainer.find("img").css("max-width", "100%");
                                $registerModalContent.css("width", "75%")
                            } else {
                                // Reset to the original styles for wider screens
                                $app.css({
                                    "margin-left": "150px",
                                    "margin-right": "150px",
                                });
                                $flexContainer.css({
                                    "margin-top": "30px",
                                    "margin-bottom": "30px",
                                    "flex-direction": "row",
                                });
                                $firstImageContainer.find("img").css("max-width", "100%");
                                $flexContainer.find("img").css("max-width", "100%");
                                $registerModalContent.css("width", "50%")

                            }
                        }

                        // Define the media query based on screen width
                        const mediaQuery = window.matchMedia("(max-width: 768px)");

                        // Initial check for the media query and add a listener for changes
                        handleMediaQueryChange(mediaQuery);
                        mediaQuery.addEventListener("change", handleMediaQueryChange);

                    }
                });
            });
        });
    });
});
