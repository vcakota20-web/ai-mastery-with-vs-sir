/* =====================================================================
   SITE_CONFIG — edit values here. Every page reads from this file, so a
   change here (price, payment link, phone number) updates the whole site.
   ===================================================================== */
const SITE_CONFIG = {

  // ---- BOOK -------------------------------------------------------
  BOOK_TITLE: "Practical Guide to AI for Educators",
  BOOK_AUTHOR: "VS Sir (Vijay Kumar Sharma)",
  BOOK_FORMAT: "Digital E-Book (PDF)",
  PDF_FILENAME: "Practical-Guide-to-AI-for-Educators.pdf",

  // ---- PRICE --------------------------------------------------------
  // Shown as-is. Change the numbers only — currency symbols are added
  // automatically wherever {{PRICE_INR}} / {{PRICE_USD}} is used.
  PRICE_INR: 349,
  PRICE_INR_WAS: 599,
  PRICE_USD: 7.99,
  PRICE_USD_WAS: 12.99,

  // ---- PAYMENT --------------------------------------------------------
  // REQUIRED BEFORE GOING LIVE: paste your Razorpay Payment Link/Page URL
  // for THIS BOOK below. Do NOT reuse a link from another product.
  // Create one at: https://dashboard.razorpay.com/app/payment-links
  BOOK_PAYMENT_URL: "PASTE_RAZORPAY_PAYMENT_LINK_HERE",

  // Where Razorpay should send the customer after a successful payment.
  // Set this exact URL as the "Redirect URL" / "Success URL" in your
  // Razorpay Payment Link settings.
  SUCCESS_URL: "success.html",

  // ---- CONTACT --------------------------------------------------------
  // CONFIRM: your live site currently shows +91 96024 04311 (ends 04311)
  // while this was supplied as +91 96024 05311 (ends 05311). Fix below.
  WHATSAPP_NUMBER: "919602405311",
  WHATSAPP_MESSAGE: "Hello VS Sir, I would like to know more about the Practical Guide to AI for Educators.",
  EMAIL: "vcakota20@gmail.com",

  // ---- SOCIAL --------------------------------------------------------
  YOUTUBE_URL: "https://youtube.com/@vcakota",
  INSTAGRAM_URL: "https://www.instagram.com/vs_sirphysics",
  FACEBOOK_URL: "https://www.facebook.com/share/14nsLmDma3V/",

  // ---- SITE --------------------------------------------------------
  SITE_URL: "https://vcakota20-web.github.io/ai-mastery-with-vs-sir/ai-educators-book/",
  HOME_SITE_URL: "https://vcakota20-web.github.io/ai-mastery-with-vs-sir/",
};

/* ---------------------------------------------------------------------
   Auto-wiring — do not edit below this line.
   Populates every element tagged with data-cfg / data-cfg-href /
   data-cfg-whatsapp across all pages from the values above.
   --------------------------------------------------------------------- */
(function () {
  function waLink(extra) {
    const msg = encodeURIComponent(SITE_CONFIG.WHATSAPP_MESSAGE + (extra || ""));
    return `https://wa.me/${SITE_CONFIG.WHATSAPP_NUMBER}?text=${msg}`;
  }

  function applyConfig() {
    document.querySelectorAll("[data-cfg]").forEach((el) => {
      const key = el.getAttribute("data-cfg");
      if (key === "PRICE_INR") el.textContent = "₹" + SITE_CONFIG.PRICE_INR;
      else if (key === "PRICE_INR_WAS") el.textContent = "₹" + SITE_CONFIG.PRICE_INR_WAS;
      else if (key === "PRICE_USD") el.textContent = "$" + SITE_CONFIG.PRICE_USD;
      else if (key === "PRICE_USD_WAS") el.textContent = "$" + SITE_CONFIG.PRICE_USD_WAS;
      else if (SITE_CONFIG[key] !== undefined) el.textContent = SITE_CONFIG[key];
    });

    document.querySelectorAll("[data-cfg-href]").forEach((el) => {
      const key = el.getAttribute("data-cfg-href");
      if (key === "BOOK_PAYMENT_URL") el.setAttribute("href", SITE_CONFIG.BOOK_PAYMENT_URL);
      else if (key === "EMAIL") el.setAttribute("href", "mailto:" + SITE_CONFIG.EMAIL);
      else if (SITE_CONFIG[key] !== undefined) el.setAttribute("href", SITE_CONFIG[key]);
    });

    document.querySelectorAll("[data-cfg-whatsapp]").forEach((el) => {
      const extra = el.getAttribute("data-cfg-whatsapp") || "";
      el.setAttribute("href", waLink(extra ? " " + extra : ""));
    });

    // Warn visibly (console only) if payment link hasn't been set yet.
    if (SITE_CONFIG.BOOK_PAYMENT_URL.indexOf("PASTE_") === 0) {
      console.warn("[SITE_CONFIG] BOOK_PAYMENT_URL is still a placeholder — set your real Razorpay link in config.js before going live.");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyConfig);
  } else {
    applyConfig();
  }
})();
