/* =====================================================================
   LEVEL UP AI — SITE SETTINGS
   Edit ONLY the values in this box. Every page reads from this file.
   ===================================================================== */
const SITE_CONFIG = {

  // ---- BOOK ----------------------------------------------------------
  BOOK_TITLE: "LEVEL UP AI: Defeat the Glitch King",
  BOOK_AUTHOR: "Sushma Ma'am",
  // The full book PDF (already uploaded at the root of this repository)
  PDF_FILE: "../LEVEL_UP_AI_Defeat_the_Glitch_King.pdf",
  SAMPLE_FILE: "assets/LEVEL_UP_AI_Free_Sample.pdf",

  // ---- PRICE ---------------------------------------------------------
  PRICE_REGULAR: 99,        // normal price
  PRICE_LAUNCH: 49,         // first-buyer launch offer
  LAUNCH_OFFER_ON: true,    // true = sell at ₹49 · false = sell at ₹99

  // ---- RAZORPAY PAYMENT LINKS (REQUIRED) -------------------------------
  // Create TWO Razorpay Payment Pages/Links for this book and paste them here:
  //   1) ₹49 launch offer   2) ₹99 regular price
  // In each one, set the success / redirect URL to SUCCESS_URL below.
  PAYMENT_URL_LAUNCH: "https://rzp.io/rzp/gsXcZlN",
  PAYMENT_URL_REGULAR: "PASTE_RAZORPAY_99_LINK_HERE",
  SUCCESS_URL: "https://vcakota20-web.github.io/ai-mastery-with-vs-sir/level-up-ai/success.html",

  // ---- CONTACT (please confirm) ---------------------------------------
  WHATSAPP_NUMBER: "919602405311",
  EMAIL: "vcakota20@gmail.com",

  // ---- SITE ----------------------------------------------------------
  SITE_URL: "https://vcakota20-web.github.io/ai-mastery-with-vs-sir/level-up-ai/",
};

/* ---------------------------------------------------------------------
   Auto-wiring — no need to edit below this line.
   --------------------------------------------------------------------- */
(function () {
  const C = SITE_CONFIG;
  const price = C.LAUNCH_OFFER_ON ? C.PRICE_LAUNCH : C.PRICE_REGULAR;
  const payUrl = C.LAUNCH_OFFER_ON ? C.PAYMENT_URL_LAUNCH : C.PAYMENT_URL_REGULAR;
  const linkReady = payUrl && payUrl.indexOf("PASTE_") !== 0;
  const wa = (msg) => `https://wa.me/${C.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  function apply() {
    document.querySelectorAll("[data-price]").forEach(el => el.textContent = "₹" + price);
    document.querySelectorAll("[data-price-regular]").forEach(el => el.textContent = "₹" + C.PRICE_REGULAR);
    document.querySelectorAll("[data-launch-only]").forEach(el => el.style.display = C.LAUNCH_OFFER_ON ? "" : "none");
    document.querySelectorAll("[data-buy]").forEach(el => {
      el.href = linkReady ? payUrl : wa(`Hello! I want to buy the e-book "${C.BOOK_TITLE}" for ₹${price}.`);
      el.target = "_blank"; el.rel = "noopener";
    });
    document.querySelectorAll("[data-pdf]").forEach(el => el.href = C.PDF_FILE);
    document.querySelectorAll("[data-sample]").forEach(el => el.href = C.SAMPLE_FILE);
    document.querySelectorAll("[data-wa]").forEach(el => { el.href = wa(el.getAttribute("data-wa") || "Hello! I have a question about LEVEL UP AI."); el.target = "_blank"; });
    document.querySelectorAll("[data-email]").forEach(el => { el.href = "mailto:" + C.EMAIL; if (!el.textContent.trim()) el.textContent = C.EMAIL; });
    document.querySelectorAll("[data-wa-text]").forEach(el => el.textContent = "+" + C.WHATSAPP_NUMBER.replace(/^(\d{2})(\d{5})(\d{5})$/, "$1 $2 $3"));
    if (!linkReady) console.warn("[config.js] Razorpay link not set yet — Buy buttons open WhatsApp instead.");
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", apply); else apply();
})();
