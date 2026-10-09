/* =====================================================================
   CBSE Physics Score Guide Class 12 — SITE SETTINGS  (edit ONLY the values in this box)
   ===================================================================== */
const SITE_CONFIG = {
  BOOK_TITLE: "CBSE Physics Score Guide – Class 12 (2026-27)",
  PRICE_REGULAR: 399,      // normal price (shown struck-through)
  PRICE_LAUNCH: 299,       // launch price (first buyers)
  LAUNCH_OFFER_ON: true,

  // ---- RAZORPAY PAYMENT PAGES ----------------------------------------
  // Paste the Razorpay Payment Page link for each option.
  // Redirect after payment:  EN -> success-en-c9a3e61b7d42.html
  PAY_EN:   "https://rzp.io/rzp/L2LjddoK",

  WHATSAPP_NUMBER: "919602405311",
  EMAIL: "vcakota20@gmail.com",
  SITE_URL: "https://vcakota20-web.github.io/ai-mastery-with-vs-sir/cbse-physics-class12/",
};

/* Auto-wiring — no need to edit below this line. */
(function () {
  const C = SITE_CONFIG;
  const price = C.LAUNCH_OFFER_ON ? C.PRICE_LAUNCH : C.PRICE_REGULAR;
  const wa = (m) => `https://wa.me/${C.WHATSAPP_NUMBER}?text=${encodeURIComponent(m)}`;
  const ready = (u) => u && u.indexOf("PASTE_") !== 0;
  const LBL = { en: "English edition", hi: "Hindi edition", both: "English + Hindi" };
  function apply() {
    document.querySelectorAll("[data-price]").forEach(el => el.textContent = "₹" + price);
    document.querySelectorAll("[data-price-both]").forEach(el => el.textContent = "₹" + C.PRICE_BOTH);
    document.querySelectorAll("[data-price-regular]").forEach(el => el.textContent = "₹" + C.PRICE_REGULAR);
    document.querySelectorAll("[data-price-both-regular]").forEach(el => el.textContent = "₹" + (2 * C.PRICE_REGULAR));
    document.querySelectorAll("[data-launch-only]").forEach(el => el.style.display = C.LAUNCH_OFFER_ON ? "" : "none");
    document.querySelectorAll("[data-buy]").forEach(el => {
      const k = el.getAttribute("data-buy") || "en";
      const url = { en: C.PAY_EN, hi: C.PAY_HI, both: C.PAY_BOTH }[k];
      const amt = k === "both" ? C.PRICE_BOTH : price;
      el.href = ready(url) ? url : wa(`Hello! I want to buy "${C.BOOK_TITLE}" – ${LBL[k]} for ₹${amt}.`);
      el.target = "_blank"; el.rel = "noopener";
      el.addEventListener("click", () => { if (window.fbq) fbq("track", "InitiateCheckout", { value: amt, currency: "INR", content_name: C.BOOK_TITLE + " – " + LBL[k] }); });
    });
    document.querySelectorAll("[data-wa]").forEach(el => { el.href = wa(el.getAttribute("data-wa") || ("Hello! I have a question about " + C.BOOK_TITLE)); el.target = "_blank"; });
    document.querySelectorAll("[data-email]").forEach(el => { el.href = "mailto:" + C.EMAIL; if (!el.textContent.trim()) el.textContent = C.EMAIL; });
    document.querySelectorAll("[data-wa-text]").forEach(el => el.textContent = "+91 96024 05311");
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", apply); else apply();
})();
