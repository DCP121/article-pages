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
// console.log(document.getElementsByName('page_id')[0]?.attributes?.for?.value)
console.log(document.getElementsByName('page_id')[0].id)


// Load CSS stylesheets
loadCSS("https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css");
loadCSS(
  "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
);
loadCSS('https://cdn.jsdelivr.net/gh/DCP121/article-pages@f227dc41edd9ddc409e15b8582a1da1dca2e2cb8/index.css');

// Load JavaScript libraries
loadScript("https://code.jquery.com/jquery-3.6.0.min.js", function () {
  // jQuery has been loaded, now load other scripts
  loadScript(
    "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js",
    function () {
      // axios has been loaded, now load DataTables
      loadScript(
        "https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js",
        function () {
          // DataTables has been loaded, now load Google API
          loadScript("https://apis.google.com/js/api.js", function () {
            // Google API has been loaded, you can now use jQuery, axios, DataTables, and Google API
            $(document).ready(function () {
              // Create a div container with the id "app"
              const $app = $("#app");
              const containerClass = "image-container";
              const bannerClass = "top-banner";
              //api for comment listing pages
              var commentlistingdata;
              var showmorcomment = 10;
              function commentlistapi() {
                const token = localStorage.getItem("token");
                const userData = JSON.parse(localStorage.getItem("userData"));
                const userId = userData && userData._id;
                console.log(userId);
                const headers = {
                  "Content-Type": "application/json", // Specify the content type as JSON
                };

                if (token) {
                  headers["Authorization"] = `Bearer ${token}`;
                }
                console.log(showmorcomment, "show");
                $.ajax({
                  url: `http://137.184.19.129:4002/api/v1/artical-page/articalPage?pageId=65098ac7dfc16014091b766f&userId=${userId && userId !== null ? userId : ''}&site=israelBackOffice`, // Replace with your API endpoint
                  method: "POST",
                  dataType: "json",
                  headers: headers,
                  data: JSON.stringify({
                    itemsPerPage: showmorcomment,
                  }),

                  success: function (data) {
                    // The data variable now holds the fetched data
                    commentlistingdata = data;
                    console.log("Fetched Data:", commentlistingdata);

                    // You can use the data in subsequent operations or functions
                    processData(commentlistingdata);
                  },
                  error: function (xhr, status, error) {
                    console.error("Error fetching data:", error);
                  },
                });
              }
              commentlistapi();
              function timeAgo(isoDateString) {
                const now = new Date();
                const commentTime = new Date(isoDateString);
                const timeDifference = now - commentTime;
                const minutes = Math.floor(timeDifference / (1000 * 60));

                if (minutes < 1) {
                  return "Just now";
                } else if (minutes === 1) {
                  return "1 minute ago";
                } else if (minutes < 60) {
                  return minutes + " minutes ago";
                } else if (minutes < 1440) {
                  const hours = Math.floor(minutes / 60);
                  return hours + (hours === 1 ? " hour ago" : " hours ago");
                } else {
                  const days = Math.floor(minutes / 1440);
                  return days + (days === 1 ? " day ago" : " days ago");
                }
              }
              function processData(xyz) {
                $app.empty();
                console.log(xyz);
                console.log(commentlistingdata.data.pageData);
                function displayResponsiveImage(
                  $parent,
                  imagePath,
                  containerClass
                ) {
                  // Create a container div for the image
                  const $imageContainer = $("<div>").addClass(containerClass);

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
                  `https://raw.githubusercontent.com/DCP121/article-pages/13a7e50ce2b6889484f23815a3755d6be4fdc9a1/assets/comment-topbanner.jpg`,
                  bannerClass
                );
                $app.append($firstImageContainer);

                // Create a div with the class "d-flex" for the second image and h1 tag
                const $flexContainer = $("<div>").addClass("sub-header");

                // Example usage for the second image:
                // Use the imported image path 'comment-logo.png' as the second parameter,
                // and provide the container CSS class.

                // Create an h1 tag with the content "Israel Today"
                const $h1Element = $("<div>")
                  .addClass("title")
                  .text(commentlistingdata?.data?.pageData?.top_title);

                // Append the h1 tag to the flex container
                $flexContainer.append($h1Element);
                displayResponsiveImage(
                  $flexContainer,
                  `https://raw.githubusercontent.com/DCP121/article-pages/13a7e50ce2b6889484f23815a3755d6be4fdc9a1/assets/comment-logo.png`,
                  containerClass
                );

                // Append the flex container to the main app container
                $app.append($flexContainer);

                // Responsive adjustments using media queries
                // Adjust margins and flex direction for smaller screens
                function handleMediaQueryChange(e) {
                  if (e.matches) {
                    // For screens narrower than 768px
                    $firstImageContainer.find("img").css("max-width", "100%");
                    $flexContainer.find("img").css("max-width", "100%");
                  } else {
                    // Reset to the original styles for wider screens
                    $firstImageContainer.find("img").css("max-width", "100%");
                    $flexContainer.find("img").css("max-width", "100%");
                  }
                }

                // Define the media query based on screen width
                //    const mediaQuery = window.matchMedia("(max-width: 768px)");

                //     // Initial check for the media query and add a listener for changes
                //     handleMediaQueryChange(mediaQuery);
                //     mediaQuery.addEventListener("change", handleMediaQueryChange);

                // Create the div element for the comment section
                const $mainDivForCommentSection = $("<div>").attr(
                  "id",
                  "comment-section"
                );

                // Create the divider (horizontal line) div
                const $divider = $("<div>").addClass("divider");

                // Create buttons div
                const $buttonsDiv = $("<div>").addClass("total-comments-wrap");

                // Create buttons and add styles
                var $Login = $("<button>")
                  .addClass("blue-button")
                  .text("Login");
                // $Login.hover(
                //   function () {
                //     // Mouse enter (hover in) - Change the background color to red
                //     $(this);
                //   },
                //   function () {
                //     // Mouse leave (hover out) - Restore the original background color
                //     $(this);
                //   }
                // );
                const $Register = $("<button>")
                  .addClass("blue-button")
                  .text("Register");
                const $Logout = $("<button>").text("Logout").addClass("blue-button").click(function () {
                  localStorage.clear();
                  $Login.css({ display: "block" });
                  $Register.css({ display: "block" });
                  $Logout.css({ display: "none" });
                });
                // Create the text name element
                const $textName = $("<div>")
                  .addClass("total-comments")
                  .text(`${commentlistingdata?.data?.totalComment}Comments`);

                const isLogin = localStorage.getItem("token");
                if (!isLogin) {
                  $Logout.css({ display: "none" });
                } else {
                  $Login.css({ display: "none" });
                  $Register.css({ display: "none" });
                }
                // Append the elements to the main div
                $mainDivForCommentSection.append($divider);
                $mainDivForCommentSection.append($buttonsDiv);
                $buttonsDiv.append($textName, $Register, $Login);
                $buttonsDiv.append($Logout);

                // Create the first child div (comment section)
                const $commentSectionDiv = $("<div>").addClass("comments-wrap");

                // Create the input field and button
                const userData = JSON.parse(localStorage.getItem("userData"));
                const $commentbuttonandinputdiv = $("<div>").addClass("left");
                const $comenttitle = $("<div>")
                  .addClass("user-name")
                  .text(
                    userData && userData !== ""
                      ? userData?.name
                      : "Anonymous user"
                  );
                const $buttonandinputdiv = $("<div>").addClass("add-comment");
                const $commentButton = $("<button>")
                  .addClass("red-button")
                  .text("send");

                const $commentInput = $("<input>")
                  .addClass("form-control-input")
                  .attr({
                    type: "text",
                    placeholder: "Add a comment",
                  });
                const $errorMessagecomment = $("<div>")
                  .css({ display: "flex", color: "red" })
                  .hide();

                $buttonandinputdiv.append($commentInput, $commentButton);
                $commentbuttonandinputdiv.append(
                  $comenttitle,
                  $buttonandinputdiv,
                  $errorMessagecomment
                );
                $commentButton.on("click", function () {
                  // Get the value of the input field
                  console.log("value");

                  const originalComment = $commentInput.val().trim();
                  if (originalComment === "") {
                    $errorMessagecomment
                      .text("Comment cannot be empty.")
                      .show();
                  } else {
                    $errorMessagecomment.hide();
                    const token = localStorage.getItem("token");
                    const apiUrl = `http://137.184.19.129:4002/api/v1/comments/addComments/65098ac7dfc16014091b766f`; // Example URL

                    // Define additional options for the request
                    const headers = {
                      "Content-Type": "application/json", // Specify the content type as JSON
                    };

                    if (token) {
                      headers["Authorization"] = `Bearer ${token}`;
                    }
                    const requestOptions = {
                      method: "POST", // HTTP method
                      headers: headers,
                      body: JSON.stringify({
                        originalComment: originalComment,
                        site: "israel-today",
                      }), // Convert the data object to JSON string
                    };

                    fetch(apiUrl, requestOptions)
                      .then((response) => {
                        // Check if the response status is OK (201 Created)
                        if (!response.ok) {
                          throw new Error(
                            `HTTP error! Status: ${response.status}`
                          );
                        }

                        // Parse the response body as JSON
                        return response.json();
                      })
                      .then((data) => {
                        // Handle the response data
                        commentlistapi();
                        alert(data.message);
                      })
                      .catch((error) => {
                        // Handle any errors that occurred during the fetch
                        console.error("Fetch error:", error);
                      });
                  }
                });

                // Create element under the logo
                const $subHeader = $("<div>")
                  .addClass("sub-title")
                  .text(commentlistingdata?.data?.pageData?.sub_title);

                // Create the second child div (user image)
                const $userImageDiv = $("<div>").addClass("right");
                const $logoiconforuserimage = $("<img>")
                  .addClass("comment-logo")
                  .attr(
                    "src",
                    "https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/logo-two.png"
                  );
                const $userImage = $("<img>")
                  .attr(
                    "src",
                    "https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/ei_user.png"
                  )
                  .attr("alt", "User Image");
                // $commentSectionDiv.append($commentButton);
                // $commentSectionDiv.append($commentInput);
                $userImageDiv.append($userImage, $logoiconforuserimage);
                $commentSectionDiv.append(
                  $userImageDiv,
                  $commentbuttonandinputdiv
                );
                $app.append($subHeader);
                $mainDivForCommentSection.append($commentSectionDiv);
                $app.append($mainDivForCommentSection);
                // $mainDivForCommentSection.append($containerCommentpart)

                //comment listing part
                commentlistingdata.data.allCommentsData.forEach((dataItem) => {
                  console.log("mapdata", dataItem);

                  const $maincommentlistingcontainer =
                    $("<div>").addClass("comments-group");
                  const $container = $("<div>")
                    .addClass("containar-fluid")
                    .css({ width: "100%" });
                  const $containerCommentpart = $("<div>")
                    .addClass("comment-section-layout")
                    .css({});

                  //comment header like user name and time
                  const $commentheadermain =
                    $("<div>").addClass("user-name-wrap");
                  let time = timeAgo(dataItem.createdAt);
                  const $commenttime = $("<div>")
                    .addClass("post-time")
                    .text(`Posted ${time}`)
                    .css({});
                  const $commentuser = $("<div>")
                    .addClass("user-name")
                    .text(
                      dataItem?.name && dataItem.name !== ""
                        ? dataItem.name
                        : "Anonymous user"
                    )
                    .css({});

                  $commentheadermain.append($commentuser, $commenttime);

                  const $middelcomentpart = $("<div>")
                    .addClass("col-md-12 d-flex justify-content-end")
                    .css({});
                  //side bar user icon
                  const $commentuserImage = $("<img>")
                    .addClass("ml-3")
                    .attr(
                      "src",
                      "https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/ei_user.png"
                    )
                    .attr("alt", "User Image");
                  const $commentuserimagelogo = $("<img>")
                    .addClass("comment-logo")
                    .attr(
                      "src",
                      "https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/logo-two.png"
                    );

                  const $paragraph = $("<div>")
                    .addClass("user-comments")
                    .text(dataItem?.updatedComment);

                  // Append the div to the document body or another container

                  const $commentDiv = $("<div>").addClass("comments-wrap");
                  const $righdiv = $("<div>").addClass("right");
                  const $leftdiv = $("<div>").addClass("left");

                  //$middelcomentpart.append($paragraph, $commentuserImage);
                  //like comment div
                  const $socialicon = $("<div>")
                    .css({})
                    .addClass("comment-bottom");

                  const $likeicondiv = $("<div>").addClass("like-counter");
                  const $likeIcon = $("<img>")
                    .addClass("comment-logo")
                    .attr(
                      "src",
                      "https://raw.githubusercontent.com/DCP121/article-pages/13a7e50ce2b6889484f23815a3755d6be4fdc9a1/assets/like.svg"
                    );
                  const $likeicontext = $("<span>").text(dataItem?.like);
                  const $commenticondiv =
                    $("<div>").addClass("comment-counter");
                  const $commenticontext = $("<span>").text(
                    dataItem?.totalReplay
                  );
                  const $commentIcon = $("<img>")
                    .addClass("comment-logo")
                    .attr(
                      "src",
                      "https://raw.githubusercontent.com/DCP121/article-pages/13a7e50ce2b6889484f23815a3755d6be4fdc9a1/assets/comment.svg"
                    );

                  $likeicondiv.append($likeicontext, $likeIcon);
                  $commenticondiv.append($commenticontext, $commentIcon);
                  // Create the "See Original Comment" button
                  const $seeOriginalCommentButton = $("<button>")
                    .text("See Original Comment")
                    .addClass("outline-blue-btn");

                  $seeOriginalCommentButton.on("click", function () {
                    // Replace the original comment text with the updated comment text
                    $paragraph.text(dataItem?.originalComment);
                  });

                  // Append the icons and button to the $socialicon
                  $socialicon.append(
                    $likeicondiv,
                    $commenticondiv,
                    dataItem.updatedComment && dataItem.updatedComment !== ""
                      ? $seeOriginalCommentButton
                      : ""
                  );
                  $righdiv.append($commentuserImage, $commentuserimagelogo);
                  $leftdiv.append($commentheadermain, $paragraph, $socialicon);
                  //append comment section all div
                  $commentDiv.append($righdiv, $leftdiv);

                  //relay comment display section
                  const replayCommentDivs = [];
                  dataItem?.replyComments?.forEach((item) => {
                    let time = timeAgo(item.createdAt);
                    const $commentreplayheder =
                      $("<div>").addClass("user-name-wrap");

                    const $commenttimereplay = $("<div>")
                      .addClass("post-time")
                      .text(`Posted ${time}`)
                      .css({});
                    const $commentuserreplay = $("<div>")
                      .addClass("user-name")
                      .text(
                        dataItem?.name && dataItem.name !== ""
                          ? dataItem.name
                          : "Anonymous user"
                      )
                      .css({});

                    $commentreplayheder.append(
                      $commentuserreplay,
                      $commenttimereplay
                    );
                    var $replaycommentdiv = $("<div>")
                      .css({})
                      .addClass("comments-wrap sub-comment-wrap");

                    const $leftsidecommentreplaydiv =
                      $("<div>").addClass("left");
                    const $rightsidecommetreplaydiv =
                      $("<div>").addClass("right");
                    //middelepart pragraph and user image
                    const $commentreplyuserImage = $("<img>")
                      .addClass("ml-3")
                      .attr(
                        "src",
                        "https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/ei_user.png"
                      )
                      .attr("alt", "User Image");
                    const $commentuserreplayimagelogo = $("<img>")
                      .addClass("comment-logo")
                      .attr(
                        "src",
                        "https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/logo-two.png"
                      );

                    const $commentreplayparagraph = $("<div>")
                      .addClass("user-comments")
                      .text(item?.commentReplay);

                    //$middelepartreplaycommentsection.append($commentreplayparagraph,$commentreplyuserImage);
                    //social icon div

                    const $likeicondivreplay =
                      $("<div>").addClass("like-counter");
                    const $likeIconreplay = $("<img>")
                      .addClass("comment-logo")
                      .attr(
                        "src",
                        "https://raw.githubusercontent.com/DCP121/article-pages/13a7e50ce2b6889484f23815a3755d6be4fdc9a1/assets/like.svg"
                      );
                    const $likeicontextreplay = $("<span>").text(item?.like);
                    const $commenticondivreplay =
                      $("<div>").addClass("comment-counter");
                    const $commenticontextreplay = $("<span>").text("15");
                    const $commentIconreplay = $("<img>")
                      .addClass("comment-logo")
                      .attr(
                        "src",
                        "https://raw.githubusercontent.com/DCP121/article-pages/13a7e50ce2b6889484f23815a3755d6be4fdc9a1/assets/comment.svg"
                      );

                    $likeicondivreplay.append(
                      $likeicontextreplay,
                      $likeIconreplay
                    );
                    $commenticondivreplay.append(
                      $commenticontextreplay,
                      $commentIconreplay
                    );

                    const $socialiconcommentreplay =
                      $("<div>").addClass("comment-bottom");
                    $socialiconcommentreplay.append(
                      $likeicondivreplay
                      // $commenticondivreplay
                    );

                    $leftsidecommentreplaydiv.append(
                      $commentreplayheder,
                      $commentreplayparagraph,
                      $socialiconcommentreplay
                    );
                    $rightsidecommetreplaydiv.append(
                      $commentreplyuserImage,
                      $commentuserreplayimagelogo
                    );
                    $replaycommentdiv.append(
                      $rightsidecommetreplaydiv,
                      $leftsidecommentreplaydiv
                    );
                    replayCommentDivs.push($replaycommentdiv);
                  });

                  //replay comment input div

                  const $replycommentinputsection = $("<div>").addClass(
                    "comments-wrap sub-comment-wrap"
                  );
                  const $replaycommentinputandbuttondiv =
                    $("<div>").addClass("add-comment");
                  const $comenttitlereplay = $("<div>")
                    .addClass("user-name")
                    .text("Anonymous user");
                  const $leftcommenntinputsection = $("<div>").addClass("left");
                  const $rightcommenntinputsection =
                    $("<div>").addClass("right");
                  const $replaycommentButton = $("<button>")
                    .addClass("red-button")
                    .text("send");
                  const $commentreplayInput = $("<input>")
                    .addClass("form-control-input")
                    .attr({
                      type: "text",
                      placeholder: "Add a comment",
                    });
                  const $errorMessagecomment = $("<div>")
                    .css({ display: "flex", color: "red" })
                    .hide();
                  const $commentreplayuserImage = $("<img>")
                    .attr(
                      "src",
                      "https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/ei_user.png"
                    )
                    .attr("alt", "User Image");
                  $replaycommentinputandbuttondiv.append(
                    $commentreplayInput,
                    $replaycommentButton,
                  );
                  const $commentuserreplyimagelogo = $("<img>")
                    .addClass("comment-logo")
                    .attr(
                      "src",
                      "https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/logo-two.png"
                    );
                  $leftcommenntinputsection.append(
                    $comenttitlereplay,
                    $replaycommentinputandbuttondiv,
                    $errorMessagecomment
                  );
                  $rightcommenntinputsection.append(
                    $commentreplayuserImage,
                    $commentuserreplyimagelogo
                  );

                  $replycommentinputsection.append(
                    $rightcommenntinputsection,
                    $leftcommenntinputsection
                  );

                  $replaycommentButton.on("click", function () {
                    const commentReplay = $commentreplayInput.val().trim();
                    if (commentReplay === "") {
                      $errorMessagecomment
                        .text("Comment cannot be empty.")
                        .show();
                    } else {
                      const token = localStorage.getItem("token");
                      const headers = {
                        "Content-Type": "application/json", // Specify the content type as JSON
                      };

                      if (token) {
                        headers["Authorization"] = `Bearer ${token}`;
                      }
                      const apiUrl = `http://137.184.19.129:4002/api/v1/comments/addCommentsReplay/${dataItem?._id}`; // Example URL

                      // Define additional options for the request
                      const requestOptions = {
                        method: "POST", // HTTP method
                        headers: headers,
                        body: JSON.stringify({
                          commentReplay: commentReplay,
                        }), // Convert the data object to JSON string
                      };

                      fetch(apiUrl, requestOptions)
                        .then((response) => {
                          // Check if the response status is OK (201 Created)
                          if (!response.ok) {
                            throw new Error(
                              `HTTP error! Status: ${response.status}`
                            );
                          }

                          // Parse the response body as JSON
                          return response.json();
                        })
                        .then((data) => {
                          // Handle the response data
                          commentlistapi();
                          alert(data.message);
                        })
                        .catch((error) => {
                          // Handle any errors that occurred during the fetch
                          console.error("Fetch error:", error);
                        });
                    }
                  });

                  //Append the div to the document body or another container

                  $containerCommentpart.append(
                    $commentDiv,
                    replayCommentDivs,
                    $replycommentinputsection
                  );
                  $container.append($containerCommentpart);
                  $maincommentlistingcontainer.append($containerCommentpart);
                  $app.append($maincommentlistingcontainer);
                });

                //show more comment button div

                const $showmorecommentdiv = $("<div>").css({});

                const $showmorecommentbutton = $("<button>")
                  .addClass("red-button-big")
                  .text("show more comment");

                if (showmorcomment <= commentlistingdata?.data?.totalComment) { $showmorecommentdiv.append($showmorecommentbutton); }

                $app.append($showmorecommentdiv);
                const $footerImage = $("<img>")
                  .attr(
                    "src",
                    "https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/comment-logo.png"
                  )
                  .css({
                    width: "155.07px",
                    height: "20px",
                    "margin-top": "20px", // Adjust margin as needed
                  });

                $showmorecommentbutton.on("click", function () {
                  showmorcomment += 10;
                  commentlistapi();
                  console.log("counter");
                });
                fetch('https://api.ipify.org?format=json'
                  // , {      //https://geolocation-db.com/json/ //http://ip-api.com/json
                  //   method: 'GET',
                  //   headers: {
                  //     'Content-Type': 'application/json'
                  //   },
                  // }
                )
                  .then(response => response.json())
                  .then(data => {
                    localStorage.setItem('ip', data?.ip)
                  })
                  .catch(error => {
                    console.error('Error:', error);
                  });
                const site = 'israel-today'  //document.getElementsByName('page_id')[0].attributes.for.value
                let device;
                window.addEventListener('resize', handleResize);
                function handleResize() {
                  const width = window.innerWidth;

                  if (width < 768) {
                    device = 'mobile';
                  } else if (width >= 768 && width < 1024) {
                    device = 'tablet';
                  } else {
                    device = 'desktop';
                  }
                }

                handleResize(); // Initial check


                // Create a script element for loading the Google Sign-In API
                var scriptElement = document.createElement('script');
                scriptElement.src = 'https://accounts.google.com/gsi/client';
                scriptElement.async = true;
                $("head").append(scriptElement);
                scriptElement.onload = function () {
                  gapi.load('auth2', function () {
                    gapi.auth2.init();
                  });
                };

                // Create a div element for g_id_onload configuration
                var gIdOnloadDiv = document.createElement('div');
                gIdOnloadDiv.id = 'g_id_onload';
                gIdOnloadDiv.setAttribute('data-client_id', '854415067555-25hc5udjnp1soapn7jr9ip85ugnta9a1.apps.googleusercontent.com');
                gIdOnloadDiv.setAttribute('data-context', 'signin');
                gIdOnloadDiv.setAttribute('data-ux_mode', 'popup');
                gIdOnloadDiv.setAttribute('data-callback', 'handleCredentialResponse');
                gIdOnloadDiv.setAttribute('data-auto_prompt', 'false');

                // Create a div element for g_id_signin configuration
                var gIdSigninDiv = document.createElement('div');
                gIdSigninDiv.className = 'g_id_signin';
                gIdSigninDiv.setAttribute('data-type', 'statndard');
                gIdSigninDiv.setAttribute('data-shape', 'rectangular');
                gIdSigninDiv.setAttribute('data-theme', 'outline');
                gIdSigninDiv.setAttribute('data-text', 'signin_with');
                gIdSigninDiv.setAttribute('data-size', 'medium');
                gIdSigninDiv.setAttribute('data-logo_alignment', 'left');

                // Create a div element for g_id_onload configuration
                var gIdOnloadDiv1 = document.createElement('div');
                gIdOnloadDiv1.id = 'g_id_onload1';
                gIdOnloadDiv1.setAttribute('data-client_id', '854415067555-25hc5udjnp1soapn7jr9ip85ugnta9a1.apps.googleusercontent.com');
                gIdOnloadDiv1.setAttribute('data-context', 'signin');
                gIdOnloadDiv1.setAttribute('data-ux_mode', 'popup');
                gIdOnloadDiv1.setAttribute('callback', 'handleCredentialResponse');
                gIdOnloadDiv1.setAttribute('data-auto_prompt', 'false');


                // Create a div element for g_id_signin configuration
                var gIdSigninDiv1 = document.createElement('div');
                gIdSigninDiv1.className = 'g_id_signin';
                gIdSigninDiv1.setAttribute('data-type', 'statndard');
                gIdSigninDiv1.setAttribute('data-shape', 'rectangular');
                gIdSigninDiv1.setAttribute('data-theme', 'outline');
                gIdSigninDiv1.setAttribute('data-text', 'signin_with');
                gIdSigninDiv1.setAttribute('data-size', 'medium');
                gIdSigninDiv1.setAttribute('data-logo_alignment', 'left');

                // Define the handleCredentialResponse function using jQuery
                window.handleCredentialResponse = (response) => {
                  if (response.credential) {
                    console.log(response.credential, "response.credential");
                    const ip = localStorage.getItem('ip')
                    // const ip= "123.0.9.123"
                    const payload = {
                      googleAuthToken: response.credential,
                      site,
                      ip,
                      device
                    }
                    // Send a POST request to the login API
                    fetch(' https://68b6-137-184-19-129.ngrok-free.app/api/v1/user/google-sign-in', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(payload)
                    })
                      .then(response => response.json())
                      .then(data => {
                        // Handle the API response here
                        console.log(data); // You can replace this with your desired logic
                        // Close the modal if login is successful
                        localStorage.setItem('token', data?.data?.token)
                        localStorage.setItem('userData', JSON.stringify(data?.data?.user))
                        $Login.css({ 'display': 'none' })
                        $Register.css({ 'display': 'none' })
                        $Logout.css({ 'display': 'block' })
                        onClosed()
                        FormCleaner()
                        $registerModal.css('display', 'none');
                      })
                      .catch(error => {
                        console.error('Error:', error);
                      });
                  } else {
                    // User is not signed in or declined to sign in.
                    console.log("User is not signed in.");
                  }
                }
                
                const $modalContentSuccess = `<div class="modal fade"  id="ignismyModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content text-center">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="thank-you-pop">
              <img src="http://goactionstations.co.uk/wp-content/uploads/2017/03/Green-Round-Tick.png" alt="">
              <h1>Thank You!</h1>
              <p>Your submission is received and we will contact you soon</p>
              <h3 class="cupon-pop">Your Id: <span>12345</span></h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  $(`body`).append($modalContentSuccess)
                // Create the child div for the login form
                const $loginForm = $("<div>").css({
                  flex: "1",
                  padding: "20px 60px",
                  display: "none",
                });
                const $ApierrorLogin = $("<div>").css({
                  display: "none",
                  color: "red",
                  "margin-top": "5px",
                });
                const $loginHeader = $("<h2>").text("Login Form");

                // Create a new element for the red text line
                const $redText = $("<p>")
                  .text("To comment you need to login")
                  .css({
                    color: "red",
                    "margin-top": "5px", // Adjust margin if needed
                  });

                // Append the login header and red text elements to the login form
                $loginForm.append($loginHeader);
                const $emptyFieldErrorLogin = $("<div>")
                  .css({
                    color: "red",
                    "text-align": "right",
                    display: "none",
                    "font-size": "14px",
                  })
                  .text("Email is required");
                const $emptyFieldErrorLoginPass = $("<div>")
                  .css({
                    color: "red",
                    "text-align": "right",
                    display: "none",
                    "font-size": "14px",
                  })
                  .text("Password is required");
                // Create the email input field
                const $emailInput = $("<input>")
                  .attr("type", "email") // Set the input type to email
                  .attr("id", "emailInput") // Add an ID here
                  .addClass("custom-input")
                  .css({
                    "margin-top": "10px",
                    width: "100%",
                    height: "40px",
                    "background-color": "#F6F5F5",
                    position: "relative",
                    border: "none",
                    "padding-right": "10px", // Adjust right padding for the input
                    "text-align": "right", // Align text to the right
                    "margin-top": "15px",
                    "margin-bottom": "10px",
                  })
                  .keydown(function (event) {
                    if (event.keyCode == 32) {
                      event.preventDefault();
                    }
                  })
                  .attr("placeholder", "Email")
                  .on("focus", function () {
                    // Change the placeholder text color when input is focused
                    $(this).css("color", "#333");
                  })
                  .on("input", function () {
                    const email = $(this).val();
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    // Check if the email is valid
                    if (!emailRegex.test(email)) {
                      $errorElementLogin.css("display", "block");
                      $emptyFieldErrorLogin.css("display", "none");
                    } else {
                      $errorElementLogin.css("display", "none");
                    }
                    if (email.trim() === "") {
                      $emptyFieldErrorLogin.css("display", "block");
                      $errorElementLogin.css("display", "none");
                    } else {
                      $emptyFieldErrorLogin.css("display", "none");
                    }
                  });

                // Create a container div for the password input and show/hide toggle button
                const $passwordContainer = $("<div>").css({
                  "align-items": "center",
                  "margin-top": "10px",
                });
                var errorTextPass =
                  "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character";
                var $errorElementPass = $("<div>")
                  .css({
                    color: "red",
                    "text-align": "right",
                    display: "none",
                    "font-size": "14px",
                  })
                  .text(errorTextPass);
                // Create the password input field
                const $passwordInput = $("<input>")
                  .attr("type", "password") // Set the input type to password
                  .addClass("custom-input")
                  .attr("id", "passwordField")
                  .css({
                    width: "100%", // Adjust input width
                    height: "40px",
                    "background-color": "#F6F5F5",
                    position: "relative",
                    border: "none",
                    "padding-right": "10px", // Adjust right padding for the input
                    "text-align": "right", // Align text to the right
                    "margin-top": "10px",
                    "margin-bottom": "10px",
                  })
                  .keydown(function (event) {
                    if (event.keyCode == 32) {
                      event.preventDefault();
                    }
                  })
                  .attr("placeholder", "Password")
                  .on("focus", function () {
                    // Change the placeholder text color when input is focused
                    $(this).css("color", "#333");
                  })
                  .on("blur", function () {
                    // Restore the placeholder text color when input is blurred
                    if ($(this).val() === "") {
                      $(this).css("color", "#999");
                    }
                  })
                  .on("input", function () {
                    const password = $(this).val();

                    if (password.trim() === "") {
                      $emptyFieldErrorLoginPass.css("display", "block");
                    } else {
                      $emptyFieldErrorLoginPass.css("display", "none");
                    }
                  });

                // Create an icon for show/hide password functionality
                const $showPasswordToggle = $("<i>")
                  .addClass("far fa-eye")
                  .css({
                    "font-size": "24px", // Adjust the icon size
                    color: "#999", // Set the initial icon color
                    cursor: "pointer",
                    "margin-left": "5px", // Adjust margin between input and icon
                  });

                // Toggle the password field between text and password type
                $showPasswordToggle.click(function () {
                  const $passwordField = $("#passwordField");
                  const fieldType = $passwordField.attr("type");
                  if (fieldType === "password") {
                    $passwordField.attr("type", "text");
                    $(this).removeClass("fa-eye").addClass("fa-eye-slash"); // Change the icon to hide
                  } else {
                    $passwordField.attr("type", "password");
                    $(this).removeClass("fa-eye-slash").addClass("fa-eye"); // Change the icon to show
                  }
                });

                const $loginButton = $("<button>").text("Login").css({
                  "margin-top": "10px",
                  width: "100%",
                  padding: "5px 10px",
                  background: "#E8505B",
                  border: "none",
                  outline: "none",
                  color: "white",
                  "margin-top": "10px",
                  "margin-bottom": "10px",
                  position: "relative",
                });
                // Create a section for other options
                const $otherOptionsSection = $("<div>").css({
                  width: "100%",
                  "text-align": "center",
                  "margin-top": "10px",
                });

                // Create the horizontal rule for the section
                const $horizontalRule = $("<hr>").css({
                  border: "none",
                  "border-top": "1px solid #999",
                  margin: "0",
                });

                // Create the text for the section
                const $otherOptionsText = $("<p>").text("Other options").css({
                  "background-color": "#F6F5F5",
                  padding: "0 10px",
                  "margin-top": "10px",
                  "margin-bottom": "10px",
                });
                const errorTextEmailLogin = "Invalid email address";
                const $errorElementLogin = $("<div>")
                  .css({
                    color: "red",
                    "text-align": "right",
                    display: "none",
                    "font-size": "14px",
                  })
                  .text(errorTextEmailLogin);
                // Append login form elements to the login form div
                $loginForm.append($loginHeader);
                $loginForm.append($redText);
                $loginForm.append($ApierrorLogin);
                $loginForm.append($emailInput); // Append email input
                $loginForm.append($errorElementLogin);
                $loginForm.append($emptyFieldErrorLogin);
                $passwordContainer.append($passwordInput); // Append password input to the container
                $passwordContainer.append($emptyFieldErrorLoginPass);
                $passwordContainer.append($showPasswordToggle); // Append show/hide password icon to the container
                $loginForm.append($passwordContainer); // Append the container to the login form
                $loginForm.append($loginButton);
                $loginForm.append($otherOptionsSection);
                $otherOptionsSection.append($horizontalRule);
                $otherOptionsSection.append($otherOptionsText);

                // Create the "Forgot password?" link with red text
                const $forgotPasswordLink = $("<p>")
                  .text("Forgot password?")
                  .css({
                    color: "red",
                    "text-align": "center",
                    cursor: "pointer",
                    "margin-top": "10px",
                    "margin-bottom": "10px",
                  })
                  .click(function () {
                    // Add functionality to handle "Forgot password?" click here  $loginForm.css('display', 'none');
                    $loginForm.css("display", "none");
                    $ForgotPassForm.css("display", "block");
                    $emptyFieldErrorLoginPass.css("display", "none");
                    $emptyFieldErrorForgot.css("display", "none");
                  });
                $loginForm.append($forgotPasswordLink);
                const $registerLink = $("<p>").css({
                  "margin-top": "10px",
                  "margin-bottom": "10px",
                  "text-align": "center",
                });
                $loginForm.append(gIdOnloadDiv);
                $loginForm.append(gIdSigninDiv);
                // Create the "Don’t have an account?" text and make it black
                $registerLink.append("Don’t have an account? ");
                const $registerSpan = $("<span>")
                  .text("Register")
                  .css({
                    color: "red",
                    cursor: "pointer",
                  })
                  .click(function () {
                    // Add functionality to handle "Register" click here
                    $loginForm.css("display", "none");
                    $registrationForm.css("display", "block");
                    FormCleaner();
                  });

                // Append the "Register" text to the existing paragraph
                $registerLink.append($registerSpan);
                // Append the footer image to the modal content

                $loginForm.append($registerLink);
                $loginForm.append(
                  '<img src="https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/comment-logo.png" style="width: 155.07px; height: 20px; margin-top: 20px;">'
                );
                $loginForm.append($footerImage);

                // Create the child div for the image
                const $imageDiv = $("<div>").css({
                  flex: "1",
                  height: "auto",
                  width: "100%",
                });

                // Create an image element
                const $image = $("<img>")
                  .attr(
                    "src",
                    "https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/authentication-image.jpg"
                  )
                  .css({
                    width: "100%",
                    height: "100%",
                  });

                $imageDiv.append($image);

                // Open the modal when Login is clicked
                $Login.click(function () {
                  $registerModal.css("display", "block");
                  $loginForm.css("display", "block");
                });
                async function handleLogin() {
                  // Move these lines inside the function
                  const email = $("#emailInput").val();
                  const password = $("#passwordField").val();
                  console.log(email, password, "aaa");
                  // Validate email and password (you can add more validation here)
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                  if (email.trim() === "") {
                    $emptyFieldErrorLogin.css("display", "block");
                    if (password.trim() === "") {
                      $emptyFieldErrorLoginPass.css("display", "block");
                      return;
                    }
                    return;
                  }
                  if (!emailRegex.test(email)) {
                    $errorElementLogin.css("display", "block");
                    return;
                  }
                  if (password.trim() === "") {
                    $emptyFieldErrorLoginPass.css("display", "block");
                    return;
                  }

                  // Prepare the payload
                  const payload = {
                    email: email,
                    password: password,
                    ip: "127.0.0.1",
                    device: "web",
                  };
                  const $spinner = $("<div>")
                    .addClass("spinner-border spinner-border-sm mx-3 text-light")
                    .attr("role", "status")
                    .appendTo($loginButton);

                  $loginButton.prop("disabled", true);

                  try {
                    const response = await axios.post(
                      "https://68b6-137-184-19-129.ngrok-free.app/api/v1/user/login-article-page",
                      payload,
                      {
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    );

                    console.log(response); // You can replace this with your desired logic

                    if (response.status === 200) {
                      // Close the modal if login is successful
                      $registerModal.css("display", "none");
                      onClosed();
                      FormCleaner();
                      $("#ignismyModal").css("display", "block")
                      $("#ignismyModal").addClass("modal fade show");
                    }
                  } catch (error) {
                    console.error("Error:", error);
                    $ApierrorLogin.empty();
                    $ApierrorLogin.append($("<p>").text(error.response.data.message));
                    $ApierrorLogin.css("display", "block");

                    // Handle errors here if necessary
                  } finally {
                    // Enable button and remove spinner after API call is complete
                    $loginButton.prop("disabled", false);
                    $spinner.remove();
                  }
                }
                // Add a click event listener to the login button
                $loginButton.click(handleLogin);

                // Create a registration modal
                const $registerModal = $("<div>").addClass("modal ").css({
                  display: "none",
                  position: "fixed",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  "background-color": "rgba(0,0,0,0.4)",
                  "z-index": "1",
                });

                const $registerModalContent = $("<div>")
                  .addClass("modal-content row")
                  .css({
                    "background-color": "#fff",
                    margin: "auto",
                    width: "60%",
                    "text-align": "center",
                    "margin-top": "100px",
                    display: "flex",
                    "flex-direction": "row", // Change to row to arrange form and image side by side
                  });

                $registerModalContent.css({
                  position: "relative",
                });
                const $ForgotPassForm = $("<div>").css({
                  flex: "1",
                  padding: "20px 60px",
                  display: "none",
                });
                const $ForgotPassHeader = $("<h2>").text("Forgot password");
                const $redTextForgotPass = $("<p>")
                  .text(
                    "Enter your email address And we will send you an email to reset"
                  )
                  .css({
                    color: "black",
                    "margin-top": "5px", // Adjust margin if needed
                  });
                const $ApierrorforgotPass = $("<div>").css({
                  display: "none",
                  color: "red",
                  "margin-top": "5px",
                });

                const errorTextEmailForgot = "Invalid email address";
                const $errorElementForgot = $("<div>")
                  .css({
                    color: "red",
                    "text-align": "right",
                    display: "none",
                    "font-size": "14px",
                  })
                  .text(errorTextEmailForgot);
                const $emptyFieldErrorForgot = $("<div>")
                  .css({
                    color: "red",
                    "text-align": "right",
                    display: "none",
                    "font-size": "14px",
                  })
                  .text("Email is required");
                // Create the email input field
                const $ForgotPassEmailInput = $("<input>")
                  .attr("type", "email")
                  .addClass("custom-input")
                  .attr("id", "registerEmailInput")
                  .css({
                    "margin-top": "10px",
                    width: "100%",
                    height: "40px",
                    "background-color": "#F6F5F5",
                    position: "relative",
                    border: "none",
                    "padding-right": "10px",
                    "text-align": "right",
                    "margin-top": "15px",
                    "margin-bottom": "10px",
                  })
                  .attr("placeholder", "Email")
                  .on("focus", function () {
                    $(this).css("color", "#333");
                  })
                  .keydown(function (event) {
                    if (event.keyCode == 32) {
                      event.preventDefault();
                    }
                  })
                  .on("input", function () {
                    const email = $(this).val();
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    // Check if the email is valid
                    if (!emailRegex.test(email)) {
                      $emptyFieldErrorForgot.css("display", "none");
                      $errorElementForgot.css("display", "block");
                    } else {
                      $errorElementForgot.css("display", "none");
                    }
                    if (email.trim() === "") {
                      $emptyFieldErrorForgot.css("display", "block");
                      $errorElementForgot.css("display", "none");
                    } else {
                      $emptyFieldErrorForgot.css("display", "none");
                    }
                  });

                // Create the registration button
                const $ForgotPassSubmit = $("<button>")
                  .text("Submit")
                  .css({
                    "margin-top": "10px",
                    width: "100%",
                    padding: "5px 10px",
                    background: "#E8505B",
                    border: "none",
                    outline: "none",
                    color: "white",
                    "margin-top": "10px",
                    "margin-bottom": "10px",
                  })
                  .click(async function sendForgotPasswordRequest() {
                    const emailValue = $ForgotPassEmailInput.val();
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                    // Check if the email input is empty
                    if (emailValue.trim() === "") {
                      $emptyFieldErrorForgot.css("display", "block");
                      $errorElementForgot.css("display", "none");
                      return;
                    }
                    if (!emailRegex.test(emailValue)) {
                      $errorElementForgot.css("display", "block");
                      return;
                    }

                    const ForgotPassPayload = {
                      email: emailValue,
                    };
                    const $spinner = $("<div>")
                      .addClass("spinner-border spinner-border-sm mx-3 text-light")
                      .attr("role", "status")
                      .appendTo($ForgotPassSubmit);

                    $ForgotPassSubmit.prop("disabled", true)
                    try {
                      const response = await axios.post(
                        " https://68b6-137-184-19-129.ngrok-free.app/api/v1/user/forgot-password-article-page",
                        ForgotPassPayload,
                        {
                          headers: {
                            "Content-Type": "application/json",
                          },
                        }
                      );
                      console.log(response, "response");
                      if (response.status === 200) {
                        $registerModalContent.append($ResetPassForm);
                        $registerModalContent.append($imageDivReg);
                        $ForgotPassForm.css("display", "none");
                        $ResetPassForm.css({
                          display: "block",
                          flex: "1",
                          padding: "20px 60px",
                        });
                      }
                    } catch (error) {
                      console.error("Error:", error.response.data.message);
                      $ApierrorforgotPass.empty();
                      $ApierrorforgotPass.append(
                        $("<p>").text(error.response.data.message)
                      );
                      $ApierrorforgotPass.css("display", "block");
                    } finally {
                      // Enable button and remove spinner after API call is complete
                      $ForgotPassSubmit.prop("disabled", false);
                      $spinner.remove();
                    }
                  });

                // Append the "Login" text to the existing paragraph
                const $BackToLoginForgot = $("<p>")
                  .text("Back to Login")
                  .css({
                    color: "red",
                    "margin-top": "5px",
                    cursor: "pointer",
                  })
                  .click(function () {
                    // Add functionality to handle "Login" click here
                    // For example, you can show the login modal or trigger an action.
                    $ForgotPassForm.css("display", "none");
                    $registrationForm.css("display", "none");
                    $loginForm.css("display", "block"); // Show the login modal
                    $otpForm.css("display", "none");
                    ErrorCleaner();
                    FormCleaner();
                  });
                const $registerLinkForgot = $("<p>").css({
                  "margin-top": "10px",
                  "margin-bottom": "10px",
                  "text-align": "center",
                });

                // Create the "Don’t have an account?" text and make it black
                $registerLinkForgot.append("Don’t have an account? ");
                const $registerForgotSpan = $("<span>")
                  .text("Register")
                  .css({
                    color: "red",
                    cursor: "pointer",
                  })
                  .click(function () {
                    // Add functionality to handle "Register" click here
                    $loginForm.css("display", "none");
                    $ForgotPassForm.css("display", "none");
                    $registrationForm.css("display", "block");
                    ErrorCleaner();
                    FormCleaner();
                  });
                $registerLinkForgot.append($registerForgotSpan);
                // Append the name input field to the registration form
                $ForgotPassForm.append($ForgotPassHeader);
                $ForgotPassForm.append($redTextForgotPass);
                $ForgotPassForm.append($ApierrorforgotPass);
                $ForgotPassForm.append($ForgotPassEmailInput);
                $ForgotPassForm.append($errorElementForgot);
                $ForgotPassForm.append($emptyFieldErrorForgot);
                $ForgotPassForm.append($ForgotPassSubmit);
                // $ForgotPassForm.append($registerOtherOptionsSection);
                $ForgotPassForm.append($BackToLoginForgot);
                $ForgotPassForm.append($registerLinkForgot);
                $ForgotPassForm.append(
                  '<img src="https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/comment-logo.png" style="width: 155.07px; height: 20px; margin-top: 20px;">'
                );
                // Create the child div for the registration form
                const $registrationForm = $("<div>").css({
                  flex: "1",
                  padding: "20px 60px",
                  display: "none",
                });

                const $registerHeader = $("<h2>").text("Register");
                const $redTextreg = $("<p>")
                  .text("To comment you need to register")
                  .css({
                    color: "red",
                    "margin-top": "5px", // Adjust margin if needed
                  });
                const $ApierrorRegistration = $("<div>").css({
                  display: "none",
                  color: "red",
                  "margin-top": "5px",
                });
                const $emptyFieldErrorRegisterEmail = $("<div>")
                  .css({
                    color: "red",
                    "text-align": "right",
                    display: "none",
                    "font-size": "14px",
                  })
                  .text("Email is required");
                const $emptyFieldErrorRegisterPass = $("<div>")
                  .css({
                    color: "red",
                    "text-align": "right",
                    display: "none",
                    "font-size": "14px",
                  })
                  .text("Password is required");
                const $emptyFieldErrorRegisterName = $("<div>")
                  .css({
                    color: "red",
                    "text-align": "right",
                    display: "none",
                    "font-size": "14px",
                  })
                  .text("Name is required");
                const $registerNameInput = $("<input>")
                  .attr("type", "text")
                  .addClass("custom-input")
                  .attr("id", "registerNameInput")
                  .css({
                    width: "100%",
                    height: "40px",
                    "background-color": "#F6F5F5",
                    position: "relative",
                    border: "none",
                    "padding-right": "10px",
                    "text-align": "right",
                    "margin-top": "10px",
                    "margin-bottom": "10px",
                  })
                  .attr("placeholder", "Name")
                  .on("focus", function () {
                    $(this).css("color", "#333");
                  })
                  .keydown(function (event) {
                    if (event.keyCode == 32) {
                      event.preventDefault();
                    }
                  })
                  .on("blur", function () {
                    if ($(this).val() === "") {
                      $(this).css("color", "#999");
                    }
                  })
                  .on("input", function () {
                    const name = $(this).val();
                    // Check if the email is valid
                    if (name.trim() !== "") {
                      $emptyFieldErrorRegisterName.css("display", "none");
                    } else {
                      $emptyFieldErrorRegisterName.css("display", "block");
                    }
                  });

                // Create the email input field
                const $registerEmailInput = $("<input>")
                  .attr("type", "email")
                  .addClass("custom-input")
                  .attr("id", "registerEmailInput")
                  .css({
                    "margin-top": "10px",
                    width: "100%",
                    height: "40px",
                    "background-color": "#F6F5F5",
                    position: "relative",
                    border: "none",
                    "padding-right": "10px",
                    "text-align": "right",
                    "margin-top": "15px",
                    "margin-bottom": "10px",
                  })
                  .attr("placeholder", "Email")
                  .on("focus", function () {
                    $(this).css("color", "#333");
                  })
                  .keydown(function (event) {
                    if (event.keyCode == 32) {
                      event.preventDefault();
                    }
                  })
                  .on("input", function () {
                    const email = $(this).val();
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    // Check if the email is valid
                    if (!emailRegex.test(email)) {
                      $errorElementReg.css("display", "block");
                    } else {
                      $errorElementReg.css("display", "none");
                    }
                    if (email.trim() === "") {
                      $emptyFieldErrorRegisterEmail.css("display", "block");
                      $errorElementReg.css("display", "none");
                    } else {
                      $emptyFieldErrorRegisterEmail.css("display", "none");
                    }
                  });

                // Create the password input field
                const $registerPasswordField = $("<input>")
                  .attr("type", "password")
                  .addClass("custom-input")
                  .attr("id", "registerPasswordField")
                  .css({
                    width: "100%",
                    height: "40px",
                    "background-color": "#F6F5F5",
                    position: "relative",
                    border: "none",
                    "padding-right": "10px",
                    "text-align": "right",
                    "margin-top": "10px",
                    "margin-bottom": "10px",
                  })
                  .attr("placeholder", "Password")
                  .on("focus", function () {
                    $(this).css("color", "#333");
                  })
                  .keydown(function (event) {
                    if (event.keyCode == 32) {
                      event.preventDefault();
                    }
                  })
                  .on("blur", function () {
                    if ($(this).val() === "") {
                      $(this).css("color", "#999");
                    }
                  })
                  .on("input", function () {
                    const password = $(this).val();
                    const passwordRegex =
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                    console.log(!passwordRegex.test(password), "testing pass");
                    if (!passwordRegex.test(password)) {
                      $errorElementPass.css("display", "block");
                      $emptyFieldErrorRegisterPass.css("display", "none");
                    } else {
                      $errorElementPass.css("display", "none");
                    }
                    if (password.trim() === "") {
                      $errorElementPass.css("display", "none");
                      $emptyFieldErrorRegisterPass.css("display", "block");
                    }
                  });

                // Create the registration button
                const $registerButton = $("<button>").text("Register").css({
                  "margin-top": "10px",
                  width: "100%",
                  padding: "5px 10px",
                  background: "#E8505B",
                  border: "none",
                  outline: "none",
                  color: "white",
                  "margin-top": "10px",
                  "margin-bottom": "10px",
                });

                // Create a section for other options
                const $registerOtherOptionsSection = $("<div>").css({
                  width: "100%",
                  "text-align": "center",
                  "margin-top": "10px",
                });

                // Create the horizontal rule for the section
                const $registerHorizontalRule = $("<hr>").css({
                  border: "none",
                  "border-top": "1px solid #999",
                  margin: "0",
                });

                // Create the "Already have an account?" text and make it black
                const $registerLoginLink = $("<p>").text("").css({
                  color: "black",
                  "margin-top": "10px",
                  "margin-bottom": "10px",
                });
                // Create the "I accept the terms and conditions" text with a clickable link
                const $registerTermsLink = $("<p>").css({
                  color: "black",
                  "margin-top": "10px",
                  "margin-bottom": "10px",
                });

                // Create the actual link element
                const $termsLink = $("<a>")
                  .attr("href", "https://www.example.com/terms") // Replace with your actual terms and conditions URL
                  .css({
                    color: "inherit", // Inherit the color from the parent (black in this case)
                    "text-decoration": "underline", // Remove the underline
                  })
                  .text("Terms and Conditions"); // The visible link text

                // Append the link element to the "I accept the terms and conditions" text
                $registerTermsLink.append("I accept the ");
                $registerTermsLink.append($termsLink);

                // Append the "I accept the terms and conditions" text to the existing paragraph
                $registerLoginLink.append($registerTermsLink);

                const $registerLoginLinkRed = $("<p>")
                  .text("Do you have an account ? ")
                  .css({
                    color: "black",
                    "margin-top": "10px",
                    "margin-bottom": "10px",
                  });

                // Append the "Login" text to the existing paragraph
                const $registerLoginSpan = $("<span>")
                  .text("Login")
                  .css({
                    color: "red",
                    cursor: "pointer",
                  })
                  .click(function () {
                    // Add functionality to handle "Login" click here
                    $loginForm.css("display", "block");
                    $registrationForm.css("display", "none");
                    FormCleaner();
                    ErrorCleaner();
                  });
                const errorTextEmailReg = "Invalid email address";
                const $errorElementReg = $("<div>")
                  .css({
                    color: "red",
                    "text-align": "right",
                    display: "none",
                    "font-size": "14px",
                  })
                  .text(errorTextEmailReg);
                // Append the "Login" text to the existing paragraph
                $registerLoginLinkRed.append($registerLoginSpan);
                $registerLoginLink.append($registerLoginLinkRed);
                // Append registration form elements to the registration form div
                $registrationForm.append($registerHeader);
                $registrationForm.append($redTextreg);
                $registrationForm.append($ApierrorRegistration)
                // Append the name input field to the registration form
                $registrationForm.append($registerNameInput);
                $registrationForm.append($emptyFieldErrorRegisterName);
                $registrationForm.append($registerEmailInput);
                $registrationForm.append($errorElementReg);
                $registrationForm.append($emptyFieldErrorRegisterEmail);

                $registrationForm.append($registerPasswordField);
                $registrationForm.append($emptyFieldErrorRegisterPass);
                $registrationForm.append($errorElementPass);
                $registrationForm.append($registerButton);
                $registrationForm.append($registerOtherOptionsSection);
                $registrationForm.append($footerImage);
                $registerOtherOptionsSection.append($registerHorizontalRule);
                $registerOtherOptionsSection.append(gIdOnloadDiv1);
                $registerOtherOptionsSection.append(gIdSigninDiv1);
                $registerOtherOptionsSection.append($registerLoginLink);

                // Append the registration form div to the registration modal content
                $registerModalContent.append($registrationForm);
                $registerModalContent.append($loginForm);
                $registerModalContent.append($ForgotPassForm);
                // Create a div for the image
                const $imageDivReg = $("<div>")
                  .css({
                    flex: "1",
                    width: "100%",
                    "max-width": "400px",
                    display: "flex", // Add display flex to arrange the form and image side by side
                    "flex-direction": "column", // Arrange them horizontally
                    "align-items": "center", // Center the image horizontally
                  })
                  .addClass("d-none d-xl-block");
                // }).addClass("d-none d-lg-block d-xl-block");

                // Create an image element
                const $registrationImage = $("<img>")
                  .attr(
                    "src",
                    "https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/authentication-image.jpg"
                  ) // Replace with the actual path to your image
                  .css({
                    "max-width": "100%",
                    height: "100%", // Maintain aspect ratio
                    "object-fit": "cover",
                  });

                // Append the image to the image div
                $imageDivReg.append($registrationImage);

                // Append the image div to the registration modal content
                $registerModalContent.append($imageDivReg);
                function ErrorCleaner() {
                  $errorElementForgot.css("display", "none");
                  $errorElementLogin.css("display", "none");
                  $errorElementReg.css("display", "none");
                  $errorElementOtp.css("display", "none");
                  $errorElementResetPass.css("display", "none");
                  $emptyFieldErrorForgot.css("display", "none");
                  $emptyFieldErrorLogin.css("display", "none");
                  $emptyFieldErrorLoginPass.css("display", "none");
                  $emptyFieldErrorRegisterName.css("display", "none");
                  $emptyFieldErrorRegisterEmail.css("display", "none");
                  $emptyFieldErrorRegisterPass.css("display", "none");
                  $emptyFieldErrorOtp.css("display", "none");
                  $emptyFieldErrorResetPass.css("display", "none");
                  $errorElementPass.css("display", "none");
                  $ApierrorforgotPass.css("display", "none");
                  $ApierrorLogin.css("display", "none");
                  $ApierrorRegistration.css("display", "none");
                  $ApierrorResetPass.css("display", "none");
                  $ApierrorOTP.css("display", "none");

                }
                function FormCleaner() {
                  $emailInput.val("");
                  $passwordInput.val("");
                  $otpInput.val("");
                  $registerEmailInput.val("");
                  $registerNameInput.val("");
                  $registerPasswordField.val("");
                  $ForgotPassEmailInput.val("");
                  $ResetInput.val("");
                  $ResetPassInput.val("");
                  $ResetPassReInput.val("");
                }
                function onClosed() {
                  $registerModal.css("display", "none");
                  $registrationForm.css("display", "none");
                  $loginForm.css("display", "none");
                  $otpForm.css("display", "none");
                  $ResetPassForm.css("display", "none");
                  $ForgotPassForm.css("display", "none");
                  ErrorCleaner();
                }
                // Create a close button for the registration modal
                const $registerModalClose = $("<span>")
                  .html("&times;")
                  .addClass("modal-close")
                  .click(function () {
                    onClosed();
                    FormCleaner();
                  });

                $registerModalClose.css({
                  color: "#aaa",
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  "font-size": "28px",
                  "font-weight": "bold",
                  cursor: "pointer",
                  "background-color": "#fff",
                  padding: "0px 10px",
                });

                // Append the close button to the registration modal content
                $registerModalContent.append($registerModalClose);

                // Append the registration modal content to the registration modal
                $registerModal.append($registerModalContent);

                // Append the registration modal to the body
                $("body").append($registerModal);
                // Open the registration modal when the "Register" button is clicked
                $Register.click(function () {
                  $registerModal.css("display", "block");
                  $loginForm.css("display", "none");
                  $registrationForm.css("display", "block");
                });
                // Create a div for the OTP form
                const $otpForm = $("<div>").css({
                  display: "none", // Initially hide the OTP form
                  // 'flex': '1', // Allow the OTP form to grow within the flex container
                  padding: "20px 60px", // Add padding for spacing
                });

                // Create an h2 header for the OTP form
                const $otpHeader = $("<h2>").text("OTP Verification").css({
                  // Add your styling for the OTP form header
                });

                // Create the red text "Enter OTP for verification"
                const $redTextOtp = $("<p>")
                  .text("Enter OTP for verification")
                  .css({
                    color: "red",
                    "margin-top": "5px", // Adjust margin if needed
                  });
                const $ApierrorOTP = $("<div>").css({
                  display: "none",
                  color: "red",
                  "margin-top": "5px",
                });
                const $emptyFieldErrorOtp = $("<div>")
                  .css({
                    color: "red",
                    "text-align": "right",
                    display: "none",
                    "font-size": "14px",
                  })
                  .text("OTP is required");
                const errorTextOtp = "Enter a valid OTP";
                const $errorElementOtp = $("<div>")
                  .css({
                    color: "red",
                    "text-align": "right",
                    display: "none",
                  })
                  .text(errorTextOtp);
                // Create an input field for OTP
                const $otpInput = $("<input>")
                  .attr("type", "number")
                  .addClass("custom-input")
                  .attr("id", "otpInput")
                  .keydown(function (event) {
                    if (event.keyCode == 32) {
                      event.preventDefault();
                    }
                  })
                  .css({
                    width: "100%",
                    height: "40px",
                    "background-color": "#F6F5F5",
                    position: "relative",
                    border: "none",
                    "padding-right": "10px",
                    "text-align": "right",
                    "margin-top": "10px",
                    "margin-bottom": "10px",
                  })
                  .attr("placeholder", "Enter OTP")
                  .on("focus", function () {
                    $(this).css("color", "#333");
                  })
                  .on("blur", function () {
                    if ($(this).val() === "") {
                      $(this).css("color", "#999");
                    }
                  })
                  .on("input", function () {
                    const otpRegex = /^\d{6}$/;

                    const otpInput = $(this).val();
                    if (!otpRegex.test(otpInput)) {
                      $errorElementOtp.css("display", "block");
                      $emptyFieldErrorOtp.css("display", "none");
                    } else {
                      $errorElementOtp.css("display", "none");
                    }
                    if (otpInput.trim() === "") {
                      console.log(123);
                      $emptyFieldErrorOtp.css("display", "block");
                      $errorElementOtp.css("display", "none");
                    } else {
                      $emptyFieldErrorOtp.css("display", "none");
                    }
                  });

                // Create a button for OTP confirmation
                const $otpConfirmButton = $("<button>")
                  .text("Submit OTP")
                  .css({
                    "margin-top": "10px",
                    width: "100%",
                    padding: "5px 10px",
                    background: "#E8505B",
                    border: "none",
                    outline: "none",
                    color: "white",
                    "margin-top": "10px",
                    "margin-bottom": "10px",
                  })
                  .click(handleOTPConfirmation);
                // Create the horizontal rule for the section
                const $OtpHorizontalRule = $("<hr>").css({
                  border: "none",
                  "border-top": "1px solid #999",
                  margin: "10px 0px",
                });

                // Append the "Login" text to the existing paragraph
                const $BackToLogin = $("<p>")
                  .text("Back to Login")
                  .css({
                    color: "red",
                    "margin-top": "5px",
                    cursor: "pointer",
                  })
                  .click(function () {
                    // Add functionality to handle "Login" click here
                    // For example, you can show the login modal or trigger an action.
                    $registrationForm.css("display", "none");
                    $loginForm.css("display", "block"); // Show the login modal
                    $otpForm.css("display", "none");
                    $ForgotPassForm.css("display", "none");
                    FormCleaner();
                  });
                // Create the footer image for the OTP form
                const $footerImageOtp = $("<img>")
                  .attr(
                    "src",
                    "https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/comment-logo.png"
                  )
                  .css({
                    width: "155.07px",
                    height: "20px",
                    "margin-top": "20px", // Adjust margin as needed
                  });

                // Append OTP form elements to the OTP form container
                $otpForm.append($otpHeader);
                $otpForm.append($redTextOtp);
                $otpForm.append($ApierrorOTP)
                $otpForm.append($otpInput);
                $otpForm.append($emptyFieldErrorOtp);
                $otpForm.append($errorElementOtp);
                $otpForm.append($otpConfirmButton);
                $otpForm.append($OtpHorizontalRule);
                $otpForm.append($BackToLogin);
                $otpForm.append($footerImageOtp);
                // Append the OTP form to the document body or another container
                $("body").append($otpForm);

                // Function to handle OTP confirmation
                async function handleOTPConfirmation() {
                  const enteredOTP = $otpInput.val().trim();
                  const otpRegex = /^\d{6}$/;
                  if (enteredOTP === "") {
                    $emptyFieldErrorOtp.css("display", "block");
                    return;
                  }
                  if (!otpRegex.test(enteredOTP)) {
                    $errorElementOtp.css("display", "block");
                    return;
                  }
                  const email = $registerEmailInput.val();
                  const otpConfirmationPayload = {
                    email: email,
                    otp: parseInt(enteredOTP),
                    // Include any other necessary data for OTP confirmation
                  };
                  const $spinner = $("<div>")
                    .addClass("spinner-border spinner-border-sm mx-3 text-light")
                    .attr("role", "status")
                    .appendTo($otpConfirmButton);

                  $otpConfirmButton.prop("disabled", true)
                  // Prepare the payload for OTP confirmation
                  try {

                    const response = await axios.post(
                      "https://68b6-137-184-19-129.ngrok-free.app/api/v1/user/verify-otp-for-article",
                      otpConfirmationPayload,
                      {
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    );

                    // Handle the API response here
                    console.log(response.data); // You can replace this with your desired logic
                    $registerModal.css("display", "none");
                    onClosed();
                    FormCleaner();
                    alert("User Verified successfully. Please Login.");
                  } catch (error) {
                    console.error("Error:", error);
                    $ApierrorOTP.empty();
                    $ApierrorOTP.append($("<p>").text(error.response.data.message));
                    $ApierrorOTP.css("display", "block");
                    // Handle errors here if necessary
                  } finally {
                    // Enable button and remove spinner after API call is complete
                    $otpConfirmButtons.prop("disabled", false);
                    $spinner.remove();
                  }
                }

                // Create a div for the OTP form
                const $ResetPassForm = $("<div>").css({
                  display: "none", // Initially hide the OTP form
                  // 'flex': '1', // Allow the OTP form to grow within the flex container
                  padding: "20px 60px", // Add padding for spacing
                });

                // Create an h2 header for the OTP form
                const $ResetPassHeader = $("<h2>").text("Reset password").css({
                  // Add your styling for the OTP form header
                });

                // Create the red text "Enter OTP for verification"
                const $RedTextResetPass = $("<p>")
                  .text("Enter OTP & new password")
                  .css({
                    color: "red",
                    "margin-top": "5px", // Adjust margin if needed
                  });
                const $ApierrorResetPass = $("<div>").css({
                  display: "none",
                  color: "red",
                  "margin-top": "5px",
                });
                const $PasswordNotSame = $("<p>")
                  .text("Password must be same")
                  .css({
                    display: "none",
                    color: "red",
                    "margin-top": "5px", // Adjust margin if needed
                  });
                const $emptyFieldErrorResetPass = $("<div>")
                  .css({
                    color: "red",
                    "text-align": "right",
                    display: "none",
                    "font-size": "14px",
                  })
                  .text("OTP is required");
                const $emptyFieldErrorResetNewPass = $("<div>")
                  .css({
                    color: "red",
                    "text-align": "right",
                    display: "none",
                    "font-size": "14px",
                  })
                  .text("New password is required");
                const $emptyFieldErrorResetConfirmPass = $("<div>")
                  .css({
                    color: "red",
                    "text-align": "right",
                    display: "none",
                    "font-size": "14px",
                  })
                  .text("Repeat password is required");
                const errorTextResetPass = "Enter a valid OTP";
                const $errorElementResetPass = $("<div>")
                  .css({
                    color: "red",
                    "text-align": "right",
                    display: "none",
                  })
                  .text(errorTextResetPass);

                const errorTextPassReset =
                  "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character";
                const $errorElementPassReset = $("<div>")
                  .css({
                    color: "red",
                    "text-align": "right",
                    display: "none",
                    "font-size": "14px",
                  })
                  .text(errorTextPassReset);
                const errorTextPassResetConfirm =
                  "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character";
                const $errorElementPassResetConfirm = $("<div>")
                  .css({
                    color: "red",
                    "text-align": "right",
                    display: "none",
                    "font-size": "14px",
                  })
                  .text(errorTextPassResetConfirm);
                // Create the password input field
                // Create an input field for OTP
                const $ResetInput = $("<input>")
                  .attr("type", "number")
                  .addClass("custom-input")
                  .attr("id", "ResetInput")
                  .keydown(function (event) {
                    if (event.keyCode == 32) {
                      event.preventDefault();
                    }
                  })
                  .css({
                    width: "100%",
                    height: "40px",
                    "background-color": "#F6F5F5",
                    position: "relative",
                    border: "none",
                    "padding-right": "10px",
                    "text-align": "right",
                    "margin-top": "10px",
                    "margin-bottom": "10px",
                  })
                  .attr("placeholder", "Enter OTP")
                  .on("focus", function () {
                    $(this).css("color", "#333");
                  })
                  .on("blur", function () {
                    if ($(this).val() === "") {
                      $(this).css("color", "#999");
                    }
                  })
                  .on("input", function () {
                    const otpRegex = /^\d{6}$/;

                    const ResetInput = $(this).val();
                    if (!otpRegex.test(ResetInput)) {
                      $errorElementResetPass.css("display", "block");
                      $emptyFieldErrorResetPass.css("display", "none");
                    } else {
                      $errorElementResetPass.css("display", "none");
                    }
                    if (ResetInput.trim() === "") {
                      console.log(123);
                      $emptyFieldErrorResetPass.css("display", "block");
                      $errorElementResetPass.css("display", "none");
                    } else {
                      $emptyFieldErrorResetPass.css("display", "none");
                    }
                  });
                // Create the password input field
                const $ResetPassInput = $("<input>")
                  .attr("type", "password") // Set the input type to password
                  .addClass("custom-input")
                  .attr("id", "passwordField")
                  .css({
                    width: "100%", // Adjust input width
                    height: "40px",
                    "background-color": "#F6F5F5",
                    position: "relative",
                    border: "none",
                    "padding-right": "10px", // Adjust right padding for the input
                    "text-align": "right", // Align text to the right
                    "margin-top": "10px",
                    "margin-bottom": "10px",
                  })
                  .keydown(function (event) {
                    if (event.keyCode == 32) {
                      event.preventDefault();
                    }
                  })
                  .attr("placeholder", "New password")
                  .on("focus", function () {
                    // Change the placeholder text color when input is focused
                    $(this).css("color", "#333");
                  })
                  .on("blur", function () {
                    // Restore the placeholder text color when input is blurred
                    if ($(this).val() === "") {
                      $(this).css("color", "#999");
                    }
                  })
                  .on("input", function () {
                    const password = $(this).val();
                    const passwordRegex =
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

                    if (!passwordRegex.test(password)) {
                      $errorElementPassReset.css("display", "block");
                      $emptyFieldErrorResetNewPass.css("display", "none");
                    } else {
                      $errorElementPassReset.css("display", "none");
                    }
                    if (password.trim() === "") {
                      $errorElementPassReset.css("display", "none");
                      $emptyFieldErrorResetNewPass.css("display", "block");
                    }
                  });

                // Create the password input field
                const $ResetPassReInput = $("<input>")
                  .attr("type", "password") // Set the input type to password
                  .addClass("custom-input")
                  .attr("id", "passwordField")
                  .css({
                    width: "100%", // Adjust input width
                    height: "40px",
                    "background-color": "#F6F5F5",
                    position: "relative",
                    border: "none",
                    "padding-right": "10px", // Adjust right padding for the input
                    "text-align": "right", // Align text to the right
                    "margin-top": "10px",
                    "margin-bottom": "10px",
                  })
                  .keydown(function (event) {
                    if (event.keyCode == 32) {
                      event.preventDefault();
                    }
                  })
                  .attr("placeholder", "Confirm password")
                  .on("focus", function () {
                    // Change the placeholder text color when input is focused
                    $(this).css("color", "#333");
                  })
                  .on("blur", function () {
                    // Restore the placeholder text color when input is blurred
                    if ($(this).val() === "") {
                      $(this).css("color", "#999");
                    }
                  })
                  .on("input", function () {
                    const password = $(this).val();
                    const passwordRegex =
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

                    if (!passwordRegex.test(password)) {
                      $errorElementPassResetConfirm.css("display", "block");
                      $emptyFieldErrorResetConfirmPass.css("display", "none");
                    } else {
                      $errorElementPassResetConfirm.css("display", "none");
                    }
                    if (password.trim() === "") {
                      $errorElementPassResetConfirm.css("display", "none");
                      $emptyFieldErrorResetConfirmPass.css("display", "block");
                    }
                  });

                // Create a button for OTP confirmation
                const $ResetPassButton = $("<button>")
                  .text("Reset password")
                  .css({
                    "margin-top": "10px",
                    width: "100%",
                    padding: "5px 10px",
                    background: "#E8505B",
                    border: "none",
                    outline: "none",
                    color: "white",
                    "margin-top": "10px",
                    "margin-bottom": "10px",
                  })
                  .click(handleResetSubmit);
                // Create the horizontal rule for the section
                const $ResetPassHorizontalRule = $("<hr>").css({
                  border: "none",
                  "border-top": "1px solid #999",
                  margin: "10px 0px",
                });

                // Append the "Login" text to the existing paragraph
                const $BackToLoginResetPass = $("<p>")
                  .text("Back to Login")
                  .css({
                    color: "red",
                    "margin-top": "5px",
                    cursor: "pointer",
                  })
                  .click(function () {
                    // Add functionality to handle "Login" click here
                    // For example, you can show the login modal or trigger an action.
                    $registrationForm.css("display", "none");
                    $loginForm.css("display", "block"); // Show the login modal
                    $ResetPassForm.css("display", "none");
                    $ForgotPassForm.css("display", "none");
                    FormCleaner();
                    ErrorCleaner();
                  });

                // Append OTP form elements to the OTP form container
                $ResetPassForm.append($ResetPassHeader);
                $ResetPassForm.append($RedTextResetPass);
                $ResetPassForm.append($PasswordNotSame);
                $ResetPassForm.append($ResetInput);
                $ResetPassForm.append($emptyFieldErrorResetPass);
                $ResetPassForm.append($errorElementResetPass);
                $ResetPassForm.append($ResetPassInput);
                $ResetPassForm.append($emptyFieldErrorResetNewPass);
                $ResetPassForm.append($errorElementPassReset);
                $ResetPassForm.append($ResetPassReInput);
                $ResetPassForm.append($emptyFieldErrorResetConfirmPass);
                $ResetPassForm.append($errorElementPassResetConfirm);

                $ResetPassForm.append($ResetPassButton);
                $ResetPassForm.append($ResetPassHorizontalRule);
                $ResetPassForm.append($BackToLoginResetPass);
                $ResetPassForm.append(
                  '<img src="https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/comment-logo.png" style="width: 155.07px; height: 20px; margin-top: 20px;">'
                );
                // Append the OTP form to the document body or another container
                $("body").append($ResetPassForm);

                // Function to handle OTP confirmation
                async function handleResetSubmit() {
                  const enteredOTP = $ResetInput.val().trim();
                  const otpRegex = /^\d{6}$/;
                  const newPass = $ResetPassInput.val().trim();
                  const confirmPass = $ResetPassReInput.val().trim();
                  console.log(newPass, confirmPass, "asas");
                  if (enteredOTP === "") {
                    $emptyFieldErrorResetPass.css("display", "block");
                    if (newPass === "") {
                      $emptyFieldErrorResetNewPass.css("display", "block");
                      if (confirmPass === "") {
                        $emptyFieldErrorResetConfirmPass.css(
                          "display",
                          "block"
                        );
                        return;
                      }
                      return;
                    }
                    if (confirmPass === "") {
                      $emptyFieldErrorResetConfirmPass.css("display", "block");
                      return;
                    }
                    return;
                  }
                  if (newPass === "") {
                    $emptyFieldErrorResetNewPass.css("display", "block");
                    if (confirmPass === "") {
                      $emptyFieldErrorResetConfirmPass.css("display", "block");
                      return;
                    }
                    return;
                  }
                  if (confirmPass === "") {
                    $emptyFieldErrorResetConfirmPass.css("display", "block");
                    return;
                  }
                  if (!otpRegex.test(enteredOTP)) {
                    $errorElementResetPass.css("display", "block");
                    return;
                  }
                  const passwordRegex =
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                  if (
                    !passwordRegex.test(newPass) ||
                    !passwordRegex.test(confirmPass)
                  ) {
                    return;
                  }

                  if (newPass !== confirmPass) {
                    $PasswordNotSame.css("display", "block");
                    return;
                  } else {
                    $PasswordNotSame.css("display", "none");
                  }
                  const emailValue = $ForgotPassEmailInput.val();

                  const ResetPassVal = {
                    email: emailValue,
                    otp: parseInt(enteredOTP),
                    password: newPass,
                    // Include any other necessary data for OTP confirmation
                  };
                  console.log(ResetPassVal);
                  const $spinner = $("<div>")
                    .addClass("spinner-border spinner-border-sm mx-3 text-light")
                    .attr("role", "status")
                    .appendTo($ResetPassButton);

                  $ResetPassButton.prop("disabled", true)
                  // Send a POST request to the OTP confirmation API
                  try {
                    const response = await axios.post(
                      " https://68b6-137-184-19-129.ngrok-free.app/api/v1/user/reset-password-article-page",
                      ResetPassVal,
                      {
                        headers: {
                          "Content-Type": "application/json",
                        },

                      }
                    );

                    if (response.status === 200) {
                      // Handle the API response here
                      $registerModal.css("display", "none");
                      onClosed();
                      FormCleaner();
                    }
                  } catch (error) {
                    console.error("Error:", error.response.data.message);
                    $ApierrorResetPass.empty();
                    $ApierrorResetPass.append(
                      $("<p>").text(error.response.data.message)
                    );
                    $ApierrorResetPass.css("display", "block");
                  } finally {
                    // Enable button and remove spinner after API call is complete
                    $ResetPassButton.prop("disabled", false);
                    $spinner.remove();
                  }
                }

                async function handleRegistration() {
                  const name = $registerNameInput.val().trim();
                  const email = $registerEmailInput.val();
                  const password = $registerPasswordField.val();
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                  if (name.trim() === "") {
                    $emptyFieldErrorRegisterName.css("display", "block");
                    if (email.trim() === "") {
                      $emptyFieldErrorRegisterEmail.css("display", "block");
                      if (password.trim() === "") {
                        $emptyFieldErrorRegisterPass.css("display", "block");
                        return;
                      }
                      return;
                    }
                    return;
                  }
                  if (email.trim() === "") {
                    $emptyFieldErrorRegisterEmail.css("display", "block");
                    if (password.trim() === "") {
                      $emptyFieldErrorRegisterPass.css("display", "block");
                      return;
                    }
                    return;
                  }
                  if (!emailRegex.test(email)) {
                    $errorElementReg.css("display", "block");
                    return;
                  }
                  if (password.trim() === "") {
                    $emptyFieldErrorRegisterPass.css("display", "block");
                    return;
                  }
                  const passwordRegex =
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                  if (!passwordRegex.test(password)) {
                    $errorElementPass.css("display", "block");
                    return;
                  }
                  // Log the form input values to the console
                  console.log("Name:", name);
                  console.log("Email:", email);
                  console.log("Password:", password);
                  const $spinner = $("<div>")
                    .addClass("spinner-border spinner-border-sm mx-3 text-light")
                    .attr("role", "status")
                    .appendTo($registerButton);

                  $registerButton.prop("disabled", true)
                  // Prepare the payload
                  const payload = {
                    name: name,
                    email: email,
                    password: password,
                    site: "israel-today",
                    ip: "172.16.2.52",
                    device: "web",
                  };
                  console.log(payload, "111111111111")
                  try {
                    const response = await axios.post(
                      "https://68b6-137-184-19-129.ngrok-free.app/api/v1/user/register-article-page",
                      payload,
                      {
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    );

                    if (response.status === 200) {
                      // Handle the API response here
                      console.log(response.data); // You can replace this with your desired logic

                      // Close the registration form and show the OTP confirmation form if registration is successful
                      $registerModalContent.append($otpForm);
                      $registerModalContent.append($imageDivReg);

                      $registrationForm.css("display", "none");
                      $otpForm.css({
                        display: "block",
                        flex: "1", // Allow the OTP form to grow within the flex container
                        padding: "20px 60px", // Add padding for spacing
                      });
                    } else {
                      throw new Error("Network response was not ok");
                    }
                  } catch (error) {
                    console.error("Error:", error.response.data.message);
                    $ApierrorRegistration.empty();
                    $ApierrorRegistration.append($("<p>").text(error.response.data.message));
                    $ApierrorRegistration.css("display", "block");
                    // Handle errors here if necessary
                  } finally {
                    // Enable button and remove spinner after API call is complete
                    $registerButton.prop("disabled", false);
                    $spinner.remove();
                  }
                }

                $registerButton.click(handleRegistration);

                // Responsive adjustments using media queries
                // Adjust margins and flex direction for smaller screens
                function handleMediaQueryChange(e) {
                  if (e.matches) {
                    // For screens narrower than 768px
                    // $app.css({
                    //   "margin-left": "20px",
                    //   "margin-right": "20px",
                    // });
                    $flexContainer.css({
                      "margin-top": "20px",
                      "margin-bottom": "20px",
                      "flex-direction": "column",
                    });
                    $firstImageContainer.find("img").css("max-width", "100%");
                    $flexContainer.find("img").css("max-width", "100%");
                    $registerModalContent.css("width", "75%");
                  } else {
                    // Reset to the original styles for wider screens
                    $flexContainer.css({
                      "margin-top": "30px",
                      "margin-bottom": "30px",
                      "flex-direction": "row",
                    });
                    $firstImageContainer.find("img").css("max-width", "100%");
                    $flexContainer.find("img").css("max-width", "100%");
                    $registerModalContent.css("width", "50%");
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
        }
      );
    }
  );
});
