/**
 * Supabase Configuration for Bainbridge High School Class of 2006 Website
 * 
 * INSTRUCTIONS:
 * 1. Go to your Supabase Dashboard (https://supabase.com).
 * 2. Navigate to Project Settings -> API.
 * 3. Copy your "Project URL" and paste it into SUPABASE_URL below.
 * 4. Copy your "anon public" API key and paste it into SUPABASE_ANON_KEY below.
 */

window.SUPABASE_URL = "https://qhcfyshuyrdedoxztuwd.supabase.co";
window.SUPABASE_ANON_KEY = "sb_publishable_UPx-qKGJMY4Au09Tgd8jGQ_7OQYkXGw";

/**
 * Returns a Supabase client instance if configured, or null otherwise.
 */
window.getSupabaseClient = function () {
    if (!window.SUPABASE_URL ||
        !window.SUPABASE_ANON_KEY ||
        window.SUPABASE_URL === "YOUR_SUPABASE_URL" ||
        window.SUPABASE_ANON_KEY === "YOUR_SUPABASE_ANON_KEY") {
        return null;
    }

    let errorMessage = null;

    // Validation 1: User placed an API Key in the URL field
    if (window.SUPABASE_URL.startsWith("sb_publishable_") || window.SUPABASE_URL.startsWith("sb_secret_")) {
        errorMessage = "⚠️ <strong>Supabase Configuration Error</strong>: The value in <code>window.SUPABASE_URL</code> is an API Key! You must replace it with your project's <strong>Project URL</strong> (e.g. <code>https://your-project-id.supabase.co</code>) in <code>assets/js/supabase-config.js</code>.";
    }
    // Validation 2: URL is missing protocol
    else if (!window.SUPABASE_URL.startsWith("http://") && !window.SUPABASE_URL.startsWith("https://")) {
        errorMessage = "⚠️ <strong>Supabase Configuration Error</strong>: The <code>window.SUPABASE_URL</code> must start with <code>https://</code>. Found: <code>" + window.SUPABASE_URL + "</code>. Please correct it in <code>assets/js/supabase-config.js</code>.";
    }

    if (errorMessage) {
        console.error("Supabase Config Error:", errorMessage.replace(/<\/?[^>]+(>|$)/g, "")); // strip HTML for console

        // Inject warning banner to the body once DOM is loaded so it is visually obvious
        const injectBanner = () => {
            if (document.getElementById("supabase-config-warning-banner")) return;
            const banner = document.createElement("div");
            banner.id = "supabase-config-warning-banner";
            banner.style.cssText = "background: #f44336; color: white; text-align: center; padding: 15px 20px; font-weight: bold; position: fixed; top: 0; left: 0; width: 100%; z-index: 100000; box-shadow: 0 4px 15px rgba(0,0,0,0.4); font-family: sans-serif; font-size: 14px; line-height: 1.5;";
            banner.innerHTML = errorMessage;
            document.body.appendChild(banner);
            document.body.style.paddingTop = "60px"; // push page content down
        };

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", injectBanner);
        } else {
            injectBanner();
        }
        return null;
    }

    // Security check: Warn user if they exposed a secret key in public client-side code
    if (window.SUPABASE_ANON_KEY.startsWith("sb_secret_")) {
        console.warn("⚠️ SECURITY WARNING: You have set window.SUPABASE_ANON_KEY to a secret key (sb_secret_...). For security, you should use the publishable key (sb_publishable_...) in browser code so database Row Level Security is active and enforced.");
    }

    if (typeof supabase === 'undefined') {
        console.warn("Supabase library not loaded. Make sure to include the CDN script tag in your HTML.");
        return null;
    }

    try {
        return supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
    } catch (error) {
        console.error("Failed to initialize Supabase client:", error);
        return null;
    }
};
