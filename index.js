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

document.addEventListener("DOMContentLoaded", function () {
 
    // Load CSS stylesheets
    loadCSS("https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css");
    loadCSS(
      "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
    );

    loadCSS(
      "https://cdn.jsdelivr.net/gh/DCP121/article-pages@b557d7200627dfa0c23b270638ca94ac5e9aaa4e/index.css"
    );
    loadCSS("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css")
    //loadCSS("./index.css");

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
                  let cliendId = null;
                  // Create a script element
                  const script = document.createElement("script");
                  // var API_URL = "https://41dd-137-184-19-129.ngrok-free.app/api/v1"
                  var API_URL = "https://505f-137-184-19-129.ngrok-free.app/api/v1"

                  var FILE_URL = "https://505f-137-184-19-129.ngrok-free.app"

                  // Set the source and other attributes for the script
                  script.src =
                    "https://cdnjs.cloudflare.com/ajax/libs/mqtt/5.1.0/mqtt.min.js";
                  script.integrity =
                    "sha512-C10IteuUJLMBoevZKRdXaNtOzd98KOO+Id471TSREver+ByaLm8IyQekKjIMYzn6j1bt07CBazpOFEWGaNhowQ==";
                  script.crossOrigin = "anonymous";
                  script.referrerPolicy = "no-referrer";
                  // const pageId = document.getElementsByName("page_id")[0].id;
                  // // const site =
                  // //   document.getElementsByName("page_id")[0].attributes.for
                  // //     .value;
                  const article_page_id = document.getElementsByName("article_page_id")[0].attributes.for.value
                  var parts = article_page_id.split("-");
                  var site = parts[0];
                  var saparetId = parts[1];
                  var page_url = window.location.href;
                  console.log(site, saparetId,"article_page_id")
                  var siteName =
                    site == "israel" ? "israel-today" : "ittihad-today";
                  // An mqtt variable will be initialized globally
                  const url =
                    "wss://d1e35906.ala.us-east-1.emqxsl.com:8084/mqtt"; //add the ip address with port that we got from the docker run
                  const options = {
                    username: "tridhyatech",
                    password: "Abcd1234",
                  };
                  script.onload = () => {
                    // Create an MQTT client instance
                    const client = mqtt.connect(url, options);

                    client.on("connect", function () {
                      console.log("Connected", saparetId, site, client);
                    });
                    client.subscribe(`${saparetId}:${site}`);
                    client.on("message", function (topic, message, packet) {
                      commentlistapi(false);
                    });
                  };
                  document.head.appendChild(script);

                  // Create a div container with the id "app"
                  var ipAddress;
                  const getIp = async () => {
                    const response = await fetch(
                      `https://api64.ipify.org/?format=json`
                    );
                    if (!response.ok) {
                      throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const data = await response.json();
                    const ipAddress = data.ip;
                    return ipAddress;
                  };
                  (async () => {
                    try {
                      ipAddress = await getIp();
                      console.log('ip', ipAddress);
                    } catch (error) {
                      console.error('Error:', error);
                    }
                  })();
                  const $container = $("<div>").addClass("container");
                  const $app = $("#load-article-comment");
                  const containerClass = "image-container";
                  const bannerClass = "top-banner";
                  //api for comment listing pages
                  var commentlistingdata;
                  var showmorcomment = 10;
                  let apiFlags = true;
                  var englishJson = {
                    "title": "Title",
                    "subtitle_text": "Subtitle text",
                    "login": "Login",
                    "register": "Register",
                    "comment": "Comments",
                    "send": "Send",
                    "anonymous_user": "Anonymous user",
                    "add_your_comment": "Add your comment",
                    "see_org_comment": "See original comment",
                    "see_upt_comment": "See updated comment",
                    "posted": "Posted",
                    "min_ago": "min ago",
                    "just_now": "Just now",
                    "hour_ago": "hour ago",
                    "hours_ago": "hours ago",
                    "day_ago": "day ago",
                    "days_ago": "days ago",
                    "show_more_cmt": "Show more comments",
                    "footer_text": "Footer text",
                    "register_desc": "To comment you need to register",
                    "name": "Name",
                    "email": "Email",
                    "password": "Password",
                    "new_password": "New password",
                    "confirm_password": "Confirm password",
                    "create_account": "Create account",
                    "other_options": "Other options",
                    "register_model_footer": "I accept the ",
                    "terms_condition": "terms and conditions",
                    "do_account": "Do you have an account? ",
                    "login_desc": "To comment you need to login",
                    "forgot_password": "Forgot password ?",
                    "login_model_footer": "Don’t have an account? ",
                    "reset_password": "Reset password",
                    "forgot_desc": "Enter your email address And we will send you an email to reset",
                    "back_to_login": "Back to login",
                    "submit": "Submit",
                    "login_form": "Login form",
                    "reset_desc": "Enter OTP & new password",
                    "otp_header": "OTP Verification",
                    "otp_desc": "Enter OTP for verification",
                    "otp_placeholder": "Enter OTP",
                    "submit_otp": "Submit OTP"
                  }

                  var arabicJson = {
                    "title": "اهلا وسهلا",
                    "subtitle_text": "حلبة رد مشترك لاتحاد الأمروى وإسرائيل صوتك فى الشرق الأوسط الجديد",
                    "login": "تسجيل",
                    "register": "اتصال",
                    "comment": "الردود",
                    "send": "يرسل",
                    "anonymous_user": "مستخدم مجهول",
                    "add_your_comment": "أضف تعليقك",
                    "see_org_comment": "أظهر المزيد من التعليقات",
                    "see_upt_comment": "انظر التعليق المحدث",
                    "posted": "دقائق",
                    "min_ago": "منذ",
                    "just_now": "الآن فقط",
                    "hour_ago": "منذ ساعة",
                    "hours_ago": "منذ ساعات",
                    "day_ago": "منذ يوم",
                    "days_ago": "منذ أيام",
                    "show_more_cmt": "أظهر المزيد من التعليقات",
                    "footer_text": "حلبة رد مشترك لاتحاد الأمروى وإسرائيل صوتك فى الشرق الأوسط الجديد المزيد من النص ...",
                    "register_desc": "للرد عليك التسجيل",
                    "name": "اسم",
                    "email": "بريد إلكتروني",
                    "password": "كلمة المرور",
                    "new_password": "كلمة مرور جديدة",
                    "confirm_password": "تأكيد كلمة المرور",
                    "create_account": "إنشاء حساب",
                    "other_options": "يمكنك أيضا التسجيل عن طريق",
                    "register_model_footer": "بالتسجيل فإنك توافق على",
                    "terms_condition": "الشروط وسياسة الخصوصية",
                    "do_account": "الخاصة بنا هل لديك حساب؟ ",
                    "login_desc": "للرد عليك التسجيل",
                    "forgot_password": "نسيت كلمة السر؟",
                    "login_model_footer": "ليس لديك حساب؟ ",
                    "reset_password": "إعادة تعيين كلمة المرور",
                    "forgot_desc": "أدخل عنوان بريدك الالكتروني وسنرسل لك رسالة إعادة تعيين كلمة المرور",
                    "back_to_login": "العودة إلى تسجيل الدخول",
                    "submit": "إرسال",
                    "otp_desc": "أدخل كلمة المرور لمرة واحدة للتحقق",
                    "login_form": "نموذج تسجيل الدخول",
                    "reset_desc": "أدخل كلمة المرور لمرة واحدة وكلمة المرور الجديدة",
                    "otp_header": "التحقق من كلمة المرور لمرة واحدة",
                    "otp_desc": "أدخل كلمة المرور لمرة واحدة للتحقق",
                    "otp_placeholder": "أدخل كلمة المرور لمرة واحدة",
                    "submit_otp": "إرسال كلمة المرور لمرة واحدة"
                  }
                  var hebrewJson = {
                    "title": "אהלן וסהלן",
                    "subtitle_text": "זירת תגובות משותפת לאיחוד האמרויות וישראל, הקול שלכם במזרח התיכון החדש",
                    "login": "הרשמה",
                    "register": "הרשמה",
                    "comment": "תגובות",
                    "send": "שלח",
                    "anonymous_user": "משתמש אנונימי",
                    "add_your_comment": "הוסף את תגובתך",
                    "see_org_comment": "הצג בשפת המקור",
                    "see_upt_comment": "ראה תגובה מעודכנת",
                    "posted": "דק’",
                    "min_ago": "לפני ",
                    "just_now": "בדיוק",
                    "hour_ago": "לפני שעה",
                    "hours_ago": "לפני שעות",
                    "day_ago": "יום לפני",
                    "days_ago": "לפני ימים",
                    "show_more_cmt": "הצג תגובות נוספות",
                    "footer_text": "זירת תגובות משותפת לאיחוד האמרויות וישראל, הקול שלכם במזרח התיכון החדש טקסט נוסף...",
                    "register_desc": "על מנת להגיב יש להרשם",
                    "name": "שם",
                    "email": "מייל",
                    "password": "סיסמה",
                    "new_password": "סיסמה חדשה",
                    "confirm_password": "אשר סיסמה",
                    "create_account": "צור חשבון",
                    "other_options": "אפשר להרשם גם ע”י",
                    "register_model_footer": "ע”י הרשמה אתה מסכים",
                    "terms_condition": "לתנאים ולמדיניות הפרטיות",
                    "do_account": "? כבר יש לך חשבון",
                    "login_desc": "על מנת להגיב יש להרשם",
                    "forgot_password": "שכחת את הסיסמה?",
                    "login_model_footer": "אין לך חשבון? להרשמה",
                    "reset_password": "איפוס סיסמה",
                    "forgot_desc": "הכנס את כתובת המייל שלך ואנו נשלח לך הודעה לאיפוס סיסמה",
                    "submit": "שלח",
                    "otp_desc": "הזן OTP לאימות",
                    "login_form": "טופס התחברות",
                    "reset_desc": "הזן OTP וסיסמה חדשה",
                    "otp_header": "אימות OTP",
                    "otp_desc": "הזן OTP לאימות",
                    "otp_placeholder": "הזן OTP",
                    "submit_otp": "שלח OTP"
                  }
                  var JsonData = englishJson
                  const reenterapicall = async (apiFlag) => {
                    if (showmorcomment == 10) {
                      var $spinnerdiv = $("<div>");
                      var $spinnerapilist = $("<div>")
                        .addClass(
                          "spinner-border spinner-border-md mt-5 text-danger text-center "
                        )
                        .attr("role", "status");
                      $spinnerdiv
                        .append($spinnerapilist)
                        .addClass("main-loader")
                        .appendTo($app);
                    }

                    const ipAddress = await getIp();
                    const token = localStorage.getItem("token");
                    const userData = JSON.parse(
                      localStorage.getItem("userData")
                    );
                    const userId = userData && userData._id;
                    const headers = {
                      "Content-Type": "application/json", // Specify the content type as JSON
                    };

                    if (token) {
                      headers["Authorization"] = `Bearer ${token}`;
                    }

                    $.ajax({
                      url: `${API_URL}/artical-page/articalPage?pageId=${saparetId
                        }&userId=${userId && userId !== null ? userId : ""
                        }&site=${site == "israel"
                          ? "israelBackOffice"
                          : "ittihadBackOffice"
                        }`, // Replace with your API endpoint
                      method: "POST",
                      dataType: "json",
                      headers: headers,
                      data: JSON.stringify({
                        itemsPerPage: showmorcomment,
                        ip: ipAddress,
                        url:page_url
                      }),

                      success: function (data) {
                        if (showmorcomment == 10) {
                          $spinnerapilist.remove();
                        }
                        // The data variable now holds the fetched data
                        commentlistingdata = data;
                        // apiFlags = apiFlag;
                        cliendId = data?.data?.pageData?.google_client_id;
                        console.log("111111111111.....", cliendId);

                        // You can use the data in subsequent operations or functions
                        processData(commentlistingdata, apiFlag);
                      },
                      error: function (xhr, status, error) {
                        console.log(status, xhr?.status, "sta", error, "err");
                        if (xhr?.status === 401) {
                          $spinnerapilist.remove();
                          localStorage.removeItem("token");
                          localStorage.removeItem("userData");
                        }
                         $spinnerapilist.remove();
                        console.error("Error fetching data:", error);
                      },
                    });
                  };
                  const commentlistapi = async (apiFlag) => {
                    if (showmorcomment == 10) {
                      var $spinnerdiv = $("<div>");
                      var $spinnerapilist = $("<div>")
                        .addClass(
                          "spinner-border spinner-border-md mt-5 text-danger text-center "
                        )
                        .attr("role", "status");
                      $spinnerdiv
                        .append($spinnerapilist)
                        .addClass("main-loader")
                        .appendTo($app);
                    }
                    if(apiFlag===false){
                      $spinnerapilist.remove();
                    }

                    const ipAddress = await getIp();
                    const token = localStorage.getItem("token");
                    const userData = JSON.parse(
                      localStorage.getItem("userData")
                    );
                    const userId = userData && userData._id;
                    const headers = {
                      "Content-Type": "application/json", // Specify the content type as JSON
                    };

                    if (token) {
                      headers["Authorization"] = `Bearer ${token}`;
                    }
                      var $errormeassgeloding=$("<div>").text('').css({direction:'ltr'})
                      $app.append($errormeassgeloding)
                    $.ajax({
                      url: `${API_URL}/artical-page/articalPage?pageId=${saparetId
                        }&userId=${userId && userId !== null ? userId : ""
                        }&site=${site == 'israel' ? "israelBackOffice" : "ittihadBackOffice"}`, // Replace with your API endpoint
                      method: "POST",
                      dataType: "json",
                      headers: headers,
                      data: JSON.stringify({
                        itemsPerPage: showmorcomment,
                        ip: ipAddress,
                        url: page_url
                      }),

                      success: function (data) {
                        if (showmorcomment == 10) {
                          $spinnerapilist.remove();
                        }
                        // The data variable now holds the fetched data
                        commentlistingdata = data;
                        apiFlags = apiFlag;
                        cliendId = data?.data?.pageData?.google_client_id;
                        console.log("111111111111.....", cliendId);

                        // You can use the data in subsequent operations or functions
                        processData(commentlistingdata, apiFlag);
                      },
                      error: function (xhr, status, error) {
                        console.log(xhr,status, xhr?.status, "sta", error, "err");
                        if (xhr?.status === 401) {
                          reenterapicall(true);
                          $spinnerapilist.remove();
                          localStorage.removeItem("token");
                          localStorage.removeItem("userData");
                        }
                         $spinnerapilist.remove();
                         $errormeassgeloding.text(xhr.responseJSON.message)
                        console.error("Error fetching data:", error);
                      },
                    });
                  };
                  commentlistapi(true);
                  function timeAgo(isoDateString) {
                    const now = new Date();
                    const commentTime = new Date(isoDateString);
                    const timeDifference = now - commentTime;
                    const minutes = Math.floor(timeDifference / (1000 * 60));

                    if (minutes < 1) {
                      return JsonData?.just_now;
                    } else if (minutes === 1) {
                      return `1 ${JsonData?.min_ago}`;
                    } else if (minutes < 60) {
                      return minutes + ` ${JsonData?.min_ago}`;
                    } else if (minutes < 1440) {
                      const hours = Math.floor(minutes / 60);
                      return hours + (hours === 1 ? ` ${JsonData?.hour_ago}` : ` ${JsonData?.hours_ago}`);
                    } else {
                      const days = Math.floor(minutes / 1440);
                      return days + (days === 1 ? ` ${JsonData?.day_ago}` : ` ${JsonData?.days_ago}`);
                    }
                  }
                  function processData(xyz, apiFlag) {
                    if (apiFlag) {
                      $app.empty();
                    } else {
                      $('#comment-section').remove()
                      $('.comments-group').remove()
                      $('#showmorecomment').remove()
                      $('#footerConatiner').remove()
                    }
                    function displayResponsiveImage(
                      $parent,
                      imagePath,
                      containerClass
                    ) {
                      // Create a container div for the image
                      const $imageContainer =
                        $("<div>").addClass(containerClass);

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
                    console.log(commentlistingdata.data.pageData, "data");
                    displayResponsiveImage(
                      $firstImageContainer,
                      // `https://raw.githubusercontent.com/DCP121/article-pages/13a7e50ce2b6889484f23815a3755d6be4fdc9a1/assets/comment-topbanner.jpg`,
                      `${FILE_URL}/${commentlistingdata.data.pageData.top_banner_image}`,
                      bannerClass
                    );
                    if (apiFlags) {
                      $app.append($firstImageContainer);
                    }

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
                      `${FILE_URL}/${commentlistingdata.data.pageData.logo_image}`,
                      containerClass
                    );

                    // Append the flex container to the main app container
                    if (apiFlags) {
                      $app.append($flexContainer);
                    }
                    // Responsive adjustments using media queries
                    // Adjust margins and flex direction for smaller screens
                    function handleMediaQueryChange(e) {
                      if (e.matches) {
                        // For screens narrower than 768px
                        $firstImageContainer
                          .find("img")
                          .css("max-width", "100%");
                        $flexContainer.find("img").css("max-width", "100%");
                      } else {
                        // Reset to the original styles for wider screens
                        $firstImageContainer
                          .find("img")
                          .css("max-width", "100%");
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
                    const $buttonsDiv = $("<div>").addClass(
                      "total-comments-wrap"
                    );

                    // Create buttons and add styles
                    var $Login = $("<button>")
                      .addClass("blue-button")
                      .text(JsonData?.login);

                    const $Register = $("<button>")
                      .addClass("blue-button")
                      .text(JsonData?.register);
                    const $Logout = $("<p>")
                      .text("Logout | ")
                      .addClass("logout-text")
                      .click(function () {
                        localStorage.removeItem("token");
                        localStorage.removeItem("userData");
                        $Login.css({ display: "block" });
                        $Register.css({ display: "block" });
                        $Logout.css({ display: "none" });
                        commentlistapi(true);
                        $("#ignismyModal").css("display", "block");
                        $("#ignismyModal").addClass("modal fade show");
                        $("#msgtag").html("Logout successfully!!");
                       
                        setTimeout(() => {
                          $("#ignismyModal").css("display", "none");
                          $("#msgtag").html("");
                        }, 2000);
                        // $Login.css({ display: "block" });
                        // $Register.css({ display: "block" });
                        // $Logout.css({ display: "none" });
                      });
                    // Create the text name element
                    const $textName = $("<div>")
                      .addClass("total-comments")
                      .text(
                        `${commentlistingdata?.data?.totalComment} ${JsonData?.comment}`
                      );

                    const isLogin = localStorage.getItem("token");
                    if (!isLogin) {
                      $Logout.css({ display: "none" });
                    } else {
                      $Login.css({ display: "none" });
                      $Register.css({ display: "none" });
                    }

                    //after login user name
                    const userData = JSON.parse(
                      localStorage.getItem("userData")
                    );

                    const capitalizeFirstLetter = (str) => {
                      if (typeof str !== "string" || str.length === 0) {
                        return "";
                      }
                      return str.charAt(0).toUpperCase() + str.slice(1);
                    };

                    const $username = $("<div>")
                      .addClass("top-user-name")
                      .text(
                        userData && userData !== ""
                          ? capitalizeFirstLetter(userData?.name)
                          : " "
                      );

                    // Append the elements to the main div

                    $mainDivForCommentSection.append($divider);
                    $mainDivForCommentSection.append($buttonsDiv);
                    $buttonsDiv.append($textName, $Register, $Login);
                    $buttonsDiv.append(
                      $Logout,
                      userData && userData !== null ? $username : ""
                    );

                    // Create the first child div (comment section)
                    const $commentSectionDiv =
                      $("<div>").addClass("comments-wrap");

                    // Create the input field and button
                    const $commentbuttonandinputdiv =
                      $("<div>").addClass("left");
                    const $comenttitle = $("<div>")
                      .addClass("user-name")
                      .text(
                        userData && userData !== ""
                          ? capitalizeFirstLetter(userData?.name)
                          : JsonData?.anonymous_user
                      );

                    //account is still pending

                    const $Accountpending = $("<div>").css({ direction: 'ltr' }).append(
                      $("<span>").text("Account is still pending confirmation"),
                      " ",
                      $("<span>")
                        .addClass("pending-useraccount")
                        // .html("Send confirmation email again <img src='./assets/alert-icon-svg.svg' alt='Send Email Icon style='width: 20px;' />")

                        .text("Send confirmation email again")
                        .click(function () {
                          $registerModal.css("display", "block");
                          $otpForm.css("display", "block");
                          const token = localStorage.getItem("token");

                          const headers = {
                            "Content-Type": "application/json", // Specify the content type as JSON
                          };
                          if (token) {
                            headers["Authorization"] = `Bearer ${token}`;
                          }
                          fetch(
                            `${API_URL}/user/resend-otp`,
                            {
                              method: "POST",
                              headers: headers,
                              body: JSON.stringify({
                                email: userData?.email,
                              }),
                            }
                          )
                            .then((response) => {
                              if (!response.ok) {
                                throw new Error("Network response was not ok");
                              }
                              return response.json();
                            })
                            .then((data) => {
                              console.log(data);
                            });
                        })
                    );

                    const $buttonandinputdiv =
                      $("<div>").addClass("add-comment");
                    const $commentButton = $("<button>")
                      .addClass("red-button")
                      .css({
                        direction: "ltr",
                      })
                      .text(JsonData?.send);

                    const $commentInput = $("<textarea>")
                      .addClass("form-control-input")
                      .attr({
                        type: "text",
                        placeholder: JsonData?.add_your_comment,
                      });
                    const $errorMessagecomment = $("<div>")
                      .css({ display: "flex", color: "red" })
                      .hide();

                    $buttonandinputdiv.append($commentInput, $commentButton);
                    $commentbuttonandinputdiv.append(
                      userData && userData.emailVerified == false
                        ? $Accountpending
                        : "",
                      $comenttitle,
                      $buttonandinputdiv,
                      $errorMessagecomment
                    );
                    $commentInput.on("input", function () {
                      const originalComment = $commentInput.val().trim();
                      const maxCommentLength = 200; // Change this to your desired maximum length

                      //rejex
                      const htmlPattern = /<[^>]*>/g;
                      const cssPattern = /([a-zA-Z-]+)\s*:\s*([^;]+);/g;
                      const linkPattern = /https?:\/\/\S+/g;
                      const emailPattern =
                        /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;

                      if (originalComment === "") {
                        $errorMessagecomment
                          .text("Comment cannot be empty")
                          .show();
                      } else if (originalComment.length > maxCommentLength) {
                        $errorMessagecomment
                          .text("Comment exceeds the maximum length")
                          .show();
                      } else if (
                        cssPattern.test(originalComment) ||
                        htmlPattern.test(originalComment) ||
                        linkPattern.test(originalComment) ||
                        emailPattern.test(originalComment)
                      ) {
                        $errorMessagecomment
                          .text("Invalid content in the comment")
                          .show();
                      } else {
                        $errorMessagecomment.hide();
                      }
                    });

                    // $commentInput.on("keyup", function (event) {
                    //   // Check if the Enter key (key code 13) was pressed
                    //   if (event.keyCode === 13) {
                    //     // Prevent the default behavior of the Enter key (e.g., form submission)
                    //     event.preventDefault();

                    //     // Trigger the comment submission logic when Enter key is pressed
                    //     submitComment();
                    //   }
                    // });

                    $commentButton.on("click", function () {
                      if (userData?.emailVerified === true) {

                        submitComment();
                      }
                      else if (userData === null) {

                        submitComment();
                      }
                      else {
                        $errorMessagecomment
                          .text("you are not verified pleace verified your account")
                          .show();
                      }
                    });

                    const submitComment = async () => {
                      //const ipAddress = await getIp();
                      if (commentlistingdata?.data?.pageData?.mustLogin) {
                        const token = localStorage.getItem("token");

                        if (!token) {
                          $commentButton.prop("disabled", false);
                          // Display registration and login modal when mustLogin is true and no token is present.
                          $registerModal.css("display", "block");
                          $loginForm.css("display", "block");
                        } else {
                          const originalComment = $commentInput.val().trim();
                          const maxCommentLength = 200;
                          const htmlPattern = /<[^>]*>/g;
                          const cssPattern = /([a-zA-Z-]+)\s*:\s*([^;]+);/g;
                          const linkPattern = /https?:\/\/\S+/g;
                          const emailPattern =
                            /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;

                          if (originalComment === "") {
                            $errorMessagecomment
                              .text("Comment cannot be empty")
                              .show();
                          } else if (
                            originalComment.length > maxCommentLength
                          ) {
                            $errorMessagecomment
                              .text("Comment exceeds the maximum length")
                              .show();
                          } else if (
                            htmlPattern.test(originalComment) ||
                            cssPattern.test(originalComment) ||
                            linkPattern.test(originalComment) ||
                            emailPattern.test(originalComment)
                          ) {
                            $errorMessagecomment
                              .text("Invalid content in the comment")
                              .show();
                          } else {
                            // Disable the comment button during the API call

                            const $spinner = $("<div>")
                              .addClass(
                                "spinner-border spinner-border-sm mx-3 text-light"
                              )
                              .attr("role", "status")
                              .appendTo($commentButton);

                            const apiUrl = `${API_URL}/comments/addComments/${saparetId
                              }`; // Example URL

                            // Define headers for the request
                            const headers = {
                              "Content-Type": "application/json", // Specify the content type as JSON
                            };
                            const token = localStorage.getItem("token");
                            if (token) {
                              headers["Authorization"] = `Bearer ${token}`;
                            }

                            const requestOptions = {
                              method: "POST", // HTTP method
                              headers: headers,
                              body: JSON.stringify({
                                originalComment: originalComment,
                                site: siteName,
                                ip: ipAddress,
                              }), // Convert the data object to JSON string
                            };

                            fetch(apiUrl, requestOptions)
                              .then((response) => {
                                // Check if the response status is OK (201 Created)
                                if (!response.ok) {
                                  response.text().then(errorMessage => {
                                    const errorData = JSON.parse(errorMessage);
                                    $errorMessagecomment
                                      .text(errorData.message)
                                      .show();
                                    throw new Error(`HTTP error! Status: ${response.status}`)
                                  });
                                }

                                // Parse the response body as JSON
                                return response.json();
                              })
                              .then((data) => {
                                console.log('data',data)
                                // Handle the response data
                                $spinner.remove();
                                // commentlistapi(false);
                                $commentInput.val("");
                                $("#ignismyModal").css("display", "block");
                                $("#ignismyModal").addClass("modal fade show");
                                $("#msgtag").html(
                                  data?.message
                                );
                                setTimeout(() => {
                                  $("#ignismyModal").css("display", "none");
                                  $("#msgtag").html("");
                                }, 2000);

                                // Re-enable the comment button after successful API call
                                $commentButton.prop("disabled", false);
                              })
                              .catch((error) => {
                                // Re-enable the comment button in case of an error
                                $commentButton.prop("disabled", false);
                                $spinner.remove();
                                // Handle any errors that occurred during the fetch
                                console.error("Fetch error:", error);
                              });
                          }
                        }
                      } else {
                        const originalComment = $commentInput.val().trim();
                        const maxCommentLength = 200;
                        const htmlPattern = /<[^>]*>/g;
                        const cssPattern = /([a-zA-Z-]+)\s*:\s*([^;]+);/g;
                        const linkPattern = /https?:\/\/\S+/g;
                        const emailPattern =
                          /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;

                        if (originalComment === "") {
                          $errorMessagecomment
                            .text("Comment cannot be empty")
                            .show();
                        } else if (originalComment.length > maxCommentLength) {
                          $errorMessagecomment
                            .text("Comment exceeds the maximum length")
                            .show();
                        } else if (
                          htmlPattern.test(originalComment) ||
                          cssPattern.test(originalComment) ||
                          linkPattern.test(originalComment) ||
                          emailPattern.test(originalComment)
                        ) {
                          $errorMessagecomment
                            .text("Invalid content in the comment")
                            .show();
                        } else {
                          $commentButton.prop("disabled", true);

                          const $spinner = $("<div>")
                            .addClass(
                              "spinner-border spinner-border-sm mx-3 text-light"
                            )
                            .attr("role", "status")
                            .appendTo($commentButton);

                          const apiUrl = `${API_URL}/comments/addComments/${saparetId}`; // Example URL

                          // Define headers for the request

                          const token = localStorage.getItem("token");

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
                              site: siteName,
                              ip: ipAddress,
                            }), // Convert the data object to JSON string
                          };
                          fetch(apiUrl, requestOptions)
                            .then((response) => {
                              // Check if the response status is OK (201 Created)
                              if (!response.ok) {
                                response.text().then(errorMessage => {
                                  const errorData = JSON.parse(errorMessage);
                                  $errorMessagecomment
                                    .text(errorData.message)
                                    .show();
                                  throw new Error(`HTTP error! Status: ${response.status}`)
                                });
                              }

                              // Parse the response body as JSON
                              return response.json();
                            })
                            .then((data) => {
                              // Handle the response data
                              $spinner.remove();
                              //commentlistapi(false);
                              $commentInput.val("");
                              $("#ignismyModal").css("display", "block");
                              $("#ignismyModal").addClass("modal fade show");
                              $("#msgtag").html(
                                data?.message
                              );
                              setTimeout(() => {
                                $("#ignismyModal").css("display", "none");
                                $("#msgtag").html("");
                              }, 2000);

                              // Re-enable the comment button after successful API call
                              $commentButton.prop("disabled", false);
                            })
                            .catch((error) => {
                              // Re-enable the comment button in case of an error
                              $commentButton.prop("disabled", false);
                              $spinner.remove();
                              // Handle any errors that occurred during the fetch
                              console.error("Fetch error:", error);
                            });
                        }
                      }
                    };

                    // Create element under the logo
                    const $subHeader = $("<div>")
                      .addClass("sub-title")
                      .text(commentlistingdata?.data?.pageData?.sub_title);

                    // Create the second child div (user image)
                    const $userImageDiv = $("<div>").addClass("right");

                    if (userData && userData !== "") {
                      var $logoiconforuserimage = $("<img>")
                        .addClass("comment-logo")
                        .attr(
                          "src",
                          userData &&
                            userData !== "" &&
                            userData.site == "israel-today"
                            ? "https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/logo-two.png"
                            : "https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/logo-one.png"
                        );
                    } else {
                      const site = "israelBackOffice";
                      var $logoiconforuserimage = $("<img>")
                        .addClass("comment-logo")
                        .attr(
                          "src",
                          siteName == "israel-today"
                            ? "https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/logo-two.png"
                            : "https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/logo-one.png"
                        );
                    }
                    const $userImage = $("<img>")
                      .attr(
                        "src",
                        "https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/ei_user.png"
                      )
                      .attr("alt", "User Image");

                    //after login user image
                    const $userImages = $("<img>")
                      .attr("src", userData?.image)
                      .addClass("user-text")
                      .attr("alt", "User Image");
                    //after login user first letter
                    const $userfirstletterdiv = $("<div>")
                      .addClass("user-text")
                      .text(
                        userData &&
                        userData.name &&
                        capitalizeFirstLetter(userData.name.charAt(0))
                      );

                    // $commentSectionDiv.append($commentButton);
                    // $commentSectionDiv.append($commentInput);

                    //condition after login user image

                    $userImageDiv.append(
                      userData && userData !== ""
                        ? userData.image && userData.image !== ""
                          ? $userImages
                          : $userfirstletterdiv
                        : $userImage,
                      $logoiconforuserimage
                    );
                    $commentSectionDiv.append(
                      $userImageDiv,
                      $commentbuttonandinputdiv
                    );

                    if (apiFlags) {
                      $app.append($subHeader);
                    }
                    $mainDivForCommentSection.append($commentSectionDiv);
                    // if (apiFlags) {
                      $app.append($mainDivForCommentSection);
                    // }

                    // $mainDivForCommentSection.append($containerCommentpart)

                    //comment listing part
                    commentlistingdata.data.allCommentsData.forEach(
                      (dataItem) => {
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
                        let time = timeAgo(dataItem?.createdAt);
                        const $commenttime = $("<div>")
                          .addClass("post-time")
                          .text(`${time}`)
                          .css({ direction: "ltr" });
                        const $commentuser = $("<div>")
                          .addClass("user-name")
                          .text(
                            dataItem?.name && dataItem.name !== ""
                              ? capitalizeFirstLetter(dataItem.name)
                              : JsonData?.anonymous_user
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

                        //after login user image
                        const $commentuserImages = $("<img>")
                          .attr(
                            "src",
                            dataItem?.image
                          )
                          .attr("alt", "User Image")
                          .addClass("user-text");
                        //after login user first letter
                        const $commentuserfirstletterdiv = $("<div>")
                          .addClass("user-text")
                          .text(
                            dataItem &&
                            dataItem.name &&
                            capitalizeFirstLetter(dataItem.name.charAt(0))
                          );

                        const $commentuserimagelogo = $("<img>")
                          .addClass("comment-logo")
                          .attr(
                            "src",
                            dataItem &&
                              dataItem !== "" &&
                              dataItem.site == "israel-today"
                              ? "https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/logo-two.png"
                              : "https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/logo-one.png"
                            //"https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/logo-two.png"
                          );
                        // const $paragraph = $("<div>")
                        // .addClass("user-comments")
                        // .text(
                        //   dataItem && !dataItem.updatedComment
                        //     ? dataItem.originalComment : dataItem.ip === localStorage.getItem('ip')?
                        //      dataItem.updatedComment : dataItem.originalComment
                        // );
                        // const text =
                        //   dataItem && !dataItem.updatedComment
                        //     ? dataItem.originalComment
                        //     : dataItem.ip === localStorage.getItem("ip")
                        //       ? dataItem.updatedComment
                        //       : dataItem.originalComment;
                       const text= dataItem && !dataItem.updatedComment
                                ? dataItem?.originalComment
                                : dataItem?.updatedComment;

                        const lines = text.split("\n");

                        const $paragraph = $("<div>").addClass("user-comments");

                        lines.forEach((line) => {
                          $paragraph.append($("<div>").text(line));
                        });

                        // Append the div to the document body or another container

                        const $commentDiv =
                          $("<div>").addClass("comments-wrap");
                        const $righdiv = $("<div>").addClass("right");
                        const $leftdiv = $("<div>").addClass("left");

                        //$middelcomentpart.append($paragraph, $commentuserImage);
                        //like comment div
                        const $socialicon = $("<div>")
                          .css({})
                          .addClass("comment-bottom");

                        const $likeicondiv =
                          $("<div>").addClass("like-counter");
                        const $likeIcon = $("<img>")
                          .addClass("comment-logo")
                          .attr(
                            "src",
                            dataItem?.like
                              ? "https://cdn.jsdelivr.net/gh/DCP121/article-pages@95b7f19f5147cae84a11c102b71edf2598dde09f/assets/like-select.svg" // Change to select SVG when isLiked is true
                              : "https://raw.githubusercontent.com/DCP121/article-pages/13a7e50ce2b6889484f23815a3755d6be4fdc9a1/assets/like.svg"
                          )
                          .css("cursor", "pointer");
                        const $likeicontext = $("<span>").text(
                          dataItem?.likeCount
                        );
                        let likeclickflage = true;
                        let isLiked = dataItem?.like ? dataItem.like : false; // Initialize the state as not liked

                        $likeIcon.click(async function () {
                          if (likeclickflage) {
                            likeclickflage = false;
                            //const ipAddress = await getIp();
                            isLiked = !isLiked; // Toggle the state on each click
                            $(this).prop("disabled", true);
                            $(this).attr(
                              "src",
                              isLiked
                                ? "https://cdn.jsdelivr.net/gh/DCP121/article-pages@95b7f19f5147cae84a11c102b71edf2598dde09f/assets/like-select.svg" // Change to select SVG when isLiked is true
                                : "https://raw.githubusercontent.com/DCP121/article-pages/13a7e50ce2b6889484f23815a3755d6be4fdc9a1/assets/like.svg"
                            );
                            const token = localStorage.getItem("token");

                            const headers = {
                              "Content-Type": "application/json", // Specify the content type as JSON
                            };
                            if (token) {
                              headers["Authorization"] = `Bearer ${token}`;
                            }

                            fetch(
                              `${API_URL}/comments/updateLike?commentId=${dataItem._id}`,
                              {
                                method: "POST",
                                headers: headers,
                                body: JSON.stringify({
                                  like: isLiked, // Send the current state as like
                                  ip: ipAddress,
                                }),
                              }
                            )
                              .then((response) => {
                                if (!response.ok) {
                                  throw new Error(
                                    "Network response was not ok"
                                  );
                                }
                                return response.json();
                              })
                              .then((data) => {
                                $likeicontext.text(data?.data?.likeCount);
                                isLiked = data?.data?.like;
                                // $(this).prop('disabled', false)
                                likeclickflage = true;
                              }).finally(() => {
                                likeclickflage = true;
                              });
                          }
                        });

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
                          .text(JsonData?.see_org_comment)
                          .addClass("outline-blue-btn");
                        //toggle between orignale comment and updated comment
                        let isOriginalComment = true;
                        $seeOriginalCommentButton.on("click", function () {
                          // Replace the original comment text with the updated comment text
                          if (isOriginalComment) {
                            // Show the original comment
                            $paragraph.text(dataItem?.originalComment);
                            $seeOriginalCommentButton.text(
                              "See Updated Comment"
                            );
                          } else {
                            // Show the updated comment
                            $paragraph.text(dataItem?.updatedComment);
                            $seeOriginalCommentButton.text(
                              JsonData?.see_org_comment
                            );
                          }

                          // Toggle the state
                          isOriginalComment = !isOriginalComment;
                        });

                        // Append the icons and button to the $socialicon
                        $socialicon.append(
                          $likeicondiv,
                          $commenticondiv,
                          // dataItem.updatedComment &&
                          //   dataItem?.userId ===  userData && userData?.id && userData?._id
                          //   ? $seeOriginalCommentButton
                          //   : ""
                        );
                        if (
                          userData !== null && userData?._id &&             // Check if userData is not null
                          dataItem.userId === userData?._id      // Check if item.userId is equal to userData?._id
                        ) {
                          if (
                            dataItem.updatedComment &&            // Check if item.updatedComment is not empty
                            dataItem.updatedComment !== ""
                          ) {
                            $socialicon.append($seeOriginalCommentButton); // Append the button
                          }
                        } else{
                          if ( userData ==null && !dataItem.userId &&
                            dataItem.ip == ipAddress &&           // Check if item.ip is equal to ipAddress
                            dataItem.updatedComment &&            // Check if item.updatedComment is not empty
                            dataItem.updatedComment !== ""
                          ) {
                            $socialicon.append($seeOriginalCommentButton); // Append the button
                          }
                        }
                        $righdiv.append(
                          dataItem && dataItem !== "" && dataItem.name
                            ? dataItem.image && dataItem.image !== ""
                              ? $commentuserImages
                              : $commentuserfirstletterdiv
                            : $commentuserImage,
                          $commentuserimagelogo
                        );

                        $leftdiv.append(
                          $commentheadermain,
                          $paragraph,
                          $socialicon
                        );
                        //append comment section all div
                        $commentDiv.append($righdiv, $leftdiv);

                        //relay comment display section
                        const replayCommentDivs = [];
                        dataItem?.replyComments?.forEach((item) => {
                          if (item) {
                            let time = timeAgo(item?.createdAt);
                            const $commentreplayheder =
                              $("<div>").addClass("user-name-wrap");

                            const $commenttimereplay = $("<div>")
                              .addClass("post-time")
                              .text(`${time}`)
                              .css({ direction: "ltr" });
                            const $commentuserreplay = $("<div>")
                              .addClass("user-name")
                              .text(
                                item?.name && item.name !== ""
                                  ? capitalizeFirstLetter(item.name)
                                  : JsonData?.anonymous_user
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

                            const $userimages = $("<img>")
                              .attr("src", item?.image)
                              .attr("alt", "User Image")
                              .addClass(" user-text");
                            //after login user first letter
                            const $userfirstletterdiv = $("<div>")
                              .addClass("user-text")
                              .text(
                                item &&
                                item.name &&
                                capitalizeFirstLetter(item.name.charAt(0))
                              );

                            //comment replay after user successfuly login

                            const $commentuserreplayimagelogo = $("<img>")
                              .addClass("comment-logo")
                              .attr(
                                "src",
                                item &&
                                  item !== "" &&
                                  item.site == "israel-today"
                                  ? "https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/logo-two.png"
                                  : "https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/logo-one.png"
                              );

                            // const $commentreplayparagraph = $("<div>")
                            //   .addClass("user-comments")
                            //   .text(
                            //     item && !item.updatedComment
                            //       ? item?.originalComment
                            //       : item?.updatedComment
                            //   );
                            const text =
                              item && !item.updatedComment
                                ? item?.originalComment
                                : item?.updatedComment;

                            const lines = text.split("\n");

                            const $commentreplayparagraph =
                              $("<div>").addClass("user-comments");

                            lines.forEach((line) => {
                              $commentreplayparagraph.append(
                                $("<div>").text(line)
                              );
                            });

                            //$middelepartreplaycommentsection.append($commentreplayparagraph,$commentreplyuserImage);
                            //social icon div

                            const $likeicondivreplay =
                              $("<div>").addClass("like-counter");
                            const $likeIconreplay = $("<img>")
                              .addClass("comment-logo")
                              .attr(
                                "src",
                                item?.like
                                  ? "https://cdn.jsdelivr.net/gh/DCP121/article-pages@95b7f19f5147cae84a11c102b71edf2598dde09f/assets/like-select.svg" // Change to select SVG when isLiked is true
                                  : "https://raw.githubusercontent.com/DCP121/article-pages/13a7e50ce2b6889484f23815a3755d6be4fdc9a1/assets/like.svg"
                              )
                              .css("cursor", "pointer");
                            const $likeicontextreplay = $("<span>").text(
                              item?.likeCount
                            );
                            let likeclickflage = true;
                            let isLiked = item?.like ? item.like : false;

                            $likeIconreplay.click(async function () {
                              if (likeclickflage) {
                                likeclickflage = false
                                //const ipAddress = await getIp();
                                isLiked = !isLiked; // Toggle the state on each click
                                $(this).attr(
                                  "src",
                                  isLiked
                                    ? "https://cdn.jsdelivr.net/gh/DCP121/article-pages@95b7f19f5147cae84a11c102b71edf2598dde09f/assets/like-select.svg" // Change to select SVG when isLiked is true
                                    : "https://raw.githubusercontent.com/DCP121/article-pages/13a7e50ce2b6889484f23815a3755d6be4fdc9a1/assets/like.svg"
                                );
                                // Change the fill color based on the state
                                const token = localStorage.getItem("token");


                                const headers = {
                                  "Content-Type": "application/json", // Specify the content type as JSON
                                };
                                if (token) {
                                  headers["Authorization"] = `Bearer ${token}`;
                                }

                                fetch(
                                  `${API_URL}/comments/updateLike?commentId=${item?.id}`,
                                  {
                                    method: "POST",
                                    headers: headers,
                                    body: JSON.stringify({
                                      like: isLiked, // Send the current state as like
                                      ip: ipAddress,
                                    }),
                                  }
                                )
                                  .then((response) => {
                                    if (!response.ok) {
                                      response.text().then(errorMessage => {
                                        const errorData = JSON.parse(errorMessage);
                                        $errorMessagecomment
                                          .text(errorData.message)
                                          .show();
                                      })
                                    }
                                    return response.json();
                                  })
                                  .then((data) => {
                                    $likeicontextreplay.text(
                                      data?.data?.likeCount
                                    );
                                    isLiked = data.data.like;
                                    likeclickflage = true;
                                  }).finally(() => {
                                    likeclickflage = true;
                                  });;
                              }
                            });


                            const $commenticondivreplay =
                              $("<div>").addClass("comment-counter");
                            const $commenticontextreplay =
                              $("<span>").text("15");
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
                            const $seeOriginalCommentButton = $("<button>")
                              .text(JsonData?.see_org_comment)
                              .addClass("outline-blue-btn");
                            //replay toggle between orignale comment and updated comment
                            let isOriginalComment = true;
                            $seeOriginalCommentButton.on("click", function () {
                              // Replace the original comment text with the updated comment text
                              if (isOriginalComment) {
                                // Show the original comment
                                $commentreplayparagraph.text(
                                  item?.originalComment
                                );
                                $seeOriginalCommentButton.text(
                                  "See Updated Comment"
                                );
                              } else {
                                // Show the updated comment
                                $commentreplayparagraph.text(
                                  item?.updatedComment
                                );
                                $seeOriginalCommentButton.text(
                                  JsonData?.see_org_comment
                                );
                              }

                              // Toggle the state
                              isOriginalComment = !isOriginalComment;
                            });

                          //   const $socialiconcommentreplay =
                          //     $("<div>").addClass("comment-bottom");
                          //   $socialiconcommentreplay.append(
                          //     $likeicondivreplay,
                          //  userData !==null && item.userId===userData?._id ?
                          //     item?.updatedComment &&
                          //       item?.updatedComment !== ""
                          //       ? $seeOriginalCommentButton
                          //       : ""
                          //     :item?.ip==ipAddress && item?.updatedComment &&
                          //     item?.updatedComment !== ""
                          //     ? $seeOriginalCommentButton
                          //     : ""
                          //   );
                          const $socialiconcommentreplay = $("<div>").addClass("comment-bottom");
$socialiconcommentreplay.append($likeicondivreplay);

if (
  userData !== null && userData?._id &&             // Check if userData is not null
  item.userId === userData?._id      // Check if item.userId is equal to userData?._id
) {
  if (
    item.updatedComment &&            // Check if item.updatedComment is not empty
    item.updatedComment !== ""
  ) {
    $socialiconcommentreplay.append($seeOriginalCommentButton); // Append the button
  }
} else{
  if ( userData ==null && !item.userId &&
    item.ip == ipAddress &&           // Check if item.ip is equal to ipAddress
    item.updatedComment &&            // Check if item.updatedComment is not empty
    item.updatedComment !== ""
  ) {
    $socialiconcommentreplay.append($seeOriginalCommentButton); // Append the button
  }
}

                            $leftsidecommentreplaydiv.append(
                              $commentreplayheder,
                              $commentreplayparagraph,
                              $socialiconcommentreplay
                            );
                            $rightsidecommetreplaydiv.append(
                              item && item !== "" && item.name
                                ? item.image && item.image !== ""
                                  ? $userimages
                                  : $userfirstletterdiv
                                : $commentreplyuserImage,
                              // $commentuserimagelogo
                              //   $commentreplyuserImage,
                              $commentuserreplayimagelogo
                            );
                            $replaycommentdiv.append(
                              $rightsidecommetreplaydiv,
                              $leftsidecommentreplaydiv
                            );
                            replayCommentDivs.push($replaycommentdiv);
                          }
                        });

                        //replay comment input div

                        const $replycommentinputsection = $("<div>").addClass(
                          "comments-wrap sub-comment-wrap"
                        );
                        const $replaycommentinputandbuttondiv =
                          $("<div>").addClass("add-comment");
                        const $comenttitlereplay = $("<div>")
                          .addClass("user-name")
                          .text(
                            userData && userData !== ""
                              ? capitalizeFirstLetter(userData?.name)
                              : JsonData?.anonymous_user
                          );
                        const $leftcommenntinputsection =
                          $("<div>").addClass("left");
                        const $rightcommenntinputsection =
                          $("<div>").addClass("right");
                        const $replaycommentButton = $("<button>")
                          .addClass("red-button")
                          .css({
                            direction: "ltr",
                          })
                          .text(JsonData?.send);
                        const $commentreplayInput = $("<textarea>")
                          .addClass("form-control-input")
                          .attr({
                            type: "text",
                            placeholder: JsonData?.add_your_comment,
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
                        const $userImages = $("<img>")
                          .attr("src", userData?.image)
                          .attr("alt", "User Image")
                          .addClass("user-text");
                        //after login user first letter
                        const $userfirstletterdiv = $("<div>")
                          .addClass("user-text")
                          .text(
                            userData &&
                            userData.name &&
                            capitalizeFirstLetter(userData.name.charAt(0))
                          );
                        $replaycommentinputandbuttondiv.append(
                          $commentreplayInput,
                          $replaycommentButton
                        );
                        if (userData && userData !== "") {
                          var $commentuserreplyimagelogo = $("<img>")
                            .addClass("comment-logo")
                            .attr(
                              "src",
                              userData &&
                                userData !== "" &&
                                userData.site == "israel-today"
                                ? "https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/logo-two.png"
                                : "https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/logo-one.png"
                            );
                        } else {
                          var $commentuserreplyimagelogo = $("<img>")
                            .addClass("comment-logo")
                            .attr(
                              "src",
                              siteName == "israel-today"
                                ? "https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/logo-two.png"
                                : "https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/logo-one.png"
                            );
                        }
                        // const $commentuserreplyimagelogo = $("<img>")
                        //   .addClass("comment-logo")
                        //   .attr(
                        //     "src",
                        //     "https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/logo-two.png"
                        //   );
                        $leftcommenntinputsection.append(
                          $comenttitlereplay,
                          $replaycommentinputandbuttondiv,
                          $errorMessagecomment
                        );
                        $rightcommenntinputsection.append(
                          userData && userData !== ""
                            ? userData.image && userData.image !== ""
                              ? $userImages
                              : $userfirstletterdiv
                            : $commentreplayuserImage,
                          //$commentreplayuserImage,
                          $commentuserreplyimagelogo
                        );

                        $replycommentinputsection.append(
                          $rightcommenntinputsection,
                          $leftcommenntinputsection
                        );

                        $commentreplayInput.on("input", function () {
                          const originalComment = $commentreplayInput
                            .val()
                            .trim();
                          const maxCommentLength = 200;
                          const htmlPattern = /<[^>]*>/g;
                          const cssPattern = /([a-zA-Z-]+)\s*:\s*([^;]+);/g;
                          const linkPattern = /https?:\/\/\S+/g;
                          const emailPattern =
                            /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;

                          if (originalComment === "") {
                            $errorMessagecomment
                              .text("Comment cannot be empty")
                              .show();
                          } else if (
                            originalComment.length > maxCommentLength
                          ) {
                            $errorMessagecomment
                              .text("Comment exceeds the maximum length")
                              .show();
                          } else if (
                            htmlPattern.test(originalComment) ||
                            cssPattern.test(originalComment) ||
                            linkPattern.test(originalComment) ||
                            emailPattern.test(originalComment)
                          ) {
                            $errorMessagecomment
                              .text("Invalid content in the comment")
                              .show();
                          } else {
                            $errorMessagecomment.hide();
                          }
                        });

                        // $commentreplayInput.on("keyup", function (event) {
                        //   // Check if the Enter key (key code 13) was pressed
                        //   if (event.keyCode === 13) {
                        //     // Prevent the default behavior of the Enter key (e.g., form submission)
                        //     event.preventDefault();

                        //     // Trigger the reply comment submission when Enter key is pressed
                        //     submitReplyComment();
                        //   }
                        // });

                        $replaycommentButton.on("click", function () {
                          if (userData?.emailVerified === true) {
                            submitReplyComment();
                          }
                          else if (userData === null) {
                            submitReplyComment();
                          }
                          else {
                            $errorMessagecomment
                              .text("you are not verified pleace verified your account")
                              .show();
                          }
                        });

                        const submitReplyComment = async () => {
                          //const ipAddress = await getIp();
                          if (commentlistingdata?.data?.pageData?.mustLogin) {
                            const token = localStorage.getItem("token");
                            if (!token) {
                              $replaycommentButton.prop("disabled", false);
                              // Display registration and login modal when mustLogin is true and no token is present.
                              $registerModal.css("display", "block");
                              $loginForm.css("display", "block");
                            } else {
                              const commentReplay = $commentreplayInput
                                .val()
                                .trim();

                              const maxCommentLength = 200;
                              const htmlPattern = /<[^>]*>/g;
                              const cssPattern = /([a-zA-Z-]+)\s*:\s*([^;]+);/g;
                              const linkPattern = /https?:\/\/\S+/g;
                              const emailPattern =
                                /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;

                              if (commentReplay === "") {
                                $errorMessagecomment
                                  .text("Comment cannot be empty")
                                  .show();
                              } else if (
                                commentReplay.length > maxCommentLength
                              ) {
                                $errorMessagecomment
                                  .text("Comment exceeds the maximum length")
                                  .show();
                              } else if (
                                htmlPattern.test(commentReplay) ||
                                cssPattern.test(commentReplay) ||
                                linkPattern.test(commentReplay) ||
                                emailPattern.test(commentReplay)
                              ) {
                                $errorMessagecomment
                                  .text("Invalid content in the comment")
                                  .show();
                              } else {
                                $errorMessagecomment.hide();
                                // Rest of your reply comment submission logic here
                                const token = localStorage.getItem("token");
                                const headers = {
                                  "Content-Type": "application/json", // Specify the content type as JSON
                                };

                                if (token) {
                                  headers["Authorization"] = `Bearer ${token}`;
                                }
                                const apiUrl = `${API_URL}/comments/addCommentsReplay/${dataItem?._id}`; // Example URL

                                // Define additional options for the request
                                const requestOptions = {
                                  method: "POST", // HTTP method
                                  headers: headers,
                                  body: JSON.stringify({
                                    commentReplay: commentReplay,
                                    site: siteName,
                                    ip: ipAddress,
                                  }), // Convert the data object to JSON string
                                };
                                const $spinner = $("<div>")
                                  .addClass(
                                    "spinner-border spinner-border-sm mx-3 text-light"
                                  )
                                  .attr("role", "status")
                                  .appendTo($replaycommentButton);

                                $replaycommentButton.prop("disabled", true);

                                fetch(apiUrl, requestOptions)
                                  .then((response) => {
                                    // Check if the response status is OK (201 Created)
                                    if (!response.ok) {
                                      response.text().then(errorMessage => {
                                        const errorData = JSON.parse(errorMessage);
                                        $errorMessagecomment
                                          .text(errorData.message)
                                          .show();
                                      })
                                    }

                                    // Parse the response body as JSON
                                    return response.json();
                                  })
                                  .then((data) => {
                                    // Handle the response data
                                    $replaycommentButton.prop("disabled", false);
                                    $spinner.remove()
                                    //commentlistapi(false);
                                    $commentreplayInput.val("");
                                    $("#ignismyModal").css("display", "block");
                                    $("#ignismyModal").addClass(
                                      "modal fade show"
                                    );
                                    $("#msgtag").html(
                                     data?.message
                                    );
                                    setTimeout(() => {
                                      $("#ignismyModal").css("display", "none");
                                      $("#msgtag").html("");
                                    }, 2000);
                                    //alert(data.message);
                                  })
                                  .catch((error) => {
                                    // Handle any errors that occurred during the fetch
                                    $replaycommentButton.prop("disabled", false);
                                    $spinner.remove()
                                    console.error("Fetch error:", error);
                                  });
                                // finally {
                                //   // Enable button and remove spinner after API call is complete
                                //   $replaycommentButton.prop("disabled", false);
                                //   $spinner.remove();
                                // }
                              }
                            }
                          } else {
                            const commentReplay = $commentreplayInput
                              .val()
                              .trim();

                            const maxCommentLength = 200;
                            const htmlPattern = /<[^>]*>/g;
                            const cssPattern = /([a-zA-Z-]+)\s*:\s*([^;]+);/g;
                            const linkPattern = /https?:\/\/\S+/g;
                            const emailPattern =
                              /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;

                            if (commentReplay === "") {
                              $errorMessagecomment
                                .text("Comment cannot be empty")
                                .show();
                            } else if (
                              commentReplay.length > maxCommentLength
                            ) {
                              $errorMessagecomment
                                .text("Comment exceeds the maximum length")
                                .show();
                            } else if (
                              htmlPattern.test(commentReplay) ||
                              cssPattern.test(commentReplay) ||
                              linkPattern.test(commentReplay) ||
                              emailPattern.test(commentReplay)
                            ) {
                              $errorMessagecomment
                                .text("Invalid content in the comment")
                                .show();
                            } else {
                              $errorMessagecomment.hide();
                              // Rest of your reply comment submission logic here
                              const token = localStorage.getItem("token");
                              const headers = {
                                "Content-Type": "application/json", // Specify the content type as JSON
                              };

                              if (token) {
                                headers["Authorization"] = `Bearer ${token}`;
                              }
                              const apiUrl = `${API_URL}/comments/addCommentsReplay/${dataItem?._id}`; // Example URL

                              // Define additional options for the request
                              const requestOptions = {
                                method: "POST", // HTTP method
                                headers: headers,
                                body: JSON.stringify({
                                  commentReplay: commentReplay,
                                  site: siteName,
                                  ip: ipAddress,
                                }), // Convert the data object to JSON string
                              };
                              const $spinner = $("<div>")
                                .addClass(
                                  "spinner-border spinner-border-sm mx-3 text-light"
                                )
                                .attr("role", "status")
                                .appendTo($replaycommentButton);

                              $replaycommentButton.prop("disabled", true);

                              fetch(apiUrl, requestOptions)
                                .then((response) => {
                                  // Check if the response status is OK (201 Created)
                                  if (!response.ok) {
                                    response.text().then(errorMessage => {
                                      const errorData = JSON.parse(errorMessage);
                                      $errorMessagecomment
                                        .text(errorData.message)
                                        .show();
                                    })
                                  }

                                  // Parse the response body as JSON
                                  return response.json();
                                })
                                .then((data) => {
                                  // Handle the response data
                                  $replaycommentButton.prop("disabled", false);
                                  $spinner.remove()
                                  //commentlistapi(false);
                                  $commentreplayInput.val("");
                                  $("#ignismyModal").css("display", "block");
                                  $("#ignismyModal").addClass(
                                    "modal fade show"
                                  );
                                  $("#msgtag").html(
                                    data?.message
                                  );
                                  setTimeout(() => {
                                    $("#ignismyModal").css("display", "none");
                                    $("#msgtag").html("");
                                  }, 2000);
                                  //alert(data.message);
                                })
                                .catch((error) => {
                                  // Handle any errors that occurred during the fetch
                                  console.error("Fetch error:", error);
                                  $replaycommentButton.prop("disabled", false);
                                  $spinner.remove()
                                });
                              // finally {
                              //   // Enable button and remove spinner after API call is complete
                              //   $replaycommentButton.prop("disabled", false);
                              //   $spinner.remove();
                              // }
                            }
                          }

                          //   if (commentlistingdata?.data?.pageData?.mustLogin) {
                          //     const token = localStorage.getItem("token");
                          //     if (!token) {
                          //       $registerModal.css("display", "block");
                          //       $loginForm.css("display", "block");
                          //     } else {
                          //       const commentReplay = $commentreplayInput.val().trim();
                          //       if (commentReplay === "") {
                          //         $errorMessagecomment
                          //           .text("Comment cannot be empty.")
                          //           .show();
                          //       } else {
                          //         $errorMessagecomment.hide();
                          //         // Rest of your reply comment submission logic here
                          //         const token = localStorage.getItem("token");
                          //         const headers = {
                          //           "Content-Type": "application/json", // Specify the content type as JSON
                          //         };

                          //         if (token) {
                          //           headers["Authorization"] = `Bearer ${token}`;
                          //         }
                          //         const apiUrl = `https://8472-137-184-19-129.ngrok-free.app/api/v1/comments/addCommentsReplay/${dataItem?._id}`; // Example URL

                          //         // Define additional options for the request
                          //         const requestOptions = {
                          //           method: "POST", // HTTP method
                          //           headers: headers,
                          //           body: JSON.stringify({
                          //             commentReplay: commentReplay,
                          //             site: "israel-today",
                          //           }), // Convert the data object to JSON string
                          //         };
                          //         const $spinner = $("<div>")
                          //           .addClass(
                          //             "spinner-border spinner-border-sm mx-3 text-light"
                          //           )
                          //           .attr("role", "status")
                          //           .appendTo($replaycommentButton);

                          //         $replaycommentButton.prop("disabled", true);

                          //         fetch(apiUrl, requestOptions)
                          //           .then((response) => {
                          //             // Check if the response status is OK (201 Created)
                          //             if (!response.ok) {
                          //               throw new Error(
                          //                 `HTTP error! Status: ${response.status}`
                          //               );
                          //             }

                          //             // Parse the response body as JSON
                          //             return response.json();
                          //           })
                          //           .then((data) => {
                          //             // Handle the response data
                          //             $spinner.remove();
                          //             commentlistapi(true);;
                          //             $("#ignismyModal").css("display", "block");
                          //             $("#ignismyModal").addClass("modal fade show");
                          //             $("#msgtag").html("comment replay succesfuly!!");
                          //             setTimeout(() => {
                          //               $("#ignismyModal").css("display", "none");
                          //               $("#msgtag").html("");
                          //             }, 2000);
                          //             //alert(data.message);
                          //           })
                          //           .catch((error) => {
                          //             // Handle any errors that occurred during the fetch
                          //             console.error("Fetch error:", error);
                          //           });
                          //         // finally {
                          //         //   // Enable button and remove spinner after API call is complete
                          //         //   $replaycommentButton.prop("disabled", false);
                          //         //   $spinner.remove();
                          //         // }
                          //       }
                          //     }
                          //   } else {
                          //     $registerModal.css("display", "block");
                          //     $loginForm.css("display", "block");
                          //   }
                        };

                        //Append the div to the document body or another container

                        $containerCommentpart.append(
                          $commentDiv,
                          replayCommentDivs,
                          $replycommentinputsection
                        );
                        $container.append($containerCommentpart);
                        $maincommentlistingcontainer.append(
                          $containerCommentpart
                        );
                        $app.append($maincommentlistingcontainer);
                      }
                    );

                    //show more comment button div

                    const $showmorecommentdiv = $("<div>").css({}).attr('id', "showmorecomment");

                    const $showmorecommentbutton = $("<button>")
                      .addClass("red-button-big")
                      .text(JsonData?.show_more_cmt)
                      .css({
                        direction: "ltr",
                      });

                    if (
                      showmorcomment <= commentlistingdata?.data?.totalComment
                    ) {
                      $showmorecommentdiv.append($showmorecommentbutton);
                    }
                    //               const $spinnerviewmore = $("<div>")
                    // .addClass("spinner-border spinner-border-sm mx-3 text-light")
                    // .attr("role", "status")
                    // .hide();

                    // $app.append($showmorecommentdiv);

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
                      $showmorecommentbutton.prop("disabled", true);

                      const $spinner = $("<div>")
                        .addClass(
                          "spinner-border spinner-border-sm mx-3 text-light"
                        )
                        .attr("role", "status")
                        .appendTo($showmorecommentbutton);
                      commentlistapi(true);
                      console.log("counter");
                    });
                    // if (apiFlag) {
                      $app.append($showmorecommentdiv);
                    // }
                    var tempElement = document.createElement("div");
                    tempElement.innerHTML =
                      commentlistingdata?.data?.pageData?.footer_text;

                    // Find the <p> element and extract its text
                    var text = tempElement.querySelector("p").textContent;
                    const $footerConatiner = $("<div>").text(text).css({
                      display: "flex",
                    }).attr('id', "footerConatiner");

                    $app.append($footerConatiner);

                    fetch("https://api.ipify.org?format=json")
                      .then((response) => response.json())
                      .then((data) => {
                        localStorage.setItem("ip", data?.ip);
                      })
                      .catch((error) => {
                        console.error("Error:", error);
                      });
                    //const site = "israel-today"; //document.getElementsByName('page_id')[0].attributes.for.value
                    let device;
                    window.addEventListener("resize", handleResize);
                    function handleResize() {
                      const width = window.innerWidth;

                      if (width < 768) {
                        device = "mobile";
                      } else if (width >= 768 && width < 1024) {
                        device = "tablet";
                      } else {
                        device = "desktop";
                      }
                    }

                    handleResize(); // Initial check

                    // Create a script element for loading the Google Sign-In API
                    var scriptElement = document.createElement("script");
                    scriptElement.src =
                      "https://accounts.google.com/gsi/client";
                    scriptElement.async = true;
                    $("head").append(scriptElement);
                    scriptElement.onload = function () {
                      gapi.load("auth2", function () {
                        gapi.auth2.init();
                      });
                    };
                    // Create a div element for g_id_onload configuration
                    var gIdOnloadDiv = document.createElement("div");
                    gIdOnloadDiv.id = "g_id_onload";
                    gIdOnloadDiv.setAttribute("data-client_id", cliendId);
                    gIdOnloadDiv.setAttribute("data-context", "signin");
                    gIdOnloadDiv.setAttribute("data-ux_mode", "popup");
                    gIdOnloadDiv.setAttribute(
                      "data-callback",
                      "handleCredentialResponse"
                    );
                    gIdOnloadDiv.setAttribute("data-auto_prompt", "false");

                    // Create a div element for g_id_signin configuration
                    var gIdSigninDiv = document.createElement("div");
                    gIdSigninDiv.className = "g_id_signin";
                    gIdSigninDiv.setAttribute("data-type", "statndard");
                    gIdSigninDiv.setAttribute("data-shape", "rectangular");
                    gIdSigninDiv.setAttribute("data-theme", "outline");
                    gIdSigninDiv.setAttribute("data-text", "signin_with");
                    gIdSigninDiv.setAttribute("data-size", "medium");
                    gIdSigninDiv.setAttribute("data-logo_alignment", "left");

                    // Create a div element for g_id_onload configuration
                    var gIdOnloadDiv1 = document.createElement("div");
                    gIdOnloadDiv1.id = "g_id_onload1";
                    gIdOnloadDiv1.setAttribute("data-client_id", cliendId);
                    gIdOnloadDiv1.setAttribute("data-context", "signin");
                    gIdOnloadDiv1.setAttribute("data-ux_mode", "popup");
                    gIdOnloadDiv1.setAttribute(
                      "callback",
                      "handleCredentialResponse"
                    );
                    gIdOnloadDiv1.setAttribute("data-auto_prompt", "false");

                    // Create a div element for g_id_signin configuration
                    var gIdSigninDiv1 = document.createElement("div");
                    gIdSigninDiv1.className = "g_id_signin";
                    gIdSigninDiv1.setAttribute("data-type", "statndard");
                    gIdSigninDiv1.setAttribute("data-shape", "rectangular");
                    gIdSigninDiv1.setAttribute("data-theme", "outline");
                    gIdSigninDiv1.setAttribute("data-text", "signin_with");
                    gIdSigninDiv1.setAttribute("data-size", "medium");
                    gIdSigninDiv1.setAttribute("data-logo_alignment", "left");

                    // Define the handleCredentialResponse function using jQuery
                    window.handleCredentialResponse = async (response) => {
                      if (response.credential) {
                        const ip = localStorage.getItem("ip");
                        // const ip= "123.0.9.123"
                        const payload = {
                          googleAuthToken: response.credential,
                          site: siteName,
                          ip,
                          device,
                        };
                        // Send a POST request to the login API
                        try {
                          const response = await axios.post(
                            `${API_URL}/user/google-sign-in`,
                            payload,
                            {
                              headers: {
                                "Content-Type": "application/json",
                              },
                            }
                          );
                            console.log(response)
                          if (response.status === 200) {
                            localStorage.setItem("token", response?.data?.data?.token);
                            localStorage.setItem(
                              "userData",
                              JSON.stringify(response?.data?.data?.user)
                            );
                            commentlistapi(true);
                            $Login.css({ display: "none" });
                            $Register.css({ display: "none" });
                            $Logout.css({ display: "block" });
                            onClosed();
                            FormCleaner();
                            $registerModal.css("display", "none");
                            $("#ignismyModal").css("display", "block");
                            $("#ignismyModal").addClass("modal fade show");
                            $("#msgtag").html(response?.data?.message);
                            setTimeout(() => {
                              $("#ignismyModal").css("display", "none");
                              $("#msgtag").html("");
                            }, 2000);
                          }
                        } catch (error) {
                          console.error("Error:", error);
                          $ApierrorLogin.empty();
                          $ApierrorLogin.append(
                            $("<p>").text(error.response.data.message)
                          );
                          $ApierrorLogin.css("display", "block");
  
                          // Handle errors here if necessary
                        } finally {
                          // Enable button and remove spinner after API call is complete
                          $loginButton.prop("disabled", false);
                          $spinner.remove();
                        }


                        // fetch(
                        //   `${API_URL}/user/google-sign-in`,
                        //   {
                        //     method: "POST",
                        //     headers: {
                        //       "Content-Type": "application/json",
                        //     },
                        //     body: JSON.stringify(payload),
                        //   }
                        // )
                        //   .then((response) => response.json())
                        //   .then((data) => {
                        //     // Close the modal if login is successful
                        //     localStorage.setItem("token", data?.data?.token);
                        //     localStorage.setItem(
                        //       "userData",
                        //       JSON.stringify(data?.data?.user)
                        //     );
                        //     commentlistapi(true);
                        //     $Login.css({ display: "none" });
                        //     $Register.css({ display: "none" });
                        //     $Logout.css({ display: "block" });
                        //     onClosed();
                        //     FormCleaner();
                        //     $registerModal.css("display", "none");
                        //     $("#ignismyModal").css("display", "block");
                        //     $("#ignismyModal").addClass("modal fade show");
                        //     $("#msgtag").html(data?.message);
                        //     setTimeout(() => {
                        //       $("#ignismyModal").css("display", "none");
                        //       $("#msgtag").html("");
                        //     }, 2000);
                        //   })
                        //   .catch((error) => {
                        //     console.error("Error:", error);
                        //   });
                      } else {
                        // User is not signed in or declined to sign in.
                      }
                    };

                    const $modalContentSuccess = `<div class="modal fade"  id="ignismyModal" role="dialog" style="background-color: rgba(0, 0, 0, 0.4);">
      <div class="modal-dialog modal-sm thank-you-pop-modal-dialog">
        <div class="modal-content thank-you-pop-modal text-center">
          <div class="modal-body">
            <div class="thank-you-pop">
            <img src="https://img.icons8.com/color/144/ok--v1.png" alt=""/>
              <h1>Success!</h1>
              <p id="msgtag"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
                    $(`body`).append($modalContentSuccess);
                    // Create the child div for the login form
                    const $loginForm = $("<div>")
                      .addClass("left-content")
                      .css({ display: "none" });
                    const $ApierrorLogin = $("<div>").css({
                      display: "none",
                      color: "red",
                      "margin-top": "5px",
                    });
                    const $loginHeader = $("<h2>").text(JsonData?.login_form);

                    // Create a new element for the red text line
                    const $redText = $("<h4>").text(
                      JsonData?.login_desc
                    );

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
                      .keydown(function (event) {
                        if (event.keyCode == 32) {
                          event.preventDefault();
                        }
                      })
                      .attr("placeholder", JsonData?.email)
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
                    const $emailContainer = $("<div>");

                    // Create a container div for the password input and show/hide toggle button
                    const $passwordContainer = $("<div>").addClass("custom-password");
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
                      .keydown(function (event) {
                        if (event.keyCode == 32) {
                          event.preventDefault();
                        }
                      })
                      .attr("placeholder", JsonData?.password)
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
                      .addClass("fa fa-eye-slash")
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
                        $(this).removeClass("fa-eye-slash").addClass("fa-eye");
                      } else {
                        $passwordField.attr("type", "password");
                        $(this).removeClass("fa-eye").addClass("fa-eye-slash"); // Change the icon to show
                      }
                    });

                    const $loginButton = $("<button>")
                      .addClass("red-button")
                      .text(JsonData?.login);
                    // Create a section for other option
                    const $otherOptionsSection = $("<div>");

                    // Create the horizontal rule for the section
                    const $horizontalRule = $("<hr>").css({
                      border: "none",
                      "border-top": "1px solid #999",
                      margin: "0",
                    });

                    // Create the text for the section
                    const $otherOptionsText =
                      $("<div>").addClass("other-options");
                    const $otherOptionsTextSpan =
                      $("<span>").text(JsonData?.other_options);
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
                    $emailContainer.append($emailInput);
                    $emailContainer.append($errorElementLogin);
                    $emailContainer.append($emptyFieldErrorLogin);

                    $loginForm.append($emailContainer);
                    // $loginForm.append($emailInput); // Append email input
                    // $loginForm.append($errorElementLogin);
                    // $loginForm.append($emptyFieldErrorLogin);
                    $passwordContainer.append($passwordInput); // Append password input to the container
                    $passwordContainer.append($emptyFieldErrorLoginPass);
                    $passwordContainer.append($showPasswordToggle); // Append show/hide password icon to the container
                    $loginForm.append($passwordContainer); // Append the container to the login form
                    $loginForm.append($loginButton);
                    $loginForm.append($otherOptionsSection);
                    // $otherOptionsSection.append($horizontalRule);
                    $otherOptionsSection.append($otherOptionsText);
                    $otherOptionsText.append($otherOptionsTextSpan);

                    // Create the "Forgot password?" link with red text
                    const $forgotPasswordLink = $("<p>")
                      .addClass("auth-link pointer-cursor")
                      .text(JsonData?.forgot_password)

                      .click(function () {
                        // Add functionality to handle "Forgot password?" click here  $loginForm.css('display', 'none');
                        $loginForm.css("display", "none");
                        $ForgotPassForm.css("display", "block");
                        $emptyFieldErrorLoginPass.css("display", "none");
                        $emptyFieldErrorForgot.css("display", "none");
                      });
                    $loginForm.append($forgotPasswordLink);
                    const $registerLink = $("<p>").addClass("have-accoung");
                    $loginForm.append(gIdOnloadDiv);
                    $loginForm.append(gIdSigninDiv);
                    // Create the "Don’t have an account?" text and make it black
                    const $registerLinkDiv = $("<div>").addClass("bottom-wrap");

                    $registerLink.append(JsonData?.login_model_footer);
                    const $registerSpan = $("<span>")
                      .text(JsonData?.register)

                      .click(function () {
                        // Add functionality to handle "Register" click here
                        $loginForm.css("display", "none");
                        $registrationForm.css("display", "block");
                        FormCleaner();
                      });

                    // Append the "Register" text to the existing paragraph
                    $registerLink.append($registerSpan);
                    // Append the footer image to the modal content
                    $loginForm.append($registerLinkDiv);
                    $registerLinkDiv.append($registerLink);
                    $registerLinkDiv.append(
                      '<img src="https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/comment-logo.png" style="width: 155.07px; height: 20px; margin-top: 20px;">'
                    );
                    $registerLinkDiv.append($footerImage);

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
                      const email = $emailInput.val();
                      const password = $passwordInput.val();
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
                        .addClass(
                          "spinner-border spinner-border-sm mx-3 text-light"
                        )
                        .attr("role", "status")
                        .appendTo($loginButton);

                      $loginButton.prop("disabled", true);

                      try {
                        const response = await axios.post(
                          `${API_URL}/user/login-article-page`,
                          payload,
                          {
                            headers: {
                              "Content-Type": "application/json",
                            },
                          }
                        );

                        if (response.status === 200) {
                        console.log('res',response.data.message)
                          // Close the modal if login is successful
                          localStorage.setItem(
                            "token",
                            response?.data?.data?.token
                          );
                          localStorage.setItem(
                            "userData",
                            JSON.stringify(response?.data?.data?.user)
                          );
                          commentlistapi(true);
                          $Login.css({ display: "none" });
                          $Register.css({ display: "none" });
                          $Logout.css({ display: "block" });
                          $registerModal.css("display", "none");
                          onClosed();
                          FormCleaner();
                          $("#ignismyModal").css("display", "block");
                          $("#ignismyModal").addClass("modal fade show");
                          $("#msgtag").html(response.data.message);
                          setTimeout(() => {
                            $("#ignismyModal").css("display", "none");
                            $("#msgtag").html(response?.data?.message);
                          }, 2000);
                        }
                      } catch (error) {
                        console.error("Error:", error);
                        $ApierrorLogin.empty();
                        $ApierrorLogin.append(
                          $("<p>").text(error.response.data.message)
                        );
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

                    const $registerModalContent =
                      $("<div>").addClass("modal-content");

                    $registerModalContent.css({
                      position: "relative",
                    });
                    const $ForgotPassForm = $("<div>")
                      .addClass("left-content")
                      .css({ display: "none" });
                    const $ForgotPassHeader = $("<h2>").text(JsonData?.forgot_password);
                    const $redTextForgotPass = $("<p>")
                      .text(
                        JsonData?.forgot_desc
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
                    const $ForgotPassEmailInputDiv = $("<div>");
                    const $ForgotPassEmailInput = $("<input>")
                      .attr("type", "email")
                      .addClass("custom-input")
                      .attr("id", "registerEmailInput")

                      .attr("placeholder", JsonData?.email)
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
                    async function sendForgotPasswordRequest() {
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
                        .addClass(
                          "spinner-border spinner-border-sm mx-3 text-light"
                        )
                        .attr("role", "status")
                        .appendTo($ForgotPassSubmit);

                      $ForgotPassSubmit.prop("disabled", true);
                      try {
                        const response = await axios.post(
                          `${API_URL}/user/forgot-password-article-page`,
                          ForgotPassPayload,
                          {
                            headers: {
                              "Content-Type": "application/json",
                            },
                          }
                        );
                        if (response.status === 200) {
                          $registerModalContent.append($ResetPassForm);
                          $registerModalContent.append($imageDivReg);
                          $ForgotPassForm.css("display", "none");
                          $ResetPassForm.css({
                            display: "block",
                            flex: "1",
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
                    }
                    // Create the registration button
                    const $ForgotPassSubmit = $("<button>")
                      .addClass("red-button")
                      .text(JsonData?.submit)

                      .click(sendForgotPasswordRequest);

                    // Append the "Login" text to the existing paragraph
                    const $BackToLoginForgot = $("<p>")
                      .addClass("auth-link")
                      .text(JsonData?.back_to_login)

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
                    const $registerLinkForgotDiv =
                      $("<div>").addClass("bottom-wrap");
                    const $registerLinkForgot =
                      $("<p>").addClass("have-accoung");

                    // Create the "Don’t have an account?" text and make it black
                    $registerLinkForgot.append(JsonData?.login_model_footer);
                    const $registerForgotSpan = $("<span>")
                      .text(JsonData?.register)

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
                    $ForgotPassEmailInputDiv.append($ForgotPassEmailInput);
                    $ForgotPassEmailInputDiv.append($errorElementForgot);
                    $ForgotPassEmailInputDiv.append($emptyFieldErrorForgot);
                    $ForgotPassForm.append($ForgotPassEmailInputDiv);

                    // $ForgotPassForm.append($ForgotPassEmailInput);
                    // $ForgotPassForm.append($errorElementForgot);
                    // $ForgotPassForm.append($emptyFieldErrorForgot);
                    $ForgotPassForm.append($ForgotPassSubmit);
                    // $ForgotPassForm.append($registerOtherOptionsSection);
                    $ForgotPassForm.append($BackToLoginForgot);
                    $ForgotPassForm.append($registerLinkForgotDiv);
                    $registerLinkForgotDiv.append($registerLinkForgot);
                    $registerLinkForgotDiv.append(
                      '<img src="https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/comment-logo.png" style="width: 155.07px; height: 20px; margin-top: 20px;">'
                    );
                    // Create the child div for the registration form
                    const $registrationForm = $("<div>")
                      .addClass("left-content")
                      .css({ display: "none" });

                    const $registerHeader = $("<h2>").text(JsonData?.register);
                    const $redTextreg = $("<h4>").text(
                      JsonData?.register_desc
                    );
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
                    const $nameDiv = $("<div>");
                    const $registerNameInput = $("<input>")
                      .attr("type", "text")
                      .addClass("custom-input")
                      .attr("id", "registerNameInput")

                      .attr("placeholder", JsonData?.name)
                      .on("focus", function () {
                        $(this).css("color", "#333");
                      })
                      .on("blur", function () {
                        if ($(this).val() === "") {
                          $(this).css("color", "#999");
                        }
                      })
                      .on("input", function () {
                        const name = $(this).val();
                        // Check if the email is valid
                        const maxCommentLength = 60;
                        if (name.trim() !== "") {
                          // $emptyFieldErrorRegisterName.css("display", "none");
                          if (name.trim().length > maxCommentLength) {
                            $emptyFieldErrorRegisterName
                              .text("maximum length is 60")
                              .css("display", "block");
                          } else {
                            $emptyFieldErrorRegisterName.css("display", "none");
                            $emptyFieldErrorRegisterName.empty();
                            $emptyFieldErrorRegisterName.text(
                              "Name is required"
                            );
                          }
                        } else {
                          $emptyFieldErrorRegisterName.empty();
                          $emptyFieldErrorRegisterName.text("Name is required");
                          $emptyFieldErrorRegisterName.css("display", "block");
                        }
                      });

                    // Create the email input field
                    const $registerEmailInputDiv = $("<div>");
                    const $registerEmailInput = $("<input>")
                      .attr("type", "email")
                      .addClass("custom-input")
                      .attr("id", "registerEmailInput")

                      .attr("placeholder", JsonData?.email)
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
                    const $registerPasswordFieldDiv = $("<div>").addClass('custom-password');
                    const $registerPasswordField = $("<input>")
                      .attr("type", "password")
                      .addClass("custom-input")
                      .attr("id", "registerPasswordField")

                      .attr("placeholder", JsonData?.password)
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
                      const $showregisterpasswordtoggele = $("<i>")
                      .addClass("fa fa-eye-slash")
                      .css({
                        "font-size": "24px", // Adjust the icon size
                        color: "#999", // Set the initial icon color
                        cursor: "pointer",
                        "margin-left": "5px", // Adjust margin between input and icon
                      });

                    // Toggle the password field between text and password type
                    $showregisterpasswordtoggele.click(function () {
                      const $passwordField = $("#registerPasswordField");
                      const fieldType = $passwordField.attr("type");
                      if (fieldType === "password") {
                        $passwordField.attr("type", "text");
                        $(this).removeClass("fa-eye-slash").addClass("fa-eye"); 
                         // Change the icon to hide
                      } else {
                        $passwordField.attr("type", "password");
                        $(this).removeClass("fa-eye").addClass("fa-eye-slash");// Change the icon to show
                      }
                    });
                      

                    // Create the registration button
                    const $registerButton = $("<button>")
                      .addClass("red-button")
                      .text(JsonData?.create_account);

                    // Create a section for other options
                    const $registerOtherOptionsSection = $("<div>");

                    // Create the horizontal rule for the section
                    const $registerHorizontalRule = $("<hr>").css({
                      border: "none",
                      "border-top": "1px solid #999",
                      margin: "0",
                    });

                    const $registerOtherOptionsText =
                      $("<div>").addClass("other-options");
                    const $registerOtherOptionsTextSpan =
                      $("<span>").text(JsonData?.other_options);

                    // Create the "Already have an account?" text and make it black
                    // const $registerLoginLink = $("<p>").text("").css({
                    //   color: "black",
                    //   "margin-top": "10px",
                    //   "margin-bottom": "10px",
                    // });
                    // Create the "I accept the terms and conditions" text with a clickable link
                    const $registerTermsLinkDiv =
                      $("<div>").addClass("bottom-wrap");

                    const $registerTermsLink = $("<p>").addClass("t-and-c");

                    // Create the actual link element
                    const $termsLink = $("<a>")
                      .attr("href", "https://www.example.com/terms") // Replace with your actual terms and conditions URL
                      .attr("target", "_blank")
                      .css({
                        color: "inherit", // Inherit the color from the parent (black in this case)
                        "text-decoration": "underline", // Remove the underline
                      })
                      .text(JsonData?.terms_condition); // The visible link text

                    // Append the link element to the "I accept the terms and conditions" text
                    $registerTermsLink.append(JsonData?.register_model_footer);
                    $registerTermsLink.append($termsLink);

                    // Append the "I accept the terms and conditions" text to the existing paragraph

                    const $registerLoginLinkRed = $("<p>")
                      .addClass("have-accoung")
                      .text(JsonData?.do_account);

                    // Append the "Login" text to the existing paragraph
                    const $registerLoginSpan = $("<span>")
                      .text(JsonData?.login)

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
                    // Append registration form elements to the registration form div
                    $registrationForm.append($registerHeader);
                    $registrationForm.append($redTextreg);
                    $registrationForm.append($ApierrorRegistration);
                    // Append the name input field to the registration form
                    $nameDiv.append($registerNameInput);
                    $nameDiv.append($emptyFieldErrorRegisterName);
                    $registrationForm.append($nameDiv);
                    // $registrationForm.append($registerNameInput);
                    // $registrationForm.append($emptyFieldErrorRegisterName);
                    $registerEmailInputDiv.append($registerEmailInput);
                    $registerEmailInputDiv.append($errorElementReg);
                    $registerEmailInputDiv.append(
                      $emptyFieldErrorRegisterEmail
                    );
                    $registrationForm.append($registerEmailInputDiv);

                    // $registrationForm.append($registerEmailInput);
                    // $registrationForm.append($errorElementReg);
                    // $registrationForm.append($emptyFieldErrorRegisterEmail);
                    $registerPasswordFieldDiv.append($registerPasswordField,$showregisterpasswordtoggele);
                    $registerPasswordFieldDiv.append(
                      $emptyFieldErrorRegisterPass
                    );
                    $registrationForm.append($registerPasswordFieldDiv);

                    // $registrationForm.append($registerPasswordField);
                    // $registrationForm.append($emptyFieldErrorRegisterPass);
                    $registrationForm.append($errorElementPass);
                    $registrationForm.append($registerButton);
                    $registrationForm.append($registerOtherOptionsSection);
                    $registrationForm.append($registerTermsLinkDiv);

                    // $registerOtherOptionsSection.append($registerHorizontalRule);
                    // $registrationForm.append($registerOtherOptionsSection);
                    // $otherOptionsSection.append($horizontalRule);
                    $registerOtherOptionsSection.append(
                      $registerOtherOptionsText
                    );
                    $registerOtherOptionsText.append(
                      $registerOtherOptionsTextSpan
                    );

                    $registerOtherOptionsSection.append(gIdOnloadDiv1);
                    $registerOtherOptionsSection.append(gIdSigninDiv1);
                    $registerTermsLinkDiv.append($registerTermsLink);

                    $registerTermsLinkDiv.append($registerLoginLinkRed);
                    $registerTermsLinkDiv.append($footerImage);

                    // $registerOtherOptionsSection.append($registerLoginLink);

                    // Create a div for the image
                    const $imageDivReg = $("<div>").addClass("right-content");
                    // }).addClass("d-none d-lg-block d-xl-block");

                    // Create an image element
                    const $registrationImage = $("<img>")
                      .attr(
                        "src",
                        `${FILE_URL}/${commentlistingdata.data.pageData.login_image}`,
                      ) // Replace with the actual path to your image
                      .css({
                        "max-width": "100%",
                        height: "100%", // Maintain aspect ratio
                        "object-fit": "cover",
                      });

                    // Append the image to the image div
                    $imageDivReg.append($registrationImage);

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
                      $emptyFieldErrorResetNewPass.css("display", "none");
                      $emptyFieldErrorResetConfirmPass.css("display", "none");
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
                      zIndex: "2000",
                    });

                    // Append the close button to the registration modal content

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
                    const $otpForm = $("<div>").addClass("left-content").css({
                      display: "none", // Initially hide the OTP form
                    });

                    // Create an h2 header for the OTP form
                    const $otpHeader = $("<h2>").text(JsonData?.otp_header).css({
                      // Add your styling for the OTP form header
                    });

                    // Create the red text "Enter OTP for verification"
                    const $redTextOtp = $("<h4>")
                      .text(JsonData?.otp_desc)
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
                    const $otpInputDiv = $("<div>");
                    const $otpInput = $("<input>")
                      .attr("type", "number")
                      .addClass("custom-input")
                      .attr("id", "otpInput")
                      .keydown(function (event) {
                        if (event.keyCode == 32) {
                          event.preventDefault();
                        }
                      })

                      .attr("placeholder", JsonData?.otp_placeholder)
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
                          $emptyFieldErrorOtp.css("display", "block");
                          $errorElementOtp.css("display", "none");
                        } else {
                          $emptyFieldErrorOtp.css("display", "none");
                        }
                      });

                    // Create a button for OTP confirmation
                    const $otpConfirmButton = $("<button>")
                      .addClass("red-button")
                      .text(JsonData?.submit_otp)
                      .click(handleOTPConfirmation);
                    // Create the horizontal rule for the section
                    const $OtpHorizontalRule = $("<hr>").css({
                      border: "none",
                      "border-top": "1px solid #999",
                      margin: "10px 0px",
                    });

                    // Append the "Login" text to the existing paragraph
                    const $BackToLogin = $("<p>")
                      .addClass("auth-link")
                      .text(JsonData?.back_to_login)
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
                    const $footerImageOtpDiv =
                      $("<div>").addClass("bottom-wrap");
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
                    $otpForm.append($ApierrorOTP);
                    $otpForm.append($otpInputDiv);
                    $otpInputDiv.append($otpInput);
                    $otpInputDiv.append($emptyFieldErrorOtp);
                    $otpInputDiv.append($errorElementOtp);
                    $otpForm.append($otpConfirmButton);
                    // $otpForm.append($OtpHorizontalRule);
                    $otpForm.append($BackToLogin);
                    $otpForm.append($footerImageOtpDiv);

                    $footerImageOtpDiv.append($footerImageOtp);
                    // Append the OTP form to the document body or another container

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
                        email:
                          userData && userData.emailVerified == false
                            ? userData.email
                            : email,
                        otp: parseInt(enteredOTP),
                        // Include any other necessary data for OTP confirmation
                      };
                      const $spinner = $("<div>")
                        .addClass(
                          "spinner-border spinner-border-sm mx-3 text-light"
                        )
                        .attr("role", "status")
                        .appendTo($otpConfirmButton);

                      $otpConfirmButton.prop("disabled", true);
                      // Prepare the payload for OTP confirmation
                      try {
                        const response = await axios.post(
                          `${API_URL}/user/verify-otp-for-article`,
                          otpConfirmationPayload,
                          {
                            headers: {
                              "Content-Type": "application/json",
                            },
                          }
                        );
                        if (response.status == 200) {
                          localStorage.setItem(
                            "token",
                            response?.data?.data?.token
                          );
                          localStorage.setItem(
                            "userData",
                            JSON.stringify(response?.data?.data?.data)
                          );
                          commentlistapi(true);
                        }

                        // Handle the API response here
                        $registerModal.css("display", "none");
                        onClosed();
                        FormCleaner();
                        $("#ignismyModal").css("display", "block");
                        $("#ignismyModal").addClass("modal fade show");
                        $("#msgtag").html(
                          response?.data?.message
                        );
                        setTimeout(() => {
                          $("#ignismyModal").css("display", "none");
                          $("#msgtag").html("");
                        }, 2000);
                      } catch (error) {
                        console.error("Error:", error);
                        $ApierrorOTP.empty();
                        $ApierrorOTP.append(
                          $("<p>").text(error.response.data.message)
                        );
                        $ApierrorOTP.css("display", "block");
                        // Handle errors here if necessary
                      } finally {
                        // Enable button and remove spinner after API call is complete
                        $otpConfirmButton.prop("disabled", false);
                        $spinner.remove();
                      }
                    }

                    // Create a div for the OTP form
                    const $ResetPassForm = $("<div>")
                      .addClass("left-content")
                      .css({
                        display: "none", // Initially hide the OTP form
                        // 'flex': '1', // Allow the OTP form to grow within the flex container
                      });

                    // Create an h2 header for the OTP form
                    const $ResetPassHeader = $("<h2>")
                      .text(JsonData?.reset_password)
                      .css({
                        // Add your styling for the OTP form header
                      });

                    // Create the red text "Enter OTP for verification"
                    const $RedTextResetPass = $("<h4>").text(
                      JsonData?.reset_desc
                    );
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
                    const $ResetInputDiv = $("<div>");

                    const $ResetInput = $("<input>")
                      .attr("type", "number")
                      .addClass("custom-input")
                      .attr("id", "ResetInput")
                      .keydown(function (event) {
                        if (event.keyCode == 32) {
                          event.preventDefault();
                        }
                      })

                      .attr("placeholder", JsonData?.otp_placeholder)
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
                          $emptyFieldErrorResetPass.css("display", "block");
                          $errorElementResetPass.css("display", "none");
                        } else {
                          $emptyFieldErrorResetPass.css("display", "none");
                        }
                      });
                    // Create the password input field
                    const $ResetPassInputDiv = $("<div>").addClass('custom-password');
                    const $ResetPassInput = $("<input>")
                      .attr("type", "password") // Set the input type to password
                      .addClass("custom-input")
                      .attr("id", "rpasswordField")

                      .keydown(function (event) {
                        if (event.keyCode == 32) {
                          event.preventDefault();
                        }
                      })
                      .attr("placeholder", JsonData?.new_password)
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
                      const $Showmoretotalresertpassword = $("<i>")
                      .addClass("fa fa-eye-slash")
                      .css({
                        "font-size": "24px", // Adjust the icon size
                        color: "#999", // Set the initial icon color
                        cursor: "pointer",
                        "margin-left": "5px", // Adjust margin between input and icon
                      });

                    // Toggle the password field between text and password type
                    $Showmoretotalresertpassword.click(function () {
                      const $passwordField = $("#rpasswordField");
                      const fieldType = $passwordField.attr("type");
                      if (fieldType === "password") {
                        $passwordField.attr("type", "text");
                        $(this).removeClass("fa-eye-slash").addClass("fa-eye"); // Change the icon to hide
                      } else {
                        $passwordField.attr("type", "password");
                        
                        $(this).removeClass("fa-eye").addClass("fa-eye-slash");// Change the icon to show
                      }
                    });

                    // Create the password input field
                    const $ResetPassReInputdiv = $("<div>").addClass('custom-password');
                    const $ResetPassReInput = $("<input>")
                      .attr("type", "password") // Set the input type to password
                      .addClass("custom-input")
                      .attr("id", "repasswordField")

                      .keydown(function (event) {
                        if (event.keyCode == 32) {
                          event.preventDefault();
                        }
                      })
                      .attr("placeholder", JsonData?.confirm_password)
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
                          $emptyFieldErrorResetConfirmPass.css(
                            "display",
                            "none"
                          );
                        } else {
                          $errorElementPassResetConfirm.css("display", "none");
                        }
                        if (password.trim() === "") {
                          $errorElementPassResetConfirm.css("display", "none");
                          $emptyFieldErrorResetConfirmPass.css(
                            "display",
                            "block"
                          );
                        }
                      });
                      const $Showmoretotalresertrepassword = $("<i>")
                      .addClass("fa fa-eye-slash")
                      .css({
                        "font-size": "24px", // Adjust the icon size
                        color: "#999", // Set the initial icon color
                        cursor: "pointer",
                        "margin-left": "5px", // Adjust margin between input and icon
                      });

                    // Toggle the password field between text and password type
                    $Showmoretotalresertrepassword.click(function () {
                      const $passwordField = $("#repasswordField");
                      const fieldType = $passwordField.attr("type");
                      if (fieldType === "password") {
                        $passwordField.attr("type", "text");
                       // $(this).removeClass("fa-eye-slash").addClass("fa-eye"); // Change the icon to hide
                        $(this).removeClass("fa-eye").addClass("fa-eye-slash");
                      } else {
                        $passwordField.attr("type", "password");
                        // Change the icon to show
                        $(this).removeClass("fa-eye-slash").addClass("fa-eye");
                      }
                    });

                    // Create a button for OTP confirmation
                    const $ResetPassButton = $("<button>")
                      .addClass("red-button")
                      .text(JsonData?.reset_password)

                      .click(handleResetSubmit);
                    // Create the horizontal rule for the section
                    const $ResetPassHorizontalRule = $("<hr>").css({
                      border: "none",
                      "border-top": "1px solid #999",
                      margin: "10px 0px",
                    });

                    // Append the "Login" text to the existing paragraph
                    const $BackToLoginResetPass = $("<p>")
                      .addClass("auth-link")
                      .text(JsonData?.back_to_login)

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

                    const $ResetPassBottpmImg =
                      $("<div>").addClass("bottom-wrap");
                    $ResetPassBottpmImg.append(
                      '<img src="https://raw.githubusercontent.com/DCP121/article-pages/dev/assets/comment-logo.png" style="width: 155.07px; height: 20px; margin-top: 20px;">'
                    );

                    // Append OTP form elements to the OTP form container
                    $ResetPassForm.append($ResetPassHeader);
                    $ResetPassForm.append($RedTextResetPass);
                    $ResetPassForm.append($ApierrorResetPass);
                    $ResetPassForm.append($PasswordNotSame);
                    $ResetPassForm.append($ResetInputDiv);
                    $ResetInputDiv.append($ResetInput);
                    $ResetInputDiv.append($emptyFieldErrorResetPass);
                    $ResetInputDiv.append($errorElementResetPass);

                    $ResetPassForm.append($ResetPassInputDiv);
                    $ResetPassInputDiv.append($ResetPassInput);
                    $ResetPassInputDiv.append($emptyFieldErrorResetNewPass);
                    $ResetPassInputDiv.append($errorElementPassReset);
                    $ResetPassInputDiv.append($Showmoretotalresertpassword);

                    $ResetPassForm.append($ResetPassReInputdiv);
                    $ResetPassReInputdiv.append($ResetPassReInput);
                    $ResetPassReInputdiv.append($Showmoretotalresertrepassword);
                    $ResetPassReInputdiv.append(
                      $emptyFieldErrorResetConfirmPass
                    );
                    $ResetPassReInputdiv.append($errorElementPassResetConfirm);

                    $ResetPassForm.append($ResetPassButton);
                    // $ResetPassForm.append($ResetPassHorizontalRule);
                    $ResetPassForm.append($BackToLoginResetPass);
                    $ResetPassForm.append($ResetPassBottpmImg);

                    // Append the OTP form to the document body or another container

                    // Function to handle OTP confirmation
                    async function handleResetSubmit() {
                      const enteredOTP = $ResetInput.val().trim();
                      const otpRegex = /^\d{6}$/;
                      const newPass = $ResetPassInput.val().trim();
                      const confirmPass = $ResetPassReInput.val().trim();
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
                          $emptyFieldErrorResetConfirmPass.css(
                            "display",
                            "block"
                          );
                          return;
                        }
                        return;
                      }
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
                        $emptyFieldErrorResetConfirmPass.css(
                          "display",
                          "block"
                        );
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
                      const $spinner = $("<div>")
                        .addClass(
                          "spinner-border spinner-border-sm mx-3 text-light"
                        )
                        .attr("role", "status")
                        .appendTo($ResetPassButton);

                      $ResetPassButton.prop("disabled", true);
                      // Send a POST request to the OTP confirmation API
                      try {
                        const response = await axios.post(
                          `${API_URL}/user/reset-password-article-page`,
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
                          $("#ignismyModal").css("display", "block");
                          $("#ignismyModal").addClass("modal fade show");
                          $("#msgtag").html(
                           response.data?.message
                          );
                          setTimeout(() => {
                            $("#ignismyModal").css("display", "none");
                            $("#msgtag").html("");
                          }, 2000);
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
                            $emptyFieldErrorRegisterPass.css(
                              "display",
                              "block"
                            );
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

                      const $spinner = $("<div>")
                        .addClass(
                          "spinner-border spinner-border-sm mx-3 text-light"
                        )
                        .attr("role", "status")
                        .appendTo($registerButton);

                      $registerButton.prop("disabled", true);
                      const ip = localStorage.getItem("ip");

                      // Prepare the payload
                      const payload = {
                        name: name,
                        email: email,
                        password: password,
                        site: siteName,
                        ip,
                        device,
                      };

                      try {
                        const response = await axios.post(
                          `${API_URL}/user/register-article-page`,
                          payload,
                          {
                            headers: {
                              "Content-Type": "application/json",
                            },
                          }
                        );

                        if (response.status === 200) {
                          console.log(response);
                          localStorage.setItem(
                            "token",
                            response?.data?.data?.token
                          );
                          localStorage.setItem(
                            "userData",
                            JSON.stringify(response?.data?.data?.user)
                          );
                          commentlistapi(true);
                          // Handle the API response here

                          // Close the registration form and show the OTP confirmation form if registration is successful
                          $registerModalContent.append($otpForm);
                          $registerModalContent.append($imageDivReg);

                          $registrationForm.css("display", "none");
                          $otpForm.css({
                            display: "block",
                            flex: "1", // Allow the OTP form to grow within the flex container
                          });
                        } else {
                          throw new Error("Network response was not ok");
                        }
                      } catch (error) {
                        console.error("Error:", error.response.data.message);
                        $ApierrorRegistration.empty();
                        $ApierrorRegistration.append(
                          $("<p>").text(error.response.data.message)
                        );
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
                        $firstImageContainer
                          .find("img")
                          .css("max-width", "100%");
                        $flexContainer.find("img").css("max-width", "100%");
                        $registerModalContent.css("width", "90%");
                      } else {
                        // Reset to the original styles for wider screens
                        $firstImageContainer
                          .find("img")
                          .css("max-width", "100%");
                        $flexContainer.find("img").css("max-width", "100%");
                      }
                    }
                    // $(document).on('keyup', function (event) {
                    $registrationForm.on("keyup", function (event) {
                      // Check if the Enter key (key code 13) was pressed
                      if (event.keyCode === 13) {
                        // Prevent the default behavior of the Enter key (e.g., form submission)
                        event.preventDefault();
                        // Trigger the handleLogin function when Enter key is pressed
                        handleRegistration();
                      }
                    });
                    $loginForm.on("keyup", function (event) {
                      // Check if the Enter key (key code 13) was pressed
                      if (event.keyCode === 13) {
                        // Prevent the default behavior of the Enter key (e.g., form submission)
                        event.preventDefault();
                        // Trigger the handleLogin function when Enter key is pressed
                        handleLogin();
                      }
                    });
                    $otpForm.on("keyup", function (event) {
                      // Check if the Enter key (key code 13) was pressed
                      if (event.keyCode === 13) {
                        // Prevent the default behavior of the Enter key (e.g., form submission)
                        event.preventDefault();
                        // Trigger the handleLogin function when Enter key is pressed
                        handleOTPConfirmation();
                      }
                    });
                    $ForgotPassForm.on("keyup", function (event) {
                      // Check if the Enter key (key code 13) was pressed
                      if (event.keyCode === 13) {
                        // Prevent the default behavior of the Enter key (e.g., form submission)
                        event.preventDefault();
                        // Trigger the handleLogin function when Enter key is pressed
                        sendForgotPasswordRequest();
                      }
                    });
                    $ResetPassForm.on("keyup", function (event) {
                      // Check if the Enter key (key code 13) was pressed
                      if (event.keyCode === 13) {
                        // Prevent the default behavior of the Enter key (e.g., form submission)
                        event.preventDefault();
                        // Trigger the handleLogin function when Enter key is pressed
                        handleResetSubmit();
                      }
                    });
                    // });
                    // Append the registration form div to the registration modal content
                    $registerModalContent.append($registrationForm);
                    $registerModalContent.append($loginForm);
                    $registerModalContent.append($ForgotPassForm);
                    $registerModalContent.append($otpForm);
                    $registerModalContent.append($ResetPassForm);
                    // Append the image div to the registration modal content
                    $registerModalContent.append($imageDivReg);
                    $registerModalContent.append($registerModalClose);
                    // Define the media query based on screen width
                    const mediaQuery = window.matchMedia("(max-width: 768px)");

                    // Initial check for the media query and add a listener for changes
                    handleMediaQueryChange(mediaQuery);
                    mediaQuery.addEventListener(
                      "change",
                      handleMediaQueryChange
                    );
                  }
                });
              });
            }
          );
        }
      );
    });
  
});
