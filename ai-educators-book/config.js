const SITE_CONFIG = {
  BOOK_TITLE: "Practical Guide to AI for Educators",
  BOOK_AUTHOR: "VS Sir (Vijay Kumar Sharma)",
  BOOK_FORMAT: "Digital E-Book (PDF)",
  PDF_FILENAME: "Practical-Guide-to-AI-for-Educators.pdf",
  PRICE_INR: 349,
  PRICE_INR_WAS: 599,
  PRICE_USD: 7.99,
  PRICE_USD_WAS: 12.99,
  BOOK_PAYMENT_URL: "https://rzp.io/rzp/rsxAyDk",
  SUCCESS_URL: "success.html",
  PAYPAL_CLIENT_ID: "PASTE_PAYPAL_CLIENT_ID_HERE",
  PAYPAL_CURRENCY: "USD",
  WHATSAPP_NUMBER: "919602405311",
  WHATSAPP_MESSAGE: "Hello VS Sir, I would like to know more about the Practical Guide to AI for Educators.",
  EMAIL: "vcakota20@gmail.com",
  YOUTUBE_URL: "https://youtube.com/@vcakota",
  INSTAGRAM_URL: "https://www.instagram.com/vs_sirphysics",
  FACEBOOK_URL: "https://www.facebook.com/share/14nsLmDma3V/",
  SITE_URL: "https://vcakota20-web.github.io/ai-mastery-with-vs-sir/ai-educators-book/",
  HOME_SITE_URL: "https://vcakota20-web.github.io/ai-mastery-with-vs-sir/",
  GA_MEASUREMENT_ID: "",
};

function trackEvent(name, params) {
  try { if (window.gtag) { window.gtag("event", name, params || {}); } else { console.log("[track]", name, params || {}); } } catch(e) {}
}

function applyConfig() {
  try {
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
      const msg = encodeURIComponent(SITE_CONFIG.WHATSAPP_MESSAGE + (extra ? " " + extra : ""));
      el.setAttribute("href", "https://wa.me/" + SITE_CONFIG.WHATSAPP_NUMBER + "?text=" + msg);
    });
  } catch(e) { console.error("Config apply error:", e); }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", applyConfig);
} else {
  applyConfig();
}
