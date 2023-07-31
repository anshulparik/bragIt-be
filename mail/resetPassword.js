const resetPassword = `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>BeerStore</title>
    <style>
      /* -------------------------------------
          GLOBAL RESETS
      ------------------------------------- */

      /*All the styling goes here*/

      @font-face {
        font-family: "Gotham-Book";
        src: url("./fonts/Gotham/ttf/Gotham-Book.ttf") format("OpenType");

        font-style: normal;

        font-display: swap;
      }

      @font-face {
        font-family: "Gotham-Bold";

        src: url("./fonts/Gotham/ttf/Gotham-Bold.ttf") format("OpenType");

        font-style: bold;

        font-display: swap;
      }
      @font-face {
        font-family: "Gotham-Medium";

        src: url("./fonts/Gotham/ttf/Gotham-Medium.ttf") format("OpenType");

        font-style: Medium;

        font-display: swap;
      }

      @font-face {
        font-family: "Leviathan-Normal";
        src: url("./fonts/Leviathan/Leviathan-HTF-Black.otf") format("OpenType");
        font-style: normal;

        font-display: swap;
      }

      img {
        border: none;
        -ms-interpolation-mode: bicubic;
        max-width: 100%;
      }

      body {
        background-color: #fff;
        font-family: sans-serif;
        -webkit-font-smoothing: antialiased;
        font-size: 14px;
        line-height: 1.4;
        margin: 0;
        padding: 0;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }

      table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
      }
      table td {
        font-family: sans-serif;
        font-size: 14px;
        vertical-align: top;
        padding: 0;
      }

      /* -------------------------------------
          BODY & CONTAINER
      ------------------------------------- */

      .body {
        background-color: #fff;
        width: 100%;
      }

      /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
      .container {
        display: block;
        margin: 0 auto !important;
        /* makes it centered */
        padding: 10px;
        max-width: 640px;
        width: 640px;
      }

      /* This should also be a block element, so that it will fill 100% of the .container */
      .content {
        box-sizing: border-box;
        display: block;
        margin: 0 auto;
        max-width: 640px;
      }

      /* -------------------------------------
          HEADER, FOOTER, MAIN
      ------------------------------------- */
      .main {
        background: #ffffff;
        width: 100%;
      }

      .wrapper {
        box-sizing: border-box;
      }

      .content-block {
        padding-bottom: 10px;
        padding-top: 10px;
      }
      .header {
        background-color: #000000;
      }

      .footer {
        clear: both;
        text-align: center;
        width: 100%;
        background-color: #000000;
      }
      .footer td,
      .footer p,
      .footer span,
      .footer a {
        color: #fff;
        font-size: 12px;
        text-align: center;
      }

      /* -------------------------------------
          TYPOGRAPHY
      ------------------------------------- */
      h1,
      h2,
      h3,
      h4 {
        color: #000000;
        font-family: sans-serif;
        font-weight: 400;
        line-height: 1.4;
        margin: 0;
        margin-bottom: 30px;
      }

      h1 {
        font-size: 35px;
        font-weight: 300;
        text-align: center;
        text-transform: capitalize;
      }

      p,
      ul,
      ol {
        font-family: sans-serif;
        font-size: 14px;
        font-weight: normal;
        margin: 0;
        margin-bottom: 15px;
      }
      p li,
      ul li,
      ol li {
        list-style-position: outside;
        margin-left: 0;
      }

      a {
        color: #3498db;
        text-decoration: underline;
      }

      /* -------------------------------------
          BUTTONS
      ------------------------------------- */

      .btn-primary {
        font-size: 14px;
        border-radius: 8px;
        background-color: #f3b232;
        border-color: #f3b232;
        color: #000;
        display: block;
        text-decoration: none;
        padding: 10px;
        text-align: center;
      }

      /* -------------------------------------
          OTHER STYLES THAT MIGHT BE USEFUL
      ------------------------------------- */
      .last {
        margin-bottom: 0;
      }

      .first {
        margin-top: 0;
      }

      .align-center {
        text-align: center;
      }

      .align-right {
        text-align: right;
      }

      .align-left {
        text-align: left;
      }

      .clear {
        clear: both;
      }

      .mt0 {
        margin-top: 0;
      }

      .mb0 {
        margin-bottom: 0;
      }

      .powered-by a {
        text-decoration: none;
      }

      hr {
        border: 0;
        border-bottom: 1px solid #d6d6d6;
        margin: 0;
        /* margin: 20px 0; */
      }

      /* -------------------------------------
          RESPONSIVE AND MOBILE FRIENDLY STYLES
      ------------------------------------- */
      @media only screen and (max-width: 620px) {
        /* table.body h1 {
          font-size: 28px !important;
          margin-bottom: 10px !important;
        } */
        /* table.body p,
        table.body ul,
        table.body ol,
        table.body td,
        table.body span,
        table.body a {
          font-size: 16px !important;
        } */

        table.body .content {
          padding: 0 !important;
        }
        table.body .container {
          padding: 0 !important;
          width: 100% !important;
        }
        table.body .main {
          border-left-width: 0 !important;
          border-right-width: 0 !important;
        }
        table.body .btn table {
          width: 100% !important;
        }
        table.body .btn a {
          width: 100% !important;
        }
        table.body .img-responsive {
          height: auto !important;
          max-width: 100% !important;
          width: auto !important;
        }
      }
    </style>
  </head>
  <body>
    <table
      role="presentation"
      border="0"
      cellpadding="0"
      cellspacing="0"
      class="body"
    >
      <tr>
        <td class="container">
          <div class="content">
            <!-- START PRE-HEADER -->
            <div
              class="pre-header"
              style="background-color: #f3b232; padding: 20px 30px"
            >
              <table>
                <tr style="width: 50%; float: left">
                  <td>
                    <p
                      style="
                        margin: 0;
                        font-size: 12px;
                        font-family: Gotham-Book, sans-serif;
                      "
                    >
                      Lorem ipsum dolor sit amet, consectetur
                    </p>
                  </td>
                </tr>
                <tr style="width: 42%; float: right">
                  <td>
                    <p
                      style="
                        margin: 0;
                        font-size: 12px;
                        font-family: Gotham-Book, sans-serif;
                      "
                    >
                      <a
                        href="#"
                        target="_blank"
                        style="
                          color: #000000;
                          text-decoration: none;
                          font-family: Gotham-Bold, sans-serif;
                        "
                        >Click here
                      </a>
                      if you can’t see this email
                    </p>
                  </td>
                </tr>
              </table>
            </div>
            <!-- END PRE-HEADER  -->

            <!-- START HEADER -->
            <div class="header">
              <table
                role="presentation"
                border="0"
                cellpadding="0"
                cellspacing="0"
              >
                <tr>
                  <td style="padding: 18px 0px; text-align: center">
                    <img
                      alt="logo"
                      height="25px"
                      width="140px"
                      src="https://tbsecomd.wpengine.com/sf-email-images/beer-store-logo-sm.png"
                    />
                  </td>
                </tr>
              </table>
            </div>
            <!-- END HEADER -->

            <!-- START BANNER SECTION  -->
            <div class="banner">
              <table
                role="presentation"
                border="0"
                cellpadding="0"
                cellspacing="0"
              >
                <tr>
                  <td style="padding: 20px">
                    <a
                      href="#"
                      target="_blank"
                      style="text-decoration: none !important"
                    >
                      <img
                        style="
                          display: block;
                          width: 100%;
                          max-width: 600px;
                          max-height: 300px;
                        "
                        alt="banner_image"
                        height="300px"
                        width="600px"
                        src="https://tbsecomd.wpengine.com/sf-email-images/background2.png "
                      />
                    </a>

                    <div style="margin-top: 20px">
                      <table role="presentation" class="main">
                        <!-- START BEER HUB SECTION -->

                        <tr>
                          <td
                            style="
                              background-image: url(https://tbsecomd.wpengine.com/sf-email-images/bear_hub.png);
                              background-repeat: no-repeat;
                              background-size: cover;
                              width: 600px;
                              height: 320px;
                              padding: 0px;
                            "
                          >
                            <table align="center">
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      padding-top: 40px;
                                      padding-left: 30px;
                                    "
                                    width="50%;"
                                  >
                                    <h2
                                      style="
                                        margin-bottom: 12px;
                                        font-size: 20px;
                                        font-family: Leviathan-Normal,
                                          sans-serif;
                                      "
                                    >
                                      The Beer Hub
                                    </h2>

                                    <p
                                      style="
                                        font-size: 16px;
                                        line-height: 19px;
                                        width: 70%;
                                        font-family: Gotham-Book, sans-serif;
                                      "
                                    >
                                      1,000+ brands for you to explore, with
                                      articles, pairings, and recipes galore.
                                      Cheers to discovering what's brewing at
                                      The Beer Hub.
                                    </p>
                                    <a
                                      href="#"
                                      class="btn-primary"
                                      target="_blank"
                                      style="
                                        width: 175px;
                                        padding: 12px 10px;
                                        font-size: 12px;
                                        font-family: Gotham-Bold, sans-serif;
                                      "
                                      >EXPLORE THE BEER HUB</a
                                    >
                                  </td>

                                  <td style="width: 50%" width="50%">
                                    <img
                                      style="
                                        padding-top: 18px;
                                        padding-left: 174px;
                                        width: 140px;
                                        height: 60px;
                                      "
                                      alt="Beer"
                                      src="https://tbsecomd.wpengine.com/sf-email-images/beer_hub_badge.png"
                                    />
                                    <!-- <img alt="" src="./images/arrow.png" /> -->
                                  </td>
                                </tr>
                              </tbody>
                            </table>

                            <!-- -- new condition starts here- -->
                            <!--[if mso]>
                              <v:roundrect
                                xmlns:v="urn:schemas-microsoft-com:vml"
                                xmlns:w="urn:schemas-microsoft-com:office:word"
                                href="#"
                                style="
                                  height: 45px;
                                  v-text-anchor: middle;
                                  width: 250px;
                                "
                                arcsize="10%"
                                stroke="f"
                                fillcolor="#f4b233"
                              >
                                <w:anchorlock />
                                <center
                                  style="
                                    color: #000;
                                    font-family: Arial, Helvetica, sans-serif,
                                      Montserrat;
                                    font-size: 16px;
                                    font-weight: bold;
                                  "
                                >
                                  EXPLORE THE BEER HUB ---
                                </center>
                              </v:roundrect>
                            <![endif]-->

                            <!--[if !mso]> <!-->
                            <table
                              style="
                                margin-top: 0;
                                margin-bottom: 0;
                                margin-right: auto;
                                margin-left: auto;
                                border-spacing: 0;
                                width: 195px;
                              "
                              cellspacing="0 "
                              align="center"
                              cellpadding="0"
                              border="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="button-radius"
                                    style="
                                      -moz-border-radius: 8px;
                                      border-radius: 8px;
                                      -webkit-border-radius: 8px;
                                      -ms-border-radius: 8px;
                                      text-align: center;
                                      background: #f4b233;
                                      padding-top: 5px;
                                      padding-bottom: 5px;
                                      /* padding-right: 10px;
                                      padding-left: 10px; */
                                    "
                                    width="195"
                                    bgcolor="#f4b233 "
                                    align="center "
                                  >
                                    <a
                                      href="#!"
                                      target="_blank"
                                      class="button-link-2"
                                      style="
                                        background: #f4b233;
                                        display: block;
                                        text-decoration: none;
                                        text-align: center;
                                        font-weight: bold;
                                        font-size: 12px;
                                        font-family: Gotham-Bold, sans-serif,
                                          Montserrat;
                                        -moz-border-radius: 8px;
                                        -webkit-border-radius: 8px;
                                        border-radius: 8px;
                                        line-height: 15px;
                                        color: #000;
                                        background-image: none;
                                        background-repeat: repeat;
                                        background-position: top left;
                                        background-attachment: scroll;
                                        border-radius: 8px;
                                        -webkit-border-radius: 8px;
                                        -ms-border-radius: 5px;
                                        border-width: 5px;
                                        border: 0px;
                                        text-align: center;
                                        width: 195px;
                                        padding-top: 8px;
                                        padding-bottom: 8px;
                                      "
                                    >
                                      EXPLORE THE BEER HUB
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <!-- <![endif]-->
                            <!-- -- new condition ends here- -->
                          </td>
                        </tr>
                      </table>
                      <!-- END BEER HUB SECTION -->
                    </div>

                    <!-- START PATTERN SECTION -->
                    <div
                      style="
                        background-image: url(https://tbsecomd.wpengine.com/sf-email-images/pattern_img.png);
                        background-repeat: no-repeat;
                        background-size: contain;
                        height: 190px;
                        padding: 0px;
                        margin-top: 20px;
                      "
                    >
                      <img
                        style="
                          width: 138px;
                          height: 60px;
                          padding-top: 21px;
                          padding-left: 475px;
                        "
                        alt="Beer"
                        src="https://tbsecomd.wpengine.com/sf-email-images/pattern_badge.png"
                      />
                    </div>
                    <div
                      style="
                        background-color: #f4f4f4;
                        padding: 30px 35px;
                        text-align: center;
                        color: #000000;
                        border-radius: 0px 0px 5px 5px;
                      "
                    >
                      <h2
                        style="
                          margin: 0;
                          padding-bottom: 10px;
                          font-size: 20px;
                          font-family: Leviathan-Normal, sans-serif;
                        "
                      >
                        Light Lager Wings
                      </h2>
                      <p
                        style="
                          font-size: 16px;
                          line-height: 19px;
                          color: #4b4f54;
                          font-family: Gotham-Book, sans-serif;
                          margin-bottom: 10px;
                        "
                      >
                        Any light lager works well for this recipe and will be
                        sure to turn some heads at your next gathering. These
                        light lager grilled wings are the perfect appetizer,
                        game day snack, or easy weekend plate - don’t forget the
                        lime!
                      </p>
                      <a
                        href="#"
                        class="btn-primary"
                        target="_blank"
                        style="
                          width: 120px;
                          padding: 12px;
                          margin: auto;
                          font-size: 12px;
                          font-family: Gotham-Bold, sans-serif;
                        "
                        >GET THE RECIPE</a
                      >
                    </div>
                    <!-- END PATTERN SECTION -->

                    <!-- START ORDER SECTION -->

                    <div style="text-align: center; margin: 20px 0px">
                      <table
                        role="presentation"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                      >
                        <tr>
                          <td>
                            <p
                              style="
                                font-size: 18px;
                                line-height: 21px;
                                color: #4b4f54;
                                margin-bottom: 10px;
                                font-family: Gotham-Book, sans-serif;
                                text-transform: uppercase;
                              "
                            >
                              More From
                            </p>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <h2
                              style="
                                text-align: center;
                                font-size: 30px;
                                font-family: Leviathan-Normal, sans-serif;
                                text-transform: uppercase;
                                margin-bottom: 20px;
                              "
                            >
                              The Beer Store
                            </h2>
                          </td>
                        </tr>

                        <tr>
                          <td style="font-size: 16px; font-weight: 400">
                            <div>
                              <ul
                                style="
                                  list-style-type: none;
                                  margin: 0;
                                  padding: 0;
                                  display: table;
                                  width: 100%;
                                "
                              >
                                <li
                                  style="display: inline-block; width: 32.33%"
                                >
                                  <a
                                    class="btn-primary"
                                    href="#"
                                    target="_blank"
                                    style="
                                      font-size: 12px;
                                      padding: 12px;
                                      font-family: Gotham-Bold, sans-serif;
                                    "
                                    >OUR BEERS</a
                                  >
                                </li>
                                <li
                                  style="display: inline-block; width: 32.33%"
                                >
                                  <a
                                    href="#"
                                    target="_blank"
                                    style="
                                      margin-left: 10px;
                                      font-size: 12px;
                                      padding: 12px;
                                      font-family: Gotham-Bold, sans-serif;
                                    "
                                    class="btn-primary"
                                    >STORE LOCATOR</a
                                  >
                                </li>
                                <li
                                  style="display: inline-block; width: 32.33%"
                                >
                                  <a
                                    href="#"
                                    target="_blank"
                                    style="
                                      margin-left: 10px;
                                      font-size: 12px;
                                      padding: 12px;
                                      font-family: Gotham-Bold, sans-serif;
                                    "
                                    class="btn-primary"
                                    >SHOP BEER GEAR</a
                                  >
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td style="font-size: 16px; font-weight: 400">
                            <div style="margin-top: 20px">
                              <ul
                                style="
                                  list-style-type: none;
                                  margin: 0;
                                  padding: 0;
                                  display: table;
                                  width: 100%;
                                "
                              >
                                <li
                                  style="display: inline-block; width: 32.33%"
                                >
                                  <a
                                    href="#"
                                    target="_blank"
                                    class="btn-primary"
                                    style="
                                      font-size: 12px;
                                      padding: 12px;
                                      font-family: Gotham-Bold, sans-serif;
                                    "
                                    >OUR BEERS</a
                                  >
                                </li>
                                <li
                                  style="display: inline-block; width: 32.33%"
                                >
                                  <a
                                    href="#"
                                    target="_blank"
                                    style="
                                      margin-left: 10px;
                                      font-size: 12px;
                                      padding: 12px;
                                      font-family: Gotham-Bold, sans-serif;
                                    "
                                    class="btn-primary"
                                    >STORE LOCATOR</a
                                  >
                                </li>
                                <li
                                  style="display: inline-block; width: 32.33%"
                                >
                                  <a
                                    href="#"
                                    target="_blank"
                                    style="
                                      margin-left: 10px;
                                      font-size: 12px;
                                      padding: 12px;
                                      font-family: Gotham-Bold, sans-serif;
                                    "
                                    class="btn-primary"
                                    >SHOP BEER GEAR</a
                                  >
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>

                    <!-- END ORDER SECTION -->
                  </td>
                </tr>
              </table>
            </div>
            <!-- END BANNER SECTION -->

            <div style="margin-top: 20px">
              <table role="presentation" class="main">
                <!-- START CARD SECTION -->
                <tr>
                  <td
                    style="
                      background-image: url(https://tbsecomd.wpengine.com/sf-email-images/find_store_img.png);
                      background-repeat: no-repeat;
                      background-size: 640px 252px;
                      width: 640px;
                      height: 252px;
                      padding: 0px;
                    "
                  >
                    <table
                      align="center"
                      style="width: 640px; max-width: 640px"
                      width="640px"
                    >
                      <tbody>
                        <tr>
                          <td style="width: 50%" width="50%"></td>
                          <td
                            style="
                              padding-top: 25px;
                              padding-left: 30px;
                              padding-bottom: 25px;
                            "
                            width="50%;"
                          >
                            <h2
                              style="
                                font-size: 28px;
                                line-height: 38px;
                                margin-bottom: 10px;
                                font-family: Leviathan-Normal, sans-serif;
                              "
                            >
                              Your ALL Access Pass to 1,000+ Brands.
                            </h2>

                            <p
                              style="
                                font-size: 18px;
                                line-height: 20px;
                                margin-bottom: 10px;
                                font-family: Gotham-Book, sans-serif;
                              "
                            >
                              Available for purchase in store.
                            </p>
                            <a
                              href="#"
                              target="_blank"
                              class="btn-primary"
                              style="
                                margin: 0;
                                width: 206px;
                                font-size: 14px;
                                line-height: 16px;
                                font-family: Gotham-Bold, sans-serif;
                              "
                              >FIND A STORE NEAR YOU</a
                            >
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </table>
              <!-- END CARD SECTION -->
            </div>

            <table role="presentation" class="main">
              <!-- START DOWNLOAD OUR APP BANNER -->
              <tr>
                <td
                  style="
                    background-image: url(https://tbsecomd.wpengine.com/sf-email-images/download_app_background.png);
                    background-repeat: no-repeat;
                    background-size: 640px 220px;
                    width: 640px;
                    height: 220px;
                    padding: 0px;
                  "
                >
                  <table
                    align="center"
                    style="width: 640px; max-width: 640px"
                    width="640px"
                  >
                    <tbody>
                      <tr>
                        <td style="width: 40%" width="40%"></td>
                        <td
                          style="
                            width: 60%;
                            padding-top: 60px;
                            padding-right: 60px;
                            padding-left: 40px;
                          "
                          width="60%;"
                        >
                          <div>
                            <h2
                              style="
                                font-size: 20px;
                                line-height: 26px;
                                margin: 0;
                                margin-bottom: 10px;
                                text-align: left;
                                font-family: Leviathan-Normal, sans-serif;
                                text-transform: uppercase;
                              "
                            >
                              <strong>DOWNLOAD OUR APP</strong>
                            </h2>
                            <h1
                              style="
                                font-size: 14px;
                                line-height: 16px;
                                margin: 0;
                                text-align: left;
                                margin-bottom: 10px;
                                font-family: Gotham-Book, sans-serif;
                                text-transform: none;
                              "
                            >
                              The right beer right to your door
                            </h1>
                            <div>
                              <a
                                href="#"
                                target="_blank"
                                style="
                                  margin-right: 10px;
                                  text-decoration: none !important;
                                "
                              >
                                <img
                                  style="
                                    width: 100px;
                                    height: 38px;
                                    text-align: center;
                                  "
                                  alt="Beer"
                                  src="https://tbsecomd.wpengine.com/sf-email-images/App_Store_Black.png"
                                  align="center"
                                  width="100px"
                                  height="38px"
                                />
                              </a>
                              <a
                                href="#"
                                target="_blank"
                                style="text-decoration: none !important"
                              >
                                <img
                                  style="
                                    width: 100px;
                                    height: 38px;
                                    text-align: center;
                                  "
                                  alt="Beer"
                                  src="https://tbsecomd.wpengine.com/sf-email-images/Google_Play_Black.png"
                                  align="center"
                                  width="100px"
                                  height="38px"
                                />
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>

              <!-- END DOWNLOAD OUR APP BANNER -->
            </table>

            <!-- START FOOTER -->
            <div class="footer" style="background-color: #000">
              <table
                role="presentation"
                border="0"
                cellpadding="0"
                cellspacing="0"
                style="background-color: #000000"
              >
                <tr>
                  <td
                    style="
                      padding: 30px;
                      padding-top: 28px;
                      padding-bottom: 28px;
                    "
                  >
                    <img
                      src="https://tbsecomd.wpengine.com/sf-email-images/logo.png"
                      alt="BeerStore"
                      height="35px"
                      width="200px"
                    />
                  </td>
                </tr>
                <tr>
                  <td style="padding-left: 30px; padding-right: 30px">
                    <hr />
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px; font-size: 16px; font-weight: 400">
                    <table>
                      <tr>
                        <td>
                          <p
                            style="
                              margin-bottom: 10px;
                              font-size: 16px;
                              line-height: 19px;
                              color: #ffffff;
                              font-family: Gotham-Bold, sans-serif;
                              text-transform: uppercase;
                            "
                          >
                            FOLLOW US
                          </p>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <a
                            href="#"
                            target="_blank"
                            style="text-decoration: none; margin-right: 10px"
                          >
                            <img
                              src="https://tbsecomd.wpengine.com/sf-email-images/fb.png"
                              alt="BeerStore"
                              height="36px"
                              width="36px"
                            />
                          </a>
                          <a
                            href="#"
                            target="_blank"
                            style="text-decoration: none; margin-right: 10px"
                          >
                            <img
                              src="https://tbsecomd.wpengine.com/sf-email-images/tw.png"
                              alt="BeerStore"
                              height="36px"
                              width="36px"
                            />
                          </a>
                          <a
                            href="#"
                            target="_blank"
                            style="text-decoration: none; margin-right: 10px"
                          >
                            <img
                              src="https://tbsecomd.wpengine.com/sf-email-images/pint.png"
                              alt="BeerStore"
                              height="36px"
                              width="36px"
                            />
                          </a>
                          <a
                            href="#"
                            target="_blank"
                            style="text-decoration: none; margin-right: 10px"
                          >
                            <img
                              src="https://tbsecomd.wpengine.com/sf-email-images/ig.png"
                              alt="BeerStore"
                              height="36px"
                              width="36px"
                            />
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-left: 30px; padding-right: 30px">
                    <hr />
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px">
                    <table>
                      <tr>
                        <td
                          style="width: 33.33%; text-align: left"
                          align="left"
                        >
                          <a
                            href="#"
                            target="_blank"
                            style="
                              font-size: 16px;
                              line-height: 19px;
                              color: #ffffff;
                              font-family: Gotham-Bold, sans-serif;
                              text-transform: uppercase;
                            "
                            >INFORMATION</a
                          >
                        </td>
                        <td style="width: 33.33%" align="center">
                          <a
                            href="#"
                            target="_blank"
                            style="
                              font-size: 16px;
                              line-height: 19px;

                              color: #ffffff;
                              font-family: Gotham-Bold, sans-serif;
                              text-transform: uppercase;
                            "
                            >LEGAL & POLICIES</a
                          >
                        </td>
                        <td
                          style="width: 33.33%; text-align: right"
                          align="right"
                        >
                          <a
                            href="#"
                            target="_blank"
                            style="
                              font-size: 16px;
                              line-height: 19px;

                              color: #ffffff;
                              font-family: Gotham-Bold, sans-serif;
                              text-transform: uppercase;
                            "
                            >EMPLOYMENT</a
                          >
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-left: 30px; padding-right: 30px">
                    <hr />
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px">
                    <div>
                      <p style="margin-bottom: 30px">
                        <a
                          href="#"
                          target="_blank"
                          style="
                            color: #f4b233;
                            font-size: 14px;
                            line-height: 17px;
                            font-family: Gotham-Bold, sans-serif;
                          "
                          >https://thebeerstore.ca</a
                        >
                      </p>

                      <p
                        style="
                          font-size: 14px;
                          line-height: 17px;
                          color: #ffffff;
                          font-family: Gotham-Bold, sans-serif;
                        "
                      >
                        The Beer Store
                      </p>

                      <p
                        style="
                          margin: 0;
                          font-size: 14px;
                          color: #ffffff;
                          font-family: Gotham-Book, sans-serif;
                        "
                      >
                        12258 Coleraine Dr Bolton, ON L7E 3A9
                        <br />
                        If you have any questions please contact our customer
                        service department at <br />
                        1-888-948-2337.
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding-left: 30px; padding-right: 30px">
                    <hr />
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px">
                    <div>
                      <img
                        style="margin-right: 30px; vertical-align: middle"
                        src=" https://tbsecomd.wpengine.com/sf-email-images/logo-arrive-alive-logo.png"
                        alt="BeerStore"
                        height="45px"
                        width="85px"
                      />
                      <img
                        style="margin-right: 30px; vertical-align: middle"
                        src="https://tbsecomd.wpengine.com/sf-email-images/logo-best-bar-none.png"
                        alt="BeerStore"
                        height="45px"
                        width="85px"
                      />
                      <img
                        style="margin-right: 30px; vertical-align: middle"
                        src="https://tbsecomd.wpengine.com/sf-email-images/logo-essential-accessibility.png"
                        alt="BeerStore"
                        height="35px"
                        width="85px"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding-left: 30px; padding-right: 30px">
                    <hr />
                  </td>
                </tr>

                <tr>
                  <td style="padding: 30px; color: #4b4f54; font-size: 14px">
                    <p
                      style="
                        font-size: 14px;
                        line-height: 17px;
                        color: #4b4f54;
                        margin: 0;
                        font-family: Gotham-Book, sans-serif;
                      "
                    >
                      © 2023 The Beer Store
                    </p>
                  </td>
                </tr>
              </table>
            </div>
            <!-- END FOOTER -->
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

module.exports = resetPassword;
