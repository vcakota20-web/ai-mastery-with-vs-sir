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
  if (window.gtag) { window.gtag("event", name, params || {}); }
  else { console.log("[track]", name, params || {}); }
}
(function loadAnalytics() {
  const id = SITE_CONFIG.GA_MEASUREMENT_ID;
  if (!id) return;
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + id;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", id);
})();

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
    document.querySelectorAll('[data-cfg-href="BOOK_PAYMENT_URL"]').forEach((el) => {
      el.addEventListener("click", () => trackEvent("razorpay_click", { book: SITE_CONFIG.BOOK_TITLE }));
    });
    document.querySelectorAll("[data-cfg-whatsapp]").forEach((el) => {
      el.addEventListener("click", () => trackEvent("whatsapp_click", { book: SITE_CONFIG.BOOK_TITLE }));
    });
    if (document.body.dataset.page === "success") {
      trackEvent("purchase_thankyou_view", { book: SITE_CONFIG.BOOK_TITLE });
    } else {
      trackEvent("sales_page_view", { book: SITE_CONFIG.BOOK_TITLE });
    }
    initPayPal();
  }

  function initPayPal() {
    const mount = document.getElementById("paypal-button-container");
    const fallback = document.getElementById("paypal-fallback");
    if (!mount) return;
    const clientId = SITE_CONFIG.PAYPAL_CLIENT_ID;
    if (!clientId || clientId.indexOf("PASTE_") === 0) {
      mount.style.display = "none";
      if (fallback) fallback.style.display = "block";
      return;
    }
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=${encodeURIComponent(SITE_CONFIG.PAYPAL_CURRENCY)}`;
    script.onload = () => {
      if (!window.paypal) return;
      window.paypal.Buttons({
        style: { layout: "vertical", color: "gold", shape: "pill", label: "paypal" },
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [{
              description: SITE_CONFIG.BOOK_TITLE,
              amount: { value: String(SITE_CONFIG.PRICE_USD), currency_code: SITE_CONFIG.PAYPAL_CURRENCY }
            }]
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function () {
            trackEvent("paypal_success", { book: SITE_CONFIG.BOOK_TITLE });
            window.location.href = SITE_CONFIG.SUCCESS_URL + "?via=paypal";
          });
        },
        onClick: function () { trackEvent("paypal_click", { book: SITE_CONFIG.BOOK_TITLE }); },
        onError: function (err) {
          console.error("PayPal error:", err);
          alert("Something went wrong with PayPal checkout. Please try again or contact support on WhatsApp.");
        }
      }).render("#paypal-button-container");
    };
    document.head.appendChild(script);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyConfig);
  } else {
    applyConfig();
  }
})();
