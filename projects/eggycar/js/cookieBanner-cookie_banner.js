var cbCookieName="cookieConsent",bsCookieName="bs",cbCookieBannerStateName="cookieBannerState";let customHash=window.location.hash;var CookieDate=new Date,cbExpiration=(CookieDate.setFullYear(CookieDate.getFullYear()+1),CookieDate.toUTCString()),nonEssentialLocalStorageKeys=["playlistRated","gifRated","photoRated","streamRated","search","searches","ISP_INFO_SEND","newTermSearched","recentSearch","currentTimeStamp","watchedVideoStorage","favoritesRedirect","promoBannerPersistant","eta_guid","ALIAS_premiumPromoBanner","pwaInstallPrompt","commentsRated"],essentialLocalStorageKeys=["LsAccessSuccess","enableStorage","phLivePlayerQuality","commentsReported","dataProductID","trialBottomNotificationHidden","notLoggedIn","savedData","videoOffset","mgp_player","cookieNamesList","storage_test","__storage_test__"],cbCookie=document.cookie.replace(new RegExp("(?:(?:^|.*;\\s*)"+cbCookieName+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"),cbCookieBannerState=document.cookie.replace(new RegExp("(?:(?:^|.*;\\s*)"+cbCookieBannerStateName+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"),linkToPrivacyPolicy="https://www.pornhub.com/information/privacy#cookies",cbTexts={primaryCTA:"Accept all cookies",secondaryCTA:"Accept only essential cookies",thirdCTA:"Customize Cookies",shortBannerText:"Some features may not be available with your selection. For a better browsing experience, you may select"};let shouldLogGTMImpression=!1;var CookieHelper={listCookiesArrayFromString:e=>e.split("; ").map(e=>e.split("=")[0]),deleteCookie:e=>{document.cookie=e+"=0;expires=Thu, 01 Jan 1970 00:00:01 GMT",document.cookie=e+"=0;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain="+cbDomainName},deleteNonEssentialCookies:e=>{var o=[];(o=allowedCookies.length?e.filter(e=>!(allowedCookies.includes(e)||e.startsWith("comp_")||e.startsWith("emailConfirmCookie_")||e.startsWith("playlistShuffle_")&&allowedCookies.includes("playlistShuffle_*")||e.startsWith("fg_")&&allowedCookies.includes("fg_*"))):o).forEach(e=>{"undefined"!=typeof cookieStore&&void 0!==cookieStore.delete&&cookieStore.delete(e),document.cookie=e+"=0;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/",document.cookie=e+"=0;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain="+cbDomainName})},deleteNonEssentialsLocalStorageKeys:()=>{let n=[];nonEssentialLocalStorageKeys.forEach(e=>{e.includes("ALIAS_")&&n.push(e.replace("ALIAS_",""))}),"undefined"!=typeof localStorage&&(nonEssentialLocalStorageKeys.forEach(e=>{localStorage.removeItem(e)}),n.length)&&Object.keys(localStorage).filter(o=>!CookieHelper.isEssentialLSKey(o)&&n.some(e=>o.includes(e))).forEach(e=>{localStorage.removeItem(e)}),"undefined"!=typeof sessionStorage&&(nonEssentialLocalStorageKeys.forEach(e=>{sessionStorage.removeItem(e)}),n.length)&&Object.keys(sessionStorage).filter(o=>!CookieHelper.isEssentialLSKey(o)&&n.some(e=>o.includes(e))).forEach(e=>{sessionStorage.removeItem(e)})},isEssentialLSKey:e=>{var o=e.includes("playlist_shuffle_"),n=e.includes("comp_");return essentialLocalStorageKeys.includes(e)||o||n},isNonEssentialLSKey:e=>nonEssentialLocalStorageKeys.includes(e),isInEssentialList:e=>essentialCookiesList.includes(e),canAdd:e=>0==allowedCookies.length||allowedCookies.includes(e)||e.startsWith("comp_")||e.startsWith("emailConfirmCookie_")||e.startsWith("playlistShuffle_")&&allowedCookies.includes("playlistShuffle_*")||e.startsWith("fg_")&&allowedCookies.includes("fg_*"),getCurrentConsent:()=>document.cookie.replace(new RegExp("(?:(?:^|.*;\\s*)"+cbCookieName+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"),isAllowedCategory:o=>{let e=document.cookie.replace(new RegExp("(?:(?:^|.*;\\s*)"+cbCookieName+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1");return(e=isGlobalCookieBanner&&cbConsent&&(void 0!==e||"1"===e||""===e)?cbConsent:e)==cookieConsentValues.all||Object.values(Object.keys(cookieConsentValues).filter(function(e){return-1!=e.indexOf(o)}).reduce(function(e,o){return e[o]=cookieConsentValues[o],e},{})).includes(Number(e))}},initializedLangSelector=(!isGlobalCookieBanner&&""==cbCookie||"1"==cbCookie||"#cookie-banner"===customHash||"#cookie-banner-expand"===customHash?(showFullCookieBanner(),shouldLogGTMImpression=!0):isGlobalCookieBanner||"2"!=cbCookie||"1"===cbCookieBannerState||showShortCookieBanner(),!1),initialCookieBannerHeight=0;function showFullCookieBanner(){if(isGlobalCookieBanner)void 0!==globalCookieBanner&&globalCookieBanner.showBanner();else{var t=document.getElementById("cookieBanner"),i=(t&&t.classList.contains("cbShort")&&(t.classList.remove("cbShort"),t.innerHTML=""),t||((o=document.createElement("div")).id="cookieBanner",document.body&&document.body.appendChild(o)),t&&t.classList.add("withOverlay"),document.createElement("div")),o=(i.id="cookieBannerWrapper",document.createElement("div")),a=(o.id="cookieBannerContent","undefined"!=typeof biggerCookieBannerTemplate&&(o.innerHTML=biggerCookieBannerTemplate,"undefined"==typeof isPlatformMobile||isPlatformMobile||o.classList.add("cookieBannerV1")),document.createElement("button")),r=(a.classList.add("cbPrimaryCTA","cbButton","gtm-event-cookie-banner"),a.textContent=("undefined"!=typeof Banner_Text&&Banner_Text.primaryCTA?Banner_Text:cbTexts).primaryCTA,a.dataset.event="cookie_banner",a.dataset.label="accept_all",a.addEventListener("click",function(){document.cookie=cbCookieName+"=3; expires="+cbExpiration+";domain="+cbDomainName+";secure;path=/",cookieConsentUserChoice("granted"),t.className="",t.innerHTML="",initializedLangSelector=!1,addClogCookieBanner(currentDomain,"accept-all",originPart,originUrl),logUserConsentCookie(3),mainInterval.unsubscribe(cookieChangeCallbackName),"#cookie-banner-expand"===customHash&&history.pushState("",document.title,window.location.pathname+window.location.search)}),document.createElement("button"));r.classList.add("cbSecondaryCTA","cbButton","gtm-event-cookie-banner"),r.textContent=("undefined"!=typeof Banner_Text&&Banner_Text.secondaryCTA?Banner_Text:cbTexts).secondaryCTA,r.dataset.event="cookie_banner",r.dataset.label="accept_essential",r.addEventListener("click",function(){document.cookie=cbCookieName+"=2; expires="+cbExpiration+";domain="+cbDomainName+";secure;path=/",cookieConsentUserChoice("denied"),t.classList.contains("withOverlay")&&t.classList.remove("withOverlay"),i.remove(),showShortCookieBanner(),clearNonEssentialCookies(),CookieHelper.deleteNonEssentialsLocalStorageKeys(),"#cookie-banner-expand"===customHash&&history.pushState("",document.title,window.location.pathname+window.location.search),location.reload(),addClogCookieBanner(currentDomain,"accept-essential",originPart,originUrl),logUserConsentCookie(2)});let e=null;(e=document.createElement("button")).classList.add("cbThirdCTA","cbButton","gtm-event-cookie-banner"),e.textContent=("undefined"!=typeof Banner_Text&&Banner_Text.thirdCTA?Banner_Text:cbTexts).thirdCTA,e.dataset.event="cookie_banner",e.dataset.label="customize",e.addEventListener("click",function(n){var e=this,n=n?n.target:null;if(n&&n.classList.contains("saveChangesBtn")){n={functional:document.getElementById("functionalCookies"),analytics:document.getElementById("analyticsCookies"),advertising:document.getElementById("advertisingCookies")},n={functional:n.functional.checked?Number(n.functional.value):0,analytics:n.analytics.checked?Number(n.analytics.value):0,advertising:n.advertising.checked?Number(n.advertising.value):0};let e=n.functional&&n.analytics&&n.advertising?3:2+n.functional+n.analytics+n.advertising,o;document.cookie=cbCookieName+"="+e+"; expires="+cbExpiration+";domain="+cbDomainName+";secure;path=/",n.analytics&&cookieConsentUserChoice("granted"),logGTMEvent(n),2===e?(t.classList.contains("withOverlay")&&t.classList.remove("withOverlay"),i.remove(),showShortCookieBanner(),clearNonEssentialCookies(),CookieHelper.deleteNonEssentialsLocalStorageKeys()):(o=document.getElementById("cookieBanner"))&&(o.className="",o.innerHTML=""),"#cookie-banner-expand"===customHash&&history.pushState("",document.title,window.location.pathname+window.location.search),location.reload(),logUserConsentCookie(e),addClogCookieBanner(currentDomain,"save-cookie-pref",originPart,originUrl),void(initializedLangSelector=!1)}else e.removeAttribute("data-event"),e.removeAttribute("data-label"),MG_Utils.removeClass(e,"gtm-event-cookie-banner"),expandCustomizedOptions(e,a,r)}),i.appendChild(o),i.appendChild(a),i.appendChild(r),e&&i.appendChild(e),"undefined"!=typeof isPlatformMobile&&isPlatformMobile&&i.classList.add("mobileCCBanner"),t&&t.appendChild(i),addStyling(),t&&t.appendChild(i),document.body?(addStyling(),t&&t.appendChild(i)):window.addEventListener("DOMContentLoaded",e=>{addStyling(),t&&t.appendChild(i)}),document.addEventListener("click",function(e){var o=e?e.target:null;if(o&&MG_Utils.hasClass(o,"showPrivacyPolicy"))e.stopImmediatePropagation(),showPrivacyPolicy(o);else if(o&&"cookieBanner"===o.id){let e=document.querySelector(".cbPrimaryCTA"),o=document.querySelector(".cbSecondaryCTA"),n=document.querySelector(".cbThirdCTA ");e&&MG_Utils.addClass(e,"focus"),o&&MG_Utils.addClass(o,"focus"),n&&MG_Utils.addClass(n,"focus"),setTimeout(function(){e&&MG_Utils.removeClass(e,"focus"),o&&MG_Utils.removeClass(o,"focus"),n&&MG_Utils.removeClass(n,"focus")},100)}else o&&MG_Utils.hasClass(o,"expandableTitle")&&(e.stopImmediatePropagation(),expandCustomizeDetail(o))}),""===CookieHelper.getCurrentConsent()&&(document.cookie=cbCookieName+"=1; expires="+cbExpiration+"; domain="+cbDomainName+"; secure;path=/"),document.cookie=cbCookieBannerStateName+"=0;expires=Thu, 01 Jan 1970 00:00:01 GMT",document.cookie=cbCookieBannerStateName+"=0;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain="+cbDomainName,"3"!==cbCookie&&(clearNonEssentialCookies(),CookieHelper.deleteNonEssentialsLocalStorageKeys()),setTimeout(()=>{"#cookie-banner-expand"===customHash&&t&&expandCustomizedOptions(e,a,r)},0),!initializedLangSelector&&t&&(bannerChangeLanguage(),initializedLangSelector=!0),window.addEventListener("resize",e=>{var o=document.getElementById("cookieBannerWrapper");o&&(o.style.removeProperty("height"),initialCookieBannerHeight=o.clientHeight)})}}function bannerChangeLanguage(){let e=document.getElementById("cookieBanner"),o=e.querySelector("#changeLegalTextLang"),n=e.querySelector("#langNameSpan");o&&o.addEventListener("change",function(e){var o=this.selectedOptions[0];n&&(n.innerHTML=o.text),MG_Utils.setCookie("legalTextLangId",parseInt(o.value)),window.location.reload()}.bind(o))}function expandCustomizeDetail(e){var n=null!=e.parentElement?e.parentElement:"",e=n?n.clientHeight:0,o=n?n.querySelector(".title span"):"",t=document.querySelectorAll(".customizeMainContent .expandableSection.expanded"),i=!1,a=document.getElementById("cookieBannerWrapper");n&&(Array.prototype.slice.call(t).forEach(function(e){var o=e.querySelector(".title span");n==e&&(i=!0),MG_Utils.removeClass(e,"expanded"),o&&(MG_Utils.removeClass(o,"ph-icon-chevron-up"),MG_Utils.addClass(o,"ph-icon-chevron-down"))}),i||(MG_Utils.toggleClass(n,"expanded"),o&&MG_Utils.hasClass(n,"expanded")&&(MG_Utils.addClass(o,"ph-icon-chevron-up"),MG_Utils.removeClass(o,"ph-icon-chevron-down"))),t=n.clientHeight-e,document.querySelector(".customizeMainContent .expandableSection.expanded")&&a?(initialCookieBannerHeight=initialCookieBannerHeight||a.clientHeight,a.style.height=initialCookieBannerHeight+Math.abs(t)+"px",MG_Utils.addClass(a,"optionExpanded")):!document.querySelector(".customizeMainContent .expandableSection.expanded")&&a&&(MG_Utils.removeClass(a,"optionExpanded"),a.style.removeProperty("height")))}function expandCustomizedOptions(e,o,n){let t=document.getElementById("cookieBannerContent"),i=document.getElementById("cookieBannerWrapper");var a;i.classList.add("extended"),e.classList.add("saveChangesBtn"),o.classList.add("rightAlignBtn"),n.classList.add("rightAlignBtn"),e.textContent=("undefined"!=typeof Banner_Text&&Banner_Text.thirdCTASaveText?Banner_Text:cbTexts).thirdCTASaveText,"undefined"!=typeof customizeCookiesTemplate&&(t&&(t.innerHTML=customizeCookiesTemplate),a=document.querySelector(".backToscrollableContent"))&&a.addEventListener("click",function(){this&&this.classList.contains("backToscrollableContent")&&(e.textContent=("undefined"!=typeof Banner_Text&&Banner_Text.thirdCTA?Banner_Text:cbTexts).thirdCTA,e.classList.remove("saveChangesBtn"),e.dataset.event="cookie_banner",e.dataset.label="customize",e.classList.add("gtm-event-cookie-banner"),o.classList.remove("rightAlignBtn"),n.classList.remove("rightAlignBtn"),i.classList.remove("extended","optionExpanded"),i.style.removeProperty("height"),"undefined"!=typeof biggerCookieBannerTemplate&&(t.innerHTML=biggerCookieBannerTemplate,bannerChangeLanguage()),addClogCookieBanner(currentDomain,"customize-back",originPart,originUrl))});let r=document.getElementById("functionalCookies"),l=document.getElementById("analyticsCookies"),s=document.getElementById("advertisingCookies");r&&(r.checked=!![3,10,26,42].includes(Number(CookieHelper.getCurrentConsent()))),l&&(l.checked=!![3,18,26,50].includes(Number(CookieHelper.getCurrentConsent()))),s&&(s.checked=!![3,34,42,50].includes(Number(CookieHelper.getCurrentConsent()))),r&&r.addEventListener("change",()=>{var e=r.checked?"functional-cookies-enabled":"functional-cookies-disabled";addClogCookieBanner(currentDomain,e,originPart,originUrl)}),l&&l.addEventListener("change",()=>{var e=l.checked?"analytics-cookies-enabled":"analytics-cookies-disabled";addClogCookieBanner(currentDomain,e,originPart,originUrl)}),s&&s.addEventListener("change",()=>{var e=s.checked?"target-adv-cookies-enabled":"target-adv-cookies-disabled";addClogCookieBanner(currentDomain,e,originPart,originUrl)}),addClogCookieBanner(currentDomain,"customize-cookies",originPart,originUrl),initialCookieBannerHeight=i.clientHeight}function showPrivacyPolicy(e){let o=document.querySelector(".scrollableBannerContent"),n=document.getElementById("privacyPolicyContent"),t=document.getElementById("cookieBannerWrapper"),i="undefined"!=typeof isPlatformMobile&&isPlatformMobile?180:158,a=e?e.querySelector("span"):"";n&&MG_Utils.hasClass(n,"displayNone")?(o&&t&&(t.classList.add("extended"),o.style.height=t.clientHeight-i+"px",MG_Utils.addClass(o,"scrollEnabled"),a)&&(MG_Utils.addClass(a,"ph-icon-chevron-up"),MG_Utils.removeClass(a,"ph-icon-chevron-down")),MG_Utils.removeClass(n,"displayNone"),setTimeout(()=>{n.scrollIntoView({behavior:"smooth"})},0)):n&&(o&&(o.style.height="auto"),o&&MG_Utils.removeClass(o,"scrollEnabled"),t&&t.classList.remove("extended"),MG_Utils.addClass(n,"displayNone"),a)&&(MG_Utils.removeClass(a,"ph-icon-chevron-up"),MG_Utils.addClass(a,"ph-icon-chevron-down"))}function showShortCookieBanner(){var o,n,e,t,i,a;isGlobalCookieBanner||((o=document.getElementById("cookieBanner"))&&o.classList.add("cbShort"),(n=document.createElement("p")).innerHTML=("undefined"!=typeof Banner_Text&&Banner_Text.shortBannerText?Banner_Text:cbTexts).shortBannerText,e=document.createElement("span"),t=("undefined"!=typeof Banner_Text&&Banner_Text.primaryCTA?Banner_Text:cbTexts).primaryCTA,i="undefined"!=typeof isPlatformMobile&&isPlatformMobile,e.classList.add("cbPrimaryCTA","cbSpan","gtm-event-cookie-banner"),i&&e.classList.add("cbPrimaryCTA","mobileLink"),e.textContent=" '"+t+"' ",e.dataset.event="cookie_banner",e.dataset.label="essential_accept_all",e.addEventListener("click",function(){document.cookie=cbCookieName+"=3; expires="+cbExpiration+"; domain="+cbDomainName+";secure;path=/",document.cookie=cbCookieBannerStateName+"=0;expires=Thu, 01 Jan 1970 00:00:01 GMT",cookieConsentUserChoice("granted"),o.className="",o.innerHTML="",addClogCookieBanner(currentDomain,"accept-all",originPart,originUrl),logUserConsentCookie(3),mainInterval.unsubscribe(cookieChangeCallbackName)}),(a=document.createElement("button")).classList.add("cbCloseButton","ph-icon-cross"),a.setAttribute("title","close"),a.addEventListener("click",function(){addClogCookieBanner(currentDomain,"consent-modal-close",originPart,originUrl,"button-close"),document.cookie=cbCookieBannerStateName+"=1; expires="+cbExpiration+"; domain="+cbDomainName+";secure;path=/",cookieConsentUserChoice("denied"),o.className="",o.innerHTML=""}),n.appendChild(e),document.body?(addStyling(),o&&o.appendChild(n),o&&o.appendChild(a)):window.addEventListener("DOMContentLoaded",e=>{addStyling(),o&&o.appendChild(n),o&&o.appendChild(a)}),"undefined"!=typeof isPremiumDomainBanner&&isPremiumDomainBanner&&"undefined"!=typeof isPlatformMobile&&isPlatformMobile&&adjustShortBannerPosition(),clearNonEssentialCookies(),CookieHelper.deleteNonEssentialsLocalStorageKeys(),initializedLangSelector=!1)}function adjustShortBannerPosition(){let o=0,n=document.getElementById("cookieBanner");"undefined"!=typeof MG_Utils&&document.addEventListener("scroll",MG_Utils.debounce(function(){var e=window.pageYOffset||document.documentElement.scrollTop;e>o?n&&(n.style.bottom="0"):n&&(n.style.bottom="70px"),o=e<=0?0:e},!1))}function logGTMEvent(e){let o="";e&&(o=e.analytics&&e.advertising&&e.functional?"customize_func_an_ad":e.analytics&&e.advertising?"customize_an_ad":e.analytics&&e.functional?"customize_func_an":e.advertising&&e.functional?"customize_func_ad":e.analytics?"customize_an":e.advertising?"customize_ad":e.functional?"customize_func":"customize_none",window.dataLayer.push({event:"cookie_banner",event_label:o}))}function logUserConsentCookie(e){"undefined"!=typeof isLoggedInUser&&isLoggedInUser?"undefined"!=typeof MG_Utils&&"undefined"!=typeof logCookieConsentUrl&&"undefined"!=typeof token&&MG_Utils.ajaxCall({url:logCookieConsentUrl,type:"GET",headers:"undefined"!=typeof liuIdOrNull&&liuIdOrNull?{__m:liuIdOrNull}:{},data:{token:token,cookie_selection:e,site_id:1}}):isPremiumDomainBanner&&MG_Utils.ajaxCall({url:logCookieConsentUrlPremium,type:"GET",data:{cookie_selection:e}})}function cookieConsentUserChoice(e="denied"){return dispatchEvent(new CustomEvent("cookieConsentUpdated",{detail:{consent:CookieHelper.getCurrentConsent()}})),"undefined"!=typeof gtag&&gtag("consent","update",{ad_storage:e,analytics_storage:e}),e}function triggerGA4Event(e,o,n,t){e={event:e};n&&(e.origin=n),o&&(e.origin_url=o),t&&(e.origin_item_id=t),window.dataLayer.push(e)}function addClogCookieBanner(e,o,n,t,i){var a=i?"&origin_item_id="+i:"",r=t?"&origin_url="+encodeURIComponent(t):"",l=t?"&origin="+n:"",s=setInterval(function(){"undefined"!=typeof MG_Utils&&(MG_Utils.ajaxCall({url:e+"/_i?type=event&event="+o+l+r+a,type:"POST",headers:"undefined"!=typeof liuIdOrNull&&liuIdOrNull?{__m:liuIdOrNull}:{}}),triggerGA4Event(o,t,n,i),clearInterval(s))},200)}function addStyling(){var o;document.getElementById("cookieBannerStyle")||((o=document.createElement("style")).id="cookieBannerStyle",o.innerHTML=`
    #cookieBanner.cbShort {
        background-color: rgba(15, 15, 15, 0.95);
        border-radius: 5px;
        padding: 1em;
        width: 90%;
        position: fixed;
        bottom: 0;
        margin: 5px auto;
        color: #c6c6c6;
        z-index: 100;
        text-align: center;
        left: 50%;
        transform: translate(-50%, 0);
        font-size: 14px;
    }
    #cookieBanner.withOverlay {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: transparent;
        z-index: 200;
    }
    #cookieBanner.hidden{
        display:none;
    }
    #cookieBannerWrapper {
        background-color: rgba(15, 15, 15, 0.95);
        border-radius: 10px 10px 0 0;
        padding: 1.5em;
        width: 100%;
        position: fixed;
        bottom: 0;
        margin: 5px auto 0;
        color: #c6c6c6;
        z-index: 100;
        text-align: center;
        left: 50%;
        transform: translate(-50%, 0);
        font-size: 14px;
        box-sizing: border-box;
    }

    #cookieBannerWrapper.extended:not(.mobileCCBanner) {
        height: 648px;
    }

    #cookieBannerWrapper.mobileCCBanner.extended {
        height: 546px;
        overflow-y: scroll;

        @media screen and (min-width: 1000px) and (orientation: landscape) {
            height: 466px;
        }
    }

    #cookieBannerContent {
        width: 770px;
        margin: auto;
    }

    #cookieBannerContent.cookieBannerV1 {
        width: 668px;
    }

    .scrollableBannerContent {
        margin-bottom: 20px;
        transition: height 0.5s ease;
        height:auto;
        overflow-y: hidden;
    }

    .scrollEnabled {
        overflow-y: scroll;
    }

    .scrollEnabled::-webkit-scrollbar {
        width: 6px;
    }

    .scrollEnabled::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px #222;
        border-radius: 10px;
    }

    .scrollEnabled::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: #2F2F2F;
    }

    .phLogo {
        width: 106px;
        margin: 0 auto 15px;
    }

    #cookieBanner h1,
    #cookieBanner .heading1,
    #cookieBanner h2 {
        font-size: 26px;
        line-height: 32px;
        font-weight: bold;
        color: #fff;
        margin-bottom: 10px;
    }

    #cookieBanner .heading1, #cookieBanner h2 {
        background-color: initial;
        line-height: initial;
        padding: 0;
        text-transform: capitalize;
    }

    #cookieBanner h3 {
        color: #fff;
        margin-bottom: 15px;
        background: none;
        text-transform: none;
        font-size: 21px;
        font-weight: 400;
        padding: 0;
    }

    #cookieBanner p, #cookieBanner ul {
        color: #fff;
        font-size: 14px;
        line-height: 20px;
        text-align: left;
    }

    #cookieBanner .expandableSection {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    #cookieBanner .expandableSection .title span {
        color: #FF9000;
        margin-right: 15px;
        pointer-events: none;
    }

    #cookieBanner .expandableSection p {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        max-height: 82px;
    }

    #cookieBanner .expandableSection.expanded p {
        -webkit-line-clamp: initial;
        overflow-y: scroll;
    }

    #cookieBanner .expandableSection.expanded p::-webkit-scrollbar {
        width: 6px;
    }

    #cookieBanner .expandableSection.expanded p::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px #222;
        border-radius: 10px;
    }

    #cookieBanner .expandableSection.expanded p::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: #2F2F2F;
    }

    #cookieBanner .policyItalic {
        font-style: italic;
    }

    #cookieBanner .policyBold {
        font-weight: bold;
    }

    #cookieBanner ul li {
        list-style-position: inside;
        list-style-type: disc;
    }

    #cookieBanner a {
        color: #FF9000;
        cursor: pointer;
    }

    #cookieBanner .learnMoreContent {
        color: white;
        text-align: left;
    }

    #cookieBanner .learnMoreContent a {
        color: #FF9000;
        text-decoration: none;
    }

    #cookieBanner .learnMoreContent a:hover {
        text-decoration: none;
    }

    .showPrivacyPolicy {
        font-weight: bold;
        font-size: 16px;
        line-height: 22px;
        text-align: left;
        display: grid;
        grid-template-columns: 1fr auto;
        padding-right: 6px;
    }

    .showPrivacyPolicy:hover {
        text-decoration: none;
    }

    span.ph-icon-chevron-down, span.ph-icon-chevron-up {
        font-size: 12px;
        line-height: 22px;
        pointer-events: none;
    }

    #privacyPolicyContent {
        margin-top: 15px;
        text-align: left;
    }

    .cbButton {
        margin: 5px;
        min-width: 250px;
        cursor: pointer;
        background-color: black;
        color: white;
        border: 2px solid #FF9000;
        border-radius: 5px;
        padding: 0.72em 1em;
        box-sizing: border-box;
        text-transform: capitalize;
        font-size: 14px;
        font-weight: bold;
    }

    .cbButton:hover,
    .cbButton.focus,
    .cbButton.saveChangesBtn {
        color: black;
        background-color: #FF9000;
    }

    #cookieBanner.cbShort p {
        font-size: 13px;
        margin: 0;
        text-align: center;
        color: #c6c6c6;
    }

    .cbShort .cbSpan {
        cursor: pointer;
        white-space: nowrap;
        text-transform: capitalize;
        margin-left: 4px;
    }

    .cbShort .cbSpan:hover, .cbShort .cbSpan.mobileLink {
        color: #FF9000;
    }

    .cbCloseButton {
        position: absolute;
        top: -10px;
        right: -9px;
        color: #969696;
        cursor: pointer;
        border: none;
        font-size: 12px;
        width: 26px;
        height: 26px;
        background: #333;
        border-radius: 13px;
        padding: 0;
    }

    .scrollableBannerContent {
        table {
            table-layout: fixed;
            margin: 10px 0;
            display: block;
            overflow-x: auto;
            border-collapse: collapse;
            color: #fff;
            text-align: center;

            td, th {
                border: 1px solid #fff;
                padding: 8px;
                vertical-align: top;

                i {
                    display: inline;
                }
            }
        }
    }

    @media screen and (min-width: 401px) and (max-width: 800px) {
        .cbShort cbButton {
            display: block;
            clear: both;
        }
    }

    @media screen and (max-width: 800px) {
        #cookieBannerContent {
            width: 100%;
        }
    }

    .customizeCookiesWrapper {
        text-align: left;
    }

    .backToscrollableContent {
        display: flex;
        cursor: pointer;
        color: #FF9000;
        font-weight: bold;
        margin-bottom: 40px;
        align-items: center;
    }

    .backToscrollableContent .ph-icon-chevron-left {
        position: relative;
        margin-right: 10px;
        margin-left: 10px;
        font-size: 0.7em;
        pointer-events: none;
    }

    .customizeMainContent {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
    }

    .customizeMainContent .column {
        width: 100%;
    }

    .customizeMainContent .title {
        font-size: 16px;
        font-weight: bold;
        color: #fff;
        cursor: pointer;
    }

    .customizeMainContent p {
        margin-top: 12px;
        margin-bottom: 40px;
        width: 100%;
    }

    .customizeMainContent span {
        color: #fff;
    }

    .customizeToggleSwitch {
        position: relative;
        display: inline-block;
        width: 46px;
        height: 28px;
    }

    .customizeToggleSwitch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .customizeToggleSwitch .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #c6c6c6;
        -webkit-transition: .4s;
        transition: .4s;
    }

    .customizeToggleSwitch .slider:before {
        position: absolute;
        content: "";
        height: 24px;
        width: 24px;
        left: 3px;
        bottom: 2px;
        background-color: #fff;
        -webkit-transition: .4s;
        transition: .4s;
    }

    .customizeToggleSwitch  input:checked + .slider {
        background-color: #FF9000;
    }

    .customizeToggleSwitch input:focus + .slider {
        box-shadow: 0 0 1px #FF9000;
    }

    .customizeToggleSwitch input:checked + .slider:before {
        -webkit-transform: translateX(16px);
        -ms-transform: translateX(16px);
        transform: translateX(16px);
    }

    .customizeToggleSwitch .slider.round {
        border-radius: 34px;
    }

    .customizeToggleSwitch .slider.round:before {
        border-radius: 50%;
    }

    .customizeToggleSwitch span {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .customizeToggleSwitch span::before,
    .customizeToggleSwitch span::after {
        position: absolute;
        content: '';
        width: 17px;
        height: 2px;
        top: 13px;
        left: 6px;
        background: #C6C6C6;
        -webkit-transition: left .5s;
        transition: left .5s;
    }

    .customizeToggleSwitch span::before {
        transform: rotate(45deg);
    }

    .customizeToggleSwitch span::after {
        transform: rotate(-45deg);
    }

    .customizeToggleSwitch input[type="checkbox"]:checked ~ div span {
        -webkit-transform: translateX(16px);
        -ms-transform: translateX(16px);
        transform: translateX(16px);
    }

    .customizeToggleSwitch input[type="checkbox"]:checked~ div span::before {
        content: "";
        background-color: transparent;
        position: relative;
        top: 4px;
        left: 11px;
        width: 6px;
        height: 15px;
        border-bottom: 2px solid #FF9000;
        border-right: 2px solid #FF9000;
        transform: rotate(45deg);
    }

    .customizeToggleSwitch input[type="checkbox"]:checked~ div.mobileBtn span::before {
        width: 7px;
        height: 16px;
    }

    .customizeToggleSwitch input[type="checkbox"]:checked ~ div span::after {
        content: "";
        background-color: transparent;
    }

    @media (any-pointer: coarse) {
        .customizeCookiesContent .phLogo {
            display: none;
        }

        .customizeCookiesContent .backToscrollableContent {
            margin-bottom: 12px;
        }

        .customizeMainContent p {
            margin-top: 12px;
            margin-bottom: 12px;
        }
    }

    @media (any-pointer: coarse) and (orientation: portrait) {
        .cbButton {
            width: 100%;
            margin-left: 0;
            margin-right: 0;
        }
        #cookieBannerContent {
            width: 100%;
        }
    }

    @media (any-pointer: coarse) and (max-width: 1000px) and (orientation: landscape) {
        #cookieBannerWrapper.mobileCCBanner.extended {
            height: 466px;
        }
    }

    @media (any-pointer: coarse) and (max-width: 900px) and (orientation: landscape) {
        #cookieBannerWrapper.mobileCCBanner.extended {
            height: 482px;
        }

        .customizeMainContent {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 100%;
        }

        .customizeMainContent .column {
            display: flex;
            flex-direction: column;
            flex-basis: 100%;
            flex: 1;
            height: 35vh;
        }

        .customizeFirstColumn,
        .customizeSecondColumn {
            width: 100%;
        }

        .customizeFirstColumn {
            border-right: 1px solid #767676;
            padding-right: 8px;
        }

        .customizeSecondColumn  {
            padding-left: 16px;
        }

        .rightAlignBtn,
        .saveChangesBtn {
            display: flex;
            margin-left: auto;
            justify-content: center;
            margin-right: 0;
            width: 48%;
        }

        .customizeCookiesContent .backToscrollableContent {
            position: absolute;
            top: 25px;
        }

        #cookieBanner .heading1:not(.center), #cookieBanner h2:not(.center) {
            position: relative;
            text-align: left;
            left: 90px;
        }
    }

    @media (any-pointer: coarse) and (max-width: 845px) and (orientation: landscape) {
        #cookieBannerWrapper.mobileCCBanner.extended {
            height: 359px;
        }
    }

    @media (any-pointer: coarse) and (max-width: 799px) and (orientation: landscape) {
        #cookieBannerWrapper.mobileCCBanner.extended {
            height: 348px;
        }
    }

    @media (any-pointer: coarse) and (max-width: 739px) and (orientation: landscape) {
        #cookieBannerWrapper.mobileCCBanner.extended {
            height: 367px;
        }
    }

    #cookieBanner #changeLanguageWrapper {
        display: block;
        padding-top: 5px;
        padding-bottom: 25px;
    }

    #cookieBanner #changeLanguageWrapper.displayNone {
        display: none;
    }

    #cookieBanner #changeLanguageWrapper label {
        background-color:  #212121;
        position: relative;
        width: 100%;
        height: auto;
        min-height: 52px;
        max-width: 414px;
        line-height: 26px;
        color: #C6C6C6;
        display: block;
        padding: 13px 0 13px 17px;
        font-size: 0.75rem;
        box-sizing: border-box;
        border-radius: 10px;
        float: none;
        text-align: left;
        margin: 0 0 10px 0;
    }

    #cookieBanner #changeLanguageWrapper label select {
        bottom: 0;
        left: 0;
        margin: auto;
        position: absolute;
        right: 0;
        top: 0;
        width: 95%;
        opacity: 0;
        cursor: pointer;
    }

    #cookieBanner #changeLanguageWrapper label span {
        font-weight: bold;
    }

    #cookieBanner #changeLanguageWrapper label.active {
        background-color: #212121;
    }

    #cookieBanner #changeLanguageWrapper label:hover {
        text-decoration: none;
    }

    #cookieBanner #changeLanguageWrapper .iconBox {
        width: 30px;
        display: inline-block;
        margin-right: 6px;
        position: relative;
        min-height: 10px;
        vertical-align: middle;
    }

    #cookieBanner #changeLanguageWrapper .iconBox i {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        -webkit-transform: translate(-50%,-50%);
        color: #fff;
        font-size: 19px;
        line-height: 24px;
    }

    #cookieBanner #changeLanguageWrapper .ph-icon-arrow-drop-down,
    #cookieBanner #changeLanguageWrapper .ph-icon-arrow-drop-up {
        color: #fff;
        font-size: 10px;
        padding: 10px 18px;
        float: right;
    }

    #cookieBanner #changeLanguageWrapper .disclaimer {
        display: block;
        font-size: 10px;
    }

    #globalCookieBanner {
        position: fixed;
        z-index: 1000;
        right: 0;
        bottom: 0;
        left: 0;
        padding: 20px;
        pointer-events: none;
    }
    #globalCookieBanner.hidden{
        display:none;
    }
    #globalCookieBanner .globalCookieBanner {
        display: block;
        box-sizing: border-box;
        max-width: 500px;
        margin: 0 auto;
        padding: 1.5em;
        border-radius: 10px;
        background-color: rgba(33,33,33,0.98);
        color: #c6c6c6;
        font-size: 14px;
        line-height: 1.4;
        letter-spacing: 0.15px;
        pointer-events: auto;
    }
    #globalCookieBanner .globalCookieBanner__wrapper {
        position: relative;
    }
    #globalCookieBanner .globalCookieBanner__icon {
        position: absolute;
        left: 4px;
        top: 4px;
        display: block;
        width: 35px;
        height: 34px;
        background-repeat: no-repeat;
        cursor: auto;
    }
    #globalCookieBanner .globalCookieBanner__content {
        position: relative;
        padding: 0 34px 0 50px;
    }
    #globalCookieBanner .globalCookieBanner__content a{
        color: #FF9000;
    }
    #globalCookieBanner .globalCookieBanner__close {
        position: absolute;
        right: -2px;
        top: -2px;
        border: none;
        background: none;
        color: white;
        font-size: 12px;
        line-height: 1;
        padding: 6px;
    }
    #globalCookieBanner button {
        cursor: pointer;
    }
    #globalCookieBanner .globalCookieBanner__buttons {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-top: 10px;
    }
    #globalCookieBanner .globalCookieBanner__buttons button {
        padding: 10px 12px;
        border: 1px solid white;
        border-radius: 3px;
        background: transparent;
        color: white;
        font-size: 14px;
        font-weight: bold;
        line-height: 1.4;
        letter-spacing: 0.15px;
    }
    #globalCookieBanner .globalCookieBanner__buttons button:hover, #globalCookieBanner .globalCookieBanner__buttons button:focus {
        border-color: #FF9000;
    }
    @media screen and (min-width: 768px) {
        #globalCookieBanner .globalCookieBanner__wrapper {
            padding-left: 60px;
        }
        #globalCookieBanner .globalCookieBanner__content {
            padding-left: 0;
        }
    }
    @media screen and (max-width: 410px) {
        #globalCookieBanner .globalCookieBanner {
            padding: 18px 20px;
        }
        #globalCookieBanner .globalCookieBanner__buttons button {
            font-size: 12px;
            padding: 10px;
        }
    }
`,document.head?document.head.appendChild(o):window.addEventListener("DOMContentLoaded",e=>{document.head.appendChild(o)}))}document.addEventListener("DOMContentLoaded",function(){var e;shouldLogGTMImpression&&(window.dataLayer.push({event:"cookie_banner",event_label:"impression"}),shouldLogGTMImpression=!1),isGlobalCookieBanner&&((e=document.createElement("div")).id="globalCookieBanner",e.className="hidden",document.body.prepend(e),globalCookieBanner=new GlobalCookieBanner(e))}),window.addEventListener("DOMContentLoaded",e=>{var o=document.querySelector(".manageCookiesBtn");o&&o.addEventListener("click",function(){addClogCookieBanner(currentDomain,"consent-modal-open",originPart,originUrl)})});var cookieChangeCallback,globalCookieBanner,pollingInterval=1e3,cookieChangeCallbackName="cookieBanner_cookiesChanged";function listenCookieChange(n,e=pollingInterval){if("3"!=cbCookie&&(!isGlobalCookieBanner||""!=cbCookie&&"1"!=cbCookie)){let o=document.cookie;cookieChangeCallback=function(){var e=document.cookie;if(e!==o)try{n({oldValue:o,newValue:e})}finally{o=e}},mainInterval.subscribe(cookieChangeCallbackName,cookieChangeCallback,e)}}function clearNonEssentialCookies(){CookieHelper.deleteNonEssentialCookies(document.cookie.split("; ").map(e=>e.split("=")[0]))}listenCookieChange(({oldValue:e,newValue:o})=>{o=CookieHelper.listCookiesArrayFromString(o);let n=CookieHelper.listCookiesArrayFromString(e);o.filter(e=>!n.includes(e));setTimeout(CookieHelper.deleteNonEssentialCookies.bind(this,o),1e3)},pollingInterval);class GlobalCookieBanner{constructor(e){if(GlobalCookieBanner._instance)throw new Error("Singleton classes can't be instantiated more than once.");(GlobalCookieBanner._instance=this).element=e,isGlobalCookieBanner&&globalCookieBannerContent&&this.element&&(this.element.innerHTML=globalCookieBannerContent,this.buttons={close:this.element.querySelector(".js-closeGlobalBanner"),customize:this.element.querySelector(".js-customizeGlobalCookies"),accept:this.element.querySelector(".js-acceptGlobalCookies")},this.regularCookieBanner=document.getElementById("cookieBanner"),addStyling(),this.init())}init(){this.buttons.accept.addEventListener("click",()=>this.acceptAllCookies()),this.buttons.customize.addEventListener("click",()=>this.customizeCookies()),this.buttons.close.addEventListener("click",()=>this.acceptAllCookies());var e=CookieHelper.getCurrentConsent();""===e||"0"===e?(document.cookie=cbCookieName+"=1; expires="+cbExpiration+"; domain="+cbDomainName+"; secure;path=/",this.showBanner()):"1"===e?this.showBanner():"3"!==e&&"1"!==cbCookieBannerState&&this.showShortCookieBanner(),document.cookie=cbCookieBannerStateName+"=0;expires=Thu, 01 Jan 1970 00:00:01 GMT",document.cookie=cbCookieBannerStateName+"=0;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain="+cbDomainName}showBanner(){this.regularCookieBanner&&this.regularCookieBanner.classList.add("hidden"),this.element.classList.remove("hidden"),this.handleClogTracking([currentDomain,"cookie-banner-impression-noneu",originPart,originUrl])}acceptAllCookies(){document.cookie=cbCookieName+"=3; expires="+cbExpiration+";domain="+cbDomainName+";secure;path=/",this.handleClogTracking([currentDomain,"cookie-banner-ok-noneu",originPart,originUrl]),logUserConsentCookie(3),"undefined"!=typeof mainInterval&&cookieChangeCallbackName&&mainInterval.unsubscribe(cookieChangeCallbackName),this.element.classList.add("hidden")}customizeCookies(){this.handleClogTracking([currentDomain,"customize-cookie-noneu",originPart,originUrl]),this.element.classList.add("hidden"),this.regularCookieBanner.hasChildNodes()&&!this.regularCookieBanner.classList.contains("cbShort")||this.showCustomizeCookies(),this.regularCookieBanner.classList.remove("hidden")}showCustomizeCookies(){this.regularCookieBanner||(this.regularCookieBanner=document.createElement("div"),this.regularCookieBanner.id="cookieBanner",document.body&&document.body.appendChild(this.regularCookieBanner)),this.regularCookieBanner.classList.add("withOverlay"),this.regularCookieBanner.classList.remove("cbShort"),this.regularCookieBanner.innerHTML="";let o=document.createElement("div");o.id="cookieBannerWrapper";var e=document.createElement("div"),n=(e.id="cookieBannerContent","undefined"!=typeof isPlatformMobile&&isPlatformMobile&&o.classList.add("mobileCCBanner"),document.createElement("button")),t=(n.classList.add("cbPrimaryCTA","cbButton","rightAlignBtn"),n.textContent=("undefined"!=typeof Banner_Text&&Banner_Text.primaryCTA?Banner_Text:cbTexts).primaryCTA,n.addEventListener("click",()=>{document.cookie=cbCookieName+"=3; expires="+cbExpiration+";domain="+cbDomainName+";secure;path=/",this.clearRegularCookieBanner(),this.handleClogTracking([currentDomain,"cookie-pref-accept-all-noneu",originPart,originUrl]),logUserConsentCookie(3),mainInterval.unsubscribe(cookieChangeCallbackName)}),document.createElement("button")),i=(t.classList.add("cbSecondaryCTA","cbButton","rightAlignBtn"),t.textContent=("undefined"!=typeof Banner_Text&&Banner_Text.secondaryCTA?Banner_Text:cbTexts).secondaryCTA,t.addEventListener("click",()=>{document.cookie=cbCookieName+"=2; expires="+cbExpiration+";domain="+cbDomainName+";secure;path=/",this.clearRegularCookieBanner(),void 0!==CookieHelper&&(CookieHelper.deleteNonEssentialCookies(document.cookie.split("; ").map(e=>e.split("=")[0])),CookieHelper.deleteNonEssentialsLocalStorageKeys()),this.handleClogTracking([currentDomain,"cookie-pref-accept-essential-noneu",originPart,originUrl]),logUserConsentCookie(2),location.reload()}),document.createElement("button"));i.classList.add("cbThirdCTA","cbButton","saveChangesBtn"),i.textContent=("undefined"!=typeof Banner_Text&&Banner_Text.thirdCTASaveText?Banner_Text:cbTexts).thirdCTASaveText,i.addEventListener("click",()=>{var e={functional:a.functional.checked?Number(a.functional.value):0,analytics:a.analytics.checked?Number(a.analytics.value):0,advertising:a.advertising.checked?Number(a.advertising.value):0};let o=e.functional&&e.analytics&&e.advertising?3:2+e.functional+e.analytics+e.advertising;document.cookie=cbCookieName+"="+o+"; expires="+cbExpiration+";domain="+cbDomainName+";secure;path=/",this.logCustomizedCookiesSelection(e),2===o?(this.clearRegularCookieBanner(),void 0!==CookieHelper&&(CookieHelper.deleteNonEssentialCookies(document.cookie.split("; ").map(e=>e.split("=")[0])),CookieHelper.deleteNonEssentialsLocalStorageKeys())):this.clearRegularCookieBanner(),location.reload(),logUserConsentCookie(o)}),o.append(e,n,t,i),this.regularCookieBanner.appendChild(o),document.addEventListener("click",function(e){var o=e?e.target:null;o&&MG_Utils.hasClass(o,"expandableTitle")&&(e.stopImmediatePropagation(),expandCustomizeDetail(o))}),window.addEventListener("resize",e=>{o&&(o.style.removeProperty("height"),initialCookieBannerHeight=o.clientHeight)}),o.classList.add("extended"),e.innerHTML=customizeCookiesTemplate;let a={functional:document.getElementById("functionalCookies"),analytics:document.getElementById("analyticsCookies"),advertising:document.getElementById("advertisingCookies")};n=document.querySelector(".backToscrollableContent"),n&&n.addEventListener("click",()=>{this.regularCookieBanner.classList.add("hidden"),this.showBanner()}),t="1"!==CookieHelper.getCurrentConsent()?CookieHelper.getCurrentConsent():cbConsent;a.functional&&(a.functional.checked=!![3,10,26,42].includes(Number(t))),a.analytics&&(a.analytics.checked=!![3,18,26,50].includes(Number(t))),a.advertising&&(a.advertising.checked=!![3,34,42,50].includes(Number(t))),initialCookieBannerHeight=o.clientHeight}showShortCookieBanner(){this.regularCookieBanner||(this.regularCookieBanner=document.createElement("div"),this.regularCookieBanner.id="cookieBanner",document.body&&document.body.appendChild(this.regularCookieBanner)),this.regularCookieBanner.classList.add("cbShort"),this.regularCookieBanner.innerHTML=shortCookieBannerContent;var e="undefined"!=typeof isPlatformMobile&&isPlatformMobile,o=this.regularCookieBanner.querySelector(".cbPrimaryCTA"),n=this.regularCookieBanner.querySelector(".cbCloseButton");e&&o.classList.add("mobileLink"),o.addEventListener("click",()=>{document.cookie=cbCookieName+"=3; expires="+cbExpiration+"; domain="+cbDomainName+";secure;path=/",document.cookie=cbCookieBannerStateName+"=0;expires=Thu, 01 Jan 1970 00:00:01 GMT",this.handleClogTracking([currentDomain,"cookie-banner-essential-to-all-noneu",originPart,originUrl]),logUserConsentCookie(3),mainInterval.unsubscribe(cookieChangeCallbackName),this.clearRegularCookieBanner()}),n.addEventListener("click",()=>{document.cookie=cbCookieBannerStateName+"=1; expires="+cbExpiration+"; domain="+cbDomainName+";secure;path=/",this.clearRegularCookieBanner()}),"undefined"!=typeof isPremiumDomainBanner&&isPremiumDomainBanner&&"undefined"!=typeof isPlatformMobile&&isPlatformMobile&&adjustShortBannerPosition(),void 0!==CookieHelper&&(CookieHelper.deleteNonEssentialCookies(document.cookie.split("; ").map(e=>e.split("=")[0])),CookieHelper.deleteNonEssentialsLocalStorageKeys())}clearRegularCookieBanner(){this.regularCookieBanner.innerHTML="",this.regularCookieBanner.className="hidden"}logCustomizedCookiesSelection(e){let o="";e&&(e.analytics&&e.advertising&&e.functional?o="cookie-pref-accept-all-noneu":e.analytics||e.advertising||e.functional?(e.functional&&(o+="functional-"),e.analytics&&(o+="analytics-"),e.advertising&&(o+="advertising-"),o+="save-noneu"):o="none-save-noneu",this.handleClogTracking([currentDomain,o,originPart,originUrl]))}handleClogTracking(o){if("function"==typeof userClogTracking)userClogTracking(...o);else{let e=setInterval(function(){"function"==typeof userClogTracking&&(userClogTracking(...o),clearInterval(e))},200)}}}